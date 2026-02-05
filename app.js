// app.js
// Por ahora no necesitamos JS. Esto es solo para que el archivo exista sin errores.
console.log("Gradebook loaded");    assignments: []
  },
  {
    name: "FUND VOLLEYBALL 1",
    period: "4 (12:55 PM - 2:25 PM)",
    teacher: "MOURA, EDDIE",
    q: { Q1:"A-", Q2:"A", Q3:"", Q4:"" },
    assignments: []
  },
  {
    name: "US HISTORY",
    period: "5 (7:35 AM - 9:05 AM)",
    teacher: "ANDERSON, C",
    q: { Q1:"F", Q2:"F", Q3:"F", Q4:"" },
    assignments: [
      { title:"Trading Card", due:"2026-02-04", status:"Missing" },
      { title:"Great Depression Accounts", due:"2026-02-04", status:"Missing" }
    ]
  },
  {
    name: "SECONDARY MATH 3",
    period: "6 (9:10 AM - 10:40 AM)",
    teacher: "HILTON, M",
    q: { Q1:"D", Q2:"C-", Q3:"C-", Q4:"" },
    assignments: [
      { title:"Practice Test", due:"2026-02-06", status:"In Progress" }
    ]
  },
  {
    name: "ENG LANG DEV LEVEL 2",
    period: "8 (12:55 PM - 2:25 PM)",
    teacher: "THOMAS, AMANDA",
    q: { Q1:"C-", Q2:"B", Q3:"A", Q4:"" },
    assignments: []
  }
];

const $ = (id) => document.getElementById(id);

$("studentName").textContent = student.name;
$("schoolLine").textContent = student.schoolLine;

function renderMissing(){
  const missing = [];
  for(const c of classes){
    for(const a of c.assignments){
      if((a.status||"").toLowerCase() === "missing"){
        missing.push({ ...a, className: c.name, teacher: c.teacher });
      }
    }
  }

  $("missingCount").textContent = String(missing.length);
  const list = $("missingList");
  list.innerHTML = "";

  missing.slice(0, 6).forEach(m => {
    const div = document.createElement("div");
    div.className = "mitem";
    div.innerHTML = `
      <div class="muted"><i>Due:</i> ${m.due} &nbsp; 
        <a href="#" onclick="return false;">${m.title}</a>, 
        <b>${m.className}</b> (Period ?) <b>${m.teacher}</b>
      </div>
    `;
    list.appendChild(div);
  });

  if(missing.length === 0){
    list.innerHTML = `<div class="mitem muted">No missing assignments (demo).</div>`;
  }
}

function rowHtml(c, idx){
  return `
    <tr>
      <td class="c-class">
        <a class="class-name" href="#" onclick="openModal(${idx}); return false;">${c.name}</a>
        <div class="class-sub">Period ${c.period}<br>${c.teacher}</div>
      </td>
      <td class="c-q"><span class="grade">${c.q.Q1 || ""}</span></td>
      <td class="c-q"><span class="grade">${c.q.Q2 || ""}</span></td>
      <td class="c-q q-current"><span class="grade">${c.q.Q3 || ""}</span></td>
      <td class="c-q"><span class="grade">${c.q.Q4 || ""}</span></td>
    </tr>
  `;
}

function renderTable(){
  const tbody = $("rows");
  tbody.innerHTML = classes.map(rowHtml).join("");
}

function openModal(i){
  const c = classes[i];
  $("mTitle").textContent = c.name;
  $("mSub").textContent = `Period ${c.period} • ${c.teacher}`;
  $("mGrade").textContent = c.q.Q3 || c.q.Q2 || c.q.Q1 || "—";

  const wrap = $("mAssign");
  wrap.innerHTML = "";

  if(!c.assignments.length){
    wrap.innerHTML = `<div class="a muted">No assignments (demo).</div>`;
  } else {
    c.assignments.forEach(a => {
      const div = document.createElement("div");
      const st = (a.status || "").toLowerCase();
      const cls = st === "missing" ? "missing" : (st === "completed" ? "done" : "");
      div.className = "a";
      div.innerHTML = `
        <div class="top">
          <span>${a.title}</span>
          <span class="badge ${cls}">${a.status}</span>
        </div>
        <div class="muted">Due: ${a.due}</div>
      `;
      wrap.appendChild(div);
    });
  }

  $("mbg").hidden = false;
  $("modal").hidden = false;
}

function closeModal(){
  $("mbg").hidden = true;
  $("modal").hidden = true;
}

$("closeBtn").addEventListener("click", closeModal);
$("mbg").addEventListener("click", closeModal);

renderMissing();
renderTable();

// Exponer para los onclick del HTML
window.openModal = openModal;
window.closeModal = closeModal;
