const { default: axios } = require("axios");

const bridgeURL = 'https://api.klarfin.com/v1/super/web/service/';


module.exports.checkKYC  = async (data)=>{
    const url = "https://www.ni-mf.com/rmf/mowblyserver/ssapi/rmf/prod/SimplySave/getpankyccheck";

   const res = await axios.post(bridgeURL,{...data,url});

   return res.data;
}


module.exports.createFolio  = async (data)=>{
    const url = "https://online.nipponindiaim.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/getpanbasedzbf";

   const res = await axios.post(bridgeURL,{...data,url});

   return res.data;
}