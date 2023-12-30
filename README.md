# Système de Gestion des Étudiants et des Examens Universitaires

## Objectif

Ce projet vise à développer un système complet de gestion des étudiants et des examens universitaires. L'objectif principal est de mettre en place une application qui facilite la gestion des informations des étudiants, la planification des groupes, la gestion des filières, des niveaux d'études, des salles d'examen, et la gestion des examens.

## Fonctionnalites dadministrateur


## Technologies Utilisées

- **Spring Boot**: Cadre de développement Java pour les applications web.
- **Spring Security**: Module de sécurité pour l'authentification des utilisateurs.
- **React SJ**: Bibliothèque JavaScript pour le développement d'interfaces utilisateur réactives.
- **MySQL**: Système de gestion de base de données relationnelle.


## Structure du Projet

Le projet sera organisé de manière à tirer parti :

- 📁**`src/main/java`**: Contient les classes Java du projet, y compris les classes générées par JHipster.
- 📄**`src/main/resources`**: Ressources nécessaires au projet, telles que les fichiers de configuration.
- 🌐**`src/main/webapp`**: Emplacement principal pour les ressources web, y compris les fichiers HTML, CSS et JavaScript. Cette structure est générée par JHipster.
- 📄**`src/main/webapp/app`**: Contient l'application React générée par JHipster.
- 📄**`src/main/webapp/content`**: Fichiers statiques tels que des images ou des fichiers de style générés par JHipster.
- 🧪**`src/test`**: Répertoire pour les tests unitaires.

### Détails Supplémentaires

- **`src/main/java`**: JHipster génère une structure de projet Spring Boot standard ici, avec des packages pour les entités, les repositories, les services, les contrôleurs, etc.

- **`src/main/webapp`**: C'est le répertoire principal pour le frontend généré par JHipster. Vous trouverez ici l'application React, les composants, les styles, et les ressources nécessaires.

- **`src/main/webapp/app`**: Contient la logique de l'application React. Les fichiers principaux sont dans `src/main/webapp/app/modules` et `src/main/webapp/app/entities`.

- **`src/main/webapp/content`**: Utilisé pour stocker les fichiers statiques tels que les images ou les fichiers de style. C'est un répertoire où JHipster stocke des ressources qui ne sont pas liées à l'application React.


## Caractéristiques Clés

1. **Gestion des Étudiants**:
   - Permet aux universités de gérer les informations des étudiants, y compris leurs données personnelles, groupes d'étudiants, filières, et niveaux d'études.

2. **Planification des Groupes**:
   - Possibilité de créer et de gérer des groupes d'étudiants en fonction des filières, des niveaux, et des matières.

3. **Gestion des Filières**:
   - Module pour gérer les différentes filières universitaires, leurs programmes d'études et leurs exigences spécifiques.

4. **Gestion des Niveaux**:
   - Permet de gérer les différents niveaux d'études pour organiser les étudiants en conséquence.

5. **Programmation des Examens**:
   - Permet la planification des examens, l'assignation des salles d'examen et la gestion de l'horaire des examens en tenant compte des groupes, des filières, des niveaux, et des salles d'examen.

6. **Gestion des Salles d'Examen**:
   - Intègre un module pour gérer les informations sur les salles d'examen, y compris leur capacité, leur disponibilité, et leur localisation.




## Utilité

Un système de gestion des étudiants et des examens universitaires simplifie la planification des examens en tenant compte des groupes, des filières, des niveaux, des salles d'examen, la gestion des inscriptions, améliorant ainsi l'efficacité de l'administration universitaire. La fonction de notation peut être gérée manuellement ou en utilisant d'autres outils en dehors de ce système, selon les besoins de l'université.

## Conception
<img width="383" alt="image" src="https://github.com/killer-beep07/PF-JEE/assets/130712993/3633966d-6605-49c7-86fd-5961fd4d66b1">

## Interface administrateur 


https://github.com/killer-beep07/PF-JEE/assets/130712993/b37bcd11-647b-4bf9-890c-a388fdb6a345

## Interface etudiant



https://github.com/killer-beep07/PF-JEE/assets/130712993/eb3d0903-6bef-4880-a2a9-eea72da3964d






## Comment Exécuter le Projet

Suivez ces étapes pour exécuter le projet localement ou à l'aide de Docker.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Java](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)
- [Docker](https://www.docker.com/get-started)

### Exécution Locale

1. **Configuration de la Base de Données MySQL**:
   - Assurez-vous d'avoir une instance MySQL en cours d'exécution.
   - Modifiez les détails de connexion dans le fichier `src/main/resources/application.properties` en conséquence.

2. **Lancement de l'Application avec Maven**:
   - Ouvrez un terminal dans le répertoire du projet.
   - Exécutez la commande : `mvn spring-boot:run`.

3. **Accéder à l'Application**:
   - Ouvrez un navigateur web et accédez à [http://localhost:8080](http://localhost:8080).

### Exécution avec Docker

1. **Téléchargement de l'Image Docker depuis Docker Hub**:
   - Exécutez la commande suivante dans votre terminal : `docker pull killerbeep07/gestionuniversitaire`.

2. **Lancement du Conteneur Docker**:
   - Exécutez la commande suivante pour lancer le conteneur Docker : `docker run -p 8080:8080 killerbeep07/gestionuniversitaire`.

3. **Accéder à l'Application**:
   - Ouvrez un navigateur web et accédez à [http://localhost:8080](http://localhost:8080).


