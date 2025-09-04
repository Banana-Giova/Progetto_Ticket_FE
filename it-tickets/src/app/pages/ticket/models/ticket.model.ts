export class TicketModel {
    title: string = "";
    description: string = "";
    category?: string;
    is_priority?: boolean;
    status?: string = "";

     constructor(data?:any) {
        Object.assign(this, data)
    }
}