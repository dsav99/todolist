const params = new URLSearchParams(window.location.search);
const userId = params.get('username');
const dbRef = firebase.database().ref();
var t=[];

(function (){
  var tasks;

  const filter=document.getElementById("filter").elements[0].value;
  


  const dbRef = firebase.database().ref();

  if(dbRef.child('users').child(userId).get().then((snapshot)=>{
    if(snapshot.exists()){

      // var pass = prompt("Enter password:");
      // if(pass!==snapshot.val().password){
      //   alert("Invalid password");
      //   return;
      // }

      
      dbRef.child("tasks").child(userId).get().then((snapshot)=>{
        return snapshot;
      }).then((snapshot)=>{
       
        
        document.body.style.display='block';
        tasks=snapshot.val();
        console.log(tasks);

        for(let x in tasks){
          displayTask(tasks[x],tasks[x].id);
        }

        const goButton = document.getElementById("go");

        goButton.addEventListener('click',function(){
          // location.reload();
          const filter=document.getElementById("filter").elements[0].value;
          console.log(filter);
        
          if(filter==='0'){
            clearTasks();
            
          }
          else if(filter==='1'){
            clearTasks();
            const myTasks=sortByDates(tasks);
            for(var i=0;i<myTasks.length;i++){
  
              displayTask(myTasks[i],myTasks[i].id);
    
            }
          }
  
          else if(filter==='2'){
            clearTasks();
            const myTasks = sortByName(tasks);
            for(var i=0;i<myTasks.length;i++){
  
              displayTask(myTasks[i],myTasks[i].id);
    
            }
          }

          else if(filter==='3'){
            clearTasks();
            const myTasks = sortByPriority(tasks);
            for(var i=0;i<myTasks.length;i++){
  
              displayTask(myTasks[i],myTasks[i].id);
    
            }
          }
        });
      })
    }
    else{
      alert("There is no registered account with this username. You need to Sign Up first!")
    }
  }));

})();


function cancel(){
  document.getElementById("new-task").style.display = 'none';

}


function clearTasks(){
  document.getElementById("active-tasks").innerHTML="";
}

function sortByDates(tasks){
  

 var array = [];
 for(let x in tasks){
   array.push(tasks[x]);
 }

 for(var i=0;i<array.length;i++){
   for(var j=0;j<array.length;j++){
     if(array[i].dueDate<array[j].dueDate){
       var temp = array[i];
       array[i]=array[j];
       array[j]=temp;
     }
   }
 }

 return array;
  
}


function sortByName(tasks){
  var array = [];
 for(let x in tasks){
   array.push(tasks[x]);
 }

 for(var i=0;i<array.length;i++){
   for(var j=0;j<array.length;j++){
     if(array[i].taskName<array[j].taskName){
       var temp = array[i];
       array[i]=array[j];
       array[j]=temp;
     }
   }
 }

 return array;

}

function sortByPriority(tasks){
  var array = [];
 for(let x in tasks){
   array.push(tasks[x]);
 }

 for(var i=0;i<array.length;i++){
   for(var j=0;j<array.length;j++){
     if(array[i].priority<array[j].priority){
       var temp = array[i];
       array[i]=array[j];
       array[j]=temp;
     }
   }
 }

 return array;

}

function compare(a,b){
  if(a.dueDate < b.dueDate){
    return -1;
  }
  if(a.dueDate > b.dueDate){
    return 1;
  }
  return 0;
}





function displayTask(task,key){

 var taskName = task.taskName;
 var taskDes = task.taskDescription;
 var priority =  task.priority;
 var dueDate = task.dueDate;
 var lastModified = task.lastModified;
 var active = task.taskStatus;
 var completeDate = task.completedOn;
 


 const activeTasks = document.getElementById("active-tasks");
 const completedTasks = document.getElementById("completed-tasks");

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

  const nameInput = document.createElement('input');
  nameInput.style.display='none';
  nameInput.value=heading.innerHTML;

  const descriptionInput = document.createElement('input');
  descriptionInput.style.display='none';
  

  const stuff = document.createElement("p");
  stuff.classList.add("task-stuff");
  stuff.innerHTML = taskDes;
  descriptionInput.value = stuff.innerHTML;

  const okButton = document.createElement('button');
  okButton.innerHTML="OK";
  okButton.style.display='none';
  okButton.addEventListener('click',function(){


    this.parentElement.childNodes[0].innerHTML=this.parentElement.childNodes[1].value;
    // this.parentElement.childNodes[1].style.display='none'
    this.parentElement.childNodes[2].innerHTML=this.parentElement.childNodes[3].value;
    // this.parentElement.childNodes[3].style.display='block';
    this.parentElement.childNodes[4].style.display='none';
    
    this.parentElement.childNodes[1].style.display='none'
    this.parentElement.childNodes[3].style.display='none'
    this.parentElement.childNodes[2].style.display='block';
    this.parentElement.childNodes[0].style.display='block';
    this.parentElement.childNodes[4].style.display='none';

  
    

  })
  

  taskDescription.append(heading);
  taskDescription.append(nameInput);
  taskDescription.append(stuff);
  taskDescription.append(descriptionInput);
  taskDescription.append(okButton);
  

  //  END TASK DESCRIPTION.
  taskDetails.append(taskStatus);
  taskDetails.append(taskDescription);


  const taskDeadlines = document.createElement('div');
  taskDeadlines.classList.add('task-deadlines');
  const due = document.createElement('p');
  due.innerHTML="Due on : "+dueDate;
  const modified = document.createElement('p');
  modified.innerHTML = "Last modified on: "+lastModified;
  
  


  taskDeadlines.append(due);
  taskDeadlines.append(modified);

  newTask.append(taskDetails);
  newTask.append(taskDeadlines);


  if(active){
    // newTask.classList.remove('completed');
    activeTasks.append(newTask);

  }
  else{
    newTask.classList.add('completed');
    due.innerHTML = "Completed on: "+completeDate;
    completedTasks.append(newTask);
  }


  newTask.addEventListener('click',function(){
    dbRef.child("tasks").child(userId).child(key).get().then((snapshot)=>{
      if(snapshot.val().taskStatus===true){
        const currentDate = new Date();
        var time = currentDate.getMonth()+"-"+currentDate.getDate()+" at "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
    
        dbRef.child("tasks").child(userId).child(key).update({
          taskStatus:false,
          completedOn:time,
        });
      }
      else{
        dbRef.child("tasks").child(userId).child(key).update({taskStatus:true});
  
      }

      location.reload();
    })
  });

}


function myFunction(key){
  console.log("my function called");
  console.log(key);
  dbRef.child("tasks").child(userId).child(key).get().then((snapshot)=>{
    if(snapshot.val().taskStatus===true){
      
      dbRef.child("tasks").child(userId).child(key).update({taskStatus:false});
    }
    else{
      dbRef.child("tasks").child(userId).child(key).update({taskStatus:true});

    }
  })
}

function submitChanges(){
  console.log("function called");
}

function moveToActive(task){
  document.getElementById("active-tasks").append(task);

}


function moveToCompleted(task){
  document.getElementById("completed-tasks").append(task);
}



function addTaskFirebase(){

  const dbRef = firebase.database().ref();

  const form = document.getElementById("task-form");
  
  

  const taskName = form.elements[0].value;
  const taskDes = form.elements[1].value;
  const priority = form.elements[2].value;
  const dueDate = form.elements[3].value;
  const currentDate = new Date();
  const lastModified = currentDate.getMonth()+"-"+currentDate.getDate()+" at "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();

  dbRef.child("users").child(userId).get().then((snapshot)=>{
    if(snapshot.exists()){

      console.log("H");
      dbRef.child("tasks").child(userId).get().then((snap)=>{
        if(snap.exists()){
          return Object.keys(snap.val()).length;
        }
        else{
          return 0;
        }
        
      }).then((id)=>{
        dbRef.child("tasks").child(userId).child(id).set({
        taskName: taskName,
        taskDescription:taskDes,
        priority:priority,
        dueDate:dueDate,
        lastModified:lastModified,
        taskStatus:true,
        completedOn:"",
        id:id,
      });
      })

      

      // setTimeout(function(){console.log("H");},1000);
      // dbRef.child("tasks").child(userId).push({
      //   taskName: taskName,
      //   taskDescription:taskDes,
      //   priority:priority,
      //   dueDate:dueDate,
      //   lastModified:lastModified,
      //   taskStatus:true,
      //   completedOn:"",
      // });
    }
    else{
      console.log("NO USER FOUND");
    }
  }).then(()=>{
    
    // location.reload();
  })


  document.getElementById("new-task").style.display = 'none';


}

function displayDialog() {
  document.getElementById("new-task").style.display = 'block';
}


// taskStatus.addEventListener("click", function () {
//   // dbRef.child("tasks").child(userId).child(key).get().then((snapshot)=>{
//   //   if(snapshot.exists()){
//   //     var s = snapshot.val().taskStatus;
//   //     console.log(s);

//   //     if(s){
//   //       const currentDate = new Date();
//   //       var time = currentDate.getMonth()+"-"+currentDate.getDate()+" at "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
//   //       dbRef.child("tasks").child(userId).child(key).update({
//   //         taskStatus:false,
//   //         completedOn:time,
//   //       });
//   //     }
//   //     else{
//   //       dbRef.child("tasks").child(userId).child(key).update({
//   //         taskStatus:true,
//   //         completedOn:"",
//   //       });
//   //     }
      
//   //   }
//   // })
// });