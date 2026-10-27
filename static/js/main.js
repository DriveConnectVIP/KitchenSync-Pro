/**
 * KitchenSync Pro - Main Application Logic (End-to-End Re-write)
 * Handles Staff Roster deduplication, employee directory management, 
 * and shift logging.
 */

const API_URL = CONFIG.API_URL; // Assumes config.js contains your Apps Script web app endpoint

let AppState = {
    employees: [],
    completedShifts: [],
    currentView: 'staff-roster'
};

// ==========================================
// 1. INITIALIZATION & DATA FETCHING
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    showLoading(true);
    try {
        await fetchMasterData();
        renderCurrentView();
    } catch (error) {
        console.error("Initialization error:", error);
        showNotification("Failed to load application data.", "error");
    } finally {
        showLoading(false);
    }
}

async function fetchMasterData() {
    try {
        const response = await fetch(`${API_URL}?action=getData`);
        const data = await response.json();
        
        if (data && data.employees) {
            // Deduplicate employees based on unique 'id' to fix backend row duplication
            AppState.employees = deduplicateEmployees(data.employees);
        }
        
        if (data && data.completedShifts) {
            AppState.completedShifts = data.completedShifts;
        }
    } catch (error) {
        console.warn("Using local/fallback state due to fetch error:", error);
    }
}

/**
 * Ensures unique employee records by ID. 
 * Keeps the latest or first unique occurrence and drops duplicate rows.
 */
function deduplicateEmployees(employeeList) {
    const seenMap = new Map();
    employeeList.forEach(emp => {
        if (emp.id && !seenMap.has(emp.id)) {
            seenMap.set(emp.id, emp);
        }
    });
    return Array.from(seenMap.values());
}

// ==========================================
// 2. RENDERING VIEWS
// ==========================================

function renderCurrentView() {
    const container = document.getElementById('app-content-container');
    if (!container) return;

    switch (AppState.currentView) {
        case 'staff-roster':
            renderStaffRoster(container);
            break;
        case 'completed-shifts':
            renderCompletedShifts(container);
            break;
        default:
            renderStaffRoster(container);
    }
}

/**
 * Renders the Staff Roster ensuring zero duplicate employee IDs.
 */
function renderStaffRoster(container) {
    const uniqueEmployees = deduplicateEmployees(AppState.employees);

    let html = `
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 class="mb-0 text-dark"><i class="bi bi-people-fill me-2"></i>Staff Roster & Onboarding Directory</h5>
                <button class="btn btn-primary btn-sm" onclick="openAddEmployeeModal()">+ Add Employee</button>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Assigned Station</th>
                                <th>Hourly Rate</th>
                                <th class="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    if (uniqueEmployees.length === 0) {
        html += `<tr><td colspan="6" class="text-center py-4 text-muted">No active staff records found.</td></tr>`;
    } else {
        uniqueEmployees.forEach(emp => {
            html += `
                <tr>
                    <td><strong>${escapeHtml(emp.id)}</strong></td>
                    <td>${escapeHtml(emp.name)}</td>
                    <td><span class="badge bg-secondary">${escapeHtml(emp.role)}</span></td>
                    <td>${escapeHtml(emp.station || 'Unassigned')}</td>
                    <td>$${parseFloat(emp.hourlyRate || 0).toFixed(2)}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editEmployee('${emp.id}')">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteEmployee('${emp.id}')">Delete</button>
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

// ==========================================
// 3. DATA MUTATION & BACKEND SYNC
// ==========================================

async function saveEmployee(employeeData) {
    // Check if employee already exists to update instead of duplicate
    const existingIndex = AppState.employees.findIndex(e => e.id === employeeData.id);
    
    if (existingIndex >= 0) {
        AppState.employees[existingIndex] = employeeData;
    } else {
        AppState.employees.push(employeeData);
    }

    // Enforce local deduplication
    AppState.employees = deduplicateEmployees(AppState.employees);

    try {
        await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'saveEmployee', data: employeeData }),
            headers: { 'Content-Type': 'application/json' }
        });
        showNotification("Employee saved successfully.", "success");
    } catch (error) {
        console.error("Sync error:", error);
        showNotification("Saved locally, but backend sync failed.", "warning");
    }

    renderCurrentView();
}

async function deleteEmployee(employeeId) {
    if (!confirm(`Are you sure you want to remove employee ${employeeId}?`)) return;

    AppState.employees = AppState.employees.filter(e => e.id !== employeeId);

    try {
        await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'deleteEmployee', id: employeeId }),
            headers: { 'Content-Type': 'application/json' }
        });
        showNotification("Employee deleted.", "success");
    } catch (error) {
        console.error("Delete sync error:", error);
    }

    renderCurrentView();
}

/**
 * Logs a shift to Completed Team Shifts without duplicating the employee record.
 */
async function logCompletedShift(shiftData) {
    AppState.completedShifts.push(shiftData);
    
    try {
        await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'logShift', data: shiftData }),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Shift log sync error:", error);
    }
}

// ==========================================
// 4. UTILITIES
// ==========================================

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function showLoading(isLoading) {
    // Loader toggle implementation
}

function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}
