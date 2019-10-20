var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

let ogNote

// A function for getting all notes from the db
var getNotes = function () {
    // $.get("/api/notes", function (noteData) {
    //     console.log(noteData)
    //     ogNote = noteData 
    //     // for (i = 1; i < noteData.length; i++) {
    //     //     let item = $("<li>").attr({ "class": "list-group-item", "id": "title" + i })
    //     //     let btn = $("<button>").attr("class", "delete-note")
    //     //     btn.text("delete")
    //     //     item.text(noteData[i].title);
    //     //     item.append(btn)
    //     //     $(".list-group").append(item);
    //     // };
    // })
    // return ogNote;
    $.ajax({
        url: "/api/notes",
        type: 'Get',
        async: false,
        success: function (noteData) {
            ogNote = noteData;
        }
    });
    return ogNote;
};

// console.log(getNotes())

// $(".delete-note").on("click", function(event) {
//     alert("click")
// })

// A function for saving a note to the db
var saveNote = function (note) {
    var newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };
    $.post("/api/notes", newNote, function (data) {
        if (data) {
            console.log(data)
            alert("note added")
        };
    });
};

// A function for deleting a note from the db
var deleteNote = function (title) {
    $.ajax({
        url: "api/notes",
        method: "DELETE"
    }).then(function (noteData) {

    })
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
    if (activeNote !== null) {
        $noteTitle = activeNote.title;
        $noteText = activeNote.text;
    }  else {
        $noteTitle.val("");
        $noteText.val("");
    }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
    saveNote()
    $saveNoteBtn.css("display", "none");
    $noteTitle.val("");
    $noteText.val("");
};

// Delete the clicked note
var handleNoteDelete = function (event) {
    event.preventDefault();
    // if ()
   
};

// Sets the activeNote and displays it
var handleNoteView = function () {
    
    
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
    
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function () {
    let noteData = getNotes()
    for (i = 1; i < noteData.length; i++) {
        let item = $("<li>").attr({ "class": "list-group-item", "id": "title" + i })
        let btn = $("<button>").attr("class", "delete-note")
        item.text(noteData[i].title);
        item.append(btn)
        $(".list-group").append(item);
    };
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
