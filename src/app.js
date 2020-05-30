const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();

const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(partialsPath);



app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather App',
        name: 'Alex'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        forecast: 'It is snowing',
        location: 'phily',
        title: 'about title'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpMsg: 'help title',
        helpName : 'iceGod',
        title: 'help title'
    })
})


/* app.get('/help', (req, res)=>{
    res.send({
        name: 'andrew',
        age: 27
    });
})

app.get('/about', (req, res)=>{
    app.use(express.static(path.join(__dirname,'../public/about.html')));
}) */

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address, (error,{lat, lon, loc}={})=>{
        if(error){
           return res.send({
               error: error
           })
        }
        forcast(lat,lon, (error, forcastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                location: loc,
                forcast: forcastdata,
                address: req.query.address
            })
        })


    });
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: 'help not found',
        page: 'help'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Not found',
        page: ''
    })
})



//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port')
})