package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class NiveauTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Niveau getNiveauSample1() {
        return new Niveau().id(1L).nom("nom1");
    }

    public static Niveau getNiveauSample2() {
        return new Niveau().id(2L).nom("nom2");
    }

    public static Niveau getNiveauRandomSampleGenerator() {
        return new Niveau().id(longCount.incrementAndGet()).nom(UUID.randomUUID().toString());
    }
}
