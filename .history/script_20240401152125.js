const DOUBLE_CLICK = 2;

const addTaskButton = document.querySelector('.add-task');
const textTask = document.querySelector('.text');
const listTaskContainer = document.querySelector('.task-container');
const todoContainer = document.querySelector('.todo')
const checkAllTasks = document.querySelector('.check-all-tasks')
const deleteCompletedTaskButton = document.querySelector('.delete-all-tasks')
const optionButtons = document.querySelector('.btn-options')

let tasks = [];
let tab = 'check-all';



const showTaskTab = () => {
  let copyArr = []
  if(tab === 'check-all'){
    // addActiveStyle(currentParent)
    return tasks
  }
  if(tab === 'check-active'){
    // addActiveStyle(currentParent)
    return copyArr=tasks.filter((task)=>!task.isChecked)
  }
  if(tab === 'check-completed'){
    // addActiveStyle(currentParent)
    return copyArr=tasks.filter((task)=>task.isChecked) 
  }
}

const renderTask = () => {
   let currentListTasks = showTaskTab()
  console.log(currentListTasks)
  let listTask = '';
  currentListTasks.forEach((task) => {
    listTask += `
      <li id=${task.id}>
        <input type="checkbox" ${task.isChecked ? "checked":""}/> 
        <input class="i-1" width="50px" hidden/>
        <span>${task.text}</span>
        <button type="button" class="remove-task">x</button>
      </li>`;
  });

  listTaskContainer.innerHTML = listTask;
  counterTasks()
};

const addTask = () => {
  if (textTask.value) {
    let task = {
      id: Date.now(),
      isChecked: false,
      text: textTask.value,
    };
    tasks.push(task);
    renderTask();
    textTask.value = '';
    addActiveStyle(optionButtons.firstElementChild)
  };
};

const addTaskWithEnter = (event) => {//
  if (event.code ==='Enter' && textTask.value) {
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
    addActiveStyle(optionButtons.firstElementChild)
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

  console.log(allTasks,activeTasks,completedTasks)

  optionButtons.firstElementChild.firstElementChild.textContent = allTasks;
  optionButtons.lastElementChild.firstElementChild.textContent = completedTasks;
  optionButtons.firstElementChild.nextElementSibling.firstElementChild.textContent = activeTasks;

}

const markAllTask = (event) => {//
  console.log(event.target)
  tasks.forEach((elem)=>{
    elem.isChecked = event.target.checked;
  })
  renderTask()
  addActiveStyle(optionButtons.firstElementChild)
}

 
const addActiveStyle = (parentCurrentTarget) => {
  console.log(parentCurrentTarget,optionButtons.children)
  Array.from(optionButtons.children).forEach((elem)=>{
    if(elem.name === parentCurrentTarget.name){
      elem.classList.add('active-tab')
    }else{
      elem.classList.remove('active-tab')
    }

  })
}


const typeFilter = (event)=> {

  console.log(event.target.id)
  tab = event.target.id
  renderTask()
 
}

const deleteCompletedTasks = (event) => {
  tasks = tasks.filter((elem)=> !elem.isChecked)
  renderTask()
  deleteCompletedTaskButton.checked = false;
  checkAllTasks.checked = false;
}

addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
listTaskContainer.addEventListener('keydown',writeChanges)
listTaskContainer.addEventListener('blur',writeChangesBlur,true)
textTask.addEventListener('keydown',addTaskWithEnter)
checkAllTasks.addEventListener('change',markAllTask)
deleteCompletedTaskButton.addEventListener('click',deleteCompletedTasks)
optionButtons.addEventListener('click',typeFilter)