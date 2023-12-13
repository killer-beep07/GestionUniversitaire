package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Examen.
 */
@Entity
@Table(name = "examen")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Examen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "heure_debut")
    private String heureDebut;

    @Column(name = "heure_fin")
    private String heureFin;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_examen__salle_examen",
        joinColumns = @JoinColumn(name = "examen_id"),
        inverseJoinColumns = @JoinColumn(name = "salle_examen_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "examen" }, allowSetters = true)
    private Set<SalleExamen> salleExamen = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "examen")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "niveau", "examen", "filiere" }, allowSetters = true)
    private Set<Groupe> groupes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Examen id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Examen nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Examen date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getHeureDebut() {
        return this.heureDebut;
    }

    public Examen heureDebut(String heureDebut) {
        this.setHeureDebut(heureDebut);
        return this;
    }

    public void setHeureDebut(String heureDebut) {
        this.heureDebut = heureDebut;
    }

    public String getHeureFin() {
        return this.heureFin;
    }

    public Examen heureFin(String heureFin) {
        this.setHeureFin(heureFin);
        return this;
    }

    public void setHeureFin(String heureFin) {
        this.heureFin = heureFin;
    }

    public Set<SalleExamen> getSalleExamen() {
        return this.salleExamen;
    }

    public void setSalleExamen(Set<SalleExamen> salleExamen) {
        this.salleExamen = salleExamen;
    }

    public Examen salleExamen(Set<SalleExamen> salleExamen) {
        this.setSalleExamen(salleExamen);
        return this;
    }

    public Examen addSalleExamen(SalleExamen salleExamen) {
        this.salleExamen.add(salleExamen);
        return this;
    }

    public Examen removeSalleExamen(SalleExamen salleExamen) {
        this.salleExamen.remove(salleExamen);
        return this;
    }

    public Set<Groupe> getGroupes() {
        return this.groupes;
    }

    public void setGroupes(Set<Groupe> groupes) {
        if (this.groupes != null) {
            this.groupes.forEach(i -> i.removeExamen(this));
        }
        if (groupes != null) {
            groupes.forEach(i -> i.addExamen(this));
        }
        this.groupes = groupes;
    }

    public Examen groupes(Set<Groupe> groupes) {
        this.setGroupes(groupes);
        return this;
    }

    public Examen addGroupe(Groupe groupe) {
        this.groupes.add(groupe);
        groupe.getExamen().add(this);
        return this;
    }

    public Examen removeGroupe(Groupe groupe) {
        this.groupes.remove(groupe);
        groupe.getExamen().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Examen)) {
            return false;
        }
        return getId() != null && getId().equals(((Examen) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Examen{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", date='" + getDate() + "'" +
            ", heureDebut='" + getHeureDebut() + "'" +
            ", heureFin='" + getHeureFin() + "'" +
            "}";
    }
}
