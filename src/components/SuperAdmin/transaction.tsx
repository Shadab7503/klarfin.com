import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import SearchBar from './searchBar';


export default function Transactions(props: any) {

    const [tranx, setTranx] = useState([]);
    const [Lasttranx , setLasttranx] = useState([]);

    const  { folio_id } = useParams();
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'Id', width: 180 },
        { field: 'Amount', headerName: 'Amount', width: 180 },
        { field: 'Bankacno', headerName: 'Bankacno', width: 180 },
        { field: 'Bankname', headerName: 'Bankname', width: 180 },
        { field: 'Cramt', headerName: 'Cramt', width: 180 },
        { field: 'DBamt', headerName: 'DBamt', width: 180 },
        { field: 'Entdt', headerName: 'Entdt', width: 180 },
        { field: 'IHno', headerName: 'IHno', width: 180 },
        { field: 'Modeofpayment', headerName: 'Modeofpayment', width: 180 },
        { field: 'Remarks', headerName: 'Remarks', width: 180 },
        { field: 'Return_Code', headerName: 'Return_Code', width: 180 },
        { field: 'Return_Msg', headerName: 'Return_Msg', width: 180 },
        { field: 'Status', headerName: 'Status', width: 180 },
        { field: 'Transaction_Date', headerName: 'Transaction_Date', width: 180 },
        { field: 'Transaction_type', headerName: 'Transaction_type', width: 180 },
        { field: 'Txntype', headerName: 'Txntype', width: 180 },
        { field: 'Typeoftrxn', headerName: 'Typeoftrxn', width: 180 },
        { field: 'dd_trdate', headerName: 'dd_trdate', width: 180 },
       
    ]);


    const today = new Date();
    const [loading, setLoading] = useState(false);
    const [date,setDate] = useState(format(today, 'MM/dd/yyyy'))
    

    const [filter, setFilter] = useState({
        plan: 'IG',
        scheme: 'LF',
        date: date
    });

    const filterHandler = (data) => {
        console.log(data);
        setFilter({ ...data });
    }


    const getTranxData = () => {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/transaction`,{acno:folio_id,plan:filter.plan,scheme:filter.scheme,trdate:filter.date},
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` }
                })
            .then(({ data }) => {
                setTranx(data.tranxData);
                setLoading(false);
            });
    }

    const getLastTwentyTransaction = () =>{
        setLoading(true);
      axios
          .post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/lasttransaction`,{Folio:folio_id,plan:filter.plan,scheme:filter.scheme,trdate:filter.date},
              {
                  headers: { Authorization: `Bearer ${props.accessToken}`}
              })
          .then(({ data }) => {
              setLasttranx(data.tranxData);
              setLoading(false);
          });
    }


    useEffect(() => {
        getTranxData()
        getLastTwentyTransaction()
    }, [filter])

   
    return    <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height: '100vh' }}>


<SearchBar filter={filter} filterDataHandler={filterHandler} setDate={setDate} />


        <h2 style={{ marginBottom: '20px' }}>Transactions</h2>


        <div style={{ height: '100vh', width: '100%' }}>

            {  loading? <Loading />:<DataGrid
                //  hideFooter={true}
                rowsPerPageOptions={[50, 100, 1000]}
             
                 rows={tranx.map((each: any, idx: number) => {
                    console.log(each);
                    return {...each,id:idx+1};
                })}
                columns={columns.map(each => {
                    return { ...each }
                })}
            />}
        </div>
        <h2>Last 20 Transactions</h2>
        <div style={{ height: '100vh', width: '100%' }}>

            <DataGrid
                hideFooter={true}
                rowsPerPageOptions={[20]}
                rows={Lasttranx.slice(0,20).map((each: any, idx: number) => {
                    console.log(each);
                    return {...each,id:idx+1};
                })}
                columns={columns.map(each => {
                    return { ...each }
                })}
            />
        </div>

    </Grid>
}