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
-- Table structure for table `live_vote_item`
--

DROP TABLE IF EXISTS `live_vote_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_vote_item` (
  `live_vote_item_id` bigint NOT NULL AUTO_INCREMENT,
  `live_vote_item_count` bigint DEFAULT NULL,
  `live_vote_item_description` varchar(255) DEFAULT NULL,
  `live_vote_item_img_url` varchar(255) DEFAULT NULL,
  `live_id` bigint DEFAULT NULL,
  PRIMARY KEY (`live_vote_item_id`),
  KEY `FKfrnupa95kdi1c79uxb6g356q1` (`live_id`),
  CONSTRAINT `FKfrnupa95kdi1c79uxb6g356q1` FOREIGN KEY (`live_id`) REFERENCES `live` (`live_id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_vote_item`
--

LOCK TABLES `live_vote_item` WRITE;
/*!40000 ALTER TABLE `live_vote_item` DISABLE KEYS */;
INSERT INTO `live_vote_item` VALUES (128,0,'BTS',NULL,69),(129,0,'봉준호',NULL,69),(130,0,'손흥민',NULL,69),(131,0,'Jay Park',NULL,69),(138,0,NULL,'/app/gollajyuImages/8988b753-15cd-40d8-9503-10d9444e4f49_카리나.jpg',72),(139,0,NULL,'/app/gollajyuImages/a2edbaf1-5b3a-46bc-97a1-536f2c76859c_윈터.jpg',72);
/*!40000 ALTER TABLE `live_vote_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 17:30:01
