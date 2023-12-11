package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Groupe;
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
public class GroupeRepositoryWithBagRelationshipsImpl implements GroupeRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Groupe> fetchBagRelationships(Optional<Groupe> groupe) {
        return groupe.map(this::fetchExamen);
    }

    @Override
    public Page<Groupe> fetchBagRelationships(Page<Groupe> groupes) {
        return new PageImpl<>(fetchBagRelationships(groupes.getContent()), groupes.getPageable(), groupes.getTotalElements());
    }

    @Override
    public List<Groupe> fetchBagRelationships(List<Groupe> groupes) {
        return Optional.of(groupes).map(this::fetchExamen).orElse(Collections.emptyList());
    }

    Groupe fetchExamen(Groupe result) {
        return entityManager
            .createQuery("select groupe from Groupe groupe left join fetch groupe.examen where groupe.id = :id", Groupe.class)
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Groupe> fetchExamen(List<Groupe> groupes) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, groupes.size()).forEach(index -> order.put(groupes.get(index).getId(), index));
        List<Groupe> result = entityManager
            .createQuery("select groupe from Groupe groupe left join fetch groupe.examen where groupe in :groupes", Groupe.class)
            .setParameter("groupes", groupes)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
