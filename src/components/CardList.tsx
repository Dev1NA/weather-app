import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cityData, setLoaded } from '../redux/slices/city';
import { List, CircularProgress, Box } from '@mui/material';
import CityCard from './CityCard';
import AddTownForm from './AddTownForm';
const CardList: React.FC = () => {
  const { data, loaded } = useSelector(cityData);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setLoaded(true));
  }, [])
  return (
    <>
      {!loaded ? (
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
