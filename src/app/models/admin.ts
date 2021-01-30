export interface AdminModel {
    nom: string;
    prenom: string;
    photo: string;
    email: string,
    isOnline: boolean;
    connexionSince: string;
    phoneNumber: string;
    fcmKey?: string;
    createdAt?: any;
    updatedAt?: any;
}
