package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Niveau;
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
public class NiveauRepositoryWithBagRelationshipsImpl implements NiveauRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Niveau> fetchBagRelationships(Optional<Niveau> niveau) {
        return niveau.map(this::fetchFilieres);
    }

    @Override
    public Page<Niveau> fetchBagRelationships(Page<Niveau> niveaus) {
        return new PageImpl<>(fetchBagRelationships(niveaus.getContent()), niveaus.getPageable(), niveaus.getTotalElements());
    }

    @Override
    public List<Niveau> fetchBagRelationships(List<Niveau> niveaus) {
        return Optional.of(niveaus).map(this::fetchFilieres).orElse(Collections.emptyList());
    }

    Niveau fetchFilieres(Niveau result) {
        return entityManager
            .createQuery("select niveau from Niveau niveau left join fetch niveau.filieres where niveau.id = :id", Niveau.class)
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Niveau> fetchFilieres(List<Niveau> niveaus) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, niveaus.size()).forEach(index -> order.put(niveaus.get(index).getId(), index));
        List<Niveau> result = entityManager
            .createQuery("select niveau from Niveau niveau left join fetch niveau.filieres where niveau in :niveaus", Niveau.class)
            .setParameter("niveaus", niveaus)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
