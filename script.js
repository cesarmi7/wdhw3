const gradeValues = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
};

function addRow() {
    const tbody = document.getElementById('course-rows');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="checkbox" class="include"></td>
        <td><input type="text" placeholder="Course Name" class="course-name"></td>
        <td>
            <select class="grade">
                <option value="">--</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="D-">D-</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><input type="number" class="credits" placeholder="Credits"></td>
        <td><button class="delete-row">✕</button></td>
    `;

    tbody.appendChild(row);

    row.querySelector('.delete-row').addEventListener('click', () => row.remove());
}

function calculateGPA() {
    const rows = document.querySelectorAll('#course-rows tr');
    let totalPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        const include = row.querySelector('.include').checked;
        const grade = row.querySelector('.grade').value;
        const credits = parseFloat(row.querySelector('.credits').value);

        if (include && grade && !isNaN(credits)) {
            totalPoints += gradeValues[grade] * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    document.getElementById('gpa-result').textContent = gpa;
}

function resetForm() {
    document.getElementById('course-rows').innerHTML = ''; 
    document.getElementById('gpa-result').textContent = "0.00";
}

document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('calculate').addEventListener('click', calculateGPA);
document.getElementById('reset').addEventListener('click', resetForm);

addRow();
