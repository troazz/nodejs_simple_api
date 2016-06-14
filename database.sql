SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `parent` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', 'Komputer & Laptop', 'List semua komputer dan laptop', '0', '2016-03-22 13:34:50', '2016-03-22 13:34:50');
INSERT INTO `categories` VALUES ('2', 'Komputer', 'List semua tipe komputer', '1', '2016-03-22 13:36:13', '2016-03-22 13:36:13');
INSERT INTO `categories` VALUES ('3', 'Laptop', 'List semua tipe laptop', '1', '2016-03-22 13:36:21', '2016-03-22 13:36:21');
INSERT INTO `categories` VALUES ('4', 'All in One', 'Paket PC lengkap', '2', '2016-03-22 13:36:53', '2016-03-22 13:36:53');
INSERT INTO `categories` VALUES ('5', 'Desktop + Monitor', 'Paket PC dan Monitor', '2', '2016-03-22 13:37:25', '2016-03-22 13:37:25');
INSERT INTO `categories` VALUES ('6', 'Desktop', 'Paket CPU', '2', '2016-03-22 13:37:35', '2016-03-22 13:37:35');
INSERT INTO `categories` VALUES ('7', 'Laptop Gaming', 'Laptop untuk kebutuhan gaming', '3', '2016-03-22 13:37:53', '2016-03-22 13:45:09');
INSERT INTO `categories` VALUES ('8', 'Laptop Multimedia', 'Laptop untuk kebutuhan multimedia', '3', '2016-03-22 13:38:06', '2016-03-22 13:38:06');
INSERT INTO `categories` VALUES ('9', 'Ultrabook', 'Laptop yang mengedepankan mobilitas', '3', '2016-03-22 13:38:36', '2016-03-22 13:38:36');
INSERT INTO `categories` VALUES ('10', 'Laptop Bisnis', 'Laptop yang digunakan untuk bisnis', '3', '2016-03-22 13:38:54', '2016-03-22 13:38:54');
INSERT INTO `categories` VALUES ('11', 'Tablet & Smartphone', 'List dari table ataupun smartphone', '0', '2016-03-22 13:41:45', '2016-03-22 13:41:45');
INSERT INTO `categories` VALUES ('12', 'Android', 'List dari table ataupun smartphone yang ber OS Android', '11', '2016-03-22 13:42:00', '2016-03-22 13:42:00');
INSERT INTO `categories` VALUES ('13', 'IOS', 'List dari table ataupun smartphone yang ber OS IOS', '11', '2016-03-22 13:42:09', '2016-03-22 13:42:09');
INSERT INTO `categories` VALUES ('14', 'Windows Phone', 'List dari table ataupun smartphone yang ber OS Windows', '11', '2016-03-22 13:42:21', '2016-03-22 13:42:21');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `category_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `price` double(255,0) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', 'ASUS ROG GL552VX-DM044T-BTO03 Black', 'Intel Core i7 6700HQ-2.6Ghz Turbo 3.5Ghz, RAM 8GB DDR4, HDD 512GB SSD  (SuperFast & AntiShock), DVD/RW, VGA nVidia GTX950-2GB up to 6GB, Screen 15.6” FHD, Windows 10', '7', '10', '12499000', '14499000', '2016-03-22 15:14:43', '2016-03-22 15:14:43');
INSERT INTO `products` VALUES ('2', 'LENOVO IdeaPad Y50-70-4710HQ Black', 'Intel Core i7 4710HQ-2.5Ghz Turbo 3.5Ghz, RAM 8GB, HDD 1TB, VGA nVidia GTX860M-4GB, Screen 15.6\" FHD , Windows 8.1  (FREE upgrade Windows 10)', '7', '3', '9299000', '10899000', '2016-03-22 15:16:10', '2016-03-22 15:47:20');
INSERT INTO `products` VALUES ('3', 'HP Envy 13-6200U-8GB Silver', 'Intel Core i5 6200U-2.3Ghz Turbo 2.8Ghz, RAM 8GB, HDD 128GB SSD, VGA Intel HD 520 Graphics, Screen 13\" FHD, Windows 10', '9', '5', '9299000', '10899000', '2016-03-22 15:35:23', '2016-03-22 15:35:48');
INSERT INTO `products` VALUES ('4', 'APPLE iPad Mini 4 Retina Wifi Cellular 128GB - Silver', 'Apple A8 DualCore-1.5Ghz, RAM 2GB, Storage 128GB, Cam (F) 1.2MP, (B)8MP, GSM, WiFi, BT, Display 7.9\", Battery 5100 mAh, iOS 9', '13', '5', '9099000', '10199000', '2016-03-22 15:47:30', '2016-03-22 15:47:30');
INSERT INTO `products` VALUES ('5', 'APPLE iPhone 5S 32GB Grey', 'DualCore A7 - 1.3Ghz, RAM 1GB, Storage 32GB, Cam (F)1.2MP, (B)8.0MP, UMTS/HSDPA/GSM/EDGE, Wi-Fi, BT 4.0, A-GPS, 4\", iOS 7', '13', '30', '3000000', '3500000', '2016-03-22 15:49:00', '2016-03-22 15:49:00');
INSERT INTO `products` VALUES ('6', 'APPLE iPhone 4-32GB White - Refurbished Grade A', 'Cortex A8-1Ghz, RAM 512MB, Storage 32GB, Cam (F)VGA, (B)5.0MP, GSM, Wifi, Bluetooth, Layar 3.5\", Battery 1420 mAh, iOS 4 upgradable to iOS 7', '13', '100', '1100000', '1450000', '2016-03-22 15:49:36', '2016-03-22 15:49:36');
