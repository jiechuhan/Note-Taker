const fs = require("fs")

var noteData;

module.exports = function(app) {
    fs.readFile("./db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        noteData = JSON.parse(data);
    })

    // console.log('app')
    app.get("/api/notes", function(req, res) {
        // console.log('in get')
        // console.log(noteData)
        res.json(noteData)
    });


    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        noteData.push(newNote);
        console.log(noteData);
        res.json(noteData);
    })
}