package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SalleExamen.
 */
@Entity
@Table(name = "salle_examen")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SalleExamen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "capacite")
    private Long capacite;

    @Column(name = "disponibilite")
    private Boolean disponibilite;

    @Column(name = "localisation")
    private String localisation;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "salleExamen")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "salleExamen", "groupes" }, allowSetters = true)
    private Set<Examen> examen = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SalleExamen id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public SalleExamen nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getCapacite() {
        return this.capacite;
    }

    public SalleExamen capacite(Long capacite) {
        this.setCapacite(capacite);
        return this;
    }

    public void setCapacite(Long capacite) {
        this.capacite = capacite;
    }

    public Boolean getDisponibilite() {
        return this.disponibilite;
    }

    public SalleExamen disponibilite(Boolean disponibilite) {
        this.setDisponibilite(disponibilite);
        return this;
    }

    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    public String getLocalisation() {
        return this.localisation;
    }

    public SalleExamen localisation(String localisation) {
        this.setLocalisation(localisation);
        return this;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public Set<Examen> getExamen() {
        return this.examen;
    }

    public void setExamen(Set<Examen> examen) {
        if (this.examen != null) {
            this.examen.forEach(i -> i.removeSalleExamen(this));
        }
        if (examen != null) {
            examen.forEach(i -> i.addSalleExamen(this));
        }
        this.examen = examen;
    }

    public SalleExamen examen(Set<Examen> examen) {
        this.setExamen(examen);
        return this;
    }

    public SalleExamen addExamen(Examen examen) {
        this.examen.add(examen);
        examen.getSalleExamen().add(this);
        return this;
    }

    public SalleExamen removeExamen(Examen examen) {
        this.examen.remove(examen);
        examen.getSalleExamen().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SalleExamen)) {
            return false;
        }
        return getId() != null && getId().equals(((SalleExamen) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SalleExamen{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", capacite=" + getCapacite() +
            ", disponibilite='" + getDisponibilite() + "'" +
            ", localisation='" + getLocalisation() + "'" +
            "}";
    }
}
