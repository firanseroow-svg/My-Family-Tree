let selected = null;

const levels = [
  [], // parents
  [], // me + siblings
  []  // children
];

// ROOT
const me = { name: "Saya" };
levels[1].push(me);
selected = me;

function render() {
  const tree = document.getElementById("tree");
  tree.innerHTML = "";

  levels.forEach((level, i) => {
    const div = document.createElement("div");
    div.className = "level";

    level.forEach(p => {
      const el = document.createElement("div");
      el.className = "person" + (p === selected ? " selected" : "");
      el.contentEditable = true;
      el.innerText = p.name;

      el.onclick = (e) => {
        e.stopPropagation();
        selected = p;
        render();
      };

      el.onblur = () => {
        p.name = el.innerText;
      };

      div.appendChild(el);
    });

    tree.appendChild(div);
  });
}

function addParent() {
  const name = getName();
  if (!name) return;
  levels[0].push({ name });
  render();
}

function addPartner() {
  const name = getName();
  if (!name) return;
  levels[1].push({ name });
  render();
}

function addSibling() {
  const name = getName();
  if (!name) return;
  levels[1].push({ name });
  render();
}

function addChild() {
  const name = getName();
  if (!name) return;
  levels[2].push({ name });
  render();
}

function deletePerson() {
  levels.forEach(level => {
    const i = level.indexOf(selected);
    if (i !== -1) level.splice(i, 1);
  });
  selected = me;
  render();
}

function getName() {
  const input = document.getElementById("nameInput");
  if (!input.value) {
    alert("Nama kosong");
    return null;
  }
  const name = input.value;
  input.value = "";
  return name;
}

render();
