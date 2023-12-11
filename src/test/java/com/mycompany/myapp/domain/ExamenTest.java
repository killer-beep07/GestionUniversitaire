package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ExamenTestSamples.*;
import static com.mycompany.myapp.domain.GroupeTestSamples.*;
import static com.mycompany.myapp.domain.SalleExamenTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ExamenTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Examen.class);
        Examen examen1 = getExamenSample1();
        Examen examen2 = new Examen();
        assertThat(examen1).isNotEqualTo(examen2);

        examen2.setId(examen1.getId());
        assertThat(examen1).isEqualTo(examen2);

        examen2 = getExamenSample2();
        assertThat(examen1).isNotEqualTo(examen2);
    }

    @Test
    void salleExamenTest() throws Exception {
        Examen examen = getExamenRandomSampleGenerator();
        SalleExamen salleExamenBack = getSalleExamenRandomSampleGenerator();

        examen.addSalleExamen(salleExamenBack);
        assertThat(examen.getSalleExamen()).containsOnly(salleExamenBack);

        examen.removeSalleExamen(salleExamenBack);
        assertThat(examen.getSalleExamen()).doesNotContain(salleExamenBack);

        examen.salleExamen(new HashSet<>(Set.of(salleExamenBack)));
        assertThat(examen.getSalleExamen()).containsOnly(salleExamenBack);

        examen.setSalleExamen(new HashSet<>());
        assertThat(examen.getSalleExamen()).doesNotContain(salleExamenBack);
    }

    @Test
    void groupeTest() throws Exception {
        Examen examen = getExamenRandomSampleGenerator();
        Groupe groupeBack = getGroupeRandomSampleGenerator();

        examen.addGroupe(groupeBack);
        assertThat(examen.getGroupes()).containsOnly(groupeBack);
        assertThat(groupeBack.getExamen()).containsOnly(examen);

        examen.removeGroupe(groupeBack);
        assertThat(examen.getGroupes()).doesNotContain(groupeBack);
        assertThat(groupeBack.getExamen()).doesNotContain(examen);

        examen.groupes(new HashSet<>(Set.of(groupeBack)));
        assertThat(examen.getGroupes()).containsOnly(groupeBack);
        assertThat(groupeBack.getExamen()).containsOnly(examen);

        examen.setGroupes(new HashSet<>());
        assertThat(examen.getGroupes()).doesNotContain(groupeBack);
        assertThat(groupeBack.getExamen()).doesNotContain(examen);
    }
}
