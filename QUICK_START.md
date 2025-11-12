# Quick Start Guide

## How to Open the Website

1. **Navigate to the folder:** `c:\Users\USER\Desktop\fewdproj`
2. **Open `index.html` in your browser** (double-click it or right-click → Open with Browser)
3. Choose **Student Portal** or **Admin Portal**

---

## Testing Instructions

### 🎓 STUDENT PORTAL - Complete Workflow

**Step 1: Fill Profile**
1. Click "Student Portal" from landing page
2. Fill in the form:
   - Name: Any name (e.g., "John Doe")
   - Email: Any email (e.g., "john@example.com")
   - Phone: Any phone (e.g., "+91 9876543210")
   - Qualification: Select "B.Tech"
   - CGPA: Enter **7.5** or higher (e.g., 8.0)
   - Skills: Enter "JavaScript, React, Node.js"
   - Resume: Click "Choose File" and select any PDF/DOC file
   - Previous Internships: Leave blank or fill optional
3. Click **"Save & Continue"**

**Step 2: See Your Dashboard**
- You should see your rank and percentile
- See "Available Internships & Placements" section
- You'll see 4 default companies (Google, Amazon, Microsoft, Flipkart)

**Step 3: Apply for a Job**
1. Click **"Apply Now"** on any green button (you're eligible)
2. Click submit in the popup
3. See confirmation

**Step 4: Check Application Status**
- Scroll to "My Applications" section
- See your submitted application with "Pending" status

**Step 5: Edit Profile (Optional)**
- Click "Edit Profile" button
- Update your details
- Click "Save & Continue"

---

### 👨‍💼 ADMIN PORTAL - Complete Workflow

**Step 1: View Dashboard**
1. From landing page, click "Admin Portal"
2. See statistics:
   - Total Students (will increase as students register)
   - Total Applications (will increase as students apply)
   - Pending Reviews
   - Placements Given

**Step 2: Add a New Position**
1. Scroll to "Manage Internships & Placements" section
2. Click **"+ Add Position"** button
3. Fill the form:
   - Company Name: "TCS" (or any company)
   - Job Title: "Software Developer"
   - Type: Select "Internship" or "Full-Time"
   - Required Qualification: "B.Tech"
   - Minimum CGPA: 7.0
   - Required Skills: "Python, SQL, Java"
   - Deadline: Pick any future date
   - Package: 5.0 (means 5 LPA)
   - Description: "Work on enterprise applications"
4. Click **"Add Position"**
5. You'll see success message

**Step 3: View Student Applications**
1. Scroll to "Student Applications" section
2. You'll see applications from students who applied
3. Click **"Review"** on any application
4. See student details:
   - Personal info, CGPA, skills
   - Resume download button
5. Choose action:
   - **Shortlist**: Move to next round
   - **Reject**: Reject with optional notes
   - **Give Placement**: Direct hire
6. Click action and confirm

**Step 4: Give Direct Placement**
1. Scroll to "Give Direct Placements" section
2. See unplaced students
3. Click **"Give Placement"**
4. Select position from dropdown
5. Add optional notes
6. Click **"Confirm Placement"**

**Step 5: Manage Positions**
1. View all positions in "Manage Internships & Placements"
2. See application count for each
3. Click **"Delete"** to remove a position

---

## Data Flow

```
Student Fills Profile
        ↓
Profile Saved (LocalStorage)
        ↓
Student sees Jobs
        ↓
Student Applies
        ↓
Application Saved
        ↓
Admin Reviews
        ↓
Admin gives decision (Shortlist/Reject/Selected)
        ↓
Student sees status update
```

---

## Common Issues & Fixes

### Issue: Jobs not showing
**Fix:** Make sure you:
1. Completed your profile with CGPA ≥ 7.0
2. Selected qualification as "B.Tech"
3. Refreshed the page

### Issue: Can't add position (Admin)
**Fix:**
1. Make sure all fields are filled
2. CGPA must be number between 0-10
3. Package must be positive number
4. Check browser console (F12) for errors

### Issue: Resume not uploading
**Fix:**
1. File must be PDF, DOC, or DOCX
2. File size should be less than 5MB
3. Try a different file

### Issue: Data disappears after refresh
**Fix:** That's normal! Check browser's localStorage is enabled

---

## Eligibility Requirements

A student can apply for a job if:
- Their CGPA >= Job's Minimum CGPA
- Their Qualification matches Job's Required Qualification

Example:
- Google Intern requires CGPA 7.5, B.Tech
- If you have 8.0 CGPA and B.Tech → ✅ Can Apply
- If you have 7.0 CGPA and B.Tech → ❌ Cannot Apply

---

## Sample Test Data

**Student Profile:**
- Name: Demo Student
- Email: demo@example.com
- Phone: +91 9876543210
- Qualification: B.Tech
- CGPA: 8.5
- Skills: JavaScript, React, Node.js, MongoDB

**Test Jobs (Pre-loaded):**
1. Google - SDE Intern - Min CGPA: 7.5
2. Amazon - Senior Developer - Min CGPA: 8.0
3. Microsoft - Full Stack - Min CGPA: 7.8
4. Flipkart - Backend Intern - Min CGPA: 7.0

---

## Need Help?

1. Open browser Developer Tools (F12)
2. Check Console for error messages
3. Try refreshing the page
4. Clear cache and try again

---

**All data is stored locally in your browser. No backend server needed!**
