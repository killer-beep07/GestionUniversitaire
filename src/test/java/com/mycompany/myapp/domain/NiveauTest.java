package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.FiliereTestSamples.*;
import static com.mycompany.myapp.domain.NiveauTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class NiveauTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Niveau.class);
        Niveau niveau1 = getNiveauSample1();
        Niveau niveau2 = new Niveau();
        assertThat(niveau1).isNotEqualTo(niveau2);

        niveau2.setId(niveau1.getId());
        assertThat(niveau1).isEqualTo(niveau2);

        niveau2 = getNiveauSample2();
        assertThat(niveau1).isNotEqualTo(niveau2);
    }

    @Test
    void filiereTest() throws Exception {
        Niveau niveau = getNiveauRandomSampleGenerator();
        Filiere filiereBack = getFiliereRandomSampleGenerator();

        niveau.addFiliere(filiereBack);
        assertThat(niveau.getFilieres()).containsOnly(filiereBack);

        niveau.removeFiliere(filiereBack);
        assertThat(niveau.getFilieres()).doesNotContain(filiereBack);

        niveau.filieres(new HashSet<>(Set.of(filiereBack)));
        assertThat(niveau.getFilieres()).containsOnly(filiereBack);

        niveau.setFilieres(new HashSet<>());
        assertThat(niveau.getFilieres()).doesNotContain(filiereBack);
    }
}
