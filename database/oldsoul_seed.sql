-- ============================================================
--  OldSoul Rentals — Seed Data
--  Run AFTER oldsoul_schema.sql
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ── Truncate in safe order ────────────────────────────────────
TRUNCATE TABLE `bookings`;
TRUNCATE TABLE `normal_vehicles`;
TRUNCATE TABLE `show_vehicles`;
TRUNCATE TABLE `revenue_monthly`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `hosts`;
TRUNCATE TABLE `admins`;

-- ── 1. Admins ─────────────────────────────────────────────────
INSERT INTO `admins` (`name`, `email`, `password`, `role`) VALUES
('Super Admin', 'admin@oldsoul.in', 'admin123', 'Super Admin');

-- ── 2. Hosts (Vehicle Owners) ────────────────────────────────
INSERT INTO `hosts`
  (`host_code`,`name`,`email`,`password`,`phone`,`location`,`company_name`,`avatar_initials`,`total_earnings`,`rating`,`vehicles_count`,`status`,`verified`,`joined_date`)
VALUES
  ('OWN001','Rajan Nair',    'rajan.nair@gmail.com',   'owner123','+91 98472 11234','Kochi, Kerala',    'Nair Heritage Autos','RN',312000.00,4.9,3,'active',   1,'2024-03-15'),
  ('OWN002','Arjun Menon',   'arjun.menon@gmail.com',  'owner123','+91 94471 87654','Calicut, Kerala',  'Menon Classics',     'AM',198000.00,4.8,2,'active',   1,'2024-05-22'),
  ('OWN003','Priya Sharma',  'priya.sharma@gmail.com', 'owner123','+91 96325 45678','Trivandrum, Kerala','Sharma Motors',     'PS',435000.00,5.0,1,'active',   1,'2024-01-08'),
  ('OWN004','Kabir Das',     'kabir.das@gmail.com',    'owner123','+91 93216 99887','Kannur, Kerala',   'Das Performance',    'KD',280000.00,4.9,1,'suspended',1,'2024-07-11'),
  ('OWN005','Suresh Pillai', 'suresh.pillai@gmail.com','owner123','+91 90001 23456','Thrissur, Kerala', 'Pillai Rides',       'SP',174000.00,4.7,2,'active',   0,'2024-09-03'),
  ('OWN006','Thomas Varghese','thomas.v@gmail.com',    'owner123','+91 98001 56789','Palakkad, Kerala', 'Varghese Rentals',   'TV',88000.00, 4.8,1,'pending',  0,'2024-11-19'),
  ('OWN007','Vikram Nambiar','vikram.n@gmail.com',     'owner123','+91 94400 77123','Kochi, Kerala',    'Nambiar Exotics',    'VN',675000.00,5.0,1,'active',   1,'2023-12-01'),
  ('OWN008','Arun Krishnan', 'arun.k@gmail.com',       'owner123','+91 92200 34567','Kozhikode, Kerala','Krishnan Tuned',     'AK',324000.00,4.9,1,'active',   1,'2024-02-14');

-- ── 3. Users (Customers) ─────────────────────────────────────
INSERT INTO `users`
  (`user_code`,`name`,`email`,`password`,`phone`,`avatar_initials`,`total_bookings`,`total_spent`,`status`,`last_active`,`joined_date`)
VALUES
  ('USR001','Ananya Roy',    'ananya.roy@gmail.com',  'user123','+91 98001 11111','AR',8, 148000.00,'active',   '2026-07-02','2025-01-05'),
  ('USR002','Mohan Lal',     'mohan.lal@gmail.com',   'user123','+91 97000 22222','ML',3, 52500.00, 'active',   '2026-06-28','2025-03-12'),
  ('USR003','Sneha Pillai',  'sneha.p@gmail.com',     'user123','+91 96000 33333','SP',12,287000.00,'active',   '2026-07-03','2025-02-20'),
  ('USR004','Rahul Verma',   'rahul.v@gmail.com',     'user123','+91 95000 44444','RV',1, 15000.00, 'suspended','2026-05-10','2025-04-08'),
  ('USR005','Deepa Menon',   'deepa.m@gmail.com',     'user123','+91 94000 55555','DM',6, 92000.00, 'active',   '2026-07-01','2025-06-15'),
  ('USR006','Farhan Akhtar', 'farhan.a@gmail.com',    'user123','+91 93000 66666','FA',4, 68000.00, 'active',   '2026-06-25','2025-05-30'),
  ('USR007','Kavitha Nair',  'kavitha.n@gmail.com',   'user123','+91 92000 77777','KN',9, 213000.00,'active',   '2026-07-04','2025-08-11'),
  ('USR008','Vivek Chandran','vivek.c@gmail.com',     'user123','+91 91000 88888','VC',2, 34000.00, 'inactive', '2026-04-12','2025-07-22'),
  ('USR009','Lakshmi Devi',  'lakshmi.d@gmail.com',   'user123','+91 90000 99999','LD',5, 79500.00, 'active',   '2026-06-30','2025-09-05'),
  ('USR010','Aditya Kumar',  'aditya.k@gmail.com',    'user123','+91 89000 10101','AK',7, 165000.00,'active',   '2026-07-03','2025-10-18');

-- ── 4. Show Vehicles ─────────────────────────────────────────
-- host_id references: 1=Rajan, 2=Arjun, 3=Priya, 4=Kabir, 5=Suresh, 6=Thomas, 7=Vikram, 8=Arun
INSERT INTO `show_vehicles`
  (`host_id`,`name`,`year`,`category`,`category_label`,`location`,`price_per_day`,`rating`,`reviews_count`,`image_url`,`owner_name`,`verified`,`tags`,`available`)
VALUES
  (1,'Mercedes-Benz 220S',  1959,'vintage-car', 'Vintage Car', 'Kochi, Kerala',     8000, 4.9,34,'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80','Rajan Nair',   1,'["Shows","Exhibitions","Weddings"]',1),
  (2,'Royal Enfield Bullet 500',1972,'vintage-bike','Vintage Bike','Calicut, Kerala', 3500,4.8,22,'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80','Arjun Menon',  1,'["Events","Rallies"]',              1),
  (3,'Ford Mustang GT',     2020,'modern-car',  'Modern Car',  'Trivandrum, Kerala',15000,5.0,18,'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80','Priya Sharma', 1,'["Shows","College Events"]',        1),
  (4,'Nissan GT-R R35',     2018,'modified-car','Modified Car','Kannur, Kerala',    20000,4.9,11,'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80','Kabir Das',    1,'["Modified","Exhibitions"]',        1),
  (5,'Ambassador Classic',  1982,'vintage-car', 'Vintage Car', 'Thrissur, Kerala',   5000,4.7,28,'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80','Suresh Pillai',1,'["Heritage","Weddings"]',          1),
  (6,'Yamaha RD 350',       1978,'vintage-bike','Vintage Bike','Palakkad, Kerala',   4000,4.8,15,'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80','Thomas Varghese',0,'["Rallies","Events"]',           1),
  (7,'Lamborghini Huracán', 2022,'modern-car',  'Modern Car',  'Kochi, Kerala',     45000,5.0,8, 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80','Vikram Nambiar',1,'["Shows","Premium"]',            1),
  (8,'Subaru WRX STI (Wide)',2019,'modified-car','Modified Car','Kozhikode, Kerala', 18000,4.9,13,'https://images.unsplash.com/photo-1588429341634-85259c252302?w=800&q=80','Arun Krishnan',1,'["Modified","Track Days"]',       1);

-- ── 5. Normal Vehicles ───────────────────────────────────────
INSERT INTO `normal_vehicles`
  (`host_id`,`name`,`type`,`seats`,`fuel`,`transmission`,`price_per_day`,`price_per_km`,`available`,`image_url`,`features`,`location`)
VALUES
  (1,'Toyota Innova Crysta', 'SUV',          7,'Diesel',  'Automatic',   3500,14,'1','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80','["AC","GPS","Bluetooth","USB Charging"]','Kochi, Kerala'),
  (2,'Maruti Swift Dzire',   'Sedan',         5,'Petrol',  'Manual',      1800,10,'1','https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80','["AC","Bluetooth","USB Charging"]',     'Calicut, Kerala'),
  (3,'Hyundai Creta',        'SUV',           5,'Petrol',  'Automatic',   2800,12,'1','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80','["AC","Sunroof","GPS","Bluetooth"]',    'Trivandrum, Kerala'),
  (5,'Tata Nexon EV',        'Electric SUV',  5,'Electric','Automatic',   2500, 8,'0','https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80','["AC","Fast Charging","GPS","Touchscreen"]','Thrissur, Kerala'),
  (5,'Honda City Hybrid',    'Sedan',         5,'Hybrid',  'CVT',         2200, 9,'1','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','["AC","Lane Assist","Bluetooth","GPS"]','Thrissur, Kerala'),
  (7,'Force Urbania',        'Van',          17,'Diesel',  'Manual',      6000,18,'1','https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80','["AC","Push-back Seats","USB Charging"]','Kochi, Kerala'),
  (2,'KTM Duke 390',         'Bike',          2,'Petrol',  'Manual',      1200, 6,'1','https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80','["GPS Mount","Riding Gear Optional"]',  'Calicut, Kerala'),
  (5,'Mahindra Thar',        'Off-Road SUV',  4,'Diesel',  'Manual 4WD',  4200,16,'1','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80','["4WD","Convertible Top","Rugged"]',   'Thrissur, Kerala');

-- ── 6. Bookings ──────────────────────────────────────────────
-- user_id 1..10 = USR001..USR010, host_id 1..8 = OWN001..OWN008
INSERT INTO `bookings`
  (`booking_code`,`user_id`,`user_name`,`host_id`,`host_name`,`vehicle_name`,`vehicle_type`,`start_date`,`end_date`,`days`,`amount`,`status`,`payment_status`,`purpose`)
VALUES
  ('BKG001',3,'Sneha Pillai',  7,'Vikram Nambiar', 'Lamborghini Huracán',    'show',  '2026-07-10','2026-07-12',2, 90000.00,'confirmed','paid',    'College Cultural Fest'),
  ('BKG002',1,'Ananya Roy',    1,'Rajan Nair',      'Mercedes-Benz 220S',    'show',  '2026-07-15','2026-07-15',1,  8000.00,'confirmed','paid',    'Wedding Ceremony'),
  ('BKG003',7,'Kavitha Nair',  3,'Priya Sharma',    'Ford Mustang GT',       'show',  '2026-07-20','2026-07-22',3, 45000.00,'pending',  'pending', 'Film Shoot'),
  ('BKG004',2,'Mohan Lal',     5,'Suresh Pillai',   'Toyota Innova Crysta',  'normal','2026-06-28','2026-06-30',3, 10500.00,'completed','paid',    'Family Trip'),
  ('BKG005',4,'Rahul Verma',   2,'Arjun Menon',     'Royal Enfield Bullet 500','show','2026-06-05','2026-06-05',1,  3500.00,'cancelled','refunded','Rally Event'),
  ('BKG006',10,'Aditya Kumar', 8,'Arun Krishnan',   'Subaru WRX STI (Wide)', 'show',  '2026-07-25','2026-07-27',3, 54000.00,'confirmed','paid',    'Auto Expo'),
  ('BKG007',5,'Deepa Menon',   1,'Rajan Nair',      'Mercedes-Benz 220S',    'show',  '2026-08-01','2026-08-01',1,  8000.00,'pending',  'pending', 'Brand Campaign'),
  ('BKG008',9,'Lakshmi Devi',  5,'Suresh Pillai',   'Mahindra Thar',         'normal','2026-06-20','2026-06-23',4, 16800.00,'completed','paid',    'Adventure Trip');

-- ── 7. Revenue Monthly ───────────────────────────────────────
INSERT INTO `revenue_monthly` (`month_name`,`month_year`,`revenue`,`bookings_count`) VALUES
  ('Jan',2026,120000.00,24),
  ('Feb',2026,145000.00,29),
  ('Mar',2026,98000.00, 20),
  ('Apr',2026,189000.00,38),
  ('May',2026,210000.00,42),
  ('Jun',2026,176000.00,35),
  ('Jul',2026,248000.00,50),
  ('Aug',2026,195000.00,39),
  ('Sep',2026,162000.00,32),
  ('Oct',2026,228000.00,46),
  ('Nov',2026,190000.00,38),
  ('Dec',2026,286500.00,57);

SET FOREIGN_KEY_CHECKS = 1;
