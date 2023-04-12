import { model, Schema } from 'mongoose';
import { EventType } from '../types';

const EventSchema = new Schema<EventType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  speaker: {
    type: [{ name: String }],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  hashtag: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const EventPlan = model('EventPlan', EventSchema);
export default EventPlan;