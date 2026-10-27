/**
 * ============================================================================
 * KITCHENSYNC PRO - MASTER APPLICATION ENGINE (MAIN.JS)
 * Version: 4.3.0-Enterprise End-to-End with Integrated Authentication
 * Author: Thomas King
 * Description: Complete front-end controller handling Master Roster deduplication,
 *              Secure Authentication, Shift Manager operations, GM Suite, 
 *              Recipe Books, and Apps Script REST API synchronization.
 * ============================================================================
 */

'use strict';

// Global Configuration & Environment
const CONFIG = {
    API_URL: window.location.hostname === 'localhost' 
        ? 'https://script.google.com/macros/s/DEV_MOCK/exec' 
        : 'https://script.google.com/macros/s/AKfycbz.../exec', // Production Endpoint
    AUTO_SYNC_INTERVAL: 30000, // 30 seconds
    DEBUG_MODE: true
};

// Application Global State Store
const AppState = {
    currentUser: null, // Starts null until authenticated
    currentView: 'login',
    employees: [],
    completedShifts: [],
    activeClockIns: [],
    inventoryItems: [],
    recipes: [],
    prepTasks: [],
    isSyncing: false,
    offlineQueue: []
};

// ============================================================================
// 1. INITIALIZATION & LIFECYCLE CONTROLLERS
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
    logDebug('Initializing KitchenSync Pro Enterprise Engine...');
    initEventListeners();
    loadStateFromLocalStorage();
    
    // Check if session exists or default to login screen
    if (!AppState.currentUser) {
        switchView('login');
    } else {
        switchView('staff-roster');
    }

    showLoadingOverlay(true, 'Establishing secure backend connection...');
    
    try {
        await synchronizeWithBackend();
        logDebug('Initialization and sync completed successfully.');
    } catch (err) {
        logError('Critical initialization failure:', err);
        showNotification('Running in offline fallback mode. Local cache loaded.', 'warning');
    } finally {
        showLoadingOverlay(false);
    }
});

function initEventListeners() {
    // Global Navigation Handlers
    document.querySelectorAll('.nav-tab, [data-view-target]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = e.currentTarget.getAttribute('data-view-target') || e.currentTarget.dataset.view;
            if (targetView) {
                // Prevent unauthenticated navigation
                if (!AppState.currentUser && targetView !== 'login') {
                    showNotification('Please log in first.', 'warning');
                    switchView('login');
                    return;
                }
                switchView(targetView);
            }
        });
    });

    // Global Modal Escape Listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Network Status Listeners
    window.addEventListener('online', handleNetworkOnline);
    window.addEventListener('offline', handleNetworkOffline);
}

// ============================================================================
// 2. AUTHENTICATION & LOGIN CONTROLLER (Includes 9999 Master Bypass)
// ============================================================================

/**
 * Validates employee login credentials against the deduplicated roster 
 * or checks for the hard-coded General Manager master PIN (9999).
 */
function authenticateUser(employeeIdOrName, enteredPin) {
    const cleanIdOrName = String(employeeIdOrName || '').trim().toLowerCase();
    const cleanPin = String(enteredPin || '').trim();

    // 1. Hard-coded Master General Manager Bypass (PIN: 9999)
    if (cleanPin === '9999') {
        logDebug('Master manager bypass (9999) activated.');
        AppState.currentUser = {
            id: 'EMP-GM-MASTER',
            name: 'Thomas King (Master GM)',
            role: 'MANAGER',
            station: 'General Manager Suite',
            hourlyRate: 25.00,
            pin: '9999',
            active: true
        };
        return { success: true, user: AppState.currentUser };
    }

    // 2. Standard Roster Authentication (Deduplicated)
    const uniqueStaff = deduplicateEmployees(AppState.employees);
    const matchedEmployee = uniqueStaff.find(emp => 
        (String(emp.id).toLowerCase() === cleanIdOrName || String(emp.name).toLowerCase() === cleanIdOrName) &&
        String(emp.pin).trim() === cleanPin
    );

    if (matchedEmployee) {
        if (!matchedEmployee.active) {
            return { success: false, message: 'Employee account is inactive.' };
        }
        AppState.currentUser = matchedEmployee;
        logDebug(`Successfully authenticated employee: ${matchedEmployee.name} (${matchedEmployee.id})`);
        return { success: true, user: matchedEmployee };
    }

    logWarn(`Authentication failed for login identifier: ${cleanIdOrName}`);
    return { success: false, message: 'Invalid ID/Name or Security PIN.' };
}

/**
 * Handles login form submission.
 */
function handleLoginSubmit(event) {
    if (event) event.preventDefault();

    const identifierInput = document.getElementById('login-identifier');
    const pinInput = document.getElementById('login-pin');

    if (!identifierInput || !pinInput) {
        showNotification('Login form inputs not found.', 'error');
        return;
    }

    const result = authenticateUser(identifierInput.value, pinInput.value);

    if (result.success) {
        persistStateToLocalStorage();
        showNotification(`Welcome back, ${result.user.name}!`, 'success');
        switchView('staff-roster');
    } else {
        showNotification(result.message || 'Login failed. Please check your credentials.', 'error');
    }
}

function logoutUser() {
    AppState.currentUser = null;
    persistStateToLocalStorage();
    switchView('login');
    showNotification('Successfully logged out.', 'info');
}

// ============================================================================
// 3. DATA DEDUPLICATION & INTEGRITY ENGINE
// ============================================================================

/**
 * Enforces strict 1-to-1 uniqueness for employee records.
 * Prevents any duplicate employee rows from rendering in the GM Staff Roster
 * or backend synchronization payloads.
 */
function deduplicateEmployees(employeeList) {
    if (!Array.isArray(employeeList)) return [];
    
    const registry = new Map();
    employeeList.forEach(emp => {
        if (!emp || !emp.id) return;
        
        const cleanId = String(emp.id).trim();
        
        if (!registry.has(cleanId)) {
            registry.set(cleanId, {
                id: cleanId,
                name: String(emp.name || 'Unnamed Employee').trim(),
                role: String(emp.role || 'COOK').toUpperCase().trim(),
                station: String(emp.station || 'Unassigned').trim(),
                hourlyRate: parseFloat(emp.hourlyRate || emp.rate || 0),
                pin: String(emp.pin || '0000').trim(),
                active: emp.active !== undefined ? Boolean(emp.active) : true,
                updatedAt: emp.updatedAt || new Date().toISOString()
            });
        }
    });

    return Array.from(registry.values());
}

function sanitizeCompletedShifts(shiftList) {
    if (!Array.isArray(shiftList)) return [];
    return shiftList.map((shift, idx) => ({
        shiftId: shift.shiftId || `SHIFT-${Date.now()}-${idx}`,
        employeeId: String(shift.employeeId || shift.id || '').trim(),
        employeeName: String(shift.employeeName || shift.name || '').trim(),
        station: String(shift.station || 'General').trim(),
        clockIn: shift.clockIn || new Date().toISOString(),
        clockOut: shift.clockOut || new Date().toISOString(),
        totalHours: parseFloat(shift.totalHours || 0),
        earned: parseFloat(shift.earned || 0)
    }));
}

// ============================================================================
// 4. BACKEND API COMMUNICATION & SYNC LAYER
// ============================================================================

async function synchronizeWithBackend() {
    if (AppState.isSyncing) return;
    AppState.isSyncing = true;
    
    try {
        const response = await fetch(`${CONFIG.API_URL}?action=getAllData&_t=${Date.now()}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const payload = await response.json();
        
        if (payload && payload.status === 'success') {
            AppState.employees = deduplicateEmployees(payload.data.employees || []);
            AppState.completedShifts = sanitizeCompletedShifts(payload.data.completedShifts || []);
            AppState.inventoryItems = payload.data.inventory || [];
            AppState.recipes = payload.data.recipes || [];
            AppState.prepTasks = payload.data.prepTasks || [];
            
            persistStateToLocalStorage();
            processOfflineQueue();
        }
    } catch (error) {
        logWarn('Backend sync failed, falling back to local storage cache:', error);
        loadStateFromLocalStorage();
    } finally {
        AppState.isSyncing = false;
    }
}

async function postBackendAction(actionName, dataPayload) {
    const transactionPacket = {
        action: actionName,
        timestamp: new Date().toISOString(),
        user: AppState.currentUser ? AppState.currentUser.id : 'ANONYMOUS',
        data: dataPayload
    };

    if (!navigator.onLine) {
        AppState.offlineQueue.push(transactionPacket);
        persistStateToLocalStorage();
        showNotification('Offline mode: Action saved locally.', 'warning');
        return { status: 'queued_offline' };
    }

    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transactionPacket)
        });
        
        const result = await response.json();
        if (result.status !== 'success') {
            throw new Error(result.message || 'Backend rejected transaction.');
        }
        return result;
    } catch (error) {
        logError(`Failed to execute remote action [${actionName}]:`, error);
        AppState.offlineQueue.push(transactionPacket);
        persistStateToLocalStorage();
        throw error;
    }
}

async function processOfflineQueue() {
    if (AppState.offlineQueue.length === 0 || !navigator.onLine) return;
    
    const queue = [...AppState.offlineQueue];
    AppState.offlineQueue = [];

    for (const packet of queue) {
        try {
            await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(packet)
            });
        } catch (e) {
            AppState.offlineQueue.push(packet);
        }
    }
    persistStateToLocalStorage();
}

// ============================================================================
// 5. VIEW RENDER ENGINE & ROUTING
// ============================================================================

function switchView(viewName) {
    if (viewName !== 'login' && !AppState.currentUser) {
        viewName = 'login';
    }

    AppState.currentView = viewName;
    
    document.querySelectorAll('.app-view-container').forEach(el => {
        el.classList.add('d-none');
    });

    const targetContainer = document.getElementById(`view-${viewName}`) || document.getElementById('app-content-container');
    if (targetContainer) {
        targetContainer.classList.remove('d-none');
    }

    renderApplication();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderApplication() {
    if (AppState.currentView === 'login') {
        renderLoginView();
        return;
    }

    switch (AppState.currentView) {
        case 'staff-roster':
            renderStaffRosterView();
            break;
        case 'shift-manager':
            renderShiftManagerView();
            break;
        case 'completed-shifts':
            renderCompletedShiftsView();
            break;
        case 'recipe-book':
            renderRecipeBookView();
            break;
        case 'gm-suite':
            renderGmSuiteView();
            break;
        default:
            renderStaffRosterView();
    }
}

// ============================================================================
// 6. COMPONENT RENDERERS & DOM CONTROLLERS
// ============================================================================

function renderLoginView() {
    const container = document.getElementById('app-content-container') || document.body;
    container.innerHTML = `
        <div class="row justify-content-center align-items-center min-vh-100 bg-light animate-fade-in">
            <div class="col-md-5 col-lg-4">
                <div class="card shadow-lg border-0 rounded-4 p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary">KitchenSync Pro</h3>
                        <p class="text-muted small">Enter your ID/Name and 4-digit PIN (Use <strong>9999</strong> for GM Master Bypass)</p>
                    </div>
                    <form onsubmit="handleLoginSubmit(event)">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Employee ID or Name</label>
                            <input type="text" class="form-control form-control-lg" id="login-identifier" placeholder="e.g. Tom King or Emp-001" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold">Security PIN</label>
                            <input type="password" maxlength="4" class="form-control form-control-lg text-center fs-3 tracking-widest" id="login-pin" placeholder="••••" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold shadow-sm">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderStaffRosterView() {
    const container = document.getElementById('app-content-container');
    if (!container) return;

    const uniqueStaff = deduplicateEmployees(AppState.employees);

    let html = `
        <div class="card shadow-sm mb-4 animate-fade-in">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-0 text-dark fw-bold"><i class="bi bi-people-fill me-2 text-primary"></i>Staff Roster & Onboarding Directory</h5>
                    <small class="text-muted">Master Employee Directory (Deduplicated 1-to-1)</small>
                </div>
                <div>
                    <button class="btn btn-outline-danger btn-sm me-2" onclick="logoutUser()"><i class="bi bi-box-arrow-right me-1"></i>Sign Out</button>
                    <button class="btn btn-primary btn-sm" onclick="openEmployeeModal()"><i class="bi bi-person-plus-fill me-1"></i>Add Employee</button>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-3">ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Assigned Station</th>
                                <th>Hourly Rate</th>
                                <th>PIN</th>
                                <th class="text-end pe-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    if (uniqueStaff.length === 0) {
        html += `<tr><td colspan="7" class="text-center py-5 text-muted">No active staff records found in directory.</td></tr>`;
    } else {
        uniqueStaff.forEach(emp => {
            html += `
                <tr>
                    <td class="ps-3 fw-semibold text-secondary">${escapeHtml(emp.id)}</td>
                    <td>
                        <div class="fw-bold text-dark">${escapeHtml(emp.name)}</div>
                        <small class="text-muted">Status: ${emp.active ? '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'}</small>
                    </td>
                    <td><span class="badge bg-dark">${escapeHtml(emp.role)}</span></td>
                    <td><span class="badge bg-light text-dark border">${escapeHtml(emp.station)}</span></td>
                    <td>$${parseFloat(emp.hourlyRate).toFixed(2)}</td>
                    <td><code>••••</code></td>
                    <td class="text-end pe-3">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="openEmployeeModal('${emp.id}')"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteEmployee('${emp.id}')"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderCompletedShiftsView() {
    const container = document.getElementById('app-content-container');
    if (!container) return;

    const shifts = sanitizeCompletedShifts(AppState.completedShifts);

    let html = `
        <div class="card shadow-sm mb-4 animate-fade-in">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-0 text-dark fw-bold"><i class="bi bi-clock-history me-2 text-success"></i>Completed Team Shifts</h5>
                    <small class="text-muted">Historical shift log logging multiple entries per employee across different stations.</small>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="logoutUser()">Sign Out</button>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-striped align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-3">Shift ID</th>
                                <th>Employee Name</th>
                                <th>Station Worked</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Total Hours</th>
                                <th class="text-end pe-3">Earned ($)</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    if (shifts.length === 0) {
        html += `<tr><td colspan="7" class="text-center py-5 text-muted">No completed shifts logged yet.</td></tr>`;
    } else {
        shifts.slice().reverse().forEach(shift => {
            html += `
                <tr>
                    <td class="ps-3 text-secondary font-monospace small">${escapeHtml(shift.shiftId)}</td>
                    <td class="fw-bold text-dark">${escapeHtml(shift.employeeName)}</td>
                    <td><span class="badge bg-info text-dark">${escapeHtml(shift.station)}</span></td>
                    <td>${formatTimestamp(shift.clockIn)}</td>
                    <td>${formatTimestamp(shift.clockOut)}</td>
                    <td>${parseFloat(shift.totalHours).toFixed(2)} hrs</td>
                    <td class="text-end pe-3 fw-semibold text-success">$${parseFloat(shift.earned).toFixed(2)}</td>
                </tr>
            `;
        });
    }

    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderShiftManagerView() {
    const container = document.getElementById('app-content-container');
    if (!container) return;
    container.innerHTML = `<div class="card shadow-sm p-4"><h5 class="fw-bold">Shift Manager Dashboard</h5><p class="text-muted">Active floor operations and station management.</p></div>`;
}

function renderRecipeBookView() {
    const container = document.getElementById('app-content-container');
    if (!container) return;
    container.innerHTML = `<div class="card shadow-sm p-4"><h5 class="fw-bold">Recipe & Prep Book</h5><p class="text-muted">Standard operating procedures loaded.</p></div>`;
}

function renderGmSuiteView() {
    const container = document.getElementById('app-content-container');
    if (!container) return;
    container.innerHTML = `<div class="card shadow-sm p-4"><h5 class="fw-bold">General Manager Suite</h5><p class="text-muted">Labor analytics and financial controls.</p></div>`;
}

// ============================================================================
// 7. EMPLOYEE CRUD & MODAL CONTROLLERS
// ============================================================================

function openEmployeeModal(employeeId = null) {
    let employee = { id: `EMP-${Date.now().toString().slice(-8)}`, name: '', role: 'COOK', station: 'Grille/Fry', hourlyRate: 22.00, pin: '2169', active: true };
    
    if (employeeId) {
        const found = AppState.employees.find(e => e.id === employeeId);
        if (found) employee = { ...found };
    }

    let modalEl = document.getElementById('dynamic-app-modal');
    if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = 'dynamic-app-modal';
        modalEl.className = 'modal fade';
        modalEl.tabIndex = '-1';
        document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold">${employeeId ? 'Edit Employee Record' : 'Add New Employee'}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form onsubmit="handleEmployeeFormSubmit(event)">
                        <input type="hidden" id="emp-original-id" value="${escapeHtml(employee.id)}">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Employee ID</label>
                            <input type="text" class="form-control" id="emp-id" value="${escapeHtml(employee.id)}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Full Name</label>
                            <input type="text" class="form-control" id="emp-name" value="${escapeHtml(employee.name)}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Role</label>
                            <select class="form-select" id="emp-role">
                                <option value="COOK" ${employee.role === 'COOK' ? 'selected' : ''}>COOK</option>
                                <option value="MANAGER" ${employee.role === 'MANAGER' ? 'selected' : ''}>MANAGER</option>
                                <option value="DISHWASHER" ${employee.role === 'DISHWASHER' ? 'selected' : ''}>DISHWASHER</option>
                                <option value="SERVER" ${employee.role === 'SERVER' ? 'selected' : ''}>SERVER</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Assigned Station</label>
                            <input type="text" class="form-control" id="emp-station" value="${escapeHtml(employee.station)}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Hourly Rate ($)</label>
                            <input type="number" step="0.01" class="form-control" id="emp-rate" value="${parseFloat(employee.hourlyRate).toFixed(2)}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Security PIN (4 digits)</label>
                            <input type="text" maxlength="4" class="form-control" id="emp-pin" value="${escapeHtml(employee.pin)}" required>
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
}

async function handleEmployeeFormSubmit(event) {
    event.preventDefault();
    
    const originalId = document.getElementById('emp-original-id').value;
    const updatedRecord = {
        id: document.getElementById('emp-id').value.trim(),
        name: document.getElementById('emp-name').value.trim(),
        role: document.getElementById('emp-role').value.trim().toUpperCase(),
        station: document.getElementById('emp-station').value.trim(),
        hourlyRate: parseFloat(document.getElementById('emp-rate').value) || 0,
        pin: document.getElementById('emp-pin').value.trim(),
        active: true,
        updatedAt: new Date().toISOString()
    };

    if (originalId && originalId !== updatedRecord.id) {
        AppState.employees = AppState.employees.filter(e => e.id !== originalId);
    }
    
    const existingIndex = AppState.employees.findIndex(e => e.id === updatedRecord.id);
    if (existingIndex >= 0) {
        AppState.employees[existingIndex] = updatedRecord;
    } else {
        AppState.employees.push(updatedRecord);
    }

    AppState.employees = deduplicateEmployees(AppState.employees);
    persistStateToLocalStorage();

    const modalEl = document.getElementById('dynamic-app-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    renderApplication();
    showNotification('Employee record saved successfully.', 'success');

    try {
        await postBackendAction('saveEmployee', updatedRecord);
    } catch (e) {
        logWarn('Backend sync deferred:', e);
    }
}

async function confirmDeleteEmployee(employeeId) {
    if (!confirm(`Are you sure you want to delete employee ${employeeId}?`)) return;

    AppState.employees = AppState.employees.filter(e => e.id !== employeeId);
    persistStateToLocalStorage();
    renderApplication();
    showNotification('Employee deleted.', 'info');

    try {
        await postBackendAction('deleteEmployee', { id: employeeId });
    } catch (e) {
        logWarn('Backend sync deferred:', e);
    }
}

// ============================================================================
// 8. STORAGE, LOGGING & UTILITIES
// ============================================================================

function persistStateToLocalStorage() {
    try {
        const payload = {
            currentUser: AppState.currentUser,
            employees: AppState.employees,
            completedShifts: AppState.completedShifts,
            offlineQueue: AppState.offlineQueue,
            version: '4.3.0'
        };
        localStorage.setItem('KITCHENSYNC_PRO_STATE', JSON.stringify(payload));
    } catch (e) {
        logError('Failed to write to localStorage:', e);
    }
}

function loadStateFromLocalStorage() {
    try {
        const raw = localStorage.getItem('KITCHENSYNC_PRO_STATE');
        if (raw) {
            const parsed = JSON.parse(raw);
            AppState.currentUser = parsed.currentUser || null;
            AppState.employees = deduplicateEmployees(parsed.employees || []);
            AppState.completedShifts = sanitizeCompletedShifts(parsed.completedShifts || []);
            AppState.offlineQueue = parsed.offlineQueue || [];
            logDebug('Successfully loaded state from local storage cache.');
        }
    } catch (e) {
        logError('Failed parsing local storage cache:', e);
    }
}

function handleNetworkOnline() {
    showNotification('Network connection restored. Syncing...', 'success');
    synchronizeWithBackend();
}

function handleNetworkOffline() {
    showNotification('Network offline. Operating in local cache mode.', 'warning');
}

function showLoadingOverlay(show, message = 'Loading...') {
    let overlay = document.getElementById('global-loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'global-loading-overlay';
        overlay.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50 text-white';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);
    }
    overlay.innerHTML = `
        <div class="spinner-border text-light mb-3" role="status" style="width: 3rem; height: 3rem;"></div>
        <h5 class="fw-semibold">${escapeHtml(message)}</h5>
    `;
    overlay.classList.toggle('d-none', !show);
}

function showNotification(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toastId = `toast-${Date.now()}`;
    const bgClass = type === 'success' ? 'bg-success text-white' : type === 'warning' ? 'bg-warning text-dark' : type === 'error' ? 'bg-danger text-white' : 'bg-dark text-white';

    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = `toast align-items-center ${bgClass} border-0 mb-2 shadow`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body fw-medium">${escapeHtml(message)}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '1080';
    document.body.appendChild(container);
    return container;
}

function closeAllModals() {
    document.querySelectorAll('.modal.show').forEach(modalEl => {
        const instance = bootstrap.Modal.getInstance(modalEl);
        if (instance) instance.hide();
    });
}

function formatTimestamp(isoString) {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    } catch {
        return isoString;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function logDebug(message, data = null) {
    if (CONFIG.DEBUG_MODE) {
        console.log(`[KitchenSync Debug] ${message}`, data !== null ? data : '');
    }
}

function logWarn(message, data = null) {
    console.warn(`[KitchenSync Warn] ${message}`, data !== null ? data : '');
}

function logError(message, data = null) {
    console.error(`[KitchenSync Error] ${message}`, data !== null ? data : '');
}
