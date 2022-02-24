(function (){
  var tasks=[];

  if(localStorage.tasks)
    tasks = JSON.parse(localStorage.tasks);

    for(var i=0;i<tasks.length;i++){
      displayTask(tasks[i]);
      
      
    }
})();






function displayTask(task){


  var t = JSON.parse(localStorage.getItem(task));

  console.log(t);

 const taskName = t.name;
 const taskDes = t.description;
 const priority =  t.priority;

 console.log("Priority of task: "+priority);


 const tasks = document.getElementById("active-tasks");

  const newTask = document.createElement("div");

  if(priority>2){
    newTask.style.backgroundColor='red';
  }
  newTask.classList.add("task");


  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");


  //  START TASK STATUS
  const taskStatus = document.createElement("div");
  taskStatus.classList.add("task-status");


  //START TASK DESCRIPTION
  const taskDescription = document.createElement("div");
  taskDescription.classList.add("task-description");

  const heading = document.createElement("h3");
  heading.classList.add("task-name");
  heading.innerHTML = taskName;

  const stuff = document.createElement("p");
  stuff.classList.add("task-stuff");
  stuff.innerHTML = taskDes;

  taskDescription.append(heading);
  taskDescription.append(stuff);

  //  END TASK DESCRIPTION.
  taskDetails.append(taskStatus);
  taskDetails.append(taskDescription);





  newTask.append(taskDetails);



  tasks.append(newTask);


  taskStatus.addEventListener("click", function () {
    this.classList.toggle('checked');

    if (this.classList.contains('checked')) {
      heading.classList.add("completed");
      stuff.classList.add('completed');
      // console.log("HERE: "+this.parentElement.parentElement.getAttribute('id'));
      moveToCompleted(this.parentElement.parentElement);

    }
    else {
      heading.classList.remove("completed");
      stuff.classList.remove('completed');
      moveToActive(this.parentElement.parentElement);

     
    }
  });


 

}

function moveToActive(task){
  document.getElementById("active-tasks").append(task);

}


function moveToCompleted(task){
  document.getElementById("completed-tasks").append(task);
}


function addTask() {

  const form = document.getElementById("task-form");
  

  const taskName = form.elements[0].value;
  const taskDes = form.elements[1].value;
  const priority = form.elements[2].value;



  if(taskName==="" || taskDes===""){
    alert("Please fill in the required fields");
    return;
  } 

  console.log(taskName);
  console.log(taskDes);

  const tasks = document.getElementById("active-tasks");

  const newTask = document.createElement("div");


  if(priority>2){
    newTask.style.backgroundColor='red';
  }


  newTask.classList.add("task");


  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");


  //  START TASK STATUS
  const taskStatus = document.createElement("div");
  taskStatus.classList.add("task-status");


  //START TASK DESCRIPTION
  const taskDescription = document.createElement("div");
  taskDescription.classList.add("task-description");

  const heading = document.createElement("h3");
  heading.classList.add("task-name");
  heading.innerHTML = taskName;

  const stuff = document.createElement("p");
  stuff.classList.add("task-stuff");
  stuff.innerHTML = taskDes;

  taskDescription.append(heading);
  taskDescription.append(stuff);

  //  END TASK DESCRIPTION.
  taskDetails.append(taskStatus);
  taskDetails.append(taskDescription);





  newTask.append(taskDetails);



  tasks.append(newTask);
  document.getElementById("new-task").style.display = 'none';



  taskStatus.addEventListener("click", function () {
    this.classList.toggle('checked');

    if (this.classList.contains('checked')) {
      heading.classList.add("completed");
      stuff.classList.add('completed');
      moveToCompleted(this.parentElement.parentElement);

    }
    else {
      heading.classList.remove("completed");
      stuff.classList.remove('completed');
      moveToActive(this.parentElement.parentElement);

    }
  });


  var currentTask = {
    name: taskName,
    description: taskDes,
    priority:priority,
    id:id
  }


  if (localStorage.tasks) {
    var taskArray = JSON.parse(localStorage.tasks);
    var currentTaskNumber =  taskArray.length;
    currentTask.id=currentTaskNumber+1;
    // console.log("Current task number :"+(currentTaskNumber));
    taskArray.push("task-"+(taskArray.length+1));
    localStorage.setItem("task-"+(taskArray.length),JSON.stringify(currentTask));
    localStorage.tasks = JSON.stringify(taskArray);
    newTask.setAttribute('id',"task-"+(taskArray.length));
  }
  else {
    localStorage.tasks = JSON.stringify([]);
    // console.log("Current task number :"+1);
    currentTask.id=1;
    var taskArray = JSON.parse(localStorage.tasks);
    newTask.setAttribute('id',"task-1");
    localStorage.setItem("task-1",JSON.stringify(currentTask));
    taskArray.push("task-1");
    localStorage.tasks = JSON.stringify(taskArray);
  }

  

}




function addTaskFirebase(){

  const dbRef = firebase.database().ref();

  const form = document.getElementById("task-form");
  
  console.log("DD");

  const taskName = form.elements[0].value;
  const taskDes = form.elements[1].value;
  const priority = form.elements[2].value;

  dbRef.child('tasks').push({
    taskName: taskName,
    taskDescription:taskDes,
    userName:"savi",
  });

}






function displayDialog() {
  document.getElementById("new-task").style.display = 'block';
}


