import MySQL from '../db/MySQL';
import { jointureInterface } from '../db/MySQL';
import Utilisateur from './Utilisateur';

export default class Tuteur extends Utilisateur {


    protected table: string = 'tuteur';
    idUtilisateur: number | null | undefined;

    constructor(id: Utilisateur) {

        super(id);

        this.idUtilisateur = this.id;
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['id']
    };

    static select(where: any) {
        return new Promise((resolve, reject) => {
            const join: Array < jointureInterface > = [{
                type: 'LEFT',
                table: 'utilisateur',
                where: {
                    table: 'tuteur',
                    foreignKey: 'idUtilisateur'
                }
            }, ]
            MySQL.selectJoin('tuteur', join, where).then((arrayTuteur: Array < any > ) => {
                    let newUtilisateur: Tuteur;
                    let data: Array < Tuteur > = [];
                    for (const utilisateur of arrayTuteur) {
                        utilisateur.dateNaissance = new String(utilisateur.dateNaissance)
                        utilisateur.id = utilisateur.idPersonne;
                        newUtilisateur = new Tuteur(utilisateur);
                        data.push(new Tuteur(newUtilisateur));
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

}