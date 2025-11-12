# Placement & Internship Tracker

A complete frontend-based placement management system with minimalist localStorage backend.

## Features

### 🎓 Student Portal
- **Profile Creation**: Fill application form with personal details, qualifications, CGPA, skills, and resume upload
- **Job Listings**: View all available internships and placements (filtered by eligibility)
- **Applications**: Apply for positions and track application status
- **Rankings**: See your rank among all students and percentile
- **Application Tracking**: Monitor status of all applications (Pending, Shortlisted, Selected, Rejected)

### 👨‍💼 Admin Portal
- **Dashboard**: View statistics (total students, applications, pending reviews, placements)
- **Application Review**: Review student profiles and applications with resume download
- **Placement Decisions**: Shortlist, reject, or give direct placement to students
- **Position Management**: Add new internship/placement positions with all details
- **Direct Placements**: Give direct placements to unplaced students

## How to Use

### 1. Start the Application
- Open `index.html` in your browser
- Choose between **Student Portal** or **Admin Portal**

### 2. Student Portal Flow
1. **Fill Profile** (First time)
   - Enter your name, email, phone
   - Select qualification and CGPA
   - Add skills
   - Upload resume (PDF/DOC/DOCX)
   - Optionally add previous internships
   - Click "Save & Continue"

2. **View Available Jobs**
   - After saving profile, you'll see:
     - Your rank and percentile among all students
     - Number of applications and shortlists
     - All available positions
   - Search and filter by company name or job type
   - Green button = Eligible to apply
   - Red button = Don't meet requirements

3. **Apply for Positions**
   - Click "Apply Now" on eligible positions
   - View full job description
   - Submit application

4. **Track Applications**
   - See all your applications in "My Applications" section
   - View status: Pending, Shortlisted, Selected, Rejected
   - Click "View Details" for admin feedback

5. **Edit Profile**
   - Click "Edit Profile" button to update your details

### 3. Admin Portal Flow
1. **Dashboard**
   - View statistics at the top
   - See all student applications in one place

2. **Review Applications**
   - Search by student name
   - Filter by status (Pending, Shortlisted, Selected, Rejected)
   - Click "Review" to view student details
   - Download resume to evaluate
   - Actions:
     - **Shortlist**: Move student to next round
     - **Reject**: Reject with optional notes
     - **Give Placement**: Direct placement to company

3. **Manage Positions**
   - Click "+ Add Position" button
   - Fill in:
     - Company name
     - Job title
     - Type (Internship/Full-Time)
     - Required qualification
     - Minimum CGPA
     - Required skills
     - Deadline
     - Package/Stipend (in LPA)
     - Job description
   - View all positions with application counts
   - Delete positions as needed

4. **Give Direct Placements**
   - Go to "Give Direct Placements" section
   - Search for unplaced students
   - Click "Give Placement"
   - Select position from dropdown
   - Add optional notes
   - Confirm placement

## Data Storage

All data is stored in browser's **LocalStorage**:
- `jobs`: All internship and placement positions
- `currentUser`: Currently logged-in student
- `allUsers`: All registered students
- `applications`: All applications submitted

**Note**: Data persists across sessions but only in the same browser. Clearing browser data will reset everything.

## Default Positions

The system comes pre-loaded with 4 sample positions:
1. **Google** - SDE Intern (Internship) - ₹2.5 LPA
2. **Amazon** - Senior Developer (Full-Time) - ₹15.5 LPA
3. **Microsoft** - Full Stack Developer (Full-Time) - ₹14.0 LPA
4. **Flipkart** - Backend Engineer Intern (Internship) - ₹1.5 LPA

## File Structure

```
fewdproj/
├── index.html              # Landing page
├── user-dashboard.html     # Student portal
├── admin-dashboard.html    # Admin portal
├── style.css              # All styling
├── script.js              # All functionality
└── README.md              # This file
```

## Browser Compatibility

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage must be enabled

## Tips

### For Students:
- Your CGPA is crucial - higher CGPA shows more positions
- Upload a proper resume in PDF format
- Check your rank to see where you stand among peers
- Apply early before deadlines

### For Admins:
- Review student resumes carefully
- Add positions to attract qualified candidates
- Use the shortlist feature to manage recruitment pipeline
- Give direct placements to exceptional candidates

## Features Implemented

✅ Student profile management
✅ Resume upload and storage
✅ Real-time ranking calculation
✅ Job listing with eligibility checking
✅ Application tracking
✅ Admin dashboard
✅ Student application review
✅ Placement decisions (Shortlist, Reject, Select)
✅ Direct placement feature
✅ Position management (Add/Delete)
✅ Search and filtering
✅ Responsive design
✅ Local data persistence

---

**Version**: 1.0  
**Last Updated**: November 2025
