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
import RadioGroup from '@mui/material/RadioGroup';
//import RadioGroup from "@mui/joy/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { billsData, BillsRow, BillsData } from "../../dummy_data/data";
import filterIcon from "../../images/filters.png";
import {
  Filter,
  Filters,
  ColumnTypeMap,
  ColumnBoolean,
  Invoice,
  InvoiceNumberMap,
} from "../../utils/interface";

const columnTypeMap: ColumnTypeMap = {
  suppliers: "string",
  date: "date",
  category: "string",
  amount: "number",
  "balance amount": "number",
  "ageing days": "number",
};

const defaultFilter = {
  min: "",
  max: "",
  value: "",
  type: "contains",
};

const defaultIsFilter = {
  suppliers: false,
  date: false,
  category: false,
  amount: false,
  "balance amount": false,
  "ageing days": false,
};

const defaultFilters = {
  suppliers: { ...defaultFilter, dataType: "string" },
  date: { ...defaultFilter, dataType: "date" },
  category: { ...defaultFilter, dataType: "string" },
  amount: { ...defaultFilter, dataType: "number" },
  "balance amount": { ...defaultFilter, dataType: "number" },
  "ageing days": { ...defaultFilter, dataType: "number" },
} as Filters;

const Bills = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [globalMinDate, setGlobalMinDate] = useState<Dayjs>();
  const [globalMaxDate, setGlobalMaxDate] = useState<Dayjs>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
  const [sortColumn, setSortColumn] = useState<keyof BillsRow | "">("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterColumn, setFilterColumn] = useState<string>("");
  const [fromValue, setFromValue] = useState<Dayjs | null>();
  const [toValue, setToValue] = useState<Dayjs | null>();
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<ColumnBoolean>(defaultIsFilter);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentSupplier, setCurrentSupplier] = useState<string>("");
  const [invoiceSelected, setInvoiceSelected] = useState<InvoiceNumberMap>({});
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [validating, setValidating] = useState<ColumnBoolean>({
    customer: false,
    date: false,
    amount: false,
    "balance amount": false,
    "ageing days": false,
  });
  const [bills, setBills] = useState<BillsData>(billsData);
  var open = Boolean(anchorEl);

  useEffect(() => {
    if (Object.keys(bills).length > 0) {
      let minDate: Dayjs;
      let maxDate: Dayjs;
      bills.rows.forEach((row) => {
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
      setGlobalMaxDate(maxDate!);
      setGlobalMinDate(minDate!);
      setFromValue(minDate!);
      setToValue(maxDate!);
    }
  }, [bills]);

  useEffect(() => {
    let originalRows: BillsRow[] = billsData.rows;
    const filteredData: BillsRow[] = originalRows.filter((row: BillsRow) => {
      let keep: boolean = true;
      (Object.keys(row) as (keyof BillsRow)[]).forEach((column) => {
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
    });
    setBills((r) => ({ ...r, rows: filteredData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilter]);

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const sortArray = (
    arr: BillsRow[],
    orderBy: string,
    column: keyof BillsRow
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

  const handleSortRequest = (column: keyof BillsRow) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
    setBills({
      ...bills,
      rows: sortArray(
        bills.rows,
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

  const showPayment = (invoice: InvoiceNumberMap, supplier: string) => {
    const paymentColumns: (keyof Invoice)[] = [
      "Invoice Date",
      "Invoice No.",
      "Invoice Amount (INR)",
      "Amount Due (INR)",
    ];
    return (
      <Grid
        container
        className="modal-box"
        style={{ width: "900px", background: "#F5F6F7" }}
        p={{ sm: 5, xs: 2 }}
      >
        <Grid container justifyContent="flex-end">
          <ClearIcon
            style={{
              cursor: "pointer",
              stroke: "#ED6C30",
              strokeWidth: 2,
            }}
            onClick={() => setOpenPayment(false)}
          />
        </Grid>
        <Grid item xs={12} className="history-customer" py={1}>
          &nbsp; &nbsp;Supplier: {supplier}
        </Grid>
        <Grid container mt={2}>
          <TableContainer className="custom-scrollbar">
            <Table
              sx={{
                borderCollapse: "separate",
              }}
            >
              <TableHead>
                <TableRow className="receivables-header">
                  {paymentColumns.map((column) => {
                    return (
                      <TableCell
                        key={column}
                        align="center"
                        className="receivables-column-header"
                      >
                        {column}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    align="center"
                    className="receivables-column-header"
                  >
                    Payment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(invoice).map((invoiceNo: string) => (
                  <React.Fragment key={`${invoiceNo}_row`}>
                    <TableRow>
                      {paymentColumns.map(
                        (column: keyof Invoice, colIndex: number) => (
                          <TableCell
                            key={`${invoiceNo}_${colIndex}_col`}
                            className="receivables-row-value"
                            align="center"
                          >
                            {invoice[Number(invoiceNo)][column]}
                          </TableCell>
                        )
                      )}
                      <TableCell align="center">
                        <Grid container justifyContent="center">
                          <TextField
                            className="filter-label"
                            variant="standard"
                            value={invoiceSelected[Number(invoiceNo)].Payment}
                            placeholder="Put Amount"
                            inputProps={{
                              min: 0,
                              style: {
                                padding: "5px",
                                textAlign: "center",
                              },
                            }}
                            sx={{ maxWidth: "120px" }}
                            type="number"
                            InputProps={{
                              disableUnderline: true,
                            }}
                            onChange={(event) =>
                              setInvoiceSelected((prev) => {
                                return {
                                  ...prev,
                                  [Number(invoiceNo)]: {
                                    ...prev[Number(invoiceNo)],
                                    Payment: event.target.value,
                                  },
                                };
                              })
                            }
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
                <TableRow>
                  {[...Array(3)].map((_, index: number) => (
                    <TableCell
                      key={`temp${index}`}
                      className="receivables-row-value"
                      style={{ borderBottom: "0px", paddingTop: "2rem" }}
                      align="center"
                    ></TableCell>
                  ))}
                  <TableCell
                    className="receivables-row-value"
                    align="center"
                    style={{
                      borderBottom: "0px",
                      color: "#30A8D8",
                      fontSize: "1.2rem",
                      paddingTop: "2rem",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className="receivables-row-value"
                    style={{
                      borderBottom: "0px",
                      fontSize: "1.2rem",
                      paddingTop: "2rem",
                    }}
                    align="center"
                  >
                    {Object.entries(invoiceSelected).reduce(
                      (prevValue: number, [key, value]) => {
                        if (value.Payment === "") return 0;
                        return Number(value.Payment) + prevValue;
                      },
                      0
                    )}{" "}
                    INR
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container justifyContent="flex-end" mt={1}>
          <Grid item className="pay-invoice">
            Pay
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container px={1}>
      <Modal open={openFilter} onClose={() => setOpenFilter(false)}>
        {showFilter(filterColumn)}
      </Modal>
      <Modal open={openPayment} onClose={() => setOpenPayment(false)}>
        {showPayment(invoiceSelected, currentSupplier)}
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

      <h1 style={{    width: '100%',
    textAlign: 'center',
    marginTop: '6rem'}}>The data below is illustrative only</h1>
    
      <Grid item xs={12} mt={5}>
        <Grid container>
          <TableContainer className="custom-scrollbar">
            <Table
              sx={{
                borderCollapse: "separate",
              }}
            >
              <TableHead>
                <TableRow className="receivables-header">
                  {bills?.columns?.map((column) => {
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
                {bills?.rows?.map((row, index: number) => (
                  <TableRow key={`${index}_row`}>
                    {bills?.columns?.map((column, colIndex: number) => (
                      <TableCell
                        key={`${index}_${colIndex}_col`}
                        className="receivables-row-value"
                        align={column.field === "suppliers" ? "left" : "center"}
                      >
                        {colIndex === 0 ? (
                          <Checkbox
                            checked={row["invoice number"] in invoiceSelected}
                            onChange={(event) => {
                              if (
                                column.field === "suppliers" &&
                                event.target.checked
                              ) {
                                if (currentSupplier !== row[column.field]) {
                                  setInvoiceSelected({});
                                }
                                setCurrentSupplier(row[column.field]);
                                setInvoiceSelected((prev) => {
                                  return {
                                    ...prev,
                                    [row["invoice number"]]: {
                                      "Invoice Date": row["date"],
                                      "Invoice No.": row["invoice number"],
                                      "Invoice Amount (INR)": row["amount"],
                                      "Amount Due (INR)": row["balance amount"],
                                      Payment: "",
                                    },
                                  };
                                });
                              } else {
                                setInvoiceSelected((prev) => {
                                  const copy = { ...prev };
                                  delete copy[row["invoice number"]];
                                  if (Object.keys(copy).length === 0)
                                    setCurrentSupplier("");
                                  return copy;
                                });
                              }
                            }}
                          />
                        ) : null}
                        {row[column.field]}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Grid container justifyContent="center">
                        <Grid
                          item
                          className="bills-pay"
                          py={1}
                          px={2}
                          // onClick={() => {
                          //   if (currentSupplier !== "") setOpenPayment(true);
                          // }}
                        >
                          Pay
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bills;
