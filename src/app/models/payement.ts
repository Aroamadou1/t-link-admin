import { MethodePayement } from '../enums/methodePayement.enum';

export interface PayementModel {
    prix: number;
    payed_at: any;
    payementMethod: MethodePayement;
    payement: number;
    payedContact:string;
}
