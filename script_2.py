# Create the JavaScript file
js_content = '''// Application State
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
        
        this.messageTemplates = {
            meeting: {
                subject: "Upcoming Team Meeting",
                body: "Hi everyone,\n\nJust a friendly reminder about our team meeting scheduled for [DATE] at [TIME]. Please review the agenda beforehand.\n\nBest regards,\nTeam Lead"
            },
            deadline: {
                subject: "Project Deadline Approaching",
                body: "Hello team,\n\nThis is a reminder that the deadline for [PROJECT_NAME] is approaching on [DATE]. Please ensure all deliverables are submitted on time.\n\nThanks,\nManagement"
            },
            welcome: {
                subject: "Welcome to the Team!",
                body: "Welcome to Productivity Beast!\n\nWe're excited to have you join our team. Please don't hesitate to reach out if you have any questions.\n\nBest regards,\nTeam Lead"
            }
        };
        
        // Initialize the application
        this.init();
    }
    
    // Initialize the application
    init() {
        // Set event listeners for auth tabs
        const authTabs = document.querySelectorAll('.auth-tab');
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchAuthTab(tabId);
            });
        });
        
        // Set event listeners for auth forms
        const authForms = document.querySelectorAll('.auth-form form');
        authForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuth(e);
            });
        });
        
        // Set event listeners for nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.switchSection(section);
            });
        });
        
        // Check if user is already logged in
        this.checkAuth();
        
        // Render team members
        this.renderTeamMembers();
    }
    
    // Switch between auth tabs
    switchAuthTab(tabId) {
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');
        
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            }
        });
        
        forms.forEach(form => {
            form.classList.remove('active');
        });
        
        document.getElementById(`${tabId}-form`).classList.add('active');
    }
    
    // Handle authentication
    handleAuth(e) {
        e.preventDefault();
        
        // Simulate authentication (in a real app, this would connect to a backend)
        this.currentUser = {
            name: 'Team Leader',
            email: 'leader@company.com',
            role: 'Admin'
        };
        
        // Save user info to localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Show dashboard
        this.showDashboard();
        
        // Show success notification
        this.showToast('Success', 'You have successfully logged in!', 'success');
    }
    
    // Check if user is already authenticated
    checkAuth() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        }
    }
    
    // Show dashboard and hide auth page
    showDashboard() {
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    }
    
    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('auth-page').classList.remove('hidden');
        this.showToast('Success', 'You have been logged out!', 'info');
    }
    
    // Switch between dashboard sections
    switchSection(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(`${sectionId}-section`).classList.add('active');
    }
    
    // Show toast notification
    showToast(title, message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle text-success toast-icon"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle text-error toast-icon"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle text-warning toast-icon"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle text-info toast-icon"></i>';
        }
        
        toast.innerHTML = `
            ${icon}
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Add event listener to close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto-remove toast after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
    
    // Show modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    }
    
    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }
    
    // Show add member modal
    showAddMemberModal() {
        this.showModal('add-member-modal');
    }
    
    // Show invite link modal
    showInviteLinkModal() {
        this.showModal('invite-link-modal');
        document.getElementById('generated-link-container').classList.add('hidden');
    }
    
    // Show message modal
    showMessageModal() {
        this.showModal('message-modal');
        document.getElementById('department-selector').classList.add('hidden');
        
        // If members are selected, select the "Selected Members" option
        if (this.selectedMembers.size > 0) {
            document.querySelector('input[name="recipients"][value="selected"]').checked = true;
        } else {
            document.querySelector('input[name="recipients"][value="all"]').checked = true;
        }
    }
    
    // Add a new team member
    addMember(event) {
        event.preventDefault();
        
        const form = document.getElementById('add-member-form');
        const formData = new FormData(form);
        
        // Check for duplicate email
        const email = formData.get('email');
        const isDuplicate = this.teamMembers.some(member => member.email === email);
        
        if (isDuplicate) {
            this.showToast('Error', 'A team member with this email already exists!', 'error');
            return;
        }
        
        // Create new member object
        const newMember = {
            id: this.teamMembers.length + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            department: formData.get('department'),
            role: formData.get('role'),
            experienceLevel: formData.get('experienceLevel'),
            skills: formData.get('skills') ? formData.get('skills').split(',').map(skill => skill.trim()) : [],
            specialization: formData.get('specialization') || '',
            currentWorkload: 'Low',
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            lastActivity: new Date().toISOString().split('T')[0]
        };
        
        // Add to team members
        this.teamMembers.push(newMember);
        
        // Update Google Sheet (simulated)
        this.updateGoogleSheet('add', newMember);
        
        // Re-render team members
        this.renderTeamMembers();
        
        // Close modal and reset form
        form.reset();
        this.closeModal('add-member-modal');
        
        // Show success notification
        this.showToast('Success', `${newMember.name} has been added to the team!`, 'success');
    }
    
    // Generate invite link
    generateInviteLink() {
        const role = document.getElementById('invite-role-select').value;
        const expiry = document.getElementById('invite-expiry-select').value;
        
        // Generate a unique ID (would be more secure in a real app)
        const uniqueId = Math.random().toString(36).substring(2, 15);
        
        // Create invite link
        const inviteLink = `https://productivitybeast.com/join?invite=${uniqueId}&role=${role}&expiry=${expiry}`;
        
        // Display the link
        const linkContainer = document.getElementById('generated-link-container');
        const linkInput = document.getElementById('generated-link');
        
        linkInput.value = inviteLink;
        linkContainer.classList.remove('hidden');
        
        // Show success notification
        this.showToast('Success', 'Invite link generated successfully!', 'success');
        
        // Simulate API call to store the invite link
        console.log('Invite link created:', { inviteLink, role, expiry });
    }
    
    // Copy invite link to clipboard
    copyInviteLink() {
        const linkInput = document.getElementById('generated-link');
        linkInput.select();
        document.execCommand('copy');
        
        this.showToast('Success', 'Invite link copied to clipboard!', 'success');
    }
    
    // Update recipients in message modal
    updateRecipients(value) {
        const departmentSelector = document.getElementById('department-selector');
        
        if (value === 'department') {
            departmentSelector.classList.remove('hidden');
        } else {
            departmentSelector.classList.add('hidden');
        }
    }
    
    // Load message template
    loadMessageTemplate(value) {
        if (!value) return;
        
        const template = this.messageTemplates[value];
        if (template) {
            document.getElementById('message-subject').value = template.subject;
            document.getElementById('message-body').value = template.body;
        }
    }
    
    // Send message to team members
    sendMessage() {
        const recipientType = document.querySelector('input[name="recipients"]:checked').value;
        const platform = document.getElementById('message-platform-select').value;
        const subject = document.getElementById('message-subject').value;
        const body = document.getElementById('message-body').value;
        
        // Validate inputs
        if (!subject || !body) {
            this.showToast('Error', 'Please enter both subject and message body!', 'error');
            return;
        }
        
        // Determine recipients
        let recipients = [];
        
        switch (recipientType) {
            case 'all':
                recipients = this.teamMembers.map(member => member.email);
                break;
                
            case 'selected':
                if (this.selectedMembers.size === 0) {
                    this.showToast('Error', 'No team members selected!', 'error');
                    return;
                }
                
                recipients = Array.from(this.selectedMembers).map(id => {
                    const member = this.teamMembers.find(m => m.id === id);
                    return member ? member.email : null;
                }).filter(Boolean);
                break;
                
            case 'department':
                const department = document.getElementById('message-department-select').value;
                if (!department) {
                    this.showToast('Error', 'Please select a department!', 'error');
                    return;
                }
                
                recipients = this.teamMembers
                    .filter(member => member.department === department)
                    .map(member => member.email);
                break;
        }
        
        // Simulate sending message
        console.log('Sending message:', {
            platform,
            recipients,
            subject,
            body
        });
        
        // Prepare platform-specific URLs (in a real app, these would use proper APIs)
        let platformUrl = '';
        
        switch (platform) {
            case 'gmail':
                platformUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients.join(',')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                break;
                
            case 'whatsapp':
                // WhatsApp Web can only open chats one at a time, so we'll just use the first recipient
                const firstPhone = this.teamMembers.find(m => m.email === recipients[0])?.phone;
                if (firstPhone) {
                    platformUrl = `https://web.whatsapp.com/send?phone=${encodeURIComponent(firstPhone)}&text=${encodeURIComponent(body)}`;
                }
                break;
                
            case 'slack':
                // This would typically use Slack's API in a real app
                platformUrl = `https://slack.com/app_redirect?channel=general`;
                break;
                
            case 'teams':
                // This would typically use Microsoft Teams' API in a real app
                platformUrl = `https://teams.microsoft.com/_`;
                break;
        }
        
        // In a real app, we'd use proper APIs for each platform
        // For demo purposes, we'll just open a new tab with the constructed URL for Gmail
        if (platform === 'gmail' && platformUrl) {
            window.open(platformUrl, '_blank');
        }
        
        // Close modal
        this.closeModal('message-modal');
        
        // Show success notification
        this.showToast('Success', `Message sent to ${recipients.length} recipient(s) via ${platform}!`, 'success');
    }
    
    // Set view mode (grid or list)
    setView(view) {
        this.currentView = view;
        this.renderTeamMembers();
    }
    
    // Search team members
    searchMembers(term) {
        this.searchTerm = term.toLowerCase();
        this.renderTeamMembers();
    }
    
    // Filter by department
    filterByDepartment(department) {
        this.filters.department = department;
        this.renderTeamMembers();
    }
    
    // Filter by experience level
    filterByExperience(experience) {
        this.filters.experience = experience;
        this.renderTeamMembers();
    }
    
    // Filter by status
    filterByStatus(status) {
        this.filters.status = status;
        this.renderTeamMembers();
    }
    
    // Toggle member selection
    toggleMemberSelection(id) {
        if (this.selectedMembers.has(id)) {
            this.selectedMembers.delete(id);
        } else {
            this.selectedMembers.add(id);
        }
        
        // Update checkboxes
        document.querySelectorAll(`.select-member[data-id="${id}"]`).forEach(checkbox => {
            checkbox.checked = this.selectedMembers.has(id);
        });
    }
    
    // Delete team member
    deleteMember(id) {
        // Find member
        const memberIndex = this.teamMembers.findIndex(member => member.id === id);
        if (memberIndex === -1) return;
        
        const member = this.teamMembers[memberIndex];
        
        // Confirm deletion
        if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
            // Update Google Sheet (simulated)
            this.updateGoogleSheet('delete', member);
            
            // Remove from team members
            this.teamMembers.splice(memberIndex, 1);
            
            // Remove from selected members
            this.selectedMembers.delete(id);
            
            // Re-render team members
            this.renderTeamMembers();
            
            // Show success notification
            this.showToast('Success', `${member.name} has been removed from the team!`, 'success');
        }
    }
    
    // Update Google Sheet (simulated)
    updateGoogleSheet(action, member) {
        // In a real app, this would make an API call to update the Google Sheet
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1p4BpUlDzCihngl2wIP8LZJakGLylsRPQ2u0-kTa85sk/edit?usp=sharing';
        
        console.log(`Google Sheet Update (${sheetUrl}):`, {
            action,
            member,
            timestamp: new Date().toISOString()
        });
        
        // Simulate API call delay
        setTimeout(() => {
            console.log(`Google Sheet ${action} operation completed.`);
        }, 500);
    }
    
    // Render team members
    renderTeamMembers() {
        const container = document.getElementById('team-members-container');
        
        // Filter members based on search and filters
        const filteredMembers = this.teamMembers.filter(member => {
            // Search filter
            if (this.searchTerm) {
                const searchFields = [
                    member.name,
                    member.email,
                    member.department,
                    member.role,
                    member.specialization,
                    ...member.skills
                ].map(field => String(field).toLowerCase());
                
                if (!searchFields.some(field => field.includes(this.searchTerm))) {
                    return false;
                }
            }
            
            // Department filter
            if (this.filters.department && member.department !== this.filters.department) {
                return false;
            }
            
            // Experience filter
            if (this.filters.experience && member.experienceLevel !== this.filters.experience) {
                return false;
            }
            
            // Status filter
            if (this.filters.status && member.status !== this.filters.status) {
                return false;
            }
            
            return true;
        });
        
        // Clear container
        container.innerHTML = '';
        
        // Update container class based on view
        container.className = this.currentView === 'grid' ? 'team-members-grid' : 'team-members-list';
        
        // Check if no results
        if (filteredMembers.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No team members found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
            return;
        }
        
        // Render members based on current view
        filteredMembers.forEach(member => {
            if (this.currentView === 'grid') {
                container.appendChild(this.createMemberCard(member));
            } else {
                container.appendChild(this.createMemberRow(member));
            }
        });
    }
    
    // Create a member card for grid view
    createMemberCard(member) {
        const card = document.createElement('div');
        card.className = 'team-member-card';
        
        // Generate initials for avatar
        const initials = member.name.split(' ').map(n => n[0]).join('');
        
        // Generate status class
        const statusClass = `status-${member.status.toLowerCase()}`;
        
        // Generate workload class
        const workloadClass = `workload-${member.currentWorkload.toLowerCase()}`;
        
        // Generate skills HTML
        const skillsHtml = member.skills.map(skill => `
            <span class="skill-tag">${skill}</span>
        `).join('');
        
        card.innerHTML = `
            <div class="member-status ${statusClass}">${member.status}</div>
            <div class="member-header">
                <div class="member-avatar">${initials}</div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <div class="member-role">${member.role}</div>
                </div>
            </div>
            
            <div class="member-details">
                <div class="detail-item">
                    <div class="detail-label">Department</div>
                    <div class="detail-value">${member.department}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Experience</div>
                    <div class="detail-value">${member.experienceLevel}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${member.email}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">${member.phone}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Specialization</div>
                    <div class="detail-value">${member.specialization}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Workload</div>
                    <div class="detail-value">
                        ${member.currentWorkload}
                        <div class="workload-bar">
                            <div class="workload-fill ${workloadClass}"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="skills-list">
                ${skillsHtml}
            </div>
            
            <div class="member-actions">
                <label class="select-member-label">
                    <input type="checkbox" class="select-member" data-id="${member.id}" ${this.selectedMembers.has(member.id) ? 'checked' : ''}>
                    Select
                </label>
                <div>
                    <button class="btn btn-sm btn-secondary" onclick="app.showMessageModal()">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="app.deleteMember(${member.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener to checkbox
        card.querySelector('.select-member').addEventListener('change', (e) => {
            this.toggleMemberSelection(member.id);
        });
        
        return card;
    }
    
    // Create a member row for list view
    createMemberRow(member) {
        const row = document.createElement('div');
        row.className = 'team-member-row';
        
        // Generate initials for avatar
        const initials = member.name.split(' ').map(n => n[0]).join('');
        
        // Generate status class
        const statusClass = `status-${member.status.toLowerCase()}`;
        
        row.innerHTML = `
            <label class="member-row-select">
                <input type="checkbox" class="select-member" data-id="${member.id}" ${this.selectedMembers.has(member.id) ? 'checked' : ''}>
            </label>
            <div class="member-row-avatar">${initials}</div>
            <div class="member-row-info">
                <div class="member-row-primary">
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                </div>
                <div class="member-row-secondary">
                    <div>
                        <div class="detail-label">Department</div>
                        <div class="detail-value">${member.department}</div>
                    </div>
                    <div>
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${member.email}</div>
                    </div>
                    <div>
                        <div class="detail-label">Workload</div>
                        <div class="detail-value">${member.currentWorkload}</div>
                    </div>
                    <div>
                        <span class="member-status ${statusClass}">${member.status}</span>
                    </div>
                </div>
            </div>
            <div class="member-row-actions">
                <button class="btn btn-sm btn-secondary" onclick="app.showMessageModal()">
                    <i class="fas fa-envelope"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="app.deleteMember(${member.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listener to checkbox
        row.querySelector('.select-member').addEventListener('change', (e) => {
            this.toggleMemberSelection(member.id);
        });
        
        return row;
    }
}

// Initialize the application
const app = new ProductivityBeastApp();
'''

# Save the JavaScript file
with open('productivity_beast_app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("JavaScript file created: productivity_beast_app.js")

# Create a zip file containing all the code files
import zipfile

with zipfile.ZipFile('productivity_beast_complete_code.zip', 'w') as zipf:
    zipf.write('productivity_beast_index.html', arcname='index.html')
    zipf.write('productivity_beast_style.css', arcname='style.css')
    zipf.write('productivity_beast_app.js', arcname='app.js')

print("All files have been zipped to: productivity_beast_complete_code.zip")