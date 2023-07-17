import {
    Grid, AppBar,
    Toolbar,
    Button,
    MenuItem,
    TextField,
    Alert,
    Snackbar,
} from '@mui/material';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Stack } from '@mui/joy';
import { Typography } from '@material-ui/core';

export default function TransactionDatewise(props: any) {
    const [tranx, setTranx] = useState<any>([]);
    const { folio_id } = useParams();
    const [isError, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'S.No', width: 180 },
        {
            field: 'Transaction_type',
            headerName: 'Transaction Type',
            width: 250,
            renderCell: (params) => {
                let { Transaction_type, Modeofpayment } = params.row;
                if (Modeofpayment == 'NFET') {
                    Modeofpayment = 'NEFT';
                }
                const fullName = `${Transaction_type} ( ${Modeofpayment} )`;
                return <div>{Modeofpayment && fullName}</div>;
            },
        },
        {
            field: 'Amount', headerName: 'Amount', width: 250, renderCell: (params) => {
                const { Amount, Status } = params.row;
                if (Status == 'Under process') {
                    return <Stack ><Typography variant='body1' >{Amount}</Typography><Typography style={{ color: '#FDD017' }} variant='caption'>{Status}</Typography></Stack>
                } else {
                    return <Stack ><Typography variant='body1' >{Amount}</Typography><Typography style={{ color: 'green' }} variant='caption'>{Status}</Typography></Stack>
                }
            }
        },
        { field: 'Transaction_Date', headerName: 'Transaction Date', width: 250 },
    ]);
    const today = new Date();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(format(today, 'MM/dd/yyyy'))
    const [filter, setFilter] = useState({
        plan: 'RG',
        scheme: 'LP',
        date: date
    });

    const DateConverter = str => {
        var date = new Date(str);
        var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var year = date.getFullYear();
        return `${mnth}/${day}/${year}`;
    };

    const [IntervalDate, setIntervalDate] = useState({
        startDate: DateConverter(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
        endDate: DateConverter(new Date().getTime()),
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        if (name == "scheme") {
            const data = schemes.find(each => each.value == value);
            if (!data) { return; }
            setFilter({ ...filter, "plan": data.plan, "scheme": value });
        }
    }

    const schemes = [
        {
            value: "LP",
            name: "LOW DURATION FUND",
            plan: "RG",
            opt: "G",
        },
        {
            value: "ON",
            name: "OVERNIGHT FUND",
            plan: "GP",
            opt: "G",
        },
        {
            value: "LF",
            name: "LIQUID FUND",
            plan: "IG",
            opt: "G",
        },
    ];

    const getTranxData = async () => {
        setLoading(true);
        const middleDayTime = new Date(IntervalDate.startDate).getTime() + 24 * 60 * 60 * 1000;
        const middleDay = DateConverter(middleDayTime);
        //console.log(IntervalDate.startDate,middleDay,IntervalDate.endDate);
        
        try {
            const res = await Promise.all([
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/transaction`, { acno: folio_id, plan: filter.plan, scheme: filter.scheme, trdate: IntervalDate.startDate },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/transaction`, { acno: folio_id, plan: filter.plan, scheme: filter.scheme, trdate: middleDay },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/transaction`, { acno: folio_id, plan: filter.plan, scheme: filter.scheme, trdate: IntervalDate.endDate },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
            ]);
            const arrayData = [{ Amount: "", Transaction_Date: '', Transaction_type: '', Modeofpayment: '', Status: '' }];
            const data = res.map((each) => {
                arrayData.push(...each.data.tranxData);
            })
            //console.log("ArrayData : ", arrayData);
            const finalArray = arrayData.filter((each) => (each.Amount).length > 0)
            setTranx(finalArray);
            setLoading(false)
        } catch {
            setLoading(false)
            throw Error("Failed to Fetching Data from Server");
        }
        // console.log("filter : ",filter);
        // axios
        //     .post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/transaction`, { acno: folio_id, plan: filter.plan, scheme: filter.scheme, trdate: filter.date },
        //         {
        //             headers: { Authorization: `Bearer ${props.accessToken}` }
        //         })
        //     .then(({ data }) => {
        //         setTranx(data.tranxData);
        //         setLoading(false);
        //     });
    }

    useEffect(() => {
        getTranxData()
    }, [])
    const getDataHandler = (e) => {
        getTranxData();
    }

    const CheckRangeHandler = (value) => {
        if (value[0] == 0 || value[1] == 0) {
            setError(true);
            setMessage("Please Enter Valid Date Range");
            return;
        }
        if (value[0] > new Date() || value[1] > new Date()) {
            setError(true);
            setMessage("Please Enter Valid Date Range,Future Data Not Available")
            return;
        }

        const endDate = DateConverter(value[1])
        const startDate = DateConverter(value[0]);
        if (new Date(endDate).getTime() - new Date(startDate).getTime() > 2 * 24 * 60 * 60 * 1000) {
            setError(true)
            setMessage("Please Enter Valid Date Range ,Date interval should be maximum 3 Days")
            return;
        } else if (new Date(endDate).getTime() - new Date(startDate).getTime() < 2 * 24 * 60 * 60 * 1000) {
            setIntervalDate({
                startDate: DateConverter(value[0]),
                endDate: DateConverter(value[1])
            })
        }
    }

    return <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height: '100vh' }}>
        <Snackbar
            open={isError}
            autoHideDuration={4000}
            onClose={() => setError(false)}
        >
            <Alert severity='error'
                style={{ backgroundColor: "red" }}
                ><span style={{color:"white"}} >{message}</span></Alert>
        </Snackbar>
        <AppBar style={{ backgroundColor: "white", width: '55%', marginLeft: "50%" }} position="static" elevation={0}  >
            <Toolbar>
                <TextField
                    label="Scheme"
                    name="scheme"
                    onChange={changeHandler}
                    value={filter.scheme}
                    sx={{ m: 1, minWidth: 120 }}
                    select
                    fullWidth
                >
                    {schemes.map((each, idx) => {
                        return (
                            <MenuItem key={idx} value={each.value}>
                                {each.name}
                            </MenuItem>
                        );
                    })}
                </TextField>
                <div style={{ border: '1.5px solid rgb(210 205 205)', margin: '10px', borderRadius: "5px" }} >
                    <DateRangePicker
                        style={{ width: '250px', height: "34px", margin: '10px' }}
                        //onChange={(value) => changeIntervalDate(value)}
                        size='lg'
                        appearance='subtle'
                        onOk={(value) => CheckRangeHandler(value)}
                        placement="bottomEnd"
                        editable={true}
                        defaultValue={[new Date(Date.now() - 2*24*60*60*1000),new Date()]}
                        showOneCalendar={true}
                    />
                </div>
                {/* <TextField
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
                /> */}
                <Button variant="contained" color="primary" onClick={getDataHandler}>
                    Search
                </Button>
            </Toolbar>
        </AppBar>
        <h2 style={{ marginBottom: '20px' }}>Transactions</h2>
        <div style={{ height: '100vh', width: '100%' }}>
            {loading ? <Loading /> : <DataGrid
                //  hideFooter={true}
                rowsPerPageOptions={[50, 100, 1000]}

                rows={tranx.map((each: any, idx: number) => {
                    return { ...each, id: idx + 1 };
                })}
                columns={columns.map(each => {
                    return {
                        ...each, headerAlign: 'center',
                        align: 'center',
                        sx: {
                            size: 2,
                        },
                    }
                })}
            />}
        </div>
    </Grid>
}

