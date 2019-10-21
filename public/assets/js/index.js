var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};


// A function for getting all notes from the db
var getNotes = function () {
    return $.get('/api/notes');
};


// A function for saving a note to the db
var saveNote = function (note) {
    $.post("/api/notes", note, function (data) {
        if (data) {
            console.log(data);
            renderNoteList(data);
        };
    });
};


// A function for deleting a note from the db
var deleteNote = function (title) {
    console.log(title)
    $.ajax({
        url: `/api/notes/${title}`,
        method: "DELETE"
    }).then(function (data) {
        if (data) {
            console.log(data);
            renderNoteList(data);
        };
    });
};


// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
    if (activeNote) {
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
    } else {
        $noteTitle.val("");
        $noteText.val("");
    };
};


// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
    activeNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    }
    saveNote(activeNote)
    $saveNoteBtn.css("display", "none");
    $noteTitle.val("");
    $noteText.val("");
};


// Delete the clicked note
var handleNoteDelete = function (event) {
    event.preventDefault();
    console.log(event)
    var id = event.target.id.split("-")[1]
    console.log(id)
    activeNote = {
        title: $("#title-" + id).text()
    }
    // $(this).remove();
    console.log(activeNote);
    deleteNote(activeNote.title);
};


// Sets the activeNote and displays it
var handleNoteView = function () {
    var title = $(this).text().split("Delete")[0];
    console.log(title);
    $.get('/api/notes', function (data) {
        console.log(data)
        for (i = 0; i < data.length; i++) {
            if (data[i].title === title) {
                activeNote.title = data[i].title;
                activeNote.text = data[i].text;
                renderActiveNote();
            };
        };
    });
};


// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function () {
    activeNote = {};
    renderActiveNote();
};


// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function () {
    if ($noteText.val() !== null || $noteText.val() !== null) {
        $saveNoteBtn.css("display", "block");
    } else {
        $saveNoteBtn.css("display", "none");
    };
};


// Render's the list of note titles
var renderNoteList = function (notes) {
     console.log('render',notes)
    $(".list-group").empty();
    for (i = 0; i < notes.length; i++) {
        let item = $("<li>").attr({ "class": "list-group-item d-flex", "id": "listitem-" + i });
        let btn = $("<button>").attr({"class": "delete-note fas fas-trash ml-5", "id": "button-" + i});
        let title = $("<h6>").attr({"id": "title-" + i})
        btn.text("Delete")
        title.text(notes[i].title);
        item.append(title);
        item.append(btn);
        $(".list-group").append(item);
    };
};


// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function () {
    getNotes().then(notes => {
        renderNoteList(notes);
    });
};


$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
