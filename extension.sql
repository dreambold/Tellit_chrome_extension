/*
SQLyog Enterprise Trial - MySQL GUI v7.11 
MySQL - 5.5.5-10.4.6-MariaDB : Database - extension
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`extension` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;

USE `extension`;

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
  `url` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
  `comment` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `upvote` int(5) NOT NULL DEFAULT 0,
  `downvote` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `comments` */

insert  into `comments`(`id`,`username`,`email`,`url`,`comment`,`reg_date`,`upvote`,`downvote`) values (1,'Rambo','Kelo@gmail.com','http://crpyto.keydevsdemo.com/','THIS IS MY FIRST SITE','2019-10-11 14:32:50',1,1),(2,'JACK','KL@KIELP','http://crpyto.keydevsdemo.com/','I LOVE THIS SITE!','2019-10-11 14:56:23',5,0),(3,'asdf','john@example.com','http://crpyto.keydevsdemo.com/','asdf','2019-10-11 15:03:19',2,0),(4,'dsfasdfasd','john@example.com','http://crpyto.keydevsdemo.com/','â¤ï¸ðŸ˜‚ðŸ˜˜','2019-10-11 15:04:04',2,0),(5,'dsfsdfsdf','john@example.com','http://crpyto.keydevsdemo.com/','ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd','2019-10-11 15:04:30',0,0),(6,'Noikeomany','john@example.com','http://crpyto.keydevsdemo.com/','asdfasdfasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd','2019-10-11 15:19:00',1,0),(7,'dsaf','john@example.com','http://crpyto.keydevsdemo.com/',':)','2019-10-11 15:19:09',0,0),(8,'Noikeomany','john@example.com','http://crpyto.keydevsdemo.com/','dsafsdaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff','2019-10-11 15:31:12',0,0),(9,'Noikeomany','john@example.com','http://crpyto.keydevsdemo.com/','ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff','2019-10-11 15:34:06',0,0),(10,'Noikeomany','john@example.com','http://crpyto.keydevsdemo.com/','â¤ï¸ðŸ˜ðŸ˜ŠðŸ‘','2019-10-11 15:37:17',0,0),(11,'rtyurtyu','john@example.com','http://crpyto.keydevsdemo.com/','tyurftyu','2019-10-11 23:19:02',1,0),(12,'rtyurtyurtyurtyu','john@example.com','http://crpyto.keydevsdemo.com/','tyurftyurtyurtyu','2019-10-11 15:37:51',0,0),(13,'dsfdsfdsfdsf','john@example.com','http://crpyto.keydevsdemo.com/','dfdefdsfðŸ¯ðŸ´','2019-10-11 15:45:36',0,0),(14,'sdfsdfsd','john@example.com','http://crpyto.keydevsdemo.com/','dfsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff','2019-10-11 16:29:34',0,0),(15,'dsfsdfsdf','john@example.com','http://crpyto.keydevsdemo.com/','dsfsdfffffffffffffffffffffffffffff','2019-10-11 16:33:27',0,0),(16,'dfgfdsgsdfg','john@example.com','http://crpyto.keydevsdemo.com/','fdgdsfgsdf','2019-10-11 16:33:52',0,0),(17,'asdf','john@example.com','http://crpyto.keydevsdemo.com/','adsf','2019-10-11 16:34:23',0,0),(18,'asdf','john@example.com','http://crpyto.keydevsdemo.com/','adsf','2019-10-11 16:34:24',0,0),(19,'asdf','john@example.com','http://crpyto.keydevsdemo.com/','asdf','2019-10-11 20:29:23',3,0),(20,'asdf','john@example.com','http://crpyto.keydevsdemo.com/','asdf','2019-10-11 16:36:32',0,0),(21,'aa','john@example.com','http://crpyto.keydevsdemo.com/','aa','2019-10-11 19:43:48',2,0),(22,'sdfsdf','john@example.com','https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_set','xcfvdfds','2019-10-11 16:52:10',0,0),(23,'sdfdsfdsf','john@example.com','https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_set','dfdsf','2019-10-11 16:52:25',0,0),(24,'ffddss','john@example.com','https://www.w3schools.com/jquery/html_html.asp','ddssd','2019-10-11 16:56:48',0,0),(25,'sssdd','john@example.com','https://www.w3schools.com/jquery/html_html.asp','sssddfff','2019-10-11 16:57:04',0,0),(26,'dsfsdfsdf','john@example.com','https://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript','dfdfds','2019-10-11 16:59:20',0,0),(27,'sdfsdf','john@example.com','https://stackoverflow.com/questions/39463134/how-to-store-emoji-character-in-mysql-database','fdsfsdf','2019-10-11 17:01:08',0,0),(28,'sdfsdfsd','john@example.com','https://www.google.com/search?q=dsfdsfdsf&rlz=1C1CHBD_enUS869US869&oq=dsfdsf&aqs=chrome.1.69i57j0l5.1446j0j7&sourceid=chrome&ie=UTF-8','dfsdf','2019-10-11 17:10:59',0,0),(29,'sdfsdfsdf','john@example.com','https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_set','sdsdsf','2019-10-11 17:11:19',0,0),(30,'Micky','john@example.com','chrome://extensions/','Hello boys','2019-10-11 20:10:27',0,0),(31,'Noikeomany','john@example.com','chrome://extensions/','â¤ï¸Â I like this massage!','2019-10-11 20:10:57',0,0),(32,'Kelin','john@example.com','https://bugs.chromium.org/p/chromium/issues/detail?id=428044','Hello everyone! I like this site!â¤ï¸','2019-10-11 20:33:09',0,0),(33,'noikeo','john@example.com','https://stackoverflow.com/questions/30520858/dynamically-adjust-html-text-input-width-to-content/30520997','â¤ï¸ðŸ˜‚ðŸ˜˜ðŸ˜ðŸ˜ŠðŸ˜„ðŸ˜”â˜ºï¸ðŸ‘ðŸ˜â¤ï¸ðŸ™ˆðŸ˜‰ðŸ˜ðŸ˜žðŸ˜…ðŸ˜‹ðŸ˜€ðŸ˜ŒðŸ™ŠðŸ˜š','2019-10-11 20:49:24',0,0),(34,'Noikeomany','john@example.com','https://www.google.com/search?q=how+to+resize+and+move+a+mouse+move+and+mouse+down&rlz=1C1CHBD_enUS869US869&oq=how+to+re&aqs=chrome.0.69i59j69i57j0l3j69i60.2406j0j7&sourceid=chrome&ie=UTF-8','Hello guys!Â ðŸ˜ž','2019-10-12 06:55:04',1,0),(35,'fsdfsdfdsfdsf','john@example.com','http://crpyto.keydevsdemo.com/','Hello worldâ¤ï¸ðŸ˜‚ðŸ‘','2019-10-12 13:05:15',0,0),(36,'sdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','john@example.com','http://crpyto.keydevsdemo.com/','asdasdsadðŸ˜•','2019-10-13 07:12:53',0,0),(37,'thi is dsaf','john@example.com','http://crpyto.keydevsdemo.com/','mjsadfasdfsdafðŸ’‹','2019-10-13 07:16:24',0,0),(38,'sdfsdfsdf','john@example.com','http://crpyto.keydevsdemo.com/','dsssdfsdf','2019-10-13 07:16:33',0,0),(39,'sdafsadsdaf','john@example.com','http://crpyto.keydevsdemo.com/','dsafsdaf','2019-10-13 07:18:07',0,0),(40,'sdfdsfdsfdsf','john@example.com','http://crpyto.keydevsdemo.com/','sdfdsfdsf','2019-10-13 07:18:12',0,0),(41,'sdfsdfsdfsdf','john@example.com','http://crpyto.keydevsdemo.com/','sdfsdfsdf','2019-10-13 07:18:18',0,0);

DROP TABLE IF EXISTS `upvotes`;

CREATE TABLE `upvotes` (
 `id` INT NOT NULL AUTO_INCREMENT ,
 `name` TEXT NULL DEFAULT NULL ,  
 `comment_id` INT(11) NOT NULL  ,    
 PRIMARY KEY  (`id`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `downvotes`;

CREATE TABLE `downvotes` (
 `id` INT NOT NULL AUTO_INCREMENT ,  
 `name` TEXT NULL DEFAULT NULL ,  
 `comment_id` INT(11) NOT NULL ,    
 PRIMARY KEY  (`id`)
) ENGINE = InnoDB;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
