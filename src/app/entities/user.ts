import { Entity } from './entity';
import { ClientModel } from '../models';


export class User extends Entity {
    constructor(id: string, data: ClientModel) {
        super('clients', id, data);
    }
}
