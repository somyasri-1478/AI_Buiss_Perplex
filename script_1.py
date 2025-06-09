# Create the CSS file
css_content = '''
:root {
  /* Colors */
  --color-background: rgba(252, 252, 249, 1);
  --color-surface: rgba(255, 255, 253, 1);
  --color-text: rgba(19, 52, 59, 1);
  --color-text-secondary: rgba(98, 108, 113, 1);
  --color-primary: rgba(33, 128, 141, 1);
  --color-primary-hover: rgba(29, 116, 128, 1);
  --color-primary-active: rgba(26, 104, 115, 1);
  --color-secondary: rgba(94, 82, 64, 0.12);
  --color-secondary-hover: rgba(94, 82, 64, 0.2);
  --color-secondary-active: rgba(94, 82, 64, 0.25);
  --color-border: rgba(94, 82, 64, 0.2);
  --color-btn-primary-text: rgba(252, 252, 249, 1);
  --color-card-border: rgba(94, 82, 64, 0.12);
  --color-card-border-inner: rgba(94, 82, 64, 0.12);
  --color-error: rgba(192, 21, 47, 1);
  --color-success: rgba(33, 128, 141, 1);
  --color-warning: rgba(168, 75, 47, 1);
  --color-info: rgba(98, 108, 113, 1);
  --color-focus-ring: rgba(33, 128, 141, 0.4);
  --color-select-caret: rgba(19, 52, 59, 0.8);

  /* Common style patterns */
  --focus-ring: 0 0 0 3px var(--color-focus-ring);
  --focus-outline: 2px solid var(--color-primary);
  --status-bg-opacity: 0.15;
  --status-border-opacity: 0.25;
  --select-caret-light: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  --select-caret-dark: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f5f5f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");

  /* RGB versions for opacity control */
  --color-success-rgb: 33, 128, 141;
  --color-error-rgb: 192, 21, 47;
  --color-warning-rgb: 168, 75, 47;
  --color-info-rgb: 98, 108, 113;

  /* Typography */
  --font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-xs: 12px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.2;
  --line-height-base: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-32: 128px;

  /* Borders */
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;
  --border-radius-xl: 12px;
  --border-radius-2xl: 16px;
  --border-radius-full: 9999px;
  --border-width-thin: 1px;
  --border-width-normal: 2px;
  --border-width-thick: 3px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-outline: 0 0 0 3px rgba(66, 153, 225, 0.5);

  /* Z-index levels */
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
  --z-index-toast: 1080;

  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 350ms;
  --transition-timing-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --transition-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --transition-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Utility Classes */
.hidden {
  display: none !important;
}

.text-success {
  color: var(--color-success);
}

.text-error {
  color: var(--color-error);
}

.text-warning {
  color: var(--color-warning);
}

.text-info {
  color: var(--color-info);
}

.text-primary {
  color: var(--color-primary);
}

/* Authentication Page */
.auth-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}

.orb-1 {
  top: -100px;
  right: -100px;
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(33, 128, 141, 0.5), rgba(94, 82, 140, 0.3));
}

.orb-2 {
  bottom: -200px;
  left: -100px;
  width: 800px;
  height: 800px;
  background: linear-gradient(135deg, rgba(94, 82, 140, 0.4), rgba(33, 128, 141, 0.2));
}

.orb-3 {
  top: 50%;
  left: 30%;
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(168, 75, 47, 0.2), rgba(33, 128, 141, 0.1));
}

.auth-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  position: relative;
  z-index: 10;
}

.auth-hero {
  flex: 1;
  max-width: 600px;
  color: var(--color-text);
  padding-right: var(--spacing-10);
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-tight);
}

.hero-subtitle {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-6);
  color: var(--color-primary);
}

.hero-description {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-8);
  color: var(--color-text-secondary);
}

.auth-card {
  flex: 1;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-tabs {
  display: flex;
  margin-bottom: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.auth-tab {
  flex: 1;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-align: center;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal) var(--transition-timing-ease);
}

.auth-tab.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}

.auth-form {
  display: none;
}

.auth-form.active {
  display: block;
}

.form-group {
  margin-bottom: var(--spacing-5);
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
  color: var(--color-text);
}

.form-control {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  transition: border-color var(--transition-fast) var(--transition-timing-ease);
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing-ease);
  text-decoration: none;
}

.btn:hover {
  background-color: var(--color-secondary-hover);
}

.btn:active {
  background-color: var(--color-secondary-active);
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

.btn-primary {
  color: var(--color-btn-primary-text);
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.btn-primary:active {
  background-color: var(--color-primary-active);
  border-color: var(--color-primary-active);
}

.btn-secondary {
  color: var(--color-text);
  background-color: var(--color-secondary);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-secondary-hover);
}

.btn-secondary:active {
  background-color: var(--color-secondary-active);
}

.btn-full {
  width: 100%;
}

.btn i {
  margin-right: var(--spacing-2);
}

.divider {
  display: flex;
  align-items: center;
  margin: var(--spacing-6) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
}

.divider span {
  padding: 0 var(--spacing-4);
}

.social-login {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-3);
}

.btn-social {
  flex: 1;
  padding: var(--spacing-3) var(--spacing-2);
}

/* Dashboard Styles */
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  z-index: 10;
}

.dashboard-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  color: var(--color-btn-primary-text);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.dashboard-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.dashboard-sidebar {
  width: 240px;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  padding: var(--spacing-4) 0;
  overflow-y: auto;
}

.nav-menu {
  list-style: none;
}

.nav-item {
  margin-bottom: var(--spacing-2);
}

.nav-link {
  display: flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  color: var(--color-text);
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all var(--transition-fast) var(--transition-timing-ease);
}

.nav-link:hover {
  background-color: var(--color-secondary-hover);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  border-left-color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.nav-link i {
  margin-right: var(--spacing-3);
  width: 20px;
  text-align: center;
}

.dashboard-main {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
}

.content-section {
  display: none;
}

.content-section.active {
  display: block;
}

.section-header {
  margin-bottom: var(--spacing-6);
}

.section-header h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-2);
}

.section-header p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-16);
  text-align: center;
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  border: 1px dashed var(--color-border);
}

.placeholder-content i {
  font-size: 48px;
  margin-bottom: var(--spacing-6);
  color: var(--color-primary);
}

.placeholder-content h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-4);
}

.placeholder-content p {
  font-size: var(--font-size-base);
  max-width: 500px;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

.card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-6);
  height: 100%;
}

.card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-4);
  color: var(--color-text);
}

.quick-actions .action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3);
}

.progress-stats {
  display: flex;
  justify-content: space-between;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.activity-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-3);
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
}

.activity-item i {
  margin-right: var(--spacing-3);
}

.activity-time {
  margin-left: auto;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Team Management Styles */
.team-controls {
  margin-bottom: var(--spacing-6);
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-6);
  flex-wrap: wrap;
}

.search-filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  flex: 1;
  min-width: 300px;
}

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  left: var(--spacing-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
}

.search-box input {
  width: 100%;
  padding-left: var(--spacing-10);
}

.filter-controls {
  display: flex;
  gap: var(--spacing-3);
  flex-wrap: wrap;
}

.filter-controls select {
  min-width: 160px;
}

.action-controls {
  display: flex;
  gap: var(--spacing-3);
  flex-wrap: wrap;
}

.view-toggle {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.view-toggle button {
  border-radius: 0;
  border: none;
  background-color: var(--color-surface);
}

.view-toggle button.active {
  background-color: var(--color-primary);
  color: var(--color-btn-primary-text);
}

.team-members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

.team-member-card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-6);
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-card-border);
  transition: transform var(--transition-normal) var(--transition-timing-ease), box-shadow var(--transition-normal) var(--transition-timing-ease);
}

.team-member-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.member-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.member-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  color: var(--color-btn-primary-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  margin-right: var(--spacing-4);
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-1);
}

.member-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.member-status {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  font-size: var(--font-size-xs);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-full);
}

.status-active {
  background-color: rgba(var(--color-success-rgb), var(--status-bg-opacity));
  color: var(--color-success);
  border: 1px solid rgba(var(--color-success-rgb), var(--status-border-opacity));
}

.status-inactive {
  background-color: rgba(var(--color-error-rgb), var(--status-bg-opacity));
  color: var(--color-error);
  border: 1px solid rgba(var(--color-error-rgb), var(--status-border-opacity));
}

.status-pending {
  background-color: rgba(var(--color-warning-rgb), var(--status-bg-opacity));
  color: var(--color-warning);
  border: 1px solid rgba(var(--color-warning-rgb), var(--status-border-opacity));
}

.member-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2) var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.detail-item {
  margin-bottom: var(--spacing-2);
}

.detail-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-1);
}

.detail-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.workload-bar {
  height: 4px;
  width: 100%;
  background-color: var(--color-secondary);
  border-radius: var(--border-radius-full);
  margin-top: var(--spacing-1);
  overflow: hidden;
}

.workload-fill {
  height: 100%;
  border-radius: var(--border-radius-full);
}

.workload-high {
  width: 80%;
  background-color: var(--color-error);
}

.workload-medium {
  width: 50%;
  background-color: var(--color-warning);
}

.workload-low {
  width: 20%;
  background-color: var(--color-success);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.skill-tag {
  font-size: var(--font-size-xs);
  padding: var(--spacing-1) var(--spacing-2);
  background-color: var(--color-secondary);
  border-radius: var(--border-radius-full);
  color: var(--color-text);
}

.member-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-card-border-inner);
}

.select-member {
  margin-right: var(--spacing-2);
}

.team-members-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.team-member-row {
  display: flex;
  align-items: center;
  padding: var(--spacing-4);
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-card-border);
  transition: transform var(--transition-normal) var(--transition-timing-ease), box-shadow var(--transition-normal) var(--transition-timing-ease);
}

.team-member-row:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.member-row-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  color: var(--color-btn-primary-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  margin-right: var(--spacing-4);
}

.member-row-info {
  flex: 1;
  display: flex;
  gap: var(--spacing-6);
}

.member-row-primary {
  flex: 1;
}

.member-row-secondary {
  display: flex;
  gap: var(--spacing-6);
  flex: 2;
}

.member-row-actions {
  display: flex;
  gap: var(--spacing-2);
}

.member-row-select {
  margin-right: var(--spacing-4);
}

/* Modals */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-index-modal);
  justify-content: center;
  align-items: center;
  padding: var(--spacing-4);
}

.modal.active {
  display: flex;
}

.modal-content {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.modal-body {
  padding: var(--spacing-6);
}

.form-row {
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-1);
}

.form-row .form-group {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  margin-top: var(--spacing-6);
}

.recipient-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
}

.generated-link {
  margin-top: var(--spacing-6);
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-border);
}

.link-display {
  display: flex;
  gap: var(--spacing-2);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  bottom: var(--spacing-6);
  right: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  z-index: var(--z-index-toast);
}

.toast {
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-lg);
  min-width: 300px;
  max-width: 400px;
  display: flex;
  align-items: center;
  animation: toast-in 0.3s ease-out;
}

.toast.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast.toast-error {
  border-left: 4px solid var(--color-error);
}

.toast.toast-warning {
  border-left: 4px solid var(--color-warning);
}

.toast.toast-info {
  border-left: 4px solid var(--color-info);
}

.toast-icon {
  margin-right: var(--spacing-3);
  font-size: var(--font-size-lg);
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-1);
}

.toast-message {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.toast-close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--font-size-lg);
  margin-left: var(--spacing-2);
}

@keyframes toast-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .auth-content {
    flex-direction: column;
    padding: var(--spacing-4);
  }
  
  .auth-hero {
    max-width: 100%;
    text-align: center;
    padding-right: 0;
    margin-bottom: var(--spacing-10);
  }
  
  .auth-card {
    max-width: 100%;
  }
  
  .controls-row {
    flex-direction: column;
    gap: var(--spacing-4);
  }
  
  .search-filter-group,
  .action-controls {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    flex-direction: column;
  }
  
  .dashboard-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-2) 0;
  }
  
  .nav-menu {
    display: flex;
    overflow-x: auto;
    padding: var(--spacing-2);
  }
  
  .nav-item {
    margin-bottom: 0;
    margin-right: var(--spacing-2);
  }
  
  .nav-link {
    padding: var(--spacing-2) var(--spacing-4);
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .nav-link.active {
    border-left-color: transparent;
    border-bottom-color: var(--color-primary);
  }
  
  .dashboard-main {
    padding: var(--spacing-4);
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column;
    gap: var(--spacing-1);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-xl);
  }
  
  .auth-card {
    padding: var(--spacing-4);
  }
  
  .social-login {
    flex-direction: column;
  }
}
'''

# Save the CSS file
with open('productivity_beast_style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("CSS file created: productivity_beast_style.css")