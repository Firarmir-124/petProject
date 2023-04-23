export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}

export interface EventList {
  _id: string;
  title: string;
  speaker: [
    {
      name: string;
    },
  ];
  time: string;
  image: string;
  hashtag: string;
  user: string;
}

export interface EventListFull {
  eventPlanListLength: number;
  eventPlanList: EventList[];
}

export interface EventOne {
  _id: string;
  title: string;
  description: string;
  speaker: [
    {
      name: string;
    },
  ];
  time: string;
  image: File | null;
  hashtag: string;
  user: string;
}

export interface EventMutation {
  title: string;
  description: string;
  time: string;
  image: File | null;
  hashtag: string;
  speaker: {
    name: string;
  }[];
}

export interface HashtagListType {
  _id: string;
  name: string;
}

export interface HashtagMutation {
  name: string;
}
