package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SalleExamen;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SalleExamen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalleExamenRepository extends JpaRepository<SalleExamen, Long> {}
