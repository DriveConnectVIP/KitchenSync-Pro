/**
 * KitchenSync Pro - Streamlined & Fully Functional main.js
 */

const CONFIG = {
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxLUl-5Fx1XvJT6jVUURqSeGXT0sFgOB64kESRw4OIC9hxP0hTA4wG46SVV5Ym_UvHJ/exec",
    GM_MASTER_PASSCODE: "9999"
};

// ==========================================
// 1. APPLICATION STATE & STORE
// ==========================================
const Store = {
    currentLanguage: 'en',
    currentRole: null,
    currentUser: null,
    employees: [],
    shifts: [],
    certifications: [],
    payrollApprovals: [],
    taskNotes: {},
    activeNoteTaskId: null,
    activeQuizModuleId: null,
    activeModalEmpId: null,

    setSession(user, role) {
        this.currentUser = user;
        this.currentRole = role ? role.toLowerCase() : 'cook';
    },

    clearSession() {
        this.currentUser = null;
        this.currentRole = null;
    }
};

// ==========================================
// 2. API SERVICE (BACKEND COMMUNICATION)
// ==========================================
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

    async fetchAllData() {
        const [emps, shifts, certs, approvals] = await Promise.all([
            this.request('getEmployees'),
            this.request('getShifts'),
            this.request('getCerts'),
            this.request('getApprovals')
        ]);

        if (emps) Store.employees = emps;
        if (shifts) Store.shifts = shifts;
        if (certs) Store.certifications = certs;
        if (approvals) Store.payrollApprovals = approvals;

        UIController.refreshActiveView();
    }
};

// ==========================================
// 3. CHECKLIST & TRAINING SPECIFICATIONS
// ==========================================
const CHECKLIST_SPECS = {
    en: {
        range: [
            {
                phase: "RANGE CLOSING PROCEDURES",
                tasks: [
                    { id: "rng-1", title: "Range Prep & Close Start", desc: "One hour prior to close, break down veg. and poach pans and bring to dish." },
                    { id: "rng-2", title: "Range Tops & Burners", desc: "Brush down range tops and clean under burners." },
                    { id: "rng-3", title: "Small Grill & Traps", desc: "Clean traps for range and small grill. Shut down one oven." },
                    { id: "rng-4", title: "Egg Station Stainless", desc: "Clean all stainless in egg station, including oven doors, traulsens, and table." },
                    { id: "rng-5", title: "Traulsen Interior & Racks", desc: "Clean interior of traulsen, including wire racks." },
                    { id: "rng-6", title: "Product Rotation & Cover", desc: "Restock traulsen, ensuring that all product is rotated and covered." },
                    { id: "rng-7", title: "Oven Foil Liners", desc: "Change foil in oven and wipe/scup interior doors of ovens." },
                    { id: "rng-8", title: "Top Shelf Liners", desc: "Change foil liners on top shelves as needed." },
                    { id: "rng-9", title: "Bread Restock", desc: "Restock bread as necessary, rotating product." },
                    { id: "rng-10", title: "Walk-In Ice & Drains", desc: "Drain and ice fish in the walk-in." },
                    { id: "rng-11", title: "Thaw Pull & Meats", desc: "Check thaw pull including all meats, fish, and other frozen product." },
                    { id: "rng-12", title: "Line Sweep & Mop", desc: "TEAMWORK: Assist other cooks to thoroughly sweep, deck brush, and mop the line floor." },
                    { id: "rng-13", title: "Manager Sign-Out", desc: "Check with a manager prior to clocking out and leaving your shift!" }
                ]
            }
        ],
        mid: [
            {
                phase: "MID CLOSING PROCEDURES",
                tasks: [
                    { id: "mid-1", title: "Sandwich Unit Utensils", desc: "One hour prior to close, remove all utensils from the sandwich unit." },
                    { id: "mid-2", title: "Top Unit Interior", desc: "Clean interior (top) of unit under pans and around housing." },
                    { id: "mid-3", title: "Lower Unit Interior", desc: "Clean interior of lower portion of the unit, including the upper shelf inside." },
                    { id: "mid-4", title: "Unit Back & Floor", desc: "Pull out the unit and clean the back of the unit and the floor behind it." },
                    { id: "mid-5", title: "Pans & Rotation", desc: "Flip all pans and restock all items, making sure to properly rotate product." },
                    { id: "mid-6", title: "Double Stock Policy", desc: "DO NOT double stock product. There should be one full pan of every item." },
                    { id: "mid-7", title: "Unit Lid Cleaning", desc: "Clean the lid of the unit inside and out." },
                    { id: "mid-8", title: "Microwave Interior/Exterior", desc: "Clean the microwave inside and out, including the microwave shelf." },
                    { id: "mid-9", title: "Plates & To-Go Restock", desc: "Restock all plates and to go containers as needed." },
                    { id: "mid-10", title: "Thaw Pull & Floors", desc: "Assist with thaw pull and floors." },
                    { id: "mid-11", title: "Sandwich Item Coverage", desc: "Ensure that all sandwich items are covered at the end of your shift." },
                    { id: "mid-12", title: "Manager Sign-Out", desc: "Check with a manager prior to clocking out and leaving your shift!" }
                ]
            }
        ],
        fry: [
            {
                phase: "GRILL / FRY CLOSING PROCEDURES",
                tasks: [
                    { id: "gf-1", title: "Pancake Batter Prep", desc: "One hour prior to close, flip pancake batter to a 6th pan with a ladle." },
                    { id: "gf-2", title: "Batter Gun Maintenance", desc: "Bring the batter gun to dish." },
                    { id: "gf-3", title: "Lower Grill Shelf & Dials", desc: "Wipe and scrub lower shelf of the grill and clean temperature dials." },
                    { id: "gf-4", title: "Fryer Crumbs & Particles", desc: "Strain the fryers of excess crumbs and food particles." },
                    { id: "gf-5", title: "Dividers & Front Panels", desc: "Wipe down the stainless dividers and the front of the fryers." },
                    { id: "gf-6", title: "Fryolator Close Down", desc: "Close down one fryolator." },
                    { id: "gf-7", title: "New Fry Pan & Top-Off", desc: "Sift fry flour into a new pan and top off if necessary." },
                    { id: "gf-8", title: "Steam Tables", desc: "Clean the sink by the steam tables." },
                    { id: "gf-9", title: "Thorough Steam Table Clean", desc: "Break down and thoroughly clean the steam tables." },
                    { id: "gf-10", title: "Steam Table Cambros", desc: "Place product from steam tables in ten (10) palstic cambros and place on cart." },
                    { id: "gf-11", title: "Sausage & Bacon Wrap", desc: "Place left over sausage and bacon with foil, label, and place on lower rack of cart." },
                    { id: "gf-12", title: "Fryolator Oil Change Note", desc: "Make note if the fryolators need to be changed on the dry erase board." },
                    { id: "gf-13", title: "Grill & Wall Clean", desc: "At close, clean the grill, grill rails, and wall behind the grill." },
                    { id: "gf-14", title: "Grease Trap Maintenance", desc: "Clean the grease trap for the grill into a metal German pan." },
                    { id: "gf-15", title: "Char Broiler & Trap", desc: "Brush down the char broiler and clean the trap." },
                    { id: "gf-16", title: "Grease Trap to Outside", desc: "Run grease to outside grease trap. DO NOT leave grease inside overnight!" },
                    { id: "gf-17", title: "Freezer Restock", desc: "Restock freezer (French Fries, chicken, mac and cheese, etc)." },
                    { id: "gf-18", title: "Manager Sign-Out", desc: "Check with a manager prior to clocking out and leaving your shift!" }
                ]
            }
        ],
        manager: [
            {
                phase: "AM OPENING",
                tasks: [
                    { id: "m1", title: "Safe & Cash Audit", desc: "Count safe, log opening cash, and verify register tills match starting balances." },
                    { id: "m2", title: "Facilities Inspection", desc: "Walk exterior/interior. Check FOH lighting, music, temp, and prep line." },
                    { id: "m3", title: "Prep Sheet & Inventory Audit", desc: "Review daily kitchen prep sheets against current pars and protein counts." },
                    { id: "m4", title: "Labor Lineup & Budgeting", desc: "Review daily roster. Compare forecasted sales with scheduled hours." }
                ]
            },
            {
                phase: "PRE-SHIFT & MID-SHIFT",
                tasks: [
                    { id: "m5", title: "Manager-Cook Pre-Shift Meeting", desc: "Run 5-min huddle with kitchen crew. Align on daily specials & targets." },
                    { id: "m6", title: "Mandatory BOH Line Check", desc: "Audit kitchen line. Taste items, check hot/cold temperatures." },
                    { id: "m7", title: "Active Floor Management", desc: "Lead peak rushes on floor. Monitor guest satisfaction & table turn times." },
                    { id: "m8", title: "Mid-Day Labor Cuts", desc: "Evaluate labor %. Cut hours dynamically if sales drop below forecast." }
                ]
            },
            {
                phase: "PM / CLOSE",
                tasks: [
                    { id: "m9", title: "PM Kitchen Line Check", desc: "Conduct secondary check on line item quality and station pars." },
                    { id: "m10", title: "Daily Food Waste Logging", desc: "Review and input kitchen waste log. Investigate excessive errors." },
                    { id: "m11", title: "Final Kitchen Close Audit", desc: "Walkthrough kitchen close. Verify clean stations and FIFO labels." },
                    { id: "m12", title: "P&L & Shift Summary", desc: "Close out financials, deposit cash, and write summary log." }
                ]
            }
        ]
    },
    es: {
        range: [{ phase: "PROCEDIMIENTOS DE CIERRE - RANGO", tasks: [{ id: "rng-1", title: "Preparación de Rango y Inicio", desc: "Una hora antes del cierre..." }] }],
        mid: [{ phase: "PROCEDIMIENTOS DE CIERRE - MID", tasks: [{ id: "mid-1", title: "Utensilios de Unidad de Sándwich", desc: "Una hora antes..." }] }],
        fry: [{ phase: "PROCEDIMIENTOS DE CIERRE - GRILL / FRY", tasks: [{ id: "gf-1", title: "Preparación de Masa", desc: "Una hora antes..." }] }],
        manager: [{ phase: "APERTURA AM", tasks: [{ id: "m1", title: "Auditoría de Caja Fuerte", desc: "Contar safe..." }] }]
    }
};

const TRAINING_MODULES = [
    { id: "BOH-TR-01", title: "Module 1: Station Specialization & Line Mastery", desc: "Master core line stations and menu execution.", questions: [
        { q: "Which station is responsible for cooking standard eggs and baking signature oven-baked omelettes?", options: ["Flattop Grille", "Range & Ovens", "Sandwich Board", "Fry Station"], answer: 1 },
        { q: "Who operates the meat grill (burgers, corned beef hash, grilled chicken)?", options: ["Range & Ovens", "Flattop Grille", "Sandwich Board", "Prep Cook"], answer: 0 },
        { q: "Who operates the larger flat top grill dedicated to sausage, bacon, and home fries?", options: ["Range & Ovens", "Flattop Grille", "Sandwich Board", "Fry Station"], answer: 1 },
        { q: "On weekends, what additional specialized role does the Sandwich Board cook take on?", options: ["Dishwashing", "Line Expediter / Plating Setup", "Cashier", "Inventory Manager"], answer: 1 }
    ]},
    { id: "BOH-TR-02", title: "Module 2: Prep Tier Accountability & Minor Prep Execution", desc: "Understand line cook minor prep duties vs bulk prep.", questions: [
        { q: "Which of the following is considered minor prep that line cooks are responsible for?", options: ["Bulk German batter", "Chopping fresh omelette ingredients & portioning cheese/lobster", "Slicing roasted turkey", "Portioning canned hash"], answer: 1 },
        { q: "Who is responsible for major bulk prep items like German batter and pancake batter?", options: ["Line Cooks", "Prep Person / Manager", "Servers", "Dishwashers"], answer: 1 },
        { q: "What must line cooks do with bulk prep items at shift handover?", options: ["Throw them away", "Verify par levels", "Ignore them", "Cook them immediately"], answer: 1 }
    ]},
    { id: "BOH-TR-03", title: "Module 3: Food Safety, Temperature Control & Critical Control Points", desc: "Internal temperature logs and FIFO rotation.", questions: [
        { q: "What tool must be used to verify internal temperatures of pot roast and oven-roasted turkey?", options: ["Kitchen timer", "Sanitized digital probe thermometer", "Visual inspection", "Touch test"], answer: 1 },
        { q: "What does FIFO stand for?", options: ["Fast In, Fast Out", "First-In, First-Out", "Fresh Ingredients, Fast Operation", "Food Inspection & Facility Order"], answer: 1 },
        { q: "Where should older stock be positioned when rotating line ingredients?", options: ["In the back", "At the front", "In the trash", "On the floor"], answer: 1 }
    ]},
    { id: "BOH-TR-04", title: "Module 4: Weekday vs. Weekend Line Dynamics & Workflow", desc: "Adapt operational speed and station support.", questions: [
        { q: "How many cooks are generally scheduled on standard weekdays?", options: ["1 cook", "2 cooks", "5 cooks", "10 cooks"], answer: 1 },
        { q: "During busy weekend shifts with 3-4 cooks, what does the sandwich board cook help orchestrate?", options: ["Ticket pacing, plating setup, and toast preparation", "Only dishwashing", "Customer seating", "Deliveries"], answer: 0 }
    ]},
    { id: "BOH-TR-05", title: "Module 5: Zero-Tolerance Food Safety, Hygiene & Cross-Contamination", desc: "Personal hygiene, glove changes, and station cleanliness.", questions: [
        { q: "What is the mandatory action if a cook touches their face, hair, or licks their fingers?", options: ["Keep cooking", "Wipe hands on apron", "Remove gloves, wash hands for 20 seconds, and put on fresh gloves", "Spray sanitizer on gloves"], answer: 2 },
        { q: "Are gloves considered a substitute for handwashing?", options: ["Yes, completely", "No, never", "Only during lunch rush", "Only on weekends"], answer: 1 },
        { q: "Can you wash and reuse single-use disposable gloves?", options: ["Yes", "No, they must be discarded and replaced", "Only if washed with hot water", "Only for prep work"], answer: 1 }
    ]}
];

// ==========================================
// 4. UI CONTROLLER & VIEW RENDERERS
// ==========================================
const UIController = {
    init() {
        const today = new Date().toISOString().split('T')[0];
        ['shift-date', 'cook-shift-date', 'gm-calendar-lookup-date'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = today;
        });
        ApiService.fetchAllData();
    },

    refreshActiveView() {
        const activeView = document.querySelector('.app-view.active');
        if (!activeView) return;
        const viewId = activeView.id.replace('view-', '');
        if (viewId === 'shift-entry') renderChecklistForm();
        if (viewId === 'gm-dashboard') renderGMExecutiveDashboard();
        if (viewId === 'cook-dashboard') renderCookDashboard();
        if (viewId === 'cook-training') renderTrainingModulesView();
        if (viewId === 'manager-dashboard') renderManagerDashboard();
        if (viewId === 'roster') renderRosterTable();
    }
};

// ==========================================
// 5. CORE ACTIONS & WORKFLOWS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    UIController.init();
});

function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('auth-password').value.trim();

    if (password === CONFIG.GM_MASTER_PASSCODE) {
        Store.setSession({ id: "GM-ADMIN", name: "General Manager", role: "gm", station: "All Stations" }, "gm");
        finalizeLogin();
        return;
    }

    const matchedEmp = Store.employees.find(emp => String(emp.pin).trim() === password && emp.active);
    if (matchedEmp) {
        Store.setSession(matchedEmp, matchedEmp.role || 'cook');
        finalizeLogin();
        return;
    }

    ApiService.request('authenticate', { password }).then(data => {
        if (data && data.success) {
            Store.setSession(data.employee || { id: "EMP-UNKNOWN", name: "Employee", role: data.role || "cook", station: "" }, data.role || 'cook');
            finalizeLogin();
        } else {
            alert(data && data.error ? data.error : "Invalid PIN or Passcode.");
        }
    });
}

function finalizeLogin() {
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('app-wrapper').style.display = 'block';
    updateUserGreetingLabel();
    buildNavigationForRole(Store.currentRole);
    renderChecklistForm();
}

function isCertifiedLeader(empId) {
    const empCerts = Store.certifications.filter(c => String(c.empId || c.EMPID || c.empid || '').trim() === String(empId).trim());
    if (empCerts.length < TRAINING_MODULES.length) return false;
    return TRAINING_MODULES.every(mod => {
        const rec = empCerts.find(c => String(c.modId || c.MODID || c.modid || '').trim() === String(mod.id).trim());
        const passed = rec && (rec.passed === true || String(rec.passed).toLowerCase() === 'true' || Number(rec.score) >= 85);
        const signed = rec && (rec.managerSignOff === true || String(rec.managerSignOff).toLowerCase() === 'true');
        return rec && passed && signed;
    });
}

function updateUserGreetingLabel() {
    if (!Store.currentUser) return;
    const certified = isCertifiedLeader(Store.currentUser.id);
    const badge = certified ? ' ⭐️ CERTIFIED TEAM LEADER' : '';
    const label = document.getElementById('logged-in-user-label');
    if (label) label.textContent = `${Store.currentUser.name}${badge} (${Store.currentRole.toUpperCase()})`;
}

function logoutSession() {
    Store.clearSession();
    document.getElementById('auth-password').value = '';
    document.getElementById('app-wrapper').style.display = 'none';
    document.getElementById('auth-modal').style.display = 'flex';
}

function toggleLanguage() {
    Store.currentLanguage = Store.currentLanguage === 'en' ? 'es' : 'en';
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = Store.currentLanguage === 'es' ? '🇺🇸 English' : '🇪🇸 Español';
    buildNavigationForRole(Store.currentRole);
}

function buildNavigationForRole(role) {
    const navContainer = document.getElementById('nav-tabs-container');
    navContainer.innerHTML = '';

    let tabs = [];
    if (role === 'cook') {
        tabs = [
            { id: 'shift-entry', label: Store.currentLanguage === 'es' ? '📝 Mi Lista de Turno' : '📝 My Shift Checklist' },
            { id: 'cook-dashboard', label: Store.currentLanguage === 'es' ? '⭐ Turnos Completados' : '⭐ Shifts Completed' },
            { id: 'cook-training', label: Store.currentLanguage === 'es' ? '🎓 Módulos' : '🎓 Training Modules' }
        ];
    } else if (role === 'manager') {
        tabs = [
            { id: 'shift-entry', label: '📝 Shift Checklist' },
            { id: 'manager-dashboard', label: '📊 Shift Manager Dashboard' },
            { id: 'cook-training', label: '🎓 Training & Certs' }
        ];
    } else if (role === 'gm') {
        tabs = [
            { id: 'gm-dashboard', label: '📈 General Manager Suite' },
            { id: 'shift-entry', label: '📝 Review Checklists' },
            { id: 'cook-training', label: '🎓 Training & Certs' },
            { id: 'roster', label: '👥 Staff Roster' }
        ];
    }

    tabs.forEach((t, idx) => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = t.label;
        btn.onclick = () => {
            switchView(t.id, btn);
            if (t.id === 'shift-entry') renderChecklistForm();
        };
        navContainer.appendChild(btn);
    });

    if (tabs.length > 0) switchView(tabs[0].id, navContainer.firstChild);
}

function switchView(viewId, btnEl) {
    document.querySelectorAll('.app-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');
    if (btnEl) btnEl.classList.add('active');

    if (viewId === 'shift-entry') {
        renderChecklistForm();
    }

    UIController.refreshActiveView();
}

function assignCookStation(stationName) {
    if (!Store.currentUser) return;
    Store.currentUser.station = stationName;
    ApiService.request('saveEmployee', { employee: Store.currentUser }).then(() => {
        renderChecklistForm();
        updateUserGreetingLabel();
    });
}

function clearCookStation() {
    assignCookStation("");
}

function renderCookStationSelectorWidget() {
    const container = document.getElementById('cook-station-selector-widget');
    if (!container) return;
    const assigned = Store.currentUser && Store.currentUser.station ? Store.currentUser.station.trim() : "";

    if (!assigned) {
        container.innerHTML = `
            <div class="card" style="margin-bottom: 1.5rem; background: #f8fafc; border: 2px solid #cbd5e1;">
                <h3 style="margin-top: 0; color: #1e3a8a;">📍 Select & Assign Your Shift Station</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
                    <button class="btn btn-primary" onclick="assignCookStation('Range')">🍳 Range Opener</button>
                    <button class="btn btn-primary" onclick="assignCookStation('Mid')">🥪 Mid Opener</button>
                    <button class="btn btn-primary" onclick="assignCookStation('Grill/Fry')">🍟 Grill/Fry Opener</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
                    <button class="btn btn-primary" style="background: #16a34a;" onclick="assignCookStation('Range + Mid Split')">🏢 Range + Mid Open Split</button>
                    <button class="btn btn-primary" style="background: #16a34a;" onclick="assignCookStation('Grill/Fry + Mid Split')">🏢 Grill/Fry + Mid Open Split</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
                    <button class="btn btn-primary" style="background: #ea580c;" onclick="assignCookStation('Range + Mid Close Split')">🌙 Range + Mid Close Split</button>
                    <button class="btn btn-primary" style="background: #ea580c;" onclick="assignCookStation('Grill/Fry + Mid Close Split')">🌙 Grill/Fry + Mid Close Split</button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="card" style="margin-bottom: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; color: #166534;">✅ Active Assigned Station: ${assigned}</h3>
                <button class="btn btn-secondary" style="color: #dc2626;" onclick="clearCookStation()">Change Station 🔄</button>
            </div>
        `;
    }
}

function renderChecklistForm() {
    const shiftEntryView = document.getElementById('view-shift-entry');
    if (!shiftEntryView) return;

    let widgetWrapper = document.getElementById('cook-station-selector-widget');
    if (Store.currentRole === 'cook') {
        if (!widgetWrapper) {
            widgetWrapper = document.createElement('div');
            widgetWrapper.id = 'cook-station-selector-widget';
            shiftEntryView.insertBefore(widgetWrapper, shiftEntryView.firstChild);
        }
        renderCookStationSelectorWidget();
    } else if (widgetWrapper) {
        widgetWrapper.remove();
    }

    const container = document.getElementById('checklist-container');
    if (!container) return;
    container.innerHTML = '';

    if (Store.currentRole === 'cook' && (!Store.currentUser || !Store.currentUser.station)) {
        container.innerHTML = `<div class="card" style="text-align: center; padding: 2rem;"><h3>👆 Select a Station Above to Load Your Checklist</h3></div>`;
        return;
    }

    const specs = CHECKLIST_SPECS[Store.currentLanguage].range;
    specs.forEach(sec => {
        let html = `<h3 class="checklist-section-title">${sec.phase}</h3>`;
        sec.tasks.forEach(t => {
            html += `
                <div class="task-row">
                    <input type="checkbox" class="task-checkbox" id="cb-${t.id}" onchange="updateShiftScore()">
                    <div>
                        <div class="task-title">${t.title}</div>
                        <div class="task-desc">${t.desc}</div>
                    </div>
                </div>`;
        });
        container.innerHTML += `<div class="card checklist-section">${html}</div>`;
    });
    updateShiftScore();
}

function updateShiftScore() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => { if (cb.checked) checked++; });
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

    const countEl = document.getElementById('score-tasks-count');
    const pctEl = document.getElementById('score-percentage');
    if (countEl) countEl.textContent = `${checked} / ${total}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
}

function submitShiftChecklist() {
    if (!Store.currentUser) return;
    const checkboxes = document.querySelectorAll('.task-checkbox');
    let completed = 0;
    checkboxes.forEach(cb => { if (cb.checked) completed++; });

    const shiftPayload = {
        id: `LOG-${Date.now()}`,
        empId: Store.currentUser.id,
        empName: Store.currentUser.name,
        role: Store.currentUser.role || 'cook',
        managerOnDuty: "Manager on Duty",
        date: new Date().toISOString().split('T')[0],
        timeSlot: "Standard Shift",
        tasksCompleted: completed,
        totalTasks: checkboxes.length,
        scorePct: Math.round((completed / checkboxes.length) * 100),
        notes: JSON.stringify({})
    };

    Store.shifts.push(shiftPayload);
    ApiService.request('saveShift', { shift: shiftPayload }).then(() => {
        alert("Shift saved successfully!");
        ApiService.fetchAllData();
    });
}

function submitQuizAnswers() {
    const mod = TRAINING_MODULES.find(m => m.id === Store.activeQuizModuleId);
    if (!mod || !Store.currentUser) return;

    let correctCount = 0;
    mod.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q-${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) correctCount++;
    });

    const scorePct = Math.round((correctCount / mod.questions.length) * 100);
    const passed = scorePct >= 85;

    const certPayload = {
        empId: Store.currentUser.id,
        modId: mod.id,
        score: scorePct,
        passed: passed,
        managerSignOff: false
    };

    const idx = Store.certifications.findIndex(c => 
        String(c.empId || c.EMPID || c.empid || '').trim() === String(Store.currentUser.id).trim() && 
        String(c.modId || c.MODID || c.modid || '').trim() === String(mod.id).trim()
    );
    if (idx >= 0) Store.certifications[idx] = certPayload;
    else Store.certifications.push(certPayload);

    document.getElementById('quiz-modal').style.display = 'none';
    renderTrainingModulesView();

    ApiService.request('saveCert', { cert: certPayload }).then(() => {
        ApiService.fetchAllData();
    });
}

function managerSignOffCert(empId, modId) {
    const certRecord = Store.certifications.find(c => 
        String(c.empId || c.EMPID || c.empid || '').trim() === String(empId).trim() && 
        String(c.modId || c.MODID || c.modid || '').trim() === String(modId).trim()
    );
    if (!certRecord) return;

    certRecord.managerSignOff = true;
    renderTrainingModulesView();

    ApiService.request('saveCert', { cert: certRecord }).then(() => {
        ApiService.fetchAllData();
    });
}

function renderCookDashboard() {
    const container = document.getElementById('cook-dashboard-content');
    if (!container || !Store.currentUser) return;
    const myShifts = Store.shifts.filter(s => String(s.empId || s.EMPID || s.empid || '').trim() === String(Store.currentUser.id).trim());

    container.innerHTML = `
        <div class="card">
            <h3>Your Recent Shift Submissions (${Store.currentUser.name})</h3>
            <table class="data-table">
                <thead><tr><th>Date</th><th>Time Slot</th><th>Score</th><th>Tier</th></tr></thead>
                <tbody>
                    ${myShifts.length === 0 ? '<tr><td colspan="4">No shifts logged yet.</td></tr>' : 
                      myShifts.map(s => `<tr><td>${s.date}</td><td>${s.timeSlot || 'Standard'}</td><td><strong>${s.scorePct}%</strong></td><td>${Number(s.scorePct) >= 85 ? 'Eligible' : 'Ineligible'}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>`;
}

function renderManagerDashboard() {
    const container = document.getElementById('manager-dashboard-content');
    if (!container) return;
    container.innerHTML = `<div class="card"><h3>Team Shift Oversight</h3><p>Total logged shifts: ${Store.shifts.length}</p></div>`;
}

function renderGMExecutiveDashboard() {
    const container = document.getElementById('gm-dashboard-content');
    if (!container) return;
    container.innerHTML = `<div class="card"><h3>General Manager Suite</h3><p>Active Employees: ${Store.employees.length}</p></div>`;
}

function renderTrainingModulesView() {
    const container = document.getElementById('training-modules-list');
    const heading = document.getElementById('training-view-heading');
    if (!container) return;
    container.innerHTML = '';

    if (Store.currentRole === 'gm' || Store.currentRole === 'manager') {
        if (heading) heading.textContent = "Store-Wide Training Modules & Certification Matrix (Manager Sign-Off)";
        let html = `<table class="data-table"><thead><tr><th>Employee</th><th>Module</th><th>Score</th><th>Passed?</th><th>Status</th><th>Action</th></tr></thead><tbody>`;
        
        const cooks = Store.employees.filter(e => String(e.role || '').toLowerCase() === 'cook' && e.active);
        cooks.forEach(cook => {
            TRAINING_MODULES.forEach(mod => {
                const cert = Store.certifications.find(c => 
                    String(c.empId || c.EMPID || c.empid || '').trim() === String(cook.id).trim() && 
                    String(c.modId || c.MODID || c.modid || '').trim() === String(mod.id).trim()
                );
                const score = cert ? `${cert.score}%` : 'Not Taken';
                const passed = cert && (cert.passed === true || String(cert.passed).toLowerCase() === 'true' || Number(cert.score) >= 85);
                const signed = cert && (cert.managerSignOff === true || String(cert.managerSignOff).toLowerCase() === 'true');

                let signOffStatus = "N/A";
                let action = "-";

                if (cert && passed) {
                    if (signed) {
                        signOffStatus = "Approved & Signed Off ✔️";
                        action = "Certified";
                    } else {
                        signOffStatus = "Pending Approval ⏳";
                        action = `<button class="btn btn-primary" style="padding:0.2rem 0.5rem;" onclick="managerSignOffCert('${cook.id}', '${mod.id}')">Approve</button>`;
                    }
                }

                html += `<tr><td>${cook.name}</td><td>${mod.title}</td><td>${score}</td><td>${passed ? 'Yes' : 'No'}</td><td>${signOffStatus}</td><td>${action}</td></tr>`;
            });
        });
        html += `</tbody></table>`;
        container.innerHTML = html;
    } else {
        if (heading) heading.textContent = "Cook Training Modules & Mandatory Certifications";
        TRAINING_MODULES.forEach(mod => {
            const cert = Store.certifications.find(c => 
                String(c.empId || c.EMPID || c.empid || '').trim() === String(Store.currentUser.id).trim() && 
                String(c.modId || c.MODID || c.modid || '').trim() === String(mod.id).trim()
            );
            const passed = cert && (cert.passed === true || String(cert.passed).toLowerCase() === 'true' || Number(cert.score) >= 85);
            const signed = cert && (cert.managerSignOff === true || String(cert.managerSignOff).toLowerCase() === 'true');

            let status = "Not Started";
            let btn = `<button class="btn btn-primary" onclick="openQuiz('${mod.id}')">Take Quiz ✍️</button>`;

            if (cert) {
                if (passed && signed) {
                    status = `Certified & Signed Off (${cert.score}%) ✅`;
                    btn = `<button class="btn btn-secondary" disabled>Complete! ✅</button>`;
                } else if (passed && !signed) {
                    status = `Passed (${cert.score}%) - Pending Approval ⏳`;
                    btn = `<button class="btn btn-secondary" disabled>Pending Sign-Off ⏳</button>`;
                } else {
                    status = `Failed (${cert.score}%) ❌`;
                }
            }

            container.innerHTML += `
                <div class="card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <div>
                        <h4>${mod.title}</h4>
                        <p>${mod.desc}</p>
                        <p><strong>Status:</strong> ${status}</p>
                    </div>
                    <div>${btn}</div>
                </div>`;
        });
    }
}

function openQuiz(modId) {
    Store.activeQuizModuleId = modId;
    const mod = TRAINING_MODULES.find(m => m.id === modId);
    document.getElementById('quiz-modal-title').textContent = mod.title;
    let html = `<form id="quiz-form">`;
    mod.questions.forEach((q, i) => {
        html += `<p><strong>Q${i+1}: ${q.q}</strong></p>`;
        q.options.forEach((opt, oIdx) => {
            html += `<label><input type="radio" name="q-${i}" value="${oIdx}" required> ${opt}</label><br>`;
        });
    });
    html += `</form>`;
    document.getElementById('quiz-modal-body').innerHTML = html;
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuizModal() {
    document.getElementById('quiz-modal').style.display = 'none';
}

function renderRosterTable() {
    const tbody = document.getElementById('roster-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    Store.employees.forEach(e => {
        tbody.innerHTML += `<tr><td>${e.id}</td><td>${e.name}</td><td>${e.role}</td><td>${e.station}</td><td>$${e.hourlyRate}</td></tr>`;
    });
}
