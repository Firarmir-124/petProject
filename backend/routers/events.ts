import express from 'express';
import authAnonymous, { RequestWitUser } from '../middleware/authAnonymous';
import EventPlan from '../models/EventPlan';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import { EventType } from '../types';
import { promises as fs } from 'fs';
import path from 'path';
import config from '../config';

const eventsRouter = express.Router();

eventsRouter.get('/', authAnonymous, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = 8;

    if (req.query.search !== undefined) {
      const eventPlanList = await EventPlan.find({ title: { $regex: req.query.search as string } })
        .select(['title', 'speaker', 'time', 'image', 'hashtag', 'user'])
        .sort({ createDate: -1 });

      return res.send({ eventPlanListLength: 0, eventPlanList });
    } else {
      const eventPlanListFull = await EventPlan.find();
      const eventPlanList = await EventPlan.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .select(['title', 'speaker', 'time', 'image', 'hashtag', 'user'])
        .sort({ createDate: -1 });

      return res.send({ eventPlanListLength: eventPlanListFull.length, eventPlanList });
    }
  } catch {
    return res.sendStatus(500);
  }
});

eventsRouter.post('/', imagesUpload.single('image'), auth, permit('organizer'), async (req, res, next) => {
  try {
    const user = (req as RequestWitUser).user;

    const newEventPlan = await EventPlan.create({
      title: req.body.title,
      description: req.body.description,
      speaker: JSON.parse(req.body.speaker),
      time: req.body.time,
      image: req.file && req.file.filename,
      hashtag: req.body.hashtag,
      user: user._id,
      createDate: new Date().toISOString(),
    });

    return res.send(newEventPlan);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

eventsRouter.get('/:id', async (req, res) => {
  try {
    const eventPlan = await EventPlan.findOne({ _id: req.params.id });
    return res.send(eventPlan);
  } catch {
    return res.sendStatus(500);
  }
});

eventsRouter.put('/:id', imagesUpload.single('image'), auth, permit('organizer'), async (req, res, next) => {
  try {
    const oneEvent = (await EventPlan.findOne({ _id: req.params.id })) as EventType;
    const newEventPlan = {
      title: req.body.title,
      description: req.body.description,
      speaker: JSON.parse(req.body.speaker),
      time: req.body.time,
      hashtag: req.body.hashtag,
      image: req.file && req.file.filename,
    };

    if (oneEvent.image === newEventPlan.image) {
      await fs.unlink(path.join(config.publicPath, oneEvent.image));
    }

    await EventPlan.updateMany({ _id: req.params.id }, { $set: newEventPlan });
    return res.send(newEventPlan);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

eventsRouter.delete('/:id', auth, permit('organizer'), async (req, res, next) => {
  try {
    await EventPlan.deleteOne({ _id: req.params.id });
    return res.send({ remove: req.params.id });
  } catch (e) {
    return next(e);
  }
});

export default eventsRouter;
