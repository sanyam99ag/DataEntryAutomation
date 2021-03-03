function setup() {

    // Fetch the Geolocation
    let lat, lon;
    if ('geolocation' in navigator) {
        // console.log('Got the Geolocation')
        navigator.geolocation.getCurrentPosition(async(position) => {
            // console.log(position)
            lon = position.coords.longitude.toFixed(4);
            lat = position.coords.latitude.toFixed(4);

            // console.log(lat, lon)
            document.getElementById('lon').textContent = lon;
            document.getElementById('lat').textContent = lat;
            const MAP_API = document.getElementsByClassName("feature")[3].innerHTML;

            const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=' + MAP_API + '&location=' + lat + ',' + lon + '&includeRoadMetadata=true&includeNearestIntersection=true'
            let address;
            $.getJSON(url, function(data) {
                address = data.results[0].locations[0].street + ' ' +
                    data.results[0].locations[0].adminArea6 + ' ' +
                    data.results[0].locations[0].adminArea5 + ' ' +
                    data.results[0].locations[0].adminArea4 + ' ' +
                    data.results[0].locations[0].adminArea3 + ' ' +
                    data.results[0].locations[0].adminArea1 + ', ' +
                    data.results[0].locations[0].postalCode;
                document.getElementById('add').textContent = address;

            });


        });
    } else {
        alert('Unable to fetch Geolocation, adjust you connection!')
            // console.log('Didn\'t got the Geolocation')
    }

    // Open and Close Camera Functionality
    document.getElementById('opencamera').addEventListener('click', async event => {
        Webcam.set({
            width: 528,
            height: 300,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
    });
    // document.getElementById('closecamera').addEventListener('click', async event => {
    //     // code to remove the camera
    // });


    // Variable to store "imgsrc" to database
    let imgsrc, metacap;

    // click the selfie and display
    takeSnapShot = function() {
        Webcam.snap(function(data_uri) {
            document.getElementById('camera').innerHTML =
                '<img class="img-thumbnail"  src="' + data_uri + '" width="100%" />';
            imgsrc = data_uri;
        });
    }

    clicked = function() {
        document.getElementById('click').innerHTML =
            '<img class="img-thumbnail"  src="' + imgsrc + '" width="100%" />';
    }

    // Download the Selfie
    downloadImage = function(name, datauri) {
        var a = document.createElement('a');
        a.setAttribute('download', name + '.png');
        a.setAttribute('href', datauri);
        a.click();
    }
    down = function() {
        metacap = document.getElementById('caption').value;
        downloadImage('SelfieBook', imgsrc);
    }

    // save data to database 
    document.getElementById('geolocate').addEventListener('click', async event => {

        const caption = document.getElementById('caption').value;

        document.getElementById('caption').value = "";

        const image64 = imgsrc;

        document.getElementById('click').innerHTML =
            '<button class="btn btn-primary" id="opencamera" type="button" data-toggle="modal" data-target="#modal"><i class="icon-camera" ></i>Take a selfie</button>';



        const data = {
            caption,
            lon,
            lat,
            image64
        };

        fetch('/api', {
            method: 'POST',
            body: JSON.stringify({
                caption,
                lon,
                lat,
                image64
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
            return res.json();
        })


    });





}