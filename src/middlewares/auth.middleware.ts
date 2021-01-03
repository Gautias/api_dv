import { Request, Response } from 'express';
import DateException from '../exception/DateException';
import EmailException'../exception/EmailException';
import PasswordException from '../exception/PasswordException';

export const registerMidd = (req: Request, res: Response, next: () => void) => {

    let data: any = req.body;

    const champsRequire = [`nom`, `prenom`, `email`, `password`, `date_naissance`, `sexe`]

    try {
        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire) {
            error = true;
            for (const champs in data) {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
                if
        }
        if (textError.length > 0) {
            textError = textError.slice(0, -2);
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        if (EmailException.checkEmail(data.email)) // Check valid syntaxe email
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.password)) // Check valid syntaxe password
            throw new PasswordException();
         if (!DateException.checkDate(data.dateNaiss)) // Check valid syntaxe password
             throw new DateException();

        next()

    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}