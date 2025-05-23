document.addEventListener("DOMContentLoaded", () => {
  restoreTasks();
});

//toast success ve error için
function showToast(type) {
  const toast = document.querySelector(`.toast.${type}`);
  if (toast) new bootstrap.Toast(toast).show();
}

function newElement() {
  const input = document.getElementById("task");
  const text = input.value.trim();

  if (!text) {
    showToast("error");
    return;
  }

  createTaskElement(text);
  input.value = "";
  showToast("success");
  storeTasks();
}
// görev listesindeki her bir <li> öğesini oluşturur ve işlevsellik kazandırır
function createTaskElement(text, done = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("checked");

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "×";
  closeBtn.className = "close";

  closeBtn.onclick = () => {
    li.remove();
    storeTasks();
  };

  li.onclick = (e) => {
    if (e.target !== closeBtn) {
      li.classList.toggle("checked");
      storeTasks();
    }
  };

  li.appendChild(closeBtn);
  document.getElementById("list").appendChild(li);
}
// görev listesindeki tüm öğeleri (li) alır ve localStorage'a JSON formatında kaydeder
function storeTasks() {
  const tasks = Array.from(document.querySelectorAll("#list li")).map((li) => ({
    text: li.firstChild.textContent.trim(),
    done: li.classList.contains("checked"),
  }));

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function restoreTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.done));
}
