let users = JSON.parse(localStorage.getItem("users")) || [
  { id: 1, name: "Ahmad", email: "ahmad@gmail.com", pass: "123" },
  { id: 2, name: "Anas", email: "anas@gmail.com", pass: "231" },
  { id: 3, name: "Sama", email: "sama@gmail.com", pass: "12345" }
];

  
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }

 

const  Category=["Linux",
  "DevOps",
  "Docker",
  "Kubernetes",
  "Cloud",
  "Networking",
  "PHP",
  "Python"
 
  ];
let Questions =[];






let userAns=[];
  
  
  if (!localStorage.getItem("userAns")) {
    localStorage.setItem("userAns", JSON.stringify(userAns));
  };



  



