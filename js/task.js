//Блок глобальных переменных проекта
const taskForm = document.querySelector('#tasks__form');
const input = document.querySelector('.tasks__input');
const list = document.querySelector('.tasks__list');
// Получение задач из LS, если есть. Если нет, пустой массив
let tasks = loadTaskFromLocalStorage();

// Первоначальный рендер задач из LS
tasks.forEach(renderTask);

//Блок функций

// Функция получения задач из LS
function loadTaskFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  console.log(JSON.parse(tasks));
  return tasks ? JSON.parse(tasks) : [];
}

//  Функция создания объекта новой задачи
function createNewTask(tastText) {
  return {
    id: String(Date.now()),
    text: tastText,
    done: false,
  };
}

function renderTask(task) {
  list.innerHTML += `
  <div class="task" data-id="${task.id}">
    <div class="task__title${task.done ? ' task__done' : ''}">${task.text}</div>
    <a href="#" class="task__edit">
      <img src="./../images/galochka.svg" alt="Выполнено" class='task__done__img'/>
    </a>
    <a href="#" class="task__remove">
      <img src="./../images/delete.svg" alt="Удалить" class='task__del__img'/>
    </a>
  </div>`;
}

// Добавление новой задачи из формы
function appendTask(tastText) {
  let task = createNewTask(tastText.trim());
  renderTask(task);
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Изменение статуса выполнено/не выполнено
function changeTaskStatus(taskElement) {
  let taskId = taskElement.dataset.id;
  let task = tasks.find((task) => task.id === taskId);
  task.done = !task.done;
  taskElement.firstElementChild.classList.toggle('task__done');
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Удаление
function removeTask(taskElement) {
  let taskId = taskElement.dataset.id;
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskElement.remove();
}

// Обработчик формы
function handleSubmit(event) {
  event.preventDefault();
  appendTask(input.value);
  input.value = '';
}

//Блок обработчиков
taskForm.addEventListener('submit', handleSubmit);

list.addEventListener('click', (event) => {
  let element = event.target;

  if (element.classList.contains('task__done__img')) {
    changeTaskStatus(element.closest('.task'));
  } else if (element.classList.contains('task__del__img')) {
    removeTask(element.closest('.task'));
  }
});
