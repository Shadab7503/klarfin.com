import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { Link, useParams } from 'react-router-dom';
import Transactions from './transaction';
import SearchBar from './searchBar';
import { format } from 'date-fns';
import { Paper, Typography } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import Scheme from './Scheme';




export default function Orders(props: any) {

    const today = new Date();
    const formattedToday = format(today, 'MM/dd/yyyy');
    const [investmentList, setInvestmentList] = useState([]);
    const [filter, setFilter] = useState({
        plan: 'IG',
        scheme: 'LF',
        date: formattedToday
    });

    const { folio_id } = useParams();
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'Id', width: 180 },
        { field: 'Fund', headerName: 'Fund', width: 180 },
        { field: 'Scheme', headerName: 'Scheme', width: 180 },
        { field: 'Plan', headerName: 'Plan', width: 180 },
        { field: 'Options', headerName: 'Options', width: 180 },
        { field: 'AcNo', headerName: 'AcNo', width: 180 },
        { field: 'Amount', headerName: 'Amount', width: 180 },
        { field: 'TrType', headerName: 'TrType', width: 180 },
        { field: 'Agent', headerName: 'Agent', width: 180 },
        { field: 'SubBroker', headerName: 'SubBroker', width: 180 },
        { field: 'SubArnCode', headerName: 'SubArnCode', width: 180 },
        { field: 'EUIN', headerName: 'EUIN', width: 180 },
        { field: 'EUINDecFlag', headerName: 'EUINDecFlag', width: 180 },
        { field: 'ChqBank', headerName: 'ChqBank', width: 180 },
        { field: 'PayMode', headerName: 'PayMode', width: 180 },
        { field: 'REFNO', headerName: 'REFNO', width: 180 }
    ]);


    const [loading, setLoading] = useState(false);


    const getReceivablesData = (filter: { page: number, limit: number }) => {
        setLoading(true);
        const { page, limit } = filter;
        axios
            .get(`${process.env.REACT_APP_BACKEND_HOST}v1/super/orders`,
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` },
                    params: {
                        folio: folio_id
                    }
                })
            .then(({ data }) => {
                setInvestmentList(data.orders);
                setLoading(false);

            });

    }

    useEffect(() => {
        getReceivablesData({ page: 1, limit: 20 })

    }, [])


    const filterHandler = (data) => {
        console.log(data);
        setFilter({ ...data });
    }


    if (loading) return <Loading />;


    return <div>



        <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height: '100vh' }}>

            <div>
                <Button style={{marginRight:'2rem'}} variant="contained" color="primary" onClick={() => { }}>
                    <Link to={`/dashboardSuper/investment/tranx/${folio_id}`} >
                    Transactions
                    </Link>
                </Button>
                <Button variant="contained" color="primary" onClick={() => { }}>
                    
                    <Link to={`/dashboardSuper/investment/redeem/${folio_id}`} >
                    Redeems
                    </Link>
                </Button>
              
            </div>


            <SearchBar filter={filter} filterDataHandler={filterHandler} />



            <Scheme folio_id={folio_id} filter={filter} accessToken={props.accessToken} />



            <h2 style={{ marginBottom: '20px' }}>Orders</h2>


            <div style={{ height: '100vh', width: '100%' }}>

                <DataGrid
                    //  hideFooter={true}
                    rowsPerPageOptions={[50, 100, 1000]}

                    rows={investmentList.map((each: any, idx: number) => {
                        console.log(each);

                        return { ...each, id: idx + 1 };

                    })}

                    columns={columns.map(each => {

                        return { ...each }
                    })}

                />
            </div>


            {/* <Transactions filter={filter} accessToken={props.accessToken} /> */}


        </Grid>
        <div style={{ marginTop: '10rem' }}>

        </div>
    </div>

}