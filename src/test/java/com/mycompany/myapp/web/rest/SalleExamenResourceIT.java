package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.SalleExamen;
import com.mycompany.myapp.repository.SalleExamenRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SalleExamenResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SalleExamenResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Long DEFAULT_CAPACITE = 1L;
    private static final Long UPDATED_CAPACITE = 2L;

    private static final Boolean DEFAULT_DISPONIBILITE = false;
    private static final Boolean UPDATED_DISPONIBILITE = true;

    private static final String DEFAULT_LOCALISATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCALISATION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/salle-examen";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SalleExamenRepository salleExamenRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSalleExamenMockMvc;

    private SalleExamen salleExamen;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalleExamen createEntity(EntityManager em) {
        SalleExamen salleExamen = new SalleExamen()
            .nom(DEFAULT_NOM)
            .capacite(DEFAULT_CAPACITE)
            .disponibilite(DEFAULT_DISPONIBILITE)
            .localisation(DEFAULT_LOCALISATION);
        return salleExamen;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalleExamen createUpdatedEntity(EntityManager em) {
        SalleExamen salleExamen = new SalleExamen()
            .nom(UPDATED_NOM)
            .capacite(UPDATED_CAPACITE)
            .disponibilite(UPDATED_DISPONIBILITE)
            .localisation(UPDATED_LOCALISATION);
        return salleExamen;
    }

    @BeforeEach
    public void initTest() {
        salleExamen = createEntity(em);
    }

    @Test
    @Transactional
    void createSalleExamen() throws Exception {
        int databaseSizeBeforeCreate = salleExamenRepository.findAll().size();
        // Create the SalleExamen
        restSalleExamenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(salleExamen)))
            .andExpect(status().isCreated());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeCreate + 1);
        SalleExamen testSalleExamen = salleExamenList.get(salleExamenList.size() - 1);
        assertThat(testSalleExamen.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testSalleExamen.getCapacite()).isEqualTo(DEFAULT_CAPACITE);
        assertThat(testSalleExamen.getDisponibilite()).isEqualTo(DEFAULT_DISPONIBILITE);
        assertThat(testSalleExamen.getLocalisation()).isEqualTo(DEFAULT_LOCALISATION);
    }

    @Test
    @Transactional
    void createSalleExamenWithExistingId() throws Exception {
        // Create the SalleExamen with an existing ID
        salleExamen.setId(1L);

        int databaseSizeBeforeCreate = salleExamenRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalleExamenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(salleExamen)))
            .andExpect(status().isBadRequest());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSalleExamen() throws Exception {
        // Initialize the database
        salleExamenRepository.saveAndFlush(salleExamen);

        // Get all the salleExamenList
        restSalleExamenMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salleExamen.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].capacite").value(hasItem(DEFAULT_CAPACITE.intValue())))
            .andExpect(jsonPath("$.[*].disponibilite").value(hasItem(DEFAULT_DISPONIBILITE.booleanValue())))
            .andExpect(jsonPath("$.[*].localisation").value(hasItem(DEFAULT_LOCALISATION)));
    }

    @Test
    @Transactional
    void getSalleExamen() throws Exception {
        // Initialize the database
        salleExamenRepository.saveAndFlush(salleExamen);

        // Get the salleExamen
        restSalleExamenMockMvc
            .perform(get(ENTITY_API_URL_ID, salleExamen.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(salleExamen.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.capacite").value(DEFAULT_CAPACITE.intValue()))
            .andExpect(jsonPath("$.disponibilite").value(DEFAULT_DISPONIBILITE.booleanValue()))
            .andExpect(jsonPath("$.localisation").value(DEFAULT_LOCALISATION));
    }

    @Test
    @Transactional
    void getNonExistingSalleExamen() throws Exception {
        // Get the salleExamen
        restSalleExamenMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSalleExamen() throws Exception {
        // Initialize the database
        salleExamenRepository.saveAndFlush(salleExamen);

        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();

        // Update the salleExamen
        SalleExamen updatedSalleExamen = salleExamenRepository.findById(salleExamen.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedSalleExamen are not directly saved in db
        em.detach(updatedSalleExamen);
        updatedSalleExamen
            .nom(UPDATED_NOM)
            .capacite(UPDATED_CAPACITE)
            .disponibilite(UPDATED_DISPONIBILITE)
            .localisation(UPDATED_LOCALISATION);

        restSalleExamenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSalleExamen.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSalleExamen))
            )
            .andExpect(status().isOk());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
        SalleExamen testSalleExamen = salleExamenList.get(salleExamenList.size() - 1);
        assertThat(testSalleExamen.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSalleExamen.getCapacite()).isEqualTo(UPDATED_CAPACITE);
        assertThat(testSalleExamen.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
        assertThat(testSalleExamen.getLocalisation()).isEqualTo(UPDATED_LOCALISATION);
    }

    @Test
    @Transactional
    void putNonExistingSalleExamen() throws Exception {
        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();
        salleExamen.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalleExamenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, salleExamen.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(salleExamen))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSalleExamen() throws Exception {
        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();
        salleExamen.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleExamenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(salleExamen))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSalleExamen() throws Exception {
        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();
        salleExamen.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleExamenMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(salleExamen)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSalleExamenWithPatch() throws Exception {
        // Initialize the database
        salleExamenRepository.saveAndFlush(salleExamen);

        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();

        // Update the salleExamen using partial update
        SalleExamen partialUpdatedSalleExamen = new SalleExamen();
        partialUpdatedSalleExamen.setId(salleExamen.getId());

        partialUpdatedSalleExamen
            .nom(UPDATED_NOM)
            .capacite(UPDATED_CAPACITE)
            .disponibilite(UPDATED_DISPONIBILITE)
            .localisation(UPDATED_LOCALISATION);

        restSalleExamenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSalleExamen.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSalleExamen))
            )
            .andExpect(status().isOk());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
        SalleExamen testSalleExamen = salleExamenList.get(salleExamenList.size() - 1);
        assertThat(testSalleExamen.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSalleExamen.getCapacite()).isEqualTo(UPDATED_CAPACITE);
        assertThat(testSalleExamen.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
        assertThat(testSalleExamen.getLocalisation()).isEqualTo(UPDATED_LOCALISATION);
    }

    @Test
    @Transactional
    void fullUpdateSalleExamenWithPatch() throws Exception {
        // Initialize the database
        salleExamenRepository.saveAndFlush(salleExamen);

        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();

        // Update the salleExamen using partial update
        SalleExamen partialUpdatedSalleExamen = new SalleExamen();
        partialUpdatedSalleExamen.setId(salleExamen.getId());

        partialUpdatedSalleExamen
            .nom(UPDATED_NOM)
            .capacite(UPDATED_CAPACITE)
            .disponibilite(UPDATED_DISPONIBILITE)
            .localisation(UPDATED_LOCALISATION);

        restSalleExamenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSalleExamen.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSalleExamen))
            )
            .andExpect(status().isOk());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
        SalleExamen testSalleExamen = salleExamenList.get(salleExamenList.size() - 1);
        assertThat(testSalleExamen.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSalleExamen.getCapacite()).isEqualTo(UPDATED_CAPACITE);
        assertThat(testSalleExamen.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
        assertThat(testSalleExamen.getLocalisation()).isEqualTo(UPDATED_LOCALISATION);
    }

    @Test
    @Transactional
    void patchNonExistingSalleExamen() throws Exception {
        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();
        salleExamen.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalleExamenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, salleExamen.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(salleExamen))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSalleExamen() throws Exception {
        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();
        salleExamen.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleExamenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(salleExamen))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSalleExamen() throws Exception {
        int databaseSizeBeforeUpdate = salleExamenRepository.findAll().size();
        salleExamen.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleExamenMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(salleExamen))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SalleExamen in the database
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSalleExamen() throws Exception {
        // Initialize the database
        salleExamenRepository.saveAndFlush(salleExamen);

        int databaseSizeBeforeDelete = salleExamenRepository.findAll().size();

        // Delete the salleExamen
        restSalleExamenMockMvc
            .perform(delete(ENTITY_API_URL_ID, salleExamen.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SalleExamen> salleExamenList = salleExamenRepository.findAll();
        assertThat(salleExamenList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
