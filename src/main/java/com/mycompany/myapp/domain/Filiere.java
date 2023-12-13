package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Filiere.
 */
@Entity
@Table(name = "filiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Filiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "filiere")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "niveau", "examen", "filiere" }, allowSetters = true)
    private Set<Groupe> groupes = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "filieres")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "filieres" }, allowSetters = true)
    private Set<Niveau> niveaus = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Filiere id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Filiere nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Groupe> getGroupes() {
        return this.groupes;
    }

    public void setGroupes(Set<Groupe> groupes) {
        if (this.groupes != null) {
            this.groupes.forEach(i -> i.setFiliere(null));
        }
        if (groupes != null) {
            groupes.forEach(i -> i.setFiliere(this));
        }
        this.groupes = groupes;
    }

    public Filiere groupes(Set<Groupe> groupes) {
        this.setGroupes(groupes);
        return this;
    }

    public Filiere addGroupe(Groupe groupe) {
        this.groupes.add(groupe);
        groupe.setFiliere(this);
        return this;
    }

    public Filiere removeGroupe(Groupe groupe) {
        this.groupes.remove(groupe);
        groupe.setFiliere(null);
        return this;
    }

    public Set<Niveau> getNiveaus() {
        return this.niveaus;
    }

    public void setNiveaus(Set<Niveau> niveaus) {
        if (this.niveaus != null) {
            this.niveaus.forEach(i -> i.removeFiliere(this));
        }
        if (niveaus != null) {
            niveaus.forEach(i -> i.addFiliere(this));
        }
        this.niveaus = niveaus;
    }

    public Filiere niveaus(Set<Niveau> niveaus) {
        this.setNiveaus(niveaus);
        return this;
    }

    public Filiere addNiveau(Niveau niveau) {
        this.niveaus.add(niveau);
        niveau.getFilieres().add(this);
        return this;
    }

    public Filiere removeNiveau(Niveau niveau) {
        this.niveaus.remove(niveau);
        niveau.getFilieres().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Filiere)) {
            return false;
        }
        return getId() != null && getId().equals(((Filiere) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Filiere{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
