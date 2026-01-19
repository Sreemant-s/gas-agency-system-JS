let customers = JSON.parse(localStorage.getItem("customers")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function saveData() {
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function addCustomer() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const msg = document.getElementById("custMsg");

    if (!name || !phone || !address) {
        msg.textContent = "All fields are required";
        msg.className = "msg error";
        return;
    }

    const id = customers.length + 1;
    customers.push({ id, name, phone, address });
    saveData();
    loadCustomers();

    msg.textContent = "Customer added successfully";
    msg.className = "msg success";

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}

function loadCustomers() {
    const tbody = document.querySelector("#customerTable tbody");
    tbody.innerHTML = "";

    customers.forEach(c => {
        const row = `<tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.phone}</td>
            <td>${c.address}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function bookCylinder() {
    const custId = document.getElementById("custId").value;
    const msg = document.getElementById("bookMsg");

    const customer = customers.find(c => c.id == custId);

    if (!customer) {
        msg.textContent = "Invalid Customer ID";
        msg.className = "msg error";
        return;
    }

    const date = new Date().toLocaleDateString();
    bookings.push({ custId, date });
    saveData();
    loadBookings();

    msg.textContent = "Cylinder booked successfully";
    msg.className = "msg success";

    document.getElementById("custId").value = "";
}

function loadBookings() {
    const list = document.getElementById("bookingList");
    list.innerHTML = "";

    bookings.forEach(b => {
        list.innerHTML += `<li>Customer ID ${b.custId} - ${b.date}</li>`;
    });
}

loadCustomers();
loadBookings();
