export default class EmailException extends Error {

    constructor() {
        super("Un compte utilisant cette adresse mail est deja enregistré")        
        
    }

    static compareEmail(data_email: string, user_email: string): boolean{
        if(data_email !== user_email){
            return false
        }else{
            return true
        }
         
    }

    static checkEmail(email: string): boolean {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return (!reg.test(email.toLowerCase().trim()))
    }
}