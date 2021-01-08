export default class CardException extends Error {

    constructor() {
        super("Veuillez compléter votre profil avec une carte de crédit")        
        
    }

    static checkCard(card_number: number): boolean{
         if(card_number.toString().length < 15){
            return true
         }else{
             return false
         }
            
    }

    static checkCvc(cvc: number): boolean{
        if(cvc.toString().length != 3){
            console.log(cvc.toString().length);
            return true
         }else{
             return false
         }
    }

}