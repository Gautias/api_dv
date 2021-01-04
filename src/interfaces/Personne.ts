export interface PersonneInterfaces {
    id ? : number;
    lastname ? : string;
    firstname ? : string;
    dateNaissance ? : any;
    adresse ? : string;
    ville ? : string;
    zipcode ? : string;
    idPersonne ? : number;
    fullname ? : string;
    address ? : string;
    attributInsert ? : Array < string > ;
    save(): Promise < number > ;
}