const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();



const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../front')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/index.html'));
});
PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});