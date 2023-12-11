package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ExamenTestSamples.*;
import static com.mycompany.myapp.domain.FiliereTestSamples.*;
import static com.mycompany.myapp.domain.GroupeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class GroupeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Groupe.class);
        Groupe groupe1 = getGroupeSample1();
        Groupe groupe2 = new Groupe();
        assertThat(groupe1).isNotEqualTo(groupe2);

        groupe2.setId(groupe1.getId());
        assertThat(groupe1).isEqualTo(groupe2);

        groupe2 = getGroupeSample2();
        assertThat(groupe1).isNotEqualTo(groupe2);
    }

    @Test
    void examenTest() throws Exception {
        Groupe groupe = getGroupeRandomSampleGenerator();
        Examen examenBack = getExamenRandomSampleGenerator();

        groupe.addExamen(examenBack);
        assertThat(groupe.getExamen()).containsOnly(examenBack);

        groupe.removeExamen(examenBack);
        assertThat(groupe.getExamen()).doesNotContain(examenBack);

        groupe.examen(new HashSet<>(Set.of(examenBack)));
        assertThat(groupe.getExamen()).containsOnly(examenBack);

        groupe.setExamen(new HashSet<>());
        assertThat(groupe.getExamen()).doesNotContain(examenBack);
    }

    @Test
    void filiereTest() throws Exception {
        Groupe groupe = getGroupeRandomSampleGenerator();
        Filiere filiereBack = getFiliereRandomSampleGenerator();

        groupe.setFiliere(filiereBack);
        assertThat(groupe.getFiliere()).isEqualTo(filiereBack);

        groupe.filiere(null);
        assertThat(groupe.getFiliere()).isNull();
    }
}
