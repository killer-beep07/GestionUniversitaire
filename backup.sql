-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: gestionuniversitaire
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `databasechangelog`
--

DROP TABLE IF EXISTS `databasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangelog`
--

LOCK TABLES `databasechangelog` WRITE;
/*!40000 ALTER TABLE `databasechangelog` DISABLE KEYS */;
INSERT INTO `databasechangelog` VALUES ('00000000000001','jhipster','config/liquibase/changelog/00000000000000_initial_schema.xml','2023-12-26 20:41:23',1,'EXECUTED','9:3d15ce8389bddb1666f01b768d03e89b','createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; addForeignKeyConstraint baseTableName=jhi_user_authority, constraintName=fk_authority_name, ...','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161209-1','jhipster','config/liquibase/changelog/20231206161209_added_entity_Etudiant.xml','2023-12-26 20:41:23',2,'EXECUTED','9:9e4cdb4e25387f599407b5128117bc86','createTable tableName=etudiant','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161309-1','jhipster','config/liquibase/changelog/20231206161309_added_entity_Niveau.xml','2023-12-26 20:41:23',3,'EXECUTED','9:a2603353b1713e2f56cc0d9506af3a80','createTable tableName=niveau','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161309-1-relations','jhipster','config/liquibase/changelog/20231206161309_added_entity_Niveau.xml','2023-12-26 20:41:23',4,'EXECUTED','9:277c268d78c3f77f022cea386928f276','createTable tableName=rel_niveau__filiere; addPrimaryKey tableName=rel_niveau__filiere','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161409-1','jhipster','config/liquibase/changelog/20231206161409_added_entity_Filiere.xml','2023-12-26 20:41:23',5,'EXECUTED','9:fec8b2049e2412c4431fba4cd50748ab','createTable tableName=filiere','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161509-1','jhipster','config/liquibase/changelog/20231206161509_added_entity_Groupe.xml','2023-12-26 20:41:23',6,'EXECUTED','9:23a123d793d6bef43edae0cd2d4ec0bd','createTable tableName=groupe','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161509-1-relations','jhipster','config/liquibase/changelog/20231206161509_added_entity_Groupe.xml','2023-12-26 20:41:24',7,'EXECUTED','9:d004d1c6e89b39de3b3e327002cdd0c3','createTable tableName=rel_groupe__examen; addPrimaryKey tableName=rel_groupe__examen','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161609-1','jhipster','config/liquibase/changelog/20231206161609_added_entity_SalleExamen.xml','2023-12-26 20:41:24',8,'EXECUTED','9:c563a9d89fe3f1a61c4f51fac4f1b1fd','createTable tableName=salle_examen','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161709-1','jhipster','config/liquibase/changelog/20231206161709_added_entity_Examen.xml','2023-12-26 20:41:24',9,'EXECUTED','9:e41045c745ce333411a69a283fc93108','createTable tableName=examen','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161709-1-relations','jhipster','config/liquibase/changelog/20231206161709_added_entity_Examen.xml','2023-12-26 20:41:24',10,'EXECUTED','9:3828d433af0bd49c28aabcbc64a75507','createTable tableName=rel_examen__salle_examen; addPrimaryKey tableName=rel_examen__salle_examen','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161209-2','jhipster','config/liquibase/changelog/20231206161209_added_entity_constraints_Etudiant.xml','2023-12-26 20:41:25',11,'EXECUTED','9:43da0ad6a5bf206cd16d094044eab6f9','addForeignKeyConstraint baseTableName=etudiant, constraintName=fk_etudiant__groupe_id, referencedTableName=groupe; addForeignKeyConstraint baseTableName=etudiant, constraintName=fk_etudiant__niveau_id, referencedTableName=niveau; addForeignKeyCons...','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161309-2','jhipster','config/liquibase/changelog/20231206161309_added_entity_constraints_Niveau.xml','2023-12-26 20:41:25',12,'EXECUTED','9:81065dc36ed18cb9964e2b85fa5fb7d3','addForeignKeyConstraint baseTableName=rel_niveau__filiere, constraintName=fk_rel_niveau__filiere__niveau_id, referencedTableName=niveau; addForeignKeyConstraint baseTableName=rel_niveau__filiere, constraintName=fk_rel_niveau__filiere__filiere_id, ...','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161509-2','jhipster','config/liquibase/changelog/20231206161509_added_entity_constraints_Groupe.xml','2023-12-26 20:41:25',13,'EXECUTED','9:7a4acbc3113ae6b7b0bc896fb0704e68','addForeignKeyConstraint baseTableName=groupe, constraintName=fk_groupe__niveau_id, referencedTableName=niveau; addForeignKeyConstraint baseTableName=rel_groupe__examen, constraintName=fk_rel_groupe__examen__groupe_id, referencedTableName=groupe; a...','',NULL,'4.24.0',NULL,NULL,'3623281157'),('20231206161709-2','jhipster','config/liquibase/changelog/20231206161709_added_entity_constraints_Examen.xml','2023-12-26 20:41:26',14,'EXECUTED','9:a3183bbec9988771930af0ec5a3d75c0','addForeignKeyConstraint baseTableName=rel_examen__salle_examen, constraintName=fk_rel_examen__salle_examen__examen_id, referencedTableName=examen; addForeignKeyConstraint baseTableName=rel_examen__salle_examen, constraintName=fk_rel_examen__salle_...','',NULL,'4.24.0',NULL,NULL,'3623281157');
/*!40000 ALTER TABLE `databasechangelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databasechangeloglock`
--

DROP TABLE IF EXISTS `databasechangeloglock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `databasechangeloglock` (
  `ID` int NOT NULL,
  `LOCKED` tinyint(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangeloglock`
--

LOCK TABLES `databasechangeloglock` WRITE;
/*!40000 ALTER TABLE `databasechangeloglock` DISABLE KEYS */;
INSERT INTO `databasechangeloglock` VALUES (1,0,NULL,NULL);
/*!40000 ALTER TABLE `databasechangeloglock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etudiant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `lieu_naissance` varchar(255) DEFAULT NULL,
  `cne` varchar(255) DEFAULT NULL,
  `cni` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `gsm` varchar(255) DEFAULT NULL,
  `groupe_id` bigint DEFAULT NULL,
  `niveau_id` bigint DEFAULT NULL,
  `filiere_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_etudiant__groupe_id` (`groupe_id`),
  KEY `fk_etudiant__niveau_id` (`niveau_id`),
  KEY `fk_etudiant__filiere_id` (`filiere_id`),
  CONSTRAINT `fk_etudiant__filiere_id` FOREIGN KEY (`filiere_id`) REFERENCES `filiere` (`id`),
  CONSTRAINT `fk_etudiant__groupe_id` FOREIGN KEY (`groupe_id`) REFERENCES `groupe` (`id`),
  CONSTRAINT `fk_etudiant__niveau_id` FOREIGN KEY (`niveau_id`) REFERENCES `niveau` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1522 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etudiant`
--

LOCK TABLES `etudiant` WRITE;
/*!40000 ALTER TABLE `etudiant` DISABLE KEYS */;
INSERT INTO `etudiant` VALUES (1500,'amine','moufid','2000-12-29','casablanca','R130797047','BE914896','aminemoufid11@gmail.com','0677005153',1501,1500,1500),(1501,'Dupont','Marie','2023-12-08','Paris','CNE123456','CNI789012','marie.dupont@gmail.com',' 0612345678',1501,1500,1500),(1503,'Martin','Jean','2000-08-14',' Lyon','CNE654321','CNI012345',' jean.martin@gmail.com','0678901234',1501,1500,1500),(1504,' El Amrani','Fatima','1990-12-23','casablanca','CNE123456','CNI789012','fatima.amrani@gmail.com','0612345678',1501,1500,1500),(1505,'Sidiqi',' Leila','1995-12-01','F├¿s','CNE456789','CNI567890','leila.sidiqi@gm.com','0634567890',1501,1500,1500),(1506,'Berrada','Youssef','1998-11-11','T├®touan','CNE135792','CNI246801','youssef.berrada@gmail.com','0654321098',1500,1500,1500),(1507,' El Khattabi','Amina','1999-12-08','Ouarzazate','CNE987654','CNI123456','amina.khattabi@gmail.com','0667890123',1500,1500,1500),(1508,'Oudrhiri','Anas','1998-02-12','Essaouira','CNE456123','CNI789012','anas.oudrhiri@gmail.com','0645678901',1500,1500,1500),(1509,'Bouzidi','Naima','1997-12-09','Tanger','CNE321654','CNI654321','naima.bouzidi@gmail.com','0678901234',1500,1500,1500),(1510,'El Moutaouakil','Reda','1992-11-05','casablanca','CNI987654','CNE789456','reda.moutaouakil@gmail.com','0634567890',1502,1501,1500),(1511,'El Fassi','Nadia','1995-08-12','casablanca','CNE543210','CNI987654','nadia.elfassi@gmail.com','0612345678',1502,1501,1500),(1512,'Bouchta','Khalid','2000-03-03','rabat','CNE876543','CNI123987','khalid.bouchta@gmail.com','0678901234',1502,1501,1500),(1513,'El Mernissi','Houda','1999-02-02','Agadir','CNE234567','CNI876543','houda.mernissi@gmail.com','0645678901',1503,1500,1501),(1514,'Zerouali','Yassin','2003-02-02','Marrakech','CNE765432','CNI234876','yassin.zerouali@gmail.com','0689012345',1503,1500,1501),(1515,'El Alaoui','Salma','2002-02-14','Tanger','CNE876543','CNI567890','salma.alaoui@gmail.com','0634567890',1504,1500,1501),(1516,'Benjelloun','Amine','0003-03-15',' Casablanca','CNE123789','CNI456789','amine.benjelloun@gmail.com','0654321098',1504,1500,1501),(1517,'Boujemaa','Ayoub',NULL,'Marrakech','CNE432109','CNI098765','ayoub.boujemaa@gmail.com','0645678901',1506,1501,1501),(1518,'El Idrissi','Leila','1998-01-02','Agadir','CNE890123','CNI345678','leila.idrissi@gmail.com','0678901234',1506,1501,1501),(1519,'Benkirane','Mohamed','2001-11-11','casablanca','CNE234567','CNI901234','mohamed.benkirane@gmail.com','0689012345',1507,1500,1502),(1520,'El Houari','In├¿s','2000-02-22','Agadir','CNE234567','CNI876543','ines.houari@gmail.com','064567890',1507,1500,1502);
/*!40000 ALTER TABLE `etudiant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examen`
--

DROP TABLE IF EXISTS `examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examen` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `heure_debut` varchar(255) DEFAULT NULL,
  `heure_fin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1510 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examen`
--

LOCK TABLES `examen` WRITE;
/*!40000 ALTER TABLE `examen` DISABLE KEYS */;
INSERT INTO `examen` VALUES (1500,'JEE','2024-01-24','15H00','16H30'),(1501,'Transmission Num├®rique','2023-12-30','10H00','12H00'),(1502,'RHD et applications QoS/IP','2024-01-29','8H00','10H00'),(1503,'Transmission Optique','2024-01-29','13H00','14H30'),(1504,'Ing├®nierie de commutation','2024-01-29','8H00','9H30'),(1505,'Programmation mobile-Examen ├®crit','2024-01-29','15H00','16H30'),(1506,'Apprentissage Artificiel ','2024-01-30','8H00','9H30'),(1507,'Syst├¿me d\'information','2024-01-28','8H00','9H30'),(1508,'Algorithmique avanc├®e et python ','2023-12-28','10H00','12H00'),(1509,'Syst├¿mes dÔÇÖexploitation & programmation sys.','2024-01-29','17H00','18H30');
/*!40000 ALTER TABLE `examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filiere`
--

DROP TABLE IF EXISTS `filiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filiere` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1504 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filiere`
--

LOCK TABLES `filiere` WRITE;
/*!40000 ALTER TABLE `filiere` DISABLE KEYS */;
INSERT INTO `filiere` VALUES (1500,'ISIC'),(1501,'2ITE'),(1502,'G2E');
/*!40000 ALTER TABLE `filiere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupe`
--

DROP TABLE IF EXISTS `groupe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `niveau_id` bigint DEFAULT NULL,
  `filiere_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_groupe__niveau_id` (`niveau_id`),
  KEY `fk_groupe__filiere_id` (`filiere_id`),
  CONSTRAINT `fk_groupe__filiere_id` FOREIGN KEY (`filiere_id`) REFERENCES `filiere` (`id`),
  CONSTRAINT `fk_groupe__niveau_id` FOREIGN KEY (`niveau_id`) REFERENCES `niveau` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1510 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupe`
--

LOCK TABLES `groupe` WRITE;
/*!40000 ALTER TABLE `groupe` DISABLE KEYS */;
INSERT INTO `groupe` VALUES (1500,'ISIC-1',1500,1500),(1501,'ISIC-2',1500,1500),(1502,'ISIC-3',1501,1500),(1503,'2ITE-1',1500,1501),(1504,'2ITE-2',1500,1501),(1505,'2ITE-3',1500,1501),(1506,'2ITE-4',1501,1501),(1507,'G2E-1',1500,1502),(1508,'G2E-2',1500,1502);
/*!40000 ALTER TABLE `groupe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_authority`
--

DROP TABLE IF EXISTS `jhi_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_authority`
--

LOCK TABLES `jhi_authority` WRITE;
/*!40000 ALTER TABLE `jhi_authority` DISABLE KEYS */;
INSERT INTO `jhi_authority` VALUES ('ROLE_ADMIN'),('ROLE_USER');
/*!40000 ALTER TABLE `jhi_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user`
--

DROP TABLE IF EXISTS `jhi_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` tinyint(1) NOT NULL,
  `lang_key` varchar(10) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_login` (`login`),
  UNIQUE KEY `ux_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1051 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user`
--

LOCK TABLES `jhi_user` WRITE;
/*!40000 ALTER TABLE `jhi_user` DISABLE KEYS */;
INSERT INTO `jhi_user` VALUES (1,'admin','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','admin@localhost','',1,'en',NULL,NULL,'system',NULL,NULL,'system',NULL),(2,'user','$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K','User','User','user@localhost','',1,'en',NULL,NULL,'system',NULL,NULL,'system',NULL);
/*!40000 ALTER TABLE `jhi_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user_authority`
--

DROP TABLE IF EXISTS `jhi_user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_user_authority` (
  `user_id` bigint NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user_authority`
--

LOCK TABLES `jhi_user_authority` WRITE;
/*!40000 ALTER TABLE `jhi_user_authority` DISABLE KEYS */;
INSERT INTO `jhi_user_authority` VALUES (1,'ROLE_ADMIN'),(1,'ROLE_USER'),(2,'ROLE_USER');
/*!40000 ALTER TABLE `jhi_user_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveau` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1503 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveau`
--

LOCK TABLES `niveau` WRITE;
/*!40000 ALTER TABLE `niveau` DISABLE KEYS */;
INSERT INTO `niveau` VALUES (1500,'ingenierie'),(1501,'Doctorat');
/*!40000 ALTER TABLE `niveau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_examen__salle_examen`
--

DROP TABLE IF EXISTS `rel_examen__salle_examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_examen__salle_examen` (
  `salle_examen_id` bigint NOT NULL,
  `examen_id` bigint NOT NULL,
  PRIMARY KEY (`examen_id`,`salle_examen_id`),
  KEY `fk_rel_examen__salle_examen__salle_examen_id` (`salle_examen_id`),
  CONSTRAINT `fk_rel_examen__salle_examen__examen_id` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`),
  CONSTRAINT `fk_rel_examen__salle_examen__salle_examen_id` FOREIGN KEY (`salle_examen_id`) REFERENCES `salle_examen` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_examen__salle_examen`
--

LOCK TABLES `rel_examen__salle_examen` WRITE;
/*!40000 ALTER TABLE `rel_examen__salle_examen` DISABLE KEYS */;
INSERT INTO `rel_examen__salle_examen` VALUES (1500,1500),(1500,1501),(1500,1502),(1500,1503),(1501,1500),(1501,1504),(1501,1505),(1501,1506),(1502,1507),(1502,1508),(1502,1509);
/*!40000 ALTER TABLE `rel_examen__salle_examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_groupe__examen`
--

DROP TABLE IF EXISTS `rel_groupe__examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_groupe__examen` (
  `examen_id` bigint NOT NULL,
  `groupe_id` bigint NOT NULL,
  PRIMARY KEY (`groupe_id`,`examen_id`),
  KEY `fk_rel_groupe__examen__examen_id` (`examen_id`),
  CONSTRAINT `fk_rel_groupe__examen__examen_id` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`),
  CONSTRAINT `fk_rel_groupe__examen__groupe_id` FOREIGN KEY (`groupe_id`) REFERENCES `groupe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_groupe__examen`
--

LOCK TABLES `rel_groupe__examen` WRITE;
/*!40000 ALTER TABLE `rel_groupe__examen` DISABLE KEYS */;
INSERT INTO `rel_groupe__examen` VALUES (1500,1501),(1501,1501),(1502,1501),(1503,1501),(1503,1507),(1504,1504),(1505,1504),(1506,1502),(1506,1504),(1508,1503),(1509,1506);
/*!40000 ALTER TABLE `rel_groupe__examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_niveau__filiere`
--

DROP TABLE IF EXISTS `rel_niveau__filiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_niveau__filiere` (
  `filiere_id` bigint NOT NULL,
  `niveau_id` bigint NOT NULL,
  PRIMARY KEY (`niveau_id`,`filiere_id`),
  KEY `fk_rel_niveau__filiere__filiere_id` (`filiere_id`),
  CONSTRAINT `fk_rel_niveau__filiere__filiere_id` FOREIGN KEY (`filiere_id`) REFERENCES `filiere` (`id`),
  CONSTRAINT `fk_rel_niveau__filiere__niveau_id` FOREIGN KEY (`niveau_id`) REFERENCES `niveau` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_niveau__filiere`
--

LOCK TABLES `rel_niveau__filiere` WRITE;
/*!40000 ALTER TABLE `rel_niveau__filiere` DISABLE KEYS */;
INSERT INTO `rel_niveau__filiere` VALUES (1500,1500),(1500,1501),(1501,1500),(1501,1501),(1502,1500);
/*!40000 ALTER TABLE `rel_niveau__filiere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salle_examen`
--

DROP TABLE IF EXISTS `salle_examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salle_examen` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `capacite` bigint DEFAULT NULL,
  `disponibilite` tinyint(1) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1505 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salle_examen`
--

LOCK TABLES `salle_examen` WRITE;
/*!40000 ALTER TABLE `salle_examen` DISABLE KEYS */;
INSERT INTO `salle_examen` VALUES (1500,'SALLE B1',30,1,'zone B'),(1501,'SALLE B2',40,1,'zone B'),(1502,'SALLE B3',30,1,'zone B'),(1503,'SALLE C1',40,1,'zone C');
/*!40000 ALTER TABLE `salle_examen` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-29 22:33:44
