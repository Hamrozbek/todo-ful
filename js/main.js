let elForm = document.querySelector(".todo-form");
let elChooseInput = document.querySelector(".choose-input");
let elChooseImg = document.querySelector(".choose-img");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Create Todo
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let imageSrc = elChooseImg.src.includes("blob:") ? elChooseImg.src : null;

  let todo = {
    id: todos[todos.length - 1]?.id ? todos[todos.length - 1].id + 1 : 1,
    title: evt.target.todoInput.value,
    isComplatet: false,
    image: imageSrc
  };

  todos.push(todo);
  evt.target.reset();
  renderTodos(todos, elForm.nextElementSibling);
  localStorage.setItem("todos", JSON.stringify(todos));

  elChooseImg.src = "";
  elChooseImg.classList.remove("h-[200px]");
});

// Render Todos
function renderTodos(arr, list) {
  list.innerHTML = "";

  arr.forEach((item, index) => {
    let elItem = document.createElement("li");
    elItem.className = `bg-transparent ${item.isComplatet ? "line-through opacity-[70%] cursor-not-allowed" : ""} duration-300 p-5 rounded-md`;

    // Faqat rasm bor bo‘lsa, <img> ni qo‘shamiz
    let imgHtml = item.image
      ? `<img class="mt-5 rounded-md w-full h-[300px]" src="${item.image}" alt="todo img" />`
      : "";

    elItem.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 border-[2px] border-white w-[240px] p-3 rounded-md">
          <label>
            <input id="${item.id}" onclick="handleCheckClick(${item.id})" class="hidden" type="checkbox" />
            <div class="w-[20px] relative flex items-center justify-center h-[20px] rounded-full border-[2px] border-white">
              <div class="complate ${item.isComplatet ? "bg-red-600" : ""} absolute inset-[1.2px] rounded-full"></div>
            </div>
          </label>
          <strong class="text-white">${index + 1}.</strong>
          <p class="text-white">${item.title}</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="edit" class="bg-green-600 text-white p-2 rounded-md w-[100px] bg-transparent font-bold border-[2px] border-transparent hover:border-white">Edit</button>
          <button id="delete" class="bg-red-600 text-white p-2 rounded-md w-[100px] bg-transparent font-bold border-[2px] border-transparent hover:border-white">Delete</button>
        </div>
      </div>
      ${imgHtml}
    `;

    list.appendChild(elItem);

    // Edit / Delete eventlari
    elItem.addEventListener("click", function (e) {
      if (e.target.id === "delete") {
        todos.splice(index, 1);
        renderTodos(todos, elForm.nextElementSibling);
        localStorage.setItem("todos", JSON.stringify(todos));
      } else if (e.target.id === "edit") {
        if (!item.isComplatet) {
          let newValue = prompt("Edit title", item.title);
          if (newValue) {
            todos[index].title = newValue;
            renderTodos(todos, elForm.nextElementSibling);
            localStorage.setItem("todos", JSON.stringify(todos));
          }
        }
      }
    });
  });
}

renderTodos(todos, elForm.nextElementSibling);

// Check Part
function handleCheckClick(id) {
  let findObj = todos.find(item => item.id == id);
  findObj.isComplatet = !findObj.isComplatet;
  renderTodos(todos, elForm.nextElementSibling);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Choose Image Part
elChooseInput.addEventListener("change", function (e) {
  elChooseImg.src = URL.createObjectURL(e.target.files[0]);
  elChooseImg.classList.add("h-[200px]");
});
