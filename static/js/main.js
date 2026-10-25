/**
 * KitchenSync Pro - Core Architecture & State Management
 */

const CONFIG = {
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxLUl-5Fx1XvJT6jVUURqSeGXT0sFgOB64kESRw4OIC9hxP0hTA4wG46SVV5Ym_UvHJ/exec",
    GM_MASTER_PASSCODE: "9999"
};

const Store = {
    lang: 'en',
    role: null,
    user: null,
    employees: [],
    shifts: [],
    certifications: [],
    messages: [],
    recipes: [],

    setSession(userObj, roleStr) {
        this.user = userObj;
        this.role = roleStr ? roleStr.toLowerCase() : 'cook';
    },
    clearSession() {
        this.user = null;
        this.role = null;
    }
};

const ApiService = {
    async request(action, payload = null) {
        try {
            if (payload) {
                const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ action, ...payload })
                });
                return await res.json();
            } else {
                const res = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=${action}`);
                return await res.json();
            }
        } catch (err) {
            console.error(`API Error [${action}]:`, err);
            return null;
        }
    },

    async fetchAll() {
        const [emps, shifts, certs, msgs, recipes] = await Promise.all([
            this.request('getEmployees'),
            this.request('getShifts'),
            this.request('getCerts'),
            this.request('getMessages'),
            this.request('getRecipes')
        ]);

        if (emps) Store.employees = emps;
        if (shifts) Store.shifts = shifts;
        if (certs) Store.certifications = certs;
        if (msgs) Store.messages = msgs;
        if (recipes) Store.recipes = recipes;

        UIController.refreshActiveView();
    }
};

const UIController = {
    init() {
        const today = new Date().toISOString().split('T')[0];
        ['shift-date', 'cook-shift-date', 'gm-calendar-lookup-date'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = today;
        });
        ApiService.fetchAll();
    },
    refreshActiveView() {
        const view = document.querySelector('.app-view.active');
        if (!view) return;
        const id = view.id.replace('view-', '');
        if (id === 'shift-entry') renderChecklists();
        if (id === 'cook-dashboard') renderCookDashboard();
        if (id === 'manager-dashboard') renderManagerDashboard();
        if (id === 'gm-dashboard') renderGMDashboard();
        if (id === 'cook-training') renderTrainingView();
        if (id === 'recipe-book') renderRecipeBook();
    }
};

document.addEventListener('DOMContentLoaded', () => UIController.init());
// ==========================================
// 6. AUTHENTICATION & NAVIGATION ROUTER
// ==========================================
function handleLogin(e) {
    e.preventDefault();
    const pin = document.getElementById('auth-password').value.trim();

    if (pin === CONFIG.GM_MASTER_PASSCODE) {
        Store.setSession({ id: "GM-ADMIN", name: "General Manager", role: "gm", station: "All" }, "gm");
        finalizeLogin();
        return;
    }

    const emp = Store.employees.find(e => String(e.pin).trim() === pin && e.active);
    if (emp) {
        Store.setSession(emp, emp.role || 'cook');
        finalizeLogin();
        return;
    }

    ApiService.request('authenticate', { password: pin }).then(res => {
        if (res && res.success) {
            Store.setSession(res.employee || { id: "EMP-001", name: "Employee", role: res.role || "cook", station: "Range" }, res.role || 'cook');
            finalizeLogin();
        } else {
            alert(res?.error || "Invalid PIN or Passcode.");
        }
    });
}

function finalizeLogin() {
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('app-wrapper').style.display = 'block';
    updateGreetingLabel();
    buildNavForRole(Store.role);
    renderChecklists();
}

function updateGreetingLabel() {
    const label = document.getElementById('logged-in-user-label');
    if (label && Store.user) {
        const certified = isCertifiedTeamLeader(Store.user.id);
        const badge = certified ? ' ⭐️ CERTIFIED TEAM LEADER' : '';
        label.textContent = `${Store.user.name}${badge} (${Store.role.toUpperCase()})`;
    }
}

function logoutSession() {
    Store.clearSession();
    document.getElementById('auth-password').value = '';
    document.getElementById('app-wrapper').style.display = 'none';
    document.getElementById('auth-modal').style.display = 'flex';
}

// ==========================================
// 7. ENGLISH / SPANISH TRANSLATION ENGINE
// ==========================================
const TRANSLATIONS = {
    en: {
        myChecklist: "📝 My Shift Checklist",
        shiftsCompleted: "⭐ Shifts Completed",
        trainingModules: "🎓 Training & Certs",
        managerDashboard: "📊 Shift Manager Dashboard",
        gmSuite: "📈 General Manager Suite",
        messageBoard: "💬 Message Board",
        recipeBook: "📖 Recipe & Prep Book",
        staffRoster: "👥 Staff Roster",
        saveChecklist: "💾 Save My Checklist",
        printSheet: "🖨️ Print Sheet"
    },
    es: {
        myChecklist: "📝 Mi Lista de Turno",
        shiftsCompleted: "⭐ Turnos Completados",
        trainingModules: "🎓 Capacitación",
        managerDashboard: "📊 Panel del Gerente",
        gmSuite: "📈 Suite del Gerente General",
        messageBoard: "💬 Tablero de Mensajes",
        recipeBook: "📖 Libro de Recetas",
        staffRoster: "👥 Plantilla de Personal",
        saveChecklist: "💾 Guardar Mi Registro",
        printSheet: "🖨️ Imprimir Hoja"
    }
};

function toggleLanguage() {
    Store.lang = Store.lang === 'en' ? 'es' : 'en';
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = Store.lang === 'es' ? '🇺🇸 English' : '🇪🇸 Español';
    buildNavForRole(Store.role);
    UIController.refreshActiveView();
}

function t(key) {
    return TRANSLATIONS[Store.lang]?.[key] || TRANSLATIONS['en'][key] || key;
}

// ==========================================
// 8. ROLE-BASED NAVIGATION & VIEW ROUTER
// ==========================================
function buildNavForRole(role) {
    const nav = document.getElementById('nav-tabs-container');
    if (!nav) return;
    nav.innerHTML = '';

    let tabs = [];
    if (role === 'cook') {
        tabs = [
            { id: 'shift-entry', label: t('myChecklist') },
            { id: 'cook-dashboard', label: t('shiftsCompleted') },
            { id: 'cook-training', label: t('trainingModules') },
            { id: 'recipe-book', label: t('recipeBook') }
        ];
    } else if (role === 'manager') {
        tabs = [
            { id: 'shift-entry', label: t('myChecklist') },
            { id: 'manager-dashboard', label: t('managerDashboard') },
            { id: 'cook-training', label: t('trainingModules') },
            { id: 'recipe-book', label: t('recipeBook') }
        ];
    } else if (role === 'gm') {
        tabs = [
            { id: 'gm-dashboard', label: t('gmSuite') },
            { id: 'shift-entry', label: '📝 Review Checklists' },
            { id: 'manager-dashboard', label: t('managerDashboard') },
            { id: 'cook-training', label: t('trainingModules') },
            { id: 'recipe-book', label: t('recipeBook') },
            { id: 'roster', label: t('staffRoster') }
        ];
    }

    tabs.forEach((tab, idx) => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = tab.label;
        btn.onclick = () => switchTab(tab.id, btn);
        nav.appendChild(btn);
    });

    if (tabs.length > 0) switchTab(tabs[0].id, nav.firstChild);
}

function switchTab(viewId, btnEl) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`view-${viewId}`)?.classList.add('active');
    btnEl?.classList.add('active');
    UIController.refreshActiveView();
}

// ==========================================
// 9. STATION ASSIGNMENT & CHECKLIST WORKFLOW
// ==========================================
function assignCookStation(stationName) {
    if (!Store.user) return;
    Store.user.station = stationName;
    ApiService.request('saveEmployee', { employee: Store.user }).then(() => {
        renderChecklists();
        updateGreetingLabel();
    });
}

function renderChecklists() {
    const entryView = document.getElementById('view-shift-entry');
    if (!entryView) return;

    let widget = document.getElementById('cook-station-selector-widget');
    if (Store.role === 'cook') {
        if (!widget) {
            widget = document.createElement('div');
            widget.id = 'cook-station-selector-widget';
            entryView.insertBefore(widget, entryView.firstChild);
        }
        const assigned = Store.user?.station?.trim() || "";
        widget.innerHTML = !assigned ? `
            <div class="card" style="margin-bottom:1.5rem; background:#f8fafc; border:2px solid #cbd5e1;">
                <h3 style="color:#1e3a8a; margin-top:0;">📍 Select Your Shift Station</h3>
                <div style="display:flex; gap:10px; margin-top:10px; flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="assignCookStation('Range')">🍳 Range Opener</button>
                    <button class="btn btn-primary" onclick="assignCookStation('Mid')">🥪 Mid Opener</button>
                    <button class="btn btn-primary" onclick="assignCookStation('Grill/Fry')">🍟 Grill/Fry Opener</button>
                </div>
            </div>
        ` : `
            <div class="card" style="margin-bottom:1.5rem; background:#f0fdf4; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="color:#166534; margin:0;">✅ Active Assigned Station: ${assigned}</h3>
                <button class="btn btn-secondary" style="color:#dc2626;" onclick="assignCookStation('')">Change Station 🔄</button>
            </div>
        `;
    }

    const container = document.getElementById('checklist-container');
    if (!container) return;
    container.innerHTML = '';

    if (Store.role === 'cook' && !Store.user?.station) {
        container.innerHTML = `<div class="card" style="text-align:center; padding:2rem;"><h3>👆 Please select your assigned station above to view your checklist.</h3></div>`;
        return;
    }

    const specs = CHECKLIST_SPECS[Store.lang]?.range || CHECKLIST_SPECS['en'].range;
    specs.forEach(sec => {
        let html = `<h3 class="checklist-section-title">${sec.phase}</h3>`;
        sec.tasks.forEach(t => {
            html += `
                <div class="task-row" style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
                    <input type="checkbox" class="task-checkbox" id="cb-${t.id}" onchange="updateShiftScore()">
                    <div>
                        <div class="task-title" style="font-weight:600;">${t.title}</div>
                        <div class="task-desc" style="font-size:0.85rem; color:#64748b;">${t.desc}</div>
                    </div>
                </div>`;
        });
        container.innerHTML += `<div class="card checklist-section">${html}</div>`;
    });
    updateShiftScore();
}

function updateShiftScore() {
    const cbs = document.querySelectorAll('.task-checkbox');
    const total = cbs.length;
    let checked = 0;
    cbs.forEach(cb => { if (cb.checked) checked++; });
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

    const countEl = document.getElementById('score-tasks-count');
    const pctEl = document.getElementById('score-percentage');
    if (countEl) countEl.textContent = `${checked} / ${total}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
}
// ==========================================
// 10. 6-CHANNEL MESSAGE BOARD
// ==========================================
function renderMessageBoard() {
    const container = document.getElementById('message-board-container');
    if (!container) return;

    const categories = ["Maintenance", "86'd Items", "Customer Reports", "Employees", "Orders", "General"];
    
    let html = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">💬 Management Message Board</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Post operational notes across specific channels for manager oversight.</p>
            <form onsubmit="postMessage(event)" style="display: flex; flex-direction: column; gap: 10px; margin-top: 1rem;">
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <select id="msg-category" class="form-control" style="flex: 1; min-width: 200px;" required>
                        <option value="">-- Select Channel --</option>
                        ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>
                <textarea id="msg-text" class="form-control" rows="3" placeholder="Type operational update..." required></textarea>
                <button type="submit" class="btn btn-primary" style="align-self: flex-start;">Post Message 📢</button>
            </form>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
    `;

    categories.forEach(cat => {
        const catMessages = Store.messages.filter(m => m.category === cat);
        html += `
            <div class="card" style="background: #f8fafc; border: 1px solid #e2e8f0;">
                <h4 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">📌 ${cat}</h4>
                <div style="max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
                    ${catMessages.length === 0 ? `<p style="font-size: 0.8rem; color: #94a3b8; font-style: italic;">No posts in this channel.</p>` :
                      catMessages.map(m => `
                        <div style="background: white; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-size: 0.85rem;">
                            <div style="display: flex; justify-content: space-between; font-weight: bold; color: #334155; margin-bottom: 4px;">
                                <span>${m.authorName}</span>
                                <span style="font-size: 0.75rem; color: #94a3b8;">${m.timestamp || ''}</span>
                            </div>
                            <p style="margin: 0; color: #475569;">${m.messageText}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function postMessage(e) {
    e.preventDefault();
    if (!Store.user) return;

    const category = document.getElementById('msg-category').value;
    const messageText = document.getElementById('msg-text').value.trim();
    const timestamp = new Date().toLocaleString();

    const payload = {
        id: `MSG-${Date.now()}`,
        category,
        authorName: Store.user.name,
        timestamp,
        messageText
    };

    Store.messages.push(payload);
    ApiService.request('saveMessage', { message: payload }).then(() => {
        document.getElementById('msg-text').value = '';
        renderMessageBoard();
    });
}

// ==========================================
// 11. RECIPE & PREP SPEC BOOK
// ==========================================
function renderRecipeBook() {
    const container = document.getElementById('recipe-book-container');
    if (!container) return;

    let html = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">📖 Recipe & Prep Spec Book</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Accessible to all team members for standard builds and prep specifications.</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
    `;

    if (Store.recipes.length === 0) {
        html += `<div class="card"><p style="color: #64748b;">No recipes uploaded to the spec book yet.</p></div>`;
    } else {
        Store.recipes.forEach(r => {
            html += `
                <div class="card">
                    <h4 style="color: #1e3a8a; margin-top: 0;">🍽️ ${r.menuItem} <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">${r.category || 'General'}</span></h4>
                    <p style="font-size: 0.9rem; color: #334155;"><strong>Prep Specs:</strong> ${r.prepSpecs}</p>
                    <p style="font-size: 0.9rem; color: #334155; margin-bottom: 0;"><strong>Menu Build Details:</strong> ${r.buildDetails}</p>
                </div>
            `;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
}
// ==========================================
// 12. MANAGER CHECKLISTS & COMPLETED SHIFTS
// ==========================================
function renderManagerDashboard() {
    const container = document.getElementById('manager-dashboard-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">📊 Shift Manager Dashboard & Oversight</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Review team shift logs and manage Front of House (FOH) & Back of House (BOH) manager duties.</p>
        </div>
        <div class="card">
            <h4 style="color: #1e3a8a; margin-top: 0;">⭐ Completed Shifts & Bi-Weekly Bonus Tracking</h4>
            <table class="data-table" style="width: 100%; margin-top: 1rem;">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${Store.shifts.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: #64748b;">No shifts logged yet.</td></tr>` :
                      Store.shifts.map(s => `
                        <tr>
                            <td>${s.date}</td>
                            <td><strong>${s.empName}</strong></td>
                            <td>${String(s.role || '').toUpperCase()}</td>
                            <td>${s.scorePct}%</td>
                            <td>${Number(s.scorePct) >= 85 ? '✅ Goal Met' : '❌ Missed'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ==========================================
// 13. GM ANALYTICS SUITE & TEAM LEADER APPROVALS
// ==========================================
function renderGMDashboard() {
    const container = document.getElementById('gm-dashboard-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">📈 General Manager Executive Suite</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Monitor 14-day task compliance, bonus allocations, and staff certifications.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="card" style="text-align: center;">
                <span style="font-size: 0.85rem; color: #64748b;">Active Team Members</span>
                <h2 style="color: #1e3a8a; margin: 5px 0 0 0;">${Store.employees.length}</h2>
            </div>
            <div class="card" style="text-align: center;">
                <span style="font-size: 0.85rem; color: #64748b;">Total Shifts Logged</span>
                <h2 style="color: #1e3a8a; margin: 5px 0 0 0;">${Store.shifts.length}</h2>
            </div>
        </div>
    `;
}

// ==========================================
// 14. CERTIFIED TEAM LEADER SYSTEM
// ==========================================
function isCertifiedTeamLeader(empId) {
    const empCerts = Store.certifications.filter(c => String(c.empId || c.EMPID || '').trim() === String(empId).trim());
    if (empCerts.length < 5) return false; // Assuming 5 core training modules
    return empCerts.every(rec => {
        const passed = rec.passed === true || String(rec.passed).toLowerCase() === 'true' || Number(rec.score) >= 85;
        const signed = rec.managerSignOff === true || String(rec.managerSignOff).toLowerCase() === 'true';
        return passed && signed;
    });
}
