let tphname = localStorage.getItem('tph_name');
let blokname = localStorage.getItem('blok_name');
let seksiname = localStorage.getItem('seksi_name');
let divisiname = localStorage.getItem('divisi_name');
let estatename = localStorage.getItem('estate_name');
let tphid = localStorage.getItem('tph_id');
let blokid = localStorage.getItem('blok_id');
let seksiid = localStorage.getItem('seksi_id');
let divisiid = localStorage.getItem('divisi_id');
let estateid = localStorage.getItem('estate_id');
let positionid = localStorage.getItem('position_id');
let userid = localStorage.getItem('user_id');
let username = localStorage.getItem('user_name');
let userpassword = localStorage.getItem('user_password');
let usernik = localStorage.getItem('user_nik');

function alertDismissed(title) {
    // alert('Kesalahan Pesan!',title)
}

function notif(message) {
    let title = 'Aplikasi Perkebunan';
    navigator.notification.alert(
        message,  // message
        alertDismissed(title),         // callback
        title,            // title
        'Close'                  // buttonName
    );
}

//geolocation
var onSuccessgeo = function (position) {
    /* alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n'); */
        localStorage.setItem('geo','');
        let geo = position.coords.latitude+'|'+position.coords.longitude;
        localStorage.setItem('geo',geo);
};
function onErrorgeo(error) {
    notif('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
function geolocation() {
    navigator.geolocation.getCurrentPosition(onSuccessgeo, onErrorgeo);
}

function playAudio(url) {
    // notif('testaudio');
    // Play the audio file at url
    var my_media = new Media('file:///android_asset/www/files/'+url,
        // success callback
        function () {
            // notif("playAudio():Audio Success");
        },
        // error callback
        function (error) {
            // notif("playAudio():Audio Error: " + error.message);
        }
    );
    // Play audio
    my_media.play();
}
// playAudio('berhasil.mp3');
// playAudio('gagal.mp3');

function notiftext(message) {
    let title = 'Aplikasi Perkebunan';
    $("#test").text(message);
}

function onConfirm(pilihannya,jenis) {
    // notif(pilihannya,jenis);
    if(jenis=='Exit' && pilihannya=='1'){
        navigator.app.exitApp();
    }else{
        // alert('You selected button ' + jenis);
    }
}

function confirm(message,title,jenis) {
    let arraynya;
    if(jenis=='Exit'){
        arraynya = ['Tutup','Cancel'];
    }else{
        arraynya = ['Lanjut','Cancel'];
    }
    navigator.notification.confirm(
        message, // message
        (buttonIndex) => onConfirm(buttonIndex, jenis),            // callback to invoke with index of button pressed
        title,           // title
        arraynya     // buttonLabels
    );
}

function pindahHalaman(halaman) {
    window.location.href = halaman;
}

function notifclosesuccess() {
    console.log("Successfully dismissed previously opened dialog.");
}

function notifcloseferror(error) {
    
    notif('Kesalahan INSERT: ' + error.message);
    console.log("Failed to dismiss previously opened dialog: " + error);
}

function notifclose(){
    //notif close tidak akan jalan
    navigator.notification.dismissPrevious(
        notifclosesuccess,
        notifcloseferror
    );
}

$(document).ready(function(){  
    $.get("header.html")
    .done(function(data){
        $("#header").html(data);        
        $(".mdl").hide();
    });
    $.get("footer.html")
    .done(function(data){
        $("#footer").html(data); 
    });
    $('.select2').select2();
});

function now(){
    // Mendapatkan objek tanggal hari ini
    var today = new Date();

    // Mendapatkan tanggal, bulan, dan tahun
    var date = today.getDate();
    var month = today.getMonth() + 1; // Ingat: bulan dimulai dari 0
    var year = today.getFullYear();

    // Membentuk string tanggal dengan format 'YYYY-MM-DD'
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (date < 10 ? '0' : '') + date;

    return formattedDate;

}

function cardrandom(){
    // Mendapatkan objek tanggal hari ini
    var today = new Date();

    // Mendapatkan tanggal, bulan, dan tahun
    var date = today.getDate();
    var month = today.getMonth() + 1; // Ingat: bulan dimulai dari 0
    var year = today.getFullYear();

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var randomTwoDigitNumber = Math.floor(Math.random() * 90) + 10;


    // Membentuk string tanggal dengan format 'YYYY-MM-DD'
    var lengkap = 'TP'+year + '' + (month < 10 ? '0' : '') + month + '' + (date < 10 ? '0' : '') + date + hours + minutes+ seconds+randomTwoDigitNumber;

    return lengkap;

}

function sptbsCardRandom(){
    // Mendapatkan objek tanggal hari ini
    var today = new Date();

    // Mendapatkan tanggal, bulan, dan tahun
    var date = today.getDate();
    var month = today.getMonth() + 1; // Ingat: bulan dimulai dari 0
    var year = today.getFullYear();

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var randomTwoDigitNumber = Math.floor(Math.random() * 90) + 10;


    // Membentuk string tanggal dengan format 'YYYY-MM-DD'
    var lengkap = 'SPTBS'+year + '' + (month < 10 ? '0' : '') + month + '' + (date < 10 ? '0' : '') + date + hours + minutes+ seconds+randomTwoDigitNumber;

    return lengkap;

}



