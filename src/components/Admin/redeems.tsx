import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import SearchBar from './searchBar';
import Popup from './model';


export default function Redeems(props: any) {

    const [tranx, setTranx] = useState([]);
    const [refno,setRefno] = useState();
    const [popup,setPopup] = useState(false);
    

    const  { folio_id } = useParams();
    const [columns, setColumns] = useState([
        { field: 'fund', headerName: 'Fund', width: 180 },
        { field: 'acno', headerName: 'Acno', width: 180 },
        { field: 'scheme', headerName: 'Scheme', width: 180 },
        { field: 'plan', headerName: 'Plan', width: 180 },
        { field: 'options', headerName: 'Options', width: 180 },
        { field: 'RedFlag', headerName: 'RedFlag', width: 180 },
        { field: 'UnitamtFlag', headerName: 'UnitAmtFlag', width: 180 },
        { field: 'UnitAmtValue', headerName: 'UnitAmtValue', width: 180 },
        { field: 'Tpin', headerName: 'Tpin', width: 180 },
        { field: 'bank', headerName: 'Bank', width: 180 },
        { field: 'oldihno', headerName: 'Oldihno', width: 180 },
        { field: 'trdate', headerName: 'Trdate', width: 180 },
        { field: 'entdate', headerName: 'Entdate', width: 180 },
        { field: 'ShowInstaStatus', headerName: 'ShowInstaStatus', width: 180 },
        { field: 'OTP', headerName: 'OTP', width: 180 },
        { field: 'OTPReference', headerName: 'OTPReference', width: 180 },
        { field: 'SelfValidate', headerName: 'SelfValidate', width: 180 },
        { field: 'Return_code', headerName: 'Return_code', width: 180 },
        { field: 'REFNO', headerName: 'REFNO', width: 180 },
        { field: 'Date_Time', headerName: 'Date_Time', width: 180 },
        {
            field: 'Actions', headerName: 'action', width: 420, renderCell: (params: any) => {
            
                return <div style={{ display: 'flex', justifyContent:'space-between' }}>

                    <Grid
                        item
                        className="bills-pay"
                        py={1}
                        px={2}
                        style={{marginRight:'1rem'}}
                        onClick={()=>{
                            setRefno(params.row.REFNO);
                            setPopup(true);
                         }}

                    >
                        Check status
                    </Grid>
                </div>
            }
        }
      ]);


    const [loading, setLoading] = useState(false);
    const getTranxData = () => {
        setLoading(true);
  
        axios
            .post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeems`,{acno:folio_id,plan:filter.plan,scheme:filter.scheme,trdate:filter.date},
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` }
                })
            .then(({ data }) => {
                setTranx(data.redeem);
                setLoading(false);
            });

    }

  

    const today = new Date();
    
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
    useEffect(() => {
        getTranxData()
    }, [filter])


    if (loading) return <Loading />;

    return    <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height: '100vh' }}>

<Popup handleClose={setPopup} accessToken={props.accessToken} isOpen={popup} refno={refno} ></Popup>
<SearchBar filter={filter} filterDataHandler={filterHandler} setDate={setDate}/>

        <h2 style={{ marginBottom: '20px' }}>Redeems</h2>


        <div style={{ height: '100vh', width: '100%' }}>

            <DataGrid
                //  hideFooter={true}
                rowsPerPageOptions={[50, 100, 1000]}
             
                rows={tranx.map((each: any, idx: number) => {
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