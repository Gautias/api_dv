import MySQL from '../db/mySQL';

export default class Personne {

    protected idpersonne ? : number | null;
    public nom: string | null;
    public prenom: string | null;
    public dateNaiss: string | null;
    public adresse ? : string;
    public ville ? : string;
    public zipcode ? : string;

    protected table: string = 'personne';

    /**
     * Creates an instance of Personne.
     * @param {(Personne(instance) | null)} id
     * @param {string} [firstname='']
     * @param {string} [lastname='']
     * @param {string} [dateNaiss='']
     * @param {string} [adresse]
     * @param {string} [ville]
     * @param {string} [zipcode]
     * @memberof Personne
     */
    constructor(personne: Personne | null, firstname: string = '', lastname: string = '', dateNaiss: string = '', idPays: number = 1, adresse ? : string, ville ? : string, zipcode ? : string) {
        if (personne === null) {
            this.ville = ville;
            this.adresse = adresse;
            this.zipcode = zipcode;
            this.dateNaiss = dateNaiss;
            this.nom = lastname.toUpperCase().trim();
            this.prenom = firstname.toLowerCase().trim();
        } else {
            this.nom = personne.nom;
            this.ville = personne.ville;
            this.prenom = personne.prenom;
            this.zipcode = personne.zipcode;
            this.adresse = personne.adresse;
            this.dateNaiss = personne.dateNaiss;
            this.idpersonne = personne.id;
        }

    }

    /************************* GETTER *************************/

    get id(): number {
        return <number > this.idpersonne;
    }

    get fullname(): string {
        return this.prenom + ' ' + this.nom;
    }

    get address(): string {
        return this.adresse + ' ' + this.ville + ',' + this.zipcode;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof Personne
     */
    get attributInsert(): Array < string > {
        return ['nom', 'prenom', 'dateNaissance', 'adresse']
    }

    /************************* METHODS *************************/

    static isExiste(email: string) {
        return new Promise((resolve, reject) => {
            MySQL.select('personne').then((arrayPersonne: Array < any > ) => {
                    resolve((arrayPersonne.length > 0))
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    
}
