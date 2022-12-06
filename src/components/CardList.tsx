import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cityData, setLoaded } from '../redux/slices/city';
import { List, CircularProgress, Box, Typography } from '@mui/material';
import CityCard from './CityCard';
import AddTownForm from './AddTownForm';
const CardList: React.FC = () => {
  const { data, loaded, updated, error } = useSelector(cityData);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setLoaded(true));
  }, []);
  const cityNotFoundError = 'Request failed with status code 404';
  const networkErrorMessage = 'Error happened. Please try later.';
  return (
    <>
      {error && error !== cityNotFoundError ? <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '36px', color: 'white'}}>{networkErrorMessage}</Typography> :
      !loaded && !updated ? (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <>
          <AddTownForm />
          <List
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridRowGap: '.5em',
              gridColumnGap: '1em',
              justifyItems: 'center',
              marginTop: '150px',
            }}>
            {data.map((item) => (
              <CityCard key={item.id} {...item} />
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default CardList;
