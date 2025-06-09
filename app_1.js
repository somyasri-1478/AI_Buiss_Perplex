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
        
        // Sample data from the provided JSON
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
        
        const bulkImportBtn = document.getElementById('bulk-import-btn');
        if (bulkImportBtn) {
            bulkImportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Bulk import feature coming soon!', 'info');
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