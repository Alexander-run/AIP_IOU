const express = require('express');
let bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/build'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});