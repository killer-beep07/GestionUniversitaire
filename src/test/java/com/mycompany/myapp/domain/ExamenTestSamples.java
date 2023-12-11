package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ExamenTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Examen getExamenSample1() {
        return new Examen().id(1L).nom("nom1").heureDebut("heureDebut1").heureFin("heureFin1");
    }

    public static Examen getExamenSample2() {
        return new Examen().id(2L).nom("nom2").heureDebut("heureDebut2").heureFin("heureFin2");
    }

    public static Examen getExamenRandomSampleGenerator() {
        return new Examen()
            .id(longCount.incrementAndGet())
            .nom(UUID.randomUUID().toString())
            .heureDebut(UUID.randomUUID().toString())
            .heureFin(UUID.randomUUID().toString());
    }
}
