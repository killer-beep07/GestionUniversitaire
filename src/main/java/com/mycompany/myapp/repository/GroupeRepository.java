package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Groupe;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Groupe entity.
 *
 * When extending this class, extend GroupeRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface GroupeRepository extends GroupeRepositoryWithBagRelationships, JpaRepository<Groupe, Long> {
    default Optional<Groupe> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Groupe> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Groupe> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    @Query("SELECT g.niveau.nom FROM Groupe g WHERE g.id = :groupeId")
    String findNiveauNomByGroupeId(@Param("groupeId") Long groupeId);

    @Query("SELECT g.filiere.nom FROM Groupe g WHERE g.id = :groupeId")
    String findFiliereNomByGroupeId(@Param("groupeId") Long groupeId);
}
