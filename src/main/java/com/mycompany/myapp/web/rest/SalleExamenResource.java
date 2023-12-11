package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SalleExamen;
import com.mycompany.myapp.repository.SalleExamenRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.SalleExamen}.
 */
@RestController
@RequestMapping("/api/salle-examen")
@Transactional
public class SalleExamenResource {

    private final Logger log = LoggerFactory.getLogger(SalleExamenResource.class);

    private static final String ENTITY_NAME = "salleExamen";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SalleExamenRepository salleExamenRepository;

    public SalleExamenResource(SalleExamenRepository salleExamenRepository) {
        this.salleExamenRepository = salleExamenRepository;
    }

    /**
     * {@code POST  /salle-examen} : Create a new salleExamen.
     *
     * @param salleExamen the salleExamen to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new salleExamen, or with status {@code 400 (Bad Request)} if the salleExamen has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SalleExamen> createSalleExamen(@RequestBody SalleExamen salleExamen) throws URISyntaxException {
        log.debug("REST request to save SalleExamen : {}", salleExamen);
        if (salleExamen.getId() != null) {
            throw new BadRequestAlertException("A new salleExamen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalleExamen result = salleExamenRepository.save(salleExamen);
        return ResponseEntity
            .created(new URI("/api/salle-examen/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /salle-examen/:id} : Updates an existing salleExamen.
     *
     * @param id the id of the salleExamen to save.
     * @param salleExamen the salleExamen to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated salleExamen,
     * or with status {@code 400 (Bad Request)} if the salleExamen is not valid,
     * or with status {@code 500 (Internal Server Error)} if the salleExamen couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SalleExamen> updateSalleExamen(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SalleExamen salleExamen
    ) throws URISyntaxException {
        log.debug("REST request to update SalleExamen : {}, {}", id, salleExamen);
        if (salleExamen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, salleExamen.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!salleExamenRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SalleExamen result = salleExamenRepository.save(salleExamen);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, salleExamen.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /salle-examen/:id} : Partial updates given fields of an existing salleExamen, field will ignore if it is null
     *
     * @param id the id of the salleExamen to save.
     * @param salleExamen the salleExamen to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated salleExamen,
     * or with status {@code 400 (Bad Request)} if the salleExamen is not valid,
     * or with status {@code 404 (Not Found)} if the salleExamen is not found,
     * or with status {@code 500 (Internal Server Error)} if the salleExamen couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SalleExamen> partialUpdateSalleExamen(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SalleExamen salleExamen
    ) throws URISyntaxException {
        log.debug("REST request to partial update SalleExamen partially : {}, {}", id, salleExamen);
        if (salleExamen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, salleExamen.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!salleExamenRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SalleExamen> result = salleExamenRepository
            .findById(salleExamen.getId())
            .map(existingSalleExamen -> {
                if (salleExamen.getNom() != null) {
                    existingSalleExamen.setNom(salleExamen.getNom());
                }
                if (salleExamen.getCapacite() != null) {
                    existingSalleExamen.setCapacite(salleExamen.getCapacite());
                }
                if (salleExamen.getDisponibilite() != null) {
                    existingSalleExamen.setDisponibilite(salleExamen.getDisponibilite());
                }
                if (salleExamen.getLocalisation() != null) {
                    existingSalleExamen.setLocalisation(salleExamen.getLocalisation());
                }

                return existingSalleExamen;
            })
            .map(salleExamenRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, salleExamen.getId().toString())
        );
    }

    /**
     * {@code GET  /salle-examen} : get all the salleExamen.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of salleExamen in body.
     */
    @GetMapping("")
    public List<SalleExamen> getAllSalleExamen() {
        log.debug("REST request to get all SalleExamen");
        return salleExamenRepository.findAll();
    }

    /**
     * {@code GET  /salle-examen/:id} : get the "id" salleExamen.
     *
     * @param id the id of the salleExamen to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the salleExamen, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SalleExamen> getSalleExamen(@PathVariable Long id) {
        log.debug("REST request to get SalleExamen : {}", id);
        Optional<SalleExamen> salleExamen = salleExamenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(salleExamen);
    }

    /**
     * {@code DELETE  /salle-examen/:id} : delete the "id" salleExamen.
     *
     * @param id the id of the salleExamen to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalleExamen(@PathVariable Long id) {
        log.debug("REST request to delete SalleExamen : {}", id);
        salleExamenRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
