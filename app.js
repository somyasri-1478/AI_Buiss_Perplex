class ProductivityBeast {
    constructor() {
        this.groqAPIKey = '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';
        this.googleSheetId = '1p4BpUlDzCihngl2wIP8LZJakGLylsRPQ2u0-kTa85sk';
        this.currentUser = null;
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
        this.currentSection = 'dashboard';
        this.selectedFormat = null;
        this.init();
    }

    init() {
        this.checkAuthState();
        this.setupEventListeners();
        this.initializeSampleData();
        this.updateStats();
    }

    // Authentication Methods
    checkAuthState() {
        const user = localStorage.getItem('user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showDashboard();
            this.updateUserGreeting();
        }
    }

    handleSignin(event) {
        event.preventDefault();
        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;
        
        if (!email || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }
        
        this.currentUser = { email, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        
        this.showDashboard();
        this.updateUserGreeting();
        this.showToast('Successfully signed in!', 'success');
    }

    handleSignup(event) {
        event.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (!name || !email || !password || !confirmPassword) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showToast('Password must be at least 6 characters', 'error');
            return;
        }
        
        this.currentUser = { email, name };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        
        // Add user as team leader
        this.addTeamMember({
            name: name,
            email: email,
            department: 'Management',
            skills: ['Leadership', 'Project Management'],
            experienceLevel: 'Senior',
            phone: '',
            specialization: 'Team Leadership'
        });
        
        this.showDashboard();
        this.updateUserGreeting();
        this.showToast('Account created successfully!', 'success');
    }

    switchTab(tab) {
        document.querySelectorAll('.auth-tabs button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const signinForm = document.getElementById('signinForm');
        const signupForm = document.getElementById('signupForm');
        
        if (tab === 'signin') {
            document.getElementById('signinTab').classList.add('active');
            signinForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else if (tab === 'signup') {
            document.getElementById('signupTab').classList.add('active');
            signinForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }

    showDashboard() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'grid';
        this.showSection('dashboard');
    }

    updateUserGreeting() {
        const greeting = document.getElementById('userGreeting');
        if (greeting && this.currentUser) {
            greeting.textContent = `Hello, ${this.currentUser.name}!`;
        }
    }

    handleLogout() {
        localStorage.removeItem('user');
        this.currentUser = null;
        document.getElementById('authContainer').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
        this.switchTab('signin');
        this.showToast('Logged out successfully', 'info');
    }

    // Navigation Methods
    showSection(section) {
        document.querySelectorAll('.content-section').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.add('fade-in');
        }
        
        const targetNav = document.querySelector(`[onclick="showSection('${section}')"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }
        
        this.currentSection = section;
        
        // Load section-specific content
        switch(section) {
            case 'dashboard':
                this.updateStats();
                break;
            case 'goals':
                this.renderProjects();
                break;
            case 'team':
                this.renderTeamMembers();
                this.populateFilters();
                break;
        }
    }

    // Project Management Methods
    showProjectCreator() {
        this.populateMemberSelector();
        document.getElementById('projectModal').style.display = 'flex';
    }

    async handleProjectCreate(event) {
        event.preventDefault();
        
        const projectData = {
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDesc').value,
            deadline: document.getElementById('projectDeadline').value,
            members: this.getSelectedMembers()
        };

        if (!projectData.name || !projectData.description || !projectData.deadline) {
            this.showToast('Please fill all required fields', 'error');
            return;
        }

        try {
            const submitBtn = document.querySelector('#projectForm button[type="submit"]');
            submitBtn.textContent = 'Creating...';
            submitBtn.disabled = true;
            
            const tasks = await this.generateTasksWithAI(projectData);
            const project = {
                ...projectData,
                id: Date.now().toString(),
                tasks: this.assignTasksToMembers(tasks, projectData.members),
                progress: 0,
                status: 'not-started',
                createdAt: new Date().toISOString()
            };
            
            this.projects.push(project);
            this.saveProjects();
            this.renderProjects();
            this.closeModal('projectModal');
            this.updateStats();
            this.showToast('Project created successfully!', 'success');
            
        } catch (error) {
            console.error('Project creation failed:', error);
            this.showToast('Failed to create project. Please try again.', 'error');
        } finally {
            const submitBtn = document.querySelector('#projectForm button[type="submit"]');
            submitBtn.textContent = 'Create Project';
            submitBtn.disabled = false;
        }
    }

    async generateTasksWithAI(projectData) {
        const prompt = `Create a detailed project breakdown for: "${projectData.name}"

Description: ${projectData.description}
Deadline: ${projectData.deadline}
Team Members: ${projectData.members.map(m => `${m.name} (${m.skills.join(', ')})`).join(', ')}

Generate 5-8 main tasks with subtasks. Return JSON format:
{
  "tasks": [
    {
      "title": "Task name",
      "description": "Detailed description",
      "estimatedHours": 8,
      "priority": "high",
      "requiredSkills": ["skill1", "skill2"],
      "subtasks": [
        {"title": "Subtask 1", "estimatedHours": 4},
        {"title": "Subtask 2", "estimatedHours": 4}
      ]
    }
  ]
}`;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.groqAPIKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                throw new Error('AI API request failed');
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return parsed.tasks || [];
            }
            
            throw new Error('Invalid AI response format');
        } catch (error) {
            console.error('AI Task Generation Failed:', error);
            return this.generateFallbackTasks(projectData);
        }
    }

    generateFallbackTasks(projectData) {
        return [
            {
                title: 'Project Planning & Setup',
                description: 'Define requirements and create project structure',
                estimatedHours: 16,
                priority: 'high',
                requiredSkills: ['planning', 'analysis'],
                subtasks: [
                    { title: 'Requirements gathering', estimatedHours: 8 },
                    { title: 'Project timeline creation', estimatedHours: 8 }
                ]
            },
            {
                title: 'Development Phase 1',
                description: 'Core implementation and initial features',
                estimatedHours: 40,
                priority: 'high',
                requiredSkills: ['development', 'programming'],
                subtasks: [
                    { title: 'Environment setup', estimatedHours: 8 },
                    { title: 'Core feature development', estimatedHours: 32 }
                ]
            },
            {
                title: 'Testing & Quality Assurance',
                description: 'Comprehensive testing and bug fixes',
                estimatedHours: 24,
                priority: 'medium',
                requiredSkills: ['testing', 'qa'],
                subtasks: [
                    { title: 'Unit testing', estimatedHours: 12 },
                    { title: 'Integration testing', estimatedHours: 12 }
                ]
            }
        ];
    }

    assignTasksToMembers(tasks, members) {
        return tasks.map(task => {
            const assignee = this.findBestAssignee(task, members);
            return {
                ...task,
                assignee: assignee,
                status: 'pending',
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            };
        });
    }

    findBestAssignee(task, members) {
        if (!members || members.length === 0) return null;
        
        const scored = members.map(member => {
            const skillMatch = task.requiredSkills?.filter(skill => 
                member.skills.some(memberSkill => 
                    memberSkill.toLowerCase().includes(skill.toLowerCase())
                )
            ).length || 0;
            
            return { member, score: skillMatch };
        });
        
        const best = scored.reduce((best, current) => 
            current.score > best.score ? current : best
        );
        
        return best.member;
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;
        
        if (this.projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <h4>No projects yet</h4>
                    <p>Create your first project to get started!</p>
                </div>
            `;
            return;
        }
        
        projectsGrid.innerHTML = this.projects.map(project => `
            <div class="project-card" onclick="viewProjectDetails('${project.id}')">
                <div class="status-indicator ${project.status}"></div>
                <h4>${project.name}</h4>
                <p class="project-desc">${project.description}</p>
                <div class="project-meta">
                    <span>Due: ${new Date(project.deadline).toLocaleDateString()}</span>
                    <span>Team: ${project.members?.length || 0} members</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${this.calculateProjectProgress(project)}%"></div>
                </div>
                <div class="progress-text">${this.calculateProjectProgress(project)}% Complete</div>
            </div>
        `).join('');
    }

    calculateProjectProgress(project) {
        if (!project.tasks || project.tasks.length === 0) return 0;
        const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
        return Math.round((completedTasks / project.tasks.length) * 100);
    }

    // Team Management Methods
    addTeamMember(memberData) {
        if (!this.teamMembers.find(m => m.email === memberData.email)) {
            this.teamMembers.push({
                ...memberData,
                id: Date.now().toString(),
                status: 'active',
                joinedAt: new Date().toISOString()
            });
            this.saveTeamMembers();
            this.updateStats();
        }
    }

    renderTeamMembers() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid) return;
        
        if (this.teamMembers.length === 0) {
            teamGrid.innerHTML = `
                <div class="empty-state">
                    <h4>No team members yet</h4>
                    <p>Add team members to get started!</p>
                </div>
            `;
            return;
        }
        
        teamGrid.innerHTML = this.teamMembers.map(member => `
            <div class="team-member-card">
                <div class="member-header">
                    <div class="member-avatar">${member.name.charAt(0).toUpperCase()}</div>
                    <div class="member-info">
                        <h4>${member.name}</h4>
                        <div class="member-email">${member.email}</div>
                    </div>
                </div>
                <div class="member-details">
                    <div class="member-detail">
                        <span>Department:</span>
                        <span>${member.department}</span>
                    </div>
                    <div class="member-detail">
                        <span>Experience:</span>
                        <span>${member.experienceLevel}</span>
                    </div>
                    <div class="member-detail">
                        <span>Phone:</span>
                        <span>${member.phone || 'N/A'}</span>
                    </div>
                </div>
                <div class="member-skills">
                    ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="member-actions">
                    <button onclick="editMember('${member.id}')">Edit</button>
                    <button onclick="removeMember('${member.id}')">Remove</button>
                    <button onclick="messageIndividual('${member.email}')">Message</button>
                </div>
            </div>
        `).join('');
    }

    populateFilters() {
        const departmentFilter = document.getElementById('departmentFilter');
        const departments = [...new Set(this.teamMembers.map(m => m.department))];
        
        if (departmentFilter) {
            departmentFilter.innerHTML = '<option value="">All Departments</option>' +
                departments.map(dept => `<option value="${dept}">${dept}</option>`).join('');
        }
    }

    filterTeamMembers(searchTerm) {
        const members = document.querySelectorAll('.team-member-card');
        members.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
        });
    }

    filterByDepartment(department) {
        const members = document.querySelectorAll('.team-member-card');
        members.forEach(card => {
            if (!department) {
                card.style.display = 'block';
            } else {
                const memberDept = card.querySelector('.member-detail span:last-child').textContent;
                card.style.display = memberDept === department ? 'block' : 'none';
            }
        });
    }

    // Bulk Import Methods
    showBulkImportModal() {
        document.getElementById('bulkImportModal').style.display = 'flex';
        this.resetImportSteps();
    }

    resetImportSteps() {
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        document.getElementById('step1').classList.add('active');
        this.selectedFormat = null;
    }

    selectFormat(format) {
        this.selectedFormat = format;
        document.querySelectorAll('.format-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[onclick="selectFormat('${format}')"]`).classList.add('selected');
        
        setTimeout(() => {
            document.getElementById('step1').classList.remove('active');
            document.getElementById('step2').classList.add('active');
        }, 500);
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file || !this.selectedFormat) return;
        
        this.processFile(file);
    }

    async processFile(file) {
        const progressArea = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressArea.style.display = 'block';
        progressFill.style.width = '0%';
        progressText.textContent = 'Processing file...';
        
        try {
            // Simulate progress
            for (let i = 0; i <= 100; i += 10) {
                progressFill.style.width = i + '%';
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            let data;
            switch(this.selectedFormat) {
                case 'csv':
                    data = await this.parseCSV(file);
                    break;
                case 'excel':
                    data = await this.parseExcel(file);
                    break;
                case 'json':
                    data = await this.parseJSON(file);
                    break;
                case 'text':
                    data = await this.parseText(file);
                    break;
            }
            
            progressText.textContent = 'Analyzing with AI...';
            const structuredData = await this.analyzeDataWithAI(data);
            
            // Add valid members
            let addedCount = 0;
            structuredData.forEach(memberData => {
                if (memberData.email && !this.teamMembers.find(m => m.email === memberData.email)) {
                    this.addTeamMember(memberData);
                    addedCount++;
                }
            });
            
            this.closeModal('bulkImportModal');
            this.renderTeamMembers();
            this.showToast(`Successfully imported ${addedCount} team members!`, 'success');
            
        } catch (error) {
            console.error('Import failed:', error);
            this.showToast('Import failed. Please check your file format.', 'error');
        }
    }

    async parseCSV(file) {
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) throw new Error('Invalid CSV format');
        
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        });
    }

    async parseExcel(file) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    }

    async parseJSON(file) {
        const text = await file.text();
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [data];
    }

    async parseText(file) {
        const text = await file.text();
        return text.split('\n').map(line => ({ text: line.trim() })).filter(obj => obj.text);
    }

    async analyzeDataWithAI(rawData) {
        const prompt = `Analyze this data and extract team member information. Return a JSON array with objects containing: name, email, department, skills (array), experienceLevel, phone, specialization.

Sample data: ${JSON.stringify(rawData.slice(0, 3))}

Return only a valid JSON array format. Extract any relevant information and standardize the format.`;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.groqAPIKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3,
                    max_tokens: 1500
                })
            });

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            throw new Error('Invalid AI response');
        } catch (error) {
            console.error('AI analysis failed:', error);
            return this.fallbackDataParsing(rawData);
        }
    }

    fallbackDataParsing(rawData) {
        return rawData.map((item, index) => ({
            name: item.name || item.Name || `Member ${index + 1}`,
            email: item.email || item.Email || `member${index + 1}@company.com`,
            department: item.department || item.Department || 'General',
            skills: this.parseSkills(item.skills || item.Skills || 'General'),
            experienceLevel: item.experience || item.Experience || 'Mid',
            phone: item.phone || item.Phone || '',
            specialization: item.specialization || item.Specialization || 'General'
        }));
    }

    parseSkills(skillsString) {
        if (Array.isArray(skillsString)) return skillsString;
        return skillsString.split(',').map(s => s.trim()).filter(s => s);
    }

    // Utility Methods
    populateMemberSelector() {
        const selector = document.getElementById('memberSelector');
        if (!selector) return;
        
        selector.innerHTML = this.teamMembers.map(member => `
            <div class="member-item" data-member-id="${member.id}" onclick="toggleMemberSelection(this)">
                <span class="member-name">${member.name}</span>
                <span class="member-skills">${member.skills.join(', ')}</span>
            </div>
        `).join('');
    }

    getSelectedMembers() {
        const selected = document.querySelectorAll('.member-item.selected');
        return Array.from(selected).map(item => {
            const memberId = item.dataset.memberId;
            return this.teamMembers.find(m => m.id === memberId);
        }).filter(Boolean);
    }

    updateStats() {
        document.getElementById('activeProjects').textContent = 
            this.projects.filter(p => p.status !== 'completed').length;
        document.getElementById('teamCount').textContent = this.teamMembers.length;
        document.getElementById('completedTasks').textContent = this.getCompletedTasksCount();
        document.getElementById('productivityScore').textContent = this.calculateProductivityScore() + '%';
    }

    getCompletedTasksCount() {
        return this.projects.reduce((count, project) => {
            return count + (project.tasks?.filter(task => task.status === 'completed').length || 0);
        }, 0);
    }

    calculateProductivityScore() {
        if (this.projects.length === 0) return 0;
        const totalProgress = this.projects.reduce((sum, project) => 
            sum + this.calculateProjectProgress(project), 0);
        return Math.round(totalProgress / this.projects.length);
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    }

    setupEventListeners() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
    }

    initializeSampleData() {
        if (this.teamMembers.length === 0) {
            const sampleMembers = [
                {
                    name: 'John Smith',
                    email: 'john.smith@company.com',
                    department: 'Development',
                    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                    experienceLevel: 'Senior',
                    phone: '+1-555-0101',
                    specialization: 'Full Stack Development'
                },
                {
                    name: 'Sarah Johnson',
                    email: 'sarah.johnson@company.com',
                    department: 'Design',
                    skills: ['UI/UX', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
                    experienceLevel: 'Mid',
                    phone: '+1-555-0102',
                    specialization: 'User Experience Design'
                },
                {
                    name: 'Mike Chen',
                    email: 'mike.chen@company.com',
                    department: 'Marketing',
                    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
                    experienceLevel: 'Senior',
                    phone: '+1-555-0103',
                    specialization: 'Digital Marketing Strategy'
                }
            ];
            
            sampleMembers.forEach(member => this.addTeamMember(member));
        }
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    saveTeamMembers() {
        localStorage.setItem('teamMembers', JSON.stringify(this.teamMembers));
    }
}

// Global Functions for HTML Event Handlers
function handleSignin(event) {
    window.productivityBeast.handleSignin(event);
}

function handleSignup(event) {
    window.productivityBeast.handleSignup(event);
}

function switchTab(tab) {
    window.productivityBeast.switchTab(tab);
}

function showSection(section) {
    window.productivityBeast.showSection(section);
}

function showProjectCreator() {
    window.productivityBeast.showProjectCreator();
}

function handleProjectCreate(event) {
    window.productivityBeast.handleProjectCreate(event);
}

function closeModal(modalId) {
    window.productivityBeast.closeModal(modalId);
}

function toggleMemberSelection(element) {
    element.classList.toggle('selected');
}

function viewProjectDetails(projectId) {
    const project = window.productivityBeast.projects.find(p => p.id === projectId);
    if (project) {
        alert(`Project: ${project.name}\nDescription: ${project.description}\nTasks: ${project.tasks?.length || 0}\nProgress: ${window.productivityBeast.calculateProjectProgress(project)}%`);
    }
}

function toggleUserMenu() {
    window.productivityBeast.toggleUserMenu();
}

function handleLogout() {
    window.productivityBeast.handleLogout();
}

function showBulkImportModal() {
    window.productivityBeast.showBulkImportModal();
}

function selectFormat(format) {
    window.productivityBeast.selectFormat(format);
}

function handleFileSelect(event) {
    window.productivityBeast.handleFileSelect(event);
}

function filterTeamMembers(searchTerm) {
    window.productivityBeast.filterTeamMembers(searchTerm);
}

function filterByDepartment(department) {
    window.productivityBeast.filterByDepartment(department);
}

function filterByExperience(experience) {
    const members = document.querySelectorAll('.team-member-card');
    members.forEach(card => {
        if (!experience) {
            card.style.display = 'block';
        } else {
            const memberExp = card.querySelector('.member-detail:nth-child(2) span:last-child').textContent;
            card.style.display = memberExp === experience ? 'block' : 'none';
        }
    });
}

function editMember(memberId) {
    alert('Edit member functionality - Coming soon!');
}

function removeMember(memberId) {
    if (confirm('Are you sure you want to remove this team member?')) {
        const index = window.productivityBeast.teamMembers.findIndex(m => m.id === memberId);
        if (index > -1) {
            window.productivityBeast.teamMembers.splice(index, 1);
            window.productivityBeast.saveTeamMembers();
            window.productivityBeast.renderTeamMembers();
            window.productivityBeast.updateStats();
            window.productivityBeast.showToast('Team member removed successfully', 'success');
        }
    }
}

function messageIndividual(email) {
    const message = prompt(`Send message to ${email}:`);
    if (message) {
        console.log(`Message sent to ${email}: ${message}`);
        window.productivityBeast.showToast('Message sent successfully!', 'success');
    }
}

function showInviteModal() {
    alert('Invite functionality - Coming soon!');
}

function showMessageModal() {
    alert('Team messaging functionality - Coming soon!');
}

// Initialize Application
window.productivityBeast = new ProductivityBeast();

console.log('Productivity Beast application loaded successfully!');
