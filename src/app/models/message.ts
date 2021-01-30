import { TypeMessage } from '../enums/typeMessage.enum';

export interface MessageModel {
    type: TypeMessage;
    data: string;
    length?: number; 
}
