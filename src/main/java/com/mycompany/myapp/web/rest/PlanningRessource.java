package com.mycompany.myapp.web.rest;

import org.hibernate.mapping.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Secured("ROLE_USER")
public class PlanningRessource {

    // Si vous n'avez pas de méthode spécifique et que la sécurité s'applique à l'ensemble du contrôleur.
    // Vous pouvez également avoir une méthode spécifique ici si nécessaire.

    // Exemple de méthode fictive si nécessaire
    @GetMapping("/planning")
    public ResponseEntity<String> getPlanningPage() {
        // Logique de récupération de la page planning si nécessaire
        return ResponseEntity.ok("Contenu de la page planning");
    }
}
