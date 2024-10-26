
const showSignUp=(divId)=>{
  const div1 = document.getElementById("signIn");
  const div2 = document.getElementById("signUp");
  const left = document.getElementById("left");
  const right = document.getElementById("right");

  // Hide both divs first

  
  div1.classList.remove("visible");
  div1.classList.add("hidden");

  div2.classList.remove("visible");
  div2.classList.add("hidden");

  // Show the selected div
  
  const selectedDiv = document.getElementById(divId);
  selectedDiv.classList.remove("hidden");
  selectedDiv.classList.add("visible");


  

  if (divId === 'signIn') {
    left.style.backgroundColor = "#ebe9e1"; // Background color for 
    right.style.backgroundColor = "#D6536d"; // Background color forthe first div
} else {
  left.style.backgroundColor = "#d6536d"; // Background color for 
  right.style.backgroundColor = "#ebe9e1"; // Background color 
}


}

function checkUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const warningDiv = document.getElementById("warning");
  
  
  // Clear previous messages
  warningDiv.textContent = "";
  warningDiv.style.height = "0"; 
  warningDiv.style.padding="0";
  // Check if the user exists in the data
  const userE = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  const userP = users.find(u => u.pass == password);
console.log(userE,userP);
  if (userE) {
    console.log("test1");
    if(!userP){
      console.log("test2");
      warningDiv.textContent = "Warning: Password is incorrect!";
    }
  else{
    warningDiv.textContent = "";
    }

     
  } else {
    if(email !== null && password !== null){
      warningDiv.innerHTML = "&nbsp;&nbsp; Warning: User not found!";
      warningDiv.style.height="20px";
      warningDiv.style.padding="10px";
    }

  }
}


function addUser (){
const id=users.length;
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

  users.push({id:id+1,name:name.toLowerCase,email:email.toLowerCase,pass:password})
  console.log(users)

}