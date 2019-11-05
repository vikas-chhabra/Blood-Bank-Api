const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const bloodBankRoutes = require('./routes/bloodBankRoutes');
const donorRoutes = require('./routes/donorRoutes');
mongoose.connect('mongodb+srv://vikas:vikas@bloodbank-mbjfo.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(_ => console.log('Connection establishing with Mongo db successfully'))
    .catch(_ => console.log('Error while establishing connection with Mongo db'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/users', userRoutes);
app.use('/api/bloodBanks', bloodBankRoutes);
app.use('/api/donors', donorRoutes);

app.use((req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        success: false,
        msg: error.message
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, _ => {
    console.log(`server is running on ${PORT}`)
});