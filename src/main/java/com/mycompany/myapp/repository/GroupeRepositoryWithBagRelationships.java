package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Groupe;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface GroupeRepositoryWithBagRelationships {
    Optional<Groupe> fetchBagRelationships(Optional<Groupe> groupe);

    List<Groupe> fetchBagRelationships(List<Groupe> groupes);

    Page<Groupe> fetchBagRelationships(Page<Groupe> groupes);
}
