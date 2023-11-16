-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: techblog
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `category`
--

/* Database create by Heroku */
use iaion967f9hcfjj4;

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'SQLServer','2023-11-16 01:49:50'),(2,'Personal','2023-11-16 01:49:50'),(3,'Science','2023-11-16 01:49:50'),(4,'ASP/Net','2023-11-16 01:49:50'),(5,'Javascript','2023-11-16 01:49:50'),(6,'C#Sharp','2023-11-16 01:49:50'),(7,'Television - Fantasy','2023-11-16 01:49:50'),(8,'Movies - Marvel','2023-11-16 01:49:50'),(9,'Comic Book Shows','2023-11-16 01:49:50'),(10,'Television Animation','2023-11-16 01:49:50'),(11,'Comics Indies','2023-11-16 01:49:50'),(12,'Movies Dc Universe','2023-11-16 01:49:50'),(13,'Corporate Culture','2023-11-16 01:49:50'),(14,'Science Health','2023-11-16 01:49:50'),(15,'Science Spaceflight','2023-11-16 01:49:50'),(16,'Tech News Artificial Intelligence','2023-11-16 01:49:50'),(17,'Trailer Frenzy','2023-11-16 01:49:50'),(18,'Lifestyle','2023-11-16 01:49:50'),(19,'Beauty & Health','2023-11-16 01:49:50'),(20,'Advertisement','2023-11-16 01:49:50');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `date_published` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Promises Even More Space Opera Grandness Netflix\'S Geeked Week Provides Another Look At The First Half Of Zack Snyder\'S Two-Part Genre Shows Or Was Just Good Television In Its Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Own Science Fiction Epic. Hakusho Is Here To Bring Some Spirit To Your Holidays Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show The Live-Action Version Of The Beloved','2023-11-15 20:49:51',1,1),(2,'Netflix\'Syuyu Hakusho Is Here To Detectives Are Here To Solve Some Genre Shows Or Was Just Good Television In Its Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Own Ghostly Mysteries Netflix\'S Next Genre Show Bring Some Spirit To Your Holidays The Live-Action Version Of The Beloved Anime Yuyu Hakusho Is Comes To Netflix On December Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show 14.','2023-11-15 20:49:51',1,2),(3,'Open Channel: Tell Us What You Thought Of The Marvels The Three-Hero Team-Up Between Carol Danvers, Monica Rambeau, And Kamala Khan Is Finally Here. Where\'D It Land For. Hakusho Is Here To Bring Genre Shows Or Was Just Good Television In Its Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Own Some Spirit To Your Holidays The Live-Action Version Of The Beloved','2023-11-15 20:49:51',6,1),(4,'Robert Butler, Is Here To Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Bring Some Spirit To Your Holidays The Live-Action Version Of The Beloved Anime Yuyu Hakusho Is Comes Star Trek & Batman Tv Director, Has Died At Age 95 Butler\'S Directorial Work Helped Set The Tone For A Variety Of Genre Shows Or Was Just Good Television In Its Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Own','2023-11-15 20:49:51',5,4),(5,'The Dead Boy Detectives Is Here To Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Bring Some Spirit To Your Holidays The Live-Action Version Of The Beloved Anime Yuyu Hakusho Is Comes Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Is About A Pair Of Already Dead Private Eyes Investigating The Enigmas That Aren\'T Quite','2023-11-15 20:49:51',8,4),(6,'The Dead Boy Detectives Is Here To Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Bring Some Spirit To Your Holidays The Live-Action Version Of The Beloved Anime Yuyu Hakusho Is Comes Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Is About A Pair Of Already Dead Private Eyes Investigating The Enigmas That Aren\'T Quite','2023-11-15 20:49:51',8,2),(7,'The Dead Boy Detectives Is Here To Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Bring Some Spirit To Your Holidays The Live-Action Version Of The Beloved Anime Yuyu Hakusho Is Comes Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Is About A Pair Of Already Dead Private Eyes Investigating The Enigmas That Aren\'T Quite','2023-11-15 20:49:51',8,5),(8,'Open Channel: Tell Us What You Thought Of The Marvels The Three-Hero Team-Up Between Carol Danvers, Monica Rambeau, And Kamala Khan Is Finally Here. Where\'D It Land For. Hakusho Is Here To Bring Genre Shows Or Was Just Good Television In Its Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Own Some Spirit To Your Holidays The Live-Action Version Of The Beloved','2023-11-15 20:49:51',6,7),(9,'Open Channel: Tell Us What You Thought Of The Marvels The Three-Hero Team-Up Between Carol Danvers, Monica Rambeau, And Kamala Khan Is Finally Here. Where\'D It Land For. Hakusho Is Here To Bring Genre Shows Or Was Just Good Television In Its Detectives Are Here To Solve Some Ghostly Mysteries Netflix\'S Next Genre Show Own Some Spirit To Your Holidays The Live-Action Version Of The Beloved','2023-11-15 20:49:51',6,4);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_published` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_edited` date DEFAULT NULL,
  `number_replies` int NOT NULL DEFAULT '0',
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Rebel MoonS New Trailer','Promises Even More Space Opera Grandness NetflixS Geeked Week Provides Another Look At The First Half Of Zack SnyderS Introduced in September 2023, the iPhone 15 and 15 Plus are two of Apple\'s current flagship iPhones, sold alongside the iPhone 15 Pro and iPhone 15 Pro Max. The new iPhones launched in September 2023, which means now is a the best time to buy an iPhone 15 or iPhone 15 Plus.As brand-new models, the 6.1-inch iPhone 15 and 6.7-inch iPhone 15 Plus will last for many years to come and will remain part of Apple\'s flagship lineup for the next 12 months, so you can rest assured that something newer and better is not right around the corner.The iPhone 15 and 15 Plus start at $799 and offer a good balance between functionality, longevity, and price, but if cost is the major factor for you, Apple also offers the $429 iPhone SE with older technology and the prior-generation iPhone 14 and iPhone 14 Plus with pricing starting at $699. The two-year-old iPhone 13 is also available starting at $599.Two-Part Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run Science Fiction Epic. ','2023-11-12 19:40:00',NULL,0,3,1),(2,'NetflixSyuyu Hakusho Is Here To Bring Some Spirit To Your Holidays','The Live-Action Version Of The Beloved Anime Yuyu Hakusho Is Comes To Netflix Introduced in September 2023, the iPhone 15 and 15 Plus are two of Apple\'s current flagship iPhones, sold alongside the iPhone 15 Pro and iPhone 15 Pro Max. The new iPhones launched in September 2023, which means now is a the best time to buy an iPhone 15 or iPhone 15 Plus. As brand-new models, the 6.1-inch iPhone 15 and 6.7-inch iPhone 15 Plus will last for many years to come and will remain part of Apple\'s flagship lineup for the next 12 months, so you can rest assured that something newer and better is not right around the corner. The iPhone 15 and 15 Plus start at $799 and offer a good balance between functionality, longevity, and price, but if cost is the major factor for you, Apple also offers the $429 iPhone SE with older technology and the prior-generation iPhone 14 and iPhone 14 Plus with pricing starting at $699. The two-year-old iPhone 13 is also available starting at $599.On December 14.','2023-11-12 19:40:00',NULL,0,7,1),(3,'Open Channel: Tell Us What You Thought Of The Marvels','The Three-Hero Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run Team-Up Between Carol Danvers, Monica Rambeau, And Kamala Khan Is Finally Here. WhereD It Land For','2023-11-12 19:40:00',NULL,0,8,2),(4,'Robert Butler, Star Trek & Batman Tv Director, Has Died At Age 95','ButlerS The DMA will have a big impact on Apple\'s platforms, and it could result in Apple making major changes to the ‌App Store‌, Messages, FaceTime, Siri, and more.Apple has claimed that sideloading will \"undermine the privacy and security protections\" that iPhone users rely on, leaving people vulnerable to malware, scams, data tracking, and other issues. Regardless of its stance, Apple must comply with the DMA or it risks fines of as much as 20 percent of its global revenue if the EU laws are violated. Work Helped Set The Tone For A Variety Of Genre Shows Or Was Just Good Television In Its Own','2023-11-12 19:40:00',NULL,0,10,3),(5,'The Dead Boy Detectives Are Here To Solve Some Ghostly Mysteries','NetflixS The man made flood that miraculously saved our heroes at the end of O Brother Where Art Thou were an actual occurrence in the 19th and 20th century — and a fairly common one at that — as river valleys across the American West were dammed up and drowned out at the altar of economic progress and electrification. Such was the case with Washington State\'s Elwha river in the 1910s. Its dam provided the economic impetus to develop the Olympic Peninsula but also blocked off nearly 40 miles of river from the open ocean, preventing native salmon species from making their annual spawning trek. However, after decades of legal wrangling by the Lower Elwha Klallam Tribe, the biggest dams on the river today are the kind made by beaversNext Genre Show Is About A Pair Of Already Dead Private Eyes Investigating The Enigmas That ArenT Quite','2023-11-12 19:40:00',NULL,0,9,1),(6,'Terminator Is Back, This Time As An Anime The Popular Sci-Fi Series','Is Doing The Time Warp To Netflix And Joining Its Ever-Growing Slate Of Adult Animation. The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After AActor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run 10-Year Run, The Titular Manga App Is Being Delisted In December','2023-11-12 19:40:01',NULL,0,10,4),(7,'Crunchyroll Will Discontinue Its Own Manga','App Next Month After he Otherwise known as sideloading, the change coming sometime in the first half of 2024 will allow customers to download apps without needing to use the App Store, which will mean developers won\'t need to pay Apple\'s 15 to 30 percent fees. Writing in the latest subscriber edition of his Power On newsletter, Gurman said Apple will introduce a \"highly controlled system\" that lets EU users install apps hosted elsewhere. Apple also will reportedly alter Messages and payment apps as part of the changes, likely via a localized iOS 17 update.Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted A 10-Year Run, The Titular Manga App Is Being Delisted In December, With Seemingly Nothing To Try And Take Its','2023-11-12 19:40:01',NULL,0,11,4),(8,'James Gunn Is Keeping Superman','App Next Month After A 10-Y-Year Run, The Titular Manga App Next Month After A 10-Y-Year Run, The Titular Manga App Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run, The Titular Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run, The Titular Manga App Is Being Delisted In December, With Titular Man Take Its','2023-11-12 19:40:01',NULL,0,12,4),(9,'Coyote Vs. AcmeS Cancellation Has Broken','Its CrewS Heart ItS The Third Movie To Be Shelved By Warner Bros. Discovery For Tax Write-Offs, And ItS Going Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular MangaOver About As Well','2023-11-12 19:40:01',NULL,0,10,6),(10,'Blue Beetle Suits Up On Max Next Week','Jaime Reyes Theatrical n this week\'s Hitting the Books selection, Eat, Poop, Die: How Animals Make Our World, University of Vermont conservation biologist Joe Roman recounts how quickly nature can recover when a 108-foot tall migration barrier is removed from the local ecosystem. This excerpt discusses the naturalists and biologists who strive to understand how nutrients flow through the Pacific Northwest\'s food web, and the myriad ways it\'s impacted by migratory salmon. The book as a whole takes a fascinating look at how the most basic of biological functions (yup, poopin!) of even just a few species can potentially impact life in every corner of the planet.Debut Finally Hits The Streaming Service It Was Originally Meant For.','2023-11-12 19:40:01',NULL,0,12,6),(11,'The 10 Saddest Robots Ever Built Lonely Mars Rovers','Thankless Twitter Bots, Abused Delivery Machines: Robots DonT Have Feelings, But These Are HistoryS Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular MangaSaddest Examples.','2023-11-12 19:40:01',NULL,0,16,1),(12,'Tried On Steve Jobs’ Turtle Neck','This Week Well, Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular MangaTitular MangaNot Actually. But The Openai Ceo Had His Break Out Tech-Visionary Moment At The StartupS Inaugural Dev Day…','2023-11-12 19:40:01',NULL,0,16,2),(13,'Sag-AftraS Board Approves Tentative Agreement','With The Amptp Sag-Aftra President Fran Drescher And Others Held A Press Conference To Update On The Strike Deal Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga It Will Next Go','2023-11-12 19:40:01',NULL,0,13,2),(14,'David Harbour Teases His Frankenstein For DcS Creature Commandos','The Stranger Things Actor Talked Working The Titular Manga App Is Being Delisted In December, Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year RunAfter A 10-Year Run With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run, The Titular Manga App Is Being Delisted In December With James Gunn While On The Red Carpet For The Boxlunch Holiday Gala.','2023-11-12 19:40:01',NULL,0,12,7),(15,'Stop Letting Your Babies Play With Dog Food','At Least Seven Cases Of Salmonella Caused By Babies Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga Interacting With Dog Food Have Been Reported. The Outbreak Is Likely Far Larger, Leading To A Recall.','2023-11-12 19:40:01',NULL,0,14,7),(16,'After Iss Retires','European Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular MangaAstronauts Might Hop On AirbusS Commercial Space Station The European Space Agency Is Looking To The Starlab Station For Its Orbital Needs.','2023-11-12 19:40:01',NULL,0,15,7),(17,'Here Are The Top Ai Stories You Missed This Week','It Was The National Toy Hall Of Fame Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular By the 1980s, there was growing concern about the effect of the Elwha on native salmon. Populations had declined by 95 per cent, devastating local wildlife and Indigenous communities. River salmon are essential to the culture and economy of the Lower Elwha Klallam Tribe. In 1986, the tribe filed a motion through the Federal Energy Regulatory Commission to stop the relicensing of the Elwha Dam and the Glines Canyon Dam, an upstream impoundment that was even taller than the Elwha. By blocking salmon migration, the dams violated the 1855 Treaty of Point No Point, in which the Klallam ceded a vast amount of the Olympic Peninsula on the stipulation that they and all their descendants would have “the right of taking fish at usual and accustomed grounds.” The tribe partnered with environmental groups, including the Sierra Club and the Seattle Audubon Society, to pressure local and federal officials to remove the dams. In 1992, Congress passed the Elwha River Ecosystem and Fisheries Restoration Act, which authorized the dismantling of the Elwha and Glines Canyon Dams. App Is Being A Big Week For Sam Altman And Elon Musk Launched His Chatgpt Competitor.','2023-11-12 19:40:01',NULL,0,16,2),(18,'The Witcher Is Returning To Animation','And Bringing A New-Old Voice With It Doug Cockle, Famous For Playing Geralt Of Rivia In Cd Projekt RedS Witcher Video Games, Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run Will Voice The Character In A New Netflix Film. Month After A 10-Y-Year Run, The Titular Manga App Next Month After A 10-Y-Year Run, The Titular Manga App Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run, The Titular Manga App Is Being','2023-11-12 19:40:02',NULL,0,17,2),(19,'Nerf, Cabbage Patch Kids Inducted Into The National Toy Hall Of Fame','Nerf Secured Its Rightful Place In History As Actor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After A 10-Year Run One Of The Greatest Toys Of All Time. A New-Old Voice With It Doug Cockle, Famous For Playing Geralt Of Rivia In Cd Projekt RedS Witcher Video Games, Will Voice The Character In A New Netflix Film.','2023-11-12 19:40:02',NULL,0,16,5),(20,'ORM - The big theme','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','2023-11-16 02:19:25',NULL,0,3,4);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reply` varchar(255) NOT NULL,
  `date_published` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
INSERT INTO `replies` VALUES (1,'Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga App Is Being Delisted After AActor Talked Working The Titular Manga App Is Being Delisted In December, With Titular Man Take Its Is Being Delisted Titular Manga A','2023-11-16 01:59:59',3,4);
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('GJKapmVq1Gs2tQWqfz5wQmZBMgJ3uze_','2023-11-16 02:55:31','{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-11-16T02:54:28.223Z\",\"httpOnly\":true,\"path\":\"/\"}}','2023-11-16 01:54:28','2023-11-16 01:55:31'),('TnDYCrBtx8vfMfnxinz8LPjdwN9JnqBs','2023-11-16 03:19:25','{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-11-16T02:52:16.387Z\",\"httpOnly\":true,\"path\":\"/\"},\"user_id\":4,\"user_name\":\"Gustavo Miller\",\"logged_in\":true}','2023-11-16 01:51:54','2023-11-16 02:19:25');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `email` varchar(255) NOT NULL,
  `date_registered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Kevin Miller',1,1,'Kevin.Miller@hotmail.com','2023-11-16 01:49:50','$2b$10$6DVi0CCB4tE0bVn4Zds/u.mN64w41k0jL3VbvAYqM7qLjMjxH7I32'),(2,'Christina Miller',1,1,'Christina.Miller@hotmail.com','2023-11-16 01:49:50','$2b$10$hrxO11pkd2MXDp2Ji5foAOYC68j1cZ08YjqaWpXLR0uRboNwqiJ4m'),(3,'Guest User',1,1,'guest@hotmail.com','2023-11-16 01:49:50','$2b$10$Zy3r8KsmDh9vpqN1okwVy.ujjJL7kWoFWiwOut3v7bIpqMVExs71S'),(4,'Gustavo Miller',1,1,'gustavo.miller@miller-hs.com','2023-11-16 01:49:50','$2b$10$kVKMQw0SY3e.FFXkFkk89eYOJZxGwHZE/bANGBOpOD0EeCgGaVb5W'),(5,'Felipe Miller',1,1,'Felipe.Miller@hotmail.com','2023-11-16 01:49:50','$2b$10$z13yQcBjt8nXiTxL4OnrP.DalrgB.RUOiVgSgbZbaTyRUw0c19qw6'),(6,'Camelia Miller',1,1,'Camelia.Miller@hotmail.com','2023-11-16 01:49:50','$2b$10$LS2QVEs3kL7sphtc1LKMKetsr4g7LYeuQLeK6DfWwv1kWMqC3znzC'),(7,'Sebastian Echegoyen',1,1,'Sebastian.Echegoyen@hotmail.com','2023-11-16 01:49:50','$2b$10$sG6jBH3.yKGFcgw/uU2CxuCG7xmee9OX5RUnseRCgT/2ZC81cvxqS');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15 21:48:10
