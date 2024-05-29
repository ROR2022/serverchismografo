export class CreateChatDto {
  message: string;
  username: string;
  date: Date;
  constructor(message: string, username: string, date: Date) {
    this.message = message;
    this.username = username;
    this.date = date;
  }
}
