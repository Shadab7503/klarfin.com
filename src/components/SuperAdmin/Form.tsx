import  React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, MenuItem, Typography } from '@mui/material';
import { Button } from '@mui/joy';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Form(props:any) {

  const {accessToken}  = props;

  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  const navigate = useNavigate();


  const [data,setData] = useState<any>({
    'username':{value:'',error:''},
    'frequency':{value:'Once in a week',error:''},
    'day1':{value:'Sunday',error:''},
    'day2':{value:'Monday',error:''},
    'amount':{value:'',error:''},
    'fund':{value:'',error:''},
    'portfolio':{value:'',error:''},
    'returns':{value:'',error:''},
  });

  useEffect(()=>{
    if(!id) return;

    setLoading(true)

    axios
    .get(`${process.env.REACT_APP_BACKEND_HOST}v1/super/single-investment`,
        {
            headers: { Authorization: `Bearer ${props.accessToken}` },
            params: {
                id: id
              }
        })
    .then((res) => {
        // setInvestmentList(data.investments);
        const {investment} = res.data;
        if(!investment) return;
        let toUpdate = {};
        Object.keys(investment).forEach(key=>{
          const each = investment[key];
          toUpdate[key] = {value:each,error:''};
        })
        console.log(toUpdate);
        setData({...data,...toUpdate});
        setLoading(false);

    });

  },[id])


  const updateHandler = ()=>{
    setLoading(true)
    axios
    .patch(`${process.env.REACT_APP_BACKEND_HOST}v1/super/investment`,data,
        {
            headers: { Authorization: `Bearer ${props.accessToken}` },
         
        })
    .then(({ data }) => {
        // setInvestmentList(data.investments);
        navigate(`/dashboardSuper/investment`)
        setLoading(false);

    });
  }


  const saveHandler = ()=>{
    let errorFound = false;
    Object.keys(data).forEach(key=>{
      let each = data[key];
      if(!each) {
        each.error = 'Feild is required';
        errorFound = true;
      }
    })

    console.log(data)
     axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/investment`,data, 
     {
       headers: { Authorization: `Bearer ${accessToken}` }
     }).then(res=>{
      navigate(`/dashboardSuper/investment`)
     })

  }
  const changeHandler = ((type:string,value:any)=>{
    const newData = {...data};
   
    newData[type].value = value;
    setData(newData);
    console.log(newData)
  })

  const frequency = [
    {
      value: 'Once in a week',
      label: 'Once in a week',
    },
  
    {
      value: 'Twice in a week',
      label: 'Twice in a week',
    },

    {
      value: 'Once in a two week',
      label: 'Once in a two week',
    },
  
  
  ];

  const weekDays = [
    
    {
      value: 'Sunday',
      label: 'Sunday',
    },
    {
      value: 'Monday',
      label: 'Monday',
    },
    {
      value: 'Tuesday',
      label: 'Tuesday',
    },
    {
      value: 'Wednesday',
      label: 'Wednesday',
    },
    {
      value: 'Thursday',
      label: 'Thursday',
    },
    {
      value: 'Friday',
      label: 'Friday',
    },
    {
      value: 'Saturday',
      label: 'Saturday',
    },
  ]


  return (

    <Grid item xs={12} px={10} mt={5} sx={{ maxWidth: "95vw", height:'100vh' }}>
     <h2 style={{marginBottom:'20px'}}>Add Investment</h2>
    <Box
      component="form"
      // sx={{
      //   '& .MuiTextField-root': { m: 1, width: '25ch' },
      // }}
      
      autoComplete="off"
      onSubmit={ async (e:any)=>{
        e.preventDefault()
       
        if(!id)  {
          saveHandler();
          return;
        }
        
        updateHandler();

      }}
    >
      <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between'}}>
      <TextField onChange={(e)=>{
        changeHandler('username',e.target.value)
      }} 

      value={data['username'].value}
       required

       style={{width:'48%'}} id="outlined-basic" label="User Name" variant="outlined" />
      <div style={{width:'48%',display:'flex',justifyContent:'space-between'}}>
        <TextField
      value={data['frequency'].value}

        required
        onChange={(e)=>{
          changeHandler('frequency',e.target.value)
        }}
            id="outlined-select-currency"
            select
            label="Frequency"
            defaultValue="once"
            // helperText="Please select your currency"
            style={{ width:'30%' }}
          >
            {frequency.map((option) => (
              <MenuItem  key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
          required
          
          value={data['day1']?.value}
          onChange={(e)=>{
            changeHandler('day1',e.target.value)
          }}
            id="outlined-select-currency"
            select
            label="Week day"
            defaultValue="Sunday"
            // helperText="Please select your currency"
            style={{ width:'30%' }}
          >
            {weekDays.map((option) => (
              <MenuItem  key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {
            data['frequency'].value == 'Twice in a week' && 
          <TextField
          required
          value={data['day2']?.value}
         onChange={(e)=>{
          changeHandler('day2',e.target.value)
        }}
            id="outlined-select-currency"
            select
            label="Week day"
            defaultValue="Sunday"
            // helperText="Please select your currency"
            style={{ width:'30%' }}
          >
            {weekDays.map((option) => (
              <MenuItem  key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          }
      

      </div>

      </div>
      <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between'}}>
      <TextField
      value={data['amount'].value}
      required
      type='number'
       onChange={(e)=>{
        changeHandler('amount',e.target.value)
      }}
       style={{width:'48%'}} id="outlined-basic" label="Amount" variant="outlined" />
      <TextField
      value={data['fund'].value}

      required
       onChange={(e)=>{
        changeHandler('fund',e.target.value)
      }}
       style={{width:'48%'}} id="outlined-basic" label="Fund" variant="outlined" />

      </div>
      <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between'}}>
      <TextField
      value={data['portfolio'].value}

      required
      type='number'

       onChange={(e)=>{
        changeHandler('portfolio',e.target.value)
      }}
       style={{width:'48%'}} id="outlined-basic" label="Current Portfolio Amount" variant="outlined" />
      <TextField
      type='number'
      value={data['returns'].value}

      required
       onChange={(e)=>{
        changeHandler('returns',e.target.value)
      }}
       style={{width:'48%'}} id="outlined-basic" label="Return Generated" variant="outlined" />

      </div>
      
      <div style={{display:'flex',justifyContent:'end'}}>
      <Button type='submit' sx={{
                  background: "#231955",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  padding: "0.7rem 2rem",
                  borderRadius: "2rem",
                  fontSize: "1.5rem",
                  marginTop: "1rem",
                 color:'#fff',
                 "&:hover": {
                  backgroundColor: "#231955",
                },
                }} variant="solid">{ id ? 'Update' : 'Submit'}</Button>

      </div>
     
    </Box>

    </Grid>
  );
}