import { EmplacementModel } from './emplacement';

export interface ClientModel {
    pseudo: string;
    photo: string;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaissance: string;
    solde: number;
    pays: string;
    codePIN: string;
    parano: boolean;
    codeCountry: string;
    phoneNumber: string;
    fcmKey?: string;
    adresses?: EmplacementModel[];
    createdAt?: any;
    updatedAt?: any;
}
