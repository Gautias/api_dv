import { PersonneInterfaces } from './Personne';
export interface UtilisateurInterfaces extends PersonneInterfaces {
    personne_idpersonne: number | null | undefined;
    email: string;
    password: string;

    save(): Promise < number >
}