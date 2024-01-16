# Système de Gestion des Étudiants et des Examens Universitaires

## Objectif

Ce projet vise à développer un système complet de gestion des étudiants et des examens universitaires. L'objectif principal est de mettre en place une application qui facilite la gestion des informations des étudiants, la planification des groupes, la gestion des filières, des niveaux d'études, des salles d'examen, et la gestion des examens.

## Fonctionnalités d'administrateur

## Technologies Utilisées

- **Spring Boot**: Cadre de développement Java pour les applications web.
- **Spring Security**: Module de sécurité pour l'authentification des utilisateurs.
- **React JS**: Bibliothèque JavaScript pour le développement d'interfaces utilisateur réactives.
- **MySQL**: Système de gestion de base de données relationnelle.

## Structure du Projet

Le projet sera organisé de manière à tirer parti de :

- 📁 **`src/main/java`**: Contient les classes Java du projet, y compris les classes générées par JHipster.
- 📄 **`src/main/resources`**: Ressources nécessaires au projet, telles que les fichiers de configuration.
- 🌐 **`src/main/webapp`**: Emplacement principal pour les ressources web, y compris les fichiers HTML, CSS et JavaScript. Cette structure est générée par JHipster.
- 📄 **`src/main/webapp/app`**: Contient l'application React générée par JHipster.
- 📄 **`src/main/webapp/content`**: Fichiers statiques tels que des images ou des fichiers de style générés par JHipster.
- 🧪 **`src/test`**: Répertoire pour les tests unitaires.

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
## Intégration du Calendrier React

Nous avons également mis en place un module de calendrier basé sur React pour une visualisation pratique des examens programmés. Le calendrier affiche les informations importantes sur chaque examen, telles que le nom, la date, l'heure et d'autres détails pertinents.

Pour intégrer le calendrier dans votre propre application, assurez-vous d'inclure les composants nécessaires de React Calendar et de les configurer selon vos besoins. Vous pouvez trouver le code associé dans le répertoire `src/main/webapp/app/calendar` de ce projet.

## Contribution

Nous accueillons toute contribution pour améliorer le système de gestion des étudiants et des examens. Si vous souhaitez ajouter des fonctionnalités, résoudre des problèmes ou améliorer la documentation, n'hésitez pas à créer une demande de tirage.

Merci de contribuer !

## Conception

### Diagramme de classe
![image](https://github.com/killer-beep07/PF-JEE/assets/147507670/e986fa90-7c81-4c9d-8b20-4cfeaa8a3052)




### Diagramme de cas d'utilisation
<img width="514" alt="image" src="https://github.com/killer-beep07/PF-JEE/assets/130712993/bb948d21-0607-4992-8e38-9daeb305c189">


## Interface administrateur


https://github.com/killer-beep07/GestionUniversitaire/assets/130712993/a6c30bc0-9bbd-4fd7-b9d6-5a527f6e0cfa




## Interface étudiant

[Capture d'écran de l'interface étudiant](https://github.com/killer-beep07/PF-JEE/assets/130712993/eb3d0903-6bef-4880-a2a9-eea72da3964d)

## React calendar



https://github.com/killer-beep07/GestionUniversitaire/assets/130712993/1bfd59a3-e269-4cc2-a380-58e465d422e1




## Analyse du Code avec SonarQube

L'intégration de SonarQube Cloud a été essentielle pour évaluer la qualité globale de notre code source. Les résultats de cette analyse fournissent un aperçu détaillé des différents aspects du code, soulignant à la fois ses forces et ses zones d'amélioration. Voici quelques points saillants de cette évaluation :

- **Maintenabilité du Code** : Ce score mesure la facilité avec laquelle le code peut être compris, modifié et étendu tout en préservant sa qualité. Un score élevé témoigne d'une base de code robuste et adaptable.

- **Fiabilité du Code** : Cette évaluation identifie la stabilité et la prévisibilité du code en détectant d'éventuels bugs, erreurs et vulnérabilités. Un score élevé garantit une exécution fiable du logiciel.

- **Sécurité du Code** : La sécurité du code est cruciale pour prévenir les vulnérabilités et assurer la protection des données. Un score élevé dans cette catégorie indique un code résilient face aux menaces potentielles.

![image-0AEN13C0W-transformed](https://github.com/killer-beep07/GestionUniversitaire/assets/130712993/59b30102-9875-4262-b7ec-0d98855173f6)


Ces scores ne se contentent pas d'évaluer la qualité du code, mais ils orientent également nos efforts d'amélioration continue. Les recommandations de SonarQube nous guident dans l'optimisation du code, renforçant ainsi la stabilité, la sécurité et la maintenabilité de notre système de gestion des étudiants et des examens universitaires.


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
   - Exécutez les commandes : `mvn clean install`.  Pour preparez le lancement du projet.
                              -`mvn spring-boot:run` .  Pour demarrez back-end.
                              -`npm start`. Pour demarrer front-end

3. **Accéder à l'Application**:
   - Ouvrez un navigateur web et accédez à [http://localhost:9000](http://localhost:9000).

### Exécution avec Docker

1. **Téléchargement de l'Image Docker depuis Docker Hub**:
   - Exécutez la commande suivante dans votre terminal : `docker pull killerbeep07/gestionuniversitaire`.

2. **Lancement du Conteneur Docker**:
   - Exécutez la commande suivante pour lancer le conteneur Docker : `docker run -p 8080:8080 killerbeep07/gestionuniversitaire`.

3. **Accéder à l'Application**:
   - Ouvrez un navigateur web et accédez à [http://localhost:8080](http://localhost:8080).
