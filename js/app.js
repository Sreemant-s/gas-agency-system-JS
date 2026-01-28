let customers = JSON.parse(localStorage.getItem("customers")) || [];
let stock = Number(localStorage.getItem("stock")) || 0;
let deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

function save() {
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("stock", stock);
  localStorage.setItem("deliveries", JSON.stringify(deliveries));
  localStorage.setItem("complaints", JSON.stringify(complaints));
}

function updateDashboard(){
  cCount.innerText = customers.length;
  stockCount.innerText = stock;
  dCount.innerText = deliveries.length;
  compCount.innerText = complaints.length;
}

function addCustomer(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  if(!name || !phone){msg("Fill details"); return;}
  customers.push({id:customers.length+1,name,phone});
  save(); updateDashboard(); msg("Customer added");
}

function addStock(){
  let s = Number(stockInput.value);
  if(s<=0) return;
  stock += s;
  save(); updateDashboard();
}

function bookCylinder(){
  let id = cid.value;
  if(stock<=0){alert("Stock empty");return;}
  let c = customers.find(x=>x.id==id);
  if(!c){alert("Invalid ID");return;}
  stock--;
  deliveries.push("Delivery for Customer "+id+" - Pending");
  save(); loadDeliveries(); updateDashboard();
}

function loadDeliveries(){
  deliveryList.innerHTML="";
  deliveries.forEach(d=>{
    let li=document.createElement("li");
    li.innerText=d;
    deliveryList.appendChild(li);
  });
}

function addComplaint(){
  let text = complaintText.value;
  if(!text) return;
  complaints.push(text);
  save(); loadComplaints(); updateDashboard();
}

function loadComplaints(){
  complaintList.innerHTML="";
  complaints.forEach(c=>{
    let li=document.createElement("li");
    li.innerText=c;
    complaintList.appendChild(li);
  });
}

function msg(t){document.getElementById("msg").innerText=t;}

loadDeliveries();
loadComplaints();
updateDashboard();

