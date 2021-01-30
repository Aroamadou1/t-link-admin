import { ClientModel, CoursierModel, ColisModel, EmplacementModel, PayementModel, ContactModel } from '.';

export interface LivraisonModel {
    client: any;

    destinataireiD?: string;
    destinataire: ContactModel;

    coursierId: string;
    coursier: CoursierModel;

    colis: ColisModel;

    depart: EmplacementModel;
    destination: EmplacementModel;

    payement: PayementModel;

    createdAt?: any;
}
