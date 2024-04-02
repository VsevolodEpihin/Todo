const DOUBLE_CLICK = 2;
const TASKS_ON_PAGE = 5;

const addTaskButton = document.querySelector('.add-task');
const textTask = document.querySelector('.text');
const listTaskContainer = document.querySelector('.task-container');
const todoContainer = document.querySelector('.todo')
const checkAllTasks = document.querySelector('.check-all-tasks')
const deleteCompletedTaskButton = document.querySelector('.delete-all-tasks')
const optionButtons = document.querySelector('.btn-options')
const paginationButtons = document.querySelector('.pagination-buttons')

let tasks = [];
let tab = 'check-all';
let currentPage = 1;

const changeCurrentPage = (event) => {
  if(event.target !== paginationButtons){
    currentPage = Number(event.target.textContent)
    renderTask()
  }
}

const slicer = (tasks) =>{
  let end = currentPage*TASKS_ON_PAGE 
  let start = end-TASKS_ON_PAGE 
  return tasks.slice(start,end)
}

const pagination = (tasks) => { 
  let pages = Math.ceil(tasks.length / TASKS_ON_PAGE);
  let btnPaginate = '';
  for(let i = 1; i <= pages; i++){
    btnPaginate+=`<button id="paginate-${i}">${i}</button>`
  }
  paginationButtons.innerHTML = btnPaginate;
}

const showTaskTab = () => {
  if(tab === 'check-all'){
    return tasks
  }
  if(tab === 'check-active'){
    return tasks.filter((task)=>!task.isChecked)
  }
  if(tab === 'check-completed'){
    return tasks.filter((task)=>task.isChecked) 
  }
}

const changeStyleActivePaginate = () => {
  let buttons = Array.from(paginationButtons.children)
  buttons.forEach((btn)=>{
    if(currentPage === Number(btn.textContent)){
      btn.classList.add('is-active')
    }else{
      btn.classList.remove('is-active')
    }
  })
}

const renderTask = () => {
  let currentListTasks = showTaskTab()
  pagination(currentListTasks)
  let tasksForRender = slicer(currentListTasks)
  let listTask = '';
  tasksForRender.forEach((task) => {
    listTask += `
      <li id=${task.id}>
        <input type="checkbox" ${task.isChecked ? "checked":""}/> 
        <input class="i-1" width="50px" hidden/>
        <span>${task.text}</span>
        <button type="button" class="remove-task">x</button>
      </li>`;
  });

  listTaskContainer.innerHTML = listTask;
  changeStyleActivePaginate()
  counterTasks()
};

const validateValue = () => {
  if(textTask.value.trim()){
    return true
  }else{
    return false
  }
}

const addTask = () => {
  let validate = validateValue()
  if (validate) {
    tab='check-all';
    addActiveStyle(optionButtons.firstElementChild)
    let task = {
      id: Date.now(),
      isChecked: false,
      text: textTask.value,
    };
    tasks.push(task);
    renderTask();
    textTask.value = '';
  };
  currentPage = Math.ceil(tasks.length/TASKS_ON_PAGE)
  renderTask()
  changeCurrentPage()
};

const addTaskWithEnter = (event) => {//
  let validate = validateValue()
  if (event.code ==='Enter' && textTask.value && validate) {
    tab='check-all';
    addTask()
  };
}

const removeTask = (event) => {//
    tasks = tasks.filter((task) => Number(event.target.parentNode.id) !== task.id);
    renderTask();
    addActiveStyle(optionButtons.firstElementChild)
};



const changeGlobalCheckbox = () => {
  let copyTask = tasks.every((task)=>task.isChecked)
    checkAllTasks.checked = (copyTask) ? true:false 
    renderTask()
}

const markTask = (event,currentCopyList) => {//?
     tasks.forEach((task)=>{
      if(Number(event.target.parentNode.id) === task.id){
        task.isChecked = event.target.checked
      }
    })
    renderTask()
}

const editTaskText = (event) => {//
  if(event.detail === DOUBLE_CLICK){
    event.target.hidden = true;
    event.target.previousElementSibling.hidden = false;
    event.target.previousElementSibling.focus()
  }
}

const changeTextInTasks = (event) => {//
  if(event.target.value){
    tasks.forEach((task) => {
      if(Number(event.target.parentNode.id) === task.id){
        task.text = event.target.value;
      }
    })
  }
}

const writeChanges = (event) => {//
  if(event.code === 'Enter'){
    changeTextInTasks(event)
    renderTask()
  }
  if(event.code === 'Escape'){
    renderTask()
  }
}

const writeChangesBlur = (event) => {//
  console.log(event.target)
    if(event.target.value && event.target.type!=='checkbox'){
      changeTextInTasks(event)
    }
    renderTask()
}

const selectActionTask = (event) => {//
  if (event.target.type === 'button') removeTask(event)
  if (event.target.type === 'checkbox') markTask(event)
  if (event.target.tagName === 'SPAN') editTaskText(event)
}

const counterTasks = () => {
  let allTasks = tasks.length;
  let activeTasks = tasks.filter((task)=>!task.isChecked).length;
  let completedTasks = tasks.filter((task)=>task.isChecked).length;

  optionButtons.firstElementChild.firstElementChild.textContent = allTasks;
  optionButtons.lastElementChild.firstElementChild.textContent = completedTasks;
  optionButtons.firstElementChild.nextElementSibling.firstElementChild.textContent = activeTasks;
}

const markAllTask = (event) => {//
  tasks.forEach((elem)=>{
    elem.isChecked = event.target.checked;
  })
  renderTask()
  addActiveStyle(optionButtons.firstElementChild)
}

const addActiveStyle = (parentCurrentTarget) => {
  Array.from(optionButtons.children).forEach((elem)=>{
    if(elem.name === parentCurrentTarget.name){
      elem.classList.add('active-tab')
    }else{
      elem.classList.remove('active-tab')
    }
  })
}

const typeFilter = (event)=> {
  let parent = event.target;
  if(parent.tagName === "SPAN") parent = event.target.parentNode
  addActiveStyle(parent)
  tab = parent.id
  currentPage = 1;
  renderTask()
}

const deleteCompletedTasks = () => {
  tasks = tasks.filter((elem)=> !elem.isChecked)
  renderTask()
}

addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
listTaskContainer.addEventListener('keydown',writeChanges)
listTaskContainer.addEventListener('blur',writeChangesBlur,true)
textTask.addEventListener('keydown',addTaskWithEnter)
checkAllTasks.addEventListener('change',markAllTask)
deleteCompletedTaskButton.addEventListener('click',deleteCompletedTasks)
optionButtons.addEventListener('click',typeFilter)
paginationButtons.addEventListener('click',changeCurrentPage)