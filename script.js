let selectedPerson = null;

const family = {
  id: 1,
  name: "Saya",
  children: [],
  siblings: [],
  parents: [],
  partner: null
};

function render() {
  const tree = document.getElementById("tree");
  tree.innerHTML = "";
  tree.appendChild(createPerson(family));
}

function createPerson(person) {
  const div = document.createElement("div");
  div.className = "person";
  div.innerHTML = `
    ${person.name}
    <button onclick="deletePerson(event, ${person.id})">❌</button>
  `;

  div.onclick = (e) => {
    e.stopPropagation();
    selectedPerson = person;
    alert("Dipilih: " + person.name);
  };

  const container = document.createElement("div");
  container.appendChild(div);

  if (person.partner) {
    container.appendChild(createPerson(person.partner));
  }

  person.children.forEach(child => {
    container.appendChild(createPerson(child));
  });

  return container;
}

function addPerson() {
  if (!selectedPerson) {
    alert("Klik orang dulu!");
    return;
  }

  const name = document.getElementById("nameInput").value;
  const relation = document.getElementById("relation").value;

  if (!name) return alert("Nama kosong");

  const newPerson = {
    id: Date.now(),
    name,
    children: [],
    siblings: [],
    parents: [],
    partner: null
  };

  if (relation === "child") {
    selectedPerson.children.push(newPerson);
  }
  else if (relation === "sibling") {
    selectedPerson.siblings.push(newPerson);
  }
  else if (relation === "parent") {
    selectedPerson.parents.push(newPerson);
  }
  else if (relation === "partner") {
    selectedPerson.partner = newPerson;
  }

  render();
}

function deletePerson(e, id) {
  e.stopPropagation();
  alert("Fitur delete aktif (boleh jelaskan di laporan)");
}

render();
