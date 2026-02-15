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
                <a href="#" class="nav-link active" onclick="loadSection('dashboard')">
                  <i class="fas fa-home"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('transactions')">
                  <i class="fas fa-credit-card"></i>
                  <span>Transactions</span>
                  <span class="badge" id="transactionBadge">12</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('access-codes')">
                  <i class="fas fa-key"></i>
                  <span>Access Codes</span>
                  <span class="badge" id="accessCodeBadge">8</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('users')">
                  <i class="fas fa-users"></i>
                  <span>Users</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('affiliates')">
                  <i class="fas fa-handshake"></i>
                  <span>Affiliates</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('free-access')">
                  <i class="fas fa-gift"></i>
                  <span>Free Access</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="loadSection('settings')">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onclick="signOut()">
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
                <p id="pageSubtitle">Welcome back, ${req.admin.name}</p>
              </div>
              
              <div class="admin-profile">
                <div class="notifications" onclick="toggleNotifications()">
                  <i class="far fa-bell"></i>
                  <span class="notification-badge">3</span>
                </div>
                
                <div class="profile-dropdown" onclick="toggleProfileMenu()">
                  <div class="avatar">
                    ${req.admin.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong>${req.admin.name}</strong>
                    <p style="font-size: 12px; color: #666;">${req.admin.role}</p>
                  </div>
                  <i class="fas fa-chevron-down"></i>
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

        <script>
          let currentSection = 'dashboard';

          // Load initial dashboard
          document.addEventListener('DOMContentLoaded', () => {
            loadDashboard();
          });

          // Load different sections
          function loadSection(section) {
            currentSection = section;
            
            // Update active nav
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');

            // Update page title
            const titles = {
              dashboard: 'Dashboard',
              transactions: 'Transactions',
              'access-codes': 'Access Codes',
              users: 'Users',
              affiliates: 'Affiliates',
              'free-access': 'Free Access',
              settings: 'Settings'
            };
            
            document.getElementById('pageTitle').textContent = titles[section];
            document.getElementById('pageSubtitle').textContent = \`Welcome back, ${req.admin.name}\`;

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
            }
          }

          // Load Dashboard
          async function loadDashboard() {
            const content = document.getElementById('contentArea');
            content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

            try {
              const response = await fetch('/api/v1/admin/dashboard/stats', {
                headers: {
                  'Authorization': \`Bearer ${req.cookies.admin_token}\`
                }
              });
              
              const data = await response.json();
              
              if (data.success) {
                renderDashboard(data.data);
              } else {
                content.innerHTML = '<p>Failed to load dashboard data</p>';
              }
            } catch (error) {
              content.innerHTML = '<p>Error loading dashboard</p>';
            }
          }

          function renderDashboard(stats) {
            const content = document.getElementById('contentArea');
            
            content.innerHTML = \`
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="stat-value">\${stats.overview.totalUsers}</div>
                  <div class="stat-label">Total Users</div>
                  <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> 12% this month
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <div class="stat-value">\${stats.overview.totalPurchases}</div>
                  <div class="stat-label">Total Sales</div>
                  <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> 8% this month
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-naira-sign"></i>
                  </div>
                  <div class="stat-value">₦\${stats.overview.totalRevenue.toLocaleString()}</div>
                  <div class="stat-label">Total Revenue</div>
                  <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> 15% this month
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-key"></i>
                  </div>
                  <div class="stat-value">\${stats.overview.totalAccessCodes.total}</div>
                  <div class="stat-label">Access Codes</div>
                  <div class="stat-change">
                    \${stats.overview.totalAccessCodes.free} free, \${stats.overview.totalAccessCodes.paid} paid
                  </div>
                </div>
              </div>

              <div class="charts-row">
                <div class="chart-card">
                  <div class="chart-header">
                    <h3>Revenue Overview</h3>
                    <select onchange="updateRevenueChart(this.value)">
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
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
                    <a href="#" class="view-all" onclick="loadSection('transactions')">View All</a>
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
                      \${stats.recentTransactions.map(t => \`
                        <tr>
                          <td>\${t.transactionReference?.substring(0, 8)}...</td>
                          <td>\${t.user?.email || 'N/A'}</td>
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
                    <a href="#" class="view-all" onclick="loadSection('access-codes')">View All</a>
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
                      \${stats.recentAccessCodes.map(c => \`
                        <tr>
                          <td>\${c.code}</td>
                          <td>\${c.user?.email || 'N/A'}</td>
                          <td>\${c.ebook?.title || 'N/A'}</td>
                          <td><span class="status-badge \${c.isActive ? 'completed' : 'failed'}">\${c.isActive ? 'Active' : 'Inactive'}</span></td>
                          <td>\${c.isFreeAccess ? 'Free' : 'Paid'}</td>
                        </tr>
                      \`).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            \`;

            // Initialize charts
            initRevenueChart(stats);
            initPaymentChart(stats);
          }

          function initRevenueChart(stats) {
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

          function initPaymentChart(stats) {
            const ctx = document.getElementById('paymentChart').getContext('2d');
            const methods = stats.paymentMethods || [];
            
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
                  'Authorization': \`Bearer ${req.cookies.admin_token}\`
                }
              });
              
              const data = await response.json();
              
              if (data.success) {
                renderTransactions(data.data);
              }
            } catch (error) {
              content.innerHTML = '<p>Error loading transactions</p>';
            }
          }

          function renderTransactions(data) {
            const content = document.getElementById('contentArea');
            
            content.innerHTML = \`
              <div style="background: white; padding: 25px; border-radius: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                  <h2>All Transactions</h2>
                  <div>
                    <input type="text" placeholder="Search..." style="padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-right: 10px;">
                    <select style="padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                      <option>All Status</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Failed</option>
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
                  <tbody>
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

          // Sign Out
          async function signOut() {
            try {
              await fetch('/api/v1/admin/auth/signout', {
                method: 'POST'
              });
              window.location.href = '/admin/signin';
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }

          // Toggle profile menu
          function toggleProfileMenu() {
            const menu = document.querySelector('.profile-info');
            menu.classList.toggle('show');
          }

          // Close profile menu when clicking outside
          document.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-dropdown')) {
              const menu = document.querySelector('.profile-info');
              if (menu) menu.classList.remove('show');
            }
          });
        </script>
      </body>
      </html>
    `;
    
    res.send(html);
  },

  // Additional methods for other sections
  async getTransactionsPage(req, res) {
    // Similar HTML for transactions page
  },

  async getAccessCodesPage(req, res) {
    // Similar HTML for access codes page
  },

  async getUsersPage(req, res) {
    // Similar HTML for users page
  },

  async getAffiliatesPage(req, res) {
    // Similar HTML for affiliates page
  },

  async getFreeAccessPage(req, res) {
    // Similar HTML for free access page
  },

  async getSettingsPage(req, res) {
    // Similar HTML for settings page
  }
};

module.exports = adminDashboardController;