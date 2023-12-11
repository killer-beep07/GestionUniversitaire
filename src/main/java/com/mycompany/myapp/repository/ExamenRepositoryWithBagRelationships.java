package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Examen;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface ExamenRepositoryWithBagRelationships {
    Optional<Examen> fetchBagRelationships(Optional<Examen> examen);

    List<Examen> fetchBagRelationships(List<Examen> examen);

    Page<Examen> fetchBagRelationships(Page<Examen> examen);
}
