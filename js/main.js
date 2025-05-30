let elForm = document.querySelector(".todo-form");

let localTodos = localStorage.getItem("todos");
let todos = localTodos ? JSON.parse(localTodos) : [];

// Create todo 
elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let todo = {
        id: todos[todos.length - 1]?.id ? todos[todos.length - 1].id + 1 : 1,
        title: evt.target.todoInput.value,
        isComplated: false
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    evt.target.reset();
    renderTodos(todos, elForm.nextElementSibling);
});
// Create todo  

// Render todos 
function renderTodos(arr, list) {
    list.innerHTML = null;
    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = `bg-white ${item.isComplated ? "line-through opacity-[70%] cursor-not-allowed" : ""} duration-300 p-5 rounded-md flex items-center justify-between`;

        elItem.innerHTML = `
            <div class="flex items-center gap-2">
                <label>
                    <input class="hidden" type="checkbox">
                    <div onclick="handleCheckClick(${item.id})" class="w-[20px] h-[20px] relative flex items-center justify-center rounded-full border-[1px] border-slate-500">
                        <div class="${item.isComplated ? "bg-red-600" : ""} absolute inset-[1px] rounded-full"></div>
                    </div>
                </label>
                <strong>${index + 1}.</strong>
                <p>${item.title}</p>
            </div>
            <div class="flex gap-2 items-center">
                <button id="edit" class="bg-green-600 text-white p-2 rounded-md w-[100px]">Edit</button>
                <button id="delete" class="bg-red-600 text-white p-2 rounded-md w-[100px]">Delete</button>
            </div>
        `;
        list.appendChild(elItem);

        elItem.addEventListener("click", function (e) {
            if (e.target.id === "delete") {
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                renderTodos(todos, elForm.nextElementSibling);
            } else if (e.target.id === "edit") {
                if (!item.isComplated) {
                    let newValue = prompt("Edit todo:", item.title);
                    if (newValue !== null && newValue.trim()) {
                        todos[index].title = newValue.trim();
                        localStorage.setItem("todos", JSON.stringify(todos));
                        renderTodos(todos, elForm.nextElementSibling);
                    }
                }
            }
        });
    });
}
// render todos 

// check part 
function handleCheckClick(id) {
    let findObj = todos.find(item => item.id === id);
    if (findObj) {
        findObj.isComplated = !findObj.isComplated;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos(todos, elForm.nextElementSibling);
    }
}
renderTodos(todos, elForm.nextElementSibling);
// check part
