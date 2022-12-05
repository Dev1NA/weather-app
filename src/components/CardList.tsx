import React from 'react';
import { useSelector } from 'react-redux';
import { cityData } from '../redux/slices/city';
import { List } from '@mui/material';
import CityCard from './CityCard';
import AddTownForm from './AddTownForm';
const CardList: React.FC = () => {
  const { data } = useSelector(cityData);

  return (
    <>
      <AddTownForm />
      <List
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridRowGap: '.5em',
          gridColumnGap: '1em',
          justifyItems: 'center',
        }}>
        {data.map((item) => (
          <CityCard key={item.id} {...item} />
        ))}
      </List>
    </>
  );
};

export default CardList;
