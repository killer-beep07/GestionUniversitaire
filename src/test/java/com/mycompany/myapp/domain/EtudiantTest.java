package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.EtudiantTestSamples.*;
import static com.mycompany.myapp.domain.FiliereTestSamples.*;
import static com.mycompany.myapp.domain.GroupeTestSamples.*;
import static com.mycompany.myapp.domain.NiveauTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EtudiantTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etudiant.class);
        Etudiant etudiant1 = getEtudiantSample1();
        Etudiant etudiant2 = new Etudiant();
        assertThat(etudiant1).isNotEqualTo(etudiant2);

        etudiant2.setId(etudiant1.getId());
        assertThat(etudiant1).isEqualTo(etudiant2);

        etudiant2 = getEtudiantSample2();
        assertThat(etudiant1).isNotEqualTo(etudiant2);
    }

    @Test
    void groupeTest() throws Exception {
        Etudiant etudiant = getEtudiantRandomSampleGenerator();
        Groupe groupeBack = getGroupeRandomSampleGenerator();

        etudiant.setGroupe(groupeBack);
        assertThat(etudiant.getGroupe()).isEqualTo(groupeBack);

        etudiant.groupe(null);
        assertThat(etudiant.getGroupe()).isNull();
    }

    @Test
    void niveauTest() throws Exception {
        Etudiant etudiant = getEtudiantRandomSampleGenerator();
        Niveau niveauBack = getNiveauRandomSampleGenerator();

        etudiant.setNiveau(niveauBack);
        assertThat(etudiant.getNiveau()).isEqualTo(niveauBack);

        etudiant.niveau(null);
        assertThat(etudiant.getNiveau()).isNull();
    }

    @Test
    void filiereTest() throws Exception {
        Etudiant etudiant = getEtudiantRandomSampleGenerator();
        Filiere filiereBack = getFiliereRandomSampleGenerator();

        etudiant.setFiliere(filiereBack);
        assertThat(etudiant.getFiliere()).isEqualTo(filiereBack);

        etudiant.filiere(null);
        assertThat(etudiant.getFiliere()).isNull();
    }
}
