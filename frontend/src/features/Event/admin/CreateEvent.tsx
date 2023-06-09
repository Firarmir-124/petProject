import React from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import 'easymde/dist/easymde.min.css';
import FormEvent from '../components/FormEvent';
import { EventMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createEvent } from '../eventThunk';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectUser } from '../../User/usersSlice';
import { openSnackbar } from '../eventSlice';
import AddIcon from '@mui/icons-material/Add';

const CreateEvent = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (event: EventMutation) => {
    await dispatch(createEvent(event)).unwrap();
    dispatch(openSnackbar({ status: true, parameter: 'create_event' }));
    navigate('/event');
  };

  if (user?.role !== 'organizer') {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Создать мероприятие
        </Typography>
        <FormEvent onSubmit={onSubmit} />
      </Box>
    </Container>
  );
};

export default CreateEvent;
