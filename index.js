const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');

// Mongoose Models Import
const ExistingData = require('./existingdata.js');
const DataTemplate = require('./datatemplate.js');


var fs = require('fs'); //File System - for file manipulation
var fse = require('fs-extra'); //File System - for file manipulation

const xlsxFile = require('read-excel-file/node');
const fileUpload = require('express-fileupload');

// var mv = require('mv');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const { response } = require('express');
require('dotenv').config()


const app = express();


PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// using Bodyparser for getting form data
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json({ limit: "50mb" }))

// using cookie-parser and session 
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    maxAge: 3600000, //which is around 2 weeks
    resave: true,
    saveUninitialized: true,
}));


// Using flash for flash messages 
app.use(flash());

// To upload the file form frontend
app.use(fileUpload());

// MIDDLEWARES
// Global variable to flash messages
app.use(async(req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/metadatas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connected')).catch(err => console.log("database connectivity error " + err));


// Initial Register route
app.get('/', async(req, res) => {
    res.render('index')
})


// GET Route to populate the existing database
app.get('/populate', async(req, res) => {
    filePath = __dirname + '/file/';

    if (fs.existsSync(filePath)) {
        console.log("file exists")
            // fse.removeSync(filePath)
        fse.emptyDirSync(filePath);
        console.log("files Deleted");
    }
    res.render('populate');
});


// POST Route to populate existing database
app.post('/populate', async(req, res) => {

    let sampleFile;
    var uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/file/' + sampleFile.name;


    var artistname = [];
    var director = [];
    var producer = [];
    var musiccompany = [];
    var musicdirector = [];
    var lyricwriter = [];
    var language = [];
    var genre = [];
    var category = [];
    var subcategory = [];
    var mood = [];
    var type = [];
    var premium = [];
    var tags = [];
    var version = [];
    var entry = {};
    sampleFile.mv(uploadPath, async(err) => {
        if (err)
            return res.status(500).send(err);
        console.log("file uploaded")
            // });

        xlsxFile(uploadPath).then(async(rows) => {

            for (var i = 1; i < rows.length; i++) {
                for (var j = 0; j < rows[i].length; j++) {
                    if (rows[i][j] != null) {

                        if (rows[0][j] == 'artistname') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            artistname.push(newEntry);
                        }

                        if (rows[0][j] == 'director') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            director.push(newEntry);
                        }

                        if (rows[0][j] == 'producer') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            producer.push(newEntry);
                        }

                        if (rows[0][j] == 'musiccompany') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            musiccompany.push(newEntry);
                        }
                        if (rows[0][j] == 'musicdirector') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            musicdirector.push(newEntry);
                        }
                        if (rows[0][j] == 'lyricwriter') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            lyricwriter.push(newEntry);
                        }
                        if (rows[0][j] == 'language') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            language.push(newEntry);
                        }
                        if (rows[0][j] == 'genre') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            genre.push(newEntry);
                        }
                        if (rows[0][j] == 'category') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            category.push(newEntry);
                        }
                        if (rows[0][j] == 'subcategory') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            subcategory.push(newEntry);
                        }
                        if (rows[0][j] == 'mood') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            mood.push(newEntry);
                        }
                        if (rows[0][j] == 'type') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            type.push(newEntry);
                        }
                        if (rows[0][j] == 'premium') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            premium.push(newEntry);
                        }
                        if (rows[0][j] == 'tags') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            tags.push(newEntry);
                        }
                        if (rows[0][j] == 'version') {
                            const newEntry = ({
                                id: rows[i][j],
                                text: rows[i][j]
                            });
                            version.push(newEntry);
                        }

                    }
                }

            }

            ExistingData.deleteOne({}, function(err) {
                const dataset = new ExistingData({
                    artistname: artistname,
                    director: director,
                    producer: producer,
                    musiccompany: musiccompany,
                    musicdirector: musicdirector,
                    lyricwriter: lyricwriter,
                    language: language,
                    genre: genre,
                    category: category,
                    subcategory: subcategory,
                    mood: mood,
                    type: type,
                    premium: premium,
                    tags: tags,
                    version: version
                });
                dataset.save(async(error, savedEntry) => {
                    if (error) {
                        console.log(error);
                        return res.status(404).json({ success: false, msg: "Something went wrong. Please try again" });
                    }
                    console.log("Saving Data to Database")
                        // console.log(savedEntry)
                });
            });


        })

    });


    res.redirect('/')

});


// GET Route to input movie details and print to excel
app.get('/newMovie', async(req, res) => {
    ExistingData.find().exec(async(error, dataset) => {
        if (error) {
            console.log(error);
            return res.redirect('/404')
        }
        var metadata = dataset[0];
        res.render('movie', { 'metadata': metadata });
    });

})

// GET Route to input song details and print to excel
app.get('/newsong', async(req, res) => {

    ExistingData.find().exec(async(error, dataset) => {
        if (error) {
            console.log(error);
            return res.redirect('/404')
        }
        var metadata = dataset[0];
        // console.log(metadata)
        res.render('song', { 'metadata': metadata });
    });
})


app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));