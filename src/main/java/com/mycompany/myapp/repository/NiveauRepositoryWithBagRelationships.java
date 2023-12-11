package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Niveau;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface NiveauRepositoryWithBagRelationships {
    Optional<Niveau> fetchBagRelationships(Optional<Niveau> niveau);

    List<Niveau> fetchBagRelationships(List<Niveau> niveaus);

    Page<Niveau> fetchBagRelationships(Page<Niveau> niveaus);
}
