export class TicketModel {
    title: string = "";
    description: string = "";
    categoryName?: string;
    is_priority?: boolean;
    status?: string = "";
    id? : number;
    created_at?: Date;
    modified_at?: Date;

     constructor(data?:any) {
        Object.assign(this, data)
    }
}