import { ApiFirebaseService } from '../services';

export class Entity {
    id: string;
    _data: any
    path: string;

    constructor(path: string, id: string, data: any) {
        this.id = id;
        this._data = data;
        this.path = path;
    }

    /**
     * 
     */
    set data(data: any) {
        this._data = data;
    }

    /**
     * 
     */
    get data(): any {
        return this._data;
    }

    /**
     * 
     */
    save(){
        // return this.id?   ApiFirebaseService.put(this.path, this.id, this.data):  ApiFirebaseService.post(this.path, this.data);
    }

    /**
     * 
     */
    delete(){
        // return  ApiFirebaseService.delete(this.path, this.id)
    } 
}
