import React from 'react'
import { useSelector } from 'react-redux';
import { cityData } from '../redux/slices/city';
import { List } from '@mui/material';
import CityCard from './CityCard';
const CardList: React.FC = () => {
  const {data} = useSelector(cityData)

  return (
    <List sx={
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }>
      { data.map(item => <CityCard key={item.id} {...item}/>)}
    </List>
  )
}

export default CardList