import MySQL from './src/db/mySQL';
import { createConnection, Connection } from 'mysql';
import Personne from './src/models/Personne';
import { Request, Response } from 'express';



const bdd: Connection = createConnection({ // Init params to database
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dv_api',
    port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
})
bdd.connect(err => {
    if (err) {
        console.log('Connection database error');
    } else {
        console.log('connection success');
        
    }
})
// MySQL.select('personne').then(
//     async(req: Request, res: Response) => {
//       let data = req.body;
//       console.log(data.res.lastname)
//     }
// )


//const query = bdd.query('SELECT * FROM `personne`')


