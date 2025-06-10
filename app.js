// Global Variables
const authContainer = document.getElementById('authContainer');
const dashboard = document.getElementById('dashboard');
const projectsGrid = document.getElementById('projectsGrid');
const projectModal = document.getElementById('projectModal');
const memberSelector = document.getElementById('memberSelector');

let currentUser = null;
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
let currentSection = 'dashboard';

class ProductivityBeast {
    constructor() {
        this.groqAPIKey = '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';
        this.googleSheetId = '1p4BpUlDzCihngl2wIP8LZJakGLylsRPQ2u0-kTa85sk';
        this.inviteLinks = JSON.parse(localStorage.getItem('inviteLinks')) || [];
        this.init();
    }

    init() {
        this.checkAuthState();
        this.renderInitialData();
        this.setupEventListeners();
    }

    // Authentication Methods
    checkAuthState() {
        const user = localStorage.getItem('user');
        if (user) {
            currentUser = JSON.parse(user);
            authContainer.style.display = 'none';
            dashboard.style.display = 'grid';
            this.showSection('dashboard');
        }
    }

    handleAuth(event) {
        event.preventDefault();
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        
        // Simple authentication simulation
        currentUser = { email, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(currentUser));
        
        authContainer.style.display = 'none';
        dashboard.style.display = 'grid';
        this.showSection('dashboard');
    }

    handleLogout() {
        localStorage.removeItem('user');
        currentUser = null;
        authContainer.style.display = 'flex';
        dashboard.style.display = 'none';
    }

    switchTab(tab) {
        document.querySelectorAll('.auth-tabs button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
    }

    // Navigation Methods
    showSection(section) {
        // Hide all sections
        document.querySelectorAll('.content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Remove active class from nav buttons
        document.querySelectorAll('nav button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Add active class to current nav button
        document.querySelector(`[onclick="showSection('${section}')"]`)?.classList.add('active');
        
        currentSection = section;
        
        // Load section-specific content
        switch(section) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'goals':
                this.loadGoalsSection();
                break;
            case 'team':
                this.loadTeamSection();
                break;
            case 'analytics':
                this.loadAnalyticsSection();
                break;
        }
    }

    // Dashboard Methods
    loadDashboard() {
        const dashboardContent = document.getElementById('dashboardSection');
        if (!dashboardContent) {
            this.createDashboardSection();
        }
        
        dashboardContent.innerHTML = `
            <div class="dashboard-overview">
                <h3>Dashboard Overview</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>Active Projects</h4>
                        <p class="stat-number">${projects.filter(p => p.status !== 'completed').length}</p>
                    </div>
                    <div class="stat-card">
                        <h4>Team Members</h4>
                        <p class="stat-number">${teamMembers.length}</p>
                    </div>
                    <div class="stat-card">
                        <h4>Completed Tasks</h4>
                        <p class="stat-number">${this.getCompletedTasksCount()}</p>
                    </div>
                    <div class="stat-card">
                        <h4>Productivity Score</h4>
                        <p class="stat-number">${this.calculateProductivityScore()}%</p>
                    </div>
                </div>
                <div class="recent-activity">
                    <h4>Recent Activity</h4>
                    <div class="activity-list">
                        ${this.getRecentActivity()}
                    </div>
                </div>
            </div>
        `;
    }

    // Goals & Tasks Methods
    loadGoalsSection() {
        this.renderProjects();
        this.renderMemberSelector();
    }

    async handleProjectCreate(event) {
        event.preventDefault();
        
        const projectData = {
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDesc').value,
            deadline: document.getElementById('projectDeadline').value,
            members: Array.from(document.querySelectorAll('.member-item.selected'))
                        .map(item => JSON.parse(item.dataset.member))
        };

        if (!projectData.name || !projectData.description || !projectData.deadline) {
            alert('Please fill all required fields');
            return;
        }

        try {
            // Show loading
            document.querySelector('#projectModal button[type="submit"]').textContent = 'Creating...';
            
            const tasks = await this.generateTasksWithAI(projectData);
            const project = {
                ...projectData,
                id: Date.now().toString(),
                tasks: this.assignTasksToMembers(tasks, projectData.members),
                progress: 0,
                status: 'not-started',
                createdAt: new Date().toISOString()
            };
            
            projects.push(project);
            this.saveProjects();
            this.renderProjects();
            this.closeModal();
            this.sendTaskNotifications(project);
            
            alert('Project created successfully!');
        } catch (error) {
            console.error('Project creation failed:', error);
            alert('Failed to create project. Please try again.');
        } finally {
            document.querySelector('#projectModal button[type="submit"]').textContent = 'Create Project';
        }
    }

    async generateTasksWithAI(projectData) {
        const prompt = `You are a project management AI. Break down the following project into detailed daily tasks:

Project: ${projectData.name}
Description: ${projectData.description}
Deadline: ${projectData.deadline}
Team Members: ${projectData.members.map(m => `${m.name} (Skills: ${m.skills})`).join(', ')}

Create a JSON response with this structure:
{
  "tasks": [
    {
      "title": "Task name",
      "description": "Detailed description",
      "estimatedHours": 8,
      "priority": "high|medium|low",
      "requiredSkills": ["skill1", "skill2"],
      "dependencies": [],
      "subtasks": [
        {
          "title": "Subtask name",
          "description": "Subtask description",
          "estimatedHours": 2
        }
      ]
    }
  ]
}

Generate 5-10 meaningful tasks that cover the entire project scope.`;

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
            
            // Extract JSON from AI response
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]).tasks;
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
                title: 'Project Planning',
                description: 'Define project requirements and create detailed plan',
                estimatedHours: 8,
                priority: 'high',
                requiredSkills: ['planning'],
                subtasks: [
                    { title: 'Requirements gathering', estimatedHours: 4 },
                    { title: 'Timeline creation', estimatedHours: 4 }
                ]
            },
            {
                title: 'Implementation Phase 1',
                description: 'Begin core development work',
                estimatedHours: 16,
                priority: 'high',
                requiredSkills: ['development'],
                subtasks: [
                    { title: 'Setup development environment', estimatedHours: 4 },
                    { title: 'Core feature development', estimatedHours: 12 }
                ]
            },
            {
                title: 'Testing & Quality Assurance',
                description: 'Comprehensive testing of all features',
                estimatedHours: 12,
                priority: 'medium',
                requiredSkills: ['testing'],
                subtasks: [
                    { title: 'Unit testing', estimatedHours: 6 },
                    { title: 'Integration testing', estimatedHours: 6 }
                ]
            }
        ];
    }

    assignTasksToMembers(tasks, members) {
        return tasks.map(task => {
            const bestAssignee = this.findBestAssignee(task, members);
            return {
                ...task,
                assignee: bestAssignee,
                status: 'pending',
                id: Date.now().toString() + Math.random()
            };
        });
    }

    findBestAssignee(task, members) {
        if (!members.length) return null;
        
        return members.reduce((best, member) => {
            const skillMatch = task.requiredSkills?.filter(skill => 
                member.skills.some(memberSkill => 
                    memberSkill.toLowerCase().includes(skill.toLowerCase())
                )
            ).length || 0;
            
            return skillMatch > best.score ? { member, score: skillMatch } : best;
        }, { member: members[0], score: 0 }).member;
    }

    sendTaskNotifications(project) {
        // Simulate email notifications
        project.tasks.forEach(task => {
            if (task.assignee) {
                console.log(`Email sent to ${task.assignee.email}: New task assigned - ${task.title}`);
                // In real implementation, integrate with email service
            }
        });
    }

    renderProjects() {
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" onclick="viewProjectDetails('${project.id}')">
                <div class="status-indicator ${project.status}"></div>
                <h4>${project.name}</h4>
                <p class="project-desc">${project.description}</p>
                <div class="project-meta">
                    <span>Deadline: ${new Date(project.deadline).toLocaleDateString()}</span>
                    <span>Members: ${project.members?.length || 0}</span>
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
    loadTeamSection() {
        const teamSection = document.getElementById('teamSection');
        if (!teamSection) {
            this.createTeamSection();
        }
        
        teamSection.innerHTML = `
            <div class="team-management">
                <div class="team-header">
                    <h3>Team Management</h3>
                    <div class="team-actions">
                        <button onclick="app.showInviteModal()">+ Invite Members</button>
                        <button onclick="app.showBulkImportModal()">📊 AI Bulk Import</button>
                        <button onclick="app.showMessageModal()">💬 Message Team</button>
                    </div>
                </div>
                
                <div class="team-search">
                    <input type="text" placeholder="Search team members..." onkeyup="app.filterTeamMembers(this.value)">
                    <select onchange="app.filterByDepartment(this.value)">
                        <option value="">All Departments</option>
                        ${this.getDepartments().map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                    </select>
                </div>
                
                <div class="team-grid" id="teamGrid">
                    ${this.renderTeamMembers()}
                </div>
            </div>
            
            <!-- Team Management Modals -->
            ${this.createTeamModals()}
        `;
    }

    renderTeamMembers() {
        return teamMembers.map(member => `
            <div class="team-member-card">
                <div class="member-avatar">👤</div>
                <div class="member-info">
                    <h4>${member.name}</h4>
                    <p>${member.email}</p>
                    <p><strong>Department:</strong> ${member.department}</p>
                    <p><strong>Skills:</strong> ${member.skills.join(', ')}</p>
                    <p><strong>Experience:</strong> ${member.experienceLevel}</p>
                    <div class="member-actions">
                        <button onclick="app.editMember('${member.email}')">Edit</button>
                        <button onclick="app.removeMember('${member.email}')">Remove</button>
                        <button onclick="app.messageIndividual('${member.email}')">Message</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async handleBulkImport(file, format) {
        try {
            let data;
            
            switch(format) {
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
                default:
                    throw new Error('Unsupported format');
            }
            
            // Use Groq AI to analyze and structure the data
            const structuredData = await this.analyzeDataWithAI(data);
            
            // Add members after AI processing
            structuredData.forEach(memberData => {
                if (memberData.email && !teamMembers.find(m => m.email === memberData.email)) {
                    teamMembers.push({
                        ...memberData,
                        id: Date.now().toString() + Math.random()
                    });
                }
            });
            
            this.saveTeamMembers();
            this.loadTeamSection();
            this.syncWithGoogleSheets();
            
            alert(`Successfully imported ${structuredData.length} team members!`);
        } catch (error) {
            console.error('Bulk import failed:', error);
            alert('Import failed. Please check your file format.');
        }
    }

    async analyzeDataWithAI(rawData) {
        const prompt = `Analyze this data and extract team member information. Return JSON array with objects containing: name, email, department, skills (array), experienceLevel, phone, specialization.

Data: ${JSON.stringify(rawData.slice(0, 5))}

Return only valid JSON array format.`;

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
            
            // Extract JSON from response
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

    // File parsing methods
    async parseCSV(file) {
        const text = await file.text();
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        }).filter(obj => Object.values(obj).some(val => val));
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
        return JSON.parse(text);
    }

    async parseText(file) {
        const text = await file.text();
        return text.split('\n').map(line => ({ text: line.trim() })).filter(obj => obj.text);
    }

    // Google Sheets Integration
    async syncWithGoogleSheets() {
        try {
            // In a real implementation, you would use Google Sheets API
            console.log('Syncing with Google Sheets:', this.googleSheetId);
            console.log('Team members to sync:', teamMembers);
            
            // Simulate API call
            setTimeout(() => {
                console.log('Google Sheets sync completed');
            }, 1000);
        } catch (error) {
            console.error('Google Sheets sync failed:', error);
        }
    }

    // Utility Methods
    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    saveTeamMembers() {
        localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    }

    getDepartments() {
        return [...new Set(teamMembers.map(m => m.department).filter(Boolean))];
    }

    getCompletedTasksCount() {
        return projects.reduce((count, project) => {
            return count + (project.tasks?.filter(task => task.status === 'completed').length || 0);
        }, 0);
    }

    calculateProductivityScore() {
        if (projects.length === 0) return 0;
        const totalProgress = projects.reduce((sum, project) => sum + this.calculateProjectProgress(project), 0);
        return Math.round(totalProgress / projects.length);
    }

    getRecentActivity() {
        const activities = [
            'New project "Website Redesign" created',
            'Task "Database Setup" completed by John',
            'Team member Sarah added',
            'Project "Mobile App" 80% complete'
        ];
        
        return activities.map(activity => `<div class="activity-item">${activity}</div>`).join('');
    }

    // Modal and UI Methods
    showProjectCreator() {
        this.renderMemberSelector();
        document.getElementById('projectModal').style.display = 'flex';
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    renderMemberSelector() {
        if (!memberSelector) return;
        
        memberSelector.innerHTML = teamMembers.map(member => `
            <div class="member-item" data-member='${JSON.stringify(member)}' onclick="toggleMemberSelection(this)">
                <span class="member-name">${member.name}</span>
                <span class="member-skills">${member.skills.join(', ')}</span>
            </div>
        `).join('');
    }

    // Create missing sections
    createDashboardSection() {
        const main = document.querySelector('.dashboard');
        const section = document.createElement('section');
        section.className = 'content';
        section.id = 'dashboardSection';
        main.appendChild(section);
    }

    createTeamSection() {
        const main = document.querySelector('.dashboard');
        const section = document.createElement('section');
        section.className = 'content';
        section.id = 'teamSection';
        main.appendChild(section);
    }

    createTeamModals() {
        return `
            <!-- Bulk Import Modal -->
            <div class="modal" id="bulkImportModal">
                <div class="modal-content">
                    <span class="close" onclick="app.closeModal()">&times;</span>
                    <h2>AI Bulk Import</h2>
                    <div class="import-options">
                        <button onclick="app.selectImportFormat('csv')">📄 CSV</button>
                        <button onclick="app.selectImportFormat('excel')">📊 Excel</button>
                        <button onclick="app.selectImportFormat('json')">🔧 JSON</button>
                        <button onclick="app.selectImportFormat('text')">📝 Text</button>
                    </div>
                    <div class="file-upload" id="fileUploadArea" style="display:none;">
                        <input type="file" id="importFile" onchange="app.handleFileSelect(event)">
                        <p>Drag and drop your file here or click to browse</p>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Set up any additional event listeners needed
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
    }

    renderInitialData() {
        if (projects.length === 0) {
            // Add sample data
            this.createSampleData();
        }
    }

    createSampleData() {
        // Add sample team members
        if (teamMembers.length === 0) {
            teamMembers = [
                {
                    name: 'John Doe',
                    email: 'john@company.com',
                    department: 'Development',
                    skills: ['JavaScript', 'React', 'Node.js'],
                    experienceLevel: 'Senior',
                    phone: '+1234567890',
                    specialization: 'Full Stack Development'
                },
                {
                    name: 'Sarah Smith',
                    email: 'sarah@company.com',
                    department: 'Design',
                    skills: ['UI/UX', 'Figma', 'Photoshop'],
                    experienceLevel: 'Mid',
                    phone: '+1234567891',
                    specialization: 'UI/UX Design'
                }
            ];
            this.saveTeamMembers();
        }
    }
}

// Global Functions (for HTML onclick handlers)
function handleAuth(event) {
    app.handleAuth(event);
}

function switchTab(tab) {
    app.switchTab(tab);
}

function showSection(section) {
    app.showSection(section);
}

function showProjectCreator() {
    app.showProjectCreator();
}

function closeModal() {
    app.closeModal();
}

function handleProjectCreate(event) {
    app.handleProjectCreate(event);
}

function toggleMemberSelection(element) {
    element.classList.toggle('selected');
}

function viewProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        alert(`Project: ${project.name}\nTasks: ${project.tasks?.length || 0}\nProgress: ${app.calculateProjectProgress(project)}%`);
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

function handleLogout() {
    app.handleLogout();
}

// Initialize Application
const app = new ProductivityBeast();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductivityBeast;
}
