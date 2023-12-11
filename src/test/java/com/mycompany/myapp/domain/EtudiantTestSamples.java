package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class EtudiantTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Etudiant getEtudiantSample1() {
        return new Etudiant()
            .id(1L)
            .nom("nom1")
            .prenom("prenom1")
            .lieuNaissance("lieuNaissance1")
            .cne("cne1")
            .cni("cni1")
            .mail("mail1")
            .gsm("gsm1");
    }

    public static Etudiant getEtudiantSample2() {
        return new Etudiant()
            .id(2L)
            .nom("nom2")
            .prenom("prenom2")
            .lieuNaissance("lieuNaissance2")
            .cne("cne2")
            .cni("cni2")
            .mail("mail2")
            .gsm("gsm2");
    }

    public static Etudiant getEtudiantRandomSampleGenerator() {
        return new Etudiant()
            .id(longCount.incrementAndGet())
            .nom(UUID.randomUUID().toString())
            .prenom(UUID.randomUUID().toString())
            .lieuNaissance(UUID.randomUUID().toString())
            .cne(UUID.randomUUID().toString())
            .cni(UUID.randomUUID().toString())
            .mail(UUID.randomUUID().toString())
            .gsm(UUID.randomUUID().toString());
    }
}
