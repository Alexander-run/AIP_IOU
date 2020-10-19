const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const debug = require('debug')('myapp:server');
const multer = require('multer');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, './uploads')))

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});

// Disk storage for files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

// Mutler object upload
const upload = multer({ storage: storage });

// store file uploads
app.post('/upload', upload.single('file'), (req,res) => {
    debug(req.file);
    console.log('storage location is ', req.hostname +'/' + req.file.path);
    return res.send(req.file);
});

app.get('/check', (req,res) => {
    res.sendFile(path.join(__dirname,'upload.html'))
})

// Production setup
// app.use(express.static(path.join(__dirname, '../build')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })