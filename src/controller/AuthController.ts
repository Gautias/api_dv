import { decode, sign } from 'jsonwebtoken';
import { Request, response, Response } from 'express';
import Personne from '../models/Personne';
import PasswordException from '../exception/PasswordException';
import Utilisateur from '../models/Utilisateur';
import EmailException from '../exception/EmailException';
let cpt = 0
export default class AuthController {
    
    static login = async(req: Request, res: Response) => {

        let data: any = req.body;
        
        try {
            let utilisateur: any = await Utilisateur.select({ email: data.email });
            if (utilisateur.length < 0)
                throw new Error(`Email not valid`)
            utilisateur = utilisateur[0];
            
            const isOk = await PasswordException.comparePassword(data.password, utilisateur.password);
            const emailValid = await EmailException.compareEmail(data.email, utilisateur.email)
            // console.log("donnée : " + data.password)
            // console.log("bdd : "+ utilisateur)
            if (!isOk)    
                throw new Error(`Un compte utilisant cette adresse mail est enregistré`)
            
            if(!emailValid){
                if(cpt == 4){
                    throw new Error("Trop de tentative sur l'email - Veuillez patienter 2 min");
                }
                cpt = cpt + 1
                console.log(cpt);
                throw new Error(`Adresse mail non valide`)
            }
                
                

            const theToken: any = await sign({ id: utilisateur.idPersonne, name: utilisateur.fullname }, < string > process.env.JWT_KEY, { expiresIn: '1m' })

            const token = {
                error: false,
                message: "l'utilisateur à été authentifié avec succès",
                token: theToken,
                user: {
                    firstname: utilisateur.firstname,
                    lastname: utilisateur.lastname,
                    email: utilisateur.email,
                    sexe: utilisateur.sexe
                },
                expired: await ( < any > decode(theToken)).exp
            }
            return res.status(201).json(token);
            cpt = 0
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    refreshToken = async(req: Request, res: Response) => {}
    checkToken = async(req: Request, res: Response) => {}
    logout = async(req: Request, res: Response) => {}
}
