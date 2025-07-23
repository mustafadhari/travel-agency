USE travel_agency;

-- Insert destinations
INSERT INTO destinations (name, country, continent, description, image_url, thumbnail_url, is_featured) VALUES
('Paris', 'France', 'Europe', 'The City of Light, famous for its art, fashion, and cuisine.', '/placeholder.svg?height=400&width=600&text=Paris', '/placeholder.svg?height=60&width=60&text=Paris', TRUE),
('Bali', 'Indonesia', 'Asia', 'Tropical paradise known for beautiful beaches and rich culture.', '/placeholder.svg?height=400&width=600&text=Bali', '/placeholder.svg?height=60&width=60&text=Bali', TRUE),
('Tokyo', 'Japan', 'Asia', 'Modern metropolis blending traditional culture with cutting-edge technology.', '/placeholder.svg?height=400&width=600&text=Tokyo', '/placeholder.svg?height=60&width=60&text=Tokyo', TRUE),
('New York', 'USA', 'North America', 'The Big Apple, center of arts, fashion, and finance.', '/placeholder.svg?height=400&width=600&text=NYC', '/placeholder.svg?height=60&width=60&text=NYC', FALSE),
('Rome', 'Italy', 'Europe', 'Eternal City with ancient history and incredible architecture.', '/placeholder.svg?height=400&width=600&text=Rome', '/placeholder.svg?height=60&width=60&text=Rome', TRUE),
('Barcelona', 'Spain', 'Europe', 'Vibrant city known for Gaudi architecture and Mediterranean culture.', '/placeholder.svg?height=400&width=600&text=Barcelona', '/placeholder.svg?height=60&width=60&text=Barcelona', FALSE),
('Dubai', 'UAE', 'Asia', 'Luxury destination with modern architecture and desert adventures.', '/placeholder.svg?height=400&width=600&text=Dubai', '/placeholder.svg?height=60&width=60&text=Dubai', TRUE),
('London', 'UK', 'Europe', 'Historic capital with royal palaces, museums, and iconic landmarks.', '/placeholder.svg?height=400&width=600&text=London', '/placeholder.svg?height=60&width=60&text=London', FALSE);

-- Insert tours
INSERT INTO tours (title, slug, destination_id, description, duration_days, price, tour_type, image_url, max_participants, difficulty_level, rating, review_count) VALUES
('Romantic Paris Getaway', 'romantic-paris-getaway', 1, 'Experience the romance of Paris with visits to the Eiffel Tower, Louvre Museum, and charming Montmartre district. Perfect for couples seeking an unforgettable romantic experience.', 5, 1299.00, 'Private Tour', '/placeholder.svg?height=400&width=600&text=Paris+Romance', 8, 'Easy', 4.8, 124),
('Bali Cultural Adventure', 'bali-cultural-adventure', 2, 'Immerse yourself in Balinese culture with temple visits, traditional cooking classes, and rice terrace exploration. Discover the spiritual heart of Indonesia.', 8, 1899.00, 'Cultural Tour', '/placeholder.svg?height=400&width=600&text=Bali+Culture', 12, 'Moderate', 4.9, 98),
('Tokyo Discovery Tour', 'tokyo-discovery-tour', 3, 'Explore modern Tokyo and traditional Japan with visits to temples, markets, and cutting-edge districts. Experience the perfect blend of old and new.', 7, 2199.00, 'Group Tour', '/placeholder.svg?height=400&width=600&text=Tokyo+Discovery', 16, 'Easy', 4.7, 156),
('NYC Big Apple Experience', 'nyc-big-apple-experience', 4, 'Discover the energy of New York City with Broadway shows, iconic landmarks, and world-class museums. The ultimate urban adventure.', 6, 1799.00, 'Group Tour', '/placeholder.svg?height=400&width=600&text=NYC+Experience', 20, 'Easy', 4.6, 89),
('Ancient Rome Explorer', 'ancient-rome-explorer', 5, 'Walk through history in the Eternal City. Visit the Colosseum, Vatican, and hidden gems of Rome with expert local guides.', 5, 1599.00, 'Cultural Tour', '/placeholder.svg?height=400&width=600&text=Rome+Explorer', 14, 'Moderate', 4.8, 167),
('Barcelona Art & Architecture', 'barcelona-art-architecture', 6, 'Discover Gaudi masterpieces, visit world-class museums, and experience the vibrant Mediterranean lifestyle of Barcelona.', 6, 1399.00, 'Cultural Tour', '/placeholder.svg?height=400&width=600&text=Barcelona+Art', 12, 'Easy', 4.5, 73),
('Dubai Luxury Escape', 'dubai-luxury-escape', 7, 'Experience ultimate luxury in Dubai with desert safaris, luxury shopping, and world-class dining. Stay in 5-star accommodations.', 7, 3299.00, 'Luxury Tour', '/placeholder.svg?height=400&width=600&text=Dubai+Luxury', 8, 'Easy', 4.9, 45),
('London Royal Heritage', 'london-royal-heritage', 8, 'Explore British history with visits to royal palaces, Westminster Abbey, and the Tower of London. Perfect introduction to English culture.', 6, 1699.00, 'Cultural Tour', '/placeholder.svg?height=400&width=600&text=London+Royal', 16, 'Easy', 4.7, 112);

-- Insert sample users
INSERT INTO users (first_name, last_name, email, phone) VALUES
('John', 'Smith', 'john.smith@email.com', '+1-555-0123'),
('Sarah', 'Johnson', 'sarah.johnson@email.com', '+1-555-0124'),
('Michael', 'Brown', 'michael.brown@email.com', '+1-555-0125'),
('Emily', 'Davis', 'emily.davis@email.com', '+1-555-0126'),
('David', 'Wilson', 'david.wilson@email.com', '+1-555-0127');

-- Insert sample bookings
INSERT INTO bookings (tour_id, user_id, guest_name, guest_email, adults, children, booking_date, total_amount, status) VALUES
(1, 1, 'John Smith', 'john.smith@email.com', 2, 0, '2024-05-15', 2598.00, 'confirmed'),
(2, 2, 'Sarah Johnson', 'sarah.johnson@email.com', 2, 1, '2024-04-20', 4747.50, 'pending'),
(3, 3, 'Michael Brown', 'michael.brown@email.com', 1, 0, '2024-06-10', 2199.00, 'confirmed');

-- Insert sample reviews
INSERT INTO reviews (tour_id, user_id, guest_name, rating, comment, status) VALUES
(1, 1, 'John Smith', 5, 'Amazing romantic getaway! The tour guide was excellent and Paris was magical.', 'approved'),
(2, 2, 'Sarah Johnson', 5, 'Incredible cultural experience. The cooking class was a highlight!', 'approved'),
(3, 3, 'Michael Brown', 4, 'Great tour of Tokyo. Well organized and informative guide.', 'approved');

-- Insert sample inquiries
INSERT INTO inquiries (tour_id, name, email, phone, message, adults, children, preferred_date, status) VALUES
(1, 'Jennifer Wilson', 'jennifer@email.com', '+1-555-0200', 'Hi, I am interested in the Paris romantic getaway for my honeymoon. Can you provide more details about accommodation?', 2, 0, '2024-07-15', 'new'),
(4, 'Robert Taylor', 'robert@email.com', '+1-555-0201', 'Looking for a family-friendly NYC tour. What activities are suitable for teenagers?', 2, 2, '2024-08-20', 'new'),
(7, 'Amanda Chen', 'amanda@email.com', '+1-555-0202', 'Interested in the Dubai luxury tour. Is airport transfer included?', 1, 0, '2024-09-10', 'contacted');

-- Insert newsletter subscribers
INSERT INTO newsletter_subscribers (email, status) VALUES
('subscriber1@email.com', 'active'),
('subscriber2@email.com', 'active'),
('subscriber3@email.com', 'active'),
('unsubscribed@email.com', 'unsubscribed');
