package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Etudiant;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Etudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    @Query("SELECT e.niveau.nom FROM Etudiant e WHERE e.id = :etudiantId")
    String findNiveauNomByEtudiantId(@Param("etudiantId") Long etudiantId);

    @Query("SELECT e.filiere.nom FROM Etudiant e WHERE e.id = :etudiantId")
    String findFiliereNomByEtudiantId(@Param("etudiantId") Long etudiantId);

    @Query("SELECT e.groupe.nom FROM Etudiant e WHERE e.id = :etudiantId")
    String findGroupeNomByEtudiantId(@Param("etudiantId") Long etudiantId);

    @Query("SELECT f.nom FROM Filiere f")
    List<String> findAllFiliereNoms();

    @Query("SELECT n.nom FROM Niveau n")
    List<String> findAllNiveauNoms();

    @Query("SELECT DISTINCT e.groupe.nom FROM Etudiant e WHERE e.groupe IS NOT NULL")
    List<String> findAllGroupeNoms();
}
