-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: HomeAway
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Property`
--

DROP TABLE IF EXISTS `Property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Property` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bed` int(11) DEFAULT NULL,
  `bath` int(11) DEFAULT NULL,
  `startdate` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `enddate` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currencytype` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `minstay` int(11) DEFAULT NULL,
  `maxadults` int(11) DEFAULT NULL,
  `maxchild` int(11) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zip` int(255) NOT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1237 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property`
--

LOCK TABLES `Property` WRITE;
/*!40000 ALTER TABLE `Property` DISABLE KEYS */;
INSERT INTO `Property` VALUES (0,'Brand New Sydney Shores','Villa',NULL,4,4,'2018-11-15','2018-12-15','Australian Dollar',900,4,6,6,NULL,'our family and loved ones will enjoy the spacious backyard, perfect for family gatherings! Come and take a look at this beauty….Don’t miss out!','#45 Building','Sydney','Sydney',79288,'USA','99 Street'),(1,'One South Market','Apartment','One South San Jose',2,2,'2018-09-16','2018-10-15','USD',300,1,5,5,1,'One South Market is Awesome!!','#501','San Jose','California',95113,'USA','1 St. Market Street'),(2,'Villa Torrino','Villa','Torrino Plaza',3,4,'2018-09-16','2018-10-15','EURO',500,1,9,9,1,'Grab Huge place at small prices','#143','Dallas','Texas',95112,'USA','Dallas buyers club'),(3,'San Fernando','Apartment','Opp MLK San Jose',3,2,'2018-10-19','2018-11-13','USD',350,1,4,4,1,'Fernando is the place to be!','#111','San Jose','California',95111,'USA','VTA Station 4 St'),(4,'San Fernando Bay Area','Apartment','Two South Fernando Jose',2,2,'2018-11-02','2018-12-03','USD',400,1,5,5,1,'Bay is for Bae','#901','Fernando CA','California',99913,'USA','Bakers Street'),(5,'Florida Snake County','Community','Florida State University',3,3,'2018-10-21','2018-11-05','USD',600,1,7,7,1,'Snakes Beaches Food Love Everything','#01','Miami','Florida',99713,'USA',' FSU 2nd Street'),(6,'Miami Park','Villa','Miami housing board',3,3,'2018-12-02','2018-12-27','USD',900,1,8,8,1,'Everything in One Place','#999','Miami','Florida',91011,'USA','Miami Public Library'),(7,'Buffalo wings Area','Apartment','Buffalo El camino',2,2,'2018-12-02','2018-12-20','USD',200,1,5,5,1,'Niagara is neighbourhood','#911','Buffalo','New York',98723,'USA','SUNY Buffalo'),(8,'Penn State Community','Villa','Penn State County',3,3,'2018-11-01','2018-12-13','USD',700,1,8,8,1,'Warriors Destiny','#501','Dallas','Texas',90001,'USA','PSU Street'),(9,'Austin Heritage','Hotel','Two North Austin',2,1,'2018-11-02','2018-12-20','USD',400,1,5,5,1,'Austin is a place to be!','#123','Dallas','Texas',99223,'USA','Ovens Street, North Austin'),(10,'Texas Rails','Apartment','Univesity Campus',3,3,'2018-11-02','2018-12-20','USD',200,1,7,7,1,'','#101','Dallas','Texas',912333,'USA','Street 301 Dallas University area'),(11,'Natick Housing County','Home',NULL,3,3,'2018-12-04','2018-12-24','',400,2,5,5,NULL,'This 1,523 square foot single-family home has 3 bedrooms and 3.0 bathrooms. It is located at 3991 Bleacher Ave, Natick, Boston.','#123','Natick','Boston',82992,'USA','10Street'),(12,'Remodeled County of Michigan','Apartment',NULL,4,4,'2018-12-01','2018-12-30','US Dollar',800,3,6,6,NULL,'Remodeled to perfection! This beautiful home is located close to shopping and dining. Here are just a few of its wonderful features','#898','Michigan','Michigan',89272,'USA','12 Street'),(13,' 3991 Bleacher Ave, Sydney ','Apartment',NULL,2,2,'2018-11-01','2018-11-30','Australian Dollar',600,2,4,4,NULL,'Gorgeous 4-bedroom, 2-bathroom home in beautiful Silver Lake. This property offers 1,160 square feet of living space and a lot size of 5,499 square feet. ','#501, Sydney Streets','Sydney','Sydney',920211,'Australia','Opp Sydney Museum'),(14,'Brand New Sydney Shores','Villa',NULL,5,5,'2018-11-15','2018-11-30','Australian Dollar',900,2,5,5,NULL,'Our family and loved ones will enjoy the spacious backyard, perfect for family gatherings! Come and take a look at this beauty….Don’t miss out!','#45 Building','Sydney','Sydney',79288,'Australia','99 Street'),(15,'Melbourne County','Villa',NULL,3,3,'2018-12-01','2018-12-31','Australian Dollar',1000,3,6,6,NULL,'Our family and loved ones will enjoy the spacious backyard, perfect for family gatherings!','#54 Building','Melbourne','Melbourne',82828,'Australia','100 Rental Street'),(16,'Santa Cruz Bae Area','Villa',NULL,4,4,'2018-11-15','2018-12-15','Indian Rupee',2500,2,5,5,NULL,'Amazing county with even more amazing people','C-7/4, LIC Colony','Mumbai','Maharashtra',400054,'India','S.V Road Street'),(17,'Sai Raj Residency','Apartment',NULL,3,2,'2018-11-16','2018-12-16','Indian Rupee',3000,3,4,3,NULL,'Awesome flat in the heart of the city! Hitech !!','#6372','Hyderabad','Telangana',500081,'India','SV Road'),(18,'Raju Kari Pulav Towers','Villa',NULL,3,3,'2018-11-16','2018-12-16','Indian Rupee',5000,1,6,3,NULL,'Amazing place with Jaw dropping sceneries !','#143','Hyderabad','Telangana',783939,'India','SriNagar Colony'),(19,'Rednam Properties','Apartment',NULL,3,2,'2018-11-22','2018-12-06','Indian Rupee',2000,1,6,5,NULL,'Rednam is a brand! Known for its excellent housing services','#501','Hyderabad','Telangana',92922,'India','Gandhi Street');
/*!40000 ALTER TABLE `Property` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-07 23:32:11
