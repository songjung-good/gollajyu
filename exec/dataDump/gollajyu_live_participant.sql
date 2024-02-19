-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: i10E107.p.ssafy.io    Database: gollajyu
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `live_participant`
--

DROP TABLE IF EXISTS `live_participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_participant` (
  `live_participant_id` bigint NOT NULL AUTO_INCREMENT,
  `live_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`live_participant_id`),
  KEY `FKbhakbk1moqftpj5iph3epff4h` (`live_id`),
  KEY `FKrew872enqkmoaw0u3vdpmaxkw` (`member_id`),
  CONSTRAINT `FKbhakbk1moqftpj5iph3epff4h` FOREIGN KEY (`live_id`) REFERENCES `live` (`live_id`),
  CONSTRAINT `FKrew872enqkmoaw0u3vdpmaxkw` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_participant`
--

LOCK TABLES `live_participant` WRITE;
/*!40000 ALTER TABLE `live_participant` DISABLE KEYS */;
INSERT INTO `live_participant` VALUES (76,72,125),(82,69,130),(85,69,158);
/*!40000 ALTER TABLE `live_participant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 17:30:03
