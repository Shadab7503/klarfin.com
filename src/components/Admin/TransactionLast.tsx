import {
    Grid, AppBar,
    Toolbar,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import { DataGrid, GridValueSetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Stack } from '@mui/joy';
export default function Transaction20(props: any) {
    const [Lasttranx, setLasttranx] = useState([]);
    const { folio_id } = useParams();
    const [columns, setColumns] = useState([
        {
            field: 'id', headerName: 'S.No', width: 90, renderHeader: () => (
                <strong>
                    {'S.No'}
                </strong>
            ),
        },
        {
            field: 'Transaction_type',
            headerName: 'Transaction Type',
            width: 360,
            renderHeader: () => (
                <strong>
                    {'Transaction Type'}
                </strong>
            ),
            renderCell: (params) => {
                let { Transaction_type, Modeofpayment } = params.row;
                if (Modeofpayment == 'NFET') {
                    Modeofpayment = 'NEFT';
                }
                const fullName = `${Transaction_type} ( ${Modeofpayment} )`;
                return <div>{Modeofpayment? fullName : Transaction_type  }</div>;
            },
        },
        {
            field: 'Amount', headerName: 'Amount', width: 340,
            renderHeader: () => (
                <strong>
                    {'Amount'}
                </strong>
            ), renderCell: (params) => {
                const { Amount, Status } = params.row;
                if (Status == 'Under process') {
                    return <Stack ><Typography variant='body1' >{Amount}</Typography><Typography style={{ color: '#FDD017' }} variant='caption'>{Status}</Typography></Stack>
                } else {
                    return <Stack ><Typography variant='body1' >{Amount}</Typography><Typography style={{ color: 'green' }} variant='caption'>{Status}</Typography></Stack>
                }
            }
        },
        {
            field: 'Transaction_Date', headerName: 'Transaction Date', width: 340, renderHeader: () => (
                <strong>
                    {'Transaction Date'}
                </strong>
            ),
        },

    ]);
    const today = new Date();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(format(today, 'MM/dd/yyyy'))
    const [filter, setFilter] = useState({
        plan: 'RG',
        scheme: 'LP',
        date: date
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
          plan: "IG",
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

    const filterHandler = (data) => {
        getLastTwentyTransaction()
    }
    const getLastTwentyTransaction = () => {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/lasttransaction`, { Folio: folio_id, plan: filter.plan, scheme: filter.scheme, trdate: filter.date },
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` }
                })
            .then(({ data }) => {
                setLasttranx(data.tranxData);
                console.log(data.tranxData)
                setLoading(false);
            }); 
    }
    useEffect(() => {
        getLastTwentyTransaction()
    }, [])

    return (
        <Grid container spacing={2} xs>
            <Grid item xs={12} sx={{ ml: 4, maxWidth: "90vw", height: '100vh' }}>
                <AppBar style={{ backgroundColor: "white", display: 'flex', width: '76vw', flexDirection: 'row', justifyContent: "flex-end" }} position="static" elevation={0}  >
                    <Toolbar sx={{ display: 'flex', alignItems: "center", margin: '0px' }}>
                        <TextField
                            label="Scheme"
                            name="scheme"
                            size='small'
                            onChange={changeHandler}
                            value={filter.scheme}
                            sx={{ mr: 2 }}
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
                        <Button style={{ marginTop: "-3px", height: "37px" }} variant="contained" color="primary" onClick={filterHandler}>
                            Search
                        </Button>
                    </Toolbar>
                </AppBar>
                <Typography style={{ fontWeight: 600 }} variant="h6">Last 20 Transactions</Typography>
                <div style={{ height: '100vh', width: '75vw' }}>
                    {loading ? <Loading /> : <DataGrid
                        sx={{ mt: 2 }}
                        hideFooter={true}
                        rowsPerPageOptions={[20]}
                        rows={Lasttranx.map((each: any, idx: number) => {
                            return { ...each, id: idx + 1 };
                        })}
                        columns={columns.map(each => {
                            return {
                                ...each,
                                headerAlign: 'center',
                                align: 'center',
                                sx: {
                                    size: 2,
                                },
                            }
                        })}
                    />
                    }
                </div>
            </Grid>
        </Grid>
    )
}