import TokenExpiredError, { JsonWebTokenError } from 'jsonwebtoken'
export default class TokenException extends Error {

    constructor() {
        super("Veuillez compléter votre profil avec une carte de crédit")        
        
    }

    // static checkTokenTime(token: string): string{
    //     const decoded = jwt.verify(token, 'secret');
    //     return res.send({
    //          user: (<any>decoded.user) // <-- error here
    //     });
    // }

}