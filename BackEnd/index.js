
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express();
app.use(cors())
const port = 2000

app.use(express.json());  // middleware to read the json data form the req

// availabel routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})