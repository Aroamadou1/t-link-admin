import { Entity } from './entity';
import { LivraisonModel } from '../models';


export class Livraison extends Entity {
    constructor(id: string, data: LivraisonModel) {
        super('livraisons', id, data);
    }
}
