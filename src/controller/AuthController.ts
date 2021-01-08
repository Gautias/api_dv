import { decode, sign, verify } from 'jsonwebtoken';
import { Request, response, Response } from 'express';
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
            console.log(utilisateur);
            
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
            return await res.status(201).json(token);
            cpt = 0
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    static subscribe = async(req: Request, res: Response) =>{

        let data: any = req.body;
        // console.log(data);
        
        try{
            let utilisateur: any = await Utilisateur.select({ email: data.email });
            utilisateur = utilisateur[0];

            const theToken: any = await sign({ id: utilisateur.idPersonne, name: utilisateur.fullname }, < string > process.env.JWT_KEY, { expiresIn: '1m' })
            const verif: any = await verify(theToken, < string > process.env.JWT_KEY);
            console.log("le token : "+ theToken);
            

            if(!verif && !theToken){
                throw new Error(`Votre Token n'est pas correct`)
            }
            
            const token = {
                error: false,
                message: "Votre periode d'essai vient d'être activé",
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
    static then: any;
}
