import MySQL from '../db/MySQL';
import Personne from './Personne';
import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';
import { jointureInterface } from '../db/MySQL';

export default class Utilisateur extends Personne {

    email: string;
    password: string = '';
    idPersonne: number | null | undefined;
    token: string = '';

    protected table: string = 'utilisateur';

    constructor(id: Personne, email: string = '', password: string = '', token: string = '') {

        super(id);

        if (EmailException.checkEmail(email)) // Check valid syntaxe email
            throw new EmailException()
        if (!PasswordException.isValidPassword(password)) // Check valid syntaxe password
            throw new PasswordException()

        this.email = email;
        this.password = password;
        this.idPersonne = this.id;
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['id', 'email', 'password']
    }

    static select(where: any) {
        return new Promise((resolve, reject) => {
            const join: Array < jointureInterface > = [{
                type: 'LEFT',
                table: 'personne',
                where: {
                    table: 'utilisateur',
                    foreignKey: 'idPersonne'
                }
            }, ]
            MySQL.selectJoin('utilisateur', join, where).then((arrayUtilisateur: Array < any > ) => {
                    let newPersonne: Personne;
                    let data: Array < Utilisateur > = [];
                    for (const personne of arrayUtilisateur) {
                        personne.dateNaissance = new String(personne.dateNaissance)
                        personne.id = personne.idPersonne;
                        newPersonne = new Personne(personne);
                        data.push(new Utilisateur(newPersonne, personne.email, personne.password));
                    }
                    //console.log(data);
                    resolve(data)
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

    static isExiste(email: string) {
        return new Promise((resolve, reject) => {
            MySQL.select('utilisateur').then((arrayPersonne: Array < any > ) => {
                    resolve((arrayPersonne))
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

}