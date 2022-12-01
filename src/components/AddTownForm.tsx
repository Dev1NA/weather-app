import React from 'react'
import { Input } from '@mui/material';
import { FormControl, InputLabel, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCitySearch } from '../redux/slices/city';

const AddTownForm: React.FC = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }
  const handlerButton = () => {
    dispatch(setCitySearch(value));
    setValue('');
  }
  return (
    <div>
      <FormControl
      sx={
        {
          width: 300,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '20px auto'
        }
      }
      >
        <InputLabel htmlFor="input-city">City</InputLabel>
        <Input id="input-city" aria-describedby="my-helper-text"
        onChange={(e) => handlerInput(e)}
        value={value}
        sx={
          {
            width: 300,
            paddingRight: '10px',
            marginRight: '20px'
          }
        }
        />
        <Button variant="contained" onClick={handlerButton}>Add</Button>
      </FormControl>
    </div>
  )
}

export default AddTownForm