// Script to convert Physics CSV lecture planner to ChaosPrep syllabus JSON format
const fs = require('fs');

const csvData = `Subject,Chapter Name,Topic,Lecture Number
Physics,Units and Measurements,Introduction,1
Physics,Units and Measurements,Physical Quantities,2
Physics,Units and Measurements,System of Units,3
Physics,Units and Measurements,Dimensions of Physical Quantities,4
Physics,Units and Measurements,Dimensional Constants Dimensional Variables,5
Physics,Units and Measurements,Non Dimensional Constants Non Dimensional Variables,6
Physics,Units and Measurements,Dimensional Analysis and its Applications,7
Physics,Units and Measurements,Significant Figures,8
Physics,Units and Measurements,Errors in Measurement,9
Physics,Units and Measurements,Errors in Measurement,10
Physics,Units and Measurements,Errors in Measurement,11
Physics,Units and Measurements,Errors in Measurement,12
Physics,Units and Measurements,Errors in Measurement,13
Physics,Units and Measurements,Errors in Measurement,14
Physics,Mathematical Tools,Algebra,1
Physics,Mathematical Tools,AP series,2
Physics,Mathematical Tools,GP series,3
Physics,Mathematical Tools,Binomial Expression,4
Physics,Mathematical Tools,approximation,5
Physics,Mathematical Tools,Functions,6
Physics,Mathematical Tools,Graphs,7
Physics,Mathematical Tools,Differentiation and Integration,8
Physics,Mathematical Tools,Differentiation and Integration,9
Physics,Mathematical Tools,Differentiation and Integration,10
Physics,Mathematical Tools,Differentiation and Integration,11
Physics,Motion in a Straight Line,Introduction,1
Physics,Motion in a Straight Line,"Concept of position, path length (distance), displacement",2
Physics,Motion in a Straight Line,Speed,3
Physics,Motion in a Straight Line,Velocity,4
Physics,Motion in a Straight Line,Acceleration,5
Physics,Motion in a Straight Line,Graphs,6
Physics,Motion in a Straight Line,Graphs,7
Physics,Motion in a Straight Line,Graphs,8
Physics,Motion in a Straight Line,Graphs,9
Physics,Motion in a Straight Line,Graphs,10
Physics,Motion in a Straight Line,Motion with constant acceleration (uniformly acceleration motion),11
Physics,Motion in a Straight Line,Motion with variable acceleration,12
Physics,Motion in a Straight Line,Motion with variable acceleration,13
Physics,Motion in a Straight Line,Relative motion in one dimension only,14
Physics,Motion in a Plane,Introduction,1
Physics,Motion in a Plane,Scalars and Vectors,2
Physics,Motion in a Plane,Scalars and Vectors,3
Physics,Motion in a Plane,Scalars and Vectors,4
Physics,Motion in a Plane,Motion in a plane,5
Physics,Motion in a Plane,Projectile Motion,6
Physics,Motion in a Plane,Projectile Motion,7
Physics,Motion in a Plane,Projectile Motion,8
Physics,Motion in a Plane,Motion in a plane,9
Physics,Motion in a Plane,Relative Velocity,10
Physics,Motion in a Plane,Relative Velocity,11
Physics,Motion in a Plane,Relative Velocity,12
Physics,Motion in a Plane,Circular motion,13
Physics,Motion in a Plane,Circular motion,14
Physics,Motion in a Plane,Circular motion,15
Physics,Motion in a Plane,Circular motion,16
Physics,Motion in a Plane,Circular motion,17
Physics,Laws of Motion,Newton's Laws of motion,1
Physics,Laws of Motion,Newton's Laws of motion,2
Physics,Laws of Motion,Newton's Laws of motion,3
Physics,Laws of Motion,Newton's Laws of motion,4
Physics,Laws of Motion,Newton's Laws of motion,5
Physics,Laws of Motion,Newton's Laws of motion,6
Physics,Laws of Motion,Newton's Laws of motion,7
Physics,Laws of Motion,Spring,8
Physics,Laws of Motion,Pseudo Force,9
Physics,Laws of Motion,Friction,10
Physics,Laws of Motion,Friction,11
Physics,Laws of Motion,Friction,12
Physics,Laws of Motion,Friction,13
Physics,Laws of Motion,Friction,14
Physics,Laws of Motion,Friction,15
Physics,Circular Motion,Centripital Acceleration,1
Physics,Circular Motion,Tangential Acceleration,2
Physics,Circular Motion,Dynamics of Circular Motion,3
Physics,Circular Motion,Banking of Road Conical pendulum,4
Physics,Circular Motion,Banking of Road Conical pendulum,5
Physics,"Work, Energy and Power",Work,1
Physics,"Work, Energy and Power",Work,2
Physics,"Work, Energy and Power",Work,3
Physics,"Work, Energy and Power",Energy,4
Physics,"Work, Energy and Power",Energy,5
Physics,"Work, Energy and Power",Energy,6
Physics,"Work, Energy and Power",Circular Motion,7
Physics,"Work, Energy and Power",Circular Motion,8
Physics,Centre of Mass & System of Particles,COM,1
Physics,Centre of Mass & System of Particles,COM,2
Physics,Centre of Mass & System of Particles,COM,3`;

// Parse CSV
const lines = csvData.trim().split('\n').slice(1); // Skip header
const chapters = {};

lines.forEach(line => {
    const [subject, chapterName, topic, lectureNum] = line.split(',').map(s => s.trim());

    if (!chapters[chapterName]) {
        chapters[chapterName] = {
            name: chapterName,
            topics: []
        };
    }

    chapters[chapterName].topics.push({
        topic: topic.replace(/^"(.*)"$/, '$1'), // Remove quotes if present
        lectureNumber: parseInt(lectureNum)
    });
});

// Generate chapter IDs and organize by unit
const unitMapping = {
    "Mechanics I": [
        "Units and Measurements",
        "Mathematical Tools",
        "Motion in a Straight Line",
        "Motion in a Plane",
        "Laws of Motion",
        "Circular Motion"
    ],
    "Mechanics II": [
        "Work, Energy and Power",
        "Centre of Mass & System of Particles"
    ]
};

const units = [];
let chapterIdCounter = 1;

Object.entries(unitMapping).forEach(([unitName, chapterNames]) => {
    const unit = {
        unitName,
        chapters: []
    };

    chapterNames.forEach(chapterName => {
        if (chapters[chapterName]) {
            const chapterId = `PHY_C11_${String(chapterIdCounter).padStart(2, '0')}`;
            unit.chapters.push({
                id: chapterId,
                name: chapterName,
                priority: 'A', // Class 11 - all high priority
                totalLectures: chapters[chapterName].topics.length,
                topics: chapters[chapterName].topics
            });
            chapterIdCounter++;
        }
    });

    units.push(unit);
});

const physicsSyllabus = {
    subject: "Physics",
    class: "11",
    units: units
};

console.log(JSON.stringify(physicsSyllabus, null, 2));
