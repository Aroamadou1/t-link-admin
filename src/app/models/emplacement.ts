import { MessageModel } from '.';


export interface EmplacementModel {
    nom: string;
    adresse: string;
    latitude: number;
    longitude: number;
    description: MessageModel;
}
