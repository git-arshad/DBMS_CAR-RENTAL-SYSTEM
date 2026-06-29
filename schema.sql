CREATE DATABASE IF NOT EXISTS carrental;
USE carrental;

CREATE TABLE Branches (
  branch_id INT PRIMARY KEY AUTO_INCREMENT,
  branch_name VARCHAR(100),
  city VARCHAR(50),
  phone VARCHAR(15)
);

INSERT INTO Branches (branch_name, city, phone) VALUES
('Central Hub', 'Mumbai', '022-44001100'),
('West Wing', 'Pune', '020-55002200'),
('North Office', 'Delhi', '011-66003300');


CREATE TABLE Customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  license_no VARCHAR(30)
);

INSERT INTO Customers (full_name, email, phone, license_no) VALUES
('Arjun Mehta', 'arjun@mail.com', '9876543210', 'MH-1234567'),
('Priya Sharma', 'priya@mail.com', '9123456789', 'MH-7654321'),
('Rohan Das', 'rohan@mail.com', '9988776655', 'DL-9988776');


CREATE TABLE Cars (
  car_id INT PRIMARY KEY AUTO_INCREMENT,
  reg_number VARCHAR(20),
  brand VARCHAR(50),
  model VARCHAR(50),
  year INT,
  category VARCHAR(20),
  daily_rate DECIMAL(10,2),
  branch_id INT,
  FOREIGN KEY (branch_id) REFERENCES Branches(branch_id)
);

INSERT INTO Cars (reg_number, brand, model, year, category, daily_rate, branch_id) VALUES
('MH01AB1234', 'Toyota', 'Camry', 2022, 'Sedan', 2500, 1),
('MH02CD5678', 'Honda', 'CR-V', 2023, 'SUV', 3500, 1),
('MH03EF9012', 'Maruti', 'Swift', 2021, 'Hatchback', 1200, 2),
('DL04GH3456', 'BMW', '5 Series', 2023, 'Luxury', 8000, 3);


CREATE TABLE Bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT,
  car_id INT,
  pickup_date DATE,
  return_date DATE,
  status VARCHAR(20),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
  FOREIGN KEY (car_id) REFERENCES Cars(car_id)
);

INSERT INTO Bookings (customer_id, car_id, pickup_date, return_date, status) VALUES
(1, 1, '2025-05-01', '2025-05-04', 'Active'),
(2, 3, '2025-05-02', '2025-05-05', 'Pending');


CREATE TABLE Payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT,
  method VARCHAR(20),
  status VARCHAR(20),
  FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

INSERT INTO Payments (booking_id, method, status) VALUES
(1, 'UPI', 'Paid'),
(2, 'Cash', 'Pending');


-- -------------------------------
-- VIEW: PAYMENT DETAILS (AUTO CALCULATED)
-- -------------------------------
CREATE VIEW PaymentDetails AS
SELECT 
  p.payment_id,
  p.booking_id,
  c.full_name,
  car.brand,
  car.model,
  b.pickup_date,
  b.return_date,
  
  -- Days calculation
  DATEDIFF(b.return_date, b.pickup_date) AS total_days,
  
  -- Amount calculation (₹1000 per day)
  DATEDIFF(b.return_date, b.pickup_date) * 1000 AS amount,
  
  p.method,
  p.status

FROM Payments p
JOIN Bookings b ON p.booking_id = b.booking_id
JOIN Customers c ON b.customer_id = c.customer_id
JOIN Cars car ON b.car_id = car.car_id;