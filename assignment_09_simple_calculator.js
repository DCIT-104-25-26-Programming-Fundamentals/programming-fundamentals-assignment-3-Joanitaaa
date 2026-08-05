// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
const readlineSync = require('readline-sync');

function displayMenu() {
    console.log("================================");
    console.log("   STUDENT RECORD SYSTEM MENU");
    console.log("================================");
    console.log("1. Add student");
    console.log("2. Display all students");
    console.log("3. Calculate average score");
    console.log("4. Quit");
}

function calculateAverage(scores) {
    let total = 0;
    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }
    return total / scores.length;
}

function addStudent(students) {
    const name = readlineSync.question("Student name: ");
    const id = readlineSync.questionInt("Student ID: ");

    const numScores = readlineSync.questionInt("How many scores? ");
    const scores = [];
    for (let i = 0; i < numScores; i++) {
        const score = readlineSync.questionFloat(`Enter score ${i + 1}: `);
        scores.push(score);
    }

    const student = { name: name, id: id, scores: scores };
    students.push(student);
    console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents(students) {
    if (students.length === 0) {
        console.log("No students have been added yet.");
        return;
    }

    console.log("-".repeat(50));
    console.log(
        "Name".padEnd(15) + "ID".padEnd(12) + "Scores".padEnd(15) + "Average".padEnd(10)
    );
    console.log("-".repeat(50));

    for (const student of students) {
        const scoresStr = student.scores.join(', ');
        const avg = calculateAverage(student.scores).toFixed(2);
        console.log(
            student.name.padEnd(15) +
            String(student.id).padEnd(12) +
            scoresStr.padEnd(15) +
            String(avg).padEnd(10)
        );
    }
    console.log("-".repeat(50));
}

function findStudentAverage(students) {
    const searchId = readlineSync.questionInt("Enter student ID: ");

    for (const student of students) {
        if (student.id === searchId) {
            const avg = calculateAverage(student.scores).toFixed(2);
            console.log(`${student.name}'s average score: ${avg}`);
            return;
        }
    }

    console.log("Error: No student found with that ID.");
}

function main() {
    let students = [];

    while (true) {
        displayMenu();
        const choice = readlineSync.questionInt("Enter your choice (1-4): ");

        if (choice === 1) {
            addStudent(students);
        } else if (choice === 2) {
            displayAllStudents(students);
        } else if (choice === 3) {
            findStudentAverage(students);
        } else if (choice === 4) {
            console.log("Goodbye!");
            break;
        } else {
            console.log("Error: Invalid choice. Please enter a number from 1 to 4.");
        }

        console.log();
    }
}

main();

// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


