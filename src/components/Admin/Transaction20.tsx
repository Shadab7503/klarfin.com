import {
    Grid, AppBar,
    Toolbar,
    Button,
    MenuItem,
    TextField,
} from '@mui/material';
import { DataGrid, GridValueSetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Stack } from '@mui/joy';
import { Typography } from '@material-ui/core';
export default function Transaction20(props: any) {
    const [Lasttranx, setLasttranx] = useState([]);
    const { folio_id } = useParams();
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

    const changeHandler =(event)=>{
        const {name,value} = event.target;
        if(name=="scheme"){
          const data = schemes.find(each=>each.value == value);
          if(!data){ return ;}
          setFilter({...filter,"plan":data.plan,"scheme":value});
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
                setLoading(false);
            });
    }
    useEffect(() => {
        getLastTwentyTransaction()
    }, [])

    return (
        loading ? <Loading /> : <>
            <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height: '100vh' }}>
                <AppBar style={{ backgroundColor: "white",width:'38%' ,marginLeft:"70%" }} position="static" elevation={0}  >
                    <Toolbar>
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
                        <Button variant="contained" color="primary" onClick={filterHandler}>
                            Search
                        </Button>
                    </Toolbar>
                </AppBar>
                <h2>Last 20 Transactions</h2>
                <div style={{ height: '100vh', width: '100%' }}>
                    <DataGrid
                        hideFooter={true}
                        rowsPerPageOptions={[20]}
                        rows={Lasttranx.map((each: any, idx: number) => {
                            return { ...each, id: idx + 1 };
                        })}
                        columns={columns.map(each => {
                            return { ...each, 
                                headerAlign: 'center',
                                align:'center',
                                sx: {
                                  size:2,
                                },}
                        })}
                    />
                </div>
            </Grid></>
    )
}