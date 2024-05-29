export class Chat {
  id: number;
  message: string;
  username: string;
  date: Date;
  constructor(id: number, message: string, username: string, date: Date) {
    this.id = id;
    this.message = message;
    this.username = username;
    this.date = date;
  }
}
