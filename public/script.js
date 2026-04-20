const API = "http://localhost:5000";

function loadCars() {
  fetch(API + "/cars")
    .then(r => r.json())
    .then(d => output(d));
}

function loadCustomers() {
  fetch(API + "/customers")
    .then(r => r.json())
    .then(d => output(d));
}

function loadBookings() {
  fetch(API + "/bookings")
    .then(r => r.json())
    .then(d => output(d));
}


function addBooking() {
  const data = {
    customer_id: document.getElementById("cust").value,
    car_id: document.getElementById("car").value,
    pickup_date: document.getElementById("pickup").value,
    return_date: document.getElementById("return").value
  };

  fetch(API + "/add-booking", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  .then(r => r.text())
  .then(alert);
}

function addCustomer() {
  const data = {
    full_name: document.getElementById("full_name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    license_no: document.getElementById("license_no").value.trim()
  };

  if (!data.full_name || !data.email || !data.phone || !data.license_no) {
    alert("Fill all fields ❌");
    return;
  }

  fetch(API + "/add-customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    loadCustomers(); // refresh table
  });
}

function output(data) {
  if (!data || data.length === 0) {
    document.getElementById("output").innerHTML = "No Data Found";
    return;
  }

  let html = "<table border='1'><tr>";

  // headers
  for (let key in data[0]) {
    html += `<th>${key}</th>`;
  }

  html += "</tr>";

  // rows
  data.forEach(row => {
    html += "<tr>";
    for (let key in row) {
      html += `<td>${row[key]}</td>`;
    }
    html += "</tr>";
  });

  html += "</table>";

  document.getElementById("output").innerHTML = html;
}


function loadPayments() {
  fetch(API + "/payments")
    .then(r => r.json())
    .then(d => output(d));
}

function addPayment() {
  const data = {
    booking_id: document.getElementById("booking_id").value,
    method: document.getElementById("method").value,
    status: document.getElementById("status").value
  };

  fetch(API + "/add-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(r => r.text())
  .then(alert);
}

function payNow(booking_id) {
  fetch(API + "/add-payment", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      booking_id,
      method: "UPI",
      status: "Paid"
    })
  })
  .then(r => r.text())
  .then(alert);
}