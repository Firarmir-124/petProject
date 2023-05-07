import { Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
}

export interface EventType {
  title: string;
  description: string;
  speaker: [
    {
      name: string;
    },
  ];
  time: string;
  image: string;
  hashtag: Types.ObjectId;
  user: Types.ObjectId;
  createDate: string;
  viewsCount: number;
  address: string;
}

export interface HashtagType {
  name: string;
}

export interface RecordUserType {
  name: Types.ObjectId;
  phone: string;
  description: string;
}
