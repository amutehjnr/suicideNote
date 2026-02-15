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
          }

          .modal-content h3 {
            margin-bottom: 20px;
          }

          .modal-content input, .modal-content textarea, .modal-content select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
          }

          .modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
          }

          .modal-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }

          .modal-buttons button.primary {
            background: #667eea;
            color: white;
          }

          .modal-buttons button.secondary {
            background: #eee;
            color: #333;
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
            <h3>Send Free Access Code</h3>
            <input type="email" id="freeEmail" placeholder="Email Address" required>
            <input type="text" id="freeName" placeholder="Name (Optional)">
            <textarea id="freeMessage" placeholder="Personal Message (Optional)" rows="3"></textarea>
            <select id="freeEbook">
              <option value="">Select Ebook</option>
            </select>
            <div class="modal-buttons">
              <button class="secondary" onclick="closeFreeAccessModal()">Cancel</button>
              <button class="primary" onclick="sendFreeAccess()">Send</button>
            </div>
          </div>
        </div>

        <script>
          // Helper function to get cookie
          function getCookie(name) {
            const value = \`; \${document.cookie}\`;
            const parts = value.split(\`; \${name}=\`);
            if (parts.length === 2) return parts.pop().split(';').shift();
          }

          // Admin data from server
          const adminData = {
            name: '${req.admin.name}',
            role: '${req.admin.role}',
            initial: '${req.admin.name.charAt(0).toUpperCase()}',
            id: '${req.admin._id}'
          };

          let currentSection = 'dashboard';
          let currentPage = 1;

          // Load initial dashboard
          document.addEventListener('DOMContentLoaded', () => {
            // Set admin info in the UI
            document.getElementById('adminName').textContent = adminData.name;
            document.getElementById('adminInitial').textContent = adminData.initial;
            document.getElementById('adminFullName').textContent = adminData.name;
            document.getElementById('adminRole').textContent = adminData.role;
            
            loadDashboard();
            loadEbooksForSelect();
          });

          // Load ebooks for select dropdown
          async function loadEbooksForSelect() {
            try {
              const response = await fetch('/api/v1/ebooks', {
                headers: {
                  'Authorization': \`Bearer \${getCookie('admin_token')}\`
                }
              });
              const data = await response.json();
              
              if (data.success) {
                const select = document.getElementById('freeEbook');
                data.data.forEach(ebook => {
                  const option = document.createElement('option');
                  option.value = ebook._id;
                  option.textContent = ebook.title;
                  select.appendChild(option);
                });
              }
            } catch (error) {
              console.error('Error loading ebooks:', error);
            }
          }

          // Load different sections
          function loadSection(section, event) {
            if (event) event.preventDefault();
            currentSection = section;
            currentPage = 1;
            
            // Update active nav
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.remove('active');
            });
            if (event) event.currentTarget.classList.add('active');

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
            
            document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';
            document.getElementById('pageSubtitle').textContent = \`Welcome back, \${adminData.name}\`;

            // Load section content
            switch(section) {
              case 'dashboard':
                loadDashboard();
                break;
              case 'transactions':
                loadTransactions();
                break;
              case 'access-codes':
                loadAccessCodes();
                break;
              case 'users':
                loadUsers();
                break;
              case 'affiliates':
                loadAffiliates();
                break;
              case 'free-access':
                loadFreeAccess();
                break;
              case 'settings':
                loadSettings();
                break;
              case 'profile':
                loadProfile();
                break;
            }
          }

          // Load Dashboard
          async function loadDashboard() {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const response = await fetch('/api/v1/admin/dashboard/stats', {
                headers: {
                  'Authorization': \`Bearer \${getCookie('admin_token')}\`
                }
              });
              
              const data = await response.json();
              
              if (data.success) {
                renderDashboard(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load dashboard data</p>';
              }
            } catch (error) {
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading dashboard</p>';
            }
          }

          function renderDashboard(stats) {
            const content = document.getElementById('contentArea');
            
            // Update badges
            document.getElementById('transactionBadge').textContent = stats.overview.totalPurchases || 0;
            document.getElementById('accessCodeBadge').textContent = stats.overview.totalAccessCodes?.total || 0;
            
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
            const ctx = document.getElementById('revenueChart').getContext('2d');
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
            const ctx = document.getElementById('paymentChart').getContext('2d');
            
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
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const response = await fetch(\`/api/v1/admin/transactions?page=\${page}\`, {
                headers: {
                  'Authorization': \`Bearer \${getCookie('admin_token')}\`
                }
              });
              
              const data = await response.json();
              
              if (data.success) {
                renderTransactions(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load transactions</p>';
              }
            } catch (error) {
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading transactions</p>';
            }
          }

          function renderTransactions(data) {
            const content = document.getElementById('contentArea');
            
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
                    \${data.transactions.map(t => \`
                      <tr>
                        <td>\${t.transactionReference}</td>
                        <td>\${t.user?.email || 'N/A'}</td>
                        <td>\${t.ebook?.title || 'N/A'}</td>
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
                  <p>Showing \${data.transactions.length} of \${data.pagination.total} transactions</p>
                  <div>
                    \${Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map(p => \`
                      <button onclick="loadTransactions(\${p})" style="padding: 5px 10px; margin: 0 5px; border: 1px solid #ddd; border-radius: 5px; background: \${p === data.pagination.page ? '#667eea' : 'white'}; color: \${p === data.pagination.page ? 'white' : '#333'};">\${p}</button>
                    \`).join('')}
                  </div>
                </div>
              </div>
            \`;
          }

          // Load Access Codes
          async function loadAccessCodes(page = 1) {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const response = await fetch(\`/api/v1/admin/access-codes?page=\${page}\`, {
                headers: {
                  'Authorization': \`Bearer \${getCookie('admin_token')}\`
                }
              });
              
              const data = await response.json();
              
              if (data.success) {
                renderAccessCodes(data.data);
              } else {
                content.innerHTML = '<p style="text-align: center; padding: 50px;">Failed to load access codes</p>';
              }
            } catch (error) {
              content.innerHTML = '<p style="text-align: center; padding: 50px;">Error loading access codes</p>';
            }
          }

          function renderAccessCodes(data) {
            const content = document.getElementById('contentArea');
            
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
                    \${data.accessCodes.map(c => \`
                      <tr>
                        <td>\${c.code}</td>
                        <td>\${c.user?.email || 'N/A'}</td>
                        <td>\${c.ebook?.title || 'N/A'}</td>
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
                  <p>Showing \${data.accessCodes.length} of \${data.pagination.total} access codes</p>
                  <div>
                    \${Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map(p => \`
                      <button onclick="loadAccessCodes(\${p})" style="padding: 5px 10px; margin: 0 5px; border: 1px solid #ddd; border-radius: 5px; background: \${p === data.pagination.page ? '#667eea' : 'white'}; color: \${p === data.pagination.page ? 'white' : '#333'};">\${p}</button>
                    \`).join('')}
                  </div>
                </div>
              </div>
            \`;
          }

          // Load Users
          async function loadUsers() {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div><p style="text-align: center;">Users section coming soon...</p>';
          }

          // Load Affiliates
          async function loadAffiliates() {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div><p style="text-align: center;">Affiliates section coming soon...</p>';
          }

          // Load Free Access
          async function loadFreeAccess() {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div><p style="text-align: center;">Free Access section coming soon...</p>';
          }

          // Load Settings
          async function loadSettings() {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div><p style="text-align: center;">Settings section coming soon...</p>';
          }

          // Load Profile
          async function loadProfile() {
            const content = document.getElementById('contentArea');
            content.innerHTML = \`
              <div style="background: white; padding: 30px; border-radius: 15px;">
                <h2>My Profile</h2>
                <div style="margin-top: 20px;">
                  <p><strong>Name:</strong> \${adminData.name}</p>
                  <p><strong>Email:</strong> \${adminData.role === 'superadmin' ? '${req.admin.email}' : 'Hidden'}</p>
                  <p><strong>Role:</strong> \${adminData.role}</p>
                  <p><strong>ID:</strong> \${adminData.id}</p>
                </div>
              </div>
            \`;
          }

          // Free Access Modal Functions
          function showFreeAccessModal() {
            document.getElementById('freeAccessModal').classList.add('show');
          }

          function closeFreeAccessModal() {
            document.getElementById('freeAccessModal').classList.remove('show');
            document.getElementById('freeEmail').value = '';
            document.getElementById('freeName').value = '';
            document.getElementById('freeMessage').value = '';
          }

          async function sendFreeAccess() {
            const email = document.getElementById('freeEmail').value;
            const name = document.getElementById('freeName').value;
            const message = document.getElementById('freeMessage').value;
            const ebookId = document.getElementById('freeEbook').value;

            if (!email || !ebookId) {
              alert('Email and Ebook are required');
              return;
            }

            try {
              const response = await fetch('/api/v1/admin/free-access/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': \`Bearer \${getCookie('admin_token')}\`
                },
                body: JSON.stringify({ email, name, ebookId, message })
              });

              const data = await response.json();
              
              if (data.success) {
                alert('Free access code sent successfully!');
                closeFreeAccessModal();
                loadAccessCodes();
              } else {
                alert(data.error || 'Failed to send free access');
              }
            } catch (error) {
              alert('Error sending free access');
            }
          }

          // Utility Functions
          function searchTransactions() {
            // Implement search
          }

          function filterTransactions() {
            // Implement filter
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
            if (confirm('Are you sure you want to revoke this access code?')) {
              alert('Revoking access code: ' + id);
            }
          }

          // Toggle functions
          function toggleNotifications() {
            alert('Notifications coming soon');
          }

          function toggleProfileMenu() {
            const menu = document.getElementById('profileMenu');
            menu.classList.toggle('show');
          }

          // Sign Out
          async function signOut(event) {
            if (event) event.preventDefault();
            
            try {
              const response = await fetch('/api/v1/admin/auth/signout', {
                method: 'POST'
              });
              
              if (response.ok) {
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
    \`;
    
    res.send(html);
  }
};

module.exports = adminDashboardController;