const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ziad Kamal'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ziad Kamal'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ziad Kamal',
        message: 'This is a weather app'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.render('error404',{
            title:'Error 404',
            name: 'Ziad Kamal',
            errorMessage: 'No Address Provided'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, {temperature, feelslike, wind_speed, icon, description}={}) => {
            if (error) {
               return  res.send({
                    error: error
                })
            }
            console.log(location)
            const weather=('Temperature is ' + temperature + '. Feels like ' + feelslike+'.')
            return res.send({
                location,
                weather,
                feelslike,
                wind_speed,
                icon,
                description
            })
        })

    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    else{
    console.log(req.query.search)
    res.send({
        products: []
    })
}
})

app.get('/help/*',(req, res)=>{
    res.render('error404',{
        title: 'Error 404',
        name: 'Ziad Kamal',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        title: 'Error 404',
        name: 'Ziad Kamal',
        errorMessage: 'Ops! Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+port)
})