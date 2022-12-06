import { Button, capitalize, FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCitySearch } from '../redux/slices/city';
import { AppDispatch } from '../redux/store';
const AddTownForm: React.FC = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const ENGLISH_CHARACTERS = /[A-Za-z]/;

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value !== '' && !ENGLISH_CHARACTERS.test(e.target.value)) {
      return alert('You need to type text in English');
    }
    setValue(e.target.value);
  };
  const handlerButton = () => {
    dispatch(setCitySearch(capitalize(value)));
    setValue('');
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <FormControl
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '20px auto',
        }}>
        <InputLabel htmlFor="input-city">City</InputLabel>
        <Input
          id="input-city"
          aria-describedby="my-helper-text"
          onChange={(e) => handlerInput(e)}
          value={value}
          sx={{
            width: 300,
            paddingRight: '10px',
            marginRight: '20px',
          }}
        />
        <Button variant="contained" onClick={handlerButton}>
          Add
        </Button>
      </FormControl>
    </div>
  );
};

export default AddTownForm;
