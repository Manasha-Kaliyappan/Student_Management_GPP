const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable").querySelector("tbody");
const searchInput = document.getElementById("searchInput");
const filterClass = document.getElementById("filterClass");
const filterAttendance = document.getElementById("filterAttendance");
const summaryDiv = document.getElementById("attendanceSummary");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Save students in localStorage
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Populate class filter dropdown
function populateClassFilter() {
  const classes = [...new Set(students.map(s => s.class))];
  filterClass.innerHTML = '<option value="">All Classes</option>';
  classes.forEach(cls => {
    const option = document.createElement("option");
    option.value = cls;
    option.textContent = cls;
    filterClass.appendChild(option);
  });
}

// Render attendance summary
function renderSummary() {
  const total = students.length;
  const present = students.filter(s => s.attendance === "Present").length;
  const absent = total - present;
  const percentage = total ? ((present / total) * 100).toFixed(2) : 0;

  summaryDiv.innerHTML = `
    <p>Total Students: ${total} | Present: ${present} | Absent: ${absent} | Attendance: ${percentage}%</p>
  `;
}

// Render students in table
function renderStudents() {
  studentTable.innerHTML = "";
  let filtered = students.filter(student => {
    const searchTerm = searchInput.value.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm) ||
      student.roll.toLowerCase().includes(searchTerm);
    const matchesClass = filterClass.value === "" || student.class === filterClass.value;
    const matchesAttendance =
      filterAttendance.value === "" || student.attendance === filterAttendance.value;
    return matchesSearch && matchesClass && matchesAttendance;
  });

  filtered.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.class}</td>
      <td>${student.grade}</td>
      <td>
        <select class="attendance" onchange="updateAttendance(${index}, this.value)">
          <option value="Present" ${student.attendance === "Present" ? "selected" : ""}>Present</option>
          <option value="Absent" ${student.attendance === "Absent" ? "selected" : ""}>Absent</option>
        </select>
      </td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    studentTable.appendChild(row);
  });

  renderSummary();
}

// Add student
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const className = document.getElementById("class").value.trim();
  const grade = document.getElementById("grade").value.trim();

  if (name && roll && className && grade) {
    students.push({ name, roll, class: className, grade, attendance: "Present" });
    saveStudents();
    populateClassFilter();
    renderStudents();
    studentForm.reset();
  }
});

// Edit student
function editStudent(index) {
  const row = studentTable.rows[index];
  const student = students[index];

  const cells = row.cells;
  if (cells[0].contentEditable !== "true") {
    for (let i = 0; i < 4; i++) cells[i].contentEditable = true;
    cells[5].children[0].textContent = "Save";
  } else {
    student.name = cells[0].textContent;
    student.roll = cells[1].textContent;
    student.class = cells[2].textContent;
    student.grade = cells[3].textContent;
    saveStudents();
    renderStudents();
  }
}

// Delete student
function deleteStudent(index) {
  students.splice(index, 1);
  saveStudents();
  populateClassFilter();
  renderStudents();
}

// Update attendance
function updateAttendance(index, value) {
  students[index].attendance = value;
  saveStudents();
  renderSummary();
}

// Download CSV
function downloadCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Name,Roll No,Class,Grade,Attendance\n";
  students.forEach(student => {
    csvContent += `${student.name},${student.roll},${student.class},${student.grade},${student.attendance}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "students_list.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

document.getElementById("downloadCsv").addEventListener("click", downloadCSV);

// Filters
searchInput.addEventListener("input", renderStudents);
filterClass.addEventListener("change", renderStudents);
filterAttendance.addEventListener("change", renderStudents);

// Initialize
populateClassFilter();
renderStudents();
