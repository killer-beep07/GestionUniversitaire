package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Examen;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class ExamenRepositoryWithBagRelationshipsImpl implements ExamenRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Examen> fetchBagRelationships(Optional<Examen> examen) {
        return examen.map(this::fetchSalleExamen);
    }

    @Override
    public Page<Examen> fetchBagRelationships(Page<Examen> examen) {
        return new PageImpl<>(fetchBagRelationships(examen.getContent()), examen.getPageable(), examen.getTotalElements());
    }

    @Override
    public List<Examen> fetchBagRelationships(List<Examen> examen) {
        return Optional.of(examen).map(this::fetchSalleExamen).orElse(Collections.emptyList());
    }

    Examen fetchSalleExamen(Examen result) {
        return entityManager
            .createQuery("select examen from Examen examen left join fetch examen.salleExamen where examen.id = :id", Examen.class)
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Examen> fetchSalleExamen(List<Examen> examen) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, examen.size()).forEach(index -> order.put(examen.get(index).getId(), index));
        List<Examen> result = entityManager
            .createQuery("select examen from Examen examen left join fetch examen.salleExamen where examen in :examen", Examen.class)
            .setParameter("examen", examen)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
