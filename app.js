const express=require("express")
const bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.urlencoded({extented:true}))



app.get("/",function(req,res){
    res.sendFile(__dirname+"/weather.html")
    
})
app.post("/",function(req,res) {
    console.log(req.body.cityName)
    const https=require("https")
    const cityName=req.body.cityName
    const appid="e8ebd52b83d795f42cc30678565ec8ef"
    const unit="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appid+"&units="+unit+""
    https.get(url,function(response) {
        response.on("data",function (data){
            const weatherData=JSON.parse(data)
            console.log(weatherData)
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            
            
            
                           
            res.write("<h1>The tempecture in "+req.body.cityName+" is "+temp+" degree Celcius.</h1>")
            res.write("<h2>The Weather is currently "+weatherDescription+".</h2")
            
            res.send()
        })
    })
    
})


// 

app.listen(process.env.PORT || 3000,function(){
    console.log('the server is running on port 3000')
})







