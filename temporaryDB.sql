-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 19 apr 2021 om 21:08
-- Serverversie: 10.4.17-MariaDB
-- PHP-versie: 7.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alertify`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ice_contacts`
--

CREATE TABLE `ice_contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `relation` varchar(255) NOT NULL,
  `telephone_number` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `ice_contacts`
--

INSERT INTO `ice_contacts` (`id`, `user_id`, `first_name`, `last_name`, `relation`, `telephone_number`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Jane', 'Doe', 'Spouse', '0123456789', '2021-04-19 19:07:34', '2021-04-19 19:07:34', NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `medical_info`
--

CREATE TABLE `medical_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blood_type` varchar(255) NOT NULL,
  `allergies` text NOT NULL DEFAULT 'None',
  `medical_conditions` text NOT NULL DEFAULT 'None',
  `medication` text NOT NULL DEFAULT 'None',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `medical_info`
--

INSERT INTO `medical_info` (`id`, `user_id`, `blood_type`, `allergies`, `medical_conditions`, `medication`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'O+', 'Cats', 'None', 'Levocitrizine', '2021-04-19 19:02:35', '2021-04-19 19:02:35', NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `sex` varchar(255) NOT NULL,
  `telephone_number` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `street_number` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `date_of_birth`, `sex`, `telephone_number`, `street`, `street_number`, `city`, `postal_code`, `province`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'John', 'Doe', 'j.d@mail.com', '12345', '1999-12-06', 'male', '0123456789', 'Stationstraat', '3', 'Antwerpen', '2100', 'Antwerpen', '2021-04-19 18:52:07', '2021-04-19 18:52:07', NULL);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `ice_contacts`
--
ALTER TABLE `ice_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `medical_info`
--
ALTER TABLE `medical_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `ice_contacts`
--
ALTER TABLE `ice_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `medical_info`
--
ALTER TABLE `medical_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
