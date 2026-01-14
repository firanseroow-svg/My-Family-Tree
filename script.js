let family = [
  { id: 1, name: "Saya", role: "me" }
];

const treeDiv = document.getElementById("tree");

function renderTree() {
  treeDiv.innerHTML = "";
  family.forEach(person => {
    const div = document.createElement("div");
    div.className = "person";
    div.innerHTML = `
      <strong>${person.name}</strong><br>
      <small>${person.role}</small><br>
      <button onclick="deletePerson(${person.id})">Delete</button>
    `;
    treeDiv.appendChild(div);
  });
}

function addPerson() {
  const name = document.getElementById("nameInput").value;
  const role = document.getElementById("relation").value;

  if (!name) {
    alert("Nama tidak boleh kosong!");
    return;
  }

  family.push({
    id: Date.now(),
    name: name,
    role: role
  });

  document.getElementById("nameInput").value = "";
  renderTree();
}

function deletePerson(id) {
  family = family.filter(person => person.id !== id);
  renderTree();
}

renderTree();
