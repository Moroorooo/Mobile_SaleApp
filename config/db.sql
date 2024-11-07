-- Create Database
CREATE DATABASE SalesAppDB;

-- Use Database
USE SalesAppDB;

-- Create Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(15),
    Address NVARCHAR(255),
    Role NVARCHAR(50) NOT NULL
);

-- Create Categories Table
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL
);

-- Create Products Table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    BriefDescription NVARCHAR(255),
    FullDescription NVARCHAR(MAX),
    TechnicalSpecifications NVARCHAR(MAX),
    Price DECIMAL(18, 2) NOT NULL,
    ImageURL NVARCHAR(255),
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Create Carts Table
CREATE TABLE Carts (
    CartID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    TotalPrice DECIMAL(18, 2) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create CartItems Table
CREATE TABLE CartItems (
    CartItemID INT PRIMARY KEY IDENTITY(1,1),
    CartID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Carts(CartID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CartID INT,
    UserID INT,
    PaymentMethod NVARCHAR(50) NOT NULL,
    BillingAddress NVARCHAR(255) NOT NULL,
    OrderStatus NVARCHAR(50) NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (CartID) REFERENCES Carts(CartID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create Payments Table
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    Amount DECIMAL(18, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL DEFAULT GETDATE(),
    PaymentStatus NVARCHAR(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

-- Create Notifications Table
CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Message NVARCHAR(255),
    IsRead BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create ChatMessages Table
CREATE TABLE ChatMessages (
    ChatMessageID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Message NVARCHAR(MAX),
    SentAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create StoreLocations Table
CREATE TABLE StoreLocations (
    LocationID INT PRIMARY KEY IDENTITY(1,1),
    Latitude DECIMAL(9, 6) NOT NULL,
    Longitude DECIMAL(9, 6) NOT NULL,
    Address NVARCHAR(255) NOT NULL
);

-- Insert Users
INSERT INTO Users (Username, PasswordHash, Email, PhoneNumber, Address, Role)
VALUES 
('john_doe', '$2b$10$/IRw4F4Fnq3tZMcd.yjOU.r3KmjOuPm3NOr4aqV9Ubwn8vFcLuPZq', 'john@example.com', '1234567890', '123 Main St', 'Customer'),
('jane_smith', '$2b$10$/IRw4F4Fnq3tZMcd.yjOU.r3KmjOuPm3NOr4aqV9Ubwn8vFcLuPZq', 'jane@example.com', '0987654321', '456 Elm St', 'Customer'),
('admin_user', '$2b$10$/IRw4F4Fnq3tZMcd.yjOU.r3KmjOuPm3NOr4aqV9Ubwn8vFcLuPZq', 'admin@example.com', '1122334455', '789 Oak St', 'Admin');

-- Insert Categories
INSERT INTO Categories (CategoryName)
VALUES 
('Electronics'),
('Books'),
('Clothing'),
('Furniture');

-- Insert Products
INSERT INTO Products (ProductName, BriefDescription, FullDescription, TechnicalSpecifications, Price, ImageURL, CategoryID)
VALUES 
('Smartphone', 'High-end smartphone', 'Latest model with all advanced features.', 'Processor: XYZ, RAM: 6GB, Battery: 4000mAh', 699.99, 'smartphone.jpg', 1),
('Laptop', 'Lightweight laptop', 'Ultra-portable with long battery life.', 'Processor: Intel i7, RAM: 16GB, Storage: 512GB SSD', 999.99, 'laptop.jpg', 1),
('Novel', 'Bestselling novel', 'Engaging storyline with thrilling moments.', 'Author: John Doe, Pages: 320', 19.99, 'novel.jpg', 2),
('T-Shirt', 'Comfortable cotton T-shirt', '100% cotton, available in all sizes.', 'Material: Cotton', 14.99, 'tshirt.jpg', 3),
('Sofa', 'Luxury sofa', '3-seater with premium fabric.', 'Dimensions: 200x90x100 cm', 499.99, 'sofa.jpg', 4);

-- Insert Carts
INSERT INTO Carts (UserID, TotalPrice, Status)
VALUES 
(1, 0.00, 'Active'),
(2, 0.00, 'Active');

-- Insert CartItems
INSERT INTO CartItems (CartID, ProductID, Quantity, Price)
VALUES 
(1, 1, 2, 699.99),
(1, 3, 1, 19.99),
(2, 4, 3, 14.99);

-- Insert Orders
INSERT INTO Orders (CartID, UserID, PaymentMethod, BillingAddress, OrderStatus)
VALUES 
(1, 1, 'Credit Card', '123 Main St', 'Processing'),
(2, 2, 'PayPal', '456 Elm St', 'Shipped');

-- Insert Payments
INSERT INTO Payments (OrderID, Amount, PaymentStatus)
VALUES 
(1, 1419.97, 'Paid'),
(2, 44.97, 'Paid');

-- Insert Notifications
INSERT INTO Notifications (UserID, Message, IsRead)
VALUES 
(1, 'Your order has been shipped.', 0),
(2, 'Payment received for your order.', 1);

-- Insert ChatMessages
INSERT INTO ChatMessages (UserID, Message)
VALUES 
(1, 'When will my order arrive?'),
(2, 'Can I change my shipping address?');

-- Insert StoreLocations
INSERT INTO StoreLocations (Latitude, Longitude, Address)
VALUES 
(40.712776, -74.005974, 'New York Store, 123 Broadway, NY'),
(34.052235, -118.243683, 'Los Angeles Store, 456 Sunset Blvd, CA');
