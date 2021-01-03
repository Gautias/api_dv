import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/attributeSelect';
import Personne from '../models/Personne';

export interface jointureInterface {
    type: 'LEFT' | 'RIGHT' | 'FULL' | 'INNER';
    where: {
        table: listeTables;
        foreignKey: string;
    }
    table: listeTables;
}

export default abstract class MySQL {
    
    static select(table: listeTables, where ? : any): any {

        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'dv_api',
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionWhere = "";

            let parameters = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })
        
    }
    
    static selectJoin(table: listeTables, join: Array < jointureInterface > , where ? : any): any {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionJoin = "";
            let conditionWhere = "";

            let parameters = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            for (let i = 0; i < join.length; i++) {
                let nameTable = join[i].table
                conditionJoin += `${join[i].type} JOIN ${join[i].table} ON ${join[i].where.table}.${join[i].where.foreignKey} = ${join[i].table}.${listAttributSelect[nameTable].primaryKey} `;
                for (const champs of listAttributSelect[nameTable].attribut) {
                    columns += "`" + nameTable + "`.`" + champs + "`,";
                }
            }

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table} ${conditionJoin} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

}
