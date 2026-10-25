/***
 * KitchenSync Pro - Full Enterprise Operations & Management Suite
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
        if (id === 'roster') renderRosterView();
    }
};

document.addEventListener('DOMContentLoaded', () => UIController.init());

// ==========================================
// 1. DATA SPECS: CHECKLISTS & TRAINING MODULES
// ==========================================
const CHECKLIST_SPECS = {
    en: {
        range: [
            {
                phase: "🌅 Opening Duties & Safety Checks",
                tasks: [
                    { id: 'r1', title: "Turn on range burners & verify flame ignition", desc: "Check all burner ports for clogs or uneven flames." },
                    { id: 'r2', title: "Calibrate line thermometers", desc: "Verify ice-water bath reads 32°F (0°C)." },
                    { id: 'r3', title: "Check hot holding wells & water levels", desc: "Ensure wells are clean and filled to operational fill line." }
                ]
            },
            {
                phase: "🔪 Prep & Stocking",
                tasks: [
                    { id: 'r4', title: "Stock line insert pans with proteins & sauces", desc: "Check expiration labels and FIFO rotation standards." },
                    { id: 'r5', title: "Sanitize station cutting boards & prep surfaces", desc: "Use approved quat sanitizer solution (200-400 ppm)." }
                ]
            }
        ],
        mid: [
            {
                phase: "🥪 Prep & Station Setup",
                tasks: [
                    { id: 'm1', title: "Turn on sandwich press & panini units", desc: "Preheat to 350°F and test press mechanism." },
                    { id: 'm2', title: "Stock cold sandwich rails & condiments", desc: "Ensure all cheese, sliced meats, and spreads are full and dated." },
                    { id: 'm3', title: "Check bread inventory & pull par-bake items", desc: "Estimate volume for the shift and stage accordingly." }
                ]
            }
        ],
        'grill/fry': [
            {
                phase: "🍟 Fryer & Grill Startup",
                tasks: [
                    { id: 'gf1', title: "Filter fryers and check oil levels", desc: "Top off oil if necessary and verify temperature controller at 350°F." },
                    { id: 'gf2', title: "Season and test flat top griddle", desc: "Scrape grill surface clean and apply high-temp cooking oil." },
                    { id: 'gf3', title: "Stock freezer baskets with fries & appetizers", desc: "Ensure back-up inventory is staged within arm's reach." }
                ]
            }
        ]
    },
    es: {
        range: [
            {
                phase: "🌅 Deberes de Apertura y Seguridad",
                tasks: [
                    { id: 'r1', title: "Encender quemadores y verificar la llama", desc: "Revisar todos los puertos en busca de obstrucciones." },
                    { id: 'r2', title: "Calibrar termómetros de línea", desc: "Verificar baño de agua con hielo a 32°F (0°C)." },
                    { id: 'r3', title: "Revisar niveles de agua en pozos calientes", desc: "Asegurar que estén limpios y llenos hasta la línea." }
                ]
            },
            {
                phase: "🔪 Preparación y Abastecimiento",
                tasks: [
                    { id: 'r4', title: "Abastecer bandejas de la línea con proteínas", desc: "Revisar etiquetas de expiración y estándares FIFO." },
                    { id: 'r5', title: "Desinfectar tablas de cortar y superficies", desc: "Usar solución desinfectante cuat of 200-400 ppm." }
                ]
            }
        ],
        mid: [
            {
                phase: "🥪 Configuración de Estación Mid",
                tasks: [
                    { id: 'm1', title: "Encender prensa de sándwiches y paninis", desc: "Precalentar a 350°F y probar mecanismo." },
                    { id: 'm2', title: "Abastecer rieles fríos y condimentos", desc: "Asegurar que quesos, carnes y aderezos estén fechados." },
                    { id: 'm3', title: "Revisar inventario de pan", desc: "Estimar volumen para el turno actual." }
                ]
            }
        ],
        'grill/fry': [
            {
                phase: "🍟 Inicio de Freidoras y Plancha",
                tasks: [
                    { id: 'gf1', title: "Filtrar freidoras y revisar niveles de aceite", desc: "Rellenar aceite y verificar temperatura a 350°F." },
                    { id: 'gf2', title: "Sazonar y probar la plancha", desc: "Raspar superficie y aplicar aceite de alta temperatura." },
                    { id: 'gf3', title: "Abastecer canastas con papas y aperitivos", desc: "Asegurar inventario de respaldo al alcance." }
                ]
            }
        ]
    }
};

const TRAINING_MODULES = [
    {
        id: 'MOD-01',
        title: "Food Safety & HACCP Temperature Control",
        description: "Master internal cooking temps, the danger zone, and cooling logs.",
        questions: [
            { q: "What is the temperature danger zone threshold?", options: ["41°F to 135°F", "32°F to 100°F", "50°F to 150°F"], correct: 0 },
            { q: "What is the minimum internal cooking temp for poultry?", options: ["145°F", "155°F", "165°F"], correct: 2 }
        ]
    },
    {
        id: 'MOD-02',
        title: "Kitchen Equipment Safety & Chemical Handling",
        description: "Safe operation of slicers, mixers, and quat sanitizers.",
        questions: [
            { q: "What ppm range is required for quaternary sanitizer?", options: ["50-100 ppm", "200-400 ppm", "500-800 ppm"], correct: 1 },
            { q: "When must the slicer blade guard be cleaned?", options: ["End of week", "Only when requested", "After every use and every 4 hours of continuous use"], correct: 2 }
        ]
    }
];

// ==========================================
// 2. AUTHENTICATION & NAVIGATION ROUTER
// ==========================================
function handleLogin(e) {
    e.preventDefault();
    const pin = document.getElementById('auth-password').value.trim();

    if (pin === CONFIG.GM_MASTER_PASSCODE) {
        Store.setSession({ id: "GM-ADMIN", name: "General Manager", role: "gm", station: "All" }, "gm");
        finalizeLogin();
        return;
    }

    const emp = Store.employees.find(e => String(e.pin).trim() === pin && (e.active === true || String(e.active).toLowerCase() === 'true'));
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
// 3. TRANSLATION ENGINE
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
// 4. ROLE-BASED NAVIGATION & VIEW ROUTER
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
            { id: 'recipe-book', label: t('recipeBook') },
            { id: 'roster', label: t('staffRoster') }
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
// 5. STATION ASSIGNMENT & CHECKLIST WORKFLOW
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

    const stationKey = Store.role === 'cook' ? (Store.user?.station?.toLowerCase().includes('mid') ? 'mid' : Store.user?.station?.toLowerCase().includes('grill') ? 'grill/fry' : 'range') : 'range';
    const specs = CHECKLIST_SPECS[Store.lang]?.[stationKey] || CHECKLIST_SPECS['en'][stationKey] || CHECKLIST_SPECS['en'].range;

    specs.forEach(sec => {
        let html = `<h3 class="checklist-section-title" style="color:#1e3a8a; margin-bottom:0.75rem;">${sec.phase}</h3>`;
        sec.tasks.forEach(t => {
            html += `
                <div class="task-row" style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
                    <input type="checkbox" class="task-checkbox" id="cb-${t.id}" onchange="updateShiftScore()" style="width:20px; height:20px; cursor:pointer;">
                    <div>
                        <div class="task-title" style="font-weight:600; color:#334155;">${t.title}</div>
                        <div class="task-desc" style="font-size:0.85rem; color:#64748b;">${t.desc}</div>
                    </div>
                </div>`;
        });
        container.innerHTML += `<div class="card checklist-section">${html}</div>`;
    });

    container.innerHTML += `
        <div style="margin-top: 1.5rem; display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="submitShiftChecklist()">💾 Save & Submit Shift Checklist</button>
        </div>
    `;
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

function submitShiftChecklist() {
    if (!Store.user) return;
    const cbs = document.querySelectorAll('.task-checkbox');
    const total = cbs.length;
    let checked = 0;
    cbs.forEach(cb => { if (cb.checked) checked++; });
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

    const shiftRecord = {
        id: `SHIFT-${Date.now()}`,
        empId: Store.user.id,
        empName: Store.user.name,
        role: Store.role,
        station: Store.user.station || 'General',
        date: new Date().toISOString().split('T')[0],
        tasksCompleted: checked,
        totalTasks: total,
        scorePct: pct,
        notes: pct >= 85 ? "Goal Met" : "Needs Improvement"
    };

    Store.shifts.push(shiftRecord);
    ApiService.request('saveShift', { shift: shiftRecord }).then(res => {
        if (res && res.success) {
            alert(`🎉 Shift checklist submitted successfully! Score: ${pct}%`);
            switchTab('cook-dashboard', document.querySelector('.tab-btn'));
        } else {
            alert("Error saving shift record.");
        }
    });
}

// ==========================================
// 6. 6-CHANNEL CATEGORIZED MESSAGE BOARD
// ==========================================
function renderMessageBoard() {
    const container = document.getElementById('message-board-container');
    if (!container) return;

    const categories = ["Maintenance", "Injuries", "Customers", "Employees", "General"];

    let html = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">💬 Management Message Board</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Post operational updates across dedicated categories for team oversight.</p>
            <form onsubmit="postMessage(event)" style="display: flex; flex-direction: column; gap: 10px; margin-top: 1rem;">
                <select id="msg-category" class="form-control" required>
                    <option value="">-- Select Channel --</option>
                    ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <textarea id="msg-text" class="form-control" rows="3" placeholder="Type operational update..." required></textarea>
                <button type="submit" class="btn btn-primary" style="align-self: flex-start;">Post Message 📢</button>
            </form>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
    `;

    categories.forEach(cat => {
        const catMessages = Store.messages.filter(m => String(m.category).trim().toLowerCase() === cat.toLowerCase());
        html += `
            <div class="card" style="background: #f8fafc; border: 1px solid #e2e8f0;">
                <h4 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">📌 ${cat}</h4>
                <div style="max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
                    ${catMessages.length === 0 ? `<p style="font-size: 0.8rem; color: #94a3b8; font-style: italic;">No posts in this channel.</p>` :
                        catMessages.map(m => `
                            <div style="background: white; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-size: 0.85rem;">
                                <div style="display: flex; justify-content: space-between; font-weight: bold; color: #334155; margin-bottom: 4px;">
                                    <span>${m.authorName || m.author || 'Staff'}</span>
                                    <span style="font-size: 0.75rem; color: #94a3b8;">${m.timestamp || ''}</span>
                                </div>
                                <p style="margin: 0; color: #475569;">${m.messageText || m.text || ''}</p>
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
// 7. RECIPE & PREP SPEC BOOK
// ==========================================
function renderRecipeBook() {
    const container = document.getElementById('recipe-book-container');
    if (!container) return;

    let html = `
        <div class="card" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
                <h3 style="color: #1e3a8a; margin: 0 0 4px 0;">📖 Recipe & Prep Spec Book</h3>
                <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Standard builds and prep specifications for kitchen execution.</p>
            </div>
            ${Store.role === 'gm' ? `<button class="btn btn-primary" onclick="openRecipeModal()">+ Add Recipe / Spec</button>` : ''}
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
    `;

    if (Store.recipes.length === 0) {
        html += `<div class="card"><p style="color: #64748b;">No recipes uploaded to the spec book yet.</p></div>`;
    } else {
        Store.recipes.forEach(r => {
            html += `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <h4 style="color: #1e3a8a; margin-top: 0;">🍽️ ${r.menuItem || r.title || 'Recipe'} <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">${r.category || 'General'}</span></h4>
                        ${Store.role === 'gm' ? `<button class="btn btn-secondary" style="color: #dc2626; padding: 4px 8px; font-size: 0.8rem;" onclick="deleteRecipe('${r.id || r.menuItem}')">Delete 🗑️</button>` : ''}
                    </div>
                    <p style="font-size: 0.9rem; color: #334155;"><strong>Prep Specs:</strong> ${r.prepSpecs || r.specs || ''}</p>
                    <p style="font-size: 0.9rem; color: #334155; margin-bottom: 0;"><strong>Menu Build Details:</strong> ${r.buildDetails || r.details || ''}</p>
                </div>
            `;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
}

// ==========================================
// 8. TRAINING & CERTIFICATIONS MODULES
// ==========================================
function renderTrainingView() {
    const listContainer = document.getElementById('training-modules-list');
    if (!listContainer) return;

    let html = '';
    TRAINING_MODULES.forEach(mod => {
        const userCert = Store.certifications.find(c => String(c.empId || c.EMPID).trim() === String(Store.user.id).trim() && String(c.modId || c.MODID).trim() === String(mod.id).trim());
        const passed = userCert && (userCert.passed === true || String(userCert.passed).toLowerCase() === 'true' || Number(userCert.score) >= 85);
        const signedOff = userCert && (userCert.managerSignOff === true || String(userCert.managerSignOff).toLowerCase() === 'true');

        html += `
            <div class="card" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h4 style="color: #1e3a8a; margin: 0 0 4px 0;">${mod.id}: ${mod.title}</h4>
                    <p style="font-size: 0.85rem; color: #64748b; margin: 0;">${mod.description}</p>
                    <div style="margin-top: 8px; font-size: 0.85rem; font-weight: 600;">
                        Status: ${passed ? (signedOff ? '✅ Certified & Signed Off' : '⏳ Passed (Pending GM Sign-Off)') : '❌ Not Completed'}
                    </div>
                </div>
                <button class="btn btn-primary" onclick="openQuizModal('${mod.id}')">${passed ? 'Retake Quiz 📝' : 'Take Quiz 🚀'}</button>
            </div>
        `;
    });
    listContainer.innerHTML = html;
}

function openQuizModal(modId) {
    const mod = TRAINING_MODULES.find(m => m.id === modId);
    if (!mod) return;

    document.getElementById('quiz-modal-title').textContent = mod.title;
    const body = document.getElementById('quiz-modal-body');
    body.innerHTML = `
        <input type="hidden" id="active-mod-id" value="${mod.id}">
        <p style="color: #64748b; font-size: 0.9rem;">${mod.description}</p>
        ${mod.questions.map((qObj, idx) => `
            <div style="margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem;">
                <p style="font-weight: 600; color: #1e3a8a;">${idx + 1}. ${qObj.q}</p>
                ${qObj.options.map((opt, oIdx) => `
                    <label style="display: block; margin-bottom: 4px; font-size: 0.9rem; cursor: pointer;">
                        <input type="radio" name="q-${idx}" value="${oIdx}"> ${opt}
                    </label>
                `).join('')}
            </div>
        `).join('')}
    `;
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuizModal() {
    document.getElementById('quiz-modal').style.display = 'none';
}

function submitQuizAnswers() {
    const modId = document.getElementById('active-mod-id').value;
    const mod = TRAINING_MODULES.find(m => m.id === modId);
    if (!mod) return;

    let correctCount = 0;
    mod.questions.forEach((qObj, idx) => {
        const selected = document.querySelector(`input[name="q-${idx}"]:checked`);
        if (selected && Number(selected.value) === qObj.correct) {
            correctCount++;
        }
    });

    const score = Math.round((correctCount / mod.questions.length) * 100);
    const passed = score >= 85;

    const certRecord = {
        empId: Store.user.id,
        modId: mod.id,
        score: score,
        passed: passed,
        managerSignOff: false
    };

    Store.certifications.push(certRecord);
    ApiService.request('saveCert', { cert: certRecord }).then(() => {
        closeQuizModal();
        alert(`Quiz submitted! Score: ${score}% (${passed ? '✅ Passed' : '❌ Failed'})`);
        renderTrainingView();
        updateGreetingLabel();
    });
}

function isCertifiedTeamLeader(empId) {
    const empCerts = Store.certifications.filter(c => String(c.empId || c.EMPID || '').trim() === String(empId).trim());
    if (empCerts.length < TRAINING_MODULES.length) return false;
    return empCerts.every(rec => {
        const passed = rec.passed === true || String(rec.passed).toLowerCase() === 'true' || Number(rec.score) >= 85;
        const signed = rec.managerSignOff === true || String(rec.managerSignOff).toLowerCase() === 'true';
        return passed && signed;
    });
}

// ==========================================
// 9. DASHBOARDS & COMPLETED SHIFTS
// ==========================================
function renderCookDashboard() {
    const container = document.getElementById('cook-dashboard-content');
    if (!container) return;

    const myShifts = Store.shifts.filter(s => String(s.empId).trim() === String(Store.user.id).trim());

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">⭐ My Completed Shifts & Performance Log</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Review your past shift checklist history and compliance scores.</p>
        </div>
        <div class="card">
            <table class="data-table" style="width: 100%;">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Station</th>
                        <th>Completed Tasks</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${myShifts.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: #64748b;">No shifts logged yet. Complete your checklist to log a shift!</td></tr>` :
                        myShifts.map(s => `
                            <tr>
                                <td>${s.date}</td>
                                <td>${s.station || 'General'}</td>
                                <td>${s.tasksCompleted} / ${s.totalTasks}</td>
                                <td>${s.scorePct}%</td>
                                <td>${Number(s.scorePct) >= 85 ? '✅ Goal Met' : '❌ Missed'}</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderManagerDashboard() {
    const container = document.getElementById('manager-dashboard-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">📊 Shift Manager Dashboard & Oversight</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Review team shift logs and operational updates.</p>
        </div>
        <div class="card" style="margin-bottom: 1.5rem;">
            <h4 style="color: #1e3a8a; margin-top: 0;">⭐ Completed Team Shifts</h4>
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
        <div id="message-board-container"></div>
    `;
    renderMessageBoard();
}

function renderGMDashboard() {
    const container = document.getElementById('gm-dashboard-content');
    if (!container) return;

    const pendingCerts = Store.certifications.filter(c => {
        const passed = c.passed === true || String(c.passed).toLowerCase() === 'true' || Number(c.score) >= 85;
        const signed = c.managerSignOff === true || String(c.managerSignOff).toLowerCase() === 'true';
        return passed && !signed;
    });

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 style="color: #1e3a8a; margin-top: 0;">📈 General Manager Executive Suite</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Manage employees, approve training certifications, and monitor operations.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="card" style="text-align: center;">
                <span style="font-size: 0.85rem; color: #64748b;">Active Team Members</span>
                <h2 style="color: #1e3a8a; margin: 5px 0 0 0;">${Store.employees.length}</h2>
            </div>
            <div class="card" style="text-align: center;">
                <span style="font-size: 0.85rem; color: #64748b;">Total Shifts Logged</span>
                <h2 style="color: #1e3a8a; margin: 5px 0 0 0;">${Store.shifts.length}</h2>
            </div>
            <div class="card" style="text-align: center;">
                <span style="font-size: 0.85rem; color: #64748b;">Pending Cert Sign-Offs</span>
                <h2 style="color: #dc2626; margin: 5px 0 0 0;">${pendingCerts.length}</h2>
            </div>
        </div>
        <div class="card" style="margin-bottom: 1.5rem;">
            <h4 style="color: #1e3a8a; margin-top: 0;">🎓 Pending Training Certifications for Approval</h4>
            <table class="data-table" style="width: 100%; margin-top: 1rem;">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Module ID</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${pendingCerts.length === 0 ? `<tr><td colspan="4" style="text-align: center; color: #64748b;">No pending certifications to approve.</td></tr>` :
                        pendingCerts.map(c => `
                            <tr>
                                <td>${c.empId || c.EMPID}</td>
                                <td>${c.modId || c.MODID}</td>
                                <td>${c.score}%</td>
                                <td><button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.8rem;" onclick="gmSignOffCert('${c.empId || c.EMPID}', '${c.modId || c.MODID}')">Approve Sign-Off ✅</button></td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
        <div class="card">
            <h4 style="color: #1e3a8a; margin-top: 0;">🛠️ GM Quick Actions</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 1rem;">
                <button class="btn btn-primary" onclick="openEmployeeModal()">+ Add New Employee</button>
                <button class="btn btn-primary" onclick="openRecipeModal()">+ Add Recipe / Spec</button>
            </div>
        </div>
    `;
}

function gmSignOffCert(empId, modId) {
    const cert = Store.certifications.find(c => String(c.empId || c.EMPID).trim() === String(empId).trim() && String(c.modId || c.MODID).trim() === String(modId).trim());
    if (!cert) return;
    cert.managerSignOff = true;
    ApiService.request('saveCert', { cert }).then(() => {
        renderGMDashboard();
        alert("Certification approved and signed off!");
    });
}

// ==========================================
// 10. GM CRUD: EMPLOYEES & RECIPES
// ==========================================
function renderRosterView() {
    const tbody = document.getElementById('roster-table-body');
    if (!tbody) return;

    tbody.innerHTML = Store.employees.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: #64748b;">No employees found.</td></tr>` :
        Store.employees.map(emp => `
            <tr>
                <td>${emp.id || emp.ID}</td>
                <td><strong>${emp.name || emp.Name}</strong></td>
                <td>${String(emp.role || emp.Role || 'cook').toUpperCase()}</td>
                <td>${emp.station || emp.Station || 'General'}</td>
                <td>$${emp.hourlyRate || emp.HourlyRate || '0.00'}</td>
                <td>
                    ${Store.role === 'gm' ? `<button class="btn btn-secondary" style="color: #dc2626; padding: 4px 8px; font-size: 0.8rem;" onclick="deleteEmployee('${emp.id || emp.ID}')">Delete 🗑️</button>` : ''}
                </td>
            </tr>
        `).join('');
}

function openEmployeeModal() {
    const name = prompt("Enter employee name:");
    if (!name) return;
    const role = prompt("Enter role (cook, manager, gm):", "cook");
    const pin = prompt("Enter 4-digit PIN code:", "1234");
    const station = prompt("Enter default station (Range, Mid, Grill/Fry):", "Range");
    const hourlyRate = prompt("Enter hourly rate:", "18.00");

    const newEmp = {
        id: `EMP-${Date.now()}`,
        name,
        role,
        station,
        hourlyRate,
        pin,
        active: true
    };

    Store.employees.push(newEmp);
    ApiService.request('saveEmployee', { employee: newEmp }).then(() => {
        alert("Employee added successfully!");
        renderRosterView();
    });
}

function deleteEmployee(empId) {
    if (!confirm("Are you sure you want to remove this employee?")) return;
    Store.employees = Store.employees.filter(e => String(e.id || e.ID).trim() !== String(empId).trim());
    renderRosterView();
    alert("Employee removed from active view.");
}

function openRecipeModal() {
    const menuItem = prompt("Enter Recipe / Menu Item Name:");
    if (!menuItem) return;
    const category = prompt("Enter Category (Appetizer, Entree, Prep, Sauce):", "Entree");
    const prepSpecs = prompt("Enter Prep Specifications:");
    const buildDetails = prompt("Enter Menu Build Details:");

    const newRecipe = {
        id: `REC-${Date.now()}`,
        menuItem,
        category,
        prepSpecs,
        buildDetails
    };

    Store.recipes.push(newRecipe);
    ApiService.request('saveRecipe', { recipe: newRecipe }).then(() => {
        alert("Recipe added successfully!");
        renderRecipeBook();
    });
}

function deleteRecipe(recId) {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    Store.recipes = Store.recipes.filter(r => String(r.id || r.menuItem).trim() !== String(recId).trim());
    renderRecipeBook();
    alert("Recipe deleted successfully.");
}
