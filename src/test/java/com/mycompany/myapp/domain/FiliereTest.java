package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.FiliereTestSamples.*;
import static com.mycompany.myapp.domain.GroupeTestSamples.*;
import static com.mycompany.myapp.domain.NiveauTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class FiliereTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Filiere.class);
        Filiere filiere1 = getFiliereSample1();
        Filiere filiere2 = new Filiere();
        assertThat(filiere1).isNotEqualTo(filiere2);

        filiere2.setId(filiere1.getId());
        assertThat(filiere1).isEqualTo(filiere2);

        filiere2 = getFiliereSample2();
        assertThat(filiere1).isNotEqualTo(filiere2);
    }

    @Test
    void groupeTest() throws Exception {
        Filiere filiere = getFiliereRandomSampleGenerator();
        Groupe groupeBack = getGroupeRandomSampleGenerator();

        filiere.addGroupe(groupeBack);
        assertThat(filiere.getGroupes()).containsOnly(groupeBack);
        assertThat(groupeBack.getFiliere()).isEqualTo(filiere);

        filiere.removeGroupe(groupeBack);
        assertThat(filiere.getGroupes()).doesNotContain(groupeBack);
        assertThat(groupeBack.getFiliere()).isNull();

        filiere.groupes(new HashSet<>(Set.of(groupeBack)));
        assertThat(filiere.getGroupes()).containsOnly(groupeBack);
        assertThat(groupeBack.getFiliere()).isEqualTo(filiere);

        filiere.setGroupes(new HashSet<>());
        assertThat(filiere.getGroupes()).doesNotContain(groupeBack);
        assertThat(groupeBack.getFiliere()).isNull();
    }

    @Test
    void niveauTest() throws Exception {
        Filiere filiere = getFiliereRandomSampleGenerator();
        Niveau niveauBack = getNiveauRandomSampleGenerator();

        filiere.addNiveau(niveauBack);
        assertThat(filiere.getNiveaus()).containsOnly(niveauBack);
        assertThat(niveauBack.getFilieres()).containsOnly(filiere);

        filiere.removeNiveau(niveauBack);
        assertThat(filiere.getNiveaus()).doesNotContain(niveauBack);
        assertThat(niveauBack.getFilieres()).doesNotContain(filiere);

        filiere.niveaus(new HashSet<>(Set.of(niveauBack)));
        assertThat(filiere.getNiveaus()).containsOnly(niveauBack);
        assertThat(niveauBack.getFilieres()).containsOnly(filiere);

        filiere.setNiveaus(new HashSet<>());
        assertThat(filiere.getNiveaus()).doesNotContain(niveauBack);
        assertThat(niveauBack.getFilieres()).doesNotContain(filiere);
    }
}
