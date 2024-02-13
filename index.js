const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router/endpoint');

const app = express();
dotenv.config(); 

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000;
const host = process.env.HOST; 

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})
