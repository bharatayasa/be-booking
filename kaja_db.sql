-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 13 Feb 2024 pada 22.28
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kaja_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `id_booking` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_tour` int(11) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('confirmed','pending','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `location`
--

CREATE TABLE `location` (
  `id_location` int(11) NOT NULL,
  `location_name` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `timetable`
--

CREATE TABLE `timetable` (
  `id_timetable` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tour`
--

CREATE TABLE `tour` (
  `id_tour` int(11) NOT NULL,
  `id_location` int(11) DEFAULT NULL,
  `id_timetable` int(11) DEFAULT NULL,
  `tour_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `maximum_capacity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active',
  `role` enum('pelanggan','admin') DEFAULT 'pelanggan',
  `email_verified` enum('true','false') DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_users`, `username`, `name`, `email`, `password`, `created_at`, `updated_at`, `status`, `role`, `email_verified`) VALUES
(1, 'john_doe', 'John Doe', 'john.doe@example.com', 'password123', '2024-02-13 12:41:25', '2024-02-13 12:41:25', 'active', 'admin', 'true'),
(2, 'jane_smith', 'Jane Smith', 'jane.smith@example.com', 'securepass', '2024-02-13 12:41:25', '2024-02-13 12:41:25', 'active', 'pelanggan', 'true'),
(3, 'mike_jackson', 'Mike Jackson', 'mike.jackson@example.com', 'mikepass', '2024-02-13 12:41:25', '2024-02-13 12:41:25', 'inactive', 'pelanggan', 'false'),
(4, 'sara_adams', 'Sara Adams', 'sara.adams@example.com', 'sara123', '2024-02-13 12:41:25', '2024-02-13 12:41:25', 'active', 'pelanggan', 'true'),
(11, 'wayan', 'John Doe', 'john.doe@example.com2', '$2b$10$L9PzQZSxdrS6nzdYZ8.JNOXzB7/VUpjRD.S.7Z8b.5wi/aP0dIz5i', '2024-02-13 14:19:56', '2024-02-13 14:19:56', 'active', 'pelanggan', 'false'),
(12, 'wayan bhar', 'bharata', 'john.doe@example.com3', '$2b$10$IepKMl7F1F6RTX46BXUsYefVVK49PbbwjemHc1GFfauK5M70HalFa', '2024-02-13 14:28:00', '2024-02-13 14:28:00', 'active', 'pelanggan', 'false');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_tour` (`id_tour`);

--
-- Indeks untuk tabel `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id_location`);

--
-- Indeks untuk tabel `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id_timetable`);

--
-- Indeks untuk tabel `tour`
--
ALTER TABLE `tour`
  ADD PRIMARY KEY (`id_tour`),
  ADD KEY `id_location` (`id_location`),
  ADD KEY `id_timetable` (`id_timetable`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `location`
--
ALTER TABLE `location`
  MODIFY `id_location` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id_timetable` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tour`
--
ALTER TABLE `tour`
  MODIFY `id_tour` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`id_tour`) REFERENCES `tour` (`id_tour`);

--
-- Ketidakleluasaan untuk tabel `tour`
--
ALTER TABLE `tour`
  ADD CONSTRAINT `tour_ibfk_1` FOREIGN KEY (`id_location`) REFERENCES `location` (`id_location`),
  ADD CONSTRAINT `tour_ibfk_2` FOREIGN KEY (`id_timetable`) REFERENCES `timetable` (`id_timetable`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
