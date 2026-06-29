const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(express.static("public"));

/* -------- ROUTES -------- */

// Cars
app.get("/cars", (req, res) => {
  db.query("SELECT * FROM Cars", (err, data) => {
    if (err) return res.send(err);
    res.json(data);
  });
});

// Customers
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM Customers", (err, data) => {
    if (err) return res.send(err);
    res.json(data);
  });
});

// Add Customer ✅ (MOVED UP)
app.post("/add-customer", (req, res) => {
  const { full_name, email, phone, license_no } = req.body;

  const q = `
    INSERT INTO Customers (full_name, email, phone, license_no)
    VALUES (?, ?, ?, ?)
  `;

  db.query(q, [full_name, email, phone, license_no], (err) => {
    if (err) return res.send(err);
    res.send("Customer Added ✅");
  });
});

// Bookings (JOIN)
app.get("/bookings", (req, res) => {
  const q = `
    SELECT b.booking_id, c.full_name, car.model,
           b.pickup_date, b.return_date
    FROM Bookings b
    JOIN Customers c ON b.customer_id = c.customer_id
    JOIN Cars car ON b.car_id = car.car_id
  `;

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    res.json(data);
  });
});

// Add Booking
app.post("/add-booking", (req, res) => {
  const { customer_id, car_id, pickup_date, return_date } = req.body;

  const checkCustomer = "SELECT * FROM Customers WHERE customer_id = ?";
  
  db.query(checkCustomer, [customer_id], (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) {
      return res.send("Customer does not exist ❌");
    }

    const checkCar = "SELECT * FROM Cars WHERE car_id = ?";
    
    db.query(checkCar, [car_id], (err, result2) => {
      if (err) return res.send(err);

      if (result2.length === 0) {
        return res.send("Car does not exist ❌");
      }

      const insertQuery = `
        INSERT INTO Bookings (customer_id, car_id, pickup_date, return_date)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertQuery, [customer_id, car_id, pickup_date, return_date], (err) => {
        if (err) return res.send(err);
        res.send("Booking Added ✅");
      });
    });
  });
});

// Payments (VIEW)
app.get("/payments", (req, res) => {
  db.query("SELECT * FROM PaymentDetails", (err, data) => {
    if (err) return res.send(err);
    res.json(data);
  });
});

// Add Payment
app.post("/add-payment", (req, res) => {
  const { booking_id, method, status } = req.body;

  const q = `
    INSERT INTO Payments (booking_id, method, status)
    VALUES (?, ?, ?)
  `;

  db.query(q, [booking_id, method, status], (err) => {
    if (err) return res.send(err);
    res.send("Payment Added ✅");
  });
});

/* -------- START SERVER -------- */


app.listen(5000, '0.0.0.0');
