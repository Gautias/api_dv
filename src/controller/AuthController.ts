import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import Personne from '../models/Personne';
import PasswordException from '../exception/PasswordException';
import Utilisateur from '../models/Utilisateur';

export default class AuthController {

    static login = async(req: Request, res: Response) => {

        let data: any = req.body;

        try {
            let utilisateur: any = await Utilisateur.select({ email: data.email });
            if (utilisateur.length < 0)
                throw new Error(`Email don't exist!`)
            utilisateur = utilisateur[0];

            const isOk = await PasswordException.comparePassword(data.password, utilisateur.password);

            if (!isOk)
                throw new Error(`User is undefined!`)

            const theToken: any = await sign({ id: utilisateur.idPersonne, name: utilisateur.fullname }, < string > process.env.JWT_KEY, { expiresIn: '1m' })

            const token = {
                token: theToken,
                expired: await ( < any > decode(theToken)).exp
            }
            return res.status(201).json(token);
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
}
