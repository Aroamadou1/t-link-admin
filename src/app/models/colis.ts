import { MessageModel } from '.';

export interface ColisModel {
    imageClient:string;
    imageCoursier:string;
    categorie: string;
    poids: any;
    valeur: number;
    taille: boolean;
    fragilite:boolean;
    description: MessageModel;
}
