// const { json } = require("express");

// console.log(jsondata)


function formatTime(timeInput) {

    intValidNum = timeInput.value;

    if (intValidNum < 24 && intValidNum.length == 2) {
        timeInput.value = timeInput.value + ":";
        return false;
    }
    if (intValidNum == 24 && intValidNum.length == 2) {
        timeInput.value = timeInput.value.length - 2 + "0:";
        return false;
    }
    if (intValidNum > 24 && intValidNum.length == 2) {
        timeInput.value = "";
        return false;
    }

    if (intValidNum.length == 5 && intValidNum.slice(-2) < 60) {
        timeInput.value = timeInput.value + ":";
        return false;
    }
    if (intValidNum.length == 5 && intValidNum.slice(-2) > 60) {
        timeInput.value = timeInput.value.slice(0, 2) + ":";
        return false;
    }
    if (intValidNum.length == 5 && intValidNum.slice(-2) == 60) {
        timeInput.value = timeInput.value.slice(0, 2) + ":00:";
        return false;
    }


    if (intValidNum.length == 8 && intValidNum.slice(-2) > 60) {
        timeInput.value = timeInput.value.slice(0, 5) + ":";
        return false;
    }
    if (intValidNum.length == 8 && intValidNum.slice(-2) == 60) {
        timeInput.value = timeInput.value.slice(0, 5) + ":00";
        return false;
    }
}


// $(document).ready(function() {
//     // $('#display').click(function() {
//     var dataset;
//     $.ajax({
//         type: 'GET',
//         url: '/newMovie',
//         dataType: "json", //to parse string into JSON object,
//         success: function(metadata) {
//             if (metadata) {
//                 console.log(metadata)
//                     // console.log("fetched" + data)
//                     // dataset = data;
//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             alert('error: ' + textStatus + ': ' + errorThrown);
//         }
//     });
//     // console.log("after fetching" + dataset);
//     return false;
// });

// BIND DATA TO THE INPUT BOX USING "Select2" liberaty immidiatly after page is loaded.
$(document).ready(function() {

    // THE JSON ARRAY.
    var acceArray = [{
        // id: '1',
        text: 'option A',
        id: 'option A'
    }, {
        // id: '2',
        text: 'option B',
        id: 'option B'
    }, {
        // id: '3',
        text: 'option C',
        id: 'option C'
    }, {
        // id: '4',
        text: 'option D',
        id: 'option D',
    }, {
        // id: '5',
        text: 'option E',
        id: 'option E'
    }, {
        // id: '6',
        text: 'option F',
        id: 'option F'
    }, {
        // id: '7',
        text: 'option G',
        id: 'option G'
    }];



    $('#artistname').select2({
        data: jsondata.artistname,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#director').select2({
        data: jsondata.director,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#producer').select2({
        data: jsondata.producer,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#musiccompany').select2({
        data: jsondata.musiccompany,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#musicdirector').select2({
        data: jsondata.musicdirector,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#lyricwriter').select2({
        data: jsondata.lyricwriter,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#tags').select2({
        data: jsondata.tags,
        tags: true,
        multiple: true,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });

    // single select
    $('#language').select2({
        data: jsondata.language,
        multiple: false,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#genre').select2({
        data: jsondata.genre,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#category').select2({
        data: jsondata.category,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#subcategory').select2({
        data: jsondata.subcategory,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });
    $('#mood').select2({
        data: jsondata.mood,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });

});

// Function to print the HTML Table data into Excel sheet 
function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    var curdate = new Date().toLocaleString();

    filename = filename ? filename + '_' + curdate + '.xls' : 'excel_data.xls';
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
    }
}

// INSERT FORM DATA INTO HTML TABLE 
// ALL CRUD OPERATIONS ON THE DATA ENTERED USING THE FORM 


var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["moviename"] = document.getElementById("moviename").value;
    var artistname = [];
    $.each($('#artistname').select2('data'), function() {
        artistname.push($(this)[0].text);
    });
    formData["artistname"] = artistname;

    var director = [];
    $.each($('#director').select2('data'), function() {
        director.push($(this)[0].text);
    });
    formData["director"] = director;

    var producer = [];
    $.each($('#producer').select2('data'), function() {
        producer.push($(this)[0].text);
    });
    formData["producer"] = producer;

    var musiccompany = [];
    $.each($('#musiccompany').select2('data'), function() {
        musiccompany.push($(this)[0].text);
    });
    formData["musiccompany"] = musiccompany;

    var musicdirector = [];
    $.each($('#musicdirector').select2('data'), function() {
        musicdirector.push($(this)[0].text);
    });
    formData["musicdirector"] = musicdirector;

    var lyricwriter = [];
    $.each($('#lyricwriter').select2('data'), function() {
        lyricwriter.push($(this)[0].text);
    });
    formData["lyricwriter"] = lyricwriter;

    formData["description"] = document.getElementById("description").value;
    formData["duration"] = document.getElementById("duration").value;

    // single vlaued
    formData["language"] = document.getElementById("language").value;
    formData["genre"] = document.getElementById("genre").value;
    formData["category"] = document.getElementById("category").value;
    formData["subcategory"] = document.getElementById("subcategory").value;
    formData["mood"] = document.getElementById("mood").value;
    formData["type"] = document.getElementById("type").value;
    formData["premium"] = document.getElementById("premium").value;


    formData["releasedate"] = document.getElementById("releasedate").value;
    formData["livedate"] = document.getElementById("livedate").value;
    formData["rightsdate"] = document.getElementById("rightsdate").value;
    formData["rightsenddate"] = document.getElementById("rightsenddate").value;
    formData["thumburl"] = document.getElementById("thumburl").value;
    formData["contenturl"] = document.getElementById("contenturl").value;

    var tags = [];
    $.each($('#tags').select2('data'), function() {
        tags.push($(this)[0].text);
    });
    formData["tags"] = tags;

    formData["viewscount"] = document.getElementById("viewscount").value;
    formData["likescount"] = document.getElementById("likescount").value;
    formData["downloadscount"] = document.getElementById("downloadscount").value;
    formData["sharecount"] = document.getElementById("sharecount").value;

    var multival = [];
    $.each($('#accessories').select2('data'), function() {
        multival.push($(this)[0].text);
    });
    formData["multivals"] = multival;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("movieData").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.moviename;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.artistname.join(":");
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.director.join(":");
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.producer.join(":");
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.musiccompany.join(":");
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.musicdirector.join(":");
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.lyricwriter.join(":");
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.description;
    cell10 = newRow.insertCell(9);
    cell10.innerHTML = data.duration;
    cell11 = newRow.insertCell(10);
    cell11.innerHTML = data.language;
    cell12 = newRow.insertCell(11);
    cell12.innerHTML = data.genre;
    cell13 = newRow.insertCell(12);
    cell13.innerHTML = data.category;
    cell14 = newRow.insertCell(13);
    cell14.innerHTML = data.subcategory;
    cell15 = newRow.insertCell(14);
    cell15.innerHTML = data.mood;
    cell516 = newRow.insertCell(15);
    cell516.innerHTML = data.type;
    cell17 = newRow.insertCell(16);
    cell17.innerHTML = data.premium;
    cell18 = newRow.insertCell(17);
    cell18.innerHTML = data.releasedate;
    cell19 = newRow.insertCell(18);
    cell19.innerHTML = data.livedate;
    cell20 = newRow.insertCell(19);
    cell20.innerHTML = data.rightsdate;
    cell21 = newRow.insertCell(20);
    cell21.innerHTML = data.rightsenddate;
    cell22 = newRow.insertCell(21);
    cell22.innerHTML = data.thumburl;
    cell23 = newRow.insertCell(22);
    cell23.innerHTML = data.contenturl;
    cell24 = newRow.insertCell(23);
    cell24.innerHTML = data.tags.join(",");
    cell25 = newRow.insertCell(24);
    cell25.innerHTML = data.viewscount;
    cell27 = newRow.insertCell(25);
    cell27.innerHTML = data.likescount;
    cell28 = newRow.insertCell(26);
    cell28.innerHTML = data.downloadscount;
    cell29 = newRow.insertCell(27);
    cell29.innerHTML = data.sharecount;


}



function resetForm() {
    document.getElementById("newmovieform").reset();
    $("input[type=date]").val("");

    document.getElementById("moviename").value = "";

    $('#artistname').val(null).trigger('change');
    $('#director').val(null).trigger('change');
    $('#producer').val(null).trigger('change');
    $('#musiccompany').val(null).trigger('change');
    $('#musicdirector').val(null).trigger('change');
    $('#lyricswriter').val(null).trigger('change');

    document.getElementById("description").value = "";
    document.getElementById("duration").value = "";

    $('#language').val(null).trigger('change');
    $('#genre').val(null).trigger('change');
    $('#category').val(null).trigger('change');
    $('#subcategory').val(null).trigger('change');
    $('#mood').val(null).trigger('change');


    document.getElementById("type").value = "";
    document.getElementById("tags").value = "";
    document.getElementById("premium").value = "";
    document.getElementById("thumburl").value = "";
    document.getElementById("contenturl").value = "";

    $('#tags').val(null).trigger('change');

    document.getElementById("viewscount").value = "";
    document.getElementById("likescount").value = "";
    document.getElementById("downloadscount").value = "";
    document.getElementById("sharecount").value = "";

    // UNSELECT ALL VALUES WITH THE CLICK OF BUTTON.
    $('#accessories').val(null).trigger('change');

    selectedRow = null;
}

// On editting the data fill the form with that particular data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("moviename").value = selectedRow.cells[1].innerHTML;


    var artistname = selectedRow.cells[2].innerHTML.split(":");
    var artistnameJson = [];
    for (var i in artistname) {
        var item = artistname[i];
        artistnameJson.push({
            "id": item,
            "text": item
        });
    };
    $("#artistname").select2('data', artistnameJson);

    var director = selectedRow.cells[3].innerHTML.split(":");
    var directorJson = [];
    for (var i in director) {
        var item = director[i];
        directorJson.push({
            "id": item,
            "text": item
        });
    };
    $("#director").select2('data', directorJson);

    var producer = selectedRow.cells[4].innerHTML.split(":");
    var producerJson = [];
    for (var i in producer) {
        var item = producer[i];
        producerJson.push({
            "id": item,
            "text": item
        });
    };
    $("#producer").select2('data', producerJson);

    var musiccompany = selectedRow.cells[5].innerHTML.split(":");
    var musiccompanyJson = [];
    for (var i in musiccompany) {
        var item = musiccompany[i];
        musiccompanyJson.push({
            "id": item,
            "text": item
        });
    };
    $("#musiccompany").select2('data', musiccompanyJson);

    var musicdirector = selectedRow.cells[6].innerHTML.split(":");
    var musicdirectorJson = [];
    for (var i in musicdirector) {
        var item = musicdirector[i];
        musicdirectorJson.push({
            "id": item,
            "text": item
        });
    };
    $("#musicdirector").select2('data', musicdirectorJson);

    var lyricwriter = selectedRow.cells[7].innerHTML.split(":");
    var lyricwriterJson = [];
    for (var i in lyricwriter) {
        var item = lyricwriter[i];
        lyricwriterJson.push({
            "id": item,
            "text": item
        });
    };
    $("#lyricwriter").select2('data', lyricwriterJson);

    document.getElementById("description").value = selectedRow.cells[8].innerHTML;
    document.getElementById("duration").value = selectedRow.cells[9].innerHTML;


    var language = selectedRow.cells[10].innerHTML;
    $("#language").val(language).trigger("change");

    var genre = selectedRow.cells[11].innerHTML;
    $("#genre").val(genre).trigger("change");

    var category = selectedRow.cells[12].innerHTML;
    $("#category").val(category).trigger("change");

    var subcategory = selectedRow.cells[13].innerHTML;
    $("#subcategory").val(subcategory).trigger("change");

    var mood = selectedRow.cells[14].innerHTML;
    $("#mood").val(mood).trigger("change");


    document.getElementById("type").value = selectedRow.cells[15].innerHTML;
    document.getElementById("premium").value = selectedRow.cells[16].innerHTML;
    document.getElementById("releasedate").value = selectedRow.cells[17].innerHTML;
    document.getElementById("livedate").value = selectedRow.cells[18].innerHTML;
    document.getElementById("rightsdate").value = selectedRow.cells[19].innerHTML;
    document.getElementById("rightsenddate").value = selectedRow.cells[20].innerHTML;
    document.getElementById("thumburl").value = selectedRow.cells[21].innerHTML;
    document.getElementById("contenturl").value = selectedRow.cells[22].innerHTML;

    var tags = selectedRow.cells[23].innerHTML.split(",");
    var tagsJson = [];
    for (var i in tags) {
        var item = tags[i];
        tagsJson.push({
            "id": item,
            "text": item
        });
    };
    $("#tags").select2('data', tagsJson);

    document.getElementById("viewscount").value = selectedRow.cells[24].innerHTML;
    document.getElementById("likescount").value = selectedRow.cells[25].innerHTML;
    document.getElementById("downloadscount").value = selectedRow.cells[26].innerHTML;
    document.getElementById("sharecount").value = selectedRow.cells[27].innerHTML;

}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formdata.moviename;
    selectedRow.cells[2].innerHTML = formdata.artistname.join(":");
    selectedRow.cells[3].innerHTML = formdata.director.join(":");
    selectedRow.cells[4].innerHTML = formdata.producer.join(":");
    selectedRow.cells[5].innerHTML = formdata.musiccompany.join(":");
    selectedRow.cells[6].innerHTML = formdata.musicdirector.join(":");
    selectedRow.cells[7].innerHTML = formdata.lyricwriter.join(":");
    selectedRow.cells[8].innerHTML = formdata.description;
    selectedRow.cells[9].innerHTML = formdata.duration;
    selectedRow.cells[10].innerHTML = formdata.language;
    selectedRow.cells[11].innerHTML = formdata.genre;
    selectedRow.cells[12].innerHTML = formdata.category;
    selectedRow.cells[13].innerHTML = formdata.subcategory;
    selectedRow.cells[14].innerHTML = formdata.mood;
    selectedRow.cells[15].innerHTML = formdata.type;
    selectedRow.cells[16].innerHTML = formdata.premium;
    selectedRow.cells[17].innerHTML = formdata.releasedate;
    selectedRow.cells[18].innerHTML = formdata.livedate;
    selectedRow.cells[19].innerHTML = formdata.rightsdate;
    selectedRow.cells[20].innerHTML = formdata.rightsenddate;
    selectedRow.cells[21].innerHTML = formdata.thumburl;
    selectedRow.cells[22].innerHTML = formdata.contenturl;
    selectedRow.cells[23].innerHTML = formdata.tags.join(",");
    selectedRow.cells[24].innerHTML = formdata.viewscount;
    selectedRow.cells[25].innerHTML = formdata.likescount;
    selectedRow.cells[26].innerHTML = formdata.downloadscount;
    selectedRow.cells[27].innerHTML = formdata.sharecount;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("movieData").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("moviename").value == "") {
        isValid = false;
    } else {
        isValid = true;
    }
    return isValid;
}