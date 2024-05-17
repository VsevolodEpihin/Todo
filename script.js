(()=>{
  const TIME_ERROR = 3000;
  const DOUBLE_CLICK = 2;
  const TASKS_ON_PAGE = 5;
  const ENTER = 'Enter';
  const ESCAPE = 'Escape';
  const HOST = 'api.t2.academy.dunice-testing.com';
  const URL = `https://${HOST}/tasks`
  
  const addTaskButton = document.querySelector('.add-task');
  const textTask = document.querySelector('.create-text-task');
  const listTaskContainer = document.querySelector('.task-container');
  const checkAllTasks = document.querySelector('.check-all-tasks');
  const deleteCompletedTaskButton = document.querySelector('.delete-all-tasks');
  const optionButtons = document.querySelector('.btn-options');
  const paginationButtons = document.querySelector('.pagination-buttons');
  const boxError = document.querySelector('.error-box')

  let eventCode = null;
  let tasks = [];
  let displayedTab = 'check-all';
  let currentPage = 1;

  const displayError = (message) => {
    boxError.firstElementChild.textContent = message
    boxError.classList.add('display-error')
    setTimeout(()=>{
      boxError.classList.remove('display-error')
    },TIME_ERROR)
  }

  const checkRequest = (response) => {
    if(!response || !response.ok){
       throw new Error('response was not ok')
    }
  }

  const requestGetTasks = () => {
      fetch(`${URL}`)
        .then(response => {
          checkRequest(response)
          return response.json();
        })
        .then(data => {
          tasks = data
          changeGlobalCheckbox()
          renderTask()
        })
        .catch(error => {
          displayError(error)
        });
  }

  requestGetTasks()

  const requestDeleteTask = (id) => {
      fetch(`${URL}/${id}`,{method: 'DELETE'})
        .then(response => {
          checkRequest(response)
        })
        .then(() =>{
          tasks = tasks.filter((task) => Number(id) !== task.id);
          renderTask();
        })
        .catch(error => {
          displayError(error)
        });
  }

  const requestDeleteAllTask = () => {
      fetch(`${URL}/completed`,{method: 'DELETE'})
        .then(response => {
          checkRequest(response)
        })
        .then(()=>{
          tasks = tasks.filter((elem) => !elem.isChecked);
          checkAllTasks.checked = false;
          renderTask();
        })
        .catch(error => {
          displayError(error)
        });
  }

  function requestEditBody(url, method, body) {
    const requestOptions = {
    method: method,
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    };
    
    return fetch(url, requestOptions)
    .then(response => {
      checkRequest(response)
    return response.json();
    })
    .then(data => {
    return data;
    })
    .catch(error => {
    throw error;
    });
    }

  const slicer = (tasks) => {
    let changedPage = Math.ceil(tasks.length / TASKS_ON_PAGE);
    if (currentPage > changedPage) {
      currentPage = changedPage;
    }
    let end = currentPage * TASKS_ON_PAGE;
    let start = end - TASKS_ON_PAGE;
    return tasks.slice(start, end);
  };
  
  const pagination = (tasks) => {
    let pages = Math.ceil(tasks.length / TASKS_ON_PAGE);
    let btnPaginate = '';
    for (let i = 1; i <= pages; i++) {
      btnPaginate += `<button class="paginate-buttons" id="paginate-${i}">${i}</button>`;
    }
    paginationButtons.innerHTML = btnPaginate;
  };
  
  const showTaskTab = () => {
    if (displayedTab === 'check-all') {
      return tasks;
    }
    if (displayedTab === 'check-active') {
      return tasks.filter((task) => !task.isChecked);
    }
    if (displayedTab === 'check-completed') {
      return tasks.filter((task) => task.isChecked);
    }
  };
  
  const changeStyleActivePaginate = () => {
    let buttons = Array.from(paginationButtons.children);
    buttons.forEach((btn) => {
      if (currentPage === Number(btn.textContent)) {
        btn.classList.add('is-active');
      }else{
        btn.classList.remove('is-active');
      }
    });
  };
  
  const renderTask = () => {
    let currentListTasks = showTaskTab();
    pagination(currentListTasks);
    let tasksForRender = slicer(currentListTasks);
    let listTask = '';
    tasksForRender.forEach((task) => {
      listTask += `
        <li id=${task.id}>
          <input tabindex="1" type="checkbox" ${task.isChecked ? 'checked' : ''}/> 
          <input class="change-text" maxLength="254" width="50px" hidden/>
          <span>${task.text}</span>
          <button type="button" class="remove-task">x</button>
        </li>`;
    });
  
    listTaskContainer.innerHTML = listTask;
    changeStyleActivePaginate();
    counterTasks();
  };
  
  const changeCurrentPage = (event) => {
    currentPage = Number(event.target.textContent)
    renderTask();
  };
  
  const shieldingSymbols = (text) => {
    let currentText = text;
    const specialSymbols = {
      '@': '&#64;',
      '?': '&#63;',
      '#': '&#35;',
      '!': '&#33;',
      '%': '&#37;',
      '^': '&#708;',
      ':': '&#58;',
      $: '&#36;',
      '<': '&lt;',
      '>': '&gt;',
    };
  
    currentText = text.split('').map((sym) => {
      if (specialSymbols[sym]) {
        return specialSymbols[sym];
      }
      return sym;
    }).join('');
    return currentText;
  };
  
  const validateValue = (textEdit) => {
    let text = textEdit ?? textTask.value.trim();
    let shielding = shieldingSymbols(text);
    if (shielding && textEdit!==textTask.value) {
      return shielding;
    }
    return false;
  };

  const markGlobalCheckbox = (copyTask) => {
    checkAllTasks.checked = copyTask;
    renderTask();
  }
  
  const changeGlobalCheckbox = () => {
    let copyTask = tasks.every((task) => task.isChecked);
    markGlobalCheckbox(copyTask)
    renderTask();
  };
  
  const addTask = () => {
    let validate = validateValue();
    if (validate) {
      displayedTab = 'check-all';
      const task = {
        text: validate,
      };
      requestEditBody(`${URL}`, 'POST', {text: task.text})
      .then(data => {
      tasks.push(data)
      currentPage = Math.ceil(tasks.length / TASKS_ON_PAGE);
      addActiveStyle(optionButtons.firstElementChild);
      changeGlobalCheckbox()
      textTask.value = '';
      renderTask();
      })
      .catch(error => {
      displayError(error)
      });
    }
  };
  
  const addTaskWithEnter = (event) => {
    let validate = validateValue();
    if (event.code === ENTER && textTask.value && validate) {
      displayedTab = 'check-all';
      addTask();
    }
  };

  const removeTask = (id) => {
    requestDeleteTask(id)
  };
  
  const markTask = (parent) => {
    requestEditBody(`${URL}/${parent.id}`, 'PATCH', {
      isChecked: parent.firstElementChild.checked
    })
    .then(() => {
      tasks.forEach((task) => {
        if (Number(parent.id) === Number(task.id)) {
          task.isChecked = parent.firstElementChild.checked;
        }
      });
      changeGlobalCheckbox()
      renderTask();
    })
    .catch(error => {
      displayError(error)
    });
  };
  
  const editTaskText = (event) => {
    if (event.detail === DOUBLE_CLICK) {
      event.target.hidden = true;
      event.target.previousElementSibling.hidden = false;
      event.target.previousElementSibling.focus();  
      event.target.previousElementSibling.value = event.target.textContent;
    } 
  };

  const selectActionTask = (event) => {
    if (event.target.type === 'button') removeTask(event.target.parentNode.id);
    if (event.target.type === 'checkbox') markTask(event.target.parentNode);
    if (event.target.tagName === 'SPAN') editTaskText(event);
  };
  
  const changeTextInTasks = (event) => {
     if(event.target.type === 'checkbox'){
      event.target.checked = !event.target.checked
      selectActionTask(event)
     }
    let repeatText = event.target.value === event.target.parentNode.lastElementChild.previousElementSibling.textContent
    let id = event.target.parentNode.id;
    let str = event.target.value.trim();
    let validate = validateValue(str);
    if (validate && event.target.type !== 'checkbox' && !repeatText) {
      requestEditBody(`${URL}/${id}`, 'PATCH', {text : validate})
      .then(data => {
      tasks.forEach((task) => {
        if (Number(data.id) === task.id) {
          task.text = data.text;
        }
      });
      renderTask()
      })
      .catch(error => {
      displayError(error)
      });
    }
  };
  
  const writeChanges = (event) => {
    if (event.code === ENTER ) {
      eventCode = event.code;
      changeTextInTasks(event);
      renderTask();
    }
    if (event.code === ESCAPE) {
      eventCode = event.code;
      renderTask();
    }
  }
  
  const writeChangesBlur = (event) => {
    if (event.target.value && event.target.type !== 'checkbox' && eventCode!==ESCAPE) {
      changeTextInTasks(event)
      renderTask();
    }
    if (event.target.value === '') {
      renderTask();
    }
    eventCode = null;
  };
  
  const counterTasks = () => {
    let allTasks = tasks.length;
    let activeTasks = tasks.filter((task)=>!task.isChecked).length;
    let completedTasks = allTasks - activeTasks;
  
    optionButtons.firstElementChild.firstElementChild.textContent = allTasks;
    optionButtons.lastElementChild.firstElementChild.textContent = completedTasks;
    optionButtons.firstElementChild.nextElementSibling.firstElementChild.textContent = activeTasks;
  };
  
  const addActiveStyle = (parentCurrentTarget) => {
    Array.from(optionButtons.children).forEach((elem) => {
      if (elem.name === parentCurrentTarget.name) {
        elem.classList.add('active-tab');
      } else {
        elem.classList.remove('active-tab');
      }
    });
  };
  
  const markAllTask = (event) => {
    requestEditBody(URL, 'PUT', {
      status: event.target.checked
    })
    .then(() => {
      tasks.forEach((elem) => {
        elem.isChecked = event.target.checked;
      });
      let allCheckBox = changeGlobalCheckbox()
      if(!allCheckBox) currentPage =1
      renderTask();
    })
    .catch(error => {
      displayError(error)
    });
  };
  
  const typeFilter = (event) => {
    let parent = event.target;
    if (parent.tagName === 'SPAN') parent = event.target.parentNode;
    addActiveStyle(parent);
    displayedTab = parent.id;
    currentPage = 1;
    renderTask();
  }
  
  const deleteCompletedTasks = () => {
    requestDeleteAllTask()
  };

  
  addTaskButton.addEventListener('click', addTask);
  listTaskContainer.addEventListener('click', selectActionTask);
  listTaskContainer.addEventListener('keydown', writeChanges);
  textTask.addEventListener('keydown', addTaskWithEnter);
  listTaskContainer.addEventListener('blur', writeChangesBlur, true);
  checkAllTasks.addEventListener('change', markAllTask);
  deleteCompletedTaskButton.addEventListener('click', deleteCompletedTasks);
  optionButtons.addEventListener('click', typeFilter);
  paginationButtons.addEventListener('click', changeCurrentPage);
})()
