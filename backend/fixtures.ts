import mongoose from 'mongoose';
import config from './config';
import User from './models/Users';
import EventPlan from './models/EventPlan';
import crypto from 'crypto';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const user = await User.create({
    email: `admin@mail.com`,
    displayName: 'admin',
    password: '123',
    token: crypto.randomUUID(),
    role: 'organizer',
  });

  for (let i = 0; i <= 5; i++) {
    await EventPlan.create({
      title: `Мероприятие${i}`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      speaker: [
        {
          name: `Sultan`,
        },
        {
          name: `Dima`,
        },
      ],
      time: new Date().toISOString(),
      image: null,
      hashtag: `644264a446259271719c3ae4`,
      user: user._id,
      createDate: new Date().toISOString(),
    });
  }

  for (let i = 0; i <= 10; i++) {
    await EventPlan.create({
      title: `Мероприятие${i}`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      speaker: [
        {
          name: `Sultan`,
        },
        {
          name: `Dima`,
        },
      ],
      time: new Date().toISOString(),
      image: null,
      hashtag: `64455a516f8b33b1b120ef78`,
      user: user._id,
      createDate: new Date().toISOString(),
    });
  }

  for (let i = 0; i <= 4; i++) {
    await EventPlan.create({
      title: `Мероприятие${i}`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      speaker: [
        {
          name: `Sultan`,
        },
        {
          name: `Dima`,
        },
      ],
      time: new Date().toISOString(),
      image: null,
      hashtag: `64455a5c6f8b33b1b120ef7c`,
      user: user._id,
      createDate: new Date().toISOString(),
    });
  }

  await db.close();
};

void run();
