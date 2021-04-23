const express = require("express");

const https = require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
    app.post("/",function(req,res){

      const query=req.body.cityName;
      const apikey="8ce22c95f047eccb996d61169b52c9da";
      const unit="metric";
      const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

      https.get(url,function(resp){
        console.log(resp.statusCode);

        resp.on("data",function(data){
          const weatherData=JSON.parse(data);
          const temp=weatherData.main.temp;
          const description=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.write("<h1>The temperature in "+query+"is "+temp+" degrees celcius.</h1>");
          res.write("<p>The weather description is "+description+" .<p>");
          res.write("<img src="+imageURL+">");
          res.send();
    });
  });
});














app.listen(3000,function(){
  console.log("server is running on port 3000")
});
