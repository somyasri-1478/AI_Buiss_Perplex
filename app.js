// Application State
class ProductivityBeastApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'grid';
        this.selectedMembers = new Set();
        this.searchTerm = '';
        this.filters = {
            department: '',
            experience: '',
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
            },
            {
                "id": 6,
                "name": "James Wilson",
                "email": "james.wilson@company.com",
                "phone": "+1-555-0106",
                "department": "HR",
                "role": "HR Specialist",
                "experienceLevel": "Junior",
                "skills": ["Recruitment", "Employee Relations", "Benefits", "Training"],
                "specialization": "Human Resources",
                "currentWorkload": "Low",
                "status": "Active",
                "joinDate": "2024-05-01",
                "lastActivity": "2025-06-07"
            },
            {
                "id": 7,
                "name": "Anna Kowalski",
                "email": "anna.kowalski@company.com",
                "phone": "+1-555-0107",
                "department": "Engineering",
                "role": "Junior Developer",
                "experienceLevel": "Junior",
                "skills": ["JavaScript", "HTML/CSS", "Git", "React"],
                "specialization": "Frontend Development",
                "currentWorkload": "Medium",
                "status": "Active",
                "joinDate": "2024-06-01",
                "lastActivity": "2025-06-09"
            },
            {
                "id": 8,
                "name": "Robert Martinez",
                "email": "robert.martinez@company.com",
                "phone": "+1-555-0108",
                "department": "Marketing",
                "role": "Content Creator",
                "experienceLevel": "Mid",
                "skills": ["Content Writing", "Social Media", "Video Editing", "SEO"],
                "specialization": "Content Marketing",
                "currentWorkload": "High",
                "status": "Active",
                "joinDate": "2024-01-30",
                "lastActivity": "2025-06-08"
            },
            {
                "id": 9,
                "name": "Sophie Laurent",
                "email": "sophie.laurent@company.com",
                "phone": "+1-555-0109",
                "department": "Design",
                "role": "Graphic Designer",
                "experienceLevel": "Mid",
                "skills": ["Adobe Creative Suite", "Branding", "Print Design", "Web Design"],
                "specialization": "Visual Design",
                "currentWorkload": "Medium",
                "status": "Inactive",
                "joinDate": "2023-09-15",
                "lastActivity": "2025-05-30"
            },
            {
                "id": 10,
                "name": "Alex Turner",
                "email": "alex.turner@company.com",
                "phone": "+1-555-0110",
                "department": "Sales",
                "role": "Sales Manager",
                "experienceLevel": "Senior",
                "skills": ["Team Leadership", "Sales Strategy", "CRM", "Analytics"],
                "specialization": "Sales Management",
                "currentWorkload": "High",
                "status": "Active",
                "joinDate": "2023-08-01",
                "lastActivity": "2025-06-09"
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
        this.checkAuthState();
        
        // Delay populating dropdowns to ensure DOM is ready
        setTimeout(() => {
            this.populateDropdowns();
        }, 100);
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('productivityBeastData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.teamMembers = data.teamMembers || this.teamMembers;
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
            userName.textContent = `Welcome, ${this.currentUser.name}!`;
        }
        
        // Initialize team section if it's the active section
        setTimeout(() => {
            if (document.getElementById('team-section').classList.contains('active')) {
                this.renderMembers();
            }
        }, 100);
    }
    
    setupEventListeners() {
        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchAuthTab(tabName);
            });
        });
        
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
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.closest('.nav-item').dataset.section;
                this.switchSection(section);
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
                const view = e.target.closest('.view-btn').dataset.view;
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
                const platform = e.target.textContent.trim().split('via ')[1]; // Extract platform name
                this.sendMessage(platform);
            });
        });
    }
    
    setupBulkImportListeners() {
        const bulkImportBtn = document.getElementById('bulk-import-btn');
        if (bulkImportBtn) {
            bulkImportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('bulk-import-modal');
            });
        }
        
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
                    this.handleFileSelection(fileInput.files);
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
    }
    
    switchAuthTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tabName}-form`);
        });
    }
    
    handleAuth(form) {
        const inputs = form.querySelectorAll('input[required]');
        let valid = true;
        
        // Simple validation
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = 'var(--color-error)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!valid) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }
        
        const emailInput = form.querySelector('input[type="email"]');
        const nameInput = form.querySelector('input[type="text"]');
        
        // Simulate authentication
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
        // Simulate social authentication
        this.currentUser = {
            email: 'user@example.com',
            name: 'Social User',
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
    
    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });
        
        // Update content sections
        document.querySelectorAll('.content-section').forEach(content => {
            content.classList.toggle('active', content.id === `${section}-section`);
        });
        
        // Load section-specific data
        if (section === 'team') {
            setTimeout(() => {
                this.renderMembers();
            }, 100);
        }
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
    
    switchView(view) {
        this.currentView = view;
        
        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        this.renderMembers();
    }
    
    clearFilters() {
        this.filters = { department: '', experience: '', status: '' };
        this.searchTerm = '';
        
        // Reset form controls
        const searchInput = document.getElementById('member-search');
        if (searchInput) searchInput.value = '';
        
        document.querySelectorAll('.filter-select').forEach(select => {
            select.value = '';
        });
        
        this.renderMembers();
    }
    
    getFilteredMembers() {
        return this.teamMembers.filter(member => {
            // Search filter
            const searchMatch = !this.searchTerm || 
                member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                member.skills.some(skill => skill.toLowerCase().includes(this.searchTerm.toLowerCase()));
            
            // Department filter
            const deptMatch = !this.filters.department || member.department === this.filters.department;
            
            // Experience filter
            const expMatch = !this.filters.experience || member.experienceLevel === this.filters.experience;
            
            // Status filter
            const statusMatch = !this.filters.status || member.status === this.filters.status;
            
            return searchMatch && deptMatch && expMatch && statusMatch;
        });
    }
    
    renderMembers() {
        const container = document.getElementById('members-container');
        if (!container) return;
        
        const filteredMembers = this.getFilteredMembers();
        
        // Set container class based on view
        container.className = `members-container ${this.currentView === 'grid' ? 'members-grid' : 'members-list'}`;
        
        if (filteredMembers.length === 0) {
            container.innerHTML = '<div class="placeholder-content"><p>No members found matching your criteria.</p></div>';
            return;
        }
        
        container.innerHTML = filteredMembers.map(member => this.createMemberCard(member)).join('');
        
        // Add event listeners to member cards
        this.attachMemberCardListeners();
    }
    
    createMemberCard(member) {
        const initials = member.name.split(' ').map(n => n[0]).join('');
        const isHighlighted = this.searchTerm && this.isSearchMatch(member);
        
        return `
            <div class="member-card ${this.currentView === 'list' ? 'list-view' : ''} ${isHighlighted ? 'highlighted' : ''}" data-member-id="${member.id}">
                <div class="status-indicator status-${member.status.toLowerCase()}"></div>
                
                <div class="member-header">
                    <div class="member-avatar">${initials}</div>
                    <div class="member-info">
                        <h3>${this.highlightSearchTerm(member.name)}</h3>
                        <p>${this.highlightSearchTerm(member.email)}</p>
                    </div>
                </div>
                
                <div class="member-details">
                    <div class="detail-item">
                        <span class="detail-label">Department</span>
                        <span class="detail-value">${this.highlightSearchTerm(member.department)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Role</span>
                        <span class="detail-value">${this.highlightSearchTerm(member.role)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Experience</span>
                        <span class="detail-value">${member.experienceLevel}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Workload</span>
                        <div class="workload-indicator workload-${member.currentWorkload.toLowerCase()}">
                            <div class="workload-bar">
                                <div class="workload-fill"></div>
                            </div>
                            <span class="detail-value">${member.currentWorkload}</span>
                        </div>
                    </div>
                </div>
                
                <div class="member-skills">
                    <span class="detail-label">Skills</span>
                    <div class="skills-list">
                        ${member.skills.map(skill => 
                            `<span class="skill-tag">${this.highlightSearchTerm(skill)}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="member-actions">
                    <button class="btn btn--outline btn--sm edit-member" title="Edit Member">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn--outline btn--sm message-member" title="Message Member">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button class="btn btn--outline btn--sm remove-member" title="Remove Member">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    isSearchMatch(member) {
        if (!this.searchTerm) return false;
        const term = this.searchTerm.toLowerCase();
        return member.name.toLowerCase().includes(term) ||
               member.email.toLowerCase().includes(term) ||
               member.department.toLowerCase().includes(term) ||
               member.role.toLowerCase().includes(term) ||
               member.skills.some(skill => skill.toLowerCase().includes(term));
    }
    
    highlightSearchTerm(text) {
        if (!this.searchTerm || !text) return text;
        const regex = new RegExp(`(${this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="text-highlight">$1</span>');
    }
    
    attachMemberCardListeners() {
        // Edit member buttons
        document.querySelectorAll('.edit-member').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const memberId = parseInt(e.target.closest('.member-card').dataset.memberId);
                this.editMember(memberId);
            });
        });
        
        // Message member buttons
        document.querySelectorAll('.message-member').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const memberId = parseInt(e.target.closest('.member-card').dataset.memberId);
                this.selectMemberForMessage(memberId);
            });
        });
        
        // Remove member buttons
        document.querySelectorAll('.remove-member').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const memberId = parseInt(e.target.closest('.member-card').dataset.memberId);
                this.removeMember(memberId);
            });
        });
        
        // Member card selection
        document.querySelectorAll('.member-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    card.classList.toggle('selected');
                    const memberId = parseInt(card.dataset.memberId);
                    if (card.classList.contains('selected')) {
                        this.selectedMembers.add(memberId);
                    } else {
                        this.selectedMembers.delete(memberId);
                    }
                }
            });
        });
    }
    
    editMember(memberId) {
        this.showToast('Edit member feature coming soon!', 'info');
    }
    
    selectMemberForMessage(memberId) {
        const member = this.teamMembers.find(m => m.id === memberId);
        if (member) {
            this.selectedMembers.add(memberId);
            this.showToast(`Selected ${member.name} for messaging`, 'success');
            
            // Update recipient checkbox
            const selectedCheckbox = document.querySelector('.recipient-checkbox[value="selected"]');
            if (selectedCheckbox) {
                selectedCheckbox.checked = true;
            }
            
            // Scroll to messaging section
            const messagingSection = document.querySelector('.messaging-section');
            if (messagingSection) {
                messagingSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }
    }
    
    removeMember(memberId) {
        const member = this.teamMembers.find(m => m.id === memberId);
        if (member && confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
            this.teamMembers = this.teamMembers.filter(m => m.id !== memberId);
            this.selectedMembers.delete(memberId);
            this.saveToStorage();
            this.renderMembers();
            this.showToast(`${member.name} has been removed from the team`, 'success');
        }
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            
            // Focus first input
            const firstInput = modal.querySelector('input, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            
            // Reset forms
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
                
                // Clear validation styles
                form.querySelectorAll('input, select').forEach(input => {
                    input.style.borderColor = '';
                });
            }
            
            // Hide generated content
            const generatedLink = modal.querySelector('#generated-link');
            if (generatedLink) {
                generatedLink.classList.add('hidden');
            }
        }
    }
    
    generateInviteLink() {
        const role = document.getElementById('invite-role').value;
        const expiration = document.getElementById('invite-expiration').value;
        
        if (!role || !expiration) {
            this.showToast('Please select both role and expiration', 'error');
            return;
        }
        
        // Generate a realistic invite link
        const linkId = Math.random().toString(36).substr(2, 10);
        const baseUrl = window.location.origin;
        const inviteLink = `${baseUrl}/invite/${linkId}?role=${role}&exp=${expiration}`;
        
        document.getElementById('invite-link').value = inviteLink;
        document.getElementById('generated-link').classList.remove('hidden');
        
        this.showToast('Invite link generated successfully!', 'success');
    }
    
    copyInviteLink() {
        const linkInput = document.getElementById('invite-link');
        if (!linkInput.value) {
            this.showToast('No link to copy. Please generate a link first.', 'error');
            return;
        }
        
        linkInput.select();
        linkInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            this.showToast('Invite link copied to clipboard!', 'success');
        } catch (err) {
            this.showToast('Failed to copy link. Please copy manually.', 'error');
        }
    }
    
    addMember(form) {
        const formData = new FormData(form);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'department', 'role', 'experienceLevel'];
        let valid = true;
        
        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!formData.get(field) || !formData.get(field).trim()) {
                valid = false;
                if (input) input.style.borderColor = 'var(--color-error)';
            } else {
                if (input) input.style.borderColor = '';
            }
        });
        
        if (!valid) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email format
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showToast('Please enter a valid email address', 'error');
            form.querySelector('[name="email"]').style.borderColor = 'var(--color-error)';
            return;
        }
        
        // Check for duplicate email
        if (this.teamMembers.some(m => m.email.toLowerCase() === email.toLowerCase())) {
            this.showToast('A member with this email already exists', 'error');
            form.querySelector('[name="email"]').style.borderColor = 'var(--color-error)';
            return;
        }
        
        const newMember = {
            id: Math.max(...this.teamMembers.map(m => m.id)) + 1,
            name: formData.get('name').trim(),
            email: email.trim(),
            phone: formData.get('phone') ? formData.get('phone').trim() : '',
            department: formData.get('department'),
            role: formData.get('role').trim(),
            experienceLevel: formData.get('experienceLevel'),
            skills: formData.get('skills') ? 
                formData.get('skills').split(',').map(s => s.trim()).filter(s => s) : [],
            specialization: formData.get('specialization') ? formData.get('specialization').trim() : '',
            currentWorkload: 'Low',
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            lastActivity: new Date().toISOString().split('T')[0]
        };
        
        this.teamMembers.push(newMember);
        this.saveToStorage();
        this.renderMembers();
        this.closeModal('add-member-modal');
        this.showToast(`${newMember.name} has been added to the team!`, 'success');
    }
    
    loadMessageTemplate(templateIndex) {
        if (templateIndex === '') {
            document.getElementById('message-subject').value = '';
            document.getElementById('message-body').value = '';
            return;
        }
        
        const template = this.messageTemplates[templateIndex];
        if (template) {
            document.getElementById('message-subject').value = template.subject;
            document.getElementById('message-body').value = template.body;
        }
    }
    
    sendMessage(platform) {
        const subject = document.getElementById('message-subject').value.trim();
        const body = document.getElementById('message-body').value.trim();
        
        if (!subject || !body) {
            this.showToast('Please fill in both subject and message', 'error');
            return;
        }
        
        // Get recipients
        const recipients = this.getMessageRecipients();
        if (recipients.length === 0) {
            this.showToast('Please select recipients', 'error');
            return;
        }
        
        // Simulate sending message with loading state
        const button = event.target.closest('.integration-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.showToast(`Message sent via ${platform} to ${recipients.length} recipient(s)!`, 'success');
            
            // Clear form
            document.getElementById('message-subject').value = '';
            document.getElementById('message-body').value = '';
            document.getElementById('message-template').value = '';
            
            // Clear recipient checkboxes
            document.querySelectorAll('.recipient-checkbox').forEach(cb => cb.checked = false);
            
            // Clear selected members
            this.selectedMembers.clear();
            document.querySelectorAll('.member-card.selected').forEach(card => {
                card.classList.remove('selected');
            });
        }, 1500);
    }
    
    getMessageRecipients() {
        const checkboxes = document.querySelectorAll('.recipient-checkbox:checked');
        let recipients = [];
        
        checkboxes.forEach(checkbox => {
            switch (checkbox.value) {
                case 'all':
                    recipients = [...this.teamMembers];
                    break;
                case 'selected':
                    const selectedMembers = this.teamMembers.filter(m => this.selectedMembers.has(m.id));
                    recipients = [...recipients, ...selectedMembers];
                    break;
                case 'department':
                    if (this.filters.department) {
                        const deptMembers = this.teamMembers.filter(m => m.department === this.filters.department);
                        recipients = [...recipients, ...deptMembers];
                    }
                    break;
            }
        });
        
        // Remove duplicates
        return recipients.filter((member, index, self) => 
            index === self.findIndex(m => m.id === member.id)
        );
    }
    
    // Bulk Import Methods
    handleFileSelection(files) {
        if (!files || !files.length) return;
        
        const file = files[0]; // Only handling single file for now
        const fileInfo = document.querySelector('.file-info');
        const fileNameElement = document.querySelector('.file-name');
        const fileUploadLabel = document.querySelector('.file-upload-label');
        
        // Display file info
        if (fileInfo && fileNameElement) {
            fileInfo.classList.remove('hidden');
            fileNameElement.textContent = file.name;
            if (fileUploadLabel) {
                fileUploadLabel.style.display = 'none';
            }
        }
        
        // Determine file type and process accordingly
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        // Start processing with progress
        this.showUploadProgress();
        
        // Process based on file type
        if (['csv', 'txt'].includes(fileExtension)) {
            this.parseCSVFile(file);
        } else if (['xlsx', 'xls'].includes(fileExtension)) {
            this.parseExcelFile(file);
        } else if (fileExtension === 'json') {
            this.parseJSONFile(file);
        } else {
            this.showToast('Unsupported file format', 'error');
            this.resetFileUpload();
        }
    }

    parseCSVFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // Update progress
            this.updateProgress(50, 'Processing CSV...');
            
            try {
                // Parse CSV using simple approach
                const csvContent = e.target.result;
                const lines = csvContent.split('\n');
                
                // Extract headers (first line)
                const headers = lines[0].split(',').map(header => header.trim().replace(/^"(.*)"$/, '$1'));
                
                // Extract data rows
                const rows = [];
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim() === '') continue;
                    
                    // Handle commas within quoted fields
                    let row = [];
                    let inQuote = false;
                    let currentValue = '';
                    
                    for (let char of lines[i]) {
                        if (char === '"' && (currentValue === '' || currentValue.endsWith(','))) {
                            inQuote = true;
                            currentValue += char;
                        } else if (char === '"' && inQuote) {
                            inQuote = false;
                            currentValue += char;
                        } else if (char === ',' && !inQuote) {
                            row.push(currentValue.trim().replace(/^"(.*)"$/, '$1'));
                            currentValue = '';
                        } else {
                            currentValue += char;
                        }
                    }
                    
                    if (currentValue) {
                        row.push(currentValue.trim().replace(/^"(.*)"$/, '$1'));
                    }
                    
                    // If we got less cells than headers, fill with empty values
                    while (row.length < headers.length) {
                        row.push('');
                    }
                    
                    // Create object from headers and row
                    const rowData = {};
                    headers.forEach((header, index) => {
                        rowData[header] = row[index] || '';
                    });
                    
                    rows.push(rowData);
                }
                
                this.updateProgress(75, 'Preparing data...');
                this.processFileData(rows);
            } catch (error) {
                console.error('Error parsing CSV:', error);
                this.showToast('Error parsing CSV file', 'error');
                this.resetFileUpload();
            }
        };
        
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            this.showToast('Error reading file', 'error');
            this.resetFileUpload();
        };
        
        // Start reading the file
        reader.readAsText(file);
        this.updateProgress(25, 'Reading file...');
    }

    parseExcelFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // Update progress
            this.updateProgress(50, 'Processing Excel...');
            
            try {
                // Check if XLSX library is loaded
                if (typeof XLSX === 'undefined') {
                    // If not loaded, dynamically load it
                    this.loadScript('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js', () => {
                        this.parseExcelWithXLSX(e.target.result);
                    });
                } else {
                    // Library already loaded
                    this.parseExcelWithXLSX(e.target.result);
                }
            } catch (error) {
                console.error('Error processing Excel file:', error);
                this.showToast('Error processing Excel file', 'error');
                this.resetFileUpload();
            }
        };
        
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            this.showToast('Error reading file', 'error');
            this.resetFileUpload();
        };
        
        // Start reading the file
        reader.readAsArrayBuffer(file);
        this.updateProgress(25, 'Reading file...');
    }

    parseExcelWithXLSX(data) {
        try {
            // Parse workbook
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Convert sheet to JSON
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Extract headers
            const headers = rows[0];
            
            // Extract data rows
            const dataRows = [];
            for (let i = 1; i < rows.length; i++) {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = rows[i][index] || '';
                });
                dataRows.push(rowData);
            }
            
            this.updateProgress(75, 'Preparing data...');
            this.processFileData(dataRows);
        } catch (error) {
            console.error('Error parsing Excel with XLSX:', error);
            this.showToast('Error parsing Excel file', 'error');
            this.resetFileUpload();
        }
    }

    parseJSONFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // Update progress
            this.updateProgress(50, 'Processing JSON...');
            
            try {
                const jsonData = JSON.parse(e.target.result);
                
                // Check if it's an array
                if (Array.isArray(jsonData)) {
                    this.updateProgress(75, 'Preparing data...');
                    this.processFileData(jsonData);
                } else {
                    // If it's a single object, wrap it in an array
                    this.updateProgress(75, 'Preparing data...');
                    this.processFileData([jsonData]);
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                this.showToast('Error parsing JSON file', 'error');
                this.resetFileUpload();
            }
        };
        
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            this.showToast('Error reading file', 'error');
            this.resetFileUpload();
        };
        
        // Start reading the file
        reader.readAsText(file);
        this.updateProgress(25, 'Reading file...');
    }

    processFileData(data) {
        if (!data || !data.length) {
            this.showToast('No data found in file', 'error');
            this.resetFileUpload();
            return;
        }
        
        this.updateProgress(80, 'Starting AI analysis...');
        this.rawImportData = data;
        
        // Show the AI analysis section
        const aiAnalysisContainer = document.querySelector('.ai-analysis-container');
        if (aiAnalysisContainer) {
            aiAnalysisContainer.classList.remove('hidden');
        }
        
        // Analyze with Groq AI
        this.analyzeWithGroqAI(data);
    }

    async analyzeWithGroqAI(data) {
        const aiStatus = document.querySelector('.ai-status');
        if (aiStatus) {
            aiStatus.innerHTML = 'Using Groq AI to analyze the file and extract team member information... <div class="ai-processing"></div>';
        }
        
        try {
            // Create prompt for AI analysis
            let prompt = `
You are an expert data analyst specializing in extracting structured team member information from various data formats.

I have uploaded a file with team member data. Please analyze this data and extract the following information for each team member:
- Name
- Email
- Department
- Role/Position
- Skills (as a list)
- Experience Level (Junior, Mid, Senior, Lead)
- Current Workload (Low, Medium, High)
- Phone
- Specialization

Below is a sample of the data:
${JSON.stringify(data.slice(0, 5), null, 2)}

Please output a JSON array containing the extracted team member objects with the appropriate field mappings. 
For any fields that aren't explicitly present, make a best guess based on context or leave as null.
Ensure all email addresses have the proper format.
For skills, convert any skill-related information into an array.
`;

            // Update progress
            this.updateProgress(85, 'AI analyzing data...');
            
            // Call Groq API
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert data analyst who specializes in extracting structured information from various data formats.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.2,
                    max_tokens: 4000
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const result = await response.json();
            const aiResponse = result.choices[0].message.content;
            
            // Try to parse the JSON response
            try {
                // Find JSON in the response
                const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || 
                                  aiResponse.match(/```\n([\s\S]*?)\n```/) || 
                                  aiResponse.match(/\[([\s\S]*?)\]/);
                
                let parsedData;
                if (jsonMatch) {
                    parsedData = JSON.parse(jsonMatch[0]);
                } else {
                    // If no JSON markers, try to parse the whole response
                    parsedData = JSON.parse(aiResponse);
                }
                
                // Process the extracted data
                this.processAIExtractedData(parsedData);
            } catch (jsonError) {
                console.error('Error parsing AI response as JSON:', jsonError, aiResponse);
                this.showToast('Error processing AI analysis', 'error');
                this.fallbackToManualMapping(data);
            }
        } catch (error) {
            console.error('Error analyzing with Groq AI:', error);
            this.showToast('Error analyzing with Groq AI', 'error');
            this.fallbackToManualMapping(data);
        }
    }

    processAIExtractedData(extractedData) {
        // Store the processed data
        this.processedImportData = extractedData;
        
        // Update progress
        this.updateProgress(95, 'Analysis complete!');
        
        // Show detected fields
        this.displayDetectedFields(extractedData);
        
        // Show data preview
        this.displayDataPreview(extractedData);
        
        // Enable import button
        const importBtn = document.querySelector('.import-data-btn');
        if (importBtn) {
            importBtn.disabled = false;
        }
    }

    displayDetectedFields(data) {
        if (!data || !data.length) return;
        
        const fieldsContainer = document.querySelector('.detected-fields-container');
        if (!fieldsContainer) return;
        
        // Get sample record
        const sample = data[0];
        
        // Clear container
        fieldsContainer.innerHTML = '';
        
        // Add detected fields
        Object.keys(sample).forEach(field => {
            const fieldElement = document.createElement('div');
            fieldElement.className = 'field-mapping-item';
            fieldElement.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${field}</span>
            `;
            fieldsContainer.appendChild(fieldElement);
        });
        
        // Show AI results section
        const aiResults = document.querySelector('.ai-results');
        if (aiResults) {
            aiResults.classList.remove('hidden');
        }
    }

    displayDataPreview(data) {
        if (!data || !data.length) return;
        
        const previewContainer = document.querySelector('.preview-container');
        const tableContainer = document.querySelector('.preview-table-container');
        
        if (!previewContainer || !tableContainer) return;
        
        // Show preview container
        previewContainer.classList.remove('hidden');
        
        // Get fields from first record
        const fields = Object.keys(data[0]);
        
        // Build table HTML
        let tableHTML = `
            <thead>
                <tr>
                    ${fields.map(field => `<th>${field}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
        `;
        
        // Add first 5 rows (or less if fewer exist)
        const previewRows = Math.min(data.length, 5);
        for (let i = 0; i < previewRows; i++) {
            tableHTML += '<tr>';
            fields.forEach(field => {
                let cellValue = data[i][field];
                
                // Format arrays for display
                if (Array.isArray(cellValue)) {
                    cellValue = cellValue.join(', ');
                }
                
                tableHTML += `<td>${cellValue || ''}</td>`;
            });
            tableHTML += '</tr>';
        }
        
        tableHTML += '</tbody>';
        
        // Set table HTML
        const table = tableContainer.querySelector('.preview-table');
        if (table) {
            table.innerHTML = tableHTML;
        }
    }

    fallbackToManualMapping(data) {
        // If AI analysis fails, we can fall back to simple field mapping based on column names
        this.updateProgress(90, 'Using basic mapping...');
        
        if (!data || !data.length) return;
        
        // Get the first record as sample
        const sample = data[0];
        const mappedData = [];
        
        // Create a normalized mapping of common field names
        const fieldMappings = {
            // Name variations
            name: ['name', 'fullname', 'full name', 'employee name', 'username'],
            email: ['email', 'email address', 'mail', 'e-mail'],
            phone: ['phone', 'phone number', 'telephone', 'contact', 'mobile'],
            department: ['department', 'dept', 'team', 'division', 'group'],
            role: ['role', 'position', 'job title', 'title', 'designation'],
            experienceLevel: ['experience level', 'experience', 'level', 'seniority', 'grade'],
            skills: ['skills', 'skill set', 'abilities', 'competencies', 'expertise'],
            specialization: ['specialization', 'specialty', 'focus area', 'domain', 'expertise area'],
            currentWorkload: ['current workload', 'workload', 'capacity', 'bandwidth', 'availability']
        };
        
        // Process each record
        data.forEach(record => {
            const mappedRecord = {};
            
            // Try to map each field
            Object.keys(fieldMappings).forEach(targetField => {
                // Check all possible variations
                for (const variation of fieldMappings[targetField]) {
                    // Look for case-insensitive match
                    const matchingKey = Object.keys(record).find(
                        key => key.toLowerCase() === variation.toLowerCase()
                    );
                    
                    if (matchingKey) {
                        // Special handling for skills
                        if (targetField === 'skills') {
                            // If it's a string, try to split it into an array
                            if (typeof record[matchingKey] === 'string') {
                                mappedRecord[targetField] = record[matchingKey]
                                    .split(/[,;|]/)
                                    .map(skill => skill.trim())
                                    .filter(skill => skill);
                            } else if (Array.isArray(record[matchingKey])) {
                                mappedRecord[targetField] = record[matchingKey];
                            } else {
                                mappedRecord[targetField] = [];
                            }
                        } else {
                            mappedRecord[targetField] = record[matchingKey];
                        }
                        break;
                    }
                }
            });
            
            // Set defaults for missing fields
            mappedRecord.name = mappedRecord.name || 'Unknown';
            mappedRecord.email = mappedRecord.email || '';
            mappedRecord.phone = mappedRecord.phone || '';
            mappedRecord.department = mappedRecord.department || 'General';
            mappedRecord.role = mappedRecord.role || 'Team Member';
            mappedRecord.experienceLevel = mappedRecord.experienceLevel || 'Mid';
            mappedRecord.skills = mappedRecord.skills || [];
            mappedRecord.specialization = mappedRecord.specialization || '';
            mappedRecord.currentWorkload = mappedRecord.currentWorkload || 'Medium';
            mappedRecord.status = 'Active';
            mappedRecord.joinDate = new Date().toISOString().split('T')[0];
            mappedRecord.lastActivity = new Date().toISOString().split('T')[0];
            
            mappedData.push(mappedRecord);
        });
        
        // Process the mapped data
        this.processAIExtractedData(mappedData);
    }

    importProcessedData() {
        if (!this.processedImportData || !this.processedImportData.length) {
            this.showToast('No data to import', 'error');
            return;
        }
        
        // Update progress
        this.updateProgress(100, 'Importing data...');
        
        // Add each team member
        let importCount = 0;
        let duplicateCount = 0;
        
        this.processedImportData.forEach(member => {
            // Check for required fields
            if (!member.name || !member.email) return;
            
            // Check for duplicate email
            if (this.teamMembers.some(m => m.email.toLowerCase() === member.email.toLowerCase())) {
                duplicateCount++;
                return;
            }
            
            // Prepare new member object
            const newMember = {
                id: Math.max(0, ...this.teamMembers.map(m => m.id)) + 1,
                name: member.name,
                email: member.email,
                phone: member.phone || '',
                department: member.department || 'General',
                role: member.role || 'Team Member',
                experienceLevel: member.experienceLevel || 'Mid',
                skills: Array.isArray(member.skills) ? member.skills : 
                       typeof member.skills === 'string' ? member.skills.split(',').map(s => s.trim()) : [],
                specialization: member.specialization || '',
                currentWorkload: member.currentWorkload || 'Medium',
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0],
                lastActivity: new Date().toISOString().split('T')[0]
            };
            
            // Add to team members
            this.teamMembers.push(newMember);
            importCount++;
        });
        
        // Save to storage and update Google Sheet
        this.saveToStorage();
        this.updateGoogleSheet();
        this.renderMembers();
        
        // Close modal and show toast
        this.closeModal('bulk-import-modal');
        this.resetFileUpload();
        
        if (importCount > 0) {
            this.showToast(`Successfully imported ${importCount} team members`, 'success');
        }
        
        if (duplicateCount > 0) {
            this.showToast(`Skipped ${duplicateCount} duplicate entries`, 'info');
        }
    }

    updateGoogleSheet() {
        // This would be implemented in a real application to update the Google Sheet
        console.log('Updating Google Sheet with team members:', this.teamMembers);
        
        // In a real implementation, you would use the Google Sheets API here
        // For this example, we'll just simulate success
        setTimeout(() => {
            console.log('Google Sheet updated successfully');
        }, 500);
    }

    showUploadProgress() {
        const progressContainer = document.querySelector('.upload-progress-container');
        if (progressContainer) {
            progressContainer.classList.remove('hidden');
        }
    }

    updateProgress(percentage, stage) {
        const progressBar = document.querySelector('.progress-bar');
        const progressPercentage = document.querySelector('.progress-percentage');
        const progressStage = document.querySelector('.progress-stage');
        
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = `${Math.round(percentage)}%`;
        }
        
        if (progressStage) {
            progressStage.textContent = stage;
        }
    }

    resetFileUpload() {
        // Reset file input
        const fileInput = document.getElementById('bulk-import-file');
        if (fileInput) {
            fileInput.value = '';
        }
        
        // Hide file info
        const fileInfo = document.querySelector('.file-info');
        if (fileInfo) {
            fileInfo.classList.add('hidden');
        }
        
        // Show file upload label
        const fileUploadLabel = document.querySelector('.file-upload-label');
        if (fileUploadLabel) {
            fileUploadLabel.style.display = '';
        }
        
        // Hide progress container
        const progressContainer = document.querySelector('.upload-progress-container');
        if (progressContainer) {
            progressContainer.classList.add('hidden');
        }
        
        // Hide AI analysis container
        const aiAnalysisContainer = document.querySelector('.ai-analysis-container');
        if (aiAnalysisContainer) {
            aiAnalysisContainer.classList.add('hidden');
        }
        
        // Hide AI results
        const aiResults = document.querySelector('.ai-results');
        if (aiResults) {
            aiResults.classList.add('hidden');
        }
        
        // Hide preview container
        const previewContainer = document.querySelector('.preview-container');
        if (previewContainer) {
            previewContainer.classList.add('hidden');
        }
        
        // Disable import button
        const importBtn = document.querySelector('.import-data-btn');
        if (importBtn) {
            importBtn.disabled = true;
        }
        
        // Clear data
        this.rawImportData = null;
        this.processedImportData = null;
    }
    
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        }[type] || 'fas fa-info-circle';
        
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
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
    
    // Utility to load external scripts dynamically
    loadScript(url, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        
        script.onload = () => {
            if (callback) callback();
        };
        
        document.head.appendChild(script);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.productivityBeastApp = new ProductivityBeastApp();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    // Ctrl/Cmd + K for quick search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('member-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
}