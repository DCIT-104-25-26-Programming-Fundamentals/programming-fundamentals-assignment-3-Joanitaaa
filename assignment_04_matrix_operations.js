// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

const readlineSync = require('readline-sync');

function readMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        let row;
        while (true) {
            row = readlineSync.question(`Enter row ${i + 1}: `).split(' ').map(Number);
            if (row.length !== cols) {
                console.log(`Error: expected ${cols} values, got ${row.length}. Try again.`);
                continue;
            }
            break;
        }
        matrix.push(row);
    }
    return matrix;
}

function printMatrix(matrix) {
    for (const row of matrix) {
        console.log(row.map(val => String(val).padStart(6)).join(' '));
    }
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    for (let j = 0; j < cols; j++) {
        result.push(new Array(rows).fill(0));
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}

function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = [];
    for (let i = 0; i < rows; i++) {
        result.push(new Array(cols).fill(0));
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    const result = [];
    for (let i = 0; i < rowsA; i++) {
        result.push(new Array(colsB).fill(0));
    }

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            let total = 0;
            for (let k = 0; k < colsA; k++) {
                total += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = total;
        }
    }
    return result;
}

function main() {
    // ---------- Part A: Transpose ----------
    console.log("=== Part A: Transpose a Matrix ===");
    const rows = readlineSync.questionInt("Enter number of rows: ");
    const cols = readlineSync.questionInt("Enter number of columns: ");
    const matrix = readMatrix(rows, cols);

    console.log("\nOriginal Matrix:");
    printMatrix(matrix);

    const transposed = transposeMatrix(matrix);
    console.log("\nTransposed Matrix:");
    printMatrix(transposed);

    // ---------- Part B: Add Two Matrices ----------
    console.log("\n=== Part B: Add Two Matrices ===");
    const rowsB = readlineSync.questionInt("Enter number of rows for both matrices: ");
    const colsB = readlineSync.questionInt("Enter number of columns for both matrices: ");

    console.log("Matrix 1:");
    const matrix1 = readMatrix(rowsB, colsB);
    console.log("Matrix 2:");
    const matrix2 = readMatrix(rowsB, colsB);

    const sumResult = addMatrices(matrix1, matrix2);
    console.log("\nSum of Matrices:");
    printMatrix(sumResult);

    // ---------- Part C: Multiply Two Matrices ----------
    console.log("\n=== Part C: Multiply Two Matrices ===");
    const m = readlineSync.questionInt("Enter rows of Matrix A: ");
    const n = readlineSync.questionInt("Enter columns of Matrix A (= rows of Matrix B): ");
    const p = readlineSync.questionInt("Enter columns of Matrix B: ");

    console.log("Matrix A:");
    const matrixA = readMatrix(m, n);
    console.log("Matrix B:");
    const matrixB = readMatrix(n, p);

    const product = multiplyMatrices(matrixA, matrixB);
    console.log("\nProduct of Matrices (A x B):");
    printMatrix(product);
}

main();

// =============================================================================

const readlineSync = require('readline-sync');

