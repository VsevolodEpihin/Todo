const DOUBLE_CLICK = 2;

const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTaskContainer = document.querySelector('.show-tasks__list');

let tasks = [];

const renderTask = () => {
  
  let listTask = '';
  tasks.forEach((task) => {
    listTask += `
      <li id=${task.id}>
        <input type='checkbox' ${task.isChecked ? 'checked':''}/> 
        <input hidden/>
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
  };
  
};

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
  console.log(event)
  if(event.detail === DOUBLE_CLICK ){
    console.log(1)
    event.target.hidden = true;
    event.target.previousElementSibling.hidden = false
  }
}

let writeChanges = (event) => {
  
  console.log(event)
  if(event.code === 'Enter'){
    event.target.nextElementSibling.textContent = event.target.value
    event.target.nextElementSibling.hidden = false;
    event.target.hidden = true;
    event.target.nextElementSibling.data = event.target.value
    console.log('enter')
  }
  if(event.code === 'Escape'){
    // event.target.nextElementSibling.textContent = event.target.nextElementSibling.data
    // event.target.nextElementSibling.hidden = false;
    // event.target.hidden = true;
    // console.log('escape')
  }
}



let selectActionTask = (event) => {
  if (event.target.type === 'button') removeTask(event)
  if (event.target.type === 'checkbox') markTask(event)
  if (event.target.tagName === 'SPAN') editTaskText(event)

}



addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
listTaskContainer.addEventListener('keydown',writeChanges)
// listTaskContainer.addEventListener('blur',writeChanges,true)





// tasks = tasks.map((task)=>{
//   console.log(task.id,event.target.parentNode.id)
//   if(task.id === Number(event.target.parentNode.id)){
//     task.text = event.target.value;
//   }
// })