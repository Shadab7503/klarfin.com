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
console.log('props.months',props.lebels)
  const data = {
    labels: props.lebels, datasets: [

      {
        type: 'line' as const,
        label: 'Closing Balance',
        borderColor: '#186090',
        borderWidth: 1,
        fill: false,
        data:props.closingBal
      },
      {
        type: 'bar' as const,
        label: 'Cash Inflow',
        backgroundColor: '#338455',
        data: props.inflowGraphData,
        borderColor: 'white',
        barPercentage: 1,
        categoryPercentage: 0.3,
        borderWidth: 0,
      },
      {
        type: 'bar' as const,
        label: 'Cash Outflow',
        backgroundColor: '#C5221F',
        barPercentage: 1,
        categoryPercentage: 0.3,
        data: props.outflowGraphData,
        borderWidth: 0,
      },
    ]
  }

  return (
        <div style={{height: '22rem',marginLeft:props.marginLeft,width:props.width+'px'}}>
        {/* @ts-ignore */}
            <Chart type='bar'  options={options} data={data}  />

        </div>
  )
}

export default CashflowChart