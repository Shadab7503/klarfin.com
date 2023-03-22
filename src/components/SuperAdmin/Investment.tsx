import { Grid } from '@mui/material';
import { DataGrid, GridCellEditStopParams, MuiEvent } from '@mui/x-data-grid';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import React, { useEffect, useState } from 'react';
import Form from './Form';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Dashboard/Loading';

export default function Investment(props: any) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const [investmentList, setInvestmentList] = useState([]);

    const actionHandler = (type,id)=>{
        setLoading(true);
        
        if(type == 'delete') {
           
            axios
            .delete(`${process.env.REACT_APP_BACKEND_HOST}v1/super/investment`,
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` },
                    data: {
                        id: id
                      }
                })
            .then(({ data }) => {
                // setInvestmentList(data.investments);
        getReceivablesData({ page: 1, limit: 20 })

                setLoading(false);
    
            });

        }

        if(type == 'edit') {
            axios
            .patch(`${process.env.REACT_APP_BACKEND_HOST}v1/super/investment`,{
                id: id
              },
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` },
                 
                })
            .then(({ data }) => {
                // setInvestmentList(data.investments);
                setLoading(false);
    
            });
        }
    }

    const [columns, setColumns] = useState([
        { field: 'idx', headerName: 'SN', width: 180 },
        { field: 'username', headerName: 'User Name', width: 180 },
        { field: 'frequency', headerName: 'Frequency', width: 180 },
        { field: 'amount', headerName: 'Amount', width: 180 },
        { field: 'fund', headerName: 'Fund', width: 180 },
        { field: 'portfolio', headerName: 'Current Portfolio amount', width: 180 },
        { field: 'returns', headerName: 'Return generated', type: 'number' },
        {
            field: 'Actions', headerName: 'action', width: 420, renderCell: (params: any) => {
                console.log('params', params)
                return <div style={{ display: 'flex' }}>

                    <Grid
                        item
                        className="bills-pay"
                        py={1}
                        px={2}

                        onClick={()=>{navigate(`/dashboardSuper/add-investment/${params.id}`)}}

                    >
                        Edit
                    </Grid>
                    <Grid
                        item
                        className="bills-pay"
                        style={{ background: 'red' }}
                        py={1}
                        px={2}
                        onClick={()=>{
                            if(!window.confirm('Are you sure to delete the investment?')) return;
                            actionHandler('delete',params.id)
                        }}

                    >
                        Delete
                    </Grid>
                    <span>

                    </span>
                </div>
            }
        }
    ]);


    const [loading, setLoading] = useState(false);


    const getReceivablesData = (filter: { page: number, limit: number }) => {
        setLoading(true);
        const { page, limit } = filter;
        axios
            .get(`${process.env.REACT_APP_BACKEND_HOST}v1/super/investment`,
                {
                    headers: { Authorization: `Bearer ${props.accessToken}` },
                    params: {
                        limit,
                        page
                    }
                })
            .then(({ data }) => {
                setInvestmentList(data.investments);
                setLoading(false);

            });

    }

    useEffect(() => {
        getReceivablesData({ page: 1, limit: 20 })

    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    if (loading) return <Loading />;

    return <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height: '100vh' }}>



        <Link to="/dashboardSuper/add-investment">
            <Button type='submit' sx={{
          background: "#231955",
          fontFamily: "Work Sans",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          borderRadius: "2rem",
          fontSize: "0.8rem",
          color: '#fff',
          "&:hover": {
            backgroundColor: "#231955",
          },
        }}

        

        >Add Investment</Button>
        </Link>
        <h2 style={{ marginBottom: '20px' }}>All Investments</h2>


        <div style={{ height: '100vh', width: '100%' }}>

            <DataGrid
                //  hideFooter={true}
                rowsPerPageOptions={[50, 100, 1000]}
             
                rows={investmentList.map((each: any, idx: number) => {
                    console.log(each);
                    const obj = {};
                    Object.keys(each).forEach(key=>{
                        let value = each[key];
                        if(key == 'amount' || key == 'portfolio' || key == 'returns') {
                            value = value.toLocaleString("en-IN");
                        }
                        obj[key] = value;
                    })
                  
                    return { ...obj, id: each._id, idx: idx + 1 }
                })}

                columns={columns.map(each => {
                   
                    return { ...each, width: 180 }
                })}

            />
        </div>

      

    </Grid>
}