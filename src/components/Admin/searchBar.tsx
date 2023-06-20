import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { format } from 'date-fns';


const FilterBar = ({filterDataHandler,filter:defaultValues}) => {
  const [filter, setFilter] = useState({
    ...defaultValues
  });


  const filterHandler = (key,value)=>{
    setFilter({...filter,[key]:value});
  }



  const handleSearchClick = () => {

  filterDataHandler(filter)
  };



  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    //@ts-ignore
    month = month < 10 ? `0${month}` : month;
    let day = currentDate.getDate();
    //@ts-ignore

    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  return (
    <AppBar style={{backgroundColor:'white'}} position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       
        </Typography>
        <TextField
          label="Scheme"
          defaultValue={defaultValues.scheme}
          onChange={(e)=>{filterHandler('scheme',e.target.value)}}
          sx={{ m: 1, minWidth: 120 }}
        />
     
        <TextField
          label="Plan"
            defaultValue={defaultValues.plan}
          onChange={(e)=>{filterHandler('plan',e.target.value)}}

          sx={{ m: 1, minWidth: 120 }}
        />
      
        <TextField
          id="date"
          label="Selected Date"
          type="date"
          defaultValue={getCurrentDate()} 
        
          onChange={(e)=>{
            const inputDate = e.target.value;
            const dateObj = new Date(inputDate);
            const formattedDate = format(dateObj, 'MM/dd/yyyy');
            filterHandler('date',  formattedDate)}
        }

          InputLabelProps={{
            shrink: true,
          }}
          sx={{ m: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Filter
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default FilterBar;
