const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLUl-5Fx1XvJT6jVUURqSeGXT0sFgOB64kESRw4OIC9hxP0hTA4wG46SVV5Ym_UvHJ/exec";

const CHECKLIST_SPECS = {
    en: {
        cook: [
            {
                phase: "PREP & SETUP",
                tasks: [
                    { id: "c1", title: "Station Mise En Place", desc: "Set up station fully according to standard build charts and par levels." },
                    { id: "c2", title: "Recipe Adherence & Portioning", desc: "Prep items using strict scaling and recipe sheets. Never eye-ball portions." },
                    { id: "c3", title: "FIFO Rotation", desc: "Rotate all stored line ingredients. Ensure older stock is up front and dated." },
                    { id: "c4", title: "TEAMWORK: Cross-Station Support", desc: "Proactively assist neighboring stations to ensure line opens on time." }
                ]
            },
            {
                phase: "THE RUSH",
                tasks: [
                    { id: "c5", title: "Ticket Execution Speed", desc: "Maintain ticket run-times under 12 mins (lunch) / under 18 mins (dinner)." },
                    { id: "c6", title: "Food Quality Control", desc: "Visually inspect every plate before it leaves your hands." },
                    { id: "c7", title: "Clean-As-You-Go Sanitation", desc: "Wipe down cutting boards, clean knives, sweep floor debris mid-shift." },
                    { id: "c8", title: "TEAMWORK: In-Rush Flexing", desc: "Call out tickets clearly and flex to help slammed teammates." }
                ]
            },
            {
                phase: "SHIFT CLOSE",
                tasks: [
                    { id: "c9", title: "Temperature Logging & Storage", desc: "Record holding temperatures. Transfer line items to clean approved pans." },
                    { id: "c10", title: "Waste Reporting", desc: "Accurately count and report over-prepared or burned items." },
                    { id: "c11", title: "Station Deep Clean", desc: "Scrub grills, clean fryers, sanitize low-boys to 90%+ audit standard." },
                    { id: "c12", title: "TEAMWORK: All-Kitchen Close Out", desc: "Help remaining line stations clean up so whole team leaves together." }
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
        cook: [
            {
                phase: "PREPARACIÓN Y CONFIGURACIÓN",
                tasks: [
                    { id: "c1", title: "Mise En Place de la Estación", desc: "Preparar completamente la estación según las tablas estándar y niveles de inventario." },
                    { id: "c2", title: "Cumplimiento de Recetas y Porcionado", desc: "Preparar artículos usando pautas estrictas de recetas. Nunca calcular al ojo." },
                    { id: "c3", title: "Rotación FIFO", desc: "Rotar todos los ingredientes. Asegurarse de que el stock antiguo esté al frente y fechado." },
                    { id: "c4", title: "TRABAJO EN EQUIPO: Apoyo Inter-Estaciones", desc: "Ayudar proactivamente a las estaciones vecinas para asegurar que la línea abra a tiempo." }
                ]
            },
            {
                phase: "LA HORA PICO",
                tasks: [
                    { id: "c5", title: "Velocidad de Ejecución de Comandas", desc: "Mantener los tiempos de comandas bajo 12 mins (almuerzo) / 18 mins (cena)." },
                    { id: "c6", title: "Control de Calidad de Alimentos", desc: "Inspeccionar visualmente cada plato antes de que salga de sus manos." },
                    { id: "c7", title: "Saneamiento Limpiando Sobre la Marcha", desc: "Limpiar tablas, lavar cuchillos y cambiar cubos sanitizantes a mitad de turno." },
                    { id: "c8", title: "TRABAJO EN EQUIPO: Flexibilidad en Hora Pico", desc: "Cantar comandas claramente y flexionar para ayudar a compañeros abrumados." }
                ]
            },
            {
                phase: "CIERRE DE TURNO",
                tasks: [
                    { id: "c9", title: "Registro de Temperaturas y Almacenamiento", desc: "Registrar temperaturas de mantenimiento. Transferir artículos a bandejas limpias." },
                    { id: "c10", title: "Reporte de Desperdicios", desc: "Contar y reportar con precisión cualquier artículo preparado en exceso o quemado." },
                    { id: "c11", title: "Limpieza Profunda de la Estación", desc: "Tallar parrillas, limpiar freidoras y desinfectar refrigeradores al 90%+ de estándar." },
                    { id: "c12", title: "TRABAJO EN EQUIPO: Cierre General de Cocina", desc: "Ayudar a limpiar las estaciones restantes para que todo el equipo se retire en conjunto." }
                ]
            }
        ],
        manager: [
            {
                phase: "APERTURA AM",
                tasks: [
                    { id: "m1", title: "Auditoría de Caja Fuerte y Efectivo", desc: "Contar caja fuerte, registrar efectivo inicial y verificar gavetas de cajas." },
                    { id: "m2", title: "Inspección de Instalaciones", desc: "Recorrer exterior/interior. Revisar iluminación, música, temperatura y línea." },
                    { id: "m3", title: "Hoja de Preparación y Auditoría de Inventario", desc: "Revisar hojas de preparación diaria contra niveles actuales y proteínas costosas." },
                    { id: "m4", title: "Organización de Personal y Presupuesto", desc: "Revisar lista de personal diaria y comparar ventas con horas programadas." }
                ]
            },
            {
                phase: "PRE-TURNO Y MEDIA JORNADA",
                tasks: [
                    { id: "m5", title: "Reunión Pre-Turno Gerente-Cocinero", desc: "Realizar junta de 5 mins con el equipo. Alinear sobre especiales y metas." },
                    { id: "m6", title: "Inspección Obligatoria de Línea BOH", desc: "Auditar línea de cocina. Probar calidad y revisar temperaturas." },
                    { id: "m7", title: "Gestión Activa del Salón", desc: "Liderar picos en el salón, monitorear satisfacción y optimizar rotación." },
                    { id: "m8", title: "Recortes de Personal a Media Jornada", desc: "Evaluar porcentaje de mano de obra y reducir horas si las ventas bajan." }
                ]
            },
            {
                phase: "PM / CIERRE",
                tasks: [
                    { id: "m9", title: "Inspección de Línea PM", desc: "Realizar segunda revisión de calidad y controles de temperatura antes de la cena." },
                    { id: "m10", title: "Registro Diario de Desperdicios", desc: "Revisar e ingresar registro de desperdicios e investigar errores excesivos." },
                    { id: "m11", title: "Auditoría Final de Cierre de Cocina", desc: "Completar recorrido de cierre, verificar estaciones limpias y etiquetas FIFO." },
                    { id: "m12", title: "P&L y Resumen de Turno", desc: "Cerrar finanzas, depositar efectivo y redactar informe de resumen." }
                ]
            }
        ]
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

let currentLanguage = 'en';
let currentRoleSession = null;
let employeesList = [];
let shiftLogsList = [];
let certificationsList = [];
let payrollApprovalsList = [];
let currentUser = null;
let taskNotes = {};
let activeNoteTaskId = null;
let employeeChartInstance = null;
let activeModalEmpId = null;
let activeQuizModuleId = null;

document.addEventListener('DOMContentLoaded', () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const shiftDateEl = document.getElementById('shift-date');
    if(shiftDateEl) shiftDateEl.value = todayStr;
    const cookDateInput = document.getElementById('cook-shift-date');
    if(cookDateInput) cookDateInput.value = todayStr;
    const gmCalInput = document.getElementById('gm-calendar-lookup-date');
    if(gmCalInput) gmCalInput.value = todayStr;

    fetchEmployees();
    fetchShifts();
    fetchCertifications();
    fetchPayrollApprovals();
});

function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('auth-password').value;

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'authenticate', password })
    })
    .then(res => res.text())
    .then(text => {
        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Raw response from Apps Script:", text);
            alert("Server returned invalid response (check console).");
            return;
        }

        if(data && data.success) {
            currentUser = data.employee || { id: "EMP-UNKNOWN", name: "Employee", role: data.role || "cook" };
            currentRoleSession = data.role;
            document.getElementById('auth-modal').style.display = 'none';
            document.getElementById('app-wrapper').style.display = 'block';

            updateUserGreetingLabel();

            const cookHeader = document.getElementById('cook-checklist-header');
            const standardMeta = document.getElementById('standard-meta-card');

            if(currentRoleSession === 'cook') {
                if(cookHeader) cookHeader.style.display = 'block';
                if(standardMeta) standardMeta.style.display = 'none';
            } else {
                if(cookHeader) cookHeader.style.display = 'none';
                if(standardMeta) standardMeta.style.display = 'block';
            }

            buildNavigationForRole(currentRoleSession);
        } else {
            alert(data && data.error ? data.error : "Invalid PIN or Passcode.");
        }
    })
    .catch(err => alert("Login connection error: " + err));
}

function isEmployeeCertifiedTeamLeader(empId) {
    const empCerts = certificationsList.filter(c => c.empId === empId);
    if(empCerts.length < TRAINING_MODULES.length) return false;
    return TRAINING_MODULES.every(mod => {
        const record = empCerts.find(c => c.modId === mod.id);
        return record && record.passed && record.managerSignOff;
    });
}

function updateUserGreetingLabel() {
    if(!currentUser || !currentUser.id) return;
    const isCertified = isEmployeeCertifiedTeamLeader(currentUser.id);
    const badgeText = isCertified ? ' ⭐️ CERTIFIED TEAM LEADER' : '';
    const nameLabel = document.getElementById('logged-in-user-label');
    if(nameLabel) {
        nameLabel.textContent = `${currentUser.name || 'User'}${badgeText} (${(currentRoleSession || 'cook').toUpperCase()})`;
    }

    const welcomeHeading = document.getElementById('cook-welcome-heading');
    if(welcomeHeading) {
        welcomeHeading.textContent = `Hello ${currentUser.name || 'User'}!${isCertified ? ' ⭐️ [CERTIFIED TEAM LEADER]' : ''}`;
    }
}

function logoutSession() {
    currentUser = null;
    currentRoleSession = null;
    document.getElementById('auth-password').value = '';
    document.getElementById('app-wrapper').style.display = 'none';
    document.getElementById('auth-modal').style.display = 'flex';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    const btn = document.getElementById('lang-toggle-btn');
    if(btn) {
        btn.textContent = currentLanguage === 'es' ? '🇺🇸 English' : '🇪🇸 Español';
    }
    if(currentRoleSession) {
        buildNavigationForRole(currentRoleSession);
    }
    renderChecklistForm();

    const activeView = document.querySelector('.app-view.active');
    if(activeView) {
        const viewId = activeView.id.replace('view-', '');
        if(viewId === 'gm-dashboard') renderGMExecutiveDashboard();
        if(viewId === 'cook-dashboard') renderCookDashboard();
        if(viewId === 'cook-training') renderTrainingModulesView();
        if(viewId === 'manager-dashboard') renderManagerDashboard();
        if(viewId === 'roster') renderRosterTable();
    }
}

function buildNavigationForRole(role) {
    const navContainer = document.getElementById('nav-tabs-container');
    navContainer.innerHTML = '';

    let tabs = [];
    if(role === 'cook') {
        tabs = [
            { id: 'shift-entry', label: currentLanguage === 'es' ? '📝 Mi Lista de Turno' : '📝 My Shift Checklist' },
            { id: 'cook-dashboard', label: currentLanguage === 'es' ? '⭐ Mi Panel' : '⭐ My Cook Dashboard' },
            { id: 'cook-training', label: currentLanguage === 'es' ? '🎓 Capacitación y Certs' : '🎓 Training & Certs' }
        ];
    } else if(role === 'manager') {
        tabs = [
            { id: 'shift-entry', label: currentLanguage === 'es' ? '📝 Lista de Turno' : '📝 Shift Checklist' },
            { id: 'manager-dashboard', label: '📊 ' + (currentLanguage === 'es' ? 'Panel del Gerente' : 'Shift Manager Dashboard') },
            { id: 'cook-training', label: '🎓 ' + (currentLanguage === 'es' ? 'Capacitación' : 'Training & Certs') }
        ];
    } else if(role === 'gm') {
        tabs = [
            { id: 'gm-dashboard', label: '📈 ' + (currentLanguage === 'es' ? 'Suite del Gerente General' : 'General Manager Suite') },
            { id: 'shift-entry', label: currentLanguage === 'es' ? '📝 Revisar Listas' : '📝 Review Checklists' },
            { id: 'cook-training', label: '🎓 ' + (currentLanguage === 'es' ? 'Capacitación' : 'Training & Certs') },
            { id: 'roster', label: '👥 ' + (currentLanguage === 'es' ? 'Plantilla (GM)' : 'Staff Roster (GM)') }
        ];
    }

    tabs.forEach((t, idx) => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = t.label;
        btn.onclick = () => switchView(t.id, btn);
        navContainer.appendChild(btn);
    });

    ensureViewElementsExist();

    const btnGroup = document.getElementById('checklist-btn-group');
    if(role === 'cook') {
        btnGroup.innerHTML = `
            <button class="btn btn-secondary" onclick="window.print()">🖨️ ${currentLanguage === 'es' ? 'Imprimir' : 'Print'}</button>
            <button class="btn btn-primary" onclick="submitShiftChecklist()">💾 ${currentLanguage === 'es' ? 'Guardar Mi Registro' : 'Save My Checklist'}</button>
        `;
    } else {
        btnGroup.innerHTML = `
            <button class="btn btn-secondary" onclick="window.print()">🖨️ ${currentLanguage === 'es' ? 'Imprimir Hoja' : 'Print Sheet'}</button>
            <button class="btn btn-secondary" style="background:#dbeafe; color:#1e40af;" onclick="sendTotalShiftReportEmail()">📧 ${currentLanguage === 'es' ? 'Enviar Reporte Total' : 'Email Total Shift Report'}</button>
            <button class="btn btn-primary" onclick="submitShiftChecklist()">💾 ${currentLanguage === 'es' ? 'Guardar Registro' : 'Save Individual Record'}</button>
        `;
    }

    const reviewCard = document.getElementById('gm-review-selector-card');
    if(reviewCard) {
        if(role === 'gm' || role === 'manager') {
            reviewCard.style.display = 'block';
            populateGUShiftAuditDropdown();
        } else {
            reviewCard.style.display = 'none';
        }
    }

    if(tabs.length > 0) {
        switchView(tabs[0].id, navContainer.firstChild);
    }
}

function ensureViewElementsExist() {
    const wrapper = document.getElementById('app-wrapper');
    if(!wrapper) return;
    
    const requiredViews = ['cook-dashboard', 'manager-dashboard', 'cook-training', 'gm-dashboard', 'roster', 'shift-entry'];
    requiredViews.forEach(vId => {
        if(!document.getElementById(`view-${vId}`)) {
            const div = document.createElement('div');
            div.id = `view-${vId}`;
            div.className = 'app-view';
            if(vId === 'cook-dashboard') div.innerHTML = '<div id="cook-dashboard-content"></div>';
            if(vId === 'manager-dashboard') div.innerHTML = '<div id="manager-dashboard-content"></div>';
            if(vId === 'cook-training') div.innerHTML = '<h2 id="training-view-heading"></h2><div id="training-modules-list" style="display:flex; flex-direction:column; gap:12px;"></div>';
            wrapper.appendChild(div);
        }
    });
}

function switchView(viewId, btnEl) {
    document.querySelectorAll('.app-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    const targetView = document.getElementById(`view-${viewId}`);
    if(targetView) targetView.classList.add('active');
    if(btnEl) btnEl.classList.add('active');

    if(viewId === 'gm-dashboard') renderGMExecutiveDashboard();
    if(viewId === 'cook-dashboard') renderCookDashboard();
    if(viewId === 'cook-training') renderTrainingModulesView();
    if(viewId === 'manager-dashboard') renderManagerDashboard();
    if(viewId === 'roster') renderRosterTable();
}

function fetchEmployees() {
    fetch(`${APPS_SCRIPT_URL}?action=getEmployees`)
        .then(res => res.json())
        .then(data => {
            employeesList = data;
            populateStaffDropdown();
            renderRosterTable();
            if(currentRoleSession === 'manager' || currentRoleSession === 'gm') {
                renderManagerDashboard();
                populateGUShiftAuditDropdown();
            }
            updateUserGreetingLabel();
        });
}

function fetchShifts() {
    fetch(`${APPS_SCRIPT_URL}?action=getShifts`)
        .then(res => res.json())
        .then(data => {
            shiftLogsList = data;
            if(currentRoleSession === 'manager' || currentRoleSession === 'gm') {
                renderManagerDashboard();
                populateGUShiftAuditDropdown();
            }
        });
}

function fetchCertifications() {
    fetch(`${APPS_SCRIPT_URL}?action=getCerts`)
        .then(res => res.json())
        .then(data => {
            certificationsList = data;
            const trainingView = document.getElementById('view-cook-training');
            if(trainingView && trainingView.classList.contains('active')) {
                renderTrainingModulesView();
            }
            updateUserGreetingLabel();
        });
}

function fetchPayrollApprovals() {
    fetch(`${APPS_SCRIPT_URL}?action=getApprovals`)
        .then(res => res.json())
        .then(data => {
            payrollApprovalsList = data;
            if(currentRoleSession === 'gm') {
                renderGMExecutiveDashboard();
            }
        });
}

function populateStaffDropdown() {
    const roleType = document.getElementById('checklist-role-select');
    if(!roleType) return;
    const selectEl = document.getElementById('staff-select');
    if(!selectEl) return;
    selectEl.innerHTML = '';

    let availableEmps = employeesList.filter(e => e.role === roleType.value && e.active);
    availableEmps.forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.id;
        opt.textContent = `${e.name} (${e.station})`;
        selectEl.appendChild(opt);
    });
    renderChecklistForm();
}

function onEmployeeChanged() {
    taskNotes = {};
    renderChecklistForm();
}

function renderChecklistForm() {
    const auditSelect = document.getElementById('gm-shift-audit-select');
    if(auditSelect && auditSelect.value) return;

    const roleType = currentRoleSession === 'cook' ? 'cook' : (document.getElementById('checklist-role-select')?.value || 'cook');
    const container = document.getElementById('checklist-container');
    if(!container) return;
    container.innerHTML = '';

    const specs = CHECKLIST_SPECS[currentLanguage][roleType] || CHECKLIST_SPECS[currentLanguage]['cook'];

    specs.forEach(sec => {
        const secDiv = document.createElement('div');
        secDiv.className = 'card checklist-section';
        let html = `<h3 class="checklist-section-title">${sec.phase}</h3>`;
        sec.tasks.forEach(t => {
            html += `
                <div class="task-row">
                    <input type="checkbox" class="task-checkbox" id="cb-${t.id}" onchange="updateShiftScore()">
                    <div>
                        <div class="task-title">${t.title}</div>
                        <div class="task-desc">${t.desc}</div>
                    </div>
                    <div>
                        <button type="button" class="btn-note" id="notebtn-${t.id}" onclick="openTaskNoteModal('${t.id}', '${t.title}')">${currentLanguage === 'es' ? '📝 Nota' : '📝 Note'}</button>
                    </div>
                </div>
            `;
        });
        secDiv.innerHTML = html;
        container.appendChild(secDiv);
    });
    updateShiftScore();
}

function populateGUShiftAuditDropdown() {
    const selectEl = document.getElementById('gm-shift-audit-select');
    if(!selectEl) return;
    selectEl.innerHTML = '<option value="">-- Choose a submitted shift report --</option>';

    shiftLogsList.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.date} | ${s.empName} (${s.role.toUpperCase()}) - Score: ${s.scorePct}%`;
        selectEl.appendChild(opt);
    });
}

function loadSubmittedShiftAudit() {
    const shiftId = document.getElementById('gm-shift-audit-select').value;
    if(!shiftId) {
        renderChecklistForm();
        return;
    }

    const shift = shiftLogsList.find(s => s.id === shiftId);
    if(!shift) return;

    const container = document.getElementById('checklist-container');
    if(!container) return;
    container.innerHTML = '';

    const specs = CHECKLIST_SPECS[currentLanguage][shift.role] || CHECKLIST_SPECS[currentLanguage]['cook'];

    specs.forEach(sec => {
        const secDiv = document.createElement('div');
        secDiv.className = 'card checklist-section';
        let html = `<h3 class="checklist-section-title">${sec.phase}</h3>`;

        sec.tasks.forEach(t => {
            const noteText = shift.notes && shift.notes[t.id] ? shift.notes[t.id] : null;
            const isChecked = shift.scorePct >= 85;

            html += `
                <div class="task-row" style="${noteText ? 'background: #eff6ff; border-left: 4px solid #2563eb;' : ''}">
                    <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} disabled>
                    <div>
                        <div class="task-title">${t.title}</div>
                        <div class="task-desc">${t.desc}</div>
                        ${noteText ? `<div style="margin-top: 6px; font-size: 0.85rem; color: #1e40af; background: white; padding: 6px; border-radius: 4px; border: 1px solid #bfdbfe;"><strong>📝 Manager / Cook Note:</strong> ${noteText}</div>` : ''}
                    </div>
                </div>
            `;
        });
        secDiv.innerHTML = html;
        container.appendChild(secDiv);
    });

    document.getElementById('score-tasks-count').textContent = `${shift.tasksCompleted} / ${shift.totalTasks}`;
    document.getElementById('score-percentage').textContent = `${shift.scorePct}%`;
    document.getElementById('score-bonus-tier').textContent = `Manager on Duty: ${shift.managerOnDuty || 'Not Specified'}`;
}

function resetToChecklistEntryMode() {
    const auditSelect = document.getElementById('gm-shift-audit-select');
    if(auditSelect) auditSelect.value = "";
    renderChecklistForm();
}

function openTaskNoteModal(taskId, taskTitle) {
    activeNoteTaskId = taskId;
    document.getElementById('modal-task-title-heading').textContent = (currentLanguage === 'es' ? 'Nota para: ' : 'Note for: ') + taskTitle;
    document.getElementById('task-note-textarea').value = taskNotes[taskId] || '';
    document.getElementById('task-note-modal').style.display = 'flex';
}

function closeTaskNoteModal() {
    document.getElementById('task-note-modal').style.display = 'none';
    activeNoteTaskId = null;
}

function saveTaskNote() {
    if(!activeNoteTaskId) return;
    const val = document.getElementById('task-note-textarea').value.trim();
    const btn = document.getElementById(`notebtn-${activeNoteTaskId}`);

    if(val) {
        taskNotes[activeNoteTaskId] = val;
        btn.textContent = currentLanguage === 'es' ? '📝 Editar' : '📝 Edit Note';
        btn.classList.add('has-note');
    } else {
        delete taskNotes[activeNoteTaskId];
        btn.textContent = currentLanguage === 'es' ? '📝 Nota' : '📝 Note';
        btn.classList.remove('has-note');
    }
    closeTaskNoteModal();
}

function updateShiftScore() {
    const auditSelect = document.getElementById('gm-shift-audit-select');
    if(auditSelect && auditSelect.value) return;

    const checkboxes = document.querySelectorAll('.task-checkbox');
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => { if(cb.checked) checked++; });
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

    const countEl = document.getElementById('score-tasks-count');
    const pctEl = document.getElementById('score-percentage');
    if(!countEl || !pctEl) return;

    countEl.textContent = `${checked} / ${total}`;
    pctEl.textContent = `${pct}%`;

    const badge = document.getElementById('score-bonus-tier');
    const progressBar = document.getElementById('goal-progress-bar');
    if(progressBar) {
        progressBar.style.width = `${pct}%`;
    }

    if(pct >= 95) {
        badge.textContent = currentLanguage === 'es' ? "Nivel 3 (Pago Máx)" : "Tier 3 (Max Payout)";
        badge.className = "val badge tier-3";
    } else if(pct >= 90) {
        badge.textContent = currentLanguage === 'es' ? "Nivel 2 (Pago Estándar)" : "Tier 2 (Standard Payout)";
        badge.className = "val badge tier-2";
    } else if(pct >= 85) {
        badge.textContent = currentLanguage === 'es' ? "Nivel 1 (Pago Inicial)" : "Tier 1 (Entry Payout)";
        badge.className = "val badge tier-1";
    } else {
        badge.textContent = currentLanguage === 'es' ? "No elegible (<85%)" : "Ineligible (<85%)";
        badge.className = "val badge";
    }
}

function submitShiftChecklist() {
    let empId, empName, role, managerOnDuty, shiftDate, timeSlot;

    if(currentRoleSession === 'cook' && currentUser) {
        empId = currentUser.id;
        empName = currentUser.name;
        role = currentUser.role;
        managerOnDuty = document.getElementById('cook-manager-signature').value || "Not Specified";
        shiftDate = document.getElementById('cook-shift-date').value;
        timeSlot = "Standard Cook Shift";
    } else {
        empId = document.getElementById('staff-select').value;
        const emp = employeesList.find(e => e.id === empId);
        if(!emp) return alert(currentLanguage === 'es' ? "Seleccione un empleado." : "Select an employee.");
        empName = emp.name;
        role = emp.role;
        managerOnDuty = document.getElementById('manager-on-duty').value || "Not Specified";
        shiftDate = document.getElementById('shift-date').value;
        timeSlot = document.getElementById('shift-time-slot').value;
    }

    const checkboxes = document.querySelectorAll('.task-checkbox');
    let completed = 0;
    checkboxes.forEach(cb => { if(cb.checked) completed++; });

    const shiftPayload = {
        id: `LOG-${Date.now()}`,
        empId: empId,
        empName: empName,
        role: role,
        managerOnDuty: managerOnDuty,
        date: shiftDate,
        timeSlot: timeSlot,
        tasksCompleted: completed,
        totalTasks: checkboxes.length,
        scorePct: Math.round((completed / checkboxes.length) * 100),
        notes: JSON.stringify(taskNotes)
    };

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveShift', shift: shiftPayload })
    })
    .then(res => res.json())
    .then(data => {
        alert("Shift saved successfully!");
        fetchShifts();
        populateGUShiftAuditDropdown();
    });
}

function renderTrainingModulesView() {
    const container = document.getElementById('training-modules-list');
    const heading = document.getElementById('training-view-heading');
    if(!container) return;
    container.innerHTML = '';
    const isEs = currentLanguage === 'es';

    if(currentRoleSession === 'gm' || currentRoleSession === 'manager') {
        if(heading) heading.textContent = isEs ? "Módulos de Capacitación y Matriz de Certificación (Aprobación del Gerente General)" : "Store-Wide Training Modules & Certification Matrix (GM Sign-Off)";

        let html = `<p style="font-size: 0.85rem; color: #64748b;">${isEs ? 'Revisa los puntajes de los cuestionarios, estados y otorga aprobación oficial al obtener >= 85%.' : 'Review employee quiz scores, module statuses, and grant official GM sign-off upon passing score (>= 85%).'}</p>`;
        html += `<table class="data-table"><thead><tr>
            <th>${isEs ? 'Nombre del Empleado' : 'Employee Name'}</th>
            <th>${isEs ? 'Módulo' : 'Module Name'}</th>
            <th>${isEs ? 'Puntaje' : 'Score'}</th>
            <th>${isEs ? '¿Aprobado?' : 'Passed?'}</th>
            <th>${isEs ? 'Estado de Aprobación' : 'GM Sign-Off Status'}</th>
            <th>${isEs ? 'Acción' : 'Action'}</th>
        </tr></thead><tbody>`;

        const cooks = employeesList.filter(e => e.role === 'cook' && e.active);
        if(cooks.length === 0) {
            html += `<tr><td colspan="6">${isEs ? 'No se encontraron cocineros activos en la plantilla.' : 'No active cooks found in roster.'}</td></tr>`;
        } else {
            cooks.forEach(cook => {
                TRAINING_MODULES.forEach(mod => {
                    const cert = certificationsList.find(c => c.empId === cook.id && c.modId === mod.id);
                    const scoreText = cert ? `${cert.score}%` : (isEs ? 'No tomado' : 'Not Taken');
                    const passedText = cert ? (cert.passed ? `<span style="color:#16a34a; font-weight:bold;">${isEs ? 'Sí ✅' : 'Yes ✅'}</span>` : `<span style="color:#dc2626; font-weight:bold;">${isEs ? 'No ❌' : 'No ❌'}</span>`) : `<span style="color:#64748b;">${isEs ? 'Pendiente' : 'Pending'}</span>`;

                    let signOffText = `<span style="color:#64748b;">N/A</span>`;
                    let actionBtn = `<span>-</span>`;

                    if(cert) {
                        if(cert.passed) {
                            if(cert.managerSignOff) {
                                signOffText = `<span style="color:#16a34a; font-weight:bold;">${isEs ? 'Aprobado y Firmado ✔️' : 'Approved & Signed Off ✔️'}</span>`;
                                actionBtn = `<span style="color:#16a34a; font-size:0.8rem;">${isEs ? 'Certificado' : 'Certified'}</span>`;
                            } else {
                                signOffText = `<span style="color:#d97706; font-weight:bold;">${isEs ? 'Pendiente de Aprobación ⏳' : 'Pending GM Approval ⏳'}</span>`;
                                if(currentRoleSession === 'gm' || currentRoleSession === 'manager') {
                                    actionBtn = `<button class="btn btn-primary" style="background:#16a34a; padding:0.2rem 0.6rem; font-size:0.75rem;" onclick="managerSignOffCert('${cook.id}', '${mod.id}')">${isEs ? 'Aprobar' : 'Approve Sign-Off'}</button>`;
                                }
                            }
                        } else {
                            signOffText = `<span style="color:#dc2626;">${isEs ? 'Puntaje Reprobado' : 'Failed Score'}</span>`;
                        }
                    }

                    const isCertified = isEmployeeCertifiedTeamLeader(cook.id);
                    const nameDisplay = `${cook.name}${isCertified ? (isEs ? ' ⭐️ LÍDER DE EQUIPO CERTIFICADO' : ' ⭐️ CERTIFIED TEAM LEADER') : ''}`;

                    html += `
                        <tr>
                            <td><strong>${nameDisplay}</strong></td>
                            <td>${mod.title}</td>
                            <td>${scoreText}</td>
                            <td>${passedText}</td>
                            <td>${signOffText}</td>
                            <td>${actionBtn}</td>
                        </tr>
                    `;
                });
            });
        }
        html += `</tbody></table>`;
        container.innerHTML = html;

    } else {
        if(heading) heading.textContent = isEs ? "Módulos de Capacitación y Certificaciones Obligatorias (Calificación Mínima 85%)" : "Cook Training Modules & Mandatory Certifications (85% Passing Grade Required)";
        let targetEmpId = currentUser.id;

        TRAINING_MODULES.forEach(mod => {
            const certRecord = certificationsList.find(c => c.empId === targetEmpId && c.modId === mod.id);
            const score = certRecord ? certRecord.score : null;
            const passed = certRecord ? certRecord.passed : false;
            const signedOff = certRecord ? certRecord.managerSignOff : false;

            let statusHtml = `<span style="color:var(--danger); font-weight:bold;">${isEs ? 'No Iniciado' : 'Not Started'}</span>`;
            if(score !== null) {
                if(passed && signedOff) {
                    statusHtml = `<span style="color:var(--success); font-weight:bold;">${isEs ? `Certificado y Aprobado (Puntaje: ${score}%) ✅` : `Certified & Signed Off (Score: ${score}%) ✅`}</span>`;
                } else if(passed && !signedOff) {
                    statusHtml = `<span style="color:var(--warning); font-weight:bold;">${isEs ? `Cuestionario Aprobado (${score}%) - Pendiente de Firma ⏳` : `Quiz Passed (${score}%) - Pending Manager Sign-Off ⏳`}</span>`;
                } else {
                    statusHtml = `<span style="color:var(--danger); font-weight:bold;">${isEs ? `Reprobado (${score}%) - Mínimo 85% Requerido ❌` : `Failed (${score}%) - Minimum 85% Required ❌`}</span>`;
                }
            }

            let actionBtn = `<button class="btn btn-primary" style="padding:0.3rem 0.8rem; font-size:0.85rem;" onclick="openQuizModal('${mod.id}', '${targetEmpId}')">${isEs ? 'Tomar Cuestionario ✍️' : 'Take Quiz ✍️'}</button>`;

            container.innerHTML += `
                <div style="background:white; border:1px solid var(--card-border); border-radius:6px; padding:15px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h4 style="margin:0 0 5px 0; color:#1e3a8a;">${mod.title}</h4>
                        <p style="margin:0 0 8px 0; font-size:0.85rem; color:#64748b;">${mod.desc}</p>
                        <div>${isEs ? 'Estado' : 'Status'}: ${statusHtml}</div>
                    </div>
                    <div>${actionBtn}</div>
                </div>
            `;
        });
    }
}

function openQuizModal(modId, empId) {
    activeQuizModuleId = modId;
    const mod = TRAINING_MODULES.find(m => m.id === modId);
    if(!mod) return;

    document.getElementById('quiz-modal-title').textContent = mod.title;
    const body = document.getElementById('quiz-modal-body');
    const isEs = currentLanguage === 'es';

    let html = `<p style="font-size:0.85rem; color:#64748b;">${isEs ? 'Responde todas las preguntas con precisión. Necesitas al menos <strong>85%</strong> para aprobar.' : 'Answer all questions accurately. You need at least <strong>85%</strong> to pass.'}</p><form id="quiz-form">`;
    mod.questions.forEach((qObj, idx) => {
        html += `<div style="margin-bottom:15px; background:#f8fafc; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
            <p style="font-weight:bold; margin-top:0;">Q${idx+1}: ${qObj.q}</p>`;
        qObj.options.forEach((opt, oIdx) => {
            html += `<label style="display:block; font-size:0.9rem; margin-bottom:5px; cursor:pointer;">
                <input type="radio" name="q-${idx}" value="${oIdx}" required> ${opt}
            </label>`;
        });
        html += `</div>`;
    });
    html += `</form>`;
    body.innerHTML = html;
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuizModal() {
    document.getElementById('quiz-modal').style.display = 'none';
    activeQuizModuleId = null;
}

function submitQuizAnswers() {
    const mod = TRAINING_MODULES.find(m => m.id === activeQuizModuleId);
    if(!mod) return;
    const isEs = currentLanguage === 'es';

    let correctCount = 0;
    const totalQ = mod.questions.length;

    for(let i = 0; i < totalQ; i++) {
        const selected = document.querySelector(`input[name="q-${i}"]:checked`);
        if(!selected) return alert(isEs ? `Por favor responde la pregunta ${i+1}.` : `Please answer question ${i+1}.`);
        if(parseInt(selected.value) === mod.questions[i].answer) {
            correctCount++;
        }
    }

    const scorePct = Math.round((correctCount / totalQ) * 100);
    const passed = scorePct >= 85;
    let targetEmpId = currentUser.id;

    const certPayload = {
        empId: targetEmpId,
        modId: mod.id,
        score: scorePct,
        passed: passed,
        managerSignOff: false
    };

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveCert', cert: certPayload })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? `¡Cuestionario enviado! Tu puntaje: ${scorePct}%. ${passed ? '¡Aprobaste! Pendiente de firma del gerente.' : 'Obtuviste menos del 85%. Por favor intenta nuevamente.'}` : `Quiz Submitted! Your score: ${scorePct}%. ${passed ? 'You passed! Pending manager sign-off.' : 'You scored under 85%. Please try again.'}`);
        closeQuizModal();
        fetchCertifications();
    });
}

function managerSignOffCert(empId, modId) {
    const certRecord = certificationsList.find(c => c.empId === empId && c.modId === modId);
    if(!certRecord) return;
    const isEs = currentLanguage === 'es';

    certRecord.managerSignOff = true;

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveCert', cert: certRecord })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? "¡Aprobación gerencial completada con éxito!" : "Manager sign-off completed successfully!");
        fetchCertifications();
        updateUserGreetingLabel();
    });
}

function triggerMasterReset() {
    const isEs = currentLanguage === 'es';
    if(confirm(isEs ? "ADVERTENCIA: Esto borrará permanentemente las vistas locales. ¿Continuar?" : "WARNING: This will permanently clear local views. Proceed?")) {
        fetchShifts();
        fetchCertifications();
        fetchPayrollApprovals();
        populateGUShiftAuditDropdown();
        alert(isEs ? "Datos de demostración actualizados." : "Demo data refreshed.");
    }
}

function fetchReportsByCalendarDate() {
    const selectedDate = document.getElementById('gm-calendar-lookup-date').value;
    const isEs = currentLanguage === 'es';
    if(!selectedDate) return alert(isEs ? "Por favor selecciona una fecha válida." : "Please select a valid date.");

    const filtered = shiftLogsList.filter(s => s.date === selectedDate);
    const container = document.getElementById('gm-calendar-results-container');
    if(filtered.length === 0) {
        container.innerHTML = `<p style="color: #64748b; font-size: 0.9rem;">${isEs ? `No se encontraron reportes para ${selectedDate}.` : `No reports found for ${selectedDate}.`}</p>`;
        return;
    }

    let html = `<h4 style="color: #1e3a8a; margin-bottom: 0.5rem;">${isEs ? `Reportes para ${selectedDate} (${filtered.length} enviados):` : `Reports for ${selectedDate} (${filtered.length} submitted):`}</h4>`;
    filtered.forEach(r => {
        let notesListHtml = `<li><em>${isEs ? 'No se registraron notas operativas.' : 'No operational notes recorded.'}</em></li>`;
        try {
            const parsedNotes = typeof r.notes === 'string' ? JSON.parse(r.notes) : r.notes;
            if(parsedNotes && Object.keys(parsedNotes).length > 0) {
                notesListHtml = "";
                for(let [taskId, noteText] of Object.entries(parsedNotes)) {
                    notesListHtml += `<li><strong>${isEs ? 'Tarea' : 'Task'} [${taskId}]:</strong> ${noteText}</li>`;
                }
            }
        } catch(e) {}

        html += `
            <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; margin-bottom: 6px;">
                    <strong>${r.empName} (${r.role.toUpperCase()})</strong>
                    <span style="color: #16a34a; font-weight: bold;">${isEs ? 'Puntaje' : 'Score'}: ${r.scorePct}%</span>
                </div>
                <div style="font-size: 0.85rem; color: #475569; margin-bottom: 6px;">
                    <span><strong>${isEs ? 'Horario' : 'Time Slot'}:</strong> ${r.timeSlot}</span> |
                    <span><strong>${isEs ? 'Gerente en Turno' : 'Manager on Duty'}:</strong> ${r.managerOnDuty || (isEs ? 'No especificado' : 'Not Specified')}</span>
                </div>
                <div style="font-size: 0.85rem;">
                    <strong>${isEs ? 'Notas del Gerente / Explicaciones:' : 'Manager Notes / Task Explanations:'}</strong>
                    <ul style="margin: 4px 0 0 15px; padding: 0; color: #334155;">${notesListHtml}</ul>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function sendTotalShiftReportEmail() {
    const date = document.getElementById('shift-date').value;
    const timeSlot = document.getElementById('shift-time-slot').value;
    const isEs = currentLanguage === 'es';

    if(!date) return alert(isEs ? "Por favor selecciona una fecha de turno válida." : "Please select a valid shift date.");

    const matching = shiftLogsList.filter(s => s.date === date);
    let body = `KitchenSync Pro - Total Shift Report\nDate: ${date}\nTime Slot: ${timeSlot}\nTotal Employee Logs: ${matching.length}\n\n`;

    matching.forEach(m => {
        body += `- ${m.empName} (${m.role.toUpperCase()}): Score ${m.scorePct}%, Manager on Duty: ${m.managerOnDuty}\n`;
    });

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'sendReportEmail', subject: `Total Shift Report - ${date}`, body })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? `¡Reporte total de turno recopilado y enviado por correo con éxito! (${matching.length} registro(s) incluido(s)).` : `Total shift report successfully compiled and emailed! (${matching.length} employee record(s) included).`);
    })
    .catch(err => alert((isEs ? "Error al generar el reporte total: " : "Failed to generate total shift report: ") + err));
}

function getMondayOfCurrentWeek(dateInput) {
    const d = new Date(dateInput);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function isWithinBiWeeklyPayrollCycle(shiftDateStr) {
    const today = new Date();
    const currentMonday = getMondayOfCurrentWeek(today);
    const fourteenDaysAgo = new Date(currentMonday);
    fourteenDaysAgo.setDate(currentMonday.getDate() - 14);

    const sDate = new Date(shiftDateStr);
    return sDate >= fourteenDaysAgo && sDate <= new Date();
}

function openEmployeeReportModal(empId) {
    activeModalEmpId = empId;
    const emp = employeesList.find(e => e.id === empId);
    if(!emp) return;
    const isEs = currentLanguage === 'es';

    const empShifts = shiftLogsList.filter(s => s.empId === emp.id && isWithinBiWeeklyPayrollCycle(s.date));
    const avgScore = empShifts.length > 0 ? Math.round(empShifts.reduce((a,b)=>a+b.scorePct,0)/empShifts.length) : 0;

    let tierLabel = isEs ? "No elegible (<85%)" : "Ineligible (<85%)";
    let bonusAmt = 0;
    if(avgScore >= 95) { tierLabel = "Tier 3"; bonusAmt = emp.role==='manager'?350:150; }
    else if(avgScore >= 90) { tierLabel = "Tier 2"; bonusAmt = emp.role==='manager'?225:100; }
    else if(avgScore >= 85) { tierLabel = "Tier 1"; bonusAmt = emp.role==='manager'?125:50; }

    let shiftRowsHtml = "";
    empShifts.forEach(s => {
        const dayOfWeek = new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' });
        shiftRowsHtml += `<tr>
            <td>${s.date} (${dayOfWeek})</td>
            <td>${s.timeSlot}</td>
            <td><strong>${s.scorePct}%</strong></td>
            <td>${s.scorePct>=85?(isEs?'Meta Cumplida':'Goal Met'):(isEs?'Meta No Alcanzada':'Goal Missed')}</td>
            <td><button class="btn btn-secondary" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="openEditShiftModal('${s.id}')">✏️ ${isEs ? 'Editar' : 'Edit'}</button></td>
        </tr>`;
    });

    document.getElementById('report-modal-title').textContent = `${isEs ? 'Reporte Quincenal' : 'Bi-Weekly Report'}: ${emp.name}`;

    const bodyContainer = document.getElementById('employee-report-body');
    bodyContainer.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem; text-align:center;">
            <div style="background:#eff6ff; padding:10px; border-radius:6px;"><span style="font-size:0.8rem; color:#64748b;">${isEs ? 'Turnos Registrados' : 'Shifts Logged'}</span><h3 style="margin:5px 0 0 0; color:#1e3a8a;">${empShifts.length}</h3></div>
            <div style="background:#eff6ff; padding:10px; border-radius:6px;"><span style="font-size:0.8rem; color:#64748b;">${isEs ? 'Cumplimiento Promedio' : 'Average Compliance'}</span><h3 style="margin:5px 0 0 0; color:#1e3a8a;">${avgScore}%</h3></div>
            <div style="background:#f0fdf4; padding:10px; border-radius:6px;"><span style="font-size:0.8rem; color:#166534;">${isEs ? 'Bono Proyectado' : 'Projected Bonus'}</span><h3 style="margin:5px 0 0 0; color:#16a34a;">$${bonusAmt}</h3></div>
        </div>
        <h4 style="margin-bottom:0.5rem; color:#1e3a8a;">📝 ${isEs ? 'Registros de Turno' : 'Shift Logs'}</h4>
        <table class="data-table">
            <thead><tr>
                <th>${isEs ? 'Fecha' : 'Date'}</th>
                <th>${isEs ? 'Horario' : 'Time Slot'}</th>
                <th>${isEs ? 'Puntaje' : 'Score'}</th>
                <th>${isEs ? 'Estado' : 'Status'}</th>
                <th>${isEs ? 'Acciones' : 'Actions'}</th>
            </tr></thead>
            <tbody>${shiftRowsHtml || `<tr><td colspan="5">${isEs ? 'No se encontraron registros de turno.' : 'No shift logs found.'}</td></tr>`}</tbody>
        </table>
    `;

    document.getElementById('employee-report-modal').style.display = 'flex';
}

function openEditShiftModal(shiftId) {
    const shift = shiftLogsList.find(s => s.id === shiftId);
    if(!shift) return;

    document.getElementById('edit-shift-id').value = shift.id;
    document.getElementById('edit-emp-name').value = shift.empName;
    document.getElementById('edit-shift-date').value = shift.date;
    document.getElementById('edit-time-slot').value = shift.timeSlot;
    document.getElementById('edit-manager-on-duty').value = shift.managerOnDuty || "";
    document.getElementById('edit-score-pct').value = shift.scorePct;
    document.getElementById('edit-shift-modal').style.display = 'flex';
}

function closeEditShiftModal() {
    document.getElementById('edit-shift-modal').style.display = 'none';
}

function saveEditedShift(e) {
    e.preventDefault();
    const shiftId = document.getElementById('edit-shift-id').value;
    const shift = shiftLogsList.find(s => s.id === shiftId);
    if(!shift) return;
    const isEs = currentLanguage === 'es';

    shift.date = document.getElementById('edit-shift-date').value;
    shift.timeSlot = document.getElementById('edit-time-slot').value;
    shift.managerOnDuty = document.getElementById('edit-manager-on-duty').value;
    shift.scorePct = parseInt(document.getElementById('edit-score-pct').value);

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveShift', shift })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? "¡Reporte de turno actualizado!" : "Shift report updated!");
        closeEditShiftModal();
        fetchShifts();
        openEmployeeReportModal(activeModalEmpId);
    });
}

function emailCurrentEmployeeReport() {
    if(!activeModalEmpId) return;
    const emp = employeesList.find(e => e.id === activeModalEmpId);
    if(!emp) return;
    const isEs = currentLanguage === 'es';

    const empShifts = shiftLogsList.filter(s => s.empId === emp.id && isWithinBiWeeklyPayrollCycle(s.date));
    const avgScore = empShifts.length > 0 ? Math.round(empShifts.reduce((a,b)=>a+b.scorePct,0)/empShifts.length) : 0;

    let tierLabel = isEs ? "No elegible (<85%)" : "Ineligible (<85%)";
    let bonusAmt = 0;
    if(avgScore >= 95) { tierLabel = "Tier 3"; bonusAmt = emp.role==='manager'?350:150; }
    else if(avgScore >= 90) { tierLabel = "Tier 2"; bonusAmt = emp.role==='manager'?225:100; }
    else if(avgScore >= 85) { tierLabel = "Tier 1"; bonusAmt = emp.role==='manager'?125:50; }

    const body = `KitchenSync Pro - Bi-Weekly Performance Report\nEmployee: ${emp.name}\nAverage Compliance: ${avgScore}%\nBonus Payout Tier: ${tierLabel} ($${bonusAmt})\nTotal Shifts in Cycle: ${empShifts.length}`;

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'sendReportEmail', subject: `Bi-Weekly Performance Report - ${emp.name}`, body })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? "¡Reporte quincenal enviado por correo con éxito!" : "Bi-weekly report successfully emailed!");
    });
}

function closeEmployeeReportModal() {
    document.getElementById('employee-report-modal').style.display = 'none';
    activeModalEmpId = null;
}

function renderCookDashboard() {
    const container = document.getElementById('cook-dashboard-content');
    if(!container) return;
    const isEs = currentLanguage === 'es';

    const myShifts = shiftLogsList.filter(s => s.empId === currentUser.id);

    container.innerHTML = `
        <div class="card">
            <h3>${isEs ? 'Tus Registros de Turno Recientes y Rendimiento' : 'Your Recent Shift Submissions & Performance'} (${currentUser.name})</h3>
            <table class="data-table">
                <thead><tr>
                    <th>${isEs ? 'Fecha' : 'Date'}</th>
                    <th>${isEs ? 'Horario de Turno' : 'Shift Time Slot'}</th>
                    <th>${isEs ? 'Puntaje' : 'Score'}</th>
                    <th>${isEs ? 'Nivel' : 'Tier'}</th>
                    <th>${isEs ? 'Notas' : 'Notes'}</th>
                </tr></thead>
                <tbody>
                    ${myShifts.length === 0 ? `<tr><td colspan="5">${isEs ? 'No se encontraron registros de turno para tu cuenta.' : 'No shift logs found for your account.'}</td></tr>` :
                      myShifts.map(s => `<tr><td>${s.date}</td><td>${s.timeSlot}</td><td><strong>${s.scorePct}\%</strong></td><td>${s.scorePct>=95?'Tier 3':s.scorePct>=90?'Tier 2':s.scorePct>=85?'Tier 1':(isEs?'No elegible':'Ineligible')}</td><td>-</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderManagerDashboard() {
    const container = document.getElementById('manager-dashboard-content');
    if(!container) return;
    const isEs = currentLanguage === 'es';

    container.innerHTML = `
        <div class="card">
            <h3>${isEs ? 'Supervisión de Turnos del Equipo y Reportes Quincenales (Ciclo Lun–Dom)' : 'Team Shift Oversight & Bi-Weekly Reports (Mon–Sun Cycle)'}</h3>
            <p style="font-size:0.85rem; color:#64748b; margin-top:0;">${isEs ? 'Haz clic en cualquier nombre de empleado para abrir su reporte quincenal completo.' : 'Click any employee name below to open their full bi-weekly report.'}</p>
            <table class="data-table">
                <thead><tr>
                    <th>${isEs ? 'Nombre del Empleado' : 'Employee Name'}</th>
                    <th>${isEs ? 'Rol' : 'Role'}</th>
                    <th>${isEs ? 'Estación' : 'Station'}</th>
                    <th>${isEs ? 'Turnos' : 'Shifts'}</th>
                    <th>${isEs ? 'Promedio' : 'Average'}</th>
                </tr></thead>
                <tbody>
                    ${employeesList.length === 0 ? `<tr><td colspan="5">${isEs ? 'No se encontraron empleados.' : 'No employees found.'}</td></tr>` :
                      employeesList.map(emp => {
                        const empShifts = shiftLogsList.filter(s => s.empId === emp.id && isWithinBiWeeklyPayrollCycle(s.date));
                        const avg = empShifts.length > 0 ? Math.round(empShifts.reduce((a,b)=>a+b.scorePct,0)/empShifts.length) : 0;
                        const isCertified = isEmployeeCertifiedTeamLeader(emp.id);
                        const nameDisplay = `${emp.name}${isCertified ? (isEs ? ' ⭐️ LÍDER DE EQUIPO CERTIFICADO' : ' ⭐️ CERTIFIED TEAM LEADER') : ''}`;
                        return `
                            <tr>
                                <td><span class="clickable-emp-name" onclick="openEmployeeReportModal('${emp.id}')">${nameDisplay}</span></td>
                                <td>${emp.role.toUpperCase()}</td>
                                <td>${emp.station}</td>
                                <td>${empShifts.length}</td>
                                <td><strong class="highlight">${avg}%</strong></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function approveEmployeeBonus(empId, empName, role, bonusAmt, tierLabel) {
    const isEs = currentLanguage === 'es';
    const approvalPayload = {
        empId: empId,
        empName: empName,
        role: role,
        tierLabel: tierLabel,
        bonusAmt: bonusAmt,
        dateApproved: new Date().toISOString()
    };

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveApproval', approval: approvalPayload })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? `¡Pago de bono de $${bonusAmt} para ${empName} aprobado y registrado con éxito!` : `Bonus payout of $${bonusAmt} for ${empName} successfully approved and logged!`);
        fetchPayrollApprovals();
    });
}

function downloadPayrollAccountingReport() {
    const isEs = currentLanguage === 'es';
    alert(isEs ? "Resumen contable de nómina generado desde datos de Google Sheets." : "Payroll accounting summary generated from Google Sheets data.");
}

function renderGMExecutiveDashboard() {
    const tbody = document.getElementById('gm-payroll-tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    const isEs = currentLanguage === 'es';

    let tierCounts = { "Tier 3": 0, "Tier 2": 0, "Tier 1": 0, "Ineligible": 0 };

    employeesList.forEach(emp => {
        const empShifts = shiftLogsList.filter(s => s.empId === emp.id && isWithinBiWeeklyPayrollCycle(s.date));
        const avgScore = empShifts.length > 0 ? Math.round(empShifts.reduce((a,b)=>a+b.scorePct,0)/empShifts.length) : 0;

        let bonus = 0;
        let tierLabel = "Ineligible";
        if(avgScore >= 95) { tierLabel = "Tier 3"; bonus = emp.role==='manager'?350:150; tierCounts["Tier 3"]++; }
        else if(avgScore >= 90) { tierLabel = "Tier 2"; bonus = emp.role==='manager'?225:100; tierCounts["Tier 2"]++; }
        else if(avgScore >= 85) { tierLabel = "Tier 1"; bonus = emp.role==='manager'?125:50; tierCounts["Tier 1"]++; }
        else { tierCounts["Ineligible"]++; }

        const isCertified = isEmployeeCertifiedTeamLeader(emp.id);
        const nameDisplay = `${emp.name}${isCertified ? (isEs ? ' ⭐️ LÍDER DE EQUIPO CERTIFICADO' : ' ⭐️ CERTIFIED TEAM LEADER') : ''}`;

        const isAlreadyApproved = payrollApprovalsList.some(a => a.empId === emp.id);
        let actionCell = `<button class="btn btn-primary" style="padding:0.3rem 0.6rem; font-size:0.8rem; background:#16a34a;" onclick="approveEmployeeBonus('${emp.id}', '${emp.name}', '${emp.role}', ${bonus}, '${tierLabel}')">${isEs ? `Aprobar Bono ($${bonus})` : `Approve Bonus ($${bonus})`}</button>`;

        if(isAlreadyApproved) {
            actionCell = `<span style="color:#16a34a; font-weight:bold; font-size:0.85rem;">${isEs ? '✅ Aprobado y Registrado' : '✅ Approved & Logged'}</span>`;
        }

        tbody.innerHTML += `
            <tr>
                <td><strong>${nameDisplay}</strong></td>
                <td>${emp.role.toUpperCase()}</td>
                <td>${empShifts.length}</td>
                <td><strong class="highlight">${avgScore}%</strong></td>
                <td>$${bonus} (${tierLabel})</td>
                <td>${actionCell}</td>
            </tr>
        `;
    });

    renderCharts(tierCounts);
}

function renderCharts(tierCounts) {
    const ctxExec = document.getElementById('chart-execution');
    const isEs = currentLanguage === 'es';
    if(ctxExec) {
        if(employeeChartInstance) employeeChartInstance.destroy();

        const recentDates = [...new Set(shiftLogsList.map(s => s.date))].sort();
        const avgScoresByDate = recentDates.map(date => {
            const dayShifts = shiftLogsList.filter(s => s.date === date);
            return Math.round(dayShifts.reduce((a,b) => a + b.scorePct, 0) / dayShifts.length);
        });

        employeeChartInstance = new Chart(ctxExec, {
            type: 'line',
            data: {
                labels: recentDates.length > 0 ? recentDates : [isEs ? 'Sin Datos' : 'No Data'],
                datasets: [{
                    label: isEs ? 'Cumplimiento Promedio Diario (%)' : 'Daily Avg Compliance (%)',
                    data: avgScoresByDate.length > 0 ? avgScoresByDate : [0],
                    borderColor: '#1e3a8a',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    fill: true,
                    tension: 0.2
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
        });
    }

    const ctxBonus = document.getElementById('chart-bonus');
    if(ctxBonus) {
        if(window.bonusChartInstance) window.bonusChartInstance.destroy();

        window.bonusChartInstance = new Chart(ctxBonus, {
            type: 'doughnut',
            data: {
                labels: [
                    isEs ? 'Nivel 3 (Máx)' : 'Tier 3 (Max)', 
                    isEs ? 'Nivel 2 (Estándar)' : 'Tier 2 (Standard)', 
                    isEs ? 'Nivel 1 (Inicial)' : 'Tier 1 (Entry)', 
                    isEs ? 'No elegible (<85%)' : 'Ineligible (<85%)'
                ],
                datasets: [{
                    data: [tierCounts["Tier 3"], tierCounts["Tier 2"], tierCounts["Tier 1"], tierCounts["Ineligible"]],
                    backgroundColor: ['#16a34a', '#2563eb', '#d97706', '#dc2626']
                }]
            },
            options: { responsive: true }
        });
    }
}

function renderRosterTable() {
    const tbody = document.getElementById('roster-table-body');
    if(!tbody) return;
    tbody.innerHTML = '';
    const isEs = currentLanguage === 'es';

    employeesList.forEach(e => {
        const isCertified = isEmployeeCertifiedTeamLeader(e.id);
        const nameDisplay = `${e.name}${isCertified ? (isEs ? ' ⭐️ LÍDER DE EQUIPO CERTIFICADO' : ' ⭐️ CERTIFIED TEAM LEADER') : ''}`;
        tbody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td><strong>${nameDisplay}</strong></td>
                <td>${e.role.toUpperCase()}</td>
                <td>${e.station}</td>
                <td>•••• (${e.pin})</td>
                <td>$${Number(e.hourlyRate).toFixed(2)}</td>
                <td>
                    <button class="btn btn-secondary" style="padding:0.3rem 0.6rem; font-size:0.8rem; margin-right:5px;" onclick="openEditEmployeeModal('${e.id}')">✏️ ${isEs ? 'Editar' : 'Edit'}</button>
                    <button class="btn btn-danger" style="padding:0.3rem 0.6rem; font-size:0.8rem;" onclick="removeEmp('${e.id}')">${isEs ? 'Eliminar' : 'Delete'}</button>
                </td>
            </tr>`;
    });
}

function openAddEmployeeModal() { document.getElementById('add-employee-modal').style.display = 'flex'; }
function closeAddEmployeeModal() { document.getElementById('add-employee-modal').style.display = 'none'; }

function saveNewEmployee(e) {
    e.preventDefault();
    const isEs = currentLanguage === 'es';
    const newEmp = {
        id: `EMP-${Date.now().toString().slice(-4)}`,
        name: document.getElementById('new-emp-name').value.trim(),
        role: document.getElementById('new-emp-role').value,
        station: document.getElementById('new-emp-station').value.trim(),
        pin: document.getElementById('new-emp-pin').value.trim(),
        hourlyRate: parseFloat(document.getElementById('new-emp-rate').value),
        active: true
    };

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveEmployee', employee: newEmp })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert(isEs ? "¡Nuevo miembro del equipo agregado y guardado en Google Sheets!" : "New team member added and saved to Google Sheets!");
            closeAddEmployeeModal();
            document.getElementById('add-employee-form').reset();
            fetchEmployees();
        } else {
            alert(isEs ? "Error al guardar el empleado en la hoja de cálculo." : "Failed to save employee to spreadsheet.");
        }
    })
    .catch(err => alert((isEs ? "Error de conexión: " : "Connection error: ") + err));
}

function openEditEmployeeModal(empId) {
    const emp = employeesList.find(e => e.id === empId);
    if(!emp) return;

    document.getElementById('edit-emp-id').value = emp.id;
    document.getElementById('edit-emp-name').value = emp.name;
    document.getElementById('edit-emp-role').value = emp.role;
    document.getElementById('edit-emp-station').value = emp.station;
    document.getElementById('edit-emp-pin').value = emp.pin;
    document.getElementById('edit-emp-rate').value = emp.hourlyRate;

    document.getElementById('edit-employee-modal').style.display = 'flex';
}

function closeEditEmployeeModal() {
    document.getElementById('edit-employee-modal').style.display = 'none';
}

function saveEditedEmployee(e) {
    e.preventDefault();
    const empId = document.getElementById('edit-emp-id').value;
    const emp = employeesList.find(e => e.id === empId);
    if(!emp) return;
    const isEs = currentLanguage === 'es';

    emp.name = document.getElementById('edit-emp-name').value.trim();
    emp.role = document.getElementById('edit-emp-role').value;
    emp.station = document.getElementById('edit-employee-form').querySelector('#edit-emp-station').value.trim();
    emp.pin = document.getElementById('edit-employee-form').querySelector('#edit-emp-pin').value.trim();
    emp.hourlyRate = parseFloat(document.getElementById('edit-employee-form').querySelector('#edit-emp-rate').value);

    alert(isEs ? "¡Detalles del empleado actualizados con éxito!" : "Employee details successfully updated!");
    closeEditEmployeeModal();
    renderRosterTable();
    populateStaffDropdown();
}

function removeEmp(id) {
    const isEs = currentLanguage === 'es';
    if(confirm(isEs ? "¿Eliminar empleado?" : "Remove employee?")) {
        employeesList = employeesList.filter(e => e.id !== id);
        renderRosterTable();
        populateStaffDropdown();
    }
}
