import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { format } from "date-fns";

const FilterBar = ({ filterDataHandler, filter: defaultValues, setDate }) => {
  const [filter, setFilter] = useState({
    ...defaultValues,
  });

  const filterHandler = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const schemes = [
    {
      value: "LP",
      name: "LOW DURATION FUND",
      plan: "IG",
      opt: "G",
    },
    {
      value: "LF",
      name: "LIQUID FUND",
      plan: "IG",
      opt: "G",
    },
    {
      value: "ON",
      name: "OVERNIGHT FUND",
      plan: "GP",
      opt: "G",
    },
  ];

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name == "scheme") {
      const data = schemes.find(each => each.value == value);
      if (!data) { return; }
      setFilter({ ...filter, "plan": data.plan, "scheme": value });
    }
  }


  const DateConverter = str => {
    var date = new Date(str);
    var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return `${mnth}/${day}/${year}`;
  };

  const handleSearchClick = () => {
    filterDataHandler(filter);
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
    <AppBar style={{ backgroundColor: "white" }} position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <TextField
          label="Scheme"
          name="scheme"
          onChange={changeHandler}
          value={filter.scheme}
          sx={{ m: 1, minWidth: 120 }}
          select
        >
          {schemes.map((each, idx) => {
            return (
              <MenuItem key={idx} value={each.value}>
                {each.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          id="date"
          label="Selected Date"
          type="date"
          defaultValue={getCurrentDate()}
          onChange={e => {
            const inputDate = e.target.value;
            const dateObj = new Date(inputDate);
            const formattedDate = DateConverter(dateObj);
            setDate(formattedDate);
            filterHandler("date", formattedDate);
          }}
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
