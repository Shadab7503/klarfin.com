import {
    Grid,
    Box,
    Tab,
} from '@mui/material';
import { TabPanel, TabContext,TabList } from '@material-ui/lab'
import TransactionDatewise from './TransactionDatewise';
import 'rsuite/dist/rsuite.min.css';
import React from 'react';
import TransactionPending from './TransactionPending';

export default function TransactionDatewiseNSE(props: any) {
    const [value, setValue] = React.useState("1");
    const handleChange = (newValue: string) => {
        setValue(newValue);
      };

    return <Grid container spacing={2} xs>
        <Box>
            <TabContext value={value}  >
                <Box sx={{ width:"82vw",borderBottom: 2,margin:"15px 0 0 15px", borderColor: 'divider', bgcolor: '#318ad6', color: 'white' }}>
                    <TabList onChange={(event, newValue) => handleChange(newValue)} TabIndicatorProps={{
                        style: { backgroundColor: 'white', color: 'white' },
                    }}>
                        <Tab style={{ color: 'white', fontWeight: 650 }} label="Transactions" value="1" />
                        <Tab style={{ color: 'white', fontWeight: 650 }} label="Pending Transactions" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><TransactionDatewise accessToken={props.accessToken} /></TabPanel>
                <TabPanel value="2">
                    <TransactionPending accessToken={props.accessToken} />
                </TabPanel>
            </TabContext>
        </Box>
        {/* <Grid item xs={12} sx={{ ml: 4, maxWidth: "90vw", height: '100vh' }}>
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
                    <div style={{ border: '1.5px solid rgb(210 205 205)',zIndex:2, height: "39px", borderRadius: "4px", marginRight: "13px" }} >
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
        </Grid> */}
    </Grid>
}
