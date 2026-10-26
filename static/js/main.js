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
        if (id === 'manager-dashboard') {
            renderManagerDashboard();
            renderManagerAssignmentWidget();
        }
        if (id === 'gm-dashboard') {
            renderGMDashboard();
            renderManagerAssignmentWidget();
        }
        if (id === 'cook-training') renderTrainingView();
        if (id === 'recipe-book') renderRecipeBook();
        if (id === 'roster') renderRosterView();
    }
};

document.addEventListener('DOMContentLoaded', () => UIController.init());

// ==========================================
// 1. DATA SPECS: OPENING, CLOSING & SPLIT CHECKLISTS
// ==========================================
const CHECKLIST_SPECS = {
    en: {
        'range_open': [
            {
                phase: "🌅 Range Station Open Setup & Safety Checks",
                tasks: [
                    { id: 'ro1', title: "Turn on range burners & verify flame ignition", desc: "Check all burner ports for clogs or uneven flames." },
                    { id: 'ro2', title: "Calibrate line thermometers", desc: "Verify ice-water bath reads 32°F (0°C)." },
                    { id: 'ro3', title: "Check hot holding wells & water levels", desc: "Ensure wells are clean and filled to operational fill line." },
                    { id: 'ro4', title: "Stock line insert pans with proteins & sauces", desc: "Check expiration labels and FIFO rotation standards." },
                    { id: 'ro5', title: "Sanitize station cutting boards & prep surfaces", desc: "Use approved quat sanitizer solution (200-400 ppm)." }
                ]
            }
        ],
        'mid_open': [
            {
                phase: "🌅 Mid Station Open Setup",
                tasks: [
                    { id: 'mo1', title: "Turn on sandwich press & panini units", desc: "Preheat to 350°F and test press mechanism." },
                    { id: 'mo2', title: "Stock cold sandwich rails & condiments", desc: "Ensure all cheese, sliced meats, and spreads are full and dated." },
                    { id: 'mo3', title: "Check bread inventory & pull par-bake items", desc: "Estimate volume for the shift and stage accordingly." },
                    { id: 'mo4', title: "Sanitize sandwich prep rails and slicer guard", desc: "Ensure all food contact surfaces meet health code standards." }
                ]
            }
        ],
        'grill_fry_open': [
            {
                phase: "🌅 Grill/Fry Station Open Setup",
                tasks: [
                    { id: 'gfo1', title: "Filter fryers and check oil levels", desc: "Top off oil if necessary and verify temperature controller at 350°F." },
                    { id: 'gfo2', title: "Season and test flat top griddle", desc: "Scrape grill surface clean and apply high-temp cooking oil." },
                    { id: 'gfo3', title: "Stock freezer baskets with fries & appetizers", desc: "Ensure back-up inventory is staged within arm's reach." },
                    { id: 'gfo4', title: "Check batter stations and breading pans", desc: "Stage fresh breading, wet batters, and sanitizing buckets." }
                ]
            }
        ],
        'range_mid_split_open': [
            {
                phase: "🌅 Morning 2-Cook Split (Range / Mid Open)",
                tasks: [
                    { id: 'rmso1', title: "Ignite range burners and test hot holding wells", desc: "Verify safe heating temperatures across range and soup wells." },
                    { id: 'rmso2', title: "Setup sandwich press and cold rail components", desc: "Ensure sliced proteins, cheeses, and spreads are fully stocked and dated." },
                    { id: 'rmso3', title: "Split-Task: Setup backup line sauces & dressings", desc: "Equally divide shared mid-station prep tasks with partner." }
                ]
            }
        ],
        'grill_fry_mid_split_open': [
            {
                phase: "🌅 Morning 2-Cook Split (Grill/Fry / Mid Open)",
                tasks: [
                    { id: 'gfmaso1', title: "Filter fryers, check oil, and season flat top", desc: "Preheat grill to 350°F and prepare basket stations." },
                    { id: 'gfmaso2', title: "Pull bread inventory and stage par-bake items", desc: "Support mid-station bread rotation alongside grill startup." },
                    { id: 'gfmaso3', title: "Split-Task: Restock shared line squeeze bottles", desc: "Equally divide shared condiment stocking responsibilities." }
                ]
            }
        ],
        'range_mid_split_close': [
            {
                phase: "🌙 Night Closing (Range Station Procedures)",
                tasks: [
                    { id: 'rcl1', title: "Break down veg and poach pans", desc: "One hour prior to close, break down veg. and poach pans and bring to dish[cite: 3]." },
                    { id: 'rcl2', title: "Brush down range tops and clean under burners", desc: "Brush down range tops and clean under burners[cite: 3]." },
                    { id: 'rcl3', title: "Clean traps for range and small grill", desc: "Clean traps for range and small grill. Shut down one oven[cite: 3]." },
                    { id: 'rcl4', title: "Clean interior of egg station & oven doors", desc: "Clean all stainless in egg station, including oven doors, traulsens, and table[cite: 3]." },
                    { id: 'rcl5', title: "Clean interior of traulsen, including wire racks", desc: "Clean interior of traulsen, including wire racks[cite: 3]." },
                    { id: 'rcl6', title: "Restock traulsen & rotate product", desc: "Restock traulsen, ensuring that all product is rotated and covered[cite: 3]." },
                    { id: 'rcl7', title: "Change foil in oven & wipe/scup interior doors", desc: "Change foil in oven and wipe/scup interior doors of ovens[cite: 3]." },
                    { id: 'rcl8', title: "Change foil liners on top shelves as needed", desc: "Change foil liners on top shelves as needed[cite: 3]." },
                    { id: 'rcl9', title: "Restock bread and rotate product", desc: "Restock bread as necessary, rotating product[cite: 3]." },
                    { id: 'rcl10', title: "Drain and ice fish in the walk-in", desc: "Drain and ice fish in the walk-in[cite: 3]." },
                    { id: 'rcl11', title: "Check thaw pull for frozen product", desc: "Check thaw pull including all meats, fish, and other frozen product[cite: 3]." },
                    { id: 'rcl12', title: "Sweep, deck brush, and mop line floor", desc: "Assist other cooks to thoroughly sweep, deck brush, and mop the line floor[cite: 3]." },
                    { id: 'rcl13', title: "Manager sign-off before leaving", desc: "Check with a manager prior to clocking out and leaving your shift![cite: 3]" }
                ]
            },
            {
                phase: "🌙 Night Closing (Mid Station Procedures)",
                tasks: [
                    { id: 'mcl1', title: "Remove utensils from sandwich unit", desc: "One hour prior to close, remove all utensils from the sandwich unit[cite: 4]." },
                    { id: 'mcl2', title: "Clean interior (top) of unit under pans", desc: "Clean interior (top) of unit under pans and around housing[cite: 4]." },
                    { id: 'mcl3', title: "Clean interior of lower portion of unit", desc: "Clean interior of lower portion of the unit, including the upper shelf inside[cite: 4]." },
                    { id: 'mcl4', title: "Pull out unit and clean back & floor", desc: "Pull out the unit and clean the back of the unit and the floor behind it[cite: 4]." },
                    { id: 'mcl5', title: "Flip all pans and restock all items", desc: "Flip all pans and restock all items, making sure to properly rotate product[cite: 4]." },
                    { id: 'mcl6', title: "Verify stock levels", desc: "DO NOT double stock product. There should be one full pan of every item[cite: 4]." },
                    { id: 'mcl7', title: "Clean the lid of the unit inside and out", desc: "Clean the lid of the unit inside and out[cite: 4]." },
                    { id: 'mcl8', title: "Clean microwave inside and out", desc: "Clean the microwave inside and out, including the microwave shelf[cite: 4]." },
                    { id: 'mcl9', title: "Restock plates and to-go containers", desc: "Restock all plates and to go containers as needed[cite: 4]." },
                    { id: 'mcl10', title: "Assist with thaw pull and floors", desc: "Assist with thaw pull and floors[cite: 4]." },
                    { id: 'mcl11', title: "Ensure sandwich items are covered", desc: "Ensure that all sandwich items are covered at the end of your shift[cite: 4]." },
                    { id: 'mcl12', title: "Manager sign-off before leaving", desc: "Check with a manager prior to clocking out and leaving your shift[cite: 4]." }
                ]
            }
        ],
        'grill_fry_mid_split_close': [
            {
                phase: "🌙 Night Closing (Grill/Fry Station Procedures)",
                tasks: [
                    { id: 'gcl1', title: "Flip pancake batter to 6th pan", desc: "One hour prior to close, flip pancake batter to a 6th pan with a ladle." },
                    { id: 'gcl2', title: "Bring batter gun to dish", desc: "Bring the batter gun to dish." },
                    { id: 'gcl3', title: "Wipe and scrub lower shelf of grill", desc: "Wipe and scrub lower shelf of the grill and clean temperature dials." },
                    { id: 'gcl4', title: "Strain fryers of excess crumbs and food particles", desc: "Strain the fryers of excess crumbs and food particles." },
                    { id: 'gcl5', title: "Wipe down stainless dividers and front of fryers", desc: "Wipe down the stainless dividers and the front of the fryers." },
                    { id: 'gcl6', title: "Close down one fryolator", desc: "Close down one fryolator." },
                    { id: 'gcl7', title: "Sift fry flour into a new pan", desc: "Sift fry flour into a new pan and top off if necessary." },
                    { id: 'gcl8', title: "Clean the sink by the steam tables", desc: "Clean the sink by the steam tables." },
                    { id: 'gcl9', title: "Break down and thoroughly clean steam tables", desc: "Break down and thoroughly clean the steam tables." },
                    { id: 'gcl10', title: "Place product from steam tables into cambros", desc: "Place product from steam tables in ten (10) palstic cambros and place on cart." },
                    { id: 'gcl11', title: "Cover sausage and bacon with foil and label", desc: "Place product from steam tables in ten (10) palstic cambros and place on cart, wrap left over sausage and bacon with foil, label, and place on lower rack of cart." },
                    { id: 'gcl12', title: "Note fryolators needing oil change", desc: "Make note if the fryolators need to be changed on the dry erase board." },
                    { id: 'gcl13', title: "Clean the grease trap for the grill", desc: "At close, clean the grill, grill rails, and wall behind the grill, clean the grease trap for the grill into a metal German pan." },
                    { id: 'gcl14', title: "Brush down char broiler and clean trap", desc: "Brush down the char broiler and clean the trap." },
                    { id: 'gcl15', title: "Run grease to outside grease trap", desc: "Run grease to outside grease trap. DO NOT leave grease inside overnight!." },
                    { id: 'gcl16', title: "Assist with thaw pull and floors", desc: "Assist with thaw pull and floors." },
                    { id: 'gcl17', title: "Restock freezer (French fries, chicken, etc.)", desc: "Restock freezer (French Fries, chicken, mac and cheese, etc)." },
                    { id: 'gcl18', title: "Manager sign-off before leaving", desc: "Check with manager prior to clocking out and leaving your shift!" }
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

    const emp = Store.employees.find(e => String(e.pin || e.PIN).trim() === pin && (e.active === true || String(e.active).toLowerCase() === 'true'));
    if (emp) {
        Store.setSession(emp, emp.role || emp.Role || 'cook');
        finalizeLogin();
        return;
    }

    ApiService.request('authenticate', { password: pin }).then(res => {
        if (res && res.success) {
            Store.setSession(res.employee || { id: "EMP-001", name: "Employee", role: res.role || "cook", station: "range_open" }, res.role || 'cook');
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
        myChecklist: "📝 Station Checklist",
        shiftsCompleted: "⭐ Shifts Completed",
        trainingModules: "🎓 Training & Certs",
        managerDashboard: "📊 Shift Manager Dashboard",
        gmSuite: "📈 General Manager Suite",
        messageBoard: "💬 Message Board",
        recipeBook: "📖 Recipe & Prep Book",
        staffRoster: "👥 Staff Roster",
        printSheet: "🖨️ Print Sheet"
    },
    es: {
        myChecklist: "📝 Lista de Estación",
        shiftsCompleted: "⭐ Turnos Completados",
        trainingModules: "🎓 Capacitación",
        managerDashboard: "📊 Panel del Gerente",
        gmSuite: "📈 Suite del Gerente General",
        messageBoard: "💬 Tablero de Mensajes",
        recipeBook: "📖 Libro de Recetas",
        staffRoster: "👥 Plantilla de Personal",
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
// 5. STATION CHECKLISTS & ASSIGNMENT WIDGET
// ==========================================
function renderChecklists() {
    const container = document.getElementById('checklist-container');
    if (!container) return;
    container.innerHTML = '';

    const isCook = Store.role === 'cook';
    const assigned = Store.user?.station?.trim() || (isCook ? 'range_open' : 'range_open');
    
    const banner = document.createElement('div');
    banner.className = 'card';
    banner.style.cssText = 'margin-bottom: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0;';
    banner.innerHTML = `<h3 style="color: #166534; margin: 0;">📍 Assigned Station / Shift: ${assigned.replace(/_/g, ' ').toUpperCase()}</h3><p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #15803d;">${isCook ? 'Read-only station reference checklist.' : 'Station checklist for review and shift sign-off.'}</p>`;
    container.appendChild(banner);

    const specs = CHECKLIST_SPECS[Store.lang]?.[assigned] || CHECKLIST_SPECS['en'][assigned] || CHECKLIST_SPECS['en']['range_open'];

    specs.forEach(sec => {
        let html = `<h3 class="checklist-section-title" style="color:#1e3a8a; margin-bottom:0.75rem;">${sec.phase}</h3>`;
        sec.tasks.forEach(t => {
            if (isCook) {
                html += `
                    <div class="task-row" style="display:flex; align-items:flex-start; gap:12px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
                        <span style="color: #059669; font-weight: bold; font-size: 1.1rem; line-height: 1;">•</span>
                        <div>
                            <div class="task-title" style="font-weight:600; color:#334155;">${t.title}</div>
                            <div class="task-desc" style="font-size:0.85rem; color:#64748b;">${t.desc}</div>
                        </div>
                    </div>`;
            } else {
                html += `
                    <div class="task-row" style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
                        <input type="checkbox" class="task-checkbox" id="cb-${t.id}" style="width:20px; height:20px; cursor:pointer;">
                        <div>
                            <div class="task-title" style="font-weight:600; color:#334155;">${t.title}</div>
                            <div class="task-desc" style="font-size:0.85rem; color:#64748b;">${t.desc}</div>
                        </div>
                    </div>`;
            }
        });
        container.innerHTML += `<div class="card checklist-section">${html}</div>`;
    });

    if (!isCook) {
        container.innerHTML += `
            <div style="margin-top: 1.5rem; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="submitManagerShiftChecklist()">💾 Manager Submit & Log Shift</button>
            </div>
        `;
    }
}

function renderManagerAssignmentWidget() {
    const container = document.getElementById('manager-assignment-widget-container');
    if (!container) return;

    const selectedDateStr = document.getElementById('shift-date')?.value || new Date().toISOString().split('T')[0];

    let html = `
        <div class="card" style="margin-bottom: 1.5rem; background: #f8fafc; border: 1px solid #cbd5e1;">
            <h3 style="color: #1e3a8a; margin-top: 0;">👥 Station & Shift Line Assignments</h3>
            <p style="font-size: 0.85rem; color: #64748b;">Schedule daily opening and closing line positions and instantly update cook dashboards.</p>
            
            <div style="margin: 1rem 0;">
                <label style="font-weight: 600; font-size: 0.9rem;">Select Date:</label>
                <input type="date" id="shift-date" class="form-control" value="${selectedDateStr}" onchange="renderManagerAssignmentWidget()" style="margin-top: 4px; max-width: 200px;">
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
                
                <!-- Option 1: Morning Shift 2-Cook Split Line -->
                <div style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #0369a1; margin-top: 0;">☀️ Morning Shift 2-Cook Split Line</h4>
                    
                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Range / Mid-Split Open:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-range_mid_split_open" class="form-control" style="flex: 1;">
                                <option value="">-- Select Cook --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('range_mid_split_open', 'sel-range_mid_split_open')">Assign 📌</button>
                        </div>
                    </div>

                    <div>
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Grill/Fry / Mid-Split Open:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-grill_fry_mid_split_open" class="form-control" style="flex: 1;">
                                <option value="">-- Select Cook --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('grill_fry_mid_split_open', 'sel-grill_fry_mid_split_open')">Assign 📌</button>
                        </div>
                    </div>
                </div>

                <!-- Option 2: Morning Shift 3 Cooks -->
                <div style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #0369a1; margin-top: 0;">☀️ Morning Shift 3 Cooks</h4>
                    
                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Range Open:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-range_open" class="form-control" style="flex: 1;">
                                <option value="">-- Select Cook --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('range_open', 'sel-range_open')">Assign 📌</button>
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Mid Open:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-mid_open" class="form-control" style="flex: 1;">
                                <option value="">-- Select Cook --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('mid_open', 'sel-mid_open')">Assign 📌</button>
                        </div>
                    </div>

                    <div>
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Grill/Fry Open:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-grill_fry_open" class="form-control" style="flex: 1;">
                                <option value="">-- Select Cook --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('grill_fry_open', 'sel-grill_fry_open')">Assign 📌</button>
                        </div>
                    </div>
                </div>

                <!-- Option 3: Night Shift 2-Cook Closing -->
                <div style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #c2410c; margin-top: 0;">🌙 Night Shift 2-Cook Closing</h4>
                    
                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Range / Mid-Split Close:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-range_mid_split_close" class="form-control" style="flex: 1;">
                                <option value="">-- Select Closer --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('range_mid_split_close', 'sel-range_mid_split_close')">Assign 📌</button>
                        </div>
                    </div>

                    <div>
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Grill/Fry / Mid-Split Close:</label>
                        <div style="display: flex; gap: 8px;">
                            <select id="sel-grill_fry_mid_split_close" class="form-control" style="flex: 1;">
                                <option value="">-- Select Closer --</option>
                                ${Store.employees.map(e => `<option value="${e.id || e.ID}">${e.name || e.Name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.85rem;" onclick="assignCookToStation('grill_fry_mid_split_close', 'sel-grill_fry_mid_split_close')">Assign 📌</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    container.innerHTML = html;
}

function assignCookToStation(stationKey, selectId) {
    const selectEl = document.getElementById(selectId);
    if (!selectEl) return;
    const empId = selectEl.value;
    if (!empId) {
        alert("Please select an employee to assign.");
        return;
    }

    const emp = Store.employees.find(e => String(e.id || e.ID).trim() === String(empId).trim());
    if (!emp) return;

    emp.station = stationKey;
    ApiService.request('saveEmployee', { employee: emp }).then(res => {
        alert(`✅ Successfully assigned ${emp.name || emp.Name} to ${stationKey.replace(/_/g, ' ').toUpperCase()}! Their dashboard has been updated.`);
    });
}

function submitManagerShiftChecklist() {
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
        station: Store.user.station || 'range_open',
        date: new Date().toISOString().split('T')[0],
        tasksCompleted: checked,
        totalTasks: total,
        scorePct: pct,
        notes: pct >= 85 ? "Goal Met" : "Needs Improvement"
    };

    Store.shifts.push(shiftRecord);
    ApiService.request('saveShift', { shift: shiftRecord }).then(res => {
        if (res && res.success) {
            alert(`🎉 Shift checklist officially submitted by Management! Score: ${pct}%`);
            switchTab('manager-dashboard', document.querySelector('.tab-btn'));
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
// 7. RECIPE & PREP SPEC BOOK (WITH EDIT & DELETE)
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
            const rId = r.id || r.ID || r.menuItem;
            html += `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                        <h4 style="color: #1e3a8a; margin-top: 0;">🍽️ ${r.menuItem || r.title || 'Recipe'} <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">${r.category || 'General'}</span></h4>
                        ${Store.role === 'gm' ? `
                            <div style="display: flex; gap: 6px;">
                                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="openRecipeModal('${rId}')">Edit ✏️</button>
                                <button class="btn btn-secondary" style="color: #dc2626; padding: 4px 8px; font-size: 0.8rem;" onclick="deleteRecipe('${rId}')">Delete 🗑️</button>
                            </div>
                        ` : ''}
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

function openRecipeModal(recId = null) {
    let existing = null;
    if (recId) {
        existing = Store.recipes.find(r => String(r.id || r.ID || r.menuItem).trim() === String(recId).trim());
    }

    const menuItem = prompt("Enter Recipe / Menu Item Name:", existing ? (existing.menuItem || existing.title || '') : '');
    if (!menuItem) return;
    const category = prompt("Enter Category (Appetizer, Entree, Prep, Sauce):", existing ? (existing.category || 'Entree') : 'Entree');
    const prepSpecs = prompt("Enter Prep Specifications:", existing ? (existing.prepSpecs || existing.specs || '') : '');
    const buildDetails = prompt("Enter Menu Build Details:", existing ? (existing.buildDetails || existing.details || '') : '');

    const recipeObj = {
        id: existing ? (existing.id || existing.ID || `REC-${Date.now()}`) : `REC-${Date.now()}`,
        menuItem,
        category,
        prepSpecs,
        buildDetails
    };

    if (existing) {
        const index = Store.recipes.findIndex(r => String(r.id || r.menuItem).trim() === String(recId).trim());
        if (index > -1) Store.recipes[index] = recipeObj;
        else Store.recipes.push(recipeObj);
    } else {
        Store.recipes.push(recipeObj);
    }

    ApiService.request('saveRecipe', { recipe: recipeObj }).then(() => {
        alert("Recipe saved successfully!");
        renderRecipeBook();
    });
}

function deleteRecipe(recId) {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    Store.recipes = Store.recipes.filter(r => String(r.id || r.menuItem).trim() !== String(recId).trim());
    renderRecipeBook();
    alert("Recipe deleted successfully.");
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
        if (selected && Number(selected.value) === qObj.correct) correctCount++;
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
                    ${myShifts.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: #64748b;">No shifts logged yet.</td></tr>` :
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
            <p style="font-size: 0.85rem; color: #64748b;">Assign line positions and review team shift logs.</p>
        </div>
        <div id="manager-assignment-widget-container"></div>
        <div class="card" style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
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
    renderManagerAssignmentWidget();
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
            <p style="font-size: 0.85rem; color: #64748b;">Manage employees, approve training certifications, and assign shifts.</p>
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
        <div id="manager-assignment-widget-container" style="margin-bottom: 1.5rem;"></div>
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
        <div class="card" style="margin-bottom: 1.5rem;">
            <h4 style="color: #1e3a8a; margin-top: 0;">🛠️ GM Quick Actions & System Controls</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 1rem;">
                <button class="btn btn-primary" onclick="openEmployeeModal()">+ Add New Employee</button>
                <button class="btn btn-primary" onclick="openRecipeModal()">+ Add Recipe / Spec</button>
                <button class="btn btn-secondary" style="background: #fee2e2; color: #dc2626; border-color: #fca5a5;" onclick="triggerMasterReset()">⚠️ Master Reset (Clear Shifts, Certs & Msgs)</button>
            </div>
        </div>
    `;
    renderManagerAssignmentWidget();
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

function triggerMasterReset() {
    if (!confirm("WARNING: This will clear all logged shifts, certifications, and message board posts across the system. Your Recipe & Spec Book will remain completely untouched. Do you wish to proceed?")) return;
    
    Store.shifts = [];
    Store.certifications = [];
    Store.messages = [];
    
    alert("Master Reset complete! Operational shift logs, certifications, and messages have been cleared.");
    UIController.refreshActiveView();
}

// ==========================================
// 10. GM CRUD: EMPLOYEES & RECIPES
// ==========================================
function renderRosterView() {
    const tbody = document.getElementById('roster-table-body');
    if (!tbody) return;

    tbody.innerHTML = Store.employees.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: #64748b;">No employees found.</td></tr>` :
        Store.employees.map(emp => {
            const eId = emp.id || emp.ID;
            return `
                <tr>
                    <td>${eId}</td>
                    <td><strong>${emp.name || emp.Name}</strong></td>
                    <td>${String(emp.role || emp.Role || 'cook').toUpperCase()}</td>
                    <td>${emp.station || emp.Station || 'General'}</td>
                    <td>$${emp.hourlyRate || emp.HourlyRate || '0.00'}</td>
                    <td>
                        ${Store.role === 'gm' ? `
                            <div style="display: flex; gap: 6px;">
                                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="openEmployeeModal('${eId}')">Edit ✏️</button>
                                <button class="btn btn-secondary" style="color: #dc2626; padding: 4px 8px; font-size: 0.8rem;" onclick="deleteEmployee('${eId}')">Delete 🗑️</button>
                            </div>
                        ` : ''}
                    </td>
                </tr>
            `;
        }).join('');
}

function openEmployeeModal(empId = null) {
    let existing = null;
    if (empId) {
        existing = Store.employees.find(e => String(e.id || e.ID).trim() === String(empId).trim());
    }

    const name = prompt("Enter employee name:", existing ? (existing.name || existing.Name || '') : '');
    if (!name) return;
    const role = prompt("Enter role (cook, manager, gm):", existing ? (existing.role || existing.Role || 'cook') : 'cook');
    const pin = prompt("Enter 4-digit PIN code:", existing ? (existing.pin || existing.PIN || '1234') : '1234');
    const station = prompt("Enter default station:", existing ? (existing.station || existing.Station || 'range_open') : 'range_open');
    const hourlyRate = prompt("Enter hourly rate:", existing ? (existing.hourlyRate || existing.HourlyRate || '18.00') : '18.00');

    const empObj = {
        id: existing ? (existing.id || existing.ID) : `EMP-${Date.now()}`,
        name,
        role,
        station,
        hourlyRate,
        pin,
        active: true
    };

    if (existing) {
        const index = Store.employees.findIndex(e => String(e.id || e.ID).trim() === String(empId).trim());
        if (index > -1) Store.employees[index] = empObj;
        else Store.employees.push(empObj);
    } else {
        Store.employees.push(empObj);
    }

    ApiService.request('saveEmployee', { employee: empObj }).then(() => {
        alert("Employee saved successfully!");
        renderRosterView();
    });
}

function deleteEmployee(empId) {
    if (!confirm("Are you sure you want to remove this employee?")) return;
    Store.employees = Store.employees.filter(e => String(e.id || e.ID).trim() !== String(empId).trim());
    renderRosterView();
    alert("Employee removed from active view.");
}
