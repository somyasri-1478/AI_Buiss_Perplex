// Initialize the application
class ProductivityBeastApp {
    constructor() {
        // App state
        this.currentUser = null;
        this.currentView = 'grid';
        this.selectedMembers = new Set();
        this.searchTerm = '';
        this.filters = {
            department: '',
            experience: '',
            status: ''
        };
        
        // Project management state
        this.projects = [];
        this.projectSearchTerm = '';
        this.projectFilters = {
            status: ''
        };
        
        // Analytics state
        this.currentAnalyticsTab = 'overview';
        this.charts = {};
        
        // Bulk import data
        this.rawImportData = null;
        this.processedImportData = null;
        
        // Sample data for team members
        this.teamMembers = [
            {
                "id": 1,
                "name": "Sarah Johnson",
                "email": "sarah.johnson@company.com",
                "phone": "+1-555-0101",
                "department": "Engineering",
                "role": "Senior Developer",
                "experienceLevel": "Senior",
                "skills": ["React", "Node.js", "Python", "AWS"],
                "specialization": "Full-Stack Development",
                "currentWorkload": "High",
                "status": "Active",
                "joinDate": "2024-01-15",
                "lastActivity": "2025-06-09",
                "productivity": 92,
                "tasksCompleted": 45,
                "projectsCompleted": 8
            },
            {
                "id": 2,
                "name": "Michael Chen",
                "email": "michael.chen@company.com",
                "phone": "+1-555-0102",
                "department": "Marketing",
                "role": "Marketing Manager",
                "experienceLevel": "Mid",
                "skills": ["Digital Marketing", "SEO", "Analytics", "Content Strategy"],
                "specialization": "Digital Marketing",
                "currentWorkload": "Medium",
                "status": "Active",
                "joinDate": "2024-03-20",
                "lastActivity": "2025-06-08",
                "productivity": 87,
                "tasksCompleted": 38,
                "projectsCompleted": 6
            },
            {
                "id": 3,
                "name": "Emily Rodriguez",
                "email": "emily.rodriguez@company.com",
                "phone": "+1-555-0103",
                "department": "Design",
                "role": "UX Designer",
                "experienceLevel": "Senior",
                "skills": ["Figma", "User Research", "Prototyping", "Design Systems"],
                "specialization": "User Experience Design",
                "currentWorkload": "Medium",
                "status": "Active",
                "joinDate": "2023-11-10",
                "lastActivity": "2025-06-09",
                "productivity": 89,
                "tasksCompleted": 42,
                "projectsCompleted": 7
            },
            {
                "id": 4,
                "name": "David Kim",
                "email": "david.kim@company.com",
                "phone": "+1-555-0104",
                "department": "Engineering",
                "role": "DevOps Engineer",
                "experienceLevel": "Senior",
                "skills": ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
                "specialization": "Infrastructure & DevOps",
                "currentWorkload": "High",
                "status": "Active",
                "joinDate": "2024-02-01",
                "lastActivity": "2025-06-09",
                "productivity": 94,
                "tasksCompleted": 51,
                "projectsCompleted": 9
            },
            {
                "id": 5,
                "name": "Lisa Thompson",
                "email": "lisa.thompson@company.com",
                "phone": "+1-555-0105",
                "department": "Sales",
                "role": "Sales Representative",
                "experienceLevel": "Mid",
                "skills": ["CRM", "Lead Generation", "Negotiation", "Presentation"],
                "specialization": "B2B Sales",
                "currentWorkload": "Medium",
                "status": "Active",
                "joinDate": "2024-04-15",
                "lastActivity": "2025-06-08",
                "productivity": 85,
                "tasksCompleted": 36,
                "projectsCompleted": 5
            }
        ];

        // Sample projects data with daily progress
        this.projects = [
            {
                "id": 1,
                "name": "Website Redesign",
                "description": "Complete overhaul of company website with modern design and improved UX",
                "dueDate": "2025-07-15",
                "progress": 100,
                "status": "complete",
                "createdDate": "2025-05-01",
                "assignedTo": ["Sarah Johnson", "Emily Rodriguez"],
                "dailyProgress": [
                    { date: "2025-06-01", progress: 85 },
                    { date: "2025-06-02", progress: 88 },
                    { date: "2025-06-03", progress: 92 },
                    { date: "2025-06-04", progress: 95 },
                    { date: "2025-06-05", progress: 98 },
                    { date: "2025-06-06", progress: 100 }
                ]
            },
            {
                "id": 2,
                "name": "Mobile App Development",
                "description": "Development of iOS and Android mobile application for customer portal",
                "dueDate": "2025-08-30",
                "progress": 65,
                "status": "in-progress",
                "createdDate": "2025-04-15",
                "assignedTo": ["Sarah Johnson", "David Kim"],
                "dailyProgress": [
                    { date: "2025-06-01", progress: 50 },
                    { date: "2025-06-02", progress: 52 },
                    { date: "2025-06-03", progress: 55 },
                    { date: "2025-06-04", progress: 58 },
                    { date: "2025-06-05", progress: 62 },
                    { date: "2025-06-06", progress: 65 }
                ]
            },
            {
                "id": 3,
                "name": "Database Migration",
                "description": "Migration from legacy database system to cloud-based solution",
                "dueDate": "2025-09-15",
                "progress": 30,
                "status": "in-progress",
                "createdDate": "2025-06-01",
                "assignedTo": ["David Kim"],
                "dailyProgress": [
                    { date: "2025-06-01", progress: 10 },
                    { date: "2025-06-02", progress: 15 },
                    { date: "2025-06-03", progress: 20 },
                    { date: "2025-06-04", progress: 25 },
                    { date: "2025-06-05", progress: 28 },
                    { date: "2025-06-06", progress: 30 }
                ]
            },
            {
                "id": 4,
                "name": "AI Integration Research",
                "description": "Research and planning for AI features integration into existing products",
                "dueDate": "2025-10-01",
                "progress": 0,
                "status": "not-started",
                "createdDate": "2025-06-10",
                "assignedTo": [],
                "dailyProgress": []
            }
        ];

        this.departments = ["Engineering", "Marketing", "Sales", "HR", "Design"];
        this.experienceLevels = ["Junior", "Mid", "Senior", "Lead"];
        this.messageTemplates = [
            {
                "name": "Meeting Reminder",
                "subject": "Upcoming Team Meeting",
                "body": "Hi everyone,\n\nJust a friendly reminder about our team meeting scheduled for [DATE] at [TIME]. Please review the agenda beforehand.\n\nBest regards,\nTeam Lead"
            },
            {
                "name": "Deadline Notification",
                "subject": "Project Deadline Approaching",
                "body": "Hello team,\n\nThis is a reminder that the deadline for [PROJECT_NAME] is approaching on [DATE]. Please ensure all deliverables are submitted on time.\n\nThanks,\nManagement"
            },
            {
                "name": "Welcome Message",
                "subject": "Welcome to the Team!",
                "body": "Welcome to Productivity Beast!\n\nWe're excited to have you join our team. Please don't hesitate to reach out if you have any questions.\n\nBest regards,\nTeam Lead"
            }
        ];
        // Settings defaults
        this.settings = {
            theme: 'light',
            notifications: {
                tasks: true,
                projects: true,
                reports: false
            },
            twoFactorAuth: false
        };
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupSettingsListeners();
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupAnimations();
        this.checkAuthState();
        
        // Delay populating dropdowns to ensure DOM is ready
        setTimeout(() => {
            this.populateDropdowns();
        }, 100);
    }
        setupSettingsListeners() {
        // Theme toggle
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const theme = btn.dataset.theme;
                this.setTheme(theme);
            });
        });

        // 2FA toggle
        document.getElementById('2fa-toggle').addEventListener('change', (e) => {
            this.settings.twoFactorAuth = e.target.checked;
            this.saveSettings();
        });

        // Support form
        document.getElementById('support-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSupportRequest(e.target);
        });
    }

    setTheme(theme) {
        this.settings.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.saveSettings();
    }

    handleSupportRequest(form) {
        const formData = new FormData(form);
        const request = {
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Simulate API call
        setTimeout(() => {
            this.showToast('Support request submitted successfully!', 'success');
            form.reset();
        }, 1000);
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('pbSettings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
            document.documentElement.setAttribute('data-theme', this.settings.theme);
            document.getElementById('2fa-toggle').checked = this.settings.twoFactorAuth;
        }
    }

    saveSettings() {
        localStorage.setItem('pbSettings', JSON.stringify(this.settings));
    }

    
    // Enhanced method for animations including analytics
    setupAnimations() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add tab indicator animation for auth tabs
        const setTabIndicatorPosition = (tab) => {
            const indicator = document.querySelector('.tab-indicator');
            if (!indicator || !tab) return;
            
            const tabRect = tab.getBoundingClientRect();
            const tabsRect = tab.parentElement.getBoundingClientRect();
            
            indicator.style.transform = `translateX(${tabRect.left - tabsRect.left}px)`;
            indicator.style.width = `${tabRect.width}px`;
        };
        
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabs = document.querySelectorAll('.auth-tab');
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                setTabIndicatorPosition(this);
                
                const tabName = this.dataset.tab;
                
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                setTimeout(() => {
                    document.getElementById(`${tabName}-form`).classList.add('active');
                }, 50);
            });
        });
        
        // Initialize the tab indicator position
        setTimeout(() => {
            const activeTab = document.querySelector('.auth-tab.active');
            setTabIndicatorPosition(activeTab);
        }, 100);
        
        // Analytics tab indicator animation
        const setAnalyticsTabIndicatorPosition = (tab) => {
            const indicator = document.querySelector('.analytics-tab-indicator');
            if (!indicator || !tab) return;
            
            const tabRect = tab.getBoundingClientRect();
            const tabsRect = tab.parentElement.getBoundingClientRect();
            
            indicator.style.transform = `translateX(${tabRect.left - tabsRect.left}px)`;
            indicator.style.width = `${tabRect.width}px`;
        };
        
        document.querySelectorAll('.analytics-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabs = document.querySelectorAll('.analytics-tab');
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                setAnalyticsTabIndicatorPosition(this);
                
                const tabName = this.dataset.tab;
                this.currentAnalyticsTab = tabName;
                
                document.querySelectorAll('.analytics-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                setTimeout(() => {
                    document.getElementById(`${tabName}-analytics`).classList.add('active');
                    this.initializeAnalyticsCharts(tabName);
                }, 50);
            });
        });
        
        // Smooth section transitions
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                this.classList.add('active');
                
                const section = this.getAttribute('data-section');
                
                // Update the header title
                const sectionTitle = document.getElementById('section-title');
                if (sectionTitle) {
                    sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
                }
                
                // Hide all sections
                document.querySelectorAll('.content-section').forEach(contentSection => {
                    contentSection.classList.remove('active');
                });
                
                // Show selected section
                const targetSection = document.getElementById(`${section}-section`);
                setTimeout(() => {
                    if (targetSection) {
                        targetSection.classList.add('active');
                    }
                }, 50);
                
                // Render content based on section
                if (section === 'team') {
                    setTimeout(() => {
                        this.renderMembers();
                    }, 100);
                } else if (section === 'goals') {
                    setTimeout(() => {
                        this.renderProjects();
                    }, 100);
                } else if (section === 'analytics') {
                    setTimeout(() => {
                        this.initializeAnalytics();
                    }, 100);
                }
            });
        });
        
        // Animate project progress bars
        const animateProgressBars = () => {
            document.querySelectorAll('.progress-fill').forEach(bar => {
                const width = bar.getAttribute('data-progress') || '0%';
                bar.style.width = '0%';
                
                // Use IntersectionObserver to animate when visible
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 100);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                observer.observe(bar);
            });
        };
        
        // Call animation on page load and whenever projects are rendered
        document.addEventListener('DOMContentLoaded', animateProgressBars);
        this.animateProgressBars = animateProgressBars;
    }

    // Analytics Methods
    initializeAnalytics() {
        // Set up the first analytics tab indicator position
        setTimeout(() => {
            const activeAnalyticsTab = document.querySelector('.analytics-tab.active');
            if (activeAnalyticsTab) {
                const indicator = document.querySelector('.analytics-tab-indicator');
                if (indicator) {
                    const tabRect = activeAnalyticsTab.getBoundingClientRect();
                    const tabsRect = activeAnalyticsTab.parentElement.getBoundingClientRect();
                    indicator.style.transform = `translateX(${tabRect.left - tabsRect.left}px)`;
                    indicator.style.width = `${tabRect.width}px`;
                }
            }
        }, 100);
        
        // Initialize charts for the current active tab
        this.initializeAnalyticsCharts(this.currentAnalyticsTab);
        
        // Populate employee filter dropdown
        const employeeFilter = document.getElementById('individual-employee-filter');
        if (employeeFilter && employeeFilter.children.length === 1) {
            this.teamMembers.forEach(member => {
                const option = document.createElement('option');
                option.value = member.id;
                option.textContent = member.name;
                employeeFilter.appendChild(option);
            });
        }
    }

    initializeAnalyticsCharts(tabName) {
        // Destroy existing charts to prevent memory leaks
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};

        // Wait for the tab content to be visible
        setTimeout(() => {
            switch (tabName) {
                case 'overview':
                    this.createOverviewCharts();
                    break;
                case 'projects':
                    this.createProjectsCharts();
                    break;
                case 'employees':
                    this.createEmployeeCharts();
                    break;
                case 'performance':
                    this.createPerformanceCharts();
                    break;
            }
        }, 100);
    }

    createOverviewCharts() {
        // Productivity Overview Chart
        const productivityCtx = document.getElementById('productivity-overview-chart');
        if (productivityCtx) {
            this.charts.productivityOverview = new Chart(productivityCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Productivity Score',
                        data: [85, 89, 92, 87, 94, 88, 91],
                        borderColor: '#8B45FF',
                        backgroundColor: 'rgba(139, 69, 255, 0.1)',
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
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Team Performance Distribution
        const teamPerformanceCtx = document.getElementById('team-performance-chart');
        if (teamPerformanceCtx) {
            this.charts.teamPerformance = new Chart(teamPerformanceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['High Performers', 'Average Performers', 'Needs Improvement'],
                    datasets: [{
                        data: [60, 30, 10],
                        backgroundColor: ['#48BB78', '#63B3FF', '#F56565']
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

        // Daily Activity Trends
        const dailyTrendsCtx = document.getElementById('daily-trends-chart');
        if (dailyTrendsCtx) {
            this.charts.dailyTrends = new Chart(dailyTrendsCtx, {
                type: 'bar',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Tasks Completed',
                            data: [45, 52, 48, 61],
                            backgroundColor: 'rgba(139, 69, 255, 0.8)'
                        },
                        {
                            label: 'Projects Started',
                            data: [8, 12, 10, 15],
                            backgroundColor: 'rgba(99, 179, 255, 0.8)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    createProjectsCharts() {
        // Project Completion Rate
        const projectCompletionCtx = document.getElementById('project-completion-chart');
        if (projectCompletionCtx) {
            this.charts.projectCompletion = new Chart(projectCompletionCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Completion Rate %',
                        data: [65, 72, 78, 85, 89, 92],
                        borderColor: '#48BB78',
                        backgroundColor: 'rgba(72, 187, 120, 0.1)',
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
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Project Status Overview
        const projectStatusCtx = document.getElementById('project-status-chart');
        if (projectStatusCtx) {
            const statusCounts = this.projects.reduce((acc, project) => {
                acc[project.status] = (acc[project.status] || 0) + 1;
                return acc;
            }, {});

            this.charts.projectStatus = new Chart(projectStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Complete', 'In Progress', 'Not Started'],
                    datasets: [{
                        data: [
                            statusCounts.complete || 0,
                            statusCounts['in-progress'] || 0,
                            statusCounts['not-started'] || 0
                        ],
                        backgroundColor: ['#48BB78', '#ED8936', '#F56565']
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

        // Project Timeline
        const timelineCtx = document.getElementById('project-timeline-chart');
        if (timelineCtx) {
            this.charts.projectTimeline = new Chart(timelineCtx, {
                type: 'bar',
                data: {
                    labels: this.projects.map(p => p.name),
                    datasets: [{
                        label: 'Progress %',
                        data: this.projects.map(p => p.progress),
                        backgroundColor: this.projects.map(p => {
                            if (p.status === 'complete') return '#48BB78';
                            if (p.status === 'in-progress') return '#ED8936';
                            return '#F56565';
                        })
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Daily Project Progress
        const projectProgressCtx = document.getElementById('project-progress-chart');
        if (projectProgressCtx) {
            const datasets = this.projects.filter(p => p.dailyProgress.length > 0).map((project, index) => ({
                label: project.name,
                data: project.dailyProgress.map(dp => dp.progress),
                borderColor: ['#8B45FF', '#63B3FF', '#48BB78', '#ED8936'][index % 4],
                backgroundColor: ['rgba(139, 69, 255, 0.1)', 'rgba(99, 179, 255, 0.1)', 'rgba(72, 187, 120, 0.1)', 'rgba(237, 137, 54, 0.1)'][index % 4],
                tension: 0.4,
                fill: false
            }));

            this.charts.projectProgress = new Chart(projectProgressCtx, {
                type: 'line',
                data: {
                    labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6'],
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    createEmployeeCharts() {
        // Employee Productivity Score
        const employeeProductivityCtx = document.getElementById('employee-productivity-chart');
        if (employeeProductivityCtx) {
            this.charts.employeeProductivity = new Chart(employeeProductivityCtx, {
                type: 'bar',
                data: {
                    labels: this.teamMembers.map(m => m.name.split(' ')[0]),
                    datasets: [{
                        label: 'Productivity Score',
                        data: this.teamMembers.map(m => m.productivity),
                        backgroundColor: 'rgba(139, 69, 255, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Department Performance
        const departmentPerformanceCtx = document.getElementById('department-performance-chart');
        if (departmentPerformanceCtx) {
            const deptPerformance = this.departments.map(dept => {
                const deptMembers = this.teamMembers.filter(m => m.department === dept);
                const avgProductivity = deptMembers.length > 0 
                    ? deptMembers.reduce((sum, m) => sum + m.productivity, 0) / deptMembers.length 
                    : 0;
                return Math.round(avgProductivity);
            });

            this.charts.departmentPerformance = new Chart(departmentPerformanceCtx, {
                type: 'radar',
                data: {
                    labels: this.departments,
                    datasets: [{
                        label: 'Department Performance',
                        data: deptPerformance,
                        borderColor: '#63B3FF',
                        backgroundColor: 'rgba(99, 179, 255, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Individual Performance
        const individualPerformanceCtx = document.getElementById('individual-performance-chart');
        if (individualPerformanceCtx) {
            this.charts.individualPerformance = new Chart(individualPerformanceCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: this.teamMembers.slice(0, 3).map((member, index) => ({
                        label: member.name,
                        data: [
                            member.productivity - 5 + Math.random() * 10,
                            member.productivity - 3 + Math.random() * 6,
                            member.productivity - 2 + Math.random() * 4,
                            member.productivity
                        ].map(v => Math.max(0, Math.min(100, Math.round(v)))),
                        borderColor: ['#8B45FF', '#63B3FF', '#48BB78'][index],
                        tension: 0.4
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Weekly Activity
        const weeklyActivityCtx = document.getElementById('weekly-activity-chart');
        if (weeklyActivityCtx) {
            this.charts.weeklyActivity = new Chart(weeklyActivityCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    datasets: [
                        {
                            label: 'Tasks Completed',
                            data: [12, 15, 18, 14, 16],
                            backgroundColor: 'rgba(139, 69, 255, 0.8)'
                        },
                        {
                            label: 'Hours Worked',
                            data: [8, 8.5, 9, 7.5, 8],
                            backgroundColor: 'rgba(99, 179, 255, 0.8)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    createPerformanceCharts() {
        // Performance Metrics
        const performanceMetricsCtx = document.getElementById('performance-metrics-chart');
        if (performanceMetricsCtx) {
            this.charts.performanceMetrics = new Chart(performanceMetricsCtx, {
                type: 'radar',
                data: {
                    labels: ['Quality', 'Speed', 'Collaboration', 'Innovation', 'Leadership'],
                    datasets: [{
                        label: 'Team Average',
                        data: [88, 92, 85, 78, 82],
                        borderColor: '#8B45FF',
                        backgroundColor: 'rgba(139, 69, 255, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Goal Achievement
        const goalAchievementCtx = document.getElementById('goal-achievement-chart');
        if (goalAchievementCtx) {
            this.charts.goalAchievement = new Chart(goalAchievementCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Achieved', 'In Progress', 'Pending'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: ['#48BB78', '#ED8936', '#F56565']
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

        // Performance Trends
        const performanceTrendsCtx = document.getElementById('performance-trends-chart');
        if (performanceTrendsCtx) {
            this.charts.performanceTrends = new Chart(performanceTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Team Performance',
                            data: [78, 82, 85, 88, 91, 94],
                            borderColor: '#8B45FF',
                            backgroundColor: 'rgba(139, 69, 255, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Goal Achievement',
                            data: [72, 75, 80, 85, 88, 92],
                            borderColor: '#63B3FF',
                            backgroundColor: 'rgba(99, 179, 255, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    // Continue with remaining methods
    loadFromStorage() {
        const stored = localStorage.getItem('productivityBeastData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.teamMembers = data.teamMembers || this.teamMembers;
                this.projects = data.projects || this.projects;
                this.currentUser = data.currentUser || null;
            } catch (e) {
                console.warn('Failed to load data from storage:', e);
            }
        }
    }

    saveToStorage() {
        try {
            const data = {
                teamMembers: this.teamMembers,
                projects: this.projects,
                currentUser: this.currentUser
            };
            localStorage.setItem('productivityBeastData', JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save data to storage:', e);
        }
    }

    checkAuthState() {
        if (this.currentUser) {
            this.showDashboard();
        } else {
            this.showAuth();
        }
    }

    showAuth() {
        document.getElementById('auth-page').classList.remove('hidden');
        document.getElementById('dashboard-page').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard-page').classList.remove('hidden');
        
        // Update user name display
        const userName = document.querySelector('.user-name');
        if (userName && this.currentUser) {
            userName.textContent = this.currentUser.name;
        }
        
        // Initialize sections based on active section
        setTimeout(() => {
            if (document.getElementById('team-section').classList.contains('active')) {
                this.renderMembers();
            }
            if (document.getElementById('goals-section').classList.contains('active')) {
                this.renderProjects();
            }
            if (document.getElementById('analytics-section').classList.contains('active')) {
                this.initializeAnalytics();
            }
        }, 100);
    }

    setupEventListeners() {
        // Auth forms
        document.querySelectorAll('.auth-form form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuth(e.target);
            });
        });

        // Social buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialAuth();
            });
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Team management controls
        this.setupTeamManagementListeners();

        // Project management controls
        this.setupProjectManagementListeners();

        // Analytics controls
        this.setupAnalyticsListeners();

        // Bulk import listeners
        this.setupBulkImportListeners();

        // Modal controls
        this.setupModalListeners();
    }

    setupAnalyticsListeners() {
        // Period change listeners for different analytics sections
        document.querySelectorAll('.chart-period select').forEach(select => {
            select.addEventListener('change', (e) => {
                const chartId = e.target.id;
                // Update chart data based on period selection
                this.updateChartPeriod(chartId, e.target.value);
            });
        });

        // Individual employee filter
        const employeeFilter = document.getElementById('individual-employee-filter');
        if (employeeFilter) {
            employeeFilter.addEventListener('change', (e) => {
                this.updateIndividualPerformanceChart(e.target.value);
            });
        }
    }

    updateChartPeriod(chartId, period) {
        // This method would update chart data based on the selected period
        console.log(`Updating ${chartId} for period: ${period}`);
    }

    updateIndividualPerformanceChart(employeeId) {
        if (employeeId === 'all') {
            return;
        }

        const employee = this.teamMembers.find(m => m.id == employeeId);
        if (!employee || !this.charts.individualPerformance) return;

        // Update chart to show only selected employee
        const weeklyData = [
            employee.productivity - 5 + Math.random() * 10,
            employee.productivity - 3 + Math.random() * 6,
            employee.productivity - 2 + Math.random() * 4,
            employee.productivity
        ].map(v => Math.max(0, Math.min(100, Math.round(v))));

        this.charts.individualPerformance.data.datasets = [{
            label: employee.name,
            data: weeklyData,
            borderColor: '#8B45FF',
            tension: 0.4
        }];

        this.charts.individualPerformance.update();
    }

    setupTeamManagementListeners() {
        // Search
        const searchInput = document.getElementById('member-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchTerm = e.target.value;
                this.renderMembers();
            }, 300));
        }

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });

        // Filters
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const filterType = e.target.id.replace('-filter', '');
                this.filters[filterType] = e.target.value;
                this.renderMembers();
            });
        });

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearFilters();
            });
        }

        // Action buttons
        const generateInviteBtn = document.getElementById('generate-invite-btn');
        if (generateInviteBtn) {
            generateInviteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('invite-modal');
            });
        }

        const addMemberBtn = document.getElementById('add-member-btn');
        if (addMemberBtn) {
            addMemberBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('add-member-modal');
            });
        }

        const bulkImportBtn = document.getElementById('bulk-import-btn');
        if (bulkImportBtn) {
            bulkImportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('bulk-import-modal');
            });
        }

        // Message templates
        const templateSelect = document.getElementById('message-template');
        if (templateSelect) {
            templateSelect.addEventListener('change', (e) => {
                this.loadMessageTemplate(e.target.value);
            });
        }

        // Integration buttons
        document.querySelectorAll('.integration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = e.target.textContent.trim().split(' ')[2];
                this.sendMessage(platform);
            });
        });
    }

    setupProjectManagementListeners() {
        // Project search
        const projectSearchInput = document.getElementById('project-search');
        if (projectSearchInput) {
            projectSearchInput.addEventListener('input', this.debounce((e) => {
                this.projectSearchTerm = e.target.value;
                this.renderProjects();
            }, 300));
        }

        // Project status filter
        const projectStatusFilter = document.getElementById('project-status-filter');
        if (projectStatusFilter) {
            projectStatusFilter.addEventListener('change', (e) => {
                this.projectFilters.status = e.target.value;
                this.renderProjects();
            });
        }

        // Create project button
        const createProjectBtn = document.getElementById('create-project-btn');
        if (createProjectBtn) {
            createProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('create-project-modal');
            });
        }

        // Create project form
        const createProjectForm = document.getElementById('create-project-form');
        if (createProjectForm) {
            createProjectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createProject(e.target);
            });
        }

        // Progress slider in create project modal
        const progressSlider = document.querySelector('#create-project-form input[name="progress"]');
        const progressOutput = document.querySelector('#create-project-form .progress-value');
        if (progressSlider && progressOutput) {
            progressSlider.addEventListener('input', (e) => {
                progressOutput.textContent = `${e.target.value}%`;
            });
        }
    }

    setupBulkImportListeners() {
        // File format selection
        document.querySelectorAll('.file-format-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.file-format-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update accepted file types
                const fileInput = document.getElementById('bulk-import-file');
                if (fileInput) {
                    switch(btn.dataset.format) {
                        case 'csv':
                            fileInput.accept = '.csv';
                            break;
                        case 'excel':
                            fileInput.accept = '.xlsx,.xls';
                            break;
                        case 'json':
                            fileInput.accept = '.json';
                            break;
                        case 'text':
                            fileInput.accept = '.txt';
                            break;
                    }
                }
            });
        });

        // File upload handling
        const fileInput = document.getElementById('bulk-import-file');
        const fileUploadContainer = document.querySelector('.file-upload-container');
        
        if (fileInput && fileUploadContainer) {
            // Drag and drop handling
            fileUploadContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadContainer.classList.add('dragover');
            });

            fileUploadContainer.addEventListener('dragleave', (e) => {
                e.preventDefault();
                fileUploadContainer.classList.remove('dragover');
            });

            fileUploadContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadContainer.classList.remove('dragover');
                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    this.handleFileSelection(e.dataTransfer.files);
                }
            });

            // File selection handling
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelection(e.target.files);
            });

            // Remove file button
            document.querySelector('.remove-file-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetFileUpload();
            });

            // Import button
            document.querySelector('.import-data-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.importProcessedData();
            });

            // Cancel button
            document.querySelector('.cancel-import-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('bulk-import-modal');
                this.resetFileUpload();
            });
        }
    }

    setupModalListeners() {
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = e.target.closest('.modal');
                this.closeModal(modal.id);
            });
        });

        // Click outside to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Generate invite link
        const generateLinkBtn = document.getElementById('generate-link-btn');
        if (generateLinkBtn) {
            generateLinkBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateInviteLink();
            });
        }

        // Copy invite link
        const copyLinkBtn = document.getElementById('copy-link-btn');
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyInviteLink();
            });
        }

        // Add member form
        const addMemberForm = document.getElementById('add-member-form');
        if (addMemberForm) {
            addMemberForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addMember(e.target);
            });
        }

        // Cancel buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = e.target.closest('.modal');
                this.closeModal(modal.id);
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        const container = document.getElementById('members-container');
        if (container) {
            container.className = `members-container members-${view}`;
        }
        this.renderMembers();
    }

    clearFilters() {
        this.filters = { department: '', experience: '', status: '' };
        this.searchTerm = '';

        const searchInput = document.getElementById('member-search');
        if (searchInput) searchInput.value = '';

        document.querySelectorAll('.filter-select').forEach(select => {
            select.value = '';
        });

        this.renderMembers();
    }

    getFilteredMembers() {
        return this.teamMembers.filter(member => {
            const searchMatch = !this.searchTerm || 
                member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.skills.some(skill => skill.toLowerCase().includes(this.searchTerm.toLowerCase()));

            const deptMatch = !this.filters.department || member.department === this.filters.department;
            const expMatch = !this.filters.experience || member.experienceLevel === this.filters.experience;
            const statusMatch = !this.filters.status || member.status === this.filters.status;

            return searchMatch && deptMatch && expMatch && statusMatch;
        });
    }

    renderMembers() {
        const container = document.getElementById('members-container');
        if (!container) return;

        const filteredMembers = this.getFilteredMembers();

        if (filteredMembers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>No members found</h3>
                    <p>No team members match your current search criteria. Try adjusting your filters or add new members.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredMembers.map(member => `
            <div class="member-card ${this.currentView}" data-member-id="${member.id}">
                <div class="member-header">
                    <div class="member-avatar">
                        ${member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div class="member-info">
                        <h4 class="member-name">${this.highlightSearchTerm(member.name)}</h4>
                        <p class="member-role">${this.highlightSearchTerm(member.role)}</p>
                        <p class="member-email">${this.highlightSearchTerm(member.email)}</p>
                    </div>
                    <div class="member-status">
                        <span class="status status--${member.status.toLowerCase() === 'active' ? 'success' : 'error'}">
                            ${member.status}
                        </span>
                    </div>
                </div>
                <div class="member-details">
                    <div class="detail-item">
                        <strong>Department:</strong> ${this.highlightSearchTerm(member.department)}
                    </div>
                    <div class="detail-item">
                        <strong>Experience:</strong> ${member.experienceLevel}
                    </div>
                    <div class="detail-item">
                        <strong>Workload:</strong> 
                        <span class="workload workload--${member.currentWorkload.toLowerCase()}">
                            ${member.currentWorkload}
                        </span>
                    </div>
                    <div class="detail-item">
                        <strong>Skills:</strong> 
                        <div class="skills-list">
                            ${member.skills.map(skill => 
                                `<span class="skill-tag">${this.highlightSearchTerm(skill)}</span>`
                            ).join('')}
                        </div>
                    </div>
                    ${member.phone ? `<div class="detail-item"><strong>Phone:</strong> ${member.phone}</div>` : ''}
                    ${member.specialization ? `<div class="detail-item"><strong>Specialization:</strong> ${this.highlightSearchTerm(member.specialization)}</div>` : ''}
                </div>
                <div class="member-actions">
                    <input type="checkbox" class="member-select" value="${member.id}" 
                           ${this.selectedMembers.has(member.id) ? 'checked' : ''}>
                    <button class="btn btn-sm btn-secondary" onclick="app.editMember(${member.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="app.removeMember(${member.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners for checkboxes
        container.querySelectorAll('.member-select').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const memberId = parseInt(e.target.value);
                if (e.target.checked) {
                    this.selectedMembers.add(memberId);
                } else {
                    this.selectedMembers.delete(memberId);
                }
            });
        });
    }

    getFilteredProjects() {
        return this.projects.filter(project => {
            // Search filter
            const searchMatch = !this.projectSearchTerm || 
                project.name.toLowerCase().includes(this.projectSearchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(this.projectSearchTerm.toLowerCase());

            // Status filter
            const statusMatch = !this.projectFilters.status || project.status === this.projectFilters.status;

            return searchMatch && statusMatch;
        });
    }

    renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        const filteredProjects = this.getFilteredProjects();

        if (filteredProjects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-project-diagram"></i>
                    <h3>No projects found</h3>
                    <p>No projects match your current search criteria. Try adjusting your filters or create a new project.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredProjects.map(project => `
            <div class="project-card status-${project.status}" data-project-id="${project.id}">
                <div class="project-header">
                    <h4 class="project-title">${this.highlightSearchTerm(project.name)}</h4>
                    <p class="project-description">${this.highlightSearchTerm(project.description)}</p>
                </div>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <span class="meta-label">Due Date:</span>
                        <span class="meta-value">${this.formatDate(project.dueDate)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Status:</span>
                        <span class="meta-value status status--${this.getStatusClass(project.status)}">${this.formatStatus(project.status)}</span>
                    </div>
                </div>

                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill ${project.status}" 
                             style="width: 0%" 
                             data-progress="${project.progress}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>Progress</span>
                        <span>${project.progress}% Complete</span>
                    </div>
                </div>

                <div class="project-actions">
                    <button class="btn btn-sm btn-secondary" onclick="app.editProject(${project.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="app.deleteProject(${project.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
        
        // Animate progress bars
        if (typeof this.animateProgressBars === 'function') {
            this.animateProgressBars();
        }
    }
    
// Modified createProject method
async createProject(form) {
    const formData = new FormData(form);
    
    const newProject = {
        id: Math.max(...this.projects.map(p => p.id), 0) + 1,
        name: formData.get('name'),
        description: formData.get('description') || '',
        dueDate: formData.get('dueDate'),
        status: 'not-started',
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        createdDate: new Date().toISOString().split('T')[0],
        assignedTo: [],
        dailyProgress: []
    };

    if (!newProject.name || !newProject.dueDate) {
        this.showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        // Send to n8n webhook
        const response = await fetch('https://abcd-004.app.n8n.cloud/webhook-test/1e40ea3a-cd73-46ae-ac2b-28dc6e1af803', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) throw new Error('Failed to send to n8n');
        
        this.projects.push(newProject);
        this.saveToStorage();
        this.renderProjects();
        this.closeModal('create-project-modal');
        form.reset();
        this.showToast('Project created successfully!', 'success');
    } catch (error) {
        this.showToast('Error creating project: ' + error.message, 'error');
    }
}

    editProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Pre-fill the form with existing data
        const form = document.getElementById('create-project-form');
        if (form) {
            form.querySelector('input[name="name"]').value = project.name;
            form.querySelector('textarea[name="description"]').value = project.description;
            form.querySelector('input[name="dueDate"]').value = project.dueDate;
            form.querySelector('select[name="status"]').value = project.status;
            form.querySelector('input[name="progress"]').value = project.progress;
            form.querySelector('.progress-value').textContent = `${project.progress}%`;

            // Change form submission to update mode
            form.onsubmit = (e) => {
                e.preventDefault();
                this.updateProject(projectId, form);
            };

            // Update modal title
            document.querySelector('#create-project-modal .modal-header h3').textContent = 'Edit Project';
            
            this.openModal('create-project-modal');
        }
    }

    updateProject(projectId, form) {
        const formData = new FormData(form);
        const projectIndex = this.projects.findIndex(p => p.id === projectId);
        
        if (projectIndex === -1) return;

        const updatedProject = {
            ...this.projects[projectIndex],
            name: formData.get('name'),
            description: formData.get('description') || '',
            dueDate: formData.get('dueDate'),
            progress: parseInt(formData.get('progress')) || 0,
            status: formData.get('status')
        };

        this.projects[projectIndex] = updatedProject;
        this.saveToStorage();
        this.renderProjects();
        this.closeModal('create-project-modal');
        
        // Reset form submission and modal title
        form.onsubmit = (e) => {
            e.preventDefault();
            this.createProject(form);
        };
        document.querySelector('#create-project-modal .modal-header h3').textContent = 'Create New Project';
        
        this.showToast('Project updated successfully!', 'success');
    }

    deleteProject(projectId) {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const projectIndex = this.projects.findIndex(p => p.id === projectId);
        if (projectIndex === -1) return;

        this.projects.splice(projectIndex, 1);
        this.saveToStorage();
        this.renderProjects();
        this.showToast('Project deleted successfully!', 'success');
    }

    handleAuth(form) {
        const inputs = form.querySelectorAll('input[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });

        if (!valid) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const emailInput = form.querySelector('input[type="email"]');
        const nameInput = form.querySelector('input[type="text"]');

        this.currentUser = {
            email: emailInput.value,
            name: nameInput ? nameInput.value : emailInput.value.split('@')[0],
            loginTime: new Date().toISOString()
        };

        this.saveToStorage();
        this.showToast('Welcome to Productivity Beast!', 'success');
        this.showDashboard();
    }

    handleSocialAuth() {
        this.currentUser = {
            email: 'demo@example.com',
            name: 'Demo User',
            loginTime: new Date().toISOString()
        };

        this.saveToStorage();
        this.showToast('Successfully signed in!', 'success');
        this.showDashboard();
    }

    logout() {
        this.currentUser = null;
        this.saveToStorage();
        this.showToast('Successfully logged out', 'info');
        this.showAuth();
    }

    populateDropdowns() {
        // Department filters
        const departmentFilter = document.getElementById('department-filter');
        if (departmentFilter && departmentFilter.children.length === 1) {
            this.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                departmentFilter.appendChild(option);
            });
        }

        // Experience filters
        const experienceFilter = document.getElementById('experience-filter');
        if (experienceFilter && experienceFilter.children.length === 1) {
            this.experienceLevels.forEach(level => {
                const option = document.createElement('option');
                option.value = level;
                option.textContent = level;
                experienceFilter.appendChild(option);
            });
        }

        // Status filters
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter && statusFilter.children.length === 1) {
            ['Active', 'Inactive', 'Pending'].forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                statusFilter.appendChild(option);
            });
        }

        // Add member form dropdowns
        const addMemberDept = document.querySelector('#add-member-form select[name="department"]');
        if (addMemberDept && addMemberDept.children.length === 1) {
            this.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                addMemberDept.appendChild(option);
            });
        }

        const addMemberExp = document.querySelector('#add-member-form select[name="experienceLevel"]');
        if (addMemberExp && addMemberExp.children.length === 1) {
            this.experienceLevels.forEach(level => {
                const option = document.createElement('option');
                option.value = level;
                option.textContent = level;
                addMemberExp.appendChild(option);
            });
        }

        // Message templates
        const templateSelect = document.getElementById('message-template');
        if (templateSelect && templateSelect.children.length === 1) {
            this.messageTemplates.forEach((template, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = template.name;
                templateSelect.appendChild(option);
            });
        }
    }

    addMember(form) {
        const formData = new FormData(form);
        
        const newMember = {
            id: Math.max(...this.teamMembers.map(m => m.id), 0) + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            department: formData.get('department'),
            role: formData.get('role'),
            experienceLevel: formData.get('experienceLevel'),
            skills: formData.get('skills') ? formData.get('skills').split(',').map(s => s.trim()) : [],
            specialization: formData.get('specialization') || '',
            currentWorkload: formData.get('currentWorkload'),
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            lastActivity: new Date().toISOString().split('T')[0],
            productivity: 75 + Math.random() * 25,
            tasksCompleted: Math.floor(Math.random() * 50) + 10,
            projectsCompleted: Math.floor(Math.random() * 10) + 1
        };

        // Check for duplicate email
        if (this.teamMembers.some(member => member.email === newMember.email)) {
            this.showToast('A member with this email already exists', 'error');
            return;
        }

        this.teamMembers.push(newMember);
        this.saveToStorage();
        this.renderMembers();
        this.closeModal('add-member-modal');
        form.reset();
        this.showToast('Team member added successfully!', 'success');
    }

    editMember(memberId) {
        this.showToast('Edit member functionality coming soon!', 'info');
    }

    removeMember(memberId) {
        if (!confirm('Are you sure you want to remove this team member?')) return;

        const memberIndex = this.teamMembers.findIndex(m => m.id === memberId);
        if (memberIndex === -1) return;

        this.teamMembers.splice(memberIndex, 1);
        this.selectedMembers.delete(memberId);
        this.saveToStorage();
        this.renderMembers();
        this.showToast('Team member removed successfully!', 'success');
    }

    generateInviteLink() {
        const form = document.getElementById('invite-form');
        const formData = new FormData(form);
        
        const inviteId = Math.random().toString(36).substring(2, 15);
        const inviteLink = `${window.location.origin}/join?invite=${inviteId}&role=${formData.get('role')}&exp=${formData.get('expiration')}`;
        
        const linkTextInput = document.getElementById('invite-link-text');
        if (linkTextInput) {
            linkTextInput.value = inviteLink;
            document.getElementById('generated-link').style.display = 'block';
        }
        
        this.showToast('Invite link generated successfully!', 'success');
    }

    copyInviteLink() {
        const linkInput = document.getElementById('invite-link-text');
        if (linkInput) {
            linkInput.select();
            document.execCommand('copy');
            this.showToast('Link copied to clipboard!', 'success');
        }
    }

    loadMessageTemplate(templateIndex) {
        if (templateIndex === '') return;
        
        const template = this.messageTemplates[templateIndex];
        if (template) {
            this.showToast(`Template "${template.name}" loaded`, 'info');
        }
    }

    sendMessage(platform) {
        const recipients = document.querySelector('input[name="recipients"]:checked')?.value;
        if (!recipients) {
            this.showToast('Please select recipients', 'error');
            return;
        }
        
        let memberList = [];

        if (recipients === 'all') {
            memberList = this.teamMembers;
        } else {
            memberList = this.teamMembers.filter(member => this.selectedMembers.has(member.id));
        }

        if (memberList.length === 0) {
            this.showToast('No recipients selected', 'error');
            return;
        }

        // Simulate sending messages
        this.showToast(`Message sent to ${memberList.length} member(s) via ${platform}`, 'success');
    }

    handleFileSelection(files) {
        if (!files || files.length === 0) return;

        const file = files[0];
        const fileInfo = document.querySelector('.file-info');
        const fileName = document.querySelector('.file-name');
        
        if (fileInfo && fileName) {
            fileName.textContent = file.name;
            fileInfo.style.display = 'flex';
        }

        this.simulateFileProcessing(file);
    }

    async simulateFileProcessing(file) {
        const progressContainer = document.querySelector('.upload-progress-container');
        const aiContainer = document.querySelector('.ai-analysis-container');
        
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        // Simulate upload progress
        await this.simulateProgress('.progress-fill', 100);
        
        // Show AI analysis
        if (aiContainer) {
            aiContainer.style.display = 'block';
            
            // Simulate AI processing
            const aiStatus = document.querySelector('.ai-status');
            if (aiStatus) {
                aiStatus.innerHTML = 'Analyzing data with Groq AI... <div class="ai-processing"></div>';
            }
            
            setTimeout(() => {
                this.showSampleData();
                
                if (aiStatus) {
                    aiStatus.innerHTML = '✅ AI analysis complete! Found 5 team members.';
                }
                
                // Enable import button
                const importBtn = document.querySelector('.import-data-btn');
                if (importBtn) {
                    importBtn.style.display = 'inline-block';
                }
            }, 2000);
        }
    }

    showSampleData() {
        // Sample detected fields
        const fieldsContainer = document.querySelector('.detected-fields-container');
        if (fieldsContainer) {
            fieldsContainer.innerHTML = `
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Name</span></div>
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Email</span></div>
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Department</span></div>
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Role</span></div>
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Skills</span></div>
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Experience Level</span></div>
                <div class="field-mapping-item"><i class="fas fa-check"></i><span>Phone</span></div>
            `;
        }
        
        // Sample preview data
        const previewContainer = document.querySelector('.preview-container');
        const table = document.querySelector('.preview-table');

        if (previewContainer && table) {
            previewContainer.style.display = 'block';

            // Create table headers
            const headers = ['Name', 'Email', 'Department', 'Role', 'Skills', 'Experience', 'Phone'];
            table.querySelector('thead').innerHTML = `
                <tr>
                    ${headers.map(header => `<th>${header}</th>`).join('')}
                </tr>
            `;

            // Sample data
            const sampleData = [
                {
                    name: 'John Smith',
                    email: 'john.smith@example.com',
                    department: 'Engineering',
                    role: 'Frontend Developer',
                    skills: ['JavaScript', 'React', 'CSS'],
                    experienceLevel: 'Mid',
                    phone: '+1-555-1234'
                },
                {
                    name: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    department: 'Design',
                    role: 'UI/UX Designer',
                    skills: ['Figma', 'Sketch', 'Adobe XD'],
                    experienceLevel: 'Senior',
                    phone: '+1-555-5678'
                },
                {
                    name: 'Alex Johnson',
                    email: 'alex.j@example.com',
                    department: 'Marketing',
                    role: 'Content Strategist',
                    skills: ['Content Writing', 'SEO', 'Analytics'],
                    experienceLevel: 'Mid',
                    phone: '+1-555-9012'
                }
            ];

            // Create table body
            table.querySelector('tbody').innerHTML = sampleData.map(item => `
                <tr>
                    <td>${item.name || ''}</td>
                    <td>${item.email || ''}</td>
                    <td>${item.department || ''}</td>
                    <td>${item.role || ''}</td>
                    <td>${Array.isArray(item.skills) ? item.skills.join(', ') : (item.skills || '')}</td>
                    <td>${item.experienceLevel || 'Mid'}</td>
                    <td>${item.phone || ''}</td>
                </tr>
            `).join('');
            
            this.processedImportData = sampleData;
        }
    }

    importProcessedData() {
        if (!this.processedImportData || this.processedImportData.length === 0) {
            this.showToast('No data to import', 'error');
            return;
        }

        let importedCount = 0;
        let duplicateCount = 0;

        this.processedImportData.forEach(memberData => {
            // Check for duplicates
            if (this.teamMembers.some(member => member.email === memberData.email)) {
                duplicateCount++;
                return;
            }

            // Add new member
            const newMember = {
                id: Math.max(...this.teamMembers.map(m => m.id), 0) + 1,
                name: memberData.name,
                email: memberData.email,
                phone: memberData.phone || '',
                department: memberData.department || 'General',
                role: memberData.role || 'Team Member',
                experienceLevel: memberData.experienceLevel || 'Mid',
                skills: Array.isArray(memberData.skills) ? memberData.skills : 
                       (memberData.skills ? [memberData.skills] : []),
                specialization: memberData.specialization || '',
                currentWorkload: memberData.currentWorkload || 'Medium',
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0],
                lastActivity: new Date().toISOString().split('T')[0],
                productivity: 75 + Math.random() * 25,
                tasksCompleted: Math.floor(Math.random() * 50) + 10,
                projectsCompleted: Math.floor(Math.random() * 10) + 1
            };

            this.teamMembers.push(newMember);
            importedCount++;
        });

        this.saveToStorage();
        this.renderMembers();
        this.closeModal('bulk-import-modal');
        this.resetFileUpload();

        let message = `Successfully imported ${importedCount} team members`;
        if (duplicateCount > 0) {
            message += ` (${duplicateCount} duplicates skipped)`;
        }
        this.showToast(message, 'success');
    }

    resetFileUpload() {
        const fileInput = document.getElementById('bulk-import-file');
        const fileInfo = document.querySelector('.file-info');
        const progressContainer = document.querySelector('.upload-progress-container');
        const aiContainer = document.querySelector('.ai-analysis-container');
        const previewContainer = document.querySelector('.preview-container');
        const importBtn = document.querySelector('.import-data-btn');

        if (fileInput) fileInput.value = '';
        if (fileInfo) fileInfo.style.display = 'none';
        if (progressContainer) progressContainer.style.display = 'none';
        if (aiContainer) aiContainer.style.display = 'none';
        if (previewContainer) previewContainer.style.display = 'none';
        if (importBtn) importBtn.style.display = 'none';

        document.querySelectorAll('.file-format-btn').forEach(btn => btn.classList.remove('active'));
        
        this.rawImportData = null;
        this.processedImportData = null;
    }

    // Modal methods
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            modal.querySelector('.modal-content').style.animation = 'scaleIn 0.3s var(--ease-out) forwards';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const content = modal.querySelector('.modal-content');
            content.style.animation = 'scaleIn 0.3s var(--ease-in) reverse forwards';
            
            setTimeout(() => {
                modal.style.display = 'none';
                content.style.animation = '';
            }, 300);
        }
    }

    // Utility methods
    simulateProgress(selector, duration = 2000) {
        return new Promise(resolve => {
            const progressBar = document.querySelector(selector);
            const percentageEl = document.querySelector('.progress-percentage');
            if (!progressBar) {
                resolve();
                return;
            }

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(resolve, 200);
                }
                progressBar.style.width = `${progress}%`;
                
                if (percentageEl) {
                    percentageEl.textContent = `${Math.round(progress)}%`;
                }
            }, duration / 20);
        });
    }

    highlightSearchTerm(text) {
        const searchTerm = this.searchTerm || this.projectSearchTerm;
        if (!searchTerm || typeof text !== 'string') return text;
        
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatStatus(status) {
        const statusMap = {
            'not-started': 'Not Started',
            'in-progress': 'In Progress',
            'complete': 'Complete'
        };
        return statusMap[status] || status;
    }

    getStatusClass(status) {
        const classMap = {
            'complete': 'success',
            'in-progress': 'warning',
            'not-started': 'error'
        };
        return classMap[status] || 'info';
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;

        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        }, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        });
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.app = new ProductivityBeastApp();
});
