export interface User {
  name: string;
  socketId: string;
}

export interface Message {
  _id?: string;
  id: string;
  body: string;
  date: Date;
  socketId: string;
  username: string;
}
