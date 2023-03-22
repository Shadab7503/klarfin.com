import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Button, Grid, Modal, Snackbar, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

import TableCell from "@mui/material/TableCell";
import axios from 'axios';
import Loading from './Loading';

export default function InvestmentScreen(props) {

  const [investment, setInvestment] = useState({
    amount: 0,
    day1
      :
      "",
    day2
      :
      "",
    frequency
      :
      "",
    fund
      :
      "",
    portfolio
      :
      0,
    returns
      :
      "0"

  });

  const [loading, setLoading] = useState(false);
  const [investModal, setInvestModal] = useState(false);
  const [redeemModal, setRedeemModal] = useState(false);

  const [publicMsg,setPublicMsg] = useState('');

  const [redeemData,setRedeemData] = useState({amount:'',fund:''});
  const [investmentData,setInvestmentData] = useState({amount:'',fund:''});

  useEffect(() => {
    setLoading(true);

    axios
      .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

        {
          headers: { Authorization: `Bearer ${props.accessToken}` },

        })
      .then(({ data }) => {
        //   setReceivablesList(data.breakArray);
        setLoading(false);
        setInvestment(data.investment);

        setRedeemData({...redeemData,fund:data.investment?.fund})
        setInvestmentData({...investmentData,fund:data.investment?.fund})

      });
  }, [])


  const investmentHandler = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/invest`, investmentData,
      {
        headers: { Authorization: `Bearer ${props.accessToken}` }
      }).then(({data}) => {

        const {public_msg} = data;
        setPublicMsg(public_msg);
        setTimeout(() => {
          setInvestModal(false)
          
          
        }, 1000);

      

      })

  }


  const redeemHandler = (e) => {
e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeem`, redeemData,
      {
        headers: { Authorization: `Bearer ${props.accessToken}` }
      }).then(({data}) => {
        const {public_msg} = data;
        setPublicMsg(public_msg);
        setTimeout(() => {
          setRedeemModal(false)

        }, 1000);

        setTimeout(() => {
          setPublicMsg('')
        }, 6000);

      })

  }


  const statementHandler = () => {
  
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/statement`, {},
          {
            headers: { Authorization: `Bearer ${props.accessToken}` }
          }).then(({data}) => {
            const {public_msg} = data;
            setPublicMsg(public_msg);
            setTimeout(() => {
              setPublicMsg('')
              
            }, 6000);
    
          })
    
      }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  if (loading) return <Loading />;

  return (
    <div>


      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem' }}>

{
  investment && 
        <Grid item>
          <div className="cash-balance">
            <span className="cash-balance-heading">TOTAL RETURNS</span>
            <span
              className="cash-value"
              style={{
                color: "#338455",
              }}
            >
              Rs{" "}
              {Math.abs(+investment?.returns).toLocaleString("en-IN")}
            </span>
          </div>
        </Grid>
}


{ investment && 

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

          onClick={() => { setInvestModal(true) }}

        >Invest Now</Button>
}




      </div>

      {
        !investment && 
        <div style={{ margin: '2rem' }}>


        <Typography style={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: ' #00a1d147'
        }} variant="h5" component="h2">
          No investment Found
        </Typography>

      </div>
      }


{
  investment && 

  <div style={{ margin: '2rem' }}>


        <Typography style={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: ' #00a1d147'
        }} variant="h5" component="h2">
          Frequency of Investment
        </Typography>

        <Grid >
          <TableContainer className="custom-scrollbar">
            <Table
              sx={{
                borderCollapse: "separate",
              }}
            >
              <TableHead>
                <TableRow className="receivables-header">
                  <TableCell
                    key="type"
                    align="center"
                    className="receivables-column-header"

                  >
                    Frequency
                  </TableCell>

                  <TableCell
                    key="type"
                    align="center"
                    className="receivables-column-header"

                  >
                    Day
                  </TableCell>

                  <TableCell
                    key="type"
                    align="center"
                    className="receivables-column-header"

                  >
                    Amount (INR)
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>

                <TableRow key='key'>
                  <TableCell
                    key="key"
                    className="receivables-row-value"
                    style={{ textAlign: 'center' }}
                  >

                    {investment?.frequency}
                  </TableCell>

                  <TableCell
                    key="key"
                    className="receivables-row-value"
                    style={{ textAlign: 'center' }}
                  >

                {
                  investment?.frequency == 'Twice in a week' ? 
                  [investment?.day1, investment?.day2].join(', ') : 
                  investment?.day1
                }

                  </TableCell>

                  <TableCell
                    key="key"
                    className="receivables-row-value"
                    style={{ textAlign: 'center' }}
                  >

                    {investment?.amount.toLocaleString("en-IN")}

                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
}
      

{/* {
          publicMsg &&   <Snackbar
          open={publicMsg !== ""}
          autoHideDuration={6000}
          // onClose={handleSnackClose}
        >
          <Alert
            // onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
          >
            {publicMsg}
          </Alert>
        </Snackbar>
        } */}

      {
        investment && 

        <div style={{ margin: '2rem' }}>
        <Typography style={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: ' #00a1d147'
        }} variant="h5" component="h2">
          Investments of {props.user?.companyName}
        </Typography>

        <Grid >
          <TableContainer className="custom-scrollbar">
            <Table
              sx={{
                borderCollapse: "separate",
              }}
            >
              <TableHead>
                <TableRow className="receivables-header">
                  <TableCell
                    key="type"
                    align="center"
                    className="receivables-column-header"

                  >
                    Current Portfolio Amount (INR)
                  </TableCell>

                  <TableCell
                    key="type"
                    align="center"
                    className="receivables-column-header"

                  >
                    Actions
                  </TableCell>


                </TableRow>
              </TableHead>
              <TableBody>

                <TableRow key='key'>



                  <TableCell
                    key="key"
                    className="receivables-row-value"
                    style={{ textAlign: 'center' }}
                  >

                    {investment?.portfolio.toLocaleString("en-IN")}

                  </TableCell>

                  <TableCell align="center">
                    <Grid container justifyContent="center">
                      <Grid
                        item
                        className="bills-pay"
                        py={1}
                        px={2}
                        mx={2}
                        onClick={() => {
                          setRedeemModal(true)
                        }}
                      >
                        Redeem
                      </Grid>
                      <Grid
                        item
                        className="bills-pay"
                        py={1}
                        px={2}
                      onClick={() => {
                        statementHandler();
                      }}
                      >
                        Request Statement
                      </Grid>
                    </Grid>
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
      }


     

      <Modal
        open={investModal}
        onClose={() => { setInvestModal(!investModal) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" style={{ textAlign: 'center', marginBottom: '2rem' }} variant="h6" component="h2">
            Invest Now
          </Typography>

          {/* {
          publicMsg &&   <Snackbar
          open={publicMsg !== ""}
          autoHideDuration={6000}
          // onClose={handleSnackClose}
        >
          <Alert
            // onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
          >
            {publicMsg}
          </Alert>
        </Snackbar>
        } */}

<form onSubmit={investmentHandler}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Typography style={{ textAlign: 'center', marginLeft: '1rem', width: '50%' }} component="p">
              Investment Amount
            </Typography>
            <input onChange={(e)=>{setInvestmentData({...investmentData,amount:e.target.value})}}  required type="number" className='MuiOutlinedInput-input' />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Typography style={{ textAlign: 'center', marginLeft: '1rem', width: '50%' }} component="p">
              Fund
            </Typography>
            <input readOnly value={investment?.fund} onChange={(e)=>{setInvestmentData({...investmentData,fund:e.target.value})}} required type="text" className='MuiOutlinedInput-input' />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}>
            <Button type='submit' sx={{
              background: "#231955",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "2rem",
              fontSize: "0.8rem",
              marginTop: "1rem",
              color: '#fff',
              "&:hover": {
                backgroundColor: "#231955",
              },
            }} >Submit Order</Button>

          </div>
          </form>
        </Box>
      </Modal>


      <Modal
        open={redeemModal}
        onClose={() => { setRedeemModal(!redeemModal) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        
        <Box sx={style}>
          <Typography id="modal-modal-title" style={{ textAlign: 'center', marginBottom: '2rem' }} variant="h6" component="h2">
            Redeem Now
          </Typography>


        {
          publicMsg &&   <Snackbar
          open={publicMsg !== ""}
          autoHideDuration={6000}
          // onClose={handleSnackClose}
        >
          <Alert
            // onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
          >
            {publicMsg}
          </Alert>
        </Snackbar>
        }


          <form onSubmit={redeemHandler}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <Typography style={{ textAlign: 'center', marginLeft: '1rem', width: '50%' }} component="p">
                Investment Redemption Amount
              </Typography>
           
              <input max={investment?.portfolio} onChange={(e)=>{setRedeemData({...redeemData,amount:e.target.value})}} required type="number" className='MuiOutlinedInput-input' />

          
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Typography style={{ textAlign: 'center', marginLeft: '1rem', width: '50%' }} component="p">
                Fund
              </Typography>
              <input readOnly value={investment?.fund} onChange={(e)=>{setRedeemData({...redeemData,fund:e.target.value})}} required type="text" className='MuiOutlinedInput-input' />
            </div>

          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}>
            <Button type='submit' sx={{
              background: "#231955",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "2rem",
              fontSize: "0.8rem",
              marginTop: "1rem",
              color: '#fff',
              "&:hover": {
                backgroundColor: "#231955",
              },
            }} >Submit Redemption Order</Button>

          </div>

<p style={{textAlign:'center'}}> Maximum Redeemable Amount is <span style={{color:'red'}} >{ investment?.portfolio.toLocaleString("en-IN") }</span> INR</p>

          </form>
        </Box>
      </Modal>
    </div>
  );
}