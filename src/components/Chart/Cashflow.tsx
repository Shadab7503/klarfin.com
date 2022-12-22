import React,{useState} from 'react'

import { Chart } from 'react-chartjs-2';

function CashflowChart(props:any) {

  const options = {

    elements: {
    layout:{
      padding:0
    },
    point:{
        radius: 2
    }
  },
  
  maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {     
        display : false,
        positon : "top" as const
      },
      title: {
        display: false,
        text: 'Cash Inflow Outflow Chart',
      },
      datalabels : {
        display : false
      },
      customCanvasBackgroundColor: {
        color: '#F5F5F5',
      }
    },
    
    scales: {
      xAxes: {
        offset: true,
        ticks: {
          beginAtZero: true,
          display : false ,
          font: {
            family: "Montserrat",
            weight:'600',
            size:15
          },
          categoryPercentage: 1.0,
            barPercentage: 1.0,
        },
        title: {
          display: false,
          text: "Months",
        },
        grid: {
          display: false,
        },
        font: {
          family: "Montserrat",
        },
      },
      y: {
        ticks: {
         
          font: {
            family: "Montserrat",
            weight:'600',
            size:15
          },
          categoryPercentage: 1.0,
          barPercentage: 0.1,
          maxTicksLimit: 5,
          stepSize: 0.1,
          callback:function(value:number) {
           
              return 'INR '+value;
        }
        },
        title: {
          display: false,
          text: "INR" ,
        },
        grid: {
          borderDash: [2, 4],
          color: "#00000099",
          display: true,
          padding:49
        },
      },
    },
  
  }

  return (
        <div style={{height: '22rem',marginLeft: '-7.5rem',width:props.width+'px'}}>
        {/* @ts-ignore */}
            <Chart type='bar'  options={options} data={props.barData}  />

        </div>
  )
}

export default CashflowChart