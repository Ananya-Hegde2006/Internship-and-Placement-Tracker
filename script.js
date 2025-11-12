// ==================== DATA MANAGEMENT ====================

// Initialize default jobs if not exists
function initializeJobs() {
    try {
        if (!localStorage.getItem('jobs')) {
            const defaultJobs = [
                {
                    id: 1,
                    companyName: 'Google',
                    jobRole: 'SDE Intern',
                    jobType: 'Internship',
                    jobQualification: 'B.Tech',
                    minCGPA: 7.5,
                    requiredSkills: 'JavaScript, DSA, Problem Solving',
                    jobDeadline: '2025-02-28',
                    jobPackage: 2.5,
                    jobDescription: 'Work on real-world problems at Google. Collaborate with experienced engineers.',
                    postedDate: new Date().toISOString()
                },
                {
                    id: 2,
                    companyName: 'Amazon',
                    jobRole: 'Senior Developer',
                    jobType: 'Full-Time',
                    jobQualification: 'B.Tech',
                    minCGPA: 8.0,
                    requiredSkills: 'Java, AWS, Microservices',
                    jobDeadline: '2025-03-15',
                    jobPackage: 15.5,
                    jobDescription: 'Build scalable systems for millions of users. Work with top talent.',
                    postedDate: new Date().toISOString()
                },
                {
                    id: 3,
                    companyName: 'Microsoft',
                    jobRole: 'Full Stack Developer',
                    jobType: 'Full-Time',
                    jobQualification: 'B.Tech',
                    minCGPA: 7.8,
                    requiredSkills: 'React, Node.js, Azure',
                    jobDeadline: '2025-02-20',
                    jobPackage: 14.0,
                    jobDescription: 'Develop cloud-based solutions. Learn from industry experts.',
                    postedDate: new Date().toISOString()
                },
                {
                    id: 4,
                    companyName: 'Flipkart',
                    jobRole: 'Backend Engineer Intern',
                    jobType: 'Internship',
                    jobQualification: 'B.Tech',
                    minCGPA: 7.0,
                    requiredSkills: 'Python, SQL, APIs',
                    jobDeadline: '2025-03-01',
                    jobPackage: 1.5,
                    jobDescription: 'Work on India\'s largest e-commerce platform. Internship to FTE opportunity.',
                    postedDate: new Date().toISOString()
                }
            ];
            localStorage.setItem('jobs', JSON.stringify(defaultJobs));
            console.log('Jobs initialized');
        }
    } catch (e) {
        console.error('Error initializing jobs:', e);
    }
}

function getJobs() {
    try {
        initializeJobs();
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        return jobs;
    } catch (e) {
        console.error('Error getting jobs:', e);
        return [];
    }
}

function saveJobs(jobs) {
    try {
        localStorage.setItem('jobs', JSON.stringify(jobs));
        console.log('Jobs saved:', jobs.length);
    } catch (e) {
        console.error('Error saving jobs:', e);
    }
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch (e) {
        console.error('Error getting current user:', e);
        return null;
    }
}

function saveCurrentUser(user) {
    try {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Current user saved:', user.name);
    } catch (e) {
        console.error('Error saving current user:', e);
    }
}

function getAllUsers() {
    try {
        return JSON.parse(localStorage.getItem('allUsers')) || [];
    } catch (e) {
        console.error('Error getting all users:', e);
        return [];
    }
}

function saveAllUsers(users) {
    try {
        localStorage.setItem('allUsers', JSON.stringify(users));
        console.log('All users saved:', users.length);
    } catch (e) {
        console.error('Error saving all users:', e);
    }
}

function getApplications() {
    try {
        return JSON.parse(localStorage.getItem('applications')) || [];
    } catch (e) {
        console.error('Error getting applications:', e);
        return [];
    }
}

function saveApplications(apps) {
    try {
        localStorage.setItem('applications', JSON.stringify(apps));
        console.log('Applications saved:', apps.length);
    } catch (e) {
        console.error('Error saving applications:', e);
    }
}

// ==================== USER PROFILE MANAGEMENT ====================

function saveUserProfile() {
    try {
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const qualification = document.getElementById('userQualification').value;
        const cgpa = parseFloat(document.getElementById('userCGPA').value);
        const skills = document.getElementById('userSkills').value.trim();
        const internships = document.getElementById('internships').value.trim();
        const resumeFile = document.getElementById('resumeFile').files[0];

        if (!name || !email || !phone || !qualification || !cgpa || !skills || !resumeFile) {
            alert('Please fill all required fields including resume');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const user = {
                id: Date.now(),
                name,
                email,
                phone,
                qualification,
                cgpa,
                skills: skills.split(',').map(s => s.trim()),
                internships,
                resumeData: e.target.result,
                resumeName: resumeFile.name,
                createdDate: new Date().toISOString()
            };

            saveCurrentUser(user);
            
            const allUsers = getAllUsers();
            const existingIndex = allUsers.findIndex(u => u.email === email);
            if (existingIndex >= 0) {
                allUsers[existingIndex] = user;
            } else {
                allUsers.push(user);
            }
            saveAllUsers(allUsers);

            showStudentDashboard();
            loadStudentDashboard();
            alert('Profile saved successfully!');
        };
        reader.readAsDataURL(resumeFile);
    } catch (e) {
        console.error('Error saving user profile:', e);
        alert('Error saving profile: ' + e.message);
    }
}

function editProfile() {
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('statsSection').style.display = 'none';
    document.getElementById('jobsSection').style.display = 'none';
    document.getElementById('applicationsSection').style.display = 'none';
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) editBtn.style.display = 'none';
    window.scrollTo(0, 0);
}

function showStudentDashboard() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('statsSection').style.display = 'block';
    document.getElementById('jobsSection').style.display = 'block';
    document.getElementById('applicationsSection').style.display = 'block';
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) editBtn.style.display = 'block';
}

// ==================== STUDENT DASHBOARD ====================

function loadStudentDashboard() {
    try {
        const user = getCurrentUser();
        
        if (!user) {
            document.getElementById('profileSection').style.display = 'block';
            document.getElementById('statsSection').style.display = 'none';
            document.getElementById('jobsSection').style.display = 'none';
            document.getElementById('applicationsSection').style.display = 'none';
            return;
        }

        loadStudentStats(user);
        loadAvailableJobs(user);
        loadStudentApplications(user);
    } catch (e) {
        console.error('Error loading student dashboard:', e);
    }
}

function loadStudentStats(user) {
    try {
        const allUsers = getAllUsers();
        const userRank = allUsers.filter(u => u.cgpa > user.cgpa).length + 1;
        const percentile = allUsers.length > 0 ? Math.round(((allUsers.length - userRank + 1) / allUsers.length) * 100) : 0;
        
        const applications = getApplications().filter(app => app.userId === user.id);
        const shortlisted = applications.filter(app => app.status === 'Shortlisted').length;

        document.getElementById('rankValue').textContent = userRank;
        document.getElementById('percentileValue').textContent = percentile + '%';
        document.getElementById('appliedCount').textContent = applications.length;
        document.getElementById('shortlistedCount').textContent = shortlisted;
    } catch (e) {
        console.error('Error loading student stats:', e);
    }
}

function loadAvailableJobs(user) {
    try {
        if (!user) return;
        
        const jobs = getJobs();
        const jobsList = document.getElementById('jobsList');
        
        if (!jobsList) return;
        
        const searchTerm = (document.getElementById('searchJobs')?.value || '').toLowerCase();
        const filterType = document.getElementById('filterType')?.value || '';

        let filtered = jobs.filter(job => {
            const matchSearch = job.companyName.toLowerCase().includes(searchTerm) || 
                               job.jobRole.toLowerCase().includes(searchTerm);
            const matchType = !filterType || job.jobType === filterType;
            return matchSearch && matchType;
        });

        if (filtered.length === 0) {
            jobsList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No positions available yet. Admin will add some soon!</p>';
            return;
        }

        const userApplications = getApplications().filter(app => app.userId === user.id);
        const appliedJobIds = userApplications.map(app => app.jobId);

        jobsList.innerHTML = filtered.map(job => {
            const isEligible = job.minCGPA <= user.cgpa && job.jobQualification === user.qualification;
            const hasApplied = appliedJobIds.includes(job.id);
            
            return `
            <div class="job-card">
                <div class="job-header">
                    <h4>${job.companyName}</h4>
                    <span class="job-type ${job.jobType === 'Internship' ? 'internship' : 'fulltime'}">
                        ${job.jobType}
                    </span>
                </div>
                <div class="job-details">
                    <div class="job-detail">
                        <strong>📌 Role:</strong> ${job.jobRole}
                    </div>
                    <div class="job-detail">
                        <strong>💰 Package:</strong> ₹${job.jobPackage} LPA
                    </div>
                    <div class="job-detail">
                        <strong>⏰ Deadline:</strong> ${new Date(job.jobDeadline).toLocaleDateString()}
                    </div>
                    <div class="job-detail">
                        <strong>🎯 Min CGPA:</strong> ${job.minCGPA} (Your: ${user.cgpa})
                    </div>
                    <div class="job-detail">
                        <strong>💻 Skills:</strong> ${job.requiredSkills}
                    </div>
                    ${!isEligible ? `<div class="job-detail" style="color: var(--danger); font-weight: 600;">⚠️ Don't meet requirements</div>` : ''}
                </div>
                <div class="job-actions">
                    ${hasApplied ? 
                        '<button class="btn-secondary" disabled>Applied</button>' : 
                        (isEligible ? `<button class="btn-primary" onclick="openApplyModal(${job.id})">Apply Now</button>` : '<button class="btn-danger" disabled>Not Eligible</button>')
                    }
                </div>
            </div>
        `;
        }).join('');
    } catch (e) {
        console.error('Error loading available jobs:', e);
    }
}

function loadStudentApplications(user) {
    try {
        const applications = getApplications().filter(app => app.userId === user.id);
        const appsList = document.getElementById('applicationsList');

        if (!appsList) return;

        if (applications.length === 0) {
            appsList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No applications yet. Apply to internships above!</p>';
            return;
        }

        const jobs = getJobs();

        appsList.innerHTML = applications.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            if (!job) return '';
            
            return `
                <div class="application-card">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div>
                                <h4 style="margin-bottom: 0.3rem;">${job.companyName} - ${job.jobRole}</h4>
                                <p style="color: var(--text-light); font-size: 0.9rem;">Applied on ${new Date(app.appliedDate).toLocaleDateString()}</p>
                            </div>
                            <span class="status-badge ${app.status.toLowerCase()}">${app.status}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error('Error loading student applications:', e);
    }
}

function openApplyModal(jobId) {
    try {
        const job = getJobs().find(j => j.id === jobId);
        if (!job) {
            alert('Job not found');
            return;
        }
        
        const modalContent = document.getElementById('jobModalContent');
        
        modalContent.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem;">${job.companyName} - ${job.jobRole}</h4>
                <p style="color: var(--text-light); margin-bottom: 0.5rem;"><strong>Type:</strong> ${job.jobType}</p>
                <p style="color: var(--text-light); margin-bottom: 0.5rem;"><strong>Package:</strong> ₹${job.jobPackage} LPA</p>
                <p style="color: var(--text-light); margin-bottom: 0.5rem;"><strong>Deadline:</strong> ${job.jobDeadline}</p>
                <p style="color: var(--text-light); margin-bottom: 1rem;"><strong>Description:</strong></p>
                <p>${job.jobDescription}</p>
            </div>
        `;

        window.currentJobId = jobId;
        const modal = document.getElementById('applyJobModal');
        if (modal) modal.classList.add('active');
    } catch (e) {
        console.error('Error opening apply modal:', e);
    }
}

function submitApplication() {
    try {
        const user = getCurrentUser();
        const jobId = window.currentJobId;

        if (!user || !jobId) {
            alert('Error: User or job not found');
            return;
        }

        const application = {
            id: Date.now(),
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            jobId: jobId,
            status: 'Pending',
            appliedDate: new Date().toISOString(),
            adminNotes: ''
        };

        const apps = getApplications();
        apps.push(application);
        saveApplications(apps);

        closeModal('applyJobModal');
        loadAvailableJobs(user);
        loadStudentApplications(user);
        alert('Application submitted successfully!');
    } catch (e) {
        console.error('Error submitting application:', e);
        alert('Error: ' + e.message);
    }
}

// ==================== ADMIN DASHBOARD ====================

function loadAdminDashboard() {
    try {
        const users = getAllUsers();
        const apps = getApplications();
        const jobs = getJobs();
        const placements = apps.filter(app => app.status === 'Selected');

        document.getElementById('totalUsers').textContent = users.length;
        document.getElementById('totalApplications').textContent = apps.length;
        document.getElementById('pendingReviews').textContent = apps.filter(app => app.status === 'Pending').length;
        document.getElementById('totalPlacements').textContent = placements.length;

        loadStudentApplicationsList();
        loadJobsList();
        loadPlacementList();
    } catch (e) {
        console.error('Error loading admin dashboard:', e);
    }
}

function loadStudentApplicationsList() {
    try {
        const apps = getApplications();
        const jobs = getJobs();
        const users = getAllUsers();

        const searchTerm = (document.getElementById('searchStudents')?.value || '').toLowerCase();
        const filterStatus = document.getElementById('filterStatus')?.value || '';

        let filtered = apps.filter(app => {
            const matchSearch = app.userName.toLowerCase().includes(searchTerm);
            const matchStatus = !filterStatus || app.status === filterStatus;
            return matchSearch && matchStatus;
        });

        const appsList = document.getElementById('applicationsList');

        if (filtered.length === 0) {
            appsList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No applications found</p>';
            return;
        }

        appsList.innerHTML = filtered.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            if (!job) return '';

            return `
                <div class="application-card" style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <div style="margin-bottom: 1rem;">
                            <h4 style="margin-bottom: 0.3rem;">${app.userName}</h4>
                            <p style="color: var(--text-light); font-size: 0.9rem;">${app.userEmail}</p>
                            <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.3rem;">Applied for: <strong>${job.companyName} - ${job.jobRole}</strong></p>
                        </div>
                        <span class="status-badge ${app.status.toLowerCase()}">${app.status}</span>
                    </div>
                    <button class="btn-primary" style="margin-left: 1rem; white-space: nowrap;" onclick="viewStudentApplication(${app.id})">Review</button>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error('Error loading student applications list:', e);
    }
}

function loadJobsList() {
    try {
        const jobs = getJobs();
        const jobsList = document.getElementById('jobsList');

        if (!jobsList) return;

        jobsList.innerHTML = jobs.map(job => {
            const applications = getApplications().filter(app => app.jobId === job.id);
            const pending = applications.filter(app => app.status === 'Pending').length;

            return `
                <div class="company-card">
                    <div class="company-info">
                        <h4>${job.companyName}</h4>
                        <p>${job.jobRole} | ${job.jobType}</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">CGPA: ${job.minCGPA}+ | Package: ₹${job.jobPackage} LPA | Pending: ${pending}</p>
                    </div>
                    <div class="company-actions">
                        <button class="btn-danger" onclick="deleteJob(${job.id})">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error('Error loading jobs list:', e);
    }
}

function loadPlacementList() {
    try {
        const users = getAllUsers();
        const apps = getApplications();

        const searchTerm = (document.getElementById('searchStudentsPlacement')?.value || '').toLowerCase();

        let filtered = users.filter(user => {
            const hasPlacement = apps.some(app => app.userId === user.id && app.status === 'Selected');
            return !hasPlacement && user.name.toLowerCase().includes(searchTerm);
        });

        const placementList = document.getElementById('placementList');

        if (!placementList) return;

        if (filtered.length === 0) {
            placementList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No unplaced students available</p>';
            return;
        }

        placementList.innerHTML = filtered.map(user => `
            <div class="application-card" style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.3rem;">${user.name}</h4>
                    <p style="color: var(--text-light); font-size: 0.9rem;">CGPA: ${user.cgpa} | ${user.qualification}</p>
                    <p style="color: var(--text-light); font-size: 0.9rem;">Skills: ${user.skills.join(', ')}</p>
                </div>
                <button class="btn-success" style="margin-left: 1rem; white-space: nowrap;" onclick="givePlacementToStudent(${user.id})">Give Placement</button>
            </div>
        `).join('');
    } catch (e) {
        console.error('Error loading placement list:', e);
    }
}

function viewStudentApplication(appId) {
    try {
        const apps = getApplications();
        const jobs = getJobs();
        const users = getAllUsers();

        const app = apps.find(a => a.id === appId);
        const job = jobs.find(j => j.id === app.jobId);
        const user = users.find(u => u.id === app.userId);

        if (!app || !job || !user) {
            alert('Data not found');
            return;
        }

        const modal = document.getElementById('studentDetailModal');
        const content = document.getElementById('studentDetailContent');

        const resumeBtn = user.resumeData ? 
            `<button class="btn-secondary" onclick="downloadResume('${user.resumeName}', '${user.resumeData.replace(/'/g, "\\'")}')">📥 Download Resume</button>` : 
            '';

        content.innerHTML = `
            <div class="student-detail-grid">
                <div class="detail-item">
                    <strong>Student Name</strong>
                    <p>${user.name}</p>
                </div>
                <div class="detail-item">
                    <strong>Email</strong>
                    <p>${user.email}</p>
                </div>
                <div class="detail-item">
                    <strong>Phone</strong>
                    <p>${user.phone}</p>
                </div>
                <div class="detail-item">
                    <strong>Qualification</strong>
                    <p>${user.qualification}</p>
                </div>
                <div class="detail-item">
                    <strong>CGPA</strong>
                    <p>${user.cgpa}</p>
                </div>
                <div class="detail-item">
                    <strong>Skills</strong>
                    <p>${user.skills.join(', ')}</p>
                </div>
                ${user.internships ? `
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <strong>Previous Internships</strong>
                    <p>${user.internships.replace(/\n/g, '<br>')}</p>
                </div>
                ` : ''}
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <strong>Applied Position</strong>
                    <p>${job.companyName} - ${job.jobRole} (${job.jobType})</p>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <strong>Current Status</strong>
                    <p><span class="status-badge ${app.status.toLowerCase()}">${app.status}</span></p>
                </div>
            </div>
            <div style="margin-top: 1.5rem;">
                ${resumeBtn}
            </div>
        `;

        window.currentAppId = appId;
        if (modal) modal.classList.add('active');
    } catch (e) {
        console.error('Error viewing student application:', e);
        alert('Error: ' + e.message);
    }
}

function downloadResume(fileName, fileData) {
    try {
        const link = document.createElement('a');
        link.href = fileData;
        link.download = fileName;
        link.click();
    } catch (e) {
        console.error('Error downloading resume:', e);
    }
}

function shortlistStudent() {
    try {
        const appId = window.currentAppId;
        const apps = getApplications();
        const app = apps.find(a => a.id === appId);
        
        if (!app) {
            alert('Application not found');
            return;
        }
        
        app.status = 'Shortlisted';
        saveApplications(apps);
        
        closeModal('studentDetailModal');
        loadAdminDashboard();
        alert('Student shortlisted successfully!');
    } catch (e) {
        console.error('Error shortlisting student:', e);
        alert('Error: ' + e.message);
    }
}

function rejectStudent() {
    try {
        const appId = window.currentAppId;
        const apps = getApplications();
        const app = apps.find(a => a.id === appId);
        
        if (!app) {
            alert('Application not found');
            return;
        }
        
        app.status = 'Rejected';
        const notes = prompt('Add rejection notes (optional):');
        if (notes !== null) {
            app.adminNotes = notes;
        }
        saveApplications(apps);
        
        closeModal('studentDetailModal');
        loadAdminDashboard();
        alert('Application rejected!');
    } catch (e) {
        console.error('Error rejecting student:', e);
        alert('Error: ' + e.message);
    }
}

function givePlacement() {
    try {
        const appId = window.currentAppId;
        const apps = getApplications();
        const app = apps.find(a => a.id === appId);
        
        if (!app) {
            alert('Application not found');
            return;
        }
        
        app.status = 'Selected';
        const notes = prompt('Add placement notes (optional):');
        if (notes !== null) {
            app.adminNotes = notes;
        }
        saveApplications(apps);
        
        closeModal('studentDetailModal');
        loadAdminDashboard();
        alert('Placement given successfully!');
    } catch (e) {
        console.error('Error giving placement:', e);
        alert('Error: ' + e.message);
    }
}

function givePlacementToStudent(userId) {
    try {
        window.currentPlacementUserId = userId;
        const jobs = getJobs();
        const select = document.getElementById('placementJobSelect');
        
        if (!select) {
            alert('Error: Form not found');
            return;
        }
        
        select.innerHTML = jobs.map(job => 
            `<option value="${job.id}">${job.companyName} - ${job.jobRole}</option>`
        ).join('');
        
        const modal = document.getElementById('placementModal');
        if (modal) modal.classList.add('active');
    } catch (e) {
        console.error('Error in givePlacementToStudent:', e);
        alert('Error: ' + e.message);
    }
}

function submitPlacement(event) {
    try {
        event.preventDefault();
        
        const userId = window.currentPlacementUserId;
        const jobId = parseInt(document.getElementById('placementJobSelect').value);
        const notes = document.getElementById('placementNotes').value;
        
        const user = getAllUsers().find(u => u.id === userId);
        if (!user) {
            alert('User not found');
            return;
        }
        
        const app = {
            id: Date.now(),
            userId: userId,
            jobId: jobId,
            status: 'Selected',
            appliedDate: new Date().toISOString(),
            userName: user.name,
            userEmail: user.email,
            adminNotes: notes
        };
        
        const apps = getApplications();
        apps.push(app);
        saveApplications(apps);
        
        closeModal('placementModal');
        loadAdminDashboard();
        alert('Direct placement given successfully!');
    } catch (e) {
        console.error('Error submitting placement:', e);
        alert('Error: ' + e.message);
    }
}

function showAddJobForm() {
    try {
        const modal = document.getElementById('addJobModal');
        if (modal) {
            modal.classList.add('active');
        } else {
            alert('Modal not found');
        }
    } catch (e) {
        console.error('Error showing add job form:', e);
    }
}

function submitAddJob(event) {
    try {
        if (event) event.preventDefault();
        
        const companyName = document.getElementById('companyName').value.trim();
        const jobRole = document.getElementById('jobRole').value.trim();
        const jobType = document.getElementById('jobType').value;
        const jobQualification = document.getElementById('jobQualification').value;
        const minCGPA = parseFloat(document.getElementById('minCGPA').value);
        const requiredSkills = document.getElementById('requiredSkills').value.trim();
        const jobDeadline = document.getElementById('jobDeadline').value;
        const jobPackage = parseFloat(document.getElementById('jobPackage').value);
        const jobDescription = document.getElementById('jobDescription').value.trim();

        if (!companyName || !jobRole || !jobQualification || !requiredSkills || !jobDeadline || !jobPackage || !jobDescription) {
            alert('Please fill all required fields');
            return false;
        }

        if (isNaN(minCGPA) || minCGPA < 0 || minCGPA > 10) {
            alert('CGPA must be a number between 0 and 10');
            return false;
        }

        if (isNaN(jobPackage) || jobPackage < 0) {
            alert('Package must be a positive number');
            return false;
        }

        const job = {
            id: Date.now(),
            companyName,
            jobRole,
            jobType,
            jobQualification,
            minCGPA,
            requiredSkills,
            jobDeadline,
            jobPackage,
            jobDescription,
            postedDate: new Date().toISOString()
        };

        const jobs = getJobs();
        jobs.push(job);
        saveJobs(jobs);

        const form = document.getElementById('addJobForm');
        if (form) {
            form.reset();
        }
        
        closeModal('addJobModal');
        loadAdminDashboard();
        alert('Position added successfully!');
        return true;
    } catch (e) {
        console.error('Error submitting job:', e);
        alert('Error: ' + e.message);
        return false;
    }
}

function deleteJob(jobId) {
    try {
        if (confirm('Are you sure you want to delete this position?')) {
            let jobs = getJobs();
            jobs = jobs.filter(j => j.id !== jobId);
            saveJobs(jobs);
            loadAdminDashboard();
            alert('Position deleted successfully!');
        }
    } catch (e) {
        console.error('Error deleting job:', e);
    }
}

// ==================== UTILITY FUNCTIONS ====================

function closeModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    } catch (e) {
        console.error('Error closing modal:', e);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    try {
        if (event.target.classList && event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    } catch (e) {
        console.error('Error in window onclick:', e);
    }
};

// ==================== PAGE INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Page loaded');
        initializeJobs();

        // User Dashboard
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            console.log('User dashboard detected');
            
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveUserProfile();
            });

            const user = getCurrentUser();
            if (user) {
                console.log('Loading existing user:', user.name);
                document.getElementById('userName').value = user.name;
                document.getElementById('userEmail').value = user.email;
                document.getElementById('userPhone').value = user.phone;
                document.getElementById('userQualification').value = user.qualification;
                document.getElementById('userCGPA').value = user.cgpa;
                document.getElementById('userSkills').value = user.skills.join(', ');
                document.getElementById('internships').value = user.internships;
                
                showStudentDashboard();
                loadStudentDashboard();
            } else {
                console.log('No existing user found');
            }

            const searchJobs = document.getElementById('searchJobs');
            const filterType = document.getElementById('filterType');
            if (searchJobs) {
                searchJobs.addEventListener('input', () => {
                    const currentUser = getCurrentUser();
                    if (currentUser) loadAvailableJobs(currentUser);
                });
            }
            if (filterType) {
                filterType.addEventListener('change', () => {
                    const currentUser = getCurrentUser();
                    if (currentUser) loadAvailableJobs(currentUser);
                });
            }
        }

        // Admin Dashboard
        const addJobForm = document.getElementById('addJobForm');
        if (addJobForm) {
            console.log('Admin dashboard detected');
            
            addJobForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitAddJob(e);
            });

            const placementForm = document.getElementById('placementForm');
            if (placementForm) {
                placementForm.addEventListener('submit', submitPlacement);
            }

            const searchStudents = document.getElementById('searchStudents');
            const filterStatus = document.getElementById('filterStatus');
            const searchStudentsPlacement = document.getElementById('searchStudentsPlacement');
            
            if (searchStudents) {
                searchStudents.addEventListener('input', loadStudentApplicationsList);
            }
            if (filterStatus) {
                filterStatus.addEventListener('change', loadStudentApplicationsList);
            }
            if (searchStudentsPlacement) {
                searchStudentsPlacement.addEventListener('input', loadPlacementList);
            }

            loadAdminDashboard();
        }
    } catch (e) {
        console.error('Error during initialization:', e);
        alert('Error initializing application: ' + e.message);
    }
});



// ====== STUDENT REGISTER ======
const studentRegisterForm = document.getElementById('studentRegisterForm');
if (studentRegisterForm) {
  studentRegisterForm.addEventListener('submit', e => {
    e.preventDefault();
    const student = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      qualification: document.getElementById('qualification').value,
      cgpa: document.getElementById('cgpa').value,
      skills: document.getElementById('skills').value
    };
    localStorage.setItem(`student_${student.email}`, JSON.stringify(student));
    alert('Registration successful!');
    window.location.href = 'student-login.html';
  });
}

// ====== STUDENT LOGIN ======
const studentLoginForm = document.getElementById('studentLoginForm');
if (studentLoginForm) {
  studentLoginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const studentData = JSON.parse(localStorage.getItem(`student_${email}`));
    if (studentData && studentData.password === password) {
      localStorage.setItem('loggedInStudent', email);
      window.location.href = 'user-dashboard.html';
    } else {
      alert('Invalid credentials');
    }
  });
}

// ====== ADMIN REGISTER ======
const adminRegisterForm = document.getElementById('adminRegisterForm');
if (adminRegisterForm) {
  adminRegisterForm.addEventListener('submit', e => {
    e.preventDefault();
    const admin = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
    localStorage.setItem(`admin_${admin.email}`, JSON.stringify(admin));
    alert('Admin registered successfully!');
    window.location.href = 'admin-login.html';
  });
}

// ====== ADMIN LOGIN ======
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const adminData = JSON.parse(localStorage.getItem(`admin_${email}`));
    if (adminData && adminData.password === password) {
      localStorage.setItem('loggedInAdmin', email);
      window.location.href = 'admin-dashboard.html';
    } else {
      alert('Invalid credentials');
    }
  });
}

// ====== LOGOUT FUNCTION ======
function logout(role) {
  if (role === 'student') {
    localStorage.removeItem('loggedInStudent');
    window.location.href = 'student-login.html';
  } else if (role === 'admin') {
    localStorage.removeItem('loggedInAdmin');
    window.location.href = 'admin-login.html';
  }
}

// ====== DASHBOARD ACCESS PROTECTION ======
if (window.location.pathname.includes('user-dashboard.html')) {
  if (!localStorage.getItem('loggedInStudent')) {
    window.location.href = 'student-login.html';
  }
}
if (window.location.pathname.includes('admin-dashboard.html')) {
  if (!localStorage.getItem('loggedInAdmin')) {
    window.location.href = 'admin-login.html';
  }
}
