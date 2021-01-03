import MySQL from '../db/mySQL';

export default class Personne {

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
