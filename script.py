# Create the complete HTML file
html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productivity Beast - Your Virtual Productivity Manager</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Landing/Auth Page -->
    <div id="auth-page" class="auth-container">
        <div class="auth-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
        </div>
        
        <div class="auth-content">
            <div class="auth-hero">
                <h1 class="hero-title">Meet Productivity Beast</h1>
                <p class="hero-subtitle">Your Virtual Productivity Manager</p>
                <p class="hero-description">AI accountability agent with 5:1 motivation approach to supercharge your productivity</p>
            </div>
            
            <div class="auth-card">
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="signin">Sign In</button>
                    <button class="auth-tab" data-tab="signup">Sign Up</button>
                </div>
                
                <div class="auth-form-container">
                    <!-- Sign In Form -->
                    <div id="signin-form" class="auth-form active">
                        <form class="form">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" placeholder="Enter your password" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-full">Sign In</button>
                        </form>
                        
                        <div class="divider">
                            <span>or continue with</span>
                        </div>
                        
                        <div class="social-login">
                            <button class="btn btn-social">
                                <i class="fab fa-google"></i>
                                Google
                            </button>
                            <button class="btn btn-social">
                                <i class="fab fa-apple"></i>
                                Apple
                            </button>
                            <button class="btn btn-social">
                                <i class="fab fa-facebook"></i>
                                Facebook
                            </button>
                        </div>
                    </div>
                    
                    <!-- Sign Up Form -->
                    <div id="signup-form" class="auth-form">
                        <form class="form">
                            <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" placeholder="Enter your name" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" placeholder="Create a password" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" placeholder="Confirm your password" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-full">Get Started</button>
                        </form>
                        
                        <div class="divider">
                            <span>or continue with</span>
                        </div>
                        
                        <div class="social-login">
                            <button class="btn btn-social">
                                <i class="fab fa-google"></i>
                                Google
                            </button>
                            <button class="btn btn-social">
                                <i class="fab fa-apple"></i>
                                Apple
                            </button>
                            <button class="btn btn-social">
                                <i class="fab fa-facebook"></i>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Dashboard -->
    <div id="dashboard" class="dashboard hidden">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="header-left">
                <h1 class="dashboard-title">Productivity Beast</h1>
            </div>
            <div class="header-right">
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="user-name">Team Leader</span>
                    <button class="btn btn-secondary btn-sm" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
            </div>
        </header>

        <div class="dashboard-content">
            <!-- Sidebar -->
            <nav class="dashboard-sidebar">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link active" data-section="dashboard">
                            <i class="fas fa-chart-pie"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-section="goals">
                            <i class="fas fa-bullseye"></i>
                            Goals & Tasks
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-section="team">
                            <i class="fas fa-users"></i>
                            Team Management
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-section="analytics">
                            <i class="fas fa-chart-bar"></i>
                            Analytics & Reports
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-section="settings">
                            <i class="fas fa-cog"></i>
                            Settings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-section="help">
                            <i class="fas fa-question-circle"></i>
                            Help & Support
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- Main Content -->
            <main class="dashboard-main">
                <!-- Dashboard Section -->
                <section id="dashboard-section" class="content-section active">
                    <div class="section-header">
                        <h2>Dashboard Overview</h2>
                        <p>Welcome to your productivity command center</p>
                    </div>
                    
                    <div class="dashboard-grid">
                        <div class="card quick-actions">
                            <h3>Quick Actions</h3>
                            <div class="action-buttons">
                                <button class="btn btn-primary">Add New Goal</button>
                                <button class="btn btn-secondary">Create Task</button>
                                <button class="btn btn-secondary">Schedule Meeting</button>
                                <button class="btn btn-secondary">View Reports</button>
                            </div>
                        </div>
                        
                        <div class="card progress-overview">
                            <h3>Progress Overview</h3>
                            <div class="progress-stats">
                                <div class="stat">
                                    <span class="stat-value">85%</span>
                                    <span class="stat-label">Goals Completed</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">12</span>
                                    <span class="stat-label">Active Tasks</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">7</span>
                                    <span class="stat-label">Team Members</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card recent-activity">
                            <h3>Recent Activity</h3>
                            <div class="activity-list">
                                <div class="activity-item">
                                    <i class="fas fa-check-circle text-success"></i>
                                    <span>Sarah completed "API Integration" task</span>
                                    <span class="activity-time">2h ago</span>
                                </div>
                                <div class="activity-item">
                                    <i class="fas fa-user-plus text-primary"></i>
                                    <span>New team member Michael joined</span>
                                    <span class="activity-time">4h ago</span>
                                </div>
                                <div class="activity-item">
                                    <i class="fas fa-goal text-warning"></i>
                                    <span>Q2 Goal deadline approaching</span>
                                    <span class="activity-time">1d ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Team Management Section -->
                <section id="team-section" class="content-section">
                    <div class="section-header">
                        <h2>Team Management</h2>
                        <p>Manage your team members and collaboration</p>
                    </div>

                    <!-- Team Management Controls -->
                    <div class="team-controls">
                        <div class="controls-row">
                            <div class="search-filter-group">
                                <div class="search-box">
                                    <i class="fas fa-search"></i>
                                    <input type="text" id="member-search" placeholder="Search team members..." onkeyup="app.searchMembers(this.value)">
                                </div>
                                
                                <div class="filter-controls">
                                    <select id="department-filter" onchange="app.filterByDepartment(this.value)">
                                        <option value="">All Departments</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="HR">HR</option>
                                        <option value="Design">Design</option>
                                    </select>
                                    
                                    <select id="experience-filter" onchange="app.filterByExperience(this.value)">
                                        <option value="">All Experience</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Mid">Mid</option>
                                        <option value="Senior">Senior</option>
                                        <option value="Lead">Lead</option>
                                    </select>
                                    
                                    <select id="status-filter" onchange="app.filterByStatus(this.value)">
                                        <option value="">All Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="action-controls">
                                <div class="view-toggle">
                                    <button class="btn btn-sm ${app.currentView === 'grid' ? 'active' : ''}" onclick="app.setView('grid')">
                                        <i class="fas fa-th"></i>
                                    </button>
                                    <button class="btn btn-sm ${app.currentView === 'list' ? 'active' : ''}" onclick="app.setView('list')">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                                
                                <button class="btn btn-primary" onclick="app.showAddMemberModal()">
                                    <i class="fas fa-user-plus"></i>
                                    Add Member
                                </button>
                                
                                <button class="btn btn-secondary" onclick="app.showInviteLinkModal()">
                                    <i class="fas fa-link"></i>
                                    Generate Invite
                                </button>
                                
                                <button class="btn btn-secondary" onclick="app.showMessageModal()">
                                    <i class="fas fa-envelope"></i>
                                    Message Team
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Team Members Display -->
                    <div id="team-members-container" class="team-members-grid">
                        <!-- Members will be populated by JavaScript -->
                    </div>
                </section>

                <!-- Other sections placeholders -->
                <section id="goals-section" class="content-section">
                    <div class="section-header">
                        <h2>Goals & Tasks</h2>
                        <p>Manage your objectives and daily tasks</p>
                    </div>
                    <div class="placeholder-content">
                        <i class="fas fa-bullseye"></i>
                        <h3>Goals & Tasks</h3>
                        <p>This section will contain goal setting and task management features.</p>
                    </div>
                </section>

                <section id="analytics-section" class="content-section">
                    <div class="section-header">
                        <h2>Analytics & Reports</h2>
                        <p>Track performance and insights</p>
                    </div>
                    <div class="placeholder-content">
                        <i class="fas fa-chart-bar"></i>
                        <h3>Analytics & Reports</h3>
                        <p>This section will contain detailed analytics and reporting features.</p>
                    </div>
                </section>

                <section id="settings-section" class="content-section">
                    <div class="section-header">
                        <h2>Settings</h2>
                        <p>Configure your preferences</p>
                    </div>
                    <div class="placeholder-content">
                        <i class="fas fa-cog"></i>
                        <h3>Settings</h3>
                        <p>This section will contain application settings and preferences.</p>
                    </div>
                </section>

                <section id="help-section" class="content-section">
                    <div class="section-header">
                        <h2>Help & Support</h2>
                        <p>Get assistance and documentation</p>
                    </div>
                    <div class="placeholder-content">
                        <i class="fas fa-question-circle"></i>
                        <h3>Help & Support</h3>
                        <p>This section will contain help documentation and support resources.</p>
                    </div>
                </section>
            </main>
        </div>
    </div>

    <!-- Modals -->
    <!-- Add Member Modal -->
    <div id="add-member-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Team Member</h3>
                <button class="modal-close" onclick="app.closeModal('add-member-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <form id="add-member-form" onsubmit="app.addMember(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Full Name *</label>
                            <input type="text" name="name" class="form-control" placeholder="Enter full name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" name="email" class="form-control" placeholder="Enter email address" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" name="phone" class="form-control" placeholder="Enter phone number">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department *</label>
                            <select name="department" class="form-control" required>
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="HR">HR</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Role *</label>
                            <input type="text" name="role" class="form-control" placeholder="Enter job role" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Experience Level *</label>
                            <select name="experienceLevel" class="form-control" required>
                                <option value="">Select Experience</option>
                                <option value="Junior">Junior</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                                <option value="Lead">Lead</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Skills</label>
                        <input type="text" name="skills" class="form-control" placeholder="Enter skills (comma-separated)">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Specialization</label>
                        <input type="text" name="specialization" class="form-control" placeholder="Enter specialization">
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal('add-member-modal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Member</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Invite Link Modal -->
    <div id="invite-link-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Generate Invite Link</h3>
                <button class="modal-close" onclick="app.closeModal('invite-link-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Select Role</label>
                    <select id="invite-role-select" class="form-control">
                        <option value="Member">Member</option>
                        <option value="Admin">Admin</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Expiration</label>
                    <select id="invite-expiry-select" class="form-control">
                        <option value="1">1 Day</option>
                        <option value="7">7 Days</option>
                        <option value="30">30 Days</option>
                        <option value="never">Never</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal('invite-link-modal')">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="app.generateInviteLink()">Generate Link</button>
                </div>
                
                <div id="generated-link-container" class="generated-link hidden">
                    <label class="form-label">Generated Invite Link</label>
                    <div class="link-display">
                        <input type="text" id="generated-link" class="form-control" readonly>
                        <button class="btn btn-sm btn-primary" onclick="app.copyInviteLink()">
                            <i class="fas fa-copy"></i>
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Message Modal -->
    <div id="message-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Send Message</h3>
                <button class="modal-close" onclick="app.closeModal('message-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Recipients</label>
                    <div class="recipient-options">
                        <label class="radio-option">
                            <input type="radio" name="recipients" value="all" checked onchange="app.updateRecipients(this.value)">
                            <span>All Team Members</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="recipients" value="selected" onchange="app.updateRecipients(this.value)">
                            <span>Selected Members</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="recipients" value="department" onchange="app.updateRecipients(this.value)">
                            <span>By Department</span>
                        </label>
                    </div>
                </div>
                
                <div id="department-selector" class="form-group hidden">
                    <label class="form-label">Select Department</label>
                    <select id="message-department-select" class="form-control">
                        <option value="">Choose Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Design">Design</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Platform</label>
                    <select id="message-platform-select" class="form-control">
                        <option value="gmail">Gmail</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="slack">Slack</option>
                        <option value="teams">Microsoft Teams</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message Template</label>
                    <select id="message-template-select" class="form-control" onchange="app.loadMessageTemplate(this.value)">
                        <option value="">Custom Message</option>
                        <option value="meeting">Meeting Reminder</option>
                        <option value="deadline">Deadline Notification</option>
                        <option value="welcome">Welcome Message</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Subject</label>
                    <input type="text" id="message-subject" class="form-control" placeholder="Enter message subject">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea id="message-body" class="form-control" rows="6" placeholder="Enter your message"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal('message-modal')">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="app.sendMessage()">Send Message</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Container -->
    <div id="toast-container" class="toast-container"></div>

    <script src="app.js"></script>
</body>
</html>'''

# Save the HTML file
with open('productivity_beast_index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("HTML file created: productivity_beast_index.html")