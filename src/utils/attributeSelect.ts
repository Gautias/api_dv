export type listeTables = "utilisateur" | "personne" | "tuteur";

interface attributSelectInterface {
    primaryKey: string;
    attribut: Array < string > ;
}

/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
const listAttributSelect: Record < listeTables, attributSelectInterface > = { //Constructs a type with a set of properties Keys of type Type. This utility can be used to map the properties of a type to another type.
    "utilisateur": {
        primaryKey: `id`,
        attribut: [`identifiant`, `password`, `role`, `email`, `idPersonne`]
    },
    "personne": {
        primaryKey: `id`,
        attribut: [`lastname`, `firstname`, `adresse`, `dateNaissance`, `sexe`]
    },
    "tuteur": {
        primaryKey: `id`,
        attribut: [`idUtilisateur`]
    },
};

// export default { listAttributSelect, listeTables };
export default listAttributSelect;