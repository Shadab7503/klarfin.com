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

export default function TransactionDatewiseNSE(props: any) {
    const [tranx, setTranx] = useState<any>([]);
    const { folio_id } = useParams();
    const [isError, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [columns, setColumns] = useState([
        {
            field: 'id', headerName: 'S.No', width: 90, renderHeader: () => (
                <strong>
                    {'S.No'}
                </strong>
            ),
        },
        {
            field:'AMC_NAME', headerName: 'Fund', width: 280, renderHeader: () => (
                <strong>
                    {'Fund'}
                </strong>
            ),
            renderCell:(params)=>{
                let { AMC_NAME } = params.row;
                return<div>{AMC_NAME.split("/")[1]}</div>
            }
        },
        {
            field: 'TRXN_TYPE',
            headerName: 'Transaction Type',
            width: 240, renderHeader: () => (
                <strong>
                    {'Transaction Type'}
                </strong>
            ),
            renderCell: (params) => {
                let { TRXN_TYPE, PAYMENT_MODE } = params.row;
                return <div>{TRXN_TYPE.split(" ")[1]}</div>;
            },
        },
        {
            field: 'AMOUNT', headerName: 'Amount', width: 240, renderHeader: () => (
                <strong>
                    {'Amount'}
                </strong>
            ), renderCell: (params) => {
                const { AMOUNT, TRXN_STATUS } = params.row;
               
                if ( TRXN_STATUS== 'Pending') {
                    return <Stack ><Typography variant='body1' >{AMOUNT}</Typography><Typography style={{ color: '#FDD017' }} variant='caption'>{TRXN_STATUS}</Typography></Stack>
                } else if(TRXN_STATUS == "Rejected / Reversal") {
                    return <Stack ><Typography variant='body1' >{AMOUNT}</Typography><Typography style={{ color: 'red' }} variant='caption'>{TRXN_STATUS.split("/")[0]}</Typography></Stack>
                } else {
                    return <Stack ><Typography variant='body1' >{AMOUNT}</Typography><Typography style={{ color: 'green' }} variant='caption'>{TRXN_STATUS}</Typography></Stack>
                }
            }
        },
        {
            field: 'AUTHORIZED_DATE_TIME', headerName: 'Transaction Date', width: 240, renderHeader: () => (
                <strong>
                    {'Transaction Date'}
                </strong>
            ),
        },
    ]);
    const today = new Date();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(format(today, 'MM/dd/yyyy'))
    console.log("folio :", folio_id)
    const dateConverter = (str) => {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var date = new Date(str);
        var mnth = (date.getMonth());
        var day = ("0" + date.getDate()).slice(-2);
        var year = date.getFullYear();
        return `${day}-${month[mnth]}-${year}`;
    }
    const [isDisable, SetisDisable] = useState(true);
    const [IntervalDate, setIntervalDate] = useState({
        startDate: dateConverter(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        endDate: dateConverter(new Date().getTime()),
    });

    const getTranxData = async () => {
        setLoading(true);
        try {
            const res = axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/nse/transaction`, { iin: folio_id, from_date: IntervalDate.startDate, to_date: IntervalDate.endDate, triggered_trxn: "N", initiated_by: "B" },
                { headers: { Authorization: `Bearer ${props.accessToken}` 
            }}).then((res)=>{
                const { data } = res;
                setLoading(false)
                if(!data.succ){
                    setError(true);
                    setMessage(data.message);
                    return;
                }
                setTranx(data.resData);
                console.log("res : ", res);
            })

        } catch {
            setLoading(false)
            setError(true);
            setMessage("Failed to Fetching Data from Server")
            return;
        }
        SetisDisable(true);
    }
    useEffect(() => {
        getTranxData()
    }, [])
  
    const changeHandler = (e) => {
        console.log(e)
        const startDate = dateConverter(e[0])
        const endDate = dateConverter(e[1])
        setIntervalDate({
            endDate: endDate,
            startDate: startDate,
        })
        console.log(IntervalDate)
        SetisDisable(false);
    }

    return <Grid container spacing={2} xs>
        <Grid item xs={12} sx={{ ml: 4, maxWidth: "90vw", height: '100vh' }}>
            <Snackbar
                open={isError}
                autoHideDuration={4000}
                onClose={() => setError(false)}
            >
                <Alert severity='error'
                    style={{ backgroundColor: "red" }}
                ><span style={{ color: "white" }} >{message}</span></Alert>
            </Snackbar>
            <AppBar style={{ backgroundColor: "white", display: 'flex', width: '76vw', flexDirection: 'row', justifyContent: "flex-end" }} position="static" elevation={0}   >
                <Toolbar sx={{ display: 'flex', alignItems: "center", margin: '0px' }}>
                    {/* <TextField
                        label="Scheme"
                        name="scheme"
                        onChange={changeHandler}
                        value={filter.scheme}
                        sx={{ mr: 2 }}
                        select
                        size='small'
                    >
                        {schemes.map((each, idx) => {
                            return (
                                <MenuItem key={idx} value={each.value}>
                                    {each.name}
                                </MenuItem>
                            );
                        })}
                    </TextField> */}
                    <div style={{ border: '1.5px solid rgb(210 205 205)', height: "39px", borderRadius: "4px", marginRight: "13px" }} >
                        <DateRangePicker
                            onChange={changeHandler}
                            size='md'
                            appearance='subtle'
                            placement="bottomEnd"
                            editable={true}
                            defaultValue={[new Date(IntervalDate.startDate), new Date(IntervalDate.endDate)]}
                            showOneCalendar={true}
                            character="  to  "
                            format="dd-MM-yyyy"
                            ranges={[]}
                            cleanable={false}
                        />
                    </div>
                    <Button style={{ marginTop: "-3px", height: "37px" }} variant="contained" disabled={isDisable} color="primary" onClick={getTranxData}>
                        Search
                    </Button>
                </Toolbar>
            </AppBar>
            <Typography style={{ fontWeight: 600 }} variant="h6">Transactions</Typography>
            <div style={{ height: '100vh', width: '75vw' }}>
                {loading ? <Loading /> : <DataGrid
                    sx={{ mt: 2 }}
                    //  hideFooter={true}
                    rowsPerPageOptions={[50, 100, 1000]}

                    rows={tranx.map((each: any, idx: number) => {
                        return { ...each, id: idx + 1 };
                    })}
                    columns={columns.map((each, idx) => {
                        return {
                            id: idx + 1,
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
    </Grid>
}
