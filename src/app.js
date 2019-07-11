const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.use(express.static(publicDirectoryPath))

app.set('views',viewsPath)

app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index', {
        title:"Weather App",
        name:"Liang Fu"
    })                                   
})    

app.get('/about', (req,res) => {
    res.render('about', {
        title:"About Me",
        name:"Liang Fu"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name:'Liang Fu',
        helpText: "This is a help message"
    })
})

// app.com/weather
app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({
            error:'Address should be provided'
        })
    }                                     
    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({ error })
        } 
        forecast(latitude,longitude, (error, forcastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forcastData,
                location:location,
                address:req.query.address
            })   
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Liang Fu',
        errorMsg: 'Help article note found'
    })
    
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Liang Fu',
        errorMsg: 'My 404 page'
    })
    
})


app.listen(3000, ()=>{
    console.log('Sever is up on port 3000')
})
