import React from 'react'
import { useSelector } from 'react-redux';
import { cityData } from '../redux/slices/city';
const CardList: React.FC = () => {
  const {data} = useSelector(cityData)
  return (
    <div>
      { data.map(item => <li key={item.id}>{item.sys.country}</li>)}
    </div>
  )
}

export default CardList