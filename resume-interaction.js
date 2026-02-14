/**
 * RESUME INTERACTION SCRIPT
 * Handles loading screen, info panel displays, and user interactions
 */

class ResumeInteraction {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.infoOverlay = document.getElementById('info-overlay');
    this.panelTitle = document.getElementById('panel-title');
    this.panelContent = document.getElementById('panel-content');
    this.closeBtn = document.querySelector('.close-btn');
    this.startBtn = document.querySelector('.start-btn');
    this.progressSpan = document.getElementById('progressPercentage');
    
    this.currentZone = null;
    this.progress = 0;
    this.setupEventListeners();
    this.simulateLoading();
  }

  setupEventListeners() {
    // Close panel when clicking close button
    this.closeBtn?.addEventListener('click', () => this.closePanel());
    
    // Close panel when clicking outside
    this.infoOverlay?.addEventListener('click', (e) => {
      if (e.target === this.infoOverlay) {
        this.closePanel();
      }
    });

    // Start button
    this.startBtn?.addEventListener('click', () => this.startExperience());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closePanel();
      }
    });
  }

  /**
   * Simulate asset loading progress
   */
  simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        this.setProgress(100);
        this.showStartButton();
      } else {
        this.setProgress(Math.floor(progress));
      }
    }, 500);
  }

  /**
   * Update loading progress bar
   */
  setProgress(value) {
    this.progress = Math.min(value, 100);
    if (this.progressSpan) {
      this.progressSpan.textContent = this.progress;
    }
  }

  /**
   * Show START button when loading complete
   */
  showStartButton() {
    this.startBtn?.classList.add('visible');
  }

  /**
   * Transition from loading to 3D experience
   */
  startExperience() {
    this.loadingScreen?.classList.add('hidden');
    console.log('Entering 3D experience...');
  }

  /**
   * Display resume section in info panel
   */
  displaySection(sectionType, data) {
    this.panelTitle.textContent = data.title || 'Resume';
    this.panelContent.innerHTML = data.html || '';
    this.infoOverlay.classList.add('visible');
  }

  /**
   * Close info panel
   */
  closePanel() {
    this.infoOverlay.classList.remove('visible');
    this.panelContent.innerHTML = '';
  }

  /**
   * Display experience entry
   */
  showExperience(expId) {
    const exp = resumeData.experience.find(e => e.id === expId);
    if (!exp) return;

    const html = `
      <h3>${exp.role}</h3>
      <p style="color: #00ffa3; margin-bottom: 10px;"><strong>${exp.company}</strong> • ${exp.period}</p>
      <p style="color: #ffd60a; margin-bottom: 15px; font-size: 0.85rem;">${exp.location}</p>
      <ul>
        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    `;

    this.displaySection('experience', {
      title: `${exp.role} @ ${exp.company}`,
      html: html
    });
  }

  /**
   * Display project details
   */
  showProject(projectId) {
    const project = resumeData.projects.find(p => p.id === projectId);
    if (!project) return;

    const html = `
      <h3>${project.name}</h3>
      <p style="margin-bottom: 15px; color: #e0e0e0;">${project.description}</p>
      <strong style="color: #00ffa3;">Highlights:</strong>
      <ul>
        ${project.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <div style="margin-top: 15px;">
        <strong style="color: #ffd60a;">Technologies:</strong>
        <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 8px;">
          ${project.technologies.map(t => `<span style="background: rgba(0, 217, 255, 0.2); border: 1px solid #00d9ff; padding: 4px 10px; border-radius: 5px; font-size: 0.85rem; color: #00d9ff;">${t}</span>`).join('')}
        </div>
      </div>
    `;

    this.displaySection('project', {
      title: project.name,
      html: html
    });
  }

  /**
   * Display skills
   */
  showSkills() {
    const html = `
      <p style="margin-bottom: 20px; color: #e0e0e0;">Comprehensive technical expertise across cloud infrastructure, DevOps, and containerization.</p>
      ${Object.entries(resumeData.skills).map(([category, skills]) => `
        <div style="margin-bottom: 15px;">
          <strong style="color: #00ffa3;">${category}:</strong>
          <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px;">
            ${skills.map(skill => `<span style="background: rgba(255, 182, 193, 0.2); border: 1px solid #ff006e; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; color: #ff006e;">${skill}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    `;

    this.displaySection('skills', {
      title: 'Technical Skills & Tools',
      html: html
    });
  }

  /**
   * Display education
   */
  showEducation(eduId) {
    const edu = resumeData.education.find(e => e.id === eduId);
    if (!edu) return;

    const html = `
      <h3>${edu.degree}</h3>
      <p style="color: #00ffa3; margin-bottom: 10px;"><strong>${edu.school}</strong></p>
      <p style="color: #ffd60a; margin-bottom: 15px;">${edu.location} • ${edu.period}</p>
      ${edu.gpa ? `<p style="color: #e0e0e0; margin-bottom: 15px;"><strong>GPA:</strong> ${edu.gpa}</p>` : ''}
      <ul>
        ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    `;

    this.displaySection('education', {
      title: `${edu.degree} - ${edu.school}`,
      html: html
    });
  }

  /**
   * Display certifications
   */
  showCertifications() {
    const html = `
      <p style="margin-bottom: 20px; color: #e0e0e0;">Professional certifications validating expertise in cloud platforms and Kubernetes orchestration.</p>
      <div style="display: grid; gap: 12px;">
        ${resumeData.certifications.map(cert => `
          <div style="background: rgba(0, 217, 255, 0.1); border-left: 3px solid #ffd60a; padding: 12px; border-radius: 5px;">
            <strong style="color: #ffd60a;">${cert.name}</strong> • <span style="color: #00d9ff;">${cert.issuer}</span>
            <p style="color: #e0e0e0; font-size: 0.9rem; margin-top: 4px;">${cert.title}</p>
            <p style="color: #00ffa3; font-size: 0.8rem;">Status: ${cert.status}</p>
          </div>
        `).join('')}
      </div>
    `;

    this.displaySection('certifications', {
      title: 'Professional Certifications',
      html: html
    });
  }

  /**
   * Display welcome/about
   */
  showWelcome() {
    const html = `
      <h3 style="font-size: 1.6rem; margin-bottom: 10px;">${resumeData.contact.name}</h3>
      <p style="color: #ffd60a; margin-bottom: 15px; font-size: 1.1rem;">${resumeData.contact.title}</p>
      <p style="color: #e0e0e0; line-height: 1.8; margin-bottom: 20px;">${resumeData.contact.bio}</p>
      <div style="margin-bottom: 20px;">
        <strong style="color: #00ffa3;">Quick Contact:</strong>
        <ul style="margin-top: 10px;">
          <li>📧 <a href="mailto:${resumeData.contact.email}" style="color: #00d9ff; text-decoration: none;">${resumeData.contact.email}</a></li>
          <li>📱 ${resumeData.contact.phone}</li>
          <li>📍 ${resumeData.contact.location}</li>
        </ul>
      </div>
      <div>
        <strong style="color: #00ffa3;">Links:</strong>
        <ul style="margin-top: 10px;">
          <li><a href="${resumeData.contact.linkedin}" target="_blank" style="color: #00d9ff; text-decoration: none;">LinkedIn Profile</a></li>
          <li><a href="${resumeData.contact.github}" target="_blank" style="color: #00d9ff; text-decoration: none;">GitHub Profile</a></li>
        </ul>
      </div>
    `;

    this.displaySection('welcome', {
      title: 'Welcome to My 3D Resume',
      html: html
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.resumeInteraction = new ResumeInteraction();
  
  // Show welcome message after loading complete
  setTimeout(() => {
    // This will be triggered by the 3D scene when ready
    console.log('Resume interaction system initialized');
  }, 2000);
});
