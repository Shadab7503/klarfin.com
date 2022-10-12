import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Modal from "@mui/material/Modal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import filterIcon from "../../images/filters.png";
import whatsapp from "../../images/whatsapp.png";
import emailIcon from "../../images/emailIcon.png";
import historyIcon from "../../images/history.png";
import call from "../../images/history-call.png";
import email from "../../images/history-email.png";
import customer from "../../images/history-logo.png";
import {
  receivablesData,
  ReceivablesData,
  ReceivablesRow,
  HistoryData,
} from "../../dummy_data/data";
import {
  Filter,
  Filters,
  ColumnTypeMap,
  ColumnBoolean,
} from "../../utils/interface";

const defaultFilter = {
  min: "",
  max: "",
  value: "",
  type: "contains",
};

const defaultIsFilter = {
  customer: false,
  date: false,
  amount: false,
  "balance amount": false,
  "ageing days": false,
};

const defaultFilters = {
  customer: { ...defaultFilter, dataType: "string" },
  date: { ...defaultFilter, dataType: "date" },
  amount: { ...defaultFilter, dataType: "number" },
  "balance amount": { ...defaultFilter, dataType: "number" },
  "ageing days": { ...defaultFilter, dataType: "number" },
} as Filters;

const Receivables = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [globalMinDate, setGlobalMinDate] = useState<Dayjs>();
  const [globalMaxDate, setGlobalMaxDate] = useState<Dayjs>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
  const [sortColumn, setSortColumn] = useState<keyof ReceivablesRow | "">("");
  const [openHistory, setOpenHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryData>({} as HistoryData);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterColumn, setFilterColumn] = useState<string>("");
  const [fromValue, setFromValue] = useState<Dayjs | null>();
  const [toValue, setToValue] = useState<Dayjs | null>();
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<ColumnBoolean>(defaultIsFilter);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [validating, setValidating] = useState<ColumnBoolean>({
    customer: false,
    date: false,
    amount: false,
    "balance amount": false,
    "ageing days": false,
  });
  const [receivables, setReceivables] =
    useState<ReceivablesData>(receivablesData);
  var open = Boolean(anchorEl);

  useEffect(() => {
    if (Object.keys(receivables).length > 0) {
      let minDate: Dayjs = dayjs();
      let maxDate: Dayjs = dayjs();
      receivables.rows.forEach((row) => {
        const date = dayjs(row.date);
        if (!minDate) minDate = date;
        else {
          if (minDate.valueOf() > date.valueOf()) minDate = date;
        }
        if (!maxDate) maxDate = date;
        else {
          if (maxDate.valueOf() < date.valueOf()) maxDate = date;
        }
      });
      setGlobalMaxDate(maxDate);
      setGlobalMinDate(minDate);
      setFromValue(minDate);
      setToValue(maxDate);
    }
  }, [receivables]);

  useEffect(() => {
    let originalRows: ReceivablesRow[] = receivablesData.rows;
    const filteredData: ReceivablesRow[] = originalRows.filter(
      (row: ReceivablesRow) => {
        let keep: boolean = true;
        (Object.keys(row) as (keyof ReceivablesRow)[]).forEach((column) => {
          if (isFilter[column]) {
            const filter: Filter = filters[column];
            const value = row[column];
            if (typeof value === "string") {
              if (filter.dataType === "string") {
                const contains: boolean = value
                  .toLowerCase()
                  .includes(filter.value!);
                if (contains && filter.type !== "contains") keep = false;
                if (!contains && filter.type === "contains") keep = false;
              } else {
                if (
                  dayjs(value).valueOf() < dayjs(filter.min).valueOf() ||
                  dayjs(value).valueOf() > dayjs(filter.max).valueOf()
                )
                  keep = false;
              }
            } else if (typeof value === "number") {
              if (value < Number(filter.min) || value > Number(filter.max))
                keep = false;
            }
          }
        });
        return keep;
      }
    );
    setReceivables((r) => ({ ...r, rows: filteredData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilter]);

  const columnTypeMap: ColumnTypeMap = {
    customer: "string",
    date: "date",
    amount: "number",
    "balance amount": "number",
    "ageing days": "number",
  };

  const sortArray = (
    arr: ReceivablesRow[],
    orderBy: string,
    column: keyof ReceivablesRow
  ) => {
    if (column !== "date")
      switch (orderBy) {
        case "asc":
          return arr.sort((a, b) =>
            a[column] > b[column] ? 1 : b[column] > a[column] ? -1 : 0
          );
        case "desc":
          return arr.sort((a, b) =>
            a[column] < b[column] ? 1 : b[column] < a[column] ? -1 : 0
          );
      }
    else {
      switch (orderBy) {
        case "asc":
          return arr.sort((a, b) =>
            dayjs(a[column]).valueOf() > dayjs(b[column]).valueOf()
              ? 1
              : dayjs(a[column]).valueOf() < dayjs(b[column]).valueOf()
              ? -1
              : 0
          );
        case "desc":
          return arr.sort((a, b) =>
            dayjs(a[column]).valueOf() < dayjs(b[column]).valueOf()
              ? 1
              : dayjs(a[column]).valueOf() > dayjs(b[column]).valueOf()
              ? -1
              : 0
          );
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortRequest = (column: keyof ReceivablesRow) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
    setReceivables({
      ...receivables,
      rows: sortArray(
        receivables.rows,
        sortOrder === "asc" ? "desc" : "asc",
        column
      )!,
    });
  };

  const addFilter = (filter: Filter, column: string) => {
    setValidating({ ...validating, [column]: true });
    const dataType = columnTypeMap[column];
    if (dataType === "string") {
      if (!filter.value || filter.value.length === 0) return;
    } else if (dataType === "date") {
      setFilters({
        ...filters,
        [column]: {
          ...filters[column],
          max: toValue?.format("DD-MMM-YYYY"),
          min: fromValue?.format("DD-MMM-YYYY"),
        },
      });
    } else {
      if (
        filter.min?.length === 0 ||
        filter.max?.length === 0 ||
        Number(filter.min) > Number(filter.max)
      )
        return;
    }
    setIsFilter({ ...isFilter, [column]: true });
    setValidating({ ...validating, [column]: false });
    setOpenFilter(false);
  };

  const showFilter = (column: string) => {
    const columnType = columnTypeMap[column];
    if (columnType === "string")
      return (
        <Grid
          container
          className="modal-box"
          style={{ width: "400px" }}
          p={{ sm: 5, xs: 3 }}
        >
          <Grid item xs={12} className="filter-column" mb={3}>
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </Grid>
          <RadioGroup
            row
            defaultValue="contains"
            value={filters[column].type}
            onChange={(event) =>
              setFilters({
                ...filters,
                [column]: { ...filters[column], type: event.target.value },
              })
            }
          >
            <Radio
              value="contains"
              label="Contains"
              sx={{ fontFamily: "Montserrat", fontWeight: 600 }}
            />
            <Radio
              value="does not contain"
              label="Does not contain"
              sx={{ fontFamily: "Montserrat", fontWeight: 600 }}
            />
          </RadioGroup>
          <Grid container mt={3}>
            <TextField
              focused
              fullWidth
              value={filters[column].value}
              className="filter-label"
              onChange={(event) => {
                setFilters({
                  ...filters,
                  [column]: { ...filters[column], value: event.target.value },
                });
              }}
              inputProps={{
                style: {
                  padding: 10,
                  // height: "100%",
                },
              }}
              error={validating[column] && filters[column].value?.length === 0}
              helperText={
                validating[column] && filters[column].value?.length === 0
                  ? "Cannot be empty"
                  : ""
              }
            />
          </Grid>
          <Grid container justifyContent="flex-end" mt={3}>
            <Grid
              item
              className="filter-button"
              style={{ fontSize: "1rem" }}
              onClick={() => {
                // setFilters({
                //   ...filters,
                //   [column]: { ...defaultFilter, dataType: "string" },
                // });
                setOpenFilter(false);
              }}
            >
              Delete
            </Grid>
            <Grid
              item
              style={{
                color: "white",
                background: "#2863e3",
                fontSize: "1rem",
              }}
              className="filter-button"
              ml={1}
              onClick={() => addFilter(filters[column], column)}
            >
              Confirm
            </Grid>
          </Grid>
        </Grid>
      );
    else if (columnType === "number")
      return (
        <Grid
          container
          className="modal-box"
          style={{ width: "400px" }}
          p={{ sm: 5, xs: 3 }}
        >
          <Grid item xs={12} className="filter-column" mb={3}>
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </Grid>
          <Grid item xs={12} className="filter-heading">
            Min
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              focused
              className="filter-label"
              type="number"
              fullWidth
              value={filters[column].min}
              onChange={(event) => {
                setFilters({
                  ...filters,
                  [column]: { ...filters[column], min: event.target.value },
                });
              }}
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
              error={
                validating[column] &&
                (filters[column].min?.length === 0 ||
                  Number(filters[column].min) > Number(filters[column].max))
              }
              helperText={
                validating[column] &&
                (filters[column].max?.length === 0 ||
                  Number(filters[column].min) > Number(filters[column].max))
                  ? "Invalid value"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} className="filter-heading" mt={1}>
            Max
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              className="filter-label"
              type="number"
              focused
              fullWidth
              value={filters[column].max}
              onChange={(event) => {
                setFilters({
                  ...filters,
                  [column]: { ...filters[column], max: event.target.value },
                });
              }}
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
              error={
                validating[column] &&
                (filters[column].max?.length === 0 ||
                  Number(filters[column].min) > Number(filters[column].max))
              }
              helperText={
                validating[column] &&
                (filters[column].max?.length === 0 ||
                  Number(filters[column].min) > Number(filters[column].max))
                  ? "Invalid value"
                  : ""
              }
            />
          </Grid>
          <Grid container justifyContent="flex-end" mt={3}>
            <Grid
              item
              className="filter-button"
              style={{ fontSize: "1rem" }}
              onClick={() => {
                // setFilters({
                //   ...filters,
                //   [column]: { ...defaultFilter, dataType: "number" },
                // });
                setOpenFilter(false);
              }}
            >
              Delete
            </Grid>
            <Grid
              item
              style={{
                color: "white",
                background: "#2863e3",
                fontSize: "1rem",
              }}
              className="filter-button"
              ml={1}
              onClick={() => addFilter(filters[column], column)}
            >
              Confirm
            </Grid>
          </Grid>
        </Grid>
      );
    else
      return (
        <Grid
          container
          className="modal-box"
          style={{ width: "400px" }}
          p={{ sm: 5, xs: 3 }}
        >
          <Grid item xs={12} className="filter-column" mb={3}>
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </Grid>
          <Grid item xs={12} className="filter-heading">
            Starting from (including)
          </Grid>
          <Grid item xs={12} mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                open={fromOpen}
                onOpen={() => setFromOpen(true)}
                onClose={() => setFromOpen(false)}
                inputFormat="DD/MM/YYYY"
                minDate={globalMinDate}
                maxDate={toValue}
                value={fromValue}
                onChange={(newValue) => {
                  setFromValue(newValue);
                }}
                renderInput={(params) => (
                  <Grid
                    container
                    onClick={() => setFromOpen(true)}
                    style={{
                      fontFamily: "Montserrat",
                      border: "1px solid #d3d3d3",
                      padding: "0.5rem 1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {fromValue?.format("DD/MM/YYYY")}
                    <CalendarMonthIcon />
                  </Grid>
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} className="filter-heading" mt={2}>
            Until (last day included)
          </Grid>
          <Grid item xs={12} mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                open={toOpen}
                onOpen={() => setToOpen(true)}
                onClose={() => setToOpen(false)}
                inputFormat="DD/MM/YYYY"
                minDate={fromValue}
                maxDate={globalMaxDate}
                value={toValue}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={(params) => (
                  <Grid
                    container
                    onClick={() => setToOpen(true)}
                    style={{
                      fontFamily: "Montserrat",
                      border: "1px solid #d3d3d3",
                      padding: "0.5rem 1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {toValue?.format("DD/MM/YYYY")}
                    <CalendarMonthIcon />
                  </Grid>
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container justifyContent="flex-end" mt={3}>
            <Grid
              item
              className="filter-button"
              style={{ fontSize: "1rem" }}
              onClick={() => {
                // setFilters({ ...filters, [column]: defaultFilter as Filter });
                setOpenFilter(false);
              }}
            >
              Delete
            </Grid>
            <Grid
              item
              style={{
                color: "white",
                background: "#2863e3",
                fontSize: "1rem",
              }}
              className="filter-button"
              ml={1}
              onClick={() => addFilter(filters[column], column)}
            >
              Confirm
            </Grid>
          </Grid>
        </Grid>
      );
  };

  const resetFilter = (column: string) => {
    setIsFilter({ ...isFilter, [column]: false });
    setFilters({
      ...filters,
      [column]: { ...defaultFilter, dataType: columnTypeMap[column] },
    });
  };

  const resetAllFilters = () => {
    setIsFilter(defaultIsFilter);
    setFilters(defaultFilters);
  };

  return (
    <Grid container px={1}>
      <Modal open={openFilter} onClose={() => setOpenFilter(false)}>
        {showFilter(filterColumn)}
      </Modal>
      <Modal open={openHistory} onClose={() => setOpenHistory(false)}>
        <Grid
          container
          className="modal-box history-modal"
          style={{ width: "600px" }}
          p={{ sm: 5, xs: 3 }}
        >
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <img
                src={customer}
                alt="customer"
                width="40px"
                className="history-icons"
              />
              <Grid
                item
                xs={10}
                className="history-customer"
                ml={{ sm: 3, xs: 2 }}
                py={1}
              >
                Customer: {history.company}{" "}
              </Grid>
            </Grid>
          </Grid>
          {history?.events?.map((event, index: number) => {
            return (
              <Grid key={index} container alignItems="center" mt={2}>
                <img
                  src={event.type === "call" ? call : email}
                  width="40px"
                  alt="history icon"
                  className="history-icons"
                />
                <Grid
                  item
                  xs={10}
                  className="history-event"
                  ml={{ sm: 3, xs: 2 }}
                >
                  {event.msg}
                  <Grid container justifyContent="flex-end" py={2}>
                    {dayjs(event.date).format("D MMMM YYYY")}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Modal>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          disableRipple
          className="filter-menu-item"
          sx={{
            "&:hover": {
              background: "white",
            },
          }}
        >
          Filter
        </MenuItem>
        <RadioGroup
          value={filterColumn}
          onChange={(event) => setFilterColumn(event?.target.value)}
        >
          {Object.keys(columnTypeMap).map((column: string) => (
            <Radio
              key={column}
              value={column}
              size="sm"
              label={column.charAt(0).toUpperCase() + column.slice(1)}
              className="filter-menu-checkbox"
              color="primary"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "0.8rem",
                paddingLeft: "1rem",
              }}
            />
          ))}
        </RadioGroup>
        <MenuItem
          className="filter-menu-filter filter-menu-item"
          style={{ color: "#C5221F" }}
          disableRipple
          sx={{
            "&:hover": {
              background: "inherit",
            },
          }}
          onClick={resetAllFilters}
        >
          Reset all filters
        </MenuItem>
        <Grid container pl={2} my={1}>
          <Grid
            item
            className="filter-button"
            mr={2}
            onClick={() => {
              handleClose();
              setOpenFilter(true);
            }}
          >
            Apply filter
          </Grid>
          <Grid item className="filter-button" mr={2} onClick={handleClose}>
            Cancel
          </Grid>
        </Grid>
      </Menu>
      <Grid item xs={12} className="receivables-filters-bar" mt={5}>
        <Grid container justifyContent="flex-end">
          {Object.keys(filters).map((column: string) => {
            if (!isFilter[column])
              return <React.Fragment key={`filter_${column}`}></React.Fragment>;
            return (
              <Grid
                item
                key={`filter_${column}`}
                className="receivables-filters"
              >
                <Grid
                  container
                  alignItems="center"
                  style={{ cursor: "pointer" }}
                >
                  <Grid
                    item
                    onClick={() => {
                      setFilterColumn(column);
                      setOpenFilter(true);
                    }}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </Grid>
                  <ClearIcon
                    sx={{ fontSize: "22px" }}
                    onClick={() => resetFilter(column)}
                  />
                </Grid>
              </Grid>
            );
          })}
          <Grid item className="receivables-filters">
            <Grid
              container
              alignItems="center"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            >
              <img
                src={filterIcon}
                alt="filter"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Filters
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              className="lmao"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "inherit",
                  },
                },
              }}
              inputProps={{
                style: {
                  padding: "5px 10px",
                },
              }}
              variant="outlined"
              placeholder="Search Invoices"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Grid container className="receivables-warning" justifyContent="center">
          You have overdue invoices.&nbsp;
          <span style={{ color: "#C3142F", textAlign: "center" }}>
            {" "}
            Please either update or follow up with debtors to receive payment
          </span>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={5} sx={{ maxWidth: "95vw" }}>
        {receivables ? (
          <Grid container>
            <TableContainer className="custom-scrollbar">
              <Table
                sx={{
                  borderCollapse: "separate",
                }}
              >
                <TableHead>
                  <TableRow className="receivables-header">
                    {receivables?.columns?.map((column) => {
                      return (
                        <TableCell
                          key={column.headerName}
                          align="center"
                          className="receivables-column-header"
                          onClick={() => handleSortRequest(column.field)}
                        >
                          <TableSortLabel
                            active={sortColumn === column.field}
                            direction={sortOrder}
                          >
                            {column.headerName}
                          </TableSortLabel>
                        </TableCell>
                      );
                    })}
                    <TableCell
                      align="center"
                      className="receivables-column-header"
                      style={{ minWidth: "120px" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receivables?.rows?.map((row, index: number) => (
                    <TableRow key={`${index}_row`}>
                      {receivables?.columns?.map((column, colIndex: number) => (
                        <TableCell
                          key={`${index}_${colIndex}_col`}
                          className="receivables-row-value"
                          align="center"
                        >
                          {row[column.field]}
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item>
                            <Grid container className="box-wrap">
                              {/* <Grid item className="box2">
                              <span className="icon-text">Whatsapp</span>
                            </Grid> */}
                              <Grid item>
                                <img
                                  src={whatsapp}
                                  className="box1 actions-icon"
                                  alt="whatsapp"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container className="box-wrap">
                              {/* <Grid item className="box2">
                              <span className="icon-text">Email</span>
                            </Grid> */}
                              <Grid item>
                                <img
                                  src={emailIcon}
                                  alt="email"
                                  className="box1 actions-icon"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container className="box-wrap">
                              {/* <Grid item className="box2">
                              <span className="icon-text">View History</span>
                            </Grid> */}
                              <Grid item>
                                <img
                                  src={historyIcon}
                                  alt="history"
                                  onClick={() => {
                                    setHistory({
                                      company:
                                        receivables?.rows[index].customer,
                                      events: receivables?.rows[index].history,
                                    });
                                    setOpenHistory(true);
                                  }}
                                  className="box1 actions-icon"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Receivables;
