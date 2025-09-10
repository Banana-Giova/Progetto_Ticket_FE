export class TicketModel {
    title: string = "";
    description: string = "";
    categoryName?: string;
    is_priority?: boolean;
    status?: string = "";

     constructor(data?:any) {
        Object.assign(this, data)
    }
}