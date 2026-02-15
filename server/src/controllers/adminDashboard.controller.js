const Admin = require('../models/Admin.model');
const User = require('../models/User.model');
const Purchase = require('../models/Purchase.model');
const AccessCode = require('../models/AccessCode.model');
const Affiliate = require('../models/Affiliate.model');
const Ebook = require('../models/Ebook.model');
const winston = require('winston');

const adminDashboardController = {
  /**
   * Render admin dashboard
   */
  async getDashboard(req, res) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard - Suicide Note</title>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          body {
            background: #f5f7fa;
          }

          .dashboard {
            display: flex;
            min-height: 100vh;
          }

          /* Sidebar */
          .sidebar {
            width: 280px;
            background: linear-gradient(180deg, #1a1c2c 0%, #2d1f3a 100%);
            color: white;
            padding: 30px 20px;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
          }

          .sidebar-logo {
            text-align: center;
            margin-bottom: 40px;
          }

          .sidebar-logo h2 {
            font-size: 24px;
            margin-bottom: 5px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .sidebar-logo p {
            font-size: 12px;
            opacity: 0.6;
          }

          .nav-menu {
            list-style: none;
          }

          .nav-item {
            margin-bottom: 10px;
          }

          .nav-link {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s;
          }

          .nav-link:hover, .nav-link.active {
            background: rgba(255,255,255,0.1);
            color: white;
          }

          .nav-link i {
            width: 24px;
            margin-right: 10px;
          }

          .nav-link span {
            flex: 1;
          }

          .badge {
            background: #ff4757;
            color: white;
            padding: 3px 8px;
            border-radius: 20px;
            font-size: 11px;
          }

          /* Main Content */
          .main-content {
            flex: 1;
            margin-left: 280px;
            padding: 30px;
          }

          /* Top Bar */
          .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            background: white;
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .page-title h1 {
            font-size: 24px;
            color: #333;
          }

          .page-title p {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
          }

          .admin-profile {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .notifications {
            position: relative;
            cursor: pointer;
          }

          .notifications i {
            font-size: 20px;
            color: #666;
          }

          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4757;
            color: white;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .profile-dropdown {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 10px;
            transition: background 0.3s;
          }

          .profile-dropdown:hover {
            background: #f5f5f5;
          }

          .avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          }

          .profile-info {
            display: none;
            position: absolute;
            top: 60px;
            right: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            padding: 15px;
            min-width: 200px;
            z-index: 1000;
          }

          .profile-info.show {
            display: block;
          }

          .profile-info a {
            display: block;
            padding: 10px;
            color: #333;
            text-decoration: none;
            border-radius: 5px;
          }

          .profile-info a:hover {
            background: #f5f5f5;
          }

          .profile-info hr {
            margin: 10px 0;
            border: none;
            border-top: 1px solid #eee;
          }

          /* Stats Cards */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            margin-bottom: 30px;
          }

          .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: transform 0.3s;
          }

          .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }

          .stat-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }

          .stat-icon i {
            font-size: 24px;
            color: #667eea;
          }

          .stat-value {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }

          .stat-label {
            color: #666;
            font-size: 14px;
          }

          .stat-change {
            margin-top: 10px;
            font-size: 13px;
          }

          .stat-change.positive {
            color: #00b894;
          }

          .stat-change.negative {
            color: #ff4757;
          }

          /* Charts Row */
          .charts-row {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 25px;
            margin-bottom: 30px;
          }

          .chart-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .chart-header h3 {
            color: #333;
          }

          .chart-header select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
          }

          /* Tables */
          .tables-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
          }

          .table-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .table-header h3 {
            color: #333;
          }

          .view-all {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            text-align: left;
            padding: 12px 0;
            color: #666;
            font-weight: 500;
            font-size: 14px;
            border-bottom: 2px solid #eee;
          }

          td {
            padding: 12px 0;
            color: #333;
            border-bottom: 1px solid #f0f0f0;
          }

          .status-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
          }

          .status-badge.completed {
            background: #00b89420;
            color: #00b894;
          }

          .status-badge.pending {
            background: #fdcb6e20;
            color: #fdcb6e;
          }

          .status-badge.failed {
            background: #ff475720;
            color: #ff4757;
          }

          .status-badge.active {
            background: #00b89420;
            color: #00b894;
          }

          .status-badge.inactive {
            background: #ff475720;
            color: #ff4757;
          }

          .action-btn {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            margin: 0 3px;
          }

          .action-btn.view {
            background: #667eea20;
            color: #667eea;
          }

          .action-btn.edit {
            background: #00b89420;
            color: #00b894;
          }

          .action-btn.delete {
            background: #ff475720;
            color: #ff4757;
          }

          /* Loading */
          .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Modal */
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 2000;
            justify-content: center;
            align-items: center;
          }

          .modal.show {
            display: flex;
          }

          .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
          }

          .modal-content h3 {
            margin-bottom: 20px;
            color: #333;
          }

          .modal-content input, .modal-content textarea, .modal-content select {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
          }

          .modal-content input:focus, .modal-content textarea:focus, .modal-content select:focus {
            outline: none;
            border-color: #667eea;
          }

          .modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
          }

          .modal-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
          }

          .modal-buttons button.primary {
            background: #667eea;
            color: white;
          }

          .modal-buttons button.primary:hover {
            background: #5a6fd8;
          }

          .modal-buttons button.secondary {
            background: #eee;
            color: #333;
          }

          .modal-buttons button.secondary:hover {
            background: #ddd;
          }

          /* Success/Error Messages */
          .alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
          }

          .alert.success {
            background: #00b89420;
            color: #00b894;
            border: 1px solid #00b894;
            display: block;
          }

          .alert.error {
            background: #ff475720;
            color: #ff4757;
            border: 1px solid #ff4757;
            display: block;
          }

          /* Empty State */
          .empty-state {
            text-align: center;
            padding: 50px;
            background: white;
            border-radius: 15px;
          }

          .empty-state i {
            font-size: 48px;
            color: #667eea;
            margin-bottom: 20px;
          }

          .empty-state h3 {
            color: #333;
            margin-bottom: 10px;
          }

          .empty-state p {
            color: #666;
            margin-bottom: 20px;
          }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
      </head>
      <body>
        <div class="dashboard">
          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sidebar-logo">
              <i class="fas fa-skull" style="font-size: 40px; margin-bottom: 10px;"></i>
              <h2>Suicide Note</h2>
              <p>Admin Portal</p>
            </div>

            <ul class="nav-menu">
              <li class="nav-item">
                <a href="#" class="nav-link active" onclick="loadSection('dashboard', event)">
                  <i class="fas fa-home"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('transactions', event)">
                  <i class="fas fa-credit-card"></i>
                  <span>Transactions</span>
                  <span class="badge" id="transactionBadge">0</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('access-codes', event)">
                  <i class="fas fa-key"></i>
                  <span>Access Codes</span>
                  <span class="badge" id="accessCodeBadge">0</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('users', event)">
                  <i class="fas fa-users"></i>
                  <span>Users</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('affiliates', event)">
                  <i class="fas fa-handshake"></i>
                  <span>Affiliates</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('free-access', event)">
                  <i class="fas fa-gift"></i>
                  <span>Free Access</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('settings', event)">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="signOut(event)">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Main Content -->
          <div class="main-content">
            <!-- Top Bar -->
            <div class="top-bar">
              <div class="page-title">
                <h1 id="pageTitle">Dashboard</h1>
                <p id="pageSubtitle">Welcome back, <span id="adminName"></span></p>
              </div>
              
              <div class="admin-profile">
                <div class="notifications" onclick="toggleNotifications()">
                  <i class="far fa-bell"></i>
                  <span class="notification-badge">0</span>
                </div>
                
                <div class="profile-dropdown" onclick="toggleProfileMenu()">
                  <div class="avatar" id="adminAvatar">
                    <span id="adminInitial"></span>
                  </div>
                  <div>
                    <strong id="adminFullName"></strong>
                    <p style="font-size: 12px; color: #666;" id="adminRole"></p>
                  </div>
                  <i class="fas fa-chevron-down"></i>
                </div>

                <!-- Profile Dropdown Menu -->
                <div class="profile-info" id="profileMenu">
                  <a href="#" onclick="loadSection('profile', event)"><i class="fas fa-user"></i> My Profile</a>
                  <a href="#" onclick="loadSection('settings', event)"><i class="fas fa-cog"></i> Settings</a>
                  <hr>
                  <a href="#" onclick="signOut(event)"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                </div>
              </div>
            </div>

            <!-- Alert Container -->
            <div id="alertContainer" class="alert"></div>

            <!-- Dynamic Content -->
            <div id="contentArea">
              <div class="loading-spinner">
                <div class="spinner"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal for Free Access -->
        <div class="modal" id="freeAccessModal">
          <div class="modal-content">
            <h3><i class="fas fa-gift" style="margin-right: 10px;"></i>Send Free Access Code</h3>
            <input type="email" id="freeEmail" placeholder="Email Address *" required>
            <input type="text" id="freeName" placeholder="Name (Optional)">
            <textarea id="freeMessage" placeholder="Personal Message (Optional)" rows="3"></textarea>
            <select id="freeEbook" required>
              <option value="">Select Ebook *</option>
            </select>
            <div class="modal-buttons">
              <button class="secondary" onclick="closeFreeAccessModal()">Cancel</button>
              <button class="primary" onclick="sendFreeAccess()">Send Free Access</button>
            </div>
          </div>
        </div>

        <script>
          // Helper function to get cookie
          function getCookie(name) {
            try {
              const value = \`; \${document.cookie}\`;
              const parts = value.split(\`; \${name}=\`);
              if (parts.length === 2) {
                return parts.pop().split(';').shift();
              }
            } catch (error) {
              console.error('Error getting cookie:', error);
            }
            return null;
          }

          // Helper function to set cookie
          function setCookie(name, value, days = 1) {
            try {
              const date = new Date();
              date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
              const expires = "expires=" + date.toUTCString();
              const secure = window.location.protocol === 'https:' ? 'secure;' : '';
              document.cookie = \`\${name}=\${value}; \${expires}; path=/; sameSite=lax; \${secure}\`;
              return true;
            } catch (error) {
              console.error('Error setting cookie:', error);
              return false;
            }
          }

          // Show alert message
          function showAlert(message, type = 'success') {
            const alert = document.getElementById('alertContainer');
            if (alert) {
              alert.className = 'alert ' + type;
              alert.textContent = message;
              
              setTimeout(() => {
                alert.className = 'alert';
              }, 5000);
            }
          }

          // Check authentication status
          async function checkAuth() {
            try {
              // Try to get token from cookie first
              let token = getCookie('admin_token');
              let tokenSource = 'cookie';
              
              // If not in cookie, try sessionStorage
              if (!token) {
                token = sessionStorage.getItem('admin_token');
                tokenSource = 'sessionStorage';
                console.log('🔑 Token from sessionStorage:', token ? 'Present' : 'Missing');
                
                // If found in sessionStorage, set it back as cookie
                if (token) {
                  setCookie('admin_token', token, 1);
                  console.log('✅ Restored token from sessionStorage to cookie');
                }
              } else {
                console.log('🔑 Token from cookie: Present');
              }
              
              if (!token) {
                console.log('❌ No token found, redirecting to login');
                window.location.href = '/admin/signin?error=no_token';
                return false;
              }

              // Verify token by making a request to profile endpoint
              const response = await fetch('/api/v1/admin/auth/profile', {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include'
              });

              if (response.status === 401) {
                console.log('❌ Token invalid or expired, trying refresh...');
                
                // Try to refresh the token
                const refreshResponse = await fetch('/api/v1/admin/auth/refresh', {
                  method: 'POST',
                  credentials: 'include'
                });

                if (refreshResponse.ok) {
                  const refreshData = await refreshResponse.json();
                  console.log('✅ Token refreshed successfully');
                  
                  // Update token in both cookie and sessionStorage
                  if (refreshData.token) {
                    setCookie('admin_token', refreshData.token, 1);
                    sessionStorage.setItem('admin_token', refreshData.token);
                  }
                  return true;
                } else {
                  console.log('❌ Token refresh failed');
                  sessionStorage.removeItem('admin_token');
                  document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  window.location.href = '/admin/signin?error=session_expired';
                  return false;
                }
              }

              if (response.ok) {
                console.log('✅ Token is valid');
                return true;
              }

              return false;
            } catch (error) {
              console.error('❌ Auth check error:', error);
              return false;
            }
          }

          // Admin data from server
          const adminData = {
            name: '${req.admin.name}',
            role: '${req.admin.role}',
            initial: '${req.admin.name.charAt(0).toUpperCase()}',
            id: '${req.admin._id}',
            email: '${req.admin.email}'
          };

          let currentSection = 'dashboard';
          let currentPage = 1;
          let isRefreshing = false;

          // Load initial dashboard
          document.addEventListener('DOMContentLoaded', async () => {
            console.log('📊 Dashboard loading...');
            
            // Set admin info in the UI
            const nameElement = document.getElementById('adminName');
            const initialElement = document.getElementById('adminInitial');
            const fullNameElement = document.getElementById('adminFullName');
            const roleElement = document.getElementById('adminRole');
            
            if (nameElement) nameElement.textContent = adminData.name;
            if (initialElement) initialElement.textContent = adminData.initial;
            if (fullNameElement) fullNameElement.textContent = adminData.name;
            if (roleElement) roleElement.textContent = adminData.role;
            
            const isAuthenticated = await checkAuth();
            if (isAuthenticated) {
              await loadDashboard();
              await loadEbooksForSelect();
            }
          });

          // Load ebooks for select dropdown
          async function loadEbooksForSelect() {
            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              if (!token) return;

              const response = await fetch('/api/v1/ebooks', {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                }
              });
              
              if (response.status === 401) {
                await checkAuth();
                return;
              }
              
              const data = await response.json();
              
              if (data.success && data.data) {
                const select = document.getElementById('freeEbook');
                if (select) {
                  select.innerHTML = '<option value="">Select Ebook *</option>';
                  
                  data.data.forEach(ebook => {
                    const option = document.createElement('option');
                    option.value = ebook._id;
                    option.textContent = ebook.title;
                    select.appendChild(option);
                  });
                }
              }
            } catch (error) {
              console.error('Error loading ebooks:', error);
            }
          }

          // Load different sections
          async function loadSection(section, event) {
            if (event) {
              event.preventDefault();
            }
            
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
            
            currentSection = section;
            currentPage = 1;
            
            // Update active nav - only if we have links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
              link.classList.remove('active');
            });
            
            // Only try to add active class if event and event.currentTarget exist
            if (event && event.currentTarget) {
              event.currentTarget.classList.add('active');
            } else {
              // If no event, find the link by section name and activate it
              navLinks.forEach(link => {
                const onclickAttr = link.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes(section)) {
                  link.classList.add('active');
                }
              });
            }

            // Update page title
            const titles = {
              dashboard: 'Dashboard',
              transactions: 'Transactions',
              'access-codes': 'Access Codes',
              users: 'Users',
              affiliates: 'Affiliates',
              'free-access': 'Free Access',
              settings: 'Settings',
              profile: 'My Profile'
            };
            
            const titleElement = document.getElementById('pageTitle');
            if (titleElement) {
              titleElement.textContent = titles[section] || 'Dashboard';
            }
            
            const subtitleElement = document.getElementById('pageSubtitle');
            if (subtitleElement) {
              subtitleElement.textContent = \`Welcome back, \${adminData.name}\`;
            }

            // Load section content
            try {
              switch(section) {
                case 'dashboard':
                  await loadDashboard();
                  break;
                case 'transactions':
                  await loadTransactions();
                  break;
                case 'access-codes':
                  await loadAccessCodes();
                  break;
                case 'users':
                  await loadUsers();
                  break;
                case 'affiliates':
                  await loadAffiliates();
                  break;
                case 'free-access':
                  await loadFreeAccess();
                  break;
                case 'settings':
                  await loadSettings();
                  break;
                case 'profile':
                  await loadProfile();
                  break;
                default:
                  console.log('Unknown section:', section);
              }
            } catch (error) {
              console.error('Error loading section:', error);
              showAlert('Error loading section content', 'error');
            }
          }

          // Load Dashboard
          async function loadDashboard() {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              if (!token) {
                await checkAuth();
                return;
              }

              const response = await fetch('/api/v1/admin/dashboard/stats', {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include'
              });
              
              if (response.status === 401) {
                await checkAuth();
                return;
              }
              
              const data = await response.json();
              
              if (data.success) {
                renderDashboard(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load dashboard data</p>';
              }
            } catch (error) {
              console.error('Dashboard error:', error);
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading dashboard</p>';
            }
          }

          function renderDashboard(stats) {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            // Update badges
            const transactionBadge = document.getElementById('transactionBadge');
            const accessCodeBadge = document.getElementById('accessCodeBadge');
            
            if (transactionBadge) transactionBadge.textContent = stats.overview.totalPurchases || 0;
            if (accessCodeBadge) accessCodeBadge.textContent = stats.overview.totalAccessCodes?.total || 0;
            
            content.innerHTML = \`
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="stat-value">\${stats.overview.totalUsers || 0}</div>
                  <div class="stat-label">Total Users</div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <div class="stat-value">\${stats.overview.totalPurchases || 0}</div>
                  <div class="stat-label">Total Sales</div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-naira-sign"></i>
                  </div>
                  <div class="stat-value">₦\${(stats.overview.totalRevenue || 0).toLocaleString()}</div>
                  <div class="stat-label">Total Revenue</div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-key"></i>
                  </div>
                  <div class="stat-value">\${stats.overview.totalAccessCodes?.total || 0}</div>
                  <div class="stat-label">Access Codes</div>
                </div>
              </div>

              <div class="charts-row">
                <div class="chart-card">
                  <div class="chart-header">
                    <h3>Revenue Overview</h3>
                    <select onchange="updateRevenueChart(this.value)">
                      <option value="week">This Week</option>
                      <option value="month" selected>This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                  <canvas id="revenueChart" style="height: 300px;"></canvas>
                </div>

                <div class="chart-card">
                  <div class="chart-header">
                    <h3>Payment Methods</h3>
                  </div>
                  <canvas id="paymentChart" style="height: 300px;"></canvas>
                </div>
              </div>

              <div class="tables-row">
                <div class="table-card">
                  <div class="table-header">
                    <h3>Recent Transactions</h3>
                    <a href="#" class="view-all" onclick="loadSection('transactions', event)">View All</a>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Reference</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      \${(stats.recentTransactions || []).map(t => \`
                        <tr>
                          <td>\${t.transactionReference?.substring(0, 8)}...</td>
                          <td>\${t.user?.email?.split('@')[0] || 'N/A'}</td>
                          <td>₦\${t.amount}</td>
                          <td><span class="status-badge \${t.status}">\${t.status}</span></td>
                          <td>\${new Date(t.createdAt).toLocaleDateString()}</td>
                        </tr>
                      \`).join('')}
                    </tbody>
                  </table>
                </div>

                <div class="table-card">
                  <div class="table-header">
                    <h3>Recent Access Codes</h3>
                    <a href="#" class="view-all" onclick="loadSection('access-codes', event)">View All</a>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>User</th>
                        <th>Ebook</th>
                        <th>Status</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      \${(stats.recentAccessCodes || []).map(c => \`
                        <tr>
                          <td>\${c.code}</td>
                          <td>\${c.user?.email?.split('@')[0] || 'N/A'}</td>
                          <td>\${c.ebook?.title?.substring(0, 15) || 'N/A'}</td>
                          <td><span class="status-badge \${c.isActive ? 'active' : 'inactive'}">\${c.isActive ? 'Active' : 'Inactive'}</span></td>
                          <td>\${c.isFreeAccess ? 'Free' : 'Paid'}</td>
                        </tr>
                      \`).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            \`;

            // Initialize charts
            initRevenueChart();
            initPaymentChart(stats.paymentMethods || []);
          }

          function initRevenueChart() {
            const canvas = document.getElementById('revenueChart');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                  label: 'Revenue (₦)',
                  data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                  borderColor: '#667eea',
                  backgroundColor: '#667eea20',
                  tension: 0.4,
                  fill: true
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
            });
          }

          function initPaymentChart(methods) {
            const canvas = document.getElementById('paymentChart');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            new Chart(ctx, {
              type: 'doughnut',
              data: {
                labels: methods.map(m => m.method || 'Unknown'),
                datasets: [{
                  data: methods.map(m => m.count),
                  backgroundColor: ['#667eea', '#764ba2', '#00b894', '#fdcb6e', '#ff7675']
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            });
          }

          // Load Transactions
          async function loadTransactions(page = 1) {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              if (!token) {
                await checkAuth();
                return;
              }

              const response = await fetch(\`/api/v1/admin/transactions?page=\${page}\`, {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include'
              });
              
              if (response.status === 401) {
                await checkAuth();
                return;
              }
              
              const data = await response.json();
              
              if (data.success) {
                renderTransactions(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load transactions</p>';
              }
            } catch (error) {
              console.error('Transactions error:', error);
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading transactions</p>';
            }
          }

          function renderTransactions(data) {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = \`
              <div style="background: white; padding: 25px; border-radius: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                  <h2>All Transactions</h2>
                  <div>
                    <input type="text" id="searchInput" placeholder="Search..." style="padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-right: 10px;" onkeyup="searchTransactions()">
                    <select id="statusFilter" style="padding: 10px; border: 1px solid #ddd; border-radius: 8px;" onchange="filterTransactions()">
                      <option value="">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>User</th>
                      <th>Ebook</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="transactionsTableBody">
                    \${(data.transactions || []).map(t => \`
                      <tr>
                        <td>\${t.transactionReference?.substring(0, 12) || 'N/A'}</td>
                        <td>\${t.user?.email || 'N/A'}</td>
                        <td>\${t.ebook?.title?.substring(0, 20) || 'N/A'}</td>
                        <td>₦\${t.amount}</td>
                        <td><span class="status-badge \${t.status}">\${t.status}</span></td>
                        <td>\${new Date(t.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button class="action-btn view" onclick="viewTransaction('\${t._id}')">View</button>
                          \${t.status === 'completed' ? \`
                            <button class="action-btn edit" onclick="refundTransaction('\${t._id}')">Refund</button>
                          \` : ''}
                        </td>
                      </tr>
                    \`).join('')}
                  </tbody>
                </table>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                  <p>Showing \${data.transactions?.length || 0} of \${data.pagination?.total || 0} transactions</p>
                  <div>
                    \${Array.from({ length: data.pagination?.pages || 1 }, (_, i) => i + 1).map(p => \`
                      <button onclick="loadTransactions(\${p})" style="padding: 5px 10px; margin: 0 5px; border: 1px solid #ddd; border-radius: 5px; background: \${p === data.pagination?.page ? '#667eea' : 'white'}; color: \${p === data.pagination?.page ? 'white' : '#333'};">\${p}</button>
                    \`).join('')}
                  </div>
                </div>
              </div>
            \`;
          }

          // Load Access Codes
          async function loadAccessCodes(page = 1) {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              if (!token) {
                await checkAuth();
                return;
              }

              const response = await fetch(\`/api/v1/admin/access-codes?page=\${page}\`, {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include'
              });
              
              if (response.status === 401) {
                await checkAuth();
                return;
              }
              
              const data = await response.json();
              
              if (data.success) {
                renderAccessCodes(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load access codes</p>';
              }
            } catch (error) {
              console.error('Access codes error:', error);
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading access codes</p>';
            }
          }

          function renderAccessCodes(data) {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = \`
              <div style="background: white; padding: 25px; border-radius: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                  <h2>Access Codes</h2>
                  <button class="primary" onclick="showFreeAccessModal()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-gift"></i> Send Free Access
                  </button>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>User</th>
                      <th>Ebook</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Used</th>
                      <th>Expires</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${(data.accessCodes || []).map(c => \`
                      <tr>
                        <td>\${c.code}</td>
                        <td>\${c.user?.email?.split('@')[0] || 'N/A'}</td>
                        <td>\${c.ebook?.title?.substring(0, 15) || 'N/A'}</td>
                        <td><span class="status-badge \${c.isActive ? 'active' : 'inactive'}">\${c.isActive ? 'Active' : 'Inactive'}</span></td>
                        <td>\${c.isFreeAccess ? 'Free' : 'Paid'}</td>
                        <td>\${c.accessCount || 0}</td>
                        <td>\${new Date(c.expiresAt).toLocaleDateString()}</td>
                        <td>
                          <button class="action-btn view" onclick="viewAccessCode('\${c._id}')">View</button>
                          \${c.isActive ? \`
                            <button class="action-btn delete" onclick="revokeAccessCode('\${c._id}')">Revoke</button>
                          \` : ''}
                        </td>
                      </tr>
                    \`).join('')}
                  </tbody>
                </table>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                  <p>Showing \${data.accessCodes?.length || 0} of \${data.pagination?.total || 0} access codes</p>
                  <div>
                    \${Array.from({ length: data.pagination?.pages || 1 }, (_, i) => i + 1).map(p => \`
                      <button onclick="loadAccessCodes(\${p})" style="padding: 5px 10px; margin: 0 5px; border: 1px solid #ddd; border-radius: 5px; background: \${p === data.pagination?.page ? '#667eea' : 'white'}; color: \${p === data.pagination?.page ? 'white' : '#333'};">\${p}</button>
                    \`).join('')}
                  </div>
                </div>
              </div>
            \`;
          }

          // Load Free Access Grants
          async function loadFreeAccess() {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              if (!token) {
                await checkAuth();
                return;
              }

              const response = await fetch('/api/v1/admin/free-access/grants', {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include'
              });
              
              if (response.status === 401) {
                await checkAuth();
                return;
              }
              
              const data = await response.json();
              
              if (data.success) {
                renderFreeAccessGrants(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load free access grants</p>';
              }
            } catch (error) {
              console.error('Error loading free access:', error);
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading free access</p>';
            }
          }

          function renderFreeAccessGrants(grants) {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            if (!grants || grants.length === 0) {
              content.innerHTML = \`
                <div class="empty-state">
                  <i class="fas fa-gift"></i>
                  <h3>No Free Access Grants Yet</h3>
                  <p>Use the button below to grant complimentary access to investors or reviewers.</p>
                  <button class="primary" onclick="showFreeAccessModal()" style="padding: 12px 30px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-gift"></i> Send Your First Free Access
                  </button>
                </div>
              \`;
              return;
            }

            content.innerHTML = \`
              <div style="background: white; padding: 25px; border-radius: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                  <h2>Free Access Grants</h2>
                  <button class="primary" onclick="showFreeAccessModal()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-gift"></i> Send New Free Access
                  </button>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Recipient</th>
                      <th>Ebook</th>
                      <th>Granted By</th>
                      <th>Status</th>
                      <th>Expires</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${grants.map(grant => \`
                      <tr>
                        <td>\${grant.code}</td>
                        <td>\${grant.user?.email?.split('@')[0] || 'N/A'}</td>
                        <td>\${grant.ebook?.title?.substring(0, 20) || 'N/A'}</td>
                        <td>\${grant.grantedBy?.email?.split('@')[0] || 'N/A'}</td>
                        <td><span class="status-badge \${grant.isActive ? 'active' : 'inactive'}">\${grant.isActive ? 'Active' : 'Inactive'}</span></td>
                        <td>\${new Date(grant.expiresAt).toLocaleDateString()}</td>
                        <td>
                          \${grant.isActive ? \`
                            <button class="action-btn delete" onclick="revokeAccess('\${grant._id}')">Revoke</button>
                          \` : ''}
                        </td>
                      </tr>
                    \`).join('')}
                  </tbody>
                </table>
              </div>
            \`;
          }

          // Revoke access function
          async function revokeAccess(accessCodeId) {
            if (!confirm('Are you sure you want to revoke this access code? The user will no longer be able to access the ebook.')) return;
            
            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              const response = await fetch(\`/api/v1/admin/free-access/revoke/\${accessCodeId}\`, {
                method: 'PUT',
                headers: {
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include'
              });
              
              if (response.status === 401) {
                await checkAuth();
                return;
              }
              
              const data = await response.json();
              
              if (data.success) {
                showAlert('Access code revoked successfully', 'success');
                await loadFreeAccess(); // Reload the list
              } else {
                showAlert(data.error || 'Failed to revoke access', 'error');
              }
            } catch (error) {
              console.error('Revoke error:', error);
              showAlert('Error revoking access', 'error');
            }
          }

          // Load Users (placeholder)
          async function loadUsers() {
            const content = document.getElementById('contentArea');
            if (content) {
              content.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><h3>Users Section</h3><p>User management coming soon...</p></div>';
            }
          }

          // Load Affiliates (placeholder)
          async function loadAffiliates() {
            const content = document.getElementById('contentArea');
            if (content) {
              content.innerHTML = '<div class="empty-state"><i class="fas fa-handshake"></i><h3>Affiliates Section</h3><p>Affiliate management coming soon...</p></div>';
            }
          }

          // Load Settings (placeholder)
          async function loadSettings() {
            const content = document.getElementById('contentArea');
            if (content) {
              content.innerHTML = '<div class="empty-state"><i class="fas fa-cog"></i><h3>Settings</h3><p>Settings coming soon...</p></div>';
            }
          }

          // Load Profile
          async function loadProfile() {
            const content = document.getElementById('contentArea');
            if (!content) return;
            
            content.innerHTML = \`
              <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; margin: 0 auto;">
                <h2 style="margin-bottom: 20px; color: #333;">My Profile</h2>
                <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
                  <p style="margin: 10px 0;"><strong>Name:</strong> \${adminData.name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> \${adminData.email}</p>
                  <p style="margin: 10px 0;"><strong>Role:</strong> \${adminData.role}</p>
                  <p style="margin: 10px 0;"><strong>ID:</strong> \${adminData.id}</p>
                </div>
              </div>
            \`;
          }

          // Free Access Modal Functions
          function showFreeAccessModal() {
            const modal = document.getElementById('freeAccessModal');
            if (modal) modal.classList.add('show');
          }

          function closeFreeAccessModal() {
            const modal = document.getElementById('freeAccessModal');
            if (modal) modal.classList.remove('show');
            
            const emailInput = document.getElementById('freeEmail');
            const nameInput = document.getElementById('freeName');
            const messageInput = document.getElementById('freeMessage');
            const ebookSelect = document.getElementById('freeEbook');
            
            if (emailInput) emailInput.value = '';
            if (nameInput) nameInput.value = '';
            if (messageInput) messageInput.value = '';
            if (ebookSelect) ebookSelect.value = '';
          }

          async function sendFreeAccess() {
            const emailInput = document.getElementById('freeEmail');
            const nameInput = document.getElementById('freeName');
            const messageInput = document.getElementById('freeMessage');
            const ebookSelect = document.getElementById('freeEbook');
            
            const email = emailInput ? emailInput.value : '';
            const name = nameInput ? nameInput.value : '';
            const message = messageInput ? messageInput.value : '';
            const ebookId = ebookSelect ? ebookSelect.value : '';

            if (!email || !ebookId) {
              showAlert('Email and Ebook are required', 'error');
              return;
            }

            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
              showAlert('Please enter a valid email address', 'error');
              return;
            }

            try {
              const token = getCookie('admin_token') || sessionStorage.getItem('admin_token');
              if (!token) {
                await checkAuth();
                return;
              }

              const response = await fetch('/api/v1/admin/free-access/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': \`Bearer \${token}\`
                },
                credentials: 'include',
                body: JSON.stringify({ email, name, ebookId, message })
              });

              if (response.status === 401) {
                await checkAuth();
                return;
              }

              const data = await response.json();
              
              if (data.success) {
                showAlert(\`Free access code sent to \${email}\`, 'success');
                closeFreeAccessModal();
                // Reload the current section
                if (currentSection === 'free-access') {
                  await loadFreeAccess();
                } else if (currentSection === 'access-codes') {
                  await loadAccessCodes();
                }
              } else {
                showAlert(data.error || 'Failed to send free access', 'error');
              }
            } catch (error) {
              console.error('Send free access error:', error);
              showAlert('Error sending free access', 'error');
            }
          }

          // Utility Functions
          function searchTransactions() {
            console.log('Search transactions');
          }

          function filterTransactions() {
            console.log('Filter transactions');
          }

          function viewTransaction(id) {
            alert('View transaction: ' + id);
          }

          function refundTransaction(id) {
            if (confirm('Are you sure you want to refund this transaction?')) {
              alert('Refund processing for: ' + id);
            }
          }

          function viewAccessCode(id) {
            alert('View access code: ' + id);
          }

          function revokeAccessCode(id) {
            revokeAccess(id);
          }

          // Toggle functions
          function toggleNotifications() {
            alert('Notifications coming soon');
          }

          function toggleProfileMenu() {
            const menu = document.getElementById('profileMenu');
            if (menu) menu.classList.toggle('show');
          }

          // Sign Out
          async function signOut(event) {
            if (event) event.preventDefault();
            
            try {
              const response = await fetch('/api/v1/admin/auth/signout', {
                method: 'POST',
                credentials: 'include'
              });
              
              if (response.ok) {
                // Clear cookies
                document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'admin_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                sessionStorage.removeItem('admin_token');
                window.location.href = '/admin/signin';
              }
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }

          // Close profile menu when clicking outside
          document.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-dropdown') && !e.target.closest('.profile-info')) {
              const menu = document.getElementById('profileMenu');
              if (menu) menu.classList.remove('show');
            }
          });
        </script>
      </body>
      </html>
    `;
    
    res.send(html);
  }
};

module.exports = adminDashboardController;