const DOUBLE_CLICK = 2;

const addTaskButton = document.querySelector('.add-task');
const textTask = document.querySelector('.text');
const listTaskContainer = document.querySelector('.task-container');

let tasks = [];

const renderTask = () => {
  
  let listTask = '';
  tasks.forEach((task) => {
    listTask += `
      <li id=${task.id}>
        <input type='checkbox' ${task.isChecked ? 'checked':''}/> 
        <input width='50px' hidden/>
        <span>${task.text}</span>
        <button type='button' class='remove-task'>x</button>
      </li>`;
  });
  listTaskContainer.innerHTML = listTask;
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
  };
};

let addTaskWithEnter = (event) => {
  if (event.code ==='Enter' && textTask.value) {
    addTask()
  };
}

let removeTask = (event) => {
    tasks = tasks.filter((task) => Number(event.target.parentNode.id) !== task.id);
    renderTask();
  
};
let markTask = (event) => {
     tasks.map((task)=>{
      if(Number(event.target.parentNode.id) === task.id){
        task.isChecked = event.target.checked
      }
    })
    console.log(tasks)
}

let editTaskText = (event) => {
  if(event.detail === DOUBLE_CLICK){
    event.target.hidden = true;
    event.target.previousElementSibling.hidden = false;
    let arr = Array.from(event.target.parentNode.parentNode.children)
    arr.forEach((elem) => {
      console.log(elem.firstChild)
      if(elem.firstChild.nextSibling.hidden){
        elem.firstElement.nextSibling.hidden = false;
        elem.lastElement.previousSibling.hidden = true;
      }
    })
  }
}

let changeTextInTasks = (event) => {
  tasks.forEach((task)=>{
    if(Number(event.target.parentNode.id) === task.id){
      task.text = event.target.value;
    }
  })
}

let writeChanges = (event) => {
  if(event.code === 'Enter'){
    console.log(event.target)
    changeTextInTasks(event)
    renderTask()
  }
  if(event.code === 'Escape'){
    renderTask()
  }
}

let writeChangesBlur = (event) => {
  console.log(event)
    if(event.target.value){
      changeTextInTasks(event)
      renderTask()
    }
    console.log(event.target)
}

let selectActionTask = (event) => {
  if (event.target.type === 'button') removeTask(event)
  if (event.target.type === 'checkbox') markTask(event)
  if (event.target.tagName === 'SPAN') editTaskText(event)
}

addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
listTaskContainer.addEventListener('keydown',writeChanges)
listTaskContainer.addEventListener('blur',writeChangesBlur,true)
textTask.addEventListener('keydown',addTaskWithEnter)





// tasks = tasks.map((task)=>{
//   console.log(task.id,event.target.parentNode.id)
//   if(task.id === Number(event.target.parentNode.id)){
//     task.text = event.target.value;
//   }
// })