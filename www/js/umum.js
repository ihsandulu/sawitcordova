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

$(".halaman").hide();

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

function notifx(message) {
    $("#datanfcjadi1").show();
    $("#datanfcjadi1").html(message);
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
    setTimeout(function(){
        $(".username1").text(username);
        
        if(positionid>0){
            cekhalaman();
        }
    },1000);
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

function sekarang(){
    // Mendapatkan objek tanggal hari ini
    var today = new Date();

    // Mendapatkan tanggal, bulan, dan tahun
    var date = today.getDate();
    var month = today.getMonth() + 1; // Ingat: bulan dimulai dari 0
    var year = today.getFullYear();

    // Membentuk string tanggal dengan format 'YYYY-MM-DD'
    var formattedDate = (date < 10 ? '0' : '') + date + '-' + (month < 10 ? '0' : '') + month + '-' + year;

    return formattedDate;

}

function time(){
    // Membuat objek Date yang mewakili waktu saat ini
    var waktuSaatIni = new Date();

    // Mendapatkan jam, menit, dan detik dari objek Date
    var jam = waktuSaatIni.getHours();
    var menit = waktuSaatIni.getMinutes();
    var detik = waktuSaatIni.getSeconds();

    // Memastikan agar jam, menit, dan detik selalu dua digit dengan menambahkan nol di depan jika diperlukan
    jam = padZero(jam);
    menit = padZero(menit);
    detik = padZero(detik);

    // Fungsi untuk menambahkan nol di depan angka jika angka kurang dari 10
    function padZero(angka) {
        return angka < 10 ? "0" + angka : angka;
    }

    // Menggabungkan jam, menit, dan detik menjadi format jam:menit:detik
    var waktuFormat = jam + ":" + menit + ":" + detik;

    // Menampilkan waktu dalam format jam:menit:detik
    return waktuFormat;


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

function iscardrandom(inisial){
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
    var lengkap = inisial+year + '' + (month < 10 ? '0' : '') + month + '' + (date < 10 ? '0' : '') + date + hours + minutes+ seconds+randomTwoDigitNumber;

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

function cekversion(){
    var version = navigator.appInfo.version;
    db.transaction(function (tx) {
        var query = "SELECT * FROM apk LIMIT 1";
        tx.executeSql(query, [], function (tx, resultSet) {
            for (var x = 0; x < resultSet.rows.length; x++) {  
                let version1 = resultSet.rows.item(x)['apk_version'];
                if(version!=version1){
                    alert('Silahkan download APK terbaru ('+version1+')!');
                    // Buka browser dengan URL tertentu
                    var url = "https://sawit.qithy.com/images/apk_file/"+version1+".apk";
                    var target = "_system"; // Buka dengan browser sistem
                    var options = "location=yes,hidden=no";
                    cordova.InAppBrowser.open(url, target, options);
                }
            }
        });
    });
}

function tulisversi(){
    var version = navigator.appInfo.version;
    $("#versi").text(version);
    // alert(version);
}

function cekhalaman(){
    $(".halaman").hide();
    let kata='';
    let halaman='';
    if(positionid>0){
        // alert(positionid);
        db.transaction(function (tx) {
            var query = "SELECT * FROM positionandroid WHERE position_id='"+positionid+"'";
            tx.executeSql(query, [], function (tx, resultSet) {     
                // alert(query);           
                for (var x = 0; x < resultSet.rows.length; x++) { 
                    kata = resultSet.rows.item(x)['android_name'];
                    if (kata !== null) {
                        halaman = kata.replace(/\s/g, "_");
                        halaman = halaman.toLowerCase();
                        if(resultSet.rows.item(x)['positionandroid_read']==1){
                            $(".h"+halaman).show();
                            // alert('h'+halaman);
                        }
                    }
                }
            });
        });
    }
}



