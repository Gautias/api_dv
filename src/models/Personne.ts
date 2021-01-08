import MySQL from '../db/mySQL';

export default class Personne {

    protected idpersonne ? : number | null;
    public lastname: string | null;
    public firstname: string | null;
    public dateNaissance: string | null;
    public adresse ? : string;
    public ville ? : string;
    public zipcode ? : string;

    protected table: string = 'personne';

    /**
     * Creates an instance of Personne.
     * @param {(Personne(instance) | null)} id
     * @param {string} [firstname='']
     * @param {string} [lastname='']
     * @param {string} [dateNaissance='']
     * @param {string} [adresse]
     * @param {string} [ville]
     * @param {string} [zipcode]
     * @memberof Personne
     */
    constructor(personne: Personne | null, firstname: string = '', lastname: string = '', dateNaissance: string = '', adresse ? : string, ville ? : string, zipcode ? : string) {
        if (personne === null) {
            this.ville = ville;
            this.adresse = adresse;
            this.zipcode = zipcode;
            this.dateNaissance = dateNaissance;
            this.lastname = lastname.toUpperCase().trim();
            this.firstname = firstname.toLowerCase().trim();
        } else {
            this.lastname = personne.lastname;
            this.ville = personne.ville;
            this.firstname = personne.firstname;
            this.zipcode = personne.zipcode;
            this.adresse = personne.adresse;
            this.dateNaissance = personne.dateNaissance;
            this.idpersonne = personne.id;
        }

    }

    /************************* GETTER *************************/

    get id(): number {
        return <number > this.idpersonne;
    }

    get fullname(): string {
        return this.firstname + ' ' + this.lastname;
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
        return ['lastname', 'firstname', 'dateNaissance', 'adresse']
    }

    /************************* METHODS *************************/

    static select(where: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('personne', where).then((arrayPersonne: Array < any > ) => {
                    let data: Array < Personne > = [];
                    for (const personne of arrayPersonne) {
                        personne.dateNaissance = new String(personne.dateNaissance)
                        personne.id = personne.id;
                        personne.nom = personne.lastname;
                        data.push(new Personne(personne));
                    }
                    console.log(data);
                    resolve(data)
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

    
}
