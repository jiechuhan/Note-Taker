const fs = require("fs")
const path = require("path");

var noteData;

module.exports = function (app) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        noteData = JSON.parse(data);
    })

    app.get("/api/notes", function (req, res) {
        // console.log('in get')
        // console.log(noteData)
        res.json(noteData);
    });


    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        noteData.push(newNote);
        let parsedata = JSON.stringify(newNote)
        fs.writeFile(path.join(__dirname, '../db/db.json'), parsedata, (err) => {
            if (err) throw err;
            console.log("Delete success");
        })
        // console.log(noteData);
        res.json(noteData);
    });

    app.delete("/api/notes", function (req, res) {
        // console.log(req.body)
        var deleteData = req.body
        // console.log(deleteData)
        console.log(noteData)
        for (i=0; i<noteData.length; i++) {
            // console.log(noteData[i])
            if (deleteData.title === noteData[i].title) {
                noteData.splice(i, 1)
            };
        };
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join(__dirname, '../db/db.json'), parsedata, (err) => {
           if (err) throw err;
           console.log("Delete success");
       })
        console.log(noteData)
        res.json(noteData)
    })

    // } else if (deleteData.title === noteData[i].title && noteData[i] === 0) {
            //     noteData.shift(noteData[i])
            // } else if (deleteData.title === noteData[i].title && noteData[i] === noteData.length -1) {
            //     noteData.pop(noteData[i])



    // app.delete("/api/notes/:title", function (req, res) {
    //     let filteredarray = noteData.filter(x => {x.title !== req.params.title});
    //     console.log(filteredarray)
    //     let parsedata = JSON.stringify(filteredarray);
    //     fs.writeFile("./db/db.json", parsedata, (err) => {
    //         if (err) throw err;
    //         console.log("Delete success");
    //     })
    //     res.json(filteredarray);
    // })
}