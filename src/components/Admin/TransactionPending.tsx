import { Grid, Stack, Typography, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RTGSPendingPayment from './CreateOrder/RTGSPendingPayment';
import { useAppContext } from '../../Store/AppContext';
import { FormatNumber } from '../../utils/formatNumber';

export default function TransactionPending({ accessToken }) {
    const [loading, setLoading] = useState(false);
    const [storeState, dispatch] = useAppContext();
    const [formData, setFormData] = useState();
    const [tranx, setTranx] = useState([]);
    const navigate = useNavigate();
    const [isError, setError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isModel, setIsModel] = useState(false);

    const ProductCode = [
        { code: "AFWG", name: "HDFC Arbitrage Fund - Wholesale Plan - Regular Plan - Growth" },
        { code: "HDFC", name: "HDFC Liquid Fund - Regular Plan - Growth" },
        { code: "54", name: "HDFC Low Duration Fund - Regular Plan - Growth" },
        { code: "57N", name: "HDFC Overnight Fund - Regular Plan -  Growth" },
        { code: "USTGR", name: "HDFC Ultra Short Term Fund - Regular Growth" },
        { code: "EDIRG", name: "ICICI Prudential Equity Arbitrage Fund - Growth" },
        { code: "1565", name: "ICICI Prudential Liquid Fund - Regular plan - Growth" },
        { code: "3491", name: "ICICI Prudential Overnight Fund Growth" },
        { code: "1746", name: "ICICI Prudential Ultra Short Term Fund - Growth" },
        { code: "LFGPGGR", name: "Motilal Oswal Liquid Fund - Regular Growth" },
        { code: "USGPGGR", name: "Motilal Oswal Ultra Short Term Fund - Growth" },
        { code: "AFGPGR", name: "NIPPON INDIA Arbitrage Fund  - GROWTH PLAN - GROWTH" },
        { code: "LFIGGR", name: "NIPPON INDIA Liquid Fund - Regular plan - Growth Plan - Growth Option" },
        { code: "LPIGGR", name: "NIPPON INDIA Low Duration Fund - Growth Plan Growth Option" },
        { code: "ONGPGR", name: "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN" },
        { code: "CPGPGR", name: "NIPPON INDIA Ultra Short Duration Fund - Growth Option" },
        { code: "114G", name: "SBI Arbitrage Opportunities Fund - Regular Plan - Growth" },
        { code: "72SG", name: "SBI Liquid Fund Regular Growth" },
        { code: "F47RG", name: "SBI Magnum Low Duration Fund Regular Growth" },
        { code: "086G", name: "SBI Magnum Ultra Short Duration Fund Regular Growth" },
        { code: "57G", name: "SBI Overnight Fund Regular Growth" },
    ]

    const [columns, setColumns] = useState([
        {
            field: 'id', headerName: 'S.No', width: 90, renderHeader: () => (
                <strong>
                    {'S.No'}
                </strong>
            ),
        },
        {
            field: 'product_code', headerName: 'Fund', width: 340, renderHeader: () => (
                <strong>
                    {'Fund'}
                </strong>
            ),
            renderCell: (params) => {
                let { product_code } = params.row;
                const fund = ProductCode.filter((ele) => ele.code == product_code)[0].name;
                return <div>{fund}</div>
            }
        },
        {
            field: 'ac_no',
            headerName: 'Account No.',
            width: 170, renderHeader: () => (
                <strong>
                    {'Account No.'}
                </strong>
            ),
            renderCell: (params) => {
                let { ac_no } = params.row;
                return <div>{ac_no}</div>;
            },
        },
        {
            field: 'amount', headerName: 'Amount', width: 120, renderHeader: () => (
                <strong>
                    {'Amount'}
                </strong>
            ), renderCell: (params) => {
                let { amount } = params.row;
                return <div>{FormatNumber(amount)}</div>;
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            width: 120, renderHeader: () => (
                <strong>
                    {'Created Date'}
                </strong>
            ),
            renderCell: (params) => {
                let { createdAt } = params.row;
                return <div>{createdAt.split("T")[0]}</div>;
            },
        },
        {
            field: 'ash', headerName: 'Actions', width: 240, renderHeader: () => (
                <strong>
                    {'Actions'}
                </strong>
            ), renderCell: (params) => {

                return <div><Grid
                    item
                    className="bills-pay"
                    py={1}
                    px={2}
                    style={{ marginRight: "1rem" }}
                    onClick={() => {
                 
                        setFormData(params.row);
                        setIsModel(true);
                    }}
                >
                    Continue
                </Grid></div>;
            },

        },
    ]);
    
    const getTranxData = () => {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/getpendingtrans`,
                { iin: storeState.ACTIVEINVETOR?.folio.Folio },
                { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(({ data }) => {
                setLoading(false)
                if (!data.succ) {
                    setError(true);
                    setMessage(data.message);
                    return;
                }
                setTranx(data.Transaction);
                setIsSuccess(true)              
                return;
            }).catch((error) => {
                setLoading(false)
                setError(true);
                setMessage("Failed to Fetching Data from Server")
                return;
            })
    }
    useEffect(() => {
        getTranxData()
    }, [])

    return <Grid item xs={12} ml={4}>
        <Snackbar
            open={isError}
            autoHideDuration={4000}
            onClose={() => setError(false)}
        >
            <Alert severity='error'
                style={{ backgroundColor: "red" }}
            ><span style={{ color: "white" }} >{message}</span></Alert>
        </Snackbar>
        {/* {state && <Snackbar
            open={isSuccess}
            autoHideDuration={4000}
            onClose={() => setIsSuccess(false)}
        >
            <Alert severity='success'
            >{message}</Alert>
        </Snackbar>} */}
        <div style={{ height: '80vh', width: '75vw' }}>
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
        {isModel && <RTGSPendingPayment isModel={isModel} setIsModel={setIsModel} formData={formData} accessToken={accessToken} />}
    </Grid>
}