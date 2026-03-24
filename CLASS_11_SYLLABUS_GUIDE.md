# Class 11 Physics Syllabus Integration Guide

## What Changed

Your ChaosPrep syllabus has been updated with a detailed Class 11 Physics curriculum based on your lecture planner. The new structure includes:

### Updated Physics Units

#### Class 11 - Kinematics (82 Total Lectures)
1. **Units and Measurements** (14 lectures)
   - Introduction to Physical Quantities
   - Dimensional Analysis
   - Errors in Measurement (6 detailed lectures)

2. **Mathematical Tools** (11 lectures)
   - Algebra, AP/GP Series
   - Differentiation & Integration (4 lectures)

3. **Motion in a Straight Line** (14 lectures)
   - Kinematics fundamentals
   - Graphs (5 lectures)
   - Variable Acceleration (2 lectures)

4. **Motion in a Plane** (17 lectures)
   - Vectors (3 lectures)
   - Projectile Motion (3 lectures)
   - Relative Velocity (3 lectures)
   - Circular Motion (5 lectures)

#### Class 11 - Dynamics (31 Total Lectures)
1. **Laws of Motion** (15 lectures)
   - Newton's Laws (7 lectures)
   - Spring Force & Pseudo Force
   - Friction (6 lectures)

2. **Circular Motion** (5 lectures)
   - Centripetal & Tangential Acceleration
   - Banking of Roads & Conical Pendulum

3. **Work, Energy and Power** (8 lectures)
   - Work (3 lectures)
   - Energy (3 lectures)
   - Circular Motion Applications (2 lectures)

4. **Centre of Mass & System of Particles** (3 lectures)

**Total Class 11 Lectures: 92 lectures**

---

## How to Use This in ChaosPrep

### 1. Lecture-Level Tracking
Each chapter now includes:
- `totalLectures`: Total number of lectures for that chapter
- `topics`: Array of individual lecture topics with lecture numbers

### 2. Creating Daily Tasks from Lectures

When planning your day:
1. Open the Syllabus View in ChaosPrep
2. Find the chapter you're working on (e.g., "Motion in a Plane")
3. Create tasks for specific lectures:
   - "Physics: Motion in a Plane - Lec 6 (Projectile Motion Part 1)"
   - "Physics: Motion in a Plane - Lec 7 (Projectile Motion Part 2)"

### 3. Implementing the 1-3-7 Revision Rule

For each lecture you complete:
```
Day 0: Watch "Laws of Motion - Lec 1 (Newton's Laws Part 1)"
Day 1: Review notes for Lec 1 (R1 tag)
Day 3: Review notes for Lec 1 (R2 tag)
Day 7: Review notes for Lec 1 (R3 tag) ✓ Mark as mastered
```

### 4. Chapter Progress Tracking

Use the syllabus status system:
- **Not Started**: Haven't watched any lectures
- **In Progress (Doing)**: Currently watching lectures 1-10 of 14
- **Completed (Done)**: Watched all 14 lectures
- **Mastered**: Completed all lectures + all R1, R2, R3 revisions

### 5. DPP Linking Strategy

After each lecture:
1. Watch lecture (e.g., "Friction - Part 1")
2. Immediately create a task: "DPP: Friction Problems Set 1"
3. Link it to the same day or next day
4. Mark lecture as complete only after solving the DPP

---

## Advanced: Confidence Score System

For each lecture topic, mentally assign a confidence score (1-5):

**Confidence 1-2 (Weak)**
- Add to "Active Review" list
- Solve 10 additional problems
- Watch concept again if needed

**Confidence 3 (Moderate)**
- Schedule an R2 revision earlier (Day 2 instead of Day 3)
- Focus on tricky problems

**Confidence 4-5 (Strong)**
- Standard 1-3-7 revision
- Move to "Error Log" practice only

---

## Integration with Your 2-Subject Daily Rotation

### Sample Daily Schedule

**Morning Block (School)**
- Use breaks to solve 5-10 MCQs from previous day's DPP

**Afternoon Block (3:00 PM - 7:00 PM)**
- Subject 1: Physics
  - Watch: "Laws of Motion - Lec 10 (Friction Part 1)" (45 min)
  - Solve: DPP Friction Set 1 (30 min)
  - Review: R1 for yesterday's lecture (15 min)

**Evening Block (8:00 PM - 11:00 PM)**
- Subject 2: Organic Chemistry
  - Watch: "IUPAC Naming - Lec 3" (45 min)
  - Solve: Module questions (45 min)
  - Review: Previous week's errors (30 min)

---

## Tracking in ChaosPrep Dashboard

### Daily Questions Tracker
Log by subject:
- Physics: 25 questions (from Friction DPP)
- Chemistry: 25 questions (from Organic module)
- **Daily Goal: 50 questions** ✓

### Focus Timer
- Start timer when beginning lecture
- Link task: "Physics: Laws of Motion - Lec 10"
- Use PiP mode to keep timer visible while taking notes
- When you finish, app will auto-mark the task as complete

### Error Log
When you make a mistake:
1. **Type A (Silly)**: Misread "coefficient of friction" as "coefficient of restitution"
2. **Type B (Conceptual)**: Didn't understand when to use static vs kinetic friction
3. **Type C (Formula)**: Forgot the formula for banking angle

Tag errors by chapter: "Laws of Motion - Friction"

### Sunday Backlog Review
Filter tasks by:
- Status: Incomplete
- Subject: Physics
- Week: Last 7 days

Identify lectures that slipped through the cracks and schedule them for next week.

---

## Example: Completing "Motion in a Plane" (17 Lectures)

### Week 1 Plan (Lectures 1-8)
**Monday**: Lec 1 (Introduction) + DPP Set 1
**Tuesday**: Lec 2 (Vectors Part 1) + DPP Set 2 + R1 for Lec 1
**Wednesday**: Lec 3 (Vectors Part 2) + DPP Set 3 + R1 for Lec 2
**Thursday**: Lec 4 (Vectors Part 3) + DPP Set 4 + R1 for Lec 3 + R2 for Lec 1
**Friday**: Lec 5 (Motion in Plane) + DPP Set 5 + R1 for Lec 4
**Saturday**: Lec 6-7 (Projectile Part 1-2) + DPP Set 6-7
**Sunday**: R2 revisions for Lec 2-4 + Error Log practice

### Week 2 Plan (Lectures 9-17)
Continue pattern + R3 revisions for Week 1 lectures

By end of Week 2:
- All 17 lectures watched ✓
- All 17 DPPs solved ✓
- R1 revisions completed ✓
- R2 revisions completed ✓
- R3 revisions in progress
- Chapter status: **Completed** → **Mastered**

---

## Data Files Reference

- Original CSV: `data/LECTURE_PLANNER.xlsx_-_Physics.csv`
- Generated JSON: `data/physics-class-11-updated.json`
- Live in App: `script.js` (lines 94-131)

---

## Next Steps

1. **Add Chemistry & Maths CSVs**: Follow the same structure for your other subjects
2. **Enable Lecture Checkboxes**: Enhance the syllabus UI to show individual lecture completion
3. **Auto-DPP Linking**: Create a feature that auto-suggests a DPP task after marking a lecture complete
4. **Lecture Streak**: Track consecutive days of hitting your "2 lectures/subject" target

---

## Pro Tips for AIR 1 Mindset

1. **Zero-Error Principle**: Never skip a lecture revision
2. **Active Recall**: After each lecture, close your notes and try to explain the concept
3. **Speed Practice**: Time yourself on DPPs - aim for 30 questions in 45 minutes
4. **Weekly Deep Dive**: Every Sunday, pick one "weak" chapter and do a 2-hour problem marathon
5. **Sleep Optimization**: Never sacrifice sleep for extra lectures - consolidated memory is everything

---

Good luck with your JEE preparation! Your syllabus is now structured for systematic mastery.
