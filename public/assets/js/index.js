var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

let ogNote
let newNote

// A function for getting all notes from the db
var getNotes = function () {
    $.ajax({
        url: "/api/notes",
        type: 'GET',
        async: false,
        success: function (noteData) {
            ogNote = noteData;
            console.log(ogNote);
        }
    });
    return ogNote;
};


// A function for saving a note to the db
var saveNote = function (note) {
    var newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };
    $.ajax({
        url: "/api/notes",
        method: "POST",
        data: newNote,
        success: function (data) {
            newNote = data;
        }
    })
    console.log(newNote)
    return newNote;

    // $.post("/api/notes", newNote, function (data) {
    //     if (data) {
    //         console.log(data)
    //         // alert("note added")
    //         ogNote = data
    //         console.log(ogNote)
    //     };
    // });
    // return ogNote
};


// A function for deleting a note from the db
var deleteNote = function (title) {
    $.ajax({
        url: "/api/notes",
        method: "DELETE"
    }).then(function (noteData) {

    })
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
    if (activeNote !== null) {
        $noteTitle = activeNote.title;
        $noteText = activeNote.text;
    } else {
        $noteTitle.val("");
        $noteText.val("");
    }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
    let newNote = saveNote()
    $saveNoteBtn.css("display", "none");
    $noteTitle.val("");
    $noteText.val("");

    // console.log(newNote)
    let item = $("<li>").attr({ "class": "list-group-item" })
    let btn = $("<button>").attr("class", "delete-note")
    item.text(newNote.title);
    item.append(btn)
    $(".list-group").append(item);
};

// Delete the clicked note
var handleNoteDelete = function (event) {
    event.preventDefault();


};

// Sets the activeNote and displays it
var handleNoteView = function () {
    var title = $(this).text();
    console.log(title)
    console.log(ogNote)
    for (i = 0; i < ogNote.length; i++) {
        if (title = ogNote[i].title) {
            console.log(ogNote[i].title)
            return ogNote.text
        }
    }
    // console.log(newNote.text)
    // activeNote = {
    //     title: title
    //     // text: 
    // }

    // console.log(JSON.stringify(activeNote.title))

    $noteTitle.text(title)
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function () {

    renderActiveNote()
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function () {
    if ($noteText !== null) {
        $saveNoteBtn.css("display", "block");
    };
};

// Render's the list of note titles
var renderNoteList = function (notes) {
    let item = $("<li>").attr({ "class": "list-group-item", "id": "title" + i })
    let btn = $("<button>").attr({"class": "delete-note fas fa-trash"})
    // let title = $("<h4>").attr({"class": })
    item.text(notes.title);
    item.append(btn)
    $(".list-group").append(item);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function () {
    // let noteData = getNotes()
    // for (i = 1; i < noteData.length; i++) {
    //     let item = $("<li>").attr({ "class": "list-group-item", "id": "title" + i })
    //     let btn = $("<button>").attr("class", "delete-note")
    //     item.text(noteData[i].title);
    //     item.append(btn)
    //     $(".list-group").append(item);
    // };
    renderNoteList(getNotes())
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
