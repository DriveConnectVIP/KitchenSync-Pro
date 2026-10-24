const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLUl-5Fx1XvJT6jVUURqSeGXT0sFgOB64kESRw4OIC9hxP0hTA4wG46SVV5Ym_UvHJ/exec";

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
        range: [
            {
                phase: "PROCEDIMIENTOS DE CIERRE - RANGO",
                tasks: [
                    { id: "rng-1", title: "Preparación de Rango y Inicio", desc: "Una hora antes del cierre, desmontar verduras, bandejas de poach y llevar a lavado." },
                    { id: "rng-2", title: "Superficies y Quemadores", desc: "Cepillar las superficies del rango y limpiar debajo de los quemadores." },
                    { id: "rng-3", title: "Parrilla Pequeña y Trampas", desc: "Limpiar trampas del rango y parrilla pequeña. Apagar un horno." },
                    { id: "rng-4", title: "Acero Inoxidable Estación de Huevo", desc: "Limpiar todo el acero inoxidable, puertas de horno, traulsens y mesa." },
                    { id: "rng-5", title: "Interior de Traulsen y Parrillas", desc: "Limpiar el interior del traulsen, incluyendo parrillas de alambre." },
                    { id: "rng-6", title: "Rotación y Cubierta de Producto", desc: "Reabastecer el traulsen asegurando que todo esté rotado y cubierto." },
                    { id: "rng-7", title: "Revestimientos de Aluminio en Horno", desc: "Cambiar aluminio en el horno y limpiar/tallar puertas interiores." },
                    { id: "rng-8", title: "Revestimientos Superiores", desc: "Cambiar protectores de aluminio en estantes superiores según sea necesario." },
                    { id: "rng-9", title: "Reabastecimiento de Pan", desc: "Reabastecer pan según sea necesario, rotando producto." },
                    { id: "rng-10", title: "Hielo y Drenaje en Walk-In", desc: "Drenar y poner hielo al pescado en el walk-in." },
                    { id: "rng-11", title: "Extracción y Carnes", desc: "Revisar extracción de carnes, pescado y otros productos congelados." },
                    { id: "rng-12", title: "Barrido y Mop de Línea", desc: "TRABAJO EN EQUIPO: Ayudar a barrer, cepillar y trapear el piso de la línea." },
                    { id: "rng-13", title: "Firma del Gerente", desc: "¡Consultar con un gerente antes de registrar salida y dejar su turno!" }
                ]
            }
        ],
        mid: [
            {
                phase: "PROCEDIMIENTOS DE CIERRE - MID",
                tasks: [
                    { id: "mid-1", title: "Utensilios de Unidad de Sándwich", desc: "Una hora antes del cierre, retirar todos los utensilios de la unidad." },
                    { id: "mid-2", title: "Interior Superior de Unidad", desc: "Limpiar el interior superior de la unidad bajo las bandejas y alrededor." },
                    { id: "mid-3", title: "Interior Inferior de Unidad", desc: "Limpiar la porción inferior de la unidad, incluyendo el estante superior." },
                    { id: "mid-4", title: "Parte Posterior y Piso", desc: "Sacar la unidad y limpiar la parte trasera y el piso detrás de ella." },
                    { id: "mid-5", title: "Rotación de Bandejas", desc: "Voltear bandejas y reabastecer artículos rotando adecuadamente." },
                    { id: "mid-6", title: "Política de Stock Doble", desc: "NO duplicar stock. Debe haber una bandeja llena de cada artículo." },
                    { id: "mid-7", title: "Limpieza de Tapa", desc: "Limpiar la tapa de la unidad por dentro y por fuera." },
                    { id: "mid-8", title: "Microondas Interior/Exterior", desc: "Limpiar el microondas por dentro y por fuera, incluyendo su repisa." },
                    { id: "mid-9", title: "Plates & To-Go Restock", desc: "Reabastecer platos y contenedores para llevar según sea necesario." },
                    { id: "mid-10", title: "Extracción y Pisos", desc: "Ayudar con la extracción y pisos." },
                    { id: "mid-11", title: "Cobertura de Sándwiches", desc: "Asegurarse de que todos los artículos estén cubiertos al finalizar el turno." },
                    { id: "mid-12", title: "Firma del Gerente", desc: "¡Consultar con un gerente antes de registrar salida y dejar su turno!" }
                ]
            }
        ],
        fry: [
            {
                phase: "PROCEDIMIENTOS DE CIERRE - GRILL / FRY",
                tasks: [
                    { id: "gf-1", title: "Preparación de Masa de Panqueques", desc: "Una hora antes, pasar la masa a un molde de 6to con cucharón." },
                    { id: "gf-2", title: "Pistola de Masa", desc: "Llevar la pistola de masa a lavado de platos." },
                    { id: "gf-3", title: "Estante Inferior y Perillas", desc: "Limpiar y tallar el estante inferior del grill y perillas de temperatura." },
                    { id: "gf-4", title: "Migajas de Freidoras", desc: "Colar las freidoras de exceso de migajas y partículas de comida." },
                    { id: "gf-5", title: "Divisores y Frente", desc: "Limpiar los divisores de acero inoxidable y el frente de las freidoras." },
                    { id: "gf-6", title: "Apagado de Freidora", desc: "Apagar una freidora." },
                    { id: "gf-7", title: "Harina y Relleno", desc: "Tamizar harina en un molde nuevo y rellenar si es necesario." },
                    { id: "gf-8", title: "Fregadero de Mesas de Vapor", desc: "Limpiar el fregadero junto a las mesas de vapor." },
                    { id: "gf-9", title: "Limpieza Profunda de Mesas", desc: "Desmontar y limpiar a fondo las mesas de vapor." },
                    { id: "gf-10", title: "Cambros en Mesas de Vapor", desc: "Colocar producto en diez (10) cambros plásticos en el carrito." },
                    { id: "gf-11", title: "Empaquetado de Salchicha y Tocino", desc: "Colocar restos de salchicha y tocino con aluminio, etiqueta y en estante." },
                    { id: "gf-12", title: "Nota de Cambio de Aceite", desc: "Anotar en la pizarra si las freidoras necesitan cambio de aceite." },
                    { id: "gf-13", title: "Limpieza de Parrilla y Pared", desc: "Al cierre, limpiar la parrilla, rieles y pared detrás de la parrilla." },
                    { id: "gf-14", title: "Trampa de Grasa", desc: "Limpiar la trampa de grasa del grill hacia una bandeja alemana de metal." },
                    { id: "gf-15", title: "Asador Char Broiler", desc: "Cepillar el asador char broiler y limpiar la trampa." },
                    { id: "gf-16", title: "Traslado de Grasa al Exterior", desc: "Llevar grasa a la trampa exterior. ¡NO dejar grasa dentro durante la noche!" },
                    { id: "gf-17", title: "Reabastecimiento de Congelador", desc: "Reabastecer congelador (papas, pollo, macarrones con queso, etc)." },
                    { id: "gf-18", title: "Firma del Gerente", desc: "¡Consultar con un gerente antes de registrar salida y dejar su turno!" }
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
    const password = document.getElementById('auth-password').value.trim();

    const matchedEmp = employeesList.find(emp => String(emp.pin).trim() === password && emp.active);
    if (matchedEmp) {
        currentUser = matchedEmp;
        currentRoleSession = matchedEmp.role ? matchedEmp.role.toLowerCase() : 'cook';
        
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
        return;
    }

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
            currentUser = data.employee || { id: "EMP-UNKNOWN", name: "Employee", role: data.role || "cook", station: "" };
            currentRoleSession = data.role ? data.role.toLowerCase() : 'cook';
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
            { id: 'cook-dashboard', label: currentLanguage === 'es' ? '⭐ Turnos Completados' : '⭐ Shifts Completed' },
            { id: 'cook-training', label: currentLanguage === 'es' ? '🎓 Módulos de Capacitación' : '🎓 Training Modules' }
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
        btn.onclick = () => {
            switchView(t.id, btn);
            if(t.id === 'shift-entry') renderChecklistForm();
        };
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
            if(vId === 'cook-dashboard') div.innerHTML = '<h2>Cook Personal Performance & Bonus Tracker</h2><div id="cook-dashboard-content"></div>';
            if(vId === 'manager-dashboard') div.innerHTML = '<h2>Shift Manager Oversight Dashboard</h2><div id="manager-dashboard-content"></div>';
            if(vId === 'cook-training') div.innerHTML = '<h2 id="training-view-heading">Training Modules & Mandatory Certifications</h2><div class="card"><div id="training-modules-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;"></div></div>';
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

function getActiveChecklistSpecsForDate(dateStr, roleType, lang) {
    const specs = CHECKLIST_SPECS[lang] || CHECKLIST_SPECS['en'];
    if (roleType === 'manager') return specs['manager'];

    let targetStation = 'range';
    if (currentRoleSession === 'cook' && currentUser) {
        targetStation = (currentUser.station || '').toLowerCase();
    } else {
        const selectedOpt = document.getElementById('staff-select')?.selectedOptions[0]?.textContent || '';
        targetStation = selectedOpt.toLowerCase();
    }

    // 1. Full Mid Station
    if (targetStation === 'mid') {
        return specs['mid'];
    } 
    // 2. Full Fry / Grill Station
    else if (targetStation === 'fry' || targetStation === 'grill' || targetStation === 'grill/fry') {
        return specs['fry'];
    } 
    // 3. Weekday Split: Range + First Half of Mid
    else if (targetStation === 'range + mid split') {
        let combined = JSON.parse(JSON.stringify(specs['range']));
        const midTasks = specs['mid'][0].tasks;
        const halfMid = midTasks.slice(0, Math.ceil(midTasks.length / 2));
        combined.push({ phase: "MID STATION SPLIT (PART 1 - RANGE)", tasks: halfMid });
        return combined;
    } 
    // 4. Weekday Split: Grill/Fry + Second Half of Mid
    else if (targetStation === 'grill/fry + mid split' || targetStation === 'fry + mid split') {
        let combined = JSON.parse(JSON.stringify(specs['fry']));
        const midTasks = specs['mid'][0].tasks;
        const otherHalfMid = midTasks.slice(Math.ceil(midTasks.length / 2));
        combined.push({ phase: "MID STATION SPLIT (PART 2 - GRILL/FRY)", tasks: otherHalfMid });
        return combined;
    } 
    // Default fallback (Range)
    else {
        return specs['range'];
    }
}

function assignCookStation(stationName) {
    if (!currentUser) return;
    const isEs = currentLanguage === 'es';

    currentUser.station = stationName;
    const empRecord = employeesList.find(e => e.id === currentUser.id);
    if (empRecord) {
        empRecord.station = stationName;
    }

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveEmployee', employee: currentUser })
    })
    .then(res => res.json())
    .then(data => {
        alert(isEs ? `¡Estación asignada exitosamente a ${stationName}!` : `Station successfully assigned to ${stationName}!`);
        renderChecklistForm();
        updateUserGreetingLabel();
    })
    .catch(err => alert((isEs ? "Error al guardar la estación: " : "Failed to save station: ") + err));
}

function clearCookStation() {
    assignCookStation("");
}

function renderCookStationSelectorWidget() {
    const container = document.getElementById('cook-station-selector-widget');
    if (!container) return;
    const isEs = currentLanguage === 'es';
    const assignedStation = currentUser && currentUser.station ? currentUser.station.trim() : "";

    if (!assignedStation) {
        container.innerHTML = `
            <div class="card" style="margin-bottom: 1.5rem; background: #f8fafc; border: 2px solid #cbd5e1;">
                <h3 style="margin-top: 0; color: #1e3a8a;">${isEs ? '📍 Selecciona y Asigna Tu Estación de Turno' : '📍 Select & Assign Your Shift Station'}</h3>
                <p style="font-size: 0.9rem; color: #475569; margin-bottom: 1rem;">${isEs ? 'Elige tu estación para fin de semana (3 cocineros) o tu división para días de semana (2 cocineros compartiendo Mid):' : 'Choose your weekend station (3 cooks) or your weekday split assignment (2 cooks sharing Mid duties):'}</p>
                
                <div style="font-size: 0.8rem; font-weight: bold; color: #475569; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">⭐ Weekend / 3-Cook Setup</div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
                    <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; text-align: center;">
                        <h4 style="color: #1e3a8a; margin: 0 0 8px 0; font-size: 0.95rem;">🍳 Range Station</h4>
                        <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="assignCookStation('Range')">${isEs ? 'Asignar 📌' : 'Assign 📌'}</button>
                    </div>

                    <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; text-align: center;">
                        <h4 style="color: #1e3a8a; margin: 0 0 8px 0; font-size: 0.95rem;">🥪 Mid Station</h4>
                        <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="assignCookStation('Mid')">${isEs ? 'Asignar 📌' : 'Assign 📌'}</button>
                    </div>

                    <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; text-align: center;">
                        <h4 style="color: #1e3a8a; margin: 0 0 8px 0; font-size: 0.95rem;">🍟 Grill / Fry</h4>
                        <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="assignCookStation('Grill/Fry')">${isEs ? 'Asignar 📌' : 'Assign 📌'}</button>
                    </div>
                </div>

                <div style="font-size: 0.8rem; font-weight: bold; color: #475569; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">🏢 Weekday / 2-Cook Split Mode (Mid Duties Shared)</div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
                    <div style="background: #f0fdf4; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0; text-align: center;">
                        <h4 style="color: #166534; margin: 0 0 4px 0; font-size: 0.95rem;">🍳 Range + Mid Split (Pt 1)</h4>
                        <p style="font-size: 0.75rem; color: #475569; margin: 0 0 8px 0;">Range duties + first half of Mid tasks</p>
                        <button class="btn btn-primary" style="background: #16a34a; padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="assignCookStation('Range + Mid Split')">${isEs ? 'Asignar Split 📌' : 'Assign Split 📌'}</button>
                    </div>

                    <div style="background: #f0fdf4; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0; text-align: center;">
                        <h4 style="color: #166534; margin: 0 0 4px 0; font-size: 0.95rem;">🍟 Grill/Fry + Mid Split (Pt 2)</h4>
                        <p style="font-size: 0.75rem; color: #475569; margin: 0 0 8px 0;">Grill/Fry + second half of Mid tasks</p>
                        <button class="btn btn-primary" style="background: #16a34a; padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="assignCookStation('Grill/Fry + Mid Split')">${isEs ? 'Asignar Split 📌' : 'Assign Split 📌'}</button>
                    </div>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="card" style="margin-bottom: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h3 style="margin: 0; color: #166534;">${isEs ? '✅ Estación Asignada Activa' : '✅ Active Assigned Station'}: ${assignedStation}</h3>
                        <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #15803d;">${isEs ? 'La lista de verificación de abajo incluye tus tareas asignadas.' : 'The checklist below displays exclusively your assigned station and split duties.'}</p>
                    </div>
                    <button class="btn btn-secondary" style="background: white; color: #dc2626; border: 1px solid #fecaca;" onclick="clearCookStation()">${isEs ? 'Cambiar Estación 🔄' : 'Change Station 🔄'}</button>
                </div>
            </div>
        `;
    }
}

function renderChecklistForm() {
    const auditSelect = document.getElementById('gm-shift-audit-select');
    if(auditSelect && auditSelect.value) return;

    const roleType = currentRoleSession === 'cook' ? 'cook' : (document.getElementById('checklist-role-select')?.value || 'range');
    const shiftDate = document.getElementById('cook-shift-date')?.value || document.getElementById('shift-date')?.value;
    
    let shiftEntryView = document.getElementById('view-shift-entry');
    if(!shiftEntryView) return;

    let widgetWrapper = document.getElementById('cook-station-selector-widget');
    if (currentRoleSession === 'cook') {
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
    if(!container) return;
    container.innerHTML = '';

    if (currentRoleSession === 'cook' && (!currentUser || !currentUser.station)) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 2rem; background: #eff6ff; border: 1px solid #bfdbfe;">
                <h3 style="color: #1e3a8a; margin-top: 0;">👆 ${currentLanguage === 'es' ? 'Selecciona una Estación Arriba' : 'Select a Station Above'}</h3>
                <p style="color: #475569; margin-bottom: 0;">${currentLanguage === 'es' ? 'Haz clic en "Asignar" en tu estación o división de días de semana para cargar tu lista de verificación.' : 'Click "Assign" on your weekend station or weekday split mode above to load your closing checklist tasks.'}</p>
            </div>
        `;
        return;
    }

    const specs = getActiveChecklistSpecsForDate(shiftDate, roleType, currentLanguage);

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

    const specs = getActiveChecklistSpecsForDate(shift.date, shift.role, currentLanguage);

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
    .then(res => res.text())
    .then(text => {
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
    .then(res => res.text())
    .then(text => {
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
    .then(res => res.text())
    .then(text => {
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
    .then(res => res.text())
    .then(text => {
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
    .then(res => res.text())
    .then(text => {
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
    .then(res => res.text())
    .then(text => {
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

    if(!currentUser) {
        container.innerHTML = `<p style="color: #64748b;">${isEs ? 'Por favor inicia sesión para ver tu panel.' : 'Please log in to view your dashboard.'}</p>`;
        return;
    }

    const myShifts = shiftLogsList.filter(s => s.empId === currentUser.id);

    container.innerHTML = `
        <div class="card" style="margin-top: 1rem;">
            <h3 style="margin-top: 0; color: #1e3a8a;">${isEs ? 'Tus Registros de Turno Recientes y Rendimiento' : 'Your Recent Shift Submissions & Performance'} (${currentUser.name})</h3>
            <table class="data-table" style="margin-top: 1rem;">
                <thead><tr>
                    <th>${isEs ? 'Fecha' : 'Date'}</th>
                    <th>${isEs ? 'Horario de Turno' : 'Shift Time Slot'}</th>
                    <th>${isEs ? 'Puntaje' : 'Score'}</th>
                    <th>${isEs ? 'Nivel' : 'Tier'}</th>
                    <th>${isEs ? 'Notas' : 'Notes'}</th>
                </tr></thead>
                <tbody>
                    ${myShifts.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: #64748b;">${isEs ? 'No se encontraron registros de turno para tu cuenta.' : 'No shift logs found for your account.'}</td></tr>` :
                      myShifts.map(s => `
                        <tr>
                            <td>${s.date}</td>
                            <td>${s.timeSlot}</td>
                            <td><strong>${s.scorePct}%</strong></td>
                            <td>${s.scorePct >= 95 ? 'Tier 3' : s.scorePct >= 90 ? 'Tier 2' : s.scorePct >= 85 ? 'Tier 1' : (isEs ? 'No elegible' : 'Ineligible')}</td>
                            <td>-</td>
                        </tr>
                    `).join('')}
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

function renderRosterTable() {
    const tbody = document.getElementById('roster-table-body');
    if(!tbody) return;
