package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SalleExamenTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static SalleExamen getSalleExamenSample1() {
        return new SalleExamen().id(1L).nom("nom1").capacite(1L).localisation("localisation1");
    }

    public static SalleExamen getSalleExamenSample2() {
        return new SalleExamen().id(2L).nom("nom2").capacite(2L).localisation("localisation2");
    }

    public static SalleExamen getSalleExamenRandomSampleGenerator() {
        return new SalleExamen()
            .id(longCount.incrementAndGet())
            .nom(UUID.randomUUID().toString())
            .capacite(longCount.incrementAndGet())
            .localisation(UUID.randomUUID().toString());
    }
}
