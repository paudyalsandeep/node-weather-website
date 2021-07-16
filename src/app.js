const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//define paths for express config
const publicDir=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))


app.get('/',(req,res)=>{
    res.render('index',{
        title: "Weather app",
        name:"Sandeep Paudyal"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sandeep Paudyal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Sandeep Paudyal'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    
    // res.send({
    //     forecast:'It is raining',
    //     location:'Kathmandu',
    //     address:req.query.address,
        
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sandeep Paudyal',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sandeep Paudyal',
        errorMessage:'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log("Server is starting on 3000")
})