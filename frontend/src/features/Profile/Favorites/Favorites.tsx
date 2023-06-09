import React, { useEffect } from 'react';
import { Alert, Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import CardFavorite from '../components/CardFavorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BallotIcon from '@mui/icons-material/Ballot';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFavoritesFetchLoading, selectFavoritesList } from '../profileSlice';
import { fetchFavorites, removeFavorites, showFavorites } from '../profileThunk';
import useConfirm from '../../../components/Dialogs/Confirm/useConfirm';
import SkeletonCardUser from '../../Event/components/SkeletonCardUser';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(selectFavoritesList);
  const loadingFavoritesList = useAppSelector(selectFavoritesFetchLoading);
  const { confirm } = useConfirm();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const removeOneCard = async (id: string) => {
    if (await confirm('Уведомление', 'Вы действительно хотите удалить ?')) {
      await dispatch(removeFavorites({ deleteOne: id, deleteAll: undefined, deleteSelect: undefined })).unwrap();
      await dispatch(fetchFavorites());
    } else {
      return;
    }
  };

  const showFavoritesCard = async (id: string) => {
    await dispatch(showFavorites(id)).unwrap();
    await dispatch(fetchFavorites());
  };

  const removeSelected = async () => {
    if (await confirm('Уведомление', 'Вы действительно хотите удалить ?')) {
      await dispatch(removeFavorites({ deleteOne: undefined, deleteAll: undefined, deleteSelect: true })).unwrap();
      await dispatch(fetchFavorites());
    } else {
      return;
    }
  };

  return (
    <Container>
      {favoritesList && favoritesList.event.filter((item) => item.show).length > 0 ? (
        <Button onClick={removeSelected} variant="outlined" startIcon={<BallotIcon />}>
          Удалить
        </Button>
      ) : null}
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ mb: 1, bgcolor: 'secondary.main' }}>
          <FavoriteIcon />
        </Avatar>
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
          Избранное
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {favoritesList && favoritesList.event.length > 0 ? (
            favoritesList.event.map((event) =>
              !loadingFavoritesList ? (
                <CardFavorite
                  key={event._id}
                  event={event}
                  removeOneCard={() => removeOneCard(event.list._id)}
                  showFavoritesCard={() => showFavoritesCard(event.list._id)}
                />
              ) : (
                <SkeletonCardUser key={event._id} />
              ),
            )
          ) : (
            <Alert severity="info">В данный момент список пуст</Alert>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Favorites;
