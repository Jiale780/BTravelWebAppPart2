-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sp_travel
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `message` varchar(100) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `Name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'CalebYeoh','CalebYeoh10@yahoo.com','admin','cy7Yoyox','Something'),(2,'UserTest','UserTest@gmail.com','user','UserTest978','Testing'),(3,'CustomerUser','UserCust@yahoo.com','user','Biz45Tech1','Hmm'),(4,'MicikoTey','MicikoTey@gmail.com','admin','Evoluier11','Sample_Usage'),(5,'Kino-12','UserAnalyse34@gmail.com','user','Kino450','Necessary_Usage'),(6,'SynergyTest','SynergyTest123@yahoo.com','admin','SynergyTest10','Restrict_Usage'),(19,'Kino-00','UserAnalysis10@gmail.com','user3','Kino450','Necessary_Usage');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerary`
--

DROP TABLE IF EXISTS `itinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary` (
  `Itinerary_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Day` int(11) NOT NULL,
  `Activity` longtext NOT NULL,
  `Travel_ID` int(11) NOT NULL,
  PRIMARY KEY (`Itinerary_ID`),
  KEY `Travel_ID_idx` (`Travel_ID`),
  CONSTRAINT `Travel_ID` FOREIGN KEY (`Travel_ID`) REFERENCES `travel_listing` (`Travel_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary`
--

LOCK TABLES `itinerary` WRITE;
/*!40000 ALTER TABLE `itinerary` DISABLE KEYS */;
INSERT INTO `itinerary` VALUES (1,12,'Culture, Food & Drinks, Historical Sites',1),(2,2,'Sightseeing, Food & Drinks & Leisure',1),(3,5,'Food & Drink',2),(4,11,'Musics & Sensation',2),(5,2,'Relaxation',2),(6,8,'Playing Sports',2),(7,3,'Watch and experience of different kinds of AI Technology',1),(8,3,'Sightseeing and explore of all the surrondings areas',4),(9,7,'Industry And Ecommerce',6),(14,3,'Sightseeing',4);
/*!40000 ALTER TABLE `itinerary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_listing`
--

DROP TABLE IF EXISTS `travel_listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_listing` (
  `Travel_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` longtext NOT NULL,
  `Price` int(11) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `Travel_Period` varchar(50) NOT NULL,
  `Image_URL` longtext NOT NULL,
  `Date_Inserted` timestamp NOT NULL,
  PRIMARY KEY (`Travel_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_listing`
--

LOCK TABLES `travel_listing` WRITE;
/*!40000 ALTER TABLE `travel_listing` DISABLE KEYS */;
INSERT INTO `travel_listing` VALUES (1,'SG Tourism','Virtual_Tourism_in_Singapore',2300,'Singapore','11-2016','https://SGTours.jpg','2016-07-23 07:30:00'),(2,'JP Tourism','Virtual_Tourism_in_Japan',3150,'Japan','08-2022','https://JPNTours.jpg','2022-01-11 02:00:00'),(3,'Sentosa Island','Sentosa Island in Singapore',450,'Singapore','03-2018','https://SentosaIsland.jpg','2017-08-19 08:45:00'),(4,'Tokyo Tower','Old Tokyo Tower in Japan',300,'Japan','06-2023','https://TokyoTower.jpg','2023-01-07 01:55:00'),(5,'Wild Wild Wet','Pasir Ris D\' Resort',1250,'Singapore','01-2017','https://WWW.jpg','2016-09-19 06:30:00'),(6,'JP Virtual Tourism2','Virtual_Tourism_in_Japan',2400,'japan','10-2027','https://JPVT2.jpg','2026-05-27 13:00:00'),(7,'Japanese Invention','Virtual_Tourism_in_Japan',4000,'Japan','05-2027','https://JapanInvent.jpg','2027-03-14 00:45:00'),(8,'AI Technology','Virtual_Tourism_in_Singapore',5230,'Singapore','10-2030','https://AI_sg.jpg','2026-05-27 13:00:00'),(9,'Car Exhibition','Virtual Car Exhibition',1790,'USA','07-2024','https://CarExhibit.jpg','2024-04-06 05:00:00'),(10,'Studio_Cafe','Food & Drinks only',1350,'Denmark','02-2030','https://StudioCafe.jpg','2029-12-12 09:15:00');
/*!40000 ALTER TABLE `travel_listing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-02 23:37:18
