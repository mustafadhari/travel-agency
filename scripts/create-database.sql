-- Create database
CREATE DATABASE IF NOT EXISTS travel_agency;
USE travel_agency;

-- Create destinations table
CREATE TABLE destinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  continent VARCHAR(50) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create tours table
CREATE TABLE tours (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  destination_id INT,
  description TEXT,
  duration_days INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  tour_type ENUM('Group Tour', 'Private Tour', 'Cultural Tour', 'Adventure Tour', 'Luxury Tour') DEFAULT 'Group Tour',
  image_url VARCHAR(500),
  max_participants INT DEFAULT 20,
  difficulty_level ENUM('Easy', 'Moderate', 'Challenging') DEFAULT 'Easy',
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL
);

-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tour_id INT NOT NULL,
  user_id INT,
  guest_name VARCHAR(200),
  guest_email VARCHAR(200),
  guest_phone VARCHAR(20),
  adults INT NOT NULL DEFAULT 1,
  children INT DEFAULT 0,
  booking_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create reviews table
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tour_id INT NOT NULL,
  user_id INT,
  guest_name VARCHAR(200),
  guest_email VARCHAR(200),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create inquiries table
CREATE TABLE inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tour_id INT,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  adults INT DEFAULT 1,
  children INT DEFAULT 0,
  preferred_date DATE,
  status ENUM('new', 'contacted', 'quoted', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE SET NULL
);

-- Create newsletter table
CREATE TABLE newsletter_subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(200) UNIQUE NOT NULL,
  status ENUM('active', 'unsubscribed') DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL
);

-- Create indexes for better performance
CREATE INDEX idx_tours_destination ON tours(destination_id);
CREATE INDEX idx_tours_status ON tours(status);
CREATE INDEX idx_tours_price ON tours(price);
CREATE INDEX idx_bookings_tour ON bookings(tour_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_tour ON reviews(tour_id);
CREATE INDEX idx_inquiries_tour ON inquiries(tour_id);
