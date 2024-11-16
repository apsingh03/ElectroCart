-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bm1vynnmscycszuwhkzm-mysql.services.clever-cloud.com:3306
-- Generation Time: Jul 25, 2024 at 01:37 PM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bm1vynnmscycszuwhkzm`
--

-- --------------------------------------------------------

--
-- Table structure for table `AdminAuths`
--

CREATE TABLE `AdminAuths` (
  `id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `AdminAuths`
--

INSERT INTO `AdminAuths` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin Singh', 'admin@gmail.com', '$2b$10$Xqp68q9q35OdUh65mAez5.Ujav75/mEHEt7IJuWqgDpQg5UMRAK2C', '2024-07-17 13:51:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `isFavorite` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `admin_id`, `isFavorite`, `createdAt`, `updatedAt`) VALUES
(1, 'Jeans', 1, 1, '2024-07-17 19:19:57', '2024-07-20 06:41:06'),
(2, 'T-Shirt', 1, 1, '2024-07-17 14:13:10', NULL),
(3, 'Shirts', 1, 0, '2024-07-17 14:13:22', NULL),
(4, 'Crop-Top', 1, 0, '2024-07-17 14:16:16', '2024-07-22 13:21:39'),
(5, 'Lower', 1, 0, '2024-07-17 14:16:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `childFilters`
--

CREATE TABLE `childFilters` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `childFilters`
--

INSERT INTO `childFilters` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`, `parent_id`) VALUES
(1, 'Shirts', 1, '2024-07-22 08:28:07', '2024-07-22 08:29:55', 1),
(2, 'T-Shirt', 1, '2024-07-22 08:28:16', '2024-07-22 08:29:47', 1),
(3, 'Jeans', 1, '2024-07-22 08:28:24', '2024-07-22 08:29:31', 1),
(4, 'Crop-Top', 1, '2024-07-22 08:30:07', '2024-07-22 13:24:54', 1),
(5, 'Lower', 1, '2024-07-22 08:30:14', NULL, 1),
(6, 'Red', 1, '2024-07-23 09:16:40', NULL, 2),
(7, 'Orange', 1, '2024-07-23 09:16:45', NULL, 2),
(8, 'Brown', 1, '2024-07-23 09:16:50', NULL, 2),
(9, 'Yellow', 1, '2024-07-23 09:16:55', NULL, 2),
(10, 'Green', 1, '2024-07-23 09:17:00', NULL, 2),
(11, 'Turquoise', 1, '2024-07-23 09:17:12', NULL, 2),
(12, 'Blue', 1, '2024-07-23 09:17:16', NULL, 2),
(13, 'Violet', 1, '2024-07-23 09:17:22', NULL, 2),
(14, 'Pink', 1, '2024-07-23 09:17:27', NULL, 2),
(15, 'White', 1, '2024-07-23 09:17:33', NULL, 2),
(16, 'Gray', 1, '2024-07-23 09:17:42', NULL, 2),
(17, 'Black', 1, '2024-07-23 09:17:49', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `childMenus`
--

CREATE TABLE `childMenus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `clientAuths`
--

CREATE TABLE `clientAuths` (
  `id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clientAuths`
--

INSERT INTO `clientAuths` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'loreum Singh', 'user@gmail.com', '$2b$10$8/ox3ywFRicCx7E4McTLHOteywkRT5mb2azntjPtL3Ds97OgH513K', '2024-07-17 14:43:35', NULL),
(2, 'uday pratap singh', 'uday@gmail.com', 'uday singh', '2024-07-17 14:43:35', NULL),
(3, 'user second', 'user2@gmail.com', '$2b$10$UQNGJ2HNm9KMxDMCVZOWcueNK0IL/cBJ12sH58MF6BupTK7N.zbuu', '2024-07-21 14:28:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Red', 1, '2024-07-17 14:16:57', NULL),
(2, 'Orange', 1, '2024-07-17 14:17:05', NULL),
(3, 'Brown', 1, '2024-07-17 14:17:11', NULL),
(4, 'Yellow', 1, '2024-07-17 14:17:21', NULL),
(5, 'Green', 1, '2024-07-17 14:17:35', NULL),
(6, 'Turquoise', 1, '2024-07-17 14:17:41', NULL),
(7, 'Blue', 1, '2024-07-17 14:17:47', NULL),
(8, 'Violet', 1, '2024-07-17 14:18:32', NULL),
(9, 'Pink', 1, '2024-07-17 14:18:37', NULL),
(10, 'White', 1, '2024-07-17 14:18:42', NULL),
(11, 'Gray', 1, '2024-07-17 14:18:46', NULL),
(12, 'Black', 1, '2024-07-17 14:18:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fabrics`
--

CREATE TABLE `fabrics` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fabrics`
--

INSERT INTO `fabrics` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Cotton', 1, '2024-07-17 14:19:16', NULL),
(2, 'Polyster', 1, '2024-07-17 14:19:23', NULL),
(3, 'Nylon', 1, '2024-07-17 14:19:28', NULL),
(4, 'Woolean', 1, '2024-07-17 14:19:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parentFilters`
--

CREATE TABLE `parentFilters` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parentFilters`
--

INSERT INTO `parentFilters` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Category', 1, '2024-07-22 08:27:32', NULL),
(2, 'Color', 1, '2024-07-23 09:16:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parentMenus`
--

CREATE TABLE `parentMenus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `productColors`
--

CREATE TABLE `productColors` (
  `id` int NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `color_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productColors`
--

INSERT INTO `productColors` (`id`, `admin_id`, `createdAt`, `updatedAt`, `product_id`, `color_id`) VALUES
(1, 1, '2024-07-17 14:23:02', NULL, 1, 2),
(2, 1, '2024-07-17 14:23:03', NULL, 1, 3),
(3, 1, '2024-07-17 14:23:03', NULL, 1, 5),
(4, 1, '2024-07-17 15:15:11', NULL, 2, 9),
(5, 1, '2024-07-17 15:15:12', NULL, 2, 10),
(6, 1, '2024-07-17 15:15:13', NULL, 2, 11),
(7, 1, '2024-07-17 15:15:13', NULL, 2, 12),
(8, 1, NULL, NULL, 3, 1),
(47, 1, NULL, NULL, 4, 1),
(48, 1, NULL, NULL, 4, 2),
(49, 1, NULL, NULL, 5, 3),
(50, 1, NULL, NULL, 6, 4),
(51, 1, NULL, NULL, 7, 5),
(52, 1, NULL, NULL, 8, 6),
(53, 1, NULL, NULL, 9, 7),
(54, 1, NULL, NULL, 10, 8),
(55, 1, NULL, NULL, 11, 9),
(56, 1, NULL, NULL, 12, 10),
(57, 1, NULL, NULL, 13, 11),
(58, 1, NULL, NULL, 14, 12),
(59, 1, NULL, NULL, 15, 1),
(60, 1, NULL, NULL, 16, 2),
(61, 1, NULL, NULL, 17, 3),
(62, 1, NULL, NULL, 18, 4),
(63, 1, NULL, NULL, 19, 5),
(64, 1, NULL, NULL, 20, 6),
(66, 1, '2024-07-17 14:23:02', NULL, 22, 2),
(67, 1, '2024-07-17 14:23:02', NULL, 21, 1),
(68, 1, '2024-07-17 14:23:02', NULL, 22, 2),
(69, 1, '2024-07-17 14:23:02', NULL, 23, 3),
(70, 1, '2024-07-17 14:23:02', NULL, 24, 4),
(71, 1, '2024-07-17 14:23:02', NULL, 25, 5),
(72, 1, '2024-07-17 14:23:02', NULL, 26, 6),
(73, 1, '2024-07-17 14:23:02', NULL, 27, 1),
(74, 1, '2024-07-17 14:23:02', NULL, 28, 2),
(75, 1, '2024-07-17 14:23:02', NULL, 29, 2),
(76, 1, '2024-07-17 14:23:02', NULL, 30, 3),
(77, 1, '2024-07-17 14:23:02', NULL, 31, 4),
(78, 1, '2024-07-17 14:23:02', NULL, 32, 5),
(79, 1, '2024-07-17 14:23:02', NULL, 33, 6),
(80, 1, '2024-07-17 14:23:02', NULL, 34, 3),
(81, 1, '2024-07-17 14:23:02', NULL, 35, 4),
(82, 1, '2024-07-17 14:23:02', NULL, 36, 5),
(83, 1, '2024-07-17 14:23:02', NULL, 37, 6);

-- --------------------------------------------------------

--
-- Table structure for table `productFabrics`
--

CREATE TABLE `productFabrics` (
  `id` int NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `fabric_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productFabrics`
--

INSERT INTO `productFabrics` (`id`, `admin_id`, `createdAt`, `updatedAt`, `product_id`, `fabric_id`) VALUES
(1, 1, '2024-07-17 14:23:02', NULL, 1, 2),
(2, 1, '2024-07-17 14:23:02', NULL, 1, 3),
(3, 1, '2024-07-17 15:15:10', NULL, 2, 1),
(4, 1, '2024-07-17 15:15:11', NULL, 2, 2),
(5, 1, NULL, NULL, 4, 1),
(6, 1, NULL, NULL, 4, 1),
(7, 1, NULL, NULL, 5, 2),
(8, 1, NULL, NULL, 6, 3),
(9, 1, NULL, NULL, 7, 4),
(10, 1, NULL, NULL, 7, 1),
(11, 1, NULL, NULL, 8, 2),
(12, 1, NULL, NULL, 8, 3),
(13, 1, NULL, NULL, 9, 4),
(14, 1, NULL, NULL, 10, 1),
(15, 1, NULL, NULL, 11, 2),
(16, 1, NULL, NULL, 12, 3),
(17, 1, NULL, NULL, 13, 4),
(18, 1, NULL, NULL, 14, 1),
(19, 1, NULL, NULL, 15, 2),
(20, 1, NULL, NULL, 16, 3),
(21, 1, NULL, NULL, 17, 4),
(22, 1, NULL, NULL, 18, 1),
(23, 1, NULL, NULL, 18, 2),
(24, 1, NULL, NULL, 19, 3),
(25, 1, NULL, NULL, 20, 4),
(26, 1, NULL, NULL, 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `productImages`
--

CREATE TABLE `productImages` (
  `id` int NOT NULL,
  `url1` text NOT NULL,
  `url2` text NOT NULL,
  `url3` text NOT NULL,
  `url4` text NOT NULL,
  `url5` text NOT NULL,
  `admin_id` int NOT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productImages`
--

INSERT INTO `productImages` (`id`, `url1`, `url2`, `url3`, `url4`, `url5`, `admin_id`, `product_id`) VALUES
(1, 'https://clothingecommerce.s3.amazonaws.com/1721226171256-j4evt8bojr.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226173771-407e8yizays.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226174868-lfcewdy537.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226175912-d5ox6gn6zig.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226176850-our5s2k567f.jpg', 1, 1),
(2, 'https://clothingecommerce.s3.amazonaws.com/1721229296773-ukolpssbvn.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229299022-fx26enwutvo.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229300164-na5rdfj8nzg.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229301011-gfsjys5n9q7.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229301884-1q0b0g74p3p.jpg', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sizeAndFit` text NOT NULL,
  `fabricAndCare` text NOT NULL,
  `isRecycleBin` tinyint(1) NOT NULL,
  `isFavorite` tinyint(1) NOT NULL,
  `isPublished` tinyint(1) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `productImages_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `sizeAndFit`, `fabricAndCare`, `isRecycleBin`, `isFavorite`, `isPublished`, `admin_id`, `createdAt`, `updatedAt`, `productImages_id`, `category_id`) VALUES
(1, '1 Boat Neck Geometric Print Top - Red', '<p>df</p><ul><li>sdfsdafsadf</li></ul><p>sdfa<strong>This is a new</strong> Data&nbsp;</p><p>asd</p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', 0, 1, 1, 1, '2024-07-17 14:22:59', NULL, 1, 1),
(2, '2 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(3, '3 Boat Neck Geometric Print Top - Red', '<p>df</p><ul><li>sdfsdafsadf</li></ul><p>sdfa<strong>This is a new</strong> Data&nbsp;</p><p>asd</p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', 0, 1, 1, 1, '2024-07-17 14:22:59', NULL, 1, 1),
(4, '4 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(5, '5 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 2),
(6, '6 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 2),
(7, '7 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 2),
(8, '8 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 2),
(9, '9 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 3),
(10, '10 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 3),
(11, '11 Boat Neck Geometric Print Top - Red', '<p>df</p><ul><li>sdfsdafsadf</li></ul><p>sdfa<strong>This is a new</strong> Data&nbsp;</p><p>asd</p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', 0, 1, 1, 1, '2024-07-17 14:22:59', NULL, 1, 3),
(12, '12 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 3),
(13, '13 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 4),
(14, '14 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 4),
(15, '15 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 4),
(16, '16 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 4),
(17, '17 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 5),
(18, '18 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 5),
(19, '19 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 5),
(20, '20 Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 5),
(21, ' Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(22, ' five Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(23, ' six Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(24, ' seven Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(25, ' eight Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(26, ' nine Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(27, ' ten Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(28, ' eleven Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(29, ' twelve Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(30, ' thirteen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(31, ' forteen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(32, ' fifteen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(33, ' sixteen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(34, ' seventeen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(35, ' eighteen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(36, ' nineteen Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(37, ' twenty Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 1),
(38, 'Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 1, 1, 1, '2024-07-17 15:15:05', NULL, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `productSizes`
--

CREATE TABLE `productSizes` (
  `id` int NOT NULL,
  `mrp` int NOT NULL,
  `discountPercent` int NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `PSize_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productSizes`
--

INSERT INTO `productSizes` (`id`, `mrp`, `discountPercent`, `admin_id`, `createdAt`, `updatedAt`, `product_id`, `PSize_id`) VALUES
(1, 1200, 10, 1, '2024-07-17 14:23:00', NULL, 1, 1),
(2, 1400, 15, 1, '2024-07-17 14:23:01', NULL, 1, 2),
(3, 1600, 8, 1, '2024-07-17 14:23:01', NULL, 1, 3),
(4, 4323, 22, 1, '2024-07-17 14:23:01', NULL, 1, 4),
(5, 323, 21, 1, '2024-07-17 15:15:07', NULL, 2, 5),
(6, 2112, 10, 1, '2024-07-17 15:15:08', NULL, 2, 6),
(7, 2124, 4, 1, '2024-07-17 15:15:09', NULL, 2, 7),
(8, 5432, 20, 1, '2024-07-17 15:15:09', NULL, 2, 8),
(9, 1212, 22, 1, '2024-07-17 15:15:10', NULL, 2, 9),
(10, 435, 10, 1, '2024-07-17 14:23:00', NULL, 3, 10),
(11, 120, 15, 1, '2024-07-17 14:23:01', NULL, 3, 11),
(12, 1560, 8, 1, '2024-07-17 14:23:01', NULL, 4, 12),
(13, 223, 6, 1, '2024-07-17 14:23:01', NULL, 4, 13),
(14, 363, 10, 1, '2024-07-17 15:15:07', NULL, 5, 14),
(15, 2512, 6, 1, '2024-07-17 15:15:08', NULL, 6, 15),
(16, 24, 4, 1, '2024-07-17 15:15:09', NULL, 7, 16),
(17, 552, 43, 1, '2024-07-17 15:15:09', NULL, 8, 17),
(18, 152, 2, 1, '2024-07-17 15:15:10', NULL, 9, 18),
(19, 4325, 8, 1, '2024-07-17 14:23:00', NULL, 9, 19),
(20, 160, 5, 1, '2024-07-17 14:23:01', NULL, 10, 20),
(21, 60, 8, 1, '2024-07-17 14:23:01', NULL, 11, 21),
(22, 65, 2, 1, '2024-07-17 14:23:01', NULL, 11, 22),
(23, 5553, 1, 1, '2024-07-17 15:15:07', NULL, 12, 23),
(24, 2642, 7, 1, '2024-07-17 15:15:08', NULL, 13, 24),
(25, 2442, 8, 1, '2024-07-17 15:15:09', NULL, 14, 25),
(26, 242, 8, 1, '2024-07-17 15:15:09', NULL, 15, 25),
(27, 212, 1, 1, '2024-07-17 15:15:09', NULL, 15, 44),
(28, 242, 2, 1, '2024-07-17 15:15:09', NULL, 15, 45),
(29, 222, 3, 1, '2024-07-17 15:15:09', NULL, 15, 46),
(30, 362, 4, 1, '2024-07-17 15:15:09', NULL, 16, 47),
(31, 352, 5, 1, '2024-07-17 15:15:09', NULL, 16, 48),
(32, 362, 6, 1, '2024-07-17 15:15:09', NULL, 16, 49),
(33, 382, 7, 1, '2024-07-17 15:15:09', NULL, 17, 50),
(34, 392, 8, 1, '2024-07-17 15:15:09', NULL, 17, 51),
(35, 3982, 9, 1, '2024-07-17 15:15:09', NULL, 17, 52),
(36, 3522, 10, 1, '2024-07-17 15:15:09', NULL, 18, 53),
(37, 3242, 11, 1, '2024-07-17 15:15:09', NULL, 18, 54),
(38, 3242, 12, 1, '2024-07-17 15:15:09', NULL, 18, 55),
(39, 1242, 13, 1, '2024-07-17 15:15:09', NULL, 19, 56),
(40, 2242, 14, 1, '2024-07-17 15:15:09', NULL, 19, 57),
(41, 4242, 15, 1, '2024-07-17 15:15:09', NULL, 19, 58),
(42, 6242, 16, 1, '2024-07-17 15:15:09', NULL, 20, 59),
(43, 7242, 17, 1, '2024-07-17 15:15:09', NULL, 20, 60),
(44, 8242, 18, 1, '2024-07-17 15:15:09', NULL, 20, 61),
(45, 82, 6, 1, '2024-07-17 15:15:09', NULL, 20, 62),
(46, 82, 6, 1, '2024-07-17 15:15:09', NULL, 22, 64),
(47, 733, 1, 1, '2024-07-17 15:15:09', NULL, 23, 65),
(48, 8322, 2, 1, '2024-07-17 15:15:09', NULL, 24, 66),
(49, 8442, 3, 1, '2024-07-17 15:15:09', NULL, 25, 67),
(50, 8232, 4, 1, '2024-07-17 15:15:09', NULL, 26, 68),
(51, 832, 5, 1, '2024-07-17 15:15:09', NULL, 27, 69),
(52, 543, 6, 1, '2024-07-17 15:15:09', NULL, 28, 70),
(53, 4982, 7, 1, '2024-07-17 15:15:09', NULL, 29, 71),
(54, 987, 8, 1, '2024-07-17 15:15:09', NULL, 30, 72),
(55, 342, 9, 1, '2024-07-17 15:15:09', NULL, 31, 73),
(56, 852, 10, 1, '2024-07-17 15:15:09', NULL, 32, 74),
(57, 822, 11, 1, '2024-07-17 15:15:09', NULL, 33, 75),
(58, 182, 12, 1, '2024-07-17 15:15:09', NULL, 34, 76),
(59, 282, 13, 1, '2024-07-17 15:15:09', NULL, 35, 77),
(60, 382, 14, 1, '2024-07-17 15:15:09', NULL, 36, 78),
(61, 482, 15, 1, '2024-07-17 15:15:09', NULL, 37, 79);

-- --------------------------------------------------------

--
-- Table structure for table `pSizes`
--

CREATE TABLE `pSizes` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pSizes`
--

INSERT INTO `pSizes` (`id`, `name`, `qty`, `admin_id`, `createdAt`, `updatedAt`, `product_id`) VALUES
(1, 'A', 9, 1, '2024-07-17 14:23:00', NULL, 1),
(2, 'AA', 20, 1, '2024-07-17 14:23:00', NULL, 1),
(3, 'AAA', 29, 1, '2024-07-17 14:23:01', NULL, 1),
(4, 'AAAA', 39, 1, '2024-07-17 14:23:01', NULL, 1),
(5, 'B', 13, 1, '2024-07-17 15:15:06', NULL, 2),
(6, 'AA', 28, 1, '2024-07-17 15:15:08', NULL, 2),
(7, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 2),
(8, 'AAAA', 13, 1, '2024-07-17 15:15:09', NULL, 2),
(9, 'BBBBB', 7, 1, '2024-07-17 15:15:10', NULL, 2),
(10, 'A', 9, 1, '2024-07-17 14:23:00', NULL, 3),
(11, 'BA', 20, 1, '2024-07-17 14:23:00', NULL, 3),
(12, 'AAA', 29, 1, '2024-07-17 14:23:01', NULL, 4),
(13, 'BAC', 39, 1, '2024-07-17 14:23:01', NULL, 4),
(14, 'TED', 13, 1, '2024-07-17 15:15:06', NULL, 5),
(15, 'SDF', 28, 1, '2024-07-17 15:15:08', NULL, 6),
(16, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 7),
(17, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 8),
(18, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 9),
(19, 'A', 9, 1, '2024-07-17 14:23:00', NULL, 9),
(20, 'BA', 20, 1, '2024-07-17 14:23:00', NULL, 10),
(21, 'AAA', 29, 1, '2024-07-17 14:23:01', NULL, 11),
(22, 'BAC', 39, 1, '2024-07-17 14:23:01', NULL, 11),
(23, 'TED', 13, 1, '2024-07-17 15:15:06', NULL, 12),
(24, 'SDF', 28, 1, '2024-07-17 15:15:08', NULL, 13),
(25, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 14),
(26, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 15),
(27, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 15),
(28, 'BA', 20, 1, '2024-07-17 14:23:00', NULL, 16),
(29, 'AAA', 29, 1, '2024-07-17 14:23:01', NULL, 16),
(30, 'BAC', 39, 1, '2024-07-17 14:23:01', NULL, 16),
(31, 'TED', 13, 1, '2024-07-17 15:15:06', NULL, 17),
(32, 'SDF', 28, 1, '2024-07-17 15:15:08', NULL, 17),
(33, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 17),
(34, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 18),
(35, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 18),
(36, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 18),
(37, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 19),
(38, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 19),
(39, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 19),
(40, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 20),
(41, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 20),
(42, 'GHD', 13, 1, '2024-07-17 15:15:09', NULL, 20),
(43, 'SDF', 7, 1, '2024-07-17 15:15:10', NULL, 20),
(44, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 15),
(45, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 15),
(46, 'BB', 10, 1, '2024-07-17 15:15:08', NULL, 15),
(47, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 15),
(48, 'CC', 10, 1, '2024-07-17 15:15:08', NULL, 16),
(49, 'CBB', 10, 1, '2024-07-17 15:15:08', NULL, 16),
(50, 'WEB', 10, 1, '2024-07-17 15:15:08', NULL, 16),
(51, 'FFB', 10, 1, '2024-07-17 15:15:08', NULL, 17),
(52, 'SDB', 10, 1, '2024-07-17 15:15:08', NULL, 17),
(53, 'FDB', 10, 1, '2024-07-17 15:15:08', NULL, 17),
(54, 'SEB', 10, 1, '2024-07-17 15:15:08', NULL, 18),
(55, 'VVB', 10, 1, '2024-07-17 15:15:08', NULL, 18),
(56, 'VVB', 10, 1, '2024-07-17 15:15:08', NULL, 18),
(57, 'BB', 10, 1, '2024-07-17 15:15:08', NULL, 19),
(58, 'ABB', 10, 1, '2024-07-17 15:15:08', NULL, 19),
(59, 'VVB', 10, 1, '2024-07-17 15:15:08', NULL, 19),
(60, 'BFBB', 10, 1, '2024-07-17 15:15:08', NULL, 20),
(61, 'BBSB', 10, 1, '2024-07-17 15:15:08', NULL, 20),
(62, 'BBBD', 10, 1, '2024-07-17 15:15:08', NULL, 20),
(63, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 21),
(64, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 21),
(65, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 22),
(66, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 23),
(67, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 24),
(68, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 25),
(69, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 26),
(70, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 27),
(71, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 28),
(72, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 29),
(73, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 30),
(74, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 31),
(75, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 32),
(76, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 33),
(77, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 34),
(78, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 35),
(79, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 36),
(80, 'AA', 10, 1, '2024-07-17 15:15:08', NULL, 37);

-- --------------------------------------------------------

--
-- Table structure for table `userAddresses`
--

CREATE TABLE `userAddresses` (
  `id` int NOT NULL,
  `receiverName` varchar(255) NOT NULL,
  `fullAddress` varchar(255) NOT NULL,
  `landmark` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userCartItems`
--

CREATE TABLE `userCartItems` (
  `id` int NOT NULL,
  `qty` int DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `PSize_id` int DEFAULT NULL,
  `orderPlacedStatus` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userCartItems`
--

INSERT INTO `userCartItems` (`id`, `qty`, `color_id`, `PSize_id`, `orderPlacedStatus`, `createdAt`, `updatedAt`, `cart_id`, `user_id`, `product_id`) VALUES
(1, 12, 5, 2, 1, '2024-07-17 14:45:05', NULL, 1, 1, 1),
(2, 6, 9, 9, 1, '2024-07-17 15:16:43', NULL, 1, 1, 2),
(5, 2, 9, 8, 1, '2024-07-19 13:41:42', NULL, 3, 1, 2),
(6, 1, 5, 4, 1, '2024-07-20 09:24:06', NULL, 4, 1, 1),
(7, 5, 9, 5, 1, '2024-07-20 09:27:26', NULL, 5, 1, 2),
(8, 1, 3, 3, 1, '2024-07-20 09:30:14', NULL, 6, 1, 1),
(9, 1, 11, 8, 1, '2024-07-20 09:30:30', NULL, 6, 1, 2),
(10, 2, 11, 6, 1, '2024-07-20 14:06:20', NULL, 7, 1, 2),
(11, 2, 10, 5, 1, '2024-07-20 14:28:00', NULL, 8, 1, 2),
(12, 2, 9, 9, 1, '2024-07-20 15:28:49', NULL, 9, 1, 2),
(13, 1, 12, 9, 1, '2024-07-20 15:31:51', NULL, 10, 1, 2),
(33, 1, 11, 6, 0, '2024-07-20 18:39:23', NULL, NULL, 1, 2),
(61, 1, 2, 1, 1, '2024-07-21 06:44:23', NULL, 42, 1, 1),
(62, 1, 3, 2, 0, '2024-07-21 07:05:02', NULL, 43, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `userCarts`
--

CREATE TABLE `userCarts` (
  `id` int NOT NULL,
  `cartAmount` int DEFAULT NULL,
  `paymentMode` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deliveryStatus` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `address_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userCarts`
--

INSERT INTO `userCarts` (`id`, `cartAmount`, `paymentMode`, `orderId`, `paymentId`, `status`, `deliveryStatus`, `createdAt`, `updatedAt`, `user_id`, `address_id`) VALUES
(1, 19952, 'Online', 'order_OaPvRmaNLCIfdN', 'pay_OaPvoZeyGFy0Ga', 'SUCCESSFUL', 'Order Packed', '2024-07-17 14:45:05', '2024-07-20 08:51:32', 1, NULL),
(3, 8691, 'Online', 'order_OaVkNkd07grrDO', 'pay_OaVkkqaHpgJetF', 'SUCCESSFUL', 'Order Dispatched', '2024-07-19 13:41:41', '2024-07-20 08:51:45', 1, NULL),
(4, 3371, 'Online', 'order_OaptHkWExWuYlo', 'pay_Oapu2WZgk2kDwL', 'SUCCESSFUL', NULL, '2024-07-20 09:24:06', NULL, 1, NULL),
(5, 1275, 'Online', 'order_OapxNG08KcFlbT', 'pay_OapxpPZVNvEnGw', 'SUCCESSFUL', NULL, '2024-07-20 09:27:25', NULL, 1, NULL),
(6, 5817, 'Online', 'order_Oaq0G6OPtPROnv', 'pay_Oaq0PBtn5vWedO', 'SUCCESSFUL', NULL, '2024-07-20 09:30:14', NULL, 1, NULL),
(7, 3801, 'Online', 'order_OauhdjilfXl9oK', 'pay_OauhqLEqNKJaO3', 'SUCCESSFUL', NULL, '2024-07-20 14:06:20', NULL, 1, NULL),
(8, 510, 'Online', 'order_Oav4LVcc9M2Yi6', 'pay_OavBpM8zC8dxed', 'SUCCESSFUL', NULL, '2024-07-20 14:28:00', NULL, 1, NULL),
(9, 1890, 'Online', 'order_Oaw6phVwLJFjMe', 'pay_Oaw7517tyhPYSl', 'SUCCESSFUL', NULL, '2024-07-20 15:28:48', NULL, 1, NULL),
(10, 945, 'Online', 'order_Oaw9eGg19WdWBr', 'pay_Oaw9ri9AtsMjTI', 'SUCCESSFUL', 'sdA', '2024-07-20 15:31:50', '2024-07-21 06:45:45', 1, NULL),
(42, 1080, 'Online', 'order_ObBha7dMETGNSq', 'pay_ObBhk5C5gJ2Rxz', 'SUCCESSFUL', 'sde23', '2024-07-21 06:44:23', '2024-07-21 06:45:21', 1, NULL),
(43, NULL, NULL, NULL, NULL, 'pending', NULL, '2024-07-21 07:05:01', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userFavoriteProducts`
--

CREATE TABLE `userFavoriteProducts` (
  `id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminAuths`
--
ALTER TABLE `AdminAuths`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `childFilters`
--
ALTER TABLE `childFilters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `childMenus`
--
ALTER TABLE `childMenus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `clientAuths`
--
ALTER TABLE `clientAuths`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fabrics`
--
ALTER TABLE `fabrics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parentFilters`
--
ALTER TABLE `parentFilters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parentMenus`
--
ALTER TABLE `parentMenus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productColors`
--
ALTER TABLE `productColors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indexes for table `productFabrics`
--
ALTER TABLE `productFabrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fabric_id` (`fabric_id`);

--
-- Indexes for table `productImages`
--
ALTER TABLE `productImages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD KEY `productImages_id` (`productImages_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `productSizes`
--
ALTER TABLE `productSizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `PSize_id` (`PSize_id`);

--
-- Indexes for table `pSizes`
--
ALTER TABLE `pSizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `userAddresses`
--
ALTER TABLE `userAddresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userCartItems`
--
ALTER TABLE `userCartItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `userCarts`
--
ALTER TABLE `userCarts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `userFavoriteProducts`
--
ALTER TABLE `userFavoriteProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AdminAuths`
--
ALTER TABLE `AdminAuths`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `childFilters`
--
ALTER TABLE `childFilters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `childMenus`
--
ALTER TABLE `childMenus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clientAuths`
--
ALTER TABLE `clientAuths`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `fabrics`
--
ALTER TABLE `fabrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parentFilters`
--
ALTER TABLE `parentFilters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `parentMenus`
--
ALTER TABLE `parentMenus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productColors`
--
ALTER TABLE `productColors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `productFabrics`
--
ALTER TABLE `productFabrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `productImages`
--
ALTER TABLE `productImages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `productSizes`
--
ALTER TABLE `productSizes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `pSizes`
--
ALTER TABLE `pSizes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `userAddresses`
--
ALTER TABLE `userAddresses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userCartItems`
--
ALTER TABLE `userCartItems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `userCarts`
--
ALTER TABLE `userCarts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `userFavoriteProducts`
--
ALTER TABLE `userFavoriteProducts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `childFilters`
--
ALTER TABLE `childFilters`
  ADD CONSTRAINT `childFilters_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parentFilters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `childMenus`
--
ALTER TABLE `childMenus`
  ADD CONSTRAINT `childMenus_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parentMenus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productColors`
--
ALTER TABLE `productColors`
  ADD CONSTRAINT `productColors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productColors_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productFabrics`
--
ALTER TABLE `productFabrics`
  ADD CONSTRAINT `productFabrics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productFabrics_ibfk_2` FOREIGN KEY (`fabric_id`) REFERENCES `fabrics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productImages`
--
ALTER TABLE `productImages`
  ADD CONSTRAINT `productImages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productImages_id`) REFERENCES `productImages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productSizes`
--
ALTER TABLE `productSizes`
  ADD CONSTRAINT `productSizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productSizes_ibfk_2` FOREIGN KEY (`PSize_id`) REFERENCES `pSizes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pSizes`
--
ALTER TABLE `pSizes`
  ADD CONSTRAINT `pSizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userAddresses`
--
ALTER TABLE `userAddresses`
  ADD CONSTRAINT `userAddresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userCartItems`
--
ALTER TABLE `userCartItems`
  ADD CONSTRAINT `userCartItems_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `userCarts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userCartItems_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userCartItems_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userCarts`
--
ALTER TABLE `userCarts`
  ADD CONSTRAINT `userCarts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userCarts_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `userAddresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userFavoriteProducts`
--
ALTER TABLE `userFavoriteProducts`
  ADD CONSTRAINT `userFavoriteProducts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userFavoriteProducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
