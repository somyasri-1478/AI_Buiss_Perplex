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
                "lastActivity": "2025-06-09"
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
                "lastActivity": "2025-06-08"
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
                "lastActivity": "2025-06-09"
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
                "lastActivity": "2025-06-09"
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
                "lastActivity": "2025-06-08"
            }
        ];

        // Sample projects data
        this.projects = [
            {
                "id": 1,
                "name": "Website Redesign",
                "description": "Complete overhaul of company website with modern design and improved UX",
                "dueDate": "2025-07-15",
                "progress": 100,
                "status": "complete",
                "createdDate": "2025-05-01"
            },
            {
                "id": 2,
                "name": "Mobile App Development",
                "description": "Development of iOS and Android mobile application for customer portal",
                "dueDate": "2025-08-30",
                "progress": 65,
                "status": "in-progress",
                "createdDate": "2025-04-15"
            },
            {
                "id": 3,
                "name": "Database Migration",
                "description": "Migration from legacy database system to cloud-based solution",
                "dueDate": "2025-09-15",
                "progress": 30,
                "status": "in-progress",
                "createdDate": "2025-06-01"
            },
            {
                "id": 4,
                "name": "AI Integration Research",
                "description": "Research and planning for AI features integration into existing products",
                "dueDate": "2025-10-01",
                "progress": 0,
                "status": "not-started",
                "createdDate": "2025-06-10"
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
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupAnimations();
        this.checkAuthState();
        
        // Delay populating dropdowns to ensure DOM is ready
        setTimeout(() => {
            this.populateDropdowns();
        }, 100);
    }
    
    // New method for animations
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
        
        // Add tab indicator animation
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

        // Bulk import listeners
        this.setupBulkImportListeners();

        // Modal controls
        this.setupModalListeners();
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

    createProject(form) {
        const formData = new FormData(form);
        
        const newProject = {
            id: Math.max(...this.projects.map(p => p.id), 0) + 1,
            name: formData.get('name'),
            description: formData.get('description') || '',
            dueDate: formData.get('dueDate'),
            progress: parseInt(formData.get('progress')) || 0,
            status: formData.get('status'),
            createdDate: new Date().toISOString().split('T')[0]
        };

        // Validate required fields
        if (!newProject.name || !newProject.dueDate) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        this.projects.push(newProject);
        this.saveToStorage();
        this.syncProjectToGoogleSheets(newProject, 'create');
        this.renderProjects();
        this.closeModal('create-project-modal');
        form.reset();
        this.showToast('Project created successfully!', 'success');
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
        this.syncProjectToGoogleSheets(updatedProject, 'update');
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

        const deletedProject = this.projects[projectIndex];
        this.projects.splice(projectIndex, 1);
        this.saveToStorage();
        this.syncProjectToGoogleSheets(deletedProject, 'delete');
        this.renderProjects();
        this.showToast('Project deleted successfully!', 'success');
    }

    syncProjectToGoogleSheets(project, action) {
        // In a real implementation, this would connect to Google Sheets API
        console.log(`Syncing project to Google Sheets: ${action}`, project);
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
        // In a real implementation, this would connect to OAuth providers
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
            lastActivity: new Date().toISOString().split('T')[0]
        };

        // Check for duplicate email
        if (this.teamMembers.some(member => member.email === newMember.email)) {
            this.showToast('A member with this email already exists', 'error');
            return;
        }

        this.teamMembers.push(newMember);
        this.saveToStorage();
        this.syncMemberToGoogleSheets(newMember, 'create');
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

        const removedMember = this.teamMembers[memberIndex];
        this.teamMembers.splice(memberIndex, 1);
        this.selectedMembers.delete(memberId);
        this.saveToStorage();
        this.syncMemberToGoogleSheets(removedMember, 'delete');
        this.renderMembers();
        this.showToast('Team member removed successfully!', 'success');
    }

    syncMemberToGoogleSheets(member, action) {
        // In a real implementation, this would connect to Google Sheets API
        console.log(`Syncing member to Google Sheets: ${action}`, member);
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
        const tableContainer = document.querySelector('.preview-table-container');
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
                lastActivity: new Date().toISOString().split('T')[0]
            };

            this.teamMembers.push(newMember);
            this.syncMemberToGoogleSheets(newMember, 'create');
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
