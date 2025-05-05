let currentExpression = "";

function appendToDisplay(value) {
    currentExpression += value;
    document.getElementById("display").value = currentExpression;
}

function clearDisplay() {
    currentExpression = "";
    document.getElementById("display").value = "";
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    document.getElementById("display").value = currentExpression;
}

function calculate() {
    try {
        // Replace operations with valid JavaScript equivalents
        currentExpression = currentExpression.replace(/\^/g, '**');  // Replace ^ with **
        currentExpression = currentExpression.replace(/sqrt\(/g, 'Math.sqrt('); // Replace sqrt with Math.sqrt

        // Fix trigonometric functions with degrees to radians conversion
        currentExpression = currentExpression.replace(/sin\(([^)]+)\)/g, 'Math.sin(degreesToRadians($1))');
        currentExpression = currentExpression.replace(/cos\(([^)]+)\)/g, 'Math.cos(degreesToRadians($1))');
        currentExpression = currentExpression.replace(/tan\(([^)]+)\)/g, 'Math.tan(degreesToRadians($1))');
        
        // Now replace the closing parentheses after the functions (already done)
        currentExpression = currentExpression.replace(/\)/g, ')');

        // Now use eval to calculate the result
        let result = eval(currentExpression); // Evaluate the expression
        
        // Round the result to avoid precision errors (for small values close to 0)
        if (Math.abs(result) < 1e-10) result = 0; // If the result is very small, treat it as zero
        result = Math.round(result * 1000000) / 1000000; // Round to 6 decimal places

        // Display the result
        document.getElementById("display").value = result;
        currentExpression = result; // Store the result back into currentExpression

    } catch (error) {
        console.error(error);
        document.getElementById("display").value = "Error"; // Show "Error" in case of an exception
        currentExpression = ""; // Reset the expression
    }
}

// Convert degrees to radians for trigonometric functions
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
