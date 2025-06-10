# Let's generate the necessary JavaScript code for bulk import with Groq AI integration

# First, let's create the HTML for the bulk import modal
bulk_import_modal_html = '''
<!-- Bulk Import Modal -->
<div id="bulk-import-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Bulk Import Team Members</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <div class="import-options">
                <h4>Select File Format</h4>
                <div class="file-format-options">
                    <button class="file-format-btn active" data-format="csv">
                        <i class="fas fa-file-csv"></i>
                        <span>CSV</span>
                    </button>
                    <button class="file-format-btn" data-format="excel">
                        <i class="fas fa-file-excel"></i>
                        <span>Excel</span>
                    </button>
                    <button class="file-format-btn" data-format="json">
                        <i class="fas fa-file-code"></i>
                        <span>JSON</span>
                    </button>
                    <button class="file-format-btn" data-format="text">
                        <i class="fas fa-file-alt"></i>
                        <span>Text</span>
                    </button>
                </div>
                
                <div class="form-group mt-16">
                    <label class="form-label">Upload File</label>
                    <div class="file-upload-container">
                        <input type="file" id="bulk-import-file" class="file-input" accept=".csv,.xlsx,.xls,.json,.txt">
                        <label for="bulk-import-file" class="file-upload-label">
                            <i class="fas fa-upload"></i>
                            <span>Choose file or drag and drop</span>
                        </label>
                        <div class="file-info hidden">
                            <span class="file-name"></span>
                            <button class="btn btn--sm btn--outline remove-file-btn">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="upload-progress-container hidden">
                    <label class="form-label">Processing File</label>
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="progress-status">
                        <span class="progress-percentage">0%</span>
                        <span class="progress-stage">Uploading...</span>
                    </div>
                </div>
                
                <div class="ai-analysis-container hidden">
                    <h4>AI Analysis</h4>
                    <p class="ai-status">Using Groq AI to automatically extract team member information...</p>
                    <div class="ai-results hidden">
                        <div class="form-group">
                            <label class="form-label">Detected Fields</label>
                            <div class="detected-fields-container">
                                <!-- Detected fields will be inserted here -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="preview-container hidden">
                    <h4>Data Preview</h4>
                    <div class="preview-table-container">
                        <table class="preview-table">
                            <!-- Preview table will be inserted here -->
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="form-actions mt-16">
                <button class="btn btn--secondary cancel-import-btn">Cancel</button>
                <button class="btn btn--primary import-data-btn" disabled>Import Data</button>
            </div>
        </div>
    </div>
</div>
'''

# Now, let's create the CSS for the bulk import functionality
bulk_import_css = '''
/* Bulk Import Modal Styles */
.import-options {
  margin-bottom: var(--space-16);
}

.file-format-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  margin-top: var(--space-12);
}

.file-format-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-16);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
  width: calc(25% - var(--space-6));
  text-align: center;
}

.file-format-btn i {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-8);
  color: var(--color-text-secondary);
}

.file-format-btn span {
  font-size: var(--font-size-sm);
}

.file-format-btn:hover {
  background: var(--color-secondary);
  transform: translateY(-2px);
}

.file-format-btn.active {
  background: var(--color-primary);
  color: var(--color-surface);
  border-color: var(--color-primary);
}

.file-format-btn.active i {
  color: var(--color-surface);
}

.file-upload-container {
  position: relative;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-base);
  padding: var(--space-20);
  text-align: center;
  transition: all var(--duration-fast) var(--ease-standard);
}

.file-upload-container:hover {
  border-color: var(--color-primary);
}

.file-upload-container.dragover {
  background: rgba(var(--color-primary-rgb), 0.05);
  border-color: var(--color-primary);
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  cursor: pointer;
}

.file-upload-label i {
  font-size: var(--font-size-2xl);
  color: var(--color-text-secondary);
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  margin-top: var(--space-12);
}

.file-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.upload-progress-container {
  margin-top: var(--space-20);
}

.progress-bar-container {
  height: 8px;
  background: var(--color-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--color-primary);
  width: 0%;
  transition: width 0.3s ease;
}

.progress-status {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  margin-top: var(--space-4);
  color: var(--color-text-secondary);
}

.ai-analysis-container {
  margin-top: var(--space-20);
  padding: var(--space-16);
  background: var(--color-secondary);
  border-radius: var(--radius-base);
}

.ai-status {
  font-size: var(--font-size-sm);
  margin: var(--space-8) 0;
  color: var(--color-text-secondary);
}

.detected-fields-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-8);
  margin-top: var(--space-8);
}

.field-mapping-item {
  display: flex;
  align-items: center;
  padding: var(--space-8) var(--space-12);
  background: var(--color-surface);
  border-radius: var(--radius-base);
  border: 1px solid var(--color-border);
}

.field-mapping-item i {
  margin-right: var(--space-8);
  color: var(--color-success);
}

.preview-container {
  margin-top: var(--space-20);
}

.preview-table-container {
  max-height: 300px;
  overflow-y: auto;
  margin-top: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
}

.preview-table th, 
.preview-table td {
  padding: var(--space-8) var(--space-12);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
}

.preview-table th {
  background: var(--color-secondary);
  font-weight: var(--font-weight-semibold);
  position: sticky;
  top: 0;
  z-index: 1;
}

.preview-table tr:nth-child(even) {
  background: rgba(var(--color-secondary-rgb), 0.3);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-12);
}

.mt-16 {
  margin-top: var(--space-16);
}

/* Animation for AI processing */
.ai-processing {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}

.ai-processing:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 0;
  box-sizing: border-box;
  border: 10px solid var(--color-primary);
  border-color: var(--color-primary) transparent var(--color-primary) transparent;
  animation: ai-processing 1.2s infinite;
}

@keyframes ai-processing {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
'''

# Now, let's create the JavaScript code for handling bulk import functionality
bulk_import_js = '''
// Bulk Import Feature
// This extends the ProductivityBeastApp class with bulk import functionality

// Add these methods to the ProductivityBeastApp class
    
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
            const lines = csvContent.split('\\n');
            
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
                'Authorization': `Bearer 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#notyourType`
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
'''

# Create the updated setupEventListeners method with bulk import support
updated_setup_event_listeners = '''
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
'''

# Update the constructor to initialize the bulk import fields
updated_constructor = '''
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
        // Other team members...
    ];
    
    this.departments = ["Engineering", "Marketing", "Sales", "HR", "Design"];
    this.experienceLevels = ["Junior", "Mid", "Senior", "Lead"];
    this.messageTemplates = [
        {
            "name": "Meeting Reminder",
            "subject": "Upcoming Team Meeting",
            "body": "Hi everyone,\\n\\nJust a friendly reminder about our team meeting scheduled for [DATE] at [TIME]. Please review the agenda beforehand.\\n\\nBest regards,\\nTeam Lead"
        },
        {
            "name": "Deadline Notification",
            "subject": "Project Deadline Approaching",
            "body": "Hello team,\\n\\nThis is a reminder that the deadline for [PROJECT_NAME] is approaching on [DATE]. Please ensure all deliverables are submitted on time.\\n\\nThanks,\\nManagement"
        },
        {
            "name": "Welcome Message",
            "subject": "Welcome to the Team!",
            "body": "Welcome to Productivity Beast!\\n\\nWe're excited to have you join our team. Please don't hesitate to reach out if you have any questions.\\n\\nBest regards,\\nTeam Lead"
        }
    ];
    
    this.init();
}
'''

# Now, let's print out the changes needed to be made to the index.html file
index_changes = '''
<!-- Add this inside the body, after the existing modals -->
''' + bulk_import_modal_html

# Let's generate the modified setupBulkImportBtn
modified_bulkimportbtn = '''
const bulkImportBtn = document.getElementById('bulk-import-btn');
if (bulkImportBtn) {
    bulkImportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal('bulk-import-modal');
    });
}
'''

print("# Productivity Beast Enhancement: AI-Powered Bulk Import\n")
print("## 1. HTML Changes")
print("Add the following HTML to the index.html file, just before the closing body tag:</body>:")
print(bulk_import_modal_html)

print("\n## 2. CSS Changes")
print("Add the following CSS to the style.css file, at the end:")
print(bulk_import_css)

print("\n## 3. JavaScript Changes")
print("Add the following methods to the ProductivityBeastApp class in app.js:")
print(bulk_import_js)

print("\n## 4. Updates to Existing Functions")
print("Replace the existing setupEventListeners method with:")
print(updated_setup_event_listeners)

print("\n## 5. Constructor Updates")
print("Update the beginning of the constructor method with:")
print(updated_constructor)
