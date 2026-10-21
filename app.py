import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from flask import Flask, render_template, request, jsonify, send_file

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

app = Flask(__name__)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
EMPLOYEES_FILE = os.path.join(DATA_DIR, 'employees.json')
SHIFTS_FILE = os.path.join(DATA_DIR, 'shifts.json')
CERTS_FILE = os.path.join(DATA_DIR, 'certifications.json')
APPROVALS_FILE = os.path.join(DATA_DIR, 'payroll_approvals.json')
REPORTS_DIR = os.path.join(os.path.dirname(__file__), 'reports')

# Executive Master Password for GM
GM_MASTER_PASSWORD = "exec999"


def ensure_data_files():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    if not os.path.exists(REPORTS_DIR):
        os.makedirs(REPORTS_DIR)
    if not os.path.exists(EMPLOYEES_FILE):
        default_employees = [
            {"id": "EMP-101", "name": "Marcus Vance", "role": "cook", "station": "Grill / Line", "hourlyRate": 19.50,
             "pin": "1980", "active": True},
            {"id": "EMP-102", "name": "Elena Rostova", "role": "cook", "station": "Sauté / Prep", "hourlyRate": 18.75,
             "pin": "1981", "active": True},
            {"id": "EMP-201", "name": "Sarah Jenkins", "role": "manager", "station": "FOH / BOH Oversight",
             "hourlyRate": 26.00, "pin": "2020", "active": True},
            {"id": "EMP-301", "name": "Robert Sterling", "role": "gm", "station": "Executive General Manager",
             "hourlyRate": 35.00, "pin": "3010", "active": True}
        ]
        with open(EMPLOYEES_FILE, 'w') as f:
            json.dump(default_employees, f, indent=2)

    if not os.path.exists(SHIFTS_FILE):
        with open(SHIFTS_FILE, 'w') as f:
            json.dump([], f, indent=2)

    if not os.path.exists(CERTS_FILE):
        with open(CERTS_FILE, 'w') as f:
            json.dump([], f, indent=2)

    if not os.path.exists(APPROVALS_FILE):
        with open(APPROVALS_FILE, 'w') as f:
            json.dump([], f, indent=2)


def load_data(file_path):
    ensure_data_files()
    with open(file_path, 'r') as f:
        return json.load(f)


def save_data(file_path, data):
    ensure_data_files()
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)


# GMAIL SMTP HELPER FUNCTION WITH APP PASSWORD
def send_email_via_gmail(sender_email, recipient_email, subject, body, attachment_path=None):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    app_password = "crrd nhzv lkgf wlyy"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    if attachment_path and os.path.exists(attachment_path):
        with open(attachment_path, "rb") as f:
            p = MIMEApplication(f.read(), Name=os.path.basename(attachment_path))
            p['Content-Disposition'] = f'attachment; filename="{os.path.basename(attachment_path)}"'
            msg.attach(p)

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"SMTP Error: {e}")
        return False


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/auth', methods=['POST'])
def authenticate_role():
    req = request.json
    entered_pin = req.get('password')
    employees = load_data(EMPLOYEES_FILE)

    if entered_pin == GM_MASTER_PASSWORD:
        gm_emp = next((e for e in employees if e['role'] == 'gm'),
                      {"name": "General Manager", "role": "gm", "id": "EMP-GM"})
        return jsonify({"success": True, "role": "gm", "employee": gm_emp})

    matched_emp = next((e for e in employees if e.get('pin') == entered_pin and e.get('active', True)), None)
    if matched_emp:
        return jsonify({"success": True, "role": matched_emp['role'], "employee": matched_emp})

    return jsonify({"success": False, "error": "Invalid PIN or Password."}), 401


@app.route('/api/employees', methods=['GET', 'POST'])
def handle_employees():
    employees = load_data(EMPLOYEES_FILE)
    if request.method == 'POST':
        new_emp = request.json
        new_emp['id'] = f"EMP-{len(employees) + 101}"
        new_emp['active'] = True
        employees.append(new_emp)
        save_data(EMPLOYEES_FILE, employees)
        return jsonify({"success": True, "employee": new_emp})
    return jsonify(employees)


@app.route('/api/employees/<emp_id>', methods=['PUT', 'DELETE'])
def modify_employee(emp_id):
    employees = load_data(EMPLOYEES_FILE)
    if request.method == 'PUT':
        updated_data = request.json
        for i, emp in enumerate(employees):
            if emp['id'] == emp_id:
                employees[i].update(updated_data)
                save_data(EMPLOYEES_FILE, employees)
                return jsonify({"success": True, "employee": employees[i]})
        return jsonify({"success": False, "error": "Employee not found."}), 404
    elif request.method == 'DELETE':
        updated = [e for e in employees if e['id'] != emp_id]
        save_data(EMPLOYEES_FILE, updated)
        return jsonify({"success": True})


@app.route('/api/shifts', methods=['GET', 'POST'])
def handle_shifts():
    shifts = load_data(SHIFTS_FILE)
    if request.method == 'POST':
        new_shift = request.json
        existing_idx = next((i for i, s in enumerate(shifts) if
                             s['empId'] == new_shift['empId'] and s['date'] == new_shift['date'] and s['timeSlot'] ==
                             new_shift['timeSlot']), -1)
        if existing_idx != -1:
            new_shift['id'] = shifts[existing_idx]['id']
            shifts[existing_idx] = new_shift
            msg = "Updated existing shift report."
        else:
            new_shift['id'] = f"LOG-{len(shifts) + 1001}"
            shifts.append(new_shift)
            msg = "Created new shift report."
        save_data(SHIFTS_FILE, shifts)
        return jsonify({"success": True, "message": msg, "shift": new_shift})
    return jsonify(shifts)


@app.route('/api/shifts/<shift_id>', methods=['PUT'])
def update_shift(shift_id):
    shifts = load_data(SHIFTS_FILE)
    updated_data = request.json
    for i, s in enumerate(shifts):
        if s['id'] == shift_id:
            shifts[i].update(updated_data)
            save_data(SHIFTS_FILE, shifts)
            return jsonify({"success": True, "shift": shifts[i]})
    return jsonify({"success": False, "error": "Shift log not found."}), 404


# TOTAL SHIFT REPORT EMAIL DISPATCH
@app.route('/api/shifts/report-total', methods=['POST'])
def report_total():
    req = request.json
    target_date = req.get('date')
    time_slot = req.get('timeSlot')

    shifts = load_data(SHIFTS_FILE)
    matching = [s for s in shifts if s.get('date') == target_date]

    body = f"KitchenSync Pro - Total Shift Report\n"
    body += f"Date: {target_date}\n"
    body += f"Time Slot: {time_slot}\n"
    body += f"Total Employee Logs: {len(matching)}\n\n"

    for m in matching:
        body += f"- {m.get('empName')} ({m.get('role', 'staff').upper()}): Score {m.get('scorePct')}%, Manager on Duty: {m.get('managerOnDuty')}\n"
        if m.get('notes'):
            for tid, note in m.get('notes').items():
                body += f"    * Note [{tid}]: {note}\n"

    sender = "kitchensync.pro@gmail.com"
    recipient = "management.kitchensync@gmail.com"
    success = send_email_via_gmail(sender, recipient, f"Total Shift Report - {target_date}", body)

    if success:
        return jsonify({"success": True, "count": len(matching)})
    else:
        return jsonify({"success": False, "error": "Failed to dispatch email via SMTP."}), 500


# BI-WEEKLY EMPLOYEE REPORT EMAIL DISPATCH
@app.route('/api/shifts/report-employee-biweekly', methods=['POST'])
def report_employee_biweekly():
    req = request.json
    emp_id = req.get('empId')
    shifts = req.get('shifts', [])
    avg_score = req.get('avgScore', 0)
    bonus_amt = req.get('bonusAmt', 0)
    tier_label = req.get('tierLabel', 'Ineligible')

    employees = load_data(EMPLOYEES_FILE)
    emp = next((e for e in employees if e['id'] == emp_id), None)
    emp_name = emp['name'] if emp else "Employee"

    body = f"KitchenSync Pro - Bi-Weekly Performance Report\n"
    body += f"Employee: {emp_name}\n"
    body += f"Average Compliance: {avg_score}%\n"
    body += f"Bonus Payout Tier: {tier_label} (${bonus_amt})\n"
    body += f"Total Shifts in Cycle: {len(shifts)}\n"

    sender = "kitchensync.pro@gmail.com"
    recipient = "management.kitchensync@gmail.com"
    success = send_email_via_gmail(sender, recipient, f"Bi-Weekly Performance Report - {emp_name}", body)

    return jsonify({"success": success})


@app.route('/api/certifications', methods=['GET', 'POST'])
def handle_certifications():
    certs = load_data(CERTS_FILE)
    if request.method == 'POST':
        submission = request.json
        existing_idx = next(
            (i for i, c in enumerate(certs) if c['empId'] == submission['empId'] and c['modId'] == submission['modId']),
            -1)
        if existing_idx != -1:
            certs[existing_idx].update(submission)
        else:
            certs.append(submission)
        save_data(CERTS_FILE, certs)
        return jsonify({"success": True, "cert": submission})
    return jsonify(certs)


@app.route('/api/gm/payroll-approvals', methods=['GET', 'POST'])
def handle_payroll_approvals():
    approvals = load_data(APPROVALS_FILE)
    if request.method == 'POST':
        approval = request.json
        existing = next((a for a in approvals if a['empId'] == approval['empId']), None)
        if not existing:
            approvals.append(approval)
            save_data(APPROVALS_FILE, approvals)
        return jsonify({"success": True, "approvals": approvals})
    return jsonify(approvals)


@app.route('/api/gm/reset-demo-data', methods=['POST'])
def reset_demo_data():
    save_data(SHIFTS_FILE, [])
    save_data(CERTS_FILE, [])
    save_data(APPROVALS_FILE, [])
    return jsonify({"success": True,
                    "message": "All demo shift reports, training records, and payroll approvals cleared successfully."})


@app.route('/api/gm/reports-by-date', methods=['GET'])
def get_reports_by_date():
    target_date = request.args.get('date')
    if not target_date:
        return jsonify({"success": False, "error": "Date parameter required."}), 400
    shifts = load_data(SHIFTS_FILE)
    date_shifts = [s for s in shifts if s.get('date') == target_date]
    return jsonify({"success": True, "date": target_date, "reports": date_shifts})


# PDF REPORT GENERATOR (Strictly filters for explicitly approved bonuses only)
@app.route('/api/gm/generate-payroll-report', methods=['POST'])
def generate_payroll_report():
    approvals = load_data(APPROVALS_FILE)

    pdf_path = os.path.join(REPORTS_DIR, 'BiWeekly_Bonus_Accounting_Report.pdf')
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()

    story.append(Paragraph("<b>KitchenSync Pro - Bi-Weekly Bonus Payroll Report</b>", styles['Title']))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Official Accounting & Record Keeping Authorization Document (Approved Bonuses Only)",
                           styles['Normal']))
    story.append(Spacer(1, 15))

    table_data = [["Employee Name", "Role", "Bonus Tier", "Approved Bonus ($)", "Approval Date"]]
    total_approved = 0

    for a in approvals:
        table_data.append([
            a.get('empName', 'Unknown'),
            a.get('role', 'COOK').upper(),
            a.get('tierLabel', 'Tier'),
            f"${a.get('bonusAmt', 0)}",
            a.get('dateApproved', '')[:10]
        ])
        total_approved += a.get('bonusAmt', 0)

    if len(approvals) == 0:
        table_data.append(["No bonuses have been approved yet.", "", "", "", ""])

    table_data.append(["", "", "", "Total Authorized Payout:", f"${total_approved}"])

    t = Table(table_data, colWidths=[140, 70, 90, 90, 110])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e3a8a')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#f1f5f9')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
    ]))

    story.append(t)
    doc.build(story)

    return send_file(pdf_path, as_attachment=True)


if __name__ == '__main__':
    ensure_data_files()
    print("Starting KitchenSync Pro Server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)