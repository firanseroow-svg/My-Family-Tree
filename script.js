let persons = [];
let selected = null;
let idCounter = 1;

const tree = document.getElementById("tree");
const svg = document.getElementById("lines");

function createPerson(name, x, y) {
  return {
    id: idCounter++,
    name,
    x,
    y,
    parents: [],
    children: [],
    partner: null
  };
}

/* ROOT PERSON */
const root = createPerson("Saya", 500, 350);
persons.push(root);
selected = root;

function render() {
  tree.innerHTML = "";
  svg.innerHTML = "";

  persons.forEach(p => {
    const div = document.createElement("div");
    div.className = "person" + (p === selected ? " selected" : "");
    div.style.left = p.x + "px";
    div.style.top = p.y + "px";
    div.textContent = p.name;

    div.onclick = () => {
      selected = p;
      render();
    };

    tree.appendChild(div);
  });

  drawLines();
}

function drawLines() {
  persons.forEach(p => {
    p.children.forEach(c => drawLine(p, c));
    if (p.partner) drawLine(p, p.partner, true);
  });
}

function drawLine(a, b, isPartner = false) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", a.x + 40);
  line.setAttribute("y1", a.y + 20);
  line.setAttribute("x2", b.x + 40);
  line.setAttribute("y2", b.y + 20);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "2");
  if (isPartner) line.setAttribute("stroke-dasharray", "4");
  svg.appendChild(line);
}

/* ACTIONS */
function getName() {
  const name = document.getElementById("nameInput").value;
  if (!name) {
    alert("Masukkan nama dulu");
    return null;
  }
  return name;
}

function addParent() {
  const name = getName();
  if (!name || !selected) return;

  const p = createPerson(name, selected.x, selected.y - 100);
  p.children.push(selected);
  selected.parents.push(p);

  persons.push(p);
  render();
}

function addChild() {
  const name = getName();
  if (!name || !selected) return;

  const c = createPerson(name, selected.x, selected.y + 100);
  selected.children.push(c);
  c.parents.push(selected);

  persons.push(c);
  render();
}

function addPartner() {
  const name = getName();
  if (!name || !selected) return;

  const p = createPerson(name, selected.x + 120, selected.y);
  selected.partner = p;
  p.partner = selected;

  persons.push(p);
  render();
}

function addSibling() {
  const name = getName();
  if (!name || !selected || selected.parents.length === 0) {
    alert("Sibling butuh parent");
    return;
  }

  const parent = selected.parents[0];
  const s = createPerson(name, selected.x + 120, selected.y);
  parent.children.push(s);
  s.parents.push(parent);

  persons.push(s);
  render();
}

function deletePerson() {
  if (!selected) return;
  persons = persons.filter(p => p !== selected);
  selected = persons[0] || null;
  render();
}

render();
