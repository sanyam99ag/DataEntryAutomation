// const existingdata = require("../../existingdata");

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
// console.log(jsondata.version)
// BIND DATA TO THE INPUT BOX USING "Select2" liberaty immidiatly after page is loaded.
$(document).ready(function() {



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
    $('#version').select2({
        data: jsondata.version,
        placeholder: "Select items from List",
        dropdownAutoWidth: true,
        width: 'resolve'
    });

});


// Function to print the HTML Table data into Excel sheet 
function fnExcelReport() {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange;
    var j = 0;
    tab = document.getElementById('songData'); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "songData.xls");
    } else //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
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
    formData["albumname"] = document.getElementById("albumname").value;
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

    formData["releasedate"] = document.getElementById("releasedate").value;
    formData["livedate"] = document.getElementById("livedate").value;
    formData["rightsdate"] = document.getElementById("rightsdate").value;
    formData["rightsenddate"] = document.getElementById("rightsenddate").value;

    formData["description"] = document.getElementById("description").value;
    formData["duration"] = document.getElementById("duration").value;
    formData["upc"] = document.getElementById("upc").value;
    formData["isrccode"] = document.getElementById("isrccode").value;

    // single vlaued
    formData["language"] = document.getElementById("language").value;
    formData["genre"] = document.getElementById("genre").value;
    formData["category"] = document.getElementById("category").value;
    formData["subcategory"] = document.getElementById("subcategory").value;
    formData["mood"] = document.getElementById("mood").value;
    formData["version"] = document.getElementById("version").value;
    formData["type"] = document.getElementById("type").value;
    formData["premium"] = document.getElementById("premium").value;


    formData["thumburl"] = document.getElementById("thumburl").value;
    formData["contenturl"] = document.getElementById("contenturl").value;

    var tags = [];
    $.each($('#tags').select2('data'), function() {
        tags.push($(this)[0].text);
    });
    formData["tags"] = tags;

    formData["playcount"] = document.getElementById("playcount").value;
    formData["likescount"] = document.getElementById("likescount").value;
    formData["downloadscount"] = document.getElementById("downloadscount").value;
    formData["sharecount"] = document.getElementById("sharecount").value;


    return formData;
}


function insertNewRecord(data) {
    var table = document.getElementById("songData").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<a onClick="onEdit(this)"><i class="fas fa-edit"></i></a>
                       <a onClick="onDelete(this)"><i class="fas fa-trash-alt"></i></a>`;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.albumname;
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
    cell9.innerHTML = data.releasedate;
    cell10 = newRow.insertCell(9);
    cell10.innerHTML = data.livedate;
    cell11 = newRow.insertCell(10);
    cell11.innerHTML = data.rightsdate;
    cell12 = newRow.insertCell(11);
    cell12.innerHTML = data.rightsenddate;
    cell13 = newRow.insertCell(12);
    cell13.innerHTML = data.description;
    cell14 = newRow.insertCell(13);
    cell14.innerHTML = data.duration;
    cell15 = newRow.insertCell(14);
    cell15.innerHTML = data.upc;
    cell16 = newRow.insertCell(15);
    cell16.innerHTML = data.isrccode;
    cell17 = newRow.insertCell(16);
    cell17.innerHTML = data.language;
    cell18 = newRow.insertCell(17);
    cell18.innerHTML = data.genre;
    cell19 = newRow.insertCell(18);
    cell19.innerHTML = data.category;
    cell20 = newRow.insertCell(19);
    cell20.innerHTML = data.subcategory;
    cell21 = newRow.insertCell(20);
    cell21.innerHTML = data.mood;
    cell22 = newRow.insertCell(21);
    cell22.innerHTML = data.version;
    cell23 = newRow.insertCell(22);
    cell23.innerHTML = data.type;
    cell24 = newRow.insertCell(23);
    cell24.innerHTML = data.premium;
    cell25 = newRow.insertCell(24);
    cell25.innerHTML = data.thumburl;
    cell26 = newRow.insertCell(25);
    cell26.innerHTML = data.contenturl;
    cell27 = newRow.insertCell(26);
    cell27.innerHTML = data.tags.join(",");
    cell28 = newRow.insertCell(27);
    cell28.innerHTML = data.playcount;
    cell29 = newRow.insertCell(28);
    cell29.innerHTML = data.likescount;
    cell30 = newRow.insertCell(29);
    cell30.innerHTML = data.downloadscount;
    cell31 = newRow.insertCell(30);
    cell31.innerHTML = data.sharecount;


}



function resetForm() {
    document.getElementById("newsongform").reset();
    $("input[type=date]").val("");

    document.getElementById("albumname").value = "";

    $('#artistname').val(null).trigger('change');
    $('#director').val(null).trigger('change');
    $('#producer').val(null).trigger('change');
    $('#musiccompany').val(null).trigger('change');
    $('#musicdirector').val(null).trigger('change');
    $('#lyricswriter').val(null).trigger('change');

    document.getElementById("description").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("upc").value = "";
    document.getElementById("isrccode").value = "";

    $('#language').val(null).trigger('change');
    $('#genre').val(null).trigger('change');
    $('#category').val(null).trigger('change');
    $('#subcategory').val(null).trigger('change');
    $('#mood').val(null).trigger('change');
    $('#version').val(null).trigger('change');


    document.getElementById("type").value = "";
    document.getElementById("premium").value = "";
    document.getElementById("thumburl").value = "";
    document.getElementById("contenturl").value = "";
    document.getElementById("tags").value = "";

    $('#tags').val(null).trigger('change');

    document.getElementById("playcount").value = "";
    document.getElementById("likescount").value = "";
    document.getElementById("downloadscount").value = "";
    document.getElementById("sharecount").value = "";

    // UNSELECT ALL VALUES WITH THE CLICK OF BUTTON.
    // $('#accessories').val(null).trigger('change');

    selectedRow = null;
}

// On editting the data fill the form with that particular data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("albumname").value = selectedRow.cells[1].innerHTML;


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

    document.getElementById("releasedate").value = selectedRow.cells[8].innerHTML;
    document.getElementById("livedate").value = selectedRow.cells[8].innerHTML;
    document.getElementById("rightsdate").value = selectedRow.cells[10].innerHTML;
    document.getElementById("rightsenddate").value = selectedRow.cells[11].innerHTML;
    document.getElementById("description").value = selectedRow.cells[12].innerHTML;
    document.getElementById("duration").value = selectedRow.cells[13].innerHTML;
    document.getElementById("upc").value = selectedRow.cells[14].innerHTML;
    document.getElementById("isrccode").value = selectedRow.cells[15].innerHTML;


    var language = selectedRow.cells[16].innerHTML;
    $("#language").val(language).trigger("change");

    var genre = selectedRow.cells[17].innerHTML;
    $("#genre").val(genre).trigger("change");

    var category = selectedRow.cells[18].innerHTML;
    $("#category").val(category).trigger("change");

    var subcategory = selectedRow.cells[19].innerHTML;
    $("#subcategory").val(subcategory).trigger("change");

    var mood = selectedRow.cells[20].innerHTML;
    $("#mood").val(mood).trigger("change");

    var mood = selectedRow.cells[21].innerHTML;
    $("#version").val(mood).trigger("change");

    document.getElementById("type").value = selectedRow.cells[22].innerHTML;
    document.getElementById("premium").value = selectedRow.cells[23].innerHTML;
    document.getElementById("thumburl").value = selectedRow.cells[24].innerHTML;
    document.getElementById("contenturl").value = selectedRow.cells[25].innerHTML;

    var tags = selectedRow.cells[26].innerHTML.split(",");
    var tagsJson = [];
    for (var i in tags) {
        var item = tags[i];
        tagsJson.push({
            "id": item,
            "text": item
        });
    };
    $("#tags").select2('data', tagsJson);

    document.getElementById("playcount").value = selectedRow.cells[27].innerHTML;
    document.getElementById("likescount").value = selectedRow.cells[28].innerHTML;
    document.getElementById("downloadscount").value = selectedRow.cells[29].innerHTML;
    document.getElementById("sharecount").value = selectedRow.cells[30].innerHTML;

}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.albumname;
    selectedRow.cells[2].innerHTML = formData.artistname.join(":");
    selectedRow.cells[3].innerHTML = formData.director.join(":");
    selectedRow.cells[4].innerHTML = formData.producer.join(":");
    selectedRow.cells[5].innerHTML = formData.musiccompany.join(":");
    selectedRow.cells[6].innerHTML = formData.musicdirector.join(":");
    selectedRow.cells[7].innerHTML = formData.lyricwriter.join(":");
    selectedRow.cells[8].innerHTML = formData.releasedate;
    selectedRow.cells[9].innerHTML = formData.livedate;
    selectedRow.cells[10].innerHTML = formData.rightsdate;
    selectedRow.cells[11].innerHTML = formData.rightsenddate;
    selectedRow.cells[12].innerHTML = formData.description;
    selectedRow.cells[13].innerHTML = formData.duration;
    selectedRow.cells[14].innerHTML = formData.upc;
    selectedRow.cells[15].innerHTML = formData.isrccode;
    selectedRow.cells[16].innerHTML = formData.language;
    selectedRow.cells[17].innerHTML = formData.genre;
    selectedRow.cells[18].innerHTML = formData.category;
    selectedRow.cells[19].innerHTML = formData.subcategory;
    selectedRow.cells[20].innerHTML = formData.mood;
    selectedRow.cells[21].innerHTML = formData.version;
    selectedRow.cells[22].innerHTML = formData.type;
    selectedRow.cells[23].innerHTML = formData.tags.joinpremium;
    selectedRow.cells[24].innerHTML = formData.thumburl;
    selectedRow.cells[25].innerHTML = formData.contenturl;
    selectedRow.cells[26].innerHTML = formData.tags.join(",");
    selectedRow.cells[27].innerHTML = formData.playcount;
    selectedRow.cells[28].innerHTML = formData.likescount;
    selectedRow.cells[29].innerHTML = formData.downloadscount;
    selectedRow.cells[30].innerHTML = formData.sharecount;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("songData").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("albumname").value == "") {
        isValid = false;
    } else {
        isValid = true;
    }
    return isValid;
}