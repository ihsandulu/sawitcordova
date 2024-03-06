//
document.addEventListener('deviceready', function () {            
    nfc.addNdefListener(function (nfcEvent) {
        var tag = nfcEvent.tag;
        return true;
    }, suksesnfcready, failurenfcready);       
});
function suksesnfcready(){}
function failurenfcready(){}

function onNdef(nfcEvent) {
    // notif(JSON.stringify(nfcEvent.tag));
    var tag = nfcEvent.tag;
    if (tag.serialNumber) {
        tag.id = tag.serialNumber;
        tag.isWritable = !tag.isLocked;
        tag.canMakeReadOnly = tag.isLockable;
    }
    let tagnya = JSON.stringify(nfcEvent.tag);
    //tulis ke textarea
    $("#datanfcmentahan").val(tagnya);
    datanfcjadi(nfcEvent.tag)
    navigator.notification.vibrate(100);
}

function datanfcjadi(nfcData) {
    var ndefMessage = nfcData.ndefMessage;
    var resultString = "";
    for (var i = 0; i < ndefMessage.length; i++) {
        var payload = ndefMessage[i].payload;
        var payloadString = String.fromCharCode.apply(null, payload);
        resultString += payloadString + "\n";
    }
    resultString = resultString.replace("en", "");
    $("#datanfcjadi").val(resultString);
    // notif(resultString);
}

function notifbacakartu(isi) {
    
}

function onFailurebacakartu(reason) {
    // notif(reason);
    
}

function bacakartu() {
    nfc.addNdefListener(onNdef, notifbacakartu("Tempelkan Kartu!"), onFailurebacakartu);
}

function onNdefcek(nfcEvent) {
    // notif(JSON.stringify(nfcEvent.tag));
    
    var tag = nfcEvent.tag;
    ndefMessage = nfcEvent.tag.ndefMessage;
    if(ndefMessage.length>0){
        notif(tag);
        return 1;
        navigator.notification.vibrate(100);
    }else{
        return 0;
    }
}
function cekkartu() {
    nfc.addNdefListener(onNdefcek, notifbacakartu("Tempelkan Kartu!"), onFailurebacakartu);
}

//hapus data
function failurehapus(reason) {
    // alert('failurehapus');
    // notif(reason);
    notif('Data Gagal Dihapus!');
    
}
function successhapus() {
    // alert('successhapus');
    notif('Data Terhapus!');
    $("#datanfcjadi").val('');
    
}
function onConfirmCard(buttonIndex) {
    // notif(buttonIndex);
    if(buttonIndex=="1"){
        nfc.erase(successhapus, failurehapus);
    }else{

    }
}
function hapusdata() {
    // alert('hapusdata');
    navigator.notification.confirm(
        'Tempelkan Kartu!', // message
        onConfirmCard,            // callback to invoke with index of button pressed
        'Konfirmasi Kartu',           // title
        ['OK','Cancel']     // buttonLabels
    );    
}

//write
function onSuccessWriteCard(isi) {
    notif(isi);
}
function onFailureWriteCard(reason) {
    notifikasi(reason);
}
function writedataCard(isidata) {
    var message = [
        ndef.textRecord(isidata)
    ];
    nfc.write(message, onSuccessWriteCard("Sukses Menulis Data pada Kartu."), onFailureWriteCard);
    bacakartu();
}