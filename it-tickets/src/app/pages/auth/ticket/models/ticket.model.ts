export class TicketModel {
    title: string = "";
    description: string = "";
    category?: number;
    is_priority?: boolean;

     constructor(data?:any) {
        Object.assign(this, data)
    }
}