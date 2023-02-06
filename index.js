/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
const express = require('express');
const app = express();
app.use(express.json());

const songs = [
    {id: 1, name: "Song 1 (Pop)", genre: "Pop", year: 2000, month: 3},
    {id: 2, name: "Song 2 (Hip Hop)", genre: "Hip Hop", year: 2005, month: 7},
    {id: 3, name: "Song 3 (Rap)", genre: "Rap", year: 2003, month: 12},
    {id: 4, name: "Song 4 (Classical)", genre: "Classical", year: 2011, month: 1},
    {id: 5, name: "Song 5 (Rock)", genre: "Rock", year: 2015, month: 8},
    {id: 6, name: "Song 6 (Jazz)", genre: "Jazz", year: 2018, month: 4},
    {id: 7, name: "Song 7 (Blues)", genre: "Blues", year: 2020, month: 6},
    {id: 8, name: "Song 8 (Electronic)", genre: "Electronic", year: 2023, month: 10},
];

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/', (req,res) => {
    res.send('Welcome to the back end service of a music app made by Jimmy Li. (Odd Period 7/8)');
});

app.get('/api/songs', (req, res) => {
    res.send(songs);
});

app.get('/api/songs/:id', (req, res) => {
    const song = songs.find(c=> c.id === parseInt(req.params.id));
    if (!song) {
        res.status(404).send("The song with the given ID was not found");
        return
    }
    res.send(song);
})

app.get('/api/songs/year/:year', (req, res) => {
    let sameYearList = [];
    for (let song of songs) {
        if (song.year == req.params.year) {
            sameYearList.push(song);
        }
    }

    if (sameYearList.length != 0){
        res.send(sameYearList);
    } 
    else {
        res.status(404).send("The songs with the given year was not found");
    }
});

app.get('/api/songs/month/:month', (req, res) => {
    let sameMonthLists = [];
    for (let song of songs) {
        if (song.month == req.params.month) {
            sameMonthLists.push(song);
        }
    }

    if (sameMonthLists.length != 0){
        res.send(sameMonthLists);
    } 
    else {
        res.status(404).send("The songs with the given month was not found");
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000 ...')
})

//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/songs', (req,res) => {
    if (req.body.name.length > 2 && req.body.genre.length > 2) {
        const song = {
            id: songs.length + 1,
            name: req.body.name,
            genre: req.body.genre,
            year: req.body.year,
            month: req.body.month
        };
    
        songs.push(song);
        res.send(song);
    }
    else {
        res.status(404).send("A name, genre, year, and month is required and name/genre should be at least 3 characters long");
    }  
});

//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put('/api/songs/:id', (req, res) => {
    let change = songs.find(c => c.id === parseInt(req.params.id));
    if (req.body.genre.length > 2 && req.body.name.length > 2) {
        let putSong = {
            id: change.id,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs[change.id - 1] = putSong;
        res.send(putSong);
    } else {
        res.send('A name, genre, year, and month is required and name/genre should be at least 3 characters long');
    }
});

//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/songs/:id', (req, res) => {
    deleteSong = songs[req.body.id - 1];
    index = songs.indexOf(deleteSong);
    if (deleteSong != undefined) {
        songs.splice(index, 1);
        res.send(deleteSong);
    } 
    else {
        res.status(404).send("Song with the given ID does not exist");
    }
})

//===== Jimmy Li, Web Development, Period 7/8, Odd =====
/*
(1) how programs communicate in what order to each other for a given purpose
Programs communicate with each other through the backend where there are different types of requests.
These include GET, POST, PUT, and DELETE which all serve their own purpose but sends the information to each other.
When a PUT request is entered, the updated version is shown whenever the GET request is sent again.

(2) what you learned in this project
Something I learned in this project is that if one request doesn't work correctly, it might affect the rest of the program 
which is why it is important to keep track of each request. In addition, I learned to implement different requests which 
can be used to create even more request. From the project, I got to see how the backend of a website works and how it
can be applied to real world apps.

(3) how can this project be further extended.
This project can be further extended by adding additional routes to make the app have more options. Instead of local, the app
can be changed so everyone has access to it with a wide variety of functions such as making an account and getting additional
information on each song.
*/