// ========== FastServ - Digital Queue Management System ==========
// Core data management with localStorage

const DB = {
  // Keys
  CAMPS: 'fastserv_camps',
  PATIENTS: 'fastserv_patients',
  TOKENS: 'fastserv_tokens',
  DEPARTMENTS: 'fastserv_departments',
  DOCTORS: 'fastserv_doctors',
  SETTINGS: 'fastserv_settings',

  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getObj(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch { return {}; }
  }
};

// ========== Initialize Default Data ==========
function initDefaultData() {
  if (!localStorage.getItem('fastserv_initialized')) {
    // Default Departments
    const departments = [
      { id: 'dept-1', name: 'General Medicine', shortCode: 'GM', color: '#0a6abf' },
      { id: 'dept-2', name: 'Pediatrics', shortCode: 'PD', color: '#28a745' },
      { id: 'dept-3', name: 'Orthopedics', shortCode: 'OR', color: '#dc3545' },
      { id: 'dept-4', name: 'Ophthalmology', shortCode: 'OP', color: '#6f42c1' },
      { id: 'dept-5', name: 'Dental', shortCode: 'DN', color: '#fd7e14' },
      { id: 'dept-6', name: 'ENT', shortCode: 'EN', color: '#20c997' },
      { id: 'dept-7', name: 'Gynecology', shortCode: 'GY', color: '#e83e8c' },
      { id: 'dept-8', name: 'Dermatology', shortCode: 'DR', color: '#17a2b8' }
    ];
    DB.set(DB.DEPARTMENTS, departments);

    // Default Doctors
    const doctors = [
      { id: 'doc-1', name: 'Dr. Anil Kumar', departmentId: 'dept-1', specialization: 'General Physician' },
      { id: 'doc-2', name: 'Dr. Priya Sharma', departmentId: 'dept-2', specialization: 'Pediatrician' },
      { id: 'doc-3', name: 'Dr. Rajesh Patel', departmentId: 'dept-3', specialization: 'Orthopedic Surgeon' },
      { id: 'doc-4', name: 'Dr. Sunita Reddy', departmentId: 'dept-4', specialization: 'Ophthalmologist' },
      { id: 'doc-5', name: 'Dr. Mohammed Farhan', departmentId: 'dept-5', specialization: 'Dental Surgeon' },
      { id: 'doc-6', name: 'Dr. Kavitha Nair', departmentId: 'dept-6', specialization: 'ENT Specialist' },
      { id: 'doc-7', name: 'Dr. Deepa Joshi', departmentId: 'dept-7', specialization: 'Gynecologist' },
      { id: 'doc-8', name: 'Dr. Vikram Singh', departmentId: 'dept-8', specialization: 'Dermatologist' }
    ];
    DB.set(DB.DOCTORS, doctors);

    // Default Camps
    const camps = [
      {
        id: 'camp-1',
        name: 'Free Health Checkup Camp',
        location: 'Community Hall, Sector 12, Hyderabad',
        date: '2026-12-05',
        time: '09:00 AM - 05:00 PM',
        status: 'upcoming',
        departments: ['dept-1', 'dept-2', 'dept-3', 'dept-4'],
        description: 'Free comprehensive health checkup for all community members'
      },
      {
        id: 'camp-2',
        name: 'Eye Care Camp',
        location: 'Government School, Rajahmundry',
        date: '2026-12-15',
        time: '10:00 AM - 04:00 PM',
        status: 'upcoming',
        departments: ['dept-4'],
        description: 'Free eye examination and spectacles distribution'
      },
      {
        id: 'camp-3',
        name: 'Dental Awareness Camp',
        location: 'Panchayat Office, Vijayawada',
        date: '2026-12-20',
        time: '09:30 AM - 03:00 PM',
        status: 'upcoming',
        departments: ['dept-5'],
        description: 'Dental checkup and oral hygiene awareness program'
      }
    ];
    DB.set(DB.CAMPS, camps);

    // Some sample patients
    const patients = [
      { id: 'P-001', name: 'Ravi Shankar', age: 45, gender: 'Male', phone: '9876543210', village: 'Madhapur', departmentId: 'dept-1', campId: 'camp-1', tokenNumber: 'GM-001', status: 'completed', registeredAt: new Date().toISOString(), queuePosition: 1 },
      { id: 'P-002', name: 'Lakshmi Devi', age: 38, gender: 'Female', phone: '9876543211', village: 'Kukatpally', departmentId: 'dept-2', campId: 'camp-1', tokenNumber: 'PD-001', status: 'serving', registeredAt: new Date().toISOString(), queuePosition: 1 },
      { id: 'P-003', name: 'Ahmed Khan', age: 55, gender: 'Male', phone: '9876543212', village: 'Secunderabad', departmentId: 'dept-1', campId: 'camp-1', tokenNumber: 'GM-002', status: 'waiting', registeredAt: new Date().toISOString(), queuePosition: 2 },
      { id: 'P-004', name: 'Sita Ram', age: 62, gender: 'Female', phone: '9876543213', village: 'Ameerpet', departmentId: 'dept-3', campId: 'camp-1', tokenNumber: 'OR-001', status: 'waiting', registeredAt: new Date().toISOString(), queuePosition: 1 },
      { id: 'P-005', name: 'Venkat Rao', age: 30, gender: 'Male', phone: '9876543214', village: 'Begumpet', departmentId: 'dept-1', campId: 'camp-1', tokenNumber: 'GM-003', status: 'waiting', registeredAt: new Date().toISOString(), queuePosition: 3 }
    ];
    DB.set(DB.PATIENTS, patients);

    localStorage.setItem('fastserv_initialized', 'true');
  }
}

// ========== Utility Functions ==========
function generateId(prefix) {
  return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function generateToken(departmentShortCode) {
  const patients = DB.get(DB.PATIENTS);
  const deptPatients = patients.filter(p => p.tokenNumber && p.tokenNumber.startsWith(departmentShortCode));
  const nextNum = deptPatients.length + 1;
  return `${departmentShortCode}-${String(nextNum).padStart(3, '0')}`;
}

function getDepartment(id) {
  return DB.get(DB.DEPARTMENTS).find(d => d.id === id);
}

function getDoctor(id) {
  return DB.get(DB.DOCTORS).find(d => d.id === id);
}

function getDoctorByDept(deptId) {
  return DB.get(DB.DOCTORS).find(d => d.departmentId === deptId);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ========== Patient Registration ==========
function registerPatient(formData) {
  const patients = DB.get(DB.PATIENTS);
  const dept = getDepartment(formData.departmentId);
  if (!dept) return null;

  const tokenNumber = generateToken(dept.shortCode);
  const deptPatients = patients.filter(p => p.departmentId === formData.departmentId && p.status !== 'completed');
  const queuePosition = deptPatients.length + 1;

  const patient = {
    id: generateId('P'),
    name: formData.name,
    age: formData.age,
    gender: formData.gender,
    phone: formData.phone,
    village: formData.village,
    departmentId: formData.departmentId,
    campId: formData.campId || 'camp-1',
    tokenNumber: tokenNumber,
    status: 'waiting',
    registeredAt: new Date().toISOString(),
    queuePosition: queuePosition
  };

  patients.push(patient);
  DB.set(DB.PATIENTS, patients);
  return patient;
}

// ========== Queue Management ==========
function callNextPatient(departmentId) {
  const patients = DB.get(DB.PATIENTS);
  
  // Mark current serving as completed
  const serving = patients.find(p => p.departmentId === departmentId && p.status === 'serving');
  if (serving) serving.status = 'completed';

  // Find next waiting patient
  const waiting = patients
    .filter(p => p.departmentId === departmentId && p.status === 'waiting')
    .sort((a, b) => a.queuePosition - b.queuePosition);

  if (waiting.length > 0) {
    waiting[0].status = 'serving';
    DB.set(DB.PATIENTS, patients);
    return waiting[0];
  }
  
  DB.set(DB.PATIENTS, patients);
  return null;
}

function markCompleted(patientId) {
  const patients = DB.get(DB.PATIENTS);
  const patient = patients.find(p => p.id === patientId);
  if (patient) {
    patient.status = 'completed';
    DB.set(DB.PATIENTS, patients);
    return true;
  }
  return false;
}

function getQueueStats() {
  const patients = DB.get(DB.PATIENTS);
  return {
    total: patients.length,
    waiting: patients.filter(p => p.status === 'waiting').length,
    serving: patients.filter(p => p.status === 'serving').length,
    completed: patients.filter(p => p.status === 'completed').length
  };
}

function getDeptQueueInfo(deptId) {
  const patients = DB.get(DB.PATIENTS);
  const deptPatients = patients.filter(p => p.departmentId === deptId);
  const serving = deptPatients.find(p => p.status === 'serving');
  const waiting = deptPatients.filter(p => p.status === 'waiting');
  const completed = deptPatients.filter(p => p.status === 'completed');
  return { serving, waiting, completed, total: deptPatients.length };
}

// ========== Toast Notifications ==========
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠'}</span> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ========== Mobile Nav Toggle ==========
function setupMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

// ========== Sidebar Toggle ==========
function setupSidebar() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// ========== Check Token Lookup ==========
function lookupToken(tokenNumber) {
  const patients = DB.get(DB.PATIENTS);
  return patients.find(p => p.tokenNumber.toLowerCase() === tokenNumber.toLowerCase());
}

// ========== Authentication ==========
const AUTH = {
  ADMIN_KEY: 'fastserv_admin_pass',
  DOCTOR_KEY: 'fastserv_doctor_pass',
  ADMIN_SESSION: 'fastserv_admin_auth',
  DOCTOR_SESSION: 'fastserv_doctor_auth',

  getDefaultPasswords() {
    return {
      admin: localStorage.getItem(this.ADMIN_KEY) || 'admin123',
      doctor: localStorage.getItem(this.DOCTOR_KEY) || 'doctor123'
    };
  },

  setPassword(role, newPass) {
    const key = role === 'admin' ? this.ADMIN_KEY : this.DOCTOR_KEY;
    localStorage.setItem(key, newPass);
  },

  login(role, password) {
    const passwords = this.getDefaultPasswords();
    if (passwords[role] === password) {
      const key = role === 'admin' ? this.ADMIN_SESSION : this.DOCTOR_SESSION;
      sessionStorage.setItem(key, 'true');
      return true;
    }
    return false;
  },

  isLoggedIn(role) {
    const key = role === 'admin' ? this.ADMIN_SESSION : this.DOCTOR_SESSION;
    return sessionStorage.getItem(key) === 'true';
  },

  logout(role) {
    const key = role === 'admin' ? this.ADMIN_SESSION : this.DOCTOR_SESSION;
    sessionStorage.removeItem(key);
  }
};

function initAuth() {
  if (!localStorage.getItem(AUTH.ADMIN_KEY)) {
    localStorage.setItem(AUTH.ADMIN_KEY, 'admin123');
  }
  if (!localStorage.getItem(AUTH.DOCTOR_KEY)) {
    localStorage.setItem(AUTH.DOCTOR_KEY, 'doctor123');
  }
}

// Show login screen - call from admin/doctor pages
function showLoginScreen(role, onSuccess) {
  if (AUTH.isLoggedIn(role)) {
    onSuccess();
    return;
  }
  const overlay = document.getElementById('loginOverlay');
  if (overlay) overlay.style.display = 'flex';
  const dashboard = document.querySelector('.dashboard');
  if (dashboard) dashboard.style.display = 'none';
}

function handleLogin(role, onSuccess) {
  const passInput = document.getElementById('loginPassword');
  const errorEl = document.getElementById('loginError');
  const password = passInput.value;

  if (AUTH.login(role, password)) {
    document.getElementById('loginOverlay').style.display = 'none';
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) dashboard.style.display = 'grid';
    if (onSuccess) onSuccess();
  } else {
    errorEl.textContent = 'Incorrect password. Please try again.';
    errorEl.style.display = 'block';
    passInput.value = '';
    passInput.focus();
  }
}

function handleLogout(role) {
  AUTH.logout(role);
  window.location.href = 'index.html';
}

// ========== QR Code Helpers ==========
function getRegistrationURL(campId) {
  // Build a URL that works both on localhost and file://
  const base = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
  return base + 'register.html' + (campId ? '?camp=' + campId : '');
}

function getTokenURL(tokenNumber) {
  const base = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
  return base + 'token.html?token=' + tokenNumber;
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
  initDefaultData();
  initAuth();
  setupMobileNav();
  setupSidebar();
});
