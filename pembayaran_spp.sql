-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2021 at 03:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pembayaran_spp`
--

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `nama_kelas` varchar(255) DEFAULT NULL,
  `kompetensi_keahlian` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `nama_kelas`, `kompetensi_keahlian`, `createdAt`, `updatedAt`) VALUES
(1, 'XI', 'RPL', '2021-03-11 15:30:32', '2021-04-01 15:42:13'),
(2, 'X', 'TKJ', '2021-03-11 15:30:44', '2021-03-11 15:30:44'),
(3, 'XI', 'TKJ', '2021-03-11 15:30:49', '2021-03-11 15:30:49'),
(4, 'X', 'RPL', '2021-03-11 15:30:56', '2021-03-11 15:30:56'),
(6, 'XII', 'TKJ', '2021-04-01 15:42:25', '2021-04-01 15:42:25');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_petugas` int(11) NOT NULL,
  `id_tagihan` int(11) NOT NULL,
  `nisn` varchar(255) DEFAULT NULL,
  `tgl_bayar` date DEFAULT NULL,
  `bulan_bayar` varchar(255) DEFAULT NULL,
  `tahun_bayar` varchar(255) DEFAULT NULL,
  `id_spp` int(11) NOT NULL,
  `jumlah_bayar` double DEFAULT NULL,
  `konfirmasi` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_petugas`, `id_tagihan`, `nisn`, `tgl_bayar`, `bulan_bayar`, `tahun_bayar`, `id_spp`, `jumlah_bayar`, `konfirmasi`, `createdAt`, `updatedAt`) VALUES
(9, 1, 1, '10002', '2021-03-13', 'Maret', '2021', 8, 300000, 1, '2021-03-13 06:45:55', '2021-03-13 06:53:18'),
(10, 2, 3, '10002', '2021-03-13', 'Maret', '2021', 8, 300000, 1, '2021-03-13 06:46:36', '2021-04-06 07:46:42'),
(13, 2, 5, '10001', '2021-04-06', 'April', '2021', 1, 500000, 1, '2021-04-06 08:07:57', '2021-04-06 08:07:57'),
(16, 1, 8, '10001', '2021-04-08', 'April', '2021', 1, 500000, 0, '2021-04-08 13:19:59', '2021-04-08 13:19:59'),
(17, 1, 7, '10003', '2021-04-09', 'Februari', '2021', 3, 400000, 0, '2021-04-09 02:23:20', '2021-04-09 02:23:20');

-- --------------------------------------------------------

--
-- Table structure for table `petugas`
--

CREATE TABLE `petugas` (
  `id_petugas` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama_petugas` varchar(255) DEFAULT NULL,
  `level` enum('admin','petugas') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `petugas`
--

INSERT INTO `petugas` (`id_petugas`, `username`, `password`, `nama_petugas`, `level`, `createdAt`, `updatedAt`) VALUES
(1, 'justika', '202cb962ac59075b964b07152d234b70', 'Justi', 'admin', '2021-03-11 15:38:19', '2021-03-11 15:38:19'),
(2, 'rio', '202cb962ac59075b964b07152d234b70', 'Satrio', 'petugas', '2021-03-11 15:38:47', '2021-04-02 03:28:17'),
(3, 'ripacth', '202cb962ac59075b964b07152d234b70', 'Ripacth', 'petugas', '2021-04-02 09:44:03', '2021-04-02 09:44:03'),
(4, 'jalan', '202cb962ac59075b964b07152d234b70', 'Jalaludin', 'petugas', '2021-04-02 03:21:20', '2021-04-02 03:21:20'),
(6, 'toni', '202cb962ac59075b964b07152d234b70', 'Toni', 'admin', '2021-04-06 07:48:59', '2021-04-06 07:48:59');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210308133727-create-spp.js'),
('20210308133832-create-kelas.js'),
('20210308134220-create-siswa.js'),
('20210308135743-create-petugas.js'),
('20210308135924-create-tagihan.js'),
('20210308135925-create-pembayaran.js');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nisn` char(255) NOT NULL,
  `nis` char(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `id_kelas` int(11) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_spp` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nisn`, `nis`, `nama`, `id_kelas`, `alamat`, `no_telp`, `username`, `password`, `id_spp`, `createdAt`, `updatedAt`) VALUES
('10001', '100', 'Rizal', 1, 'Nganjuk', '081298312', 'rizal', '202cb962ac59075b964b07152d234b70', 1, '2021-03-15 15:32:13', '2021-04-01 13:05:59'),
('10002', '110', 'Mika', 1, 'Bulak', '09213908213', 'mika', '202cb962ac59075b964b07152d234b70', 8, '2021-03-11 15:35:27', '2021-04-06 01:38:28'),
('10003', '101', 'Jesna', 3, 'Darjo', '09812312', 'jesna', '202cb962ac59075b964b07152d234b70', 3, '2021-03-11 15:35:59', '2021-04-01 08:52:30');

-- --------------------------------------------------------

--
-- Table structure for table `spp`
--

CREATE TABLE `spp` (
  `id_spp` int(11) NOT NULL,
  `tahun` int(11) DEFAULT NULL,
  `nominal` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `spp`
--

INSERT INTO `spp` (`id_spp`, `tahun`, `nominal`, `createdAt`, `updatedAt`) VALUES
(1, 2020, 500000, '2021-03-09 07:46:10', '2021-03-09 07:47:35'),
(3, 2021, 400000, '2021-03-11 06:21:02', '2021-03-11 06:21:02'),
(7, 2021, 600000, '2021-03-11 15:33:10', '2021-03-11 15:33:10'),
(8, 2020, 300000, '2021-03-11 15:33:42', '2021-03-11 15:33:42'),
(9, 2021, 200000, '2021-03-13 03:15:11', '2021-03-13 03:15:11');

-- --------------------------------------------------------

--
-- Table structure for table `tagihan`
--

CREATE TABLE `tagihan` (
  `id_tagihan` int(11) NOT NULL,
  `id_petugas` int(11) NOT NULL,
  `nisn` char(255) DEFAULT NULL,
  `bulan` varchar(255) DEFAULT NULL,
  `tahun` varchar(255) DEFAULT NULL,
  `id_spp` int(11) NOT NULL,
  `konfirmasi` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tagihan`
--

INSERT INTO `tagihan` (`id_tagihan`, `id_petugas`, `nisn`, `bulan`, `tahun`, `id_spp`, `konfirmasi`, `createdAt`, `updatedAt`) VALUES
(1, 1, '10002', 'Januari', '2021', 8, 1, '2021-03-11 15:39:52', '2021-03-13 06:45:55'),
(3, 3, '10002', 'Agustus', '2021', 8, 1, '2021-03-11 15:40:15', '2021-04-06 01:37:02'),
(5, 3, '10001', 'November', '2021', 1, 1, '2021-04-02 15:50:14', '2021-04-06 08:07:57'),
(7, 2, '10003', 'Januari', '2021', 3, 1, '2021-04-05 04:48:11', '2021-04-09 02:23:20'),
(8, 2, '10001', 'Agustus', '2021', 1, 1, '2021-04-06 07:49:19', '2021-04-08 13:19:59'),
(9, 2, '10003', 'Februari', '2021', 3, 0, '2021-04-06 07:49:43', '2021-04-06 07:49:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `id_petugas` (`id_petugas`),
  ADD KEY `id_spp` (`id_spp`),
  ADD KEY `id_tagihan` (`id_tagihan`);

--
-- Indexes for table `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`id_petugas`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nisn`),
  ADD KEY `id_kelas` (`id_kelas`),
  ADD KEY `id_spp` (`id_spp`);

--
-- Indexes for table `spp`
--
ALTER TABLE `spp`
  ADD PRIMARY KEY (`id_spp`);

--
-- Indexes for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD PRIMARY KEY (`id_tagihan`),
  ADD KEY `id_petugas` (`id_petugas`),
  ADD KEY `id_spp` (`id_spp`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id_petugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `spp`
--
ALTER TABLE `spp`
  MODIFY `id_spp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tagihan`
--
ALTER TABLE `tagihan`
  MODIFY `id_tagihan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_petugas`) REFERENCES `petugas` (`id_petugas`),
  ADD CONSTRAINT `pembayaran_ibfk_3` FOREIGN KEY (`id_spp`) REFERENCES `siswa` (`id_spp`) ON DELETE CASCADE,
  ADD CONSTRAINT `pembayaran_ibfk_4` FOREIGN KEY (`id_tagihan`) REFERENCES `tagihan` (`id_tagihan`) ON DELETE CASCADE;

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`),
  ADD CONSTRAINT `siswa_ibfk_2` FOREIGN KEY (`id_spp`) REFERENCES `spp` (`id_spp`);

--
-- Constraints for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD CONSTRAINT `tagihan_ibfk_1` FOREIGN KEY (`id_petugas`) REFERENCES `petugas` (`id_petugas`),
  ADD CONSTRAINT `tagihan_ibfk_2` FOREIGN KEY (`id_spp`) REFERENCES `siswa` (`id_spp`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
