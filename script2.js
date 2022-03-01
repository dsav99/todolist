function login(){
    // console.log("LL");

     var form =document.getElementById('sign-up-form');


     var username = form.elements[0].value;
     var password = form.elements[1].value;
    //  console.log(username);
    

     const dbRef = firebase.database().ref();

    //  window.location.href="/index.html?username="+username;
    //  console.log(window.location.href);

     dbRef.child("users").child(username).get()
     .then((snapshot)=>{
        if(snapshot.exists()){
            if(password===snapshot.val().password){
                window.location.href="/index.html?username="+username;
            }
            else{
                alert("Wrong Password");
            }
        }
        else{
            alert("There is no registered account with this username. You need to Sign Up first!")
        }
     })
}



function signup(){

    const dbRef = firebase.database().ref();

    var form =document.getElementById('sign-up-form');

    var username = form.elements[0].value;
    var password = form.elements[1].value;

    dbRef.child("users").get().then((snapshot)=>{
        if(snapshot.val()[username]){
            alert("User already exists! Login")
        }
        else{
            if(password===""){
                alert("Password cannot be blank!")
            }
            else{
                dbRef.child("users").child(username).set({
                    username:username,
                    password:password,
                });
                alert("Signed Up succesfully!")
            }
        }
    })

    
    

     
     

    // dbRef.child("users").child(username).set({
    //     username: username,
    // });

}