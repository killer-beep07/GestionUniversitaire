package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ExamenTestSamples.*;
import static com.mycompany.myapp.domain.SalleExamenTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SalleExamenTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalleExamen.class);
        SalleExamen salleExamen1 = getSalleExamenSample1();
        SalleExamen salleExamen2 = new SalleExamen();
        assertThat(salleExamen1).isNotEqualTo(salleExamen2);

        salleExamen2.setId(salleExamen1.getId());
        assertThat(salleExamen1).isEqualTo(salleExamen2);

        salleExamen2 = getSalleExamenSample2();
        assertThat(salleExamen1).isNotEqualTo(salleExamen2);
    }

    @Test
    void examenTest() throws Exception {
        SalleExamen salleExamen = getSalleExamenRandomSampleGenerator();
        Examen examenBack = getExamenRandomSampleGenerator();

        salleExamen.addExamen(examenBack);
        assertThat(salleExamen.getExamen()).containsOnly(examenBack);
        assertThat(examenBack.getSalleExamen()).containsOnly(salleExamen);

        salleExamen.removeExamen(examenBack);
        assertThat(salleExamen.getExamen()).doesNotContain(examenBack);
        assertThat(examenBack.getSalleExamen()).doesNotContain(salleExamen);

        salleExamen.examen(new HashSet<>(Set.of(examenBack)));
        assertThat(salleExamen.getExamen()).containsOnly(examenBack);
        assertThat(examenBack.getSalleExamen()).containsOnly(salleExamen);

        salleExamen.setExamen(new HashSet<>());
        assertThat(salleExamen.getExamen()).doesNotContain(examenBack);
        assertThat(examenBack.getSalleExamen()).doesNotContain(salleExamen);
    }
}
