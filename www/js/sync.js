function dataserver(segment, table, masterarray){
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        tlsValidation: false,
        ignoreSsl: true 
    };
    let server = 'https://parnaagromas.com/tphdigital/api/'+segment;
    // alert(server);
    cordova.plugin.http.sendRequest(server, options, function(response) {
        var data = JSON.parse(response.data);
        //masukin user
        let isiarray = data.map(data => masterarray.map(prop => data[prop]));
        if(segment=="datakecamatan"){
            // alert(isiarray);
        }
        addItem(table, masterarray, isiarray, syncfinished);

        // $("#test").text(isiarray);
        //cek data yg masuk
        // let dataarray = ['user_id', 'user_nik', 'position_id'];
        // getAll('user', dataarray);


    }, function(error) {
        // let objString = JSON.stringify(error);
        // $("#test").text(objString);
    });
}
//konfirmasi singkron
function onConfirmSync(buttonIndex) {
    // notif(buttonIndex);
    if(buttonIndex=="1"){
        syncronizing();
        playAudio('singkronisasi.mp3');
    }else{

    }
}
function konfirmasisingkron(){
    navigator.notification.confirm(
        'Database pada Handphone akan terhapus. \nApakah anda ingin melanjutkan!', // message
        onConfirmSync,            // callback to invoke with index of button pressed
        'Konfirmasi Singkronisasi',           // title
        ['Lanjut','Cancel']     // buttonLabels
    );    
}
//singkron
function syncronizing(){
    let status = $("#btn-singkron").attr("status");
    // alert(status);
    if(status==""){
        syncstarted();

        //delete table
        deleteTable('user');
        deleteTable('rkh');
        deleteTable('blok');
        deleteTable('tph');
        deleteTable('tp');
        deleteTable('panen');
        deleteTable('sptbs');
        deleteTable('vendor');
        deleteTable('material');
        deleteTable('driverdumptruck');
        deleteTable('kecamatan');
        deleteTable('truk');
        deleteTable('pruning');
        deleteTable('tphnumber');
        deleteTable('sptbsnumber');
        deleteTable('quarrynumber');
        deleteTable('quarry');
        deleteTable('gradingtype');
        deleteTable('grading');
        deleteTable('absen');
        deleteTable('wt');
        deleteTable('quarry');
        deleteTable('quarrytype');
        deleteTable('timbangan');
        deleteTable('apk');
        deleteTable('positionandroid');

        db.transaction((tx) => {
            /* tx.executeSql('DROP TABLE IF EXISTS user', [], function(tx, result) {
                console.log('Tabel berhasil dihapus');
            }, function(tx, error) {
                console.error('Gagal menghapus tabel:', error);
            }); */
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS user (
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_name TEXT,
                    user_password TEXT,
                    user_nik TEXT,
                    position_id INTEGER,
                    position_name TEXT,
                    estate_id INTEGER,
                    estate_name TEXT,
                    divisi_id INTEGER,
                    divisi_name TEXT,
                    seksi_id INTEGER,
                    seksi_name TEXT,
                    blok_id INTEGER,
                    blok_name TEXT,
                    tph_id INTEGER,
                    tph_name TEXT
                )
            `);
            tx.executeSql('CREATE TABLE IF NOT EXISTS rkh (' +
                'rkh_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'rkh_rdate TEXT,' +
                'rkh_job TEXT,' +
                'estate_id INTEGER,' +
                'estate_name TEXT,' +
                'divisi_id INTEGER,' +
                'divisi_name TEXT,' +
                'seksi_id INTEGER,' +
                'seksi_name TEXT,' +
                'blok_id INTEGER,' +
                'blok_name TEXT,' +
                'blok_ha TEXT,' +
                'tph_id INTEGER,' +
                'tph_name TEXT,' +
                'rkh_masuk INTEGER,' +
                'rkh_tmasuk INTEGER,' +
                'rkh_date TEXT,' +
                'username TEXT,' +
                'position_id INTEGER' +
            ')');
            tx.executeSql('CREATE TABLE IF NOT EXISTS blok (' +
                'blok_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'blok_name TEXT,' +
                'estate_id INTEGER,' +
                'estate_name TEXT,' +
                'divisi_id INTEGER,' +
                'divisi_name TEXT,' +
                'seksi_id INTEGER,' +
                'seksi_name TEXT' +
            ')');
            tx.executeSql('CREATE TABLE IF NOT EXISTS tph (' +
                'tph_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'tph_name INTEGER,' +
                'blok_id INTEGER,' +
                'tph_thntanam INTEGER' +
            ')');
            tx.executeSql('CREATE TABLE IF NOT EXISTS panen (' +
                'panen_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'panen_card TEXT,' +
                'panen_date DATE,' +
                'tph_thntanam INTEGER,' +
                'panen_jml INTEGER,' +
                'user_id INTEGER,' +
                'estate_id INTEGER,' +
                'divisi_id INTEGER,' +
                'seksi_id INTEGER,' +
                'blok_id INTEGER,' +
                'tph_id INTEGER,' +
                'user_name TEXT,' +
                'estate_name TEXT,' +
                'divisi_name TEXT,' +
                'seksi_name TEXT,' +
                'blok_name TEXT,' +
                'tph_name TEXT,' +
                'sptbs_card TEXT,' +
                'panen_tp INTEGER,' +
                'panen_tpname TEXT,' +
                'panen_brondol INTEGER,' +
                'panen_geo TEXT,' +
                'panen_picture TEXT' +
            ')');
            tx.executeSql('CREATE TABLE IF NOT EXISTS sptbs (' +
                'sptbs_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'sptbs_card TEXT,' +
                'sptbs_date DATE,' +
                'sptbs_vendor INTEGER,' +
                'sptbs_material INTEGER,' +
                'sptbs_kecamatan INTEGER,' +
                'sptbs_driver INTEGER,' +
                'sptbs_createdby INTEGER,' +
                'estate_id INTEGER,' +
                'divisi_id INTEGER,' +
                'sptbs_createdname TEXT,' +
                'sptbs_drivername TEXT,' +
                'estate_name TEXT,' +
                'divisi_name TEXT,' +
                'sptbs_plat TEXT,' +
                'sptbs_listcard TEXT' +
            ')'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS tp (' +
                'tp_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'panen_tp INTEGER,' +
                'position_id INTEGER,' +
                'panen_tpname TEXT,' +
                'panen_tpnik TEXT,' +
                'divisi_id INTEGER,' +
                'panen_placement TEXT' +
            ')');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS vendor (' +
                'vendor_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'vendor_name TEXT' +
            ')');     
            tx.executeSql('CREATE TABLE IF NOT EXISTS material (' +
                'material_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'material_name TEXT' +
            ')');       
            tx.executeSql('CREATE TABLE IF NOT EXISTS driverdumptruck (' +
                'driverdumptruck_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'driverdumptruck_name TEXT,' +
                'driverdumptruck_position TEXT' +
            ')');        
            tx.executeSql('CREATE TABLE IF NOT EXISTS kecamatan (' +
                'kecamatan_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'kecamatan_name TEXT' +
            ')');         
            tx.executeSql('CREATE TABLE IF NOT EXISTS truk (' +
                'no_polisi TEXT PRIMARY KEY' +
            ')');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS pruning (' +
                'pruning_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'pruning_baris TEXT,' +
                'pruning_tp INTEGER,' +
                'pruning_pokok INTEGER,' +
                'pruning_pelepah INTEGER,' +
                'pruning_picture TEXT,' +
                'pruning_mandor INTEGER,' +
                'pruning_date DATE,' +
                'estate_id INTEGER,' +
                'divisi_id INTEGER,' +
                'estate_name TEXT,' +
                'divisi_name TEXT,' +
                'pruning_tpname TEXT,' +
                'pruning_mandorname TEXT,' +
                'blok_id INTEGER,' +
                'blok_name TEXT,' +
                'pruning_geo TEXT' +
            ')');        
            tx.executeSql('CREATE TABLE IF NOT EXISTS tphnumber (' +
                'tphnumber_card TEXT PRIMARY KEY' +
            ')');       
            tx.executeSql('CREATE TABLE IF NOT EXISTS sptbsnumber (' +
                'sptbsnumber_card TEXT PRIMARY KEY' +
            ')');       
            tx.executeSql('CREATE TABLE IF NOT EXISTS quarrynumber (' +
                'quarrynumber_card TEXT PRIMARY KEY' +
            ')');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS gradingtype (' +
                'gradingtype_id INTEGER,' +
                'gradingtype_name TEXT' +
            ')');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS grading (' +
                'grading_id  INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'sptbs_card TEXT,' +
                'sptbsid TEXT,' +
                'grading_tp INTEGER,' +
                'grading_tpname TEXT,' +
                'grading_date TEXT,' +
                'grading_user INTEGER,' +
                'gradingtype_id INTEGER,' +
                'gradingtype_name TEXT,' +
                'grading_qty INTEGER' +
            ')');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS absen (' +
                'absen_id  INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'absen_user INTEGER,' +
                'absen_username TEXT,' +
                'absen_type TEXT,' +
                'absen_tpname TEXT,' +
                'absen_date TEXT,' +
                'absen_time TEXT,' +
                'estate_id INTEGER,' +
                'estate_name TEXT,' +
                'divisi_id INTEGER,' +
                'divisi_name TEXT,' +
                'absen_geo TEXT,' +
                'absen_picture BLOB' +
            ')');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS wt (' +
                'wt_id  INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'wt_name TEXT,' +
                'wt_vendor INTEGER,' +
                'wt_jenis TEXT,' +
                'wt_sewa INTEGER' +
            ')');    
            tx.executeSql('CREATE TABLE IF NOT EXISTS quarrytype (' +
                'quarrytype_id  INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'quarrytype_sumber TEXT,' +
                'quarrytype_jenis TEXT' +
            ')');     
            tx.executeSql('CREATE TABLE IF NOT EXISTS quarry (' +
                'quarry_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'quarry_driver INTEGER,' +
                'quarry_jampergi TEXT,' +
                'quarry_jamtiba TEXT,' +
                'quarry_date TEXT,' +
                'quarry_checkerpengirim INTEGER,' +
                'quarry_checkerpenerima INTEGER,' +
                'quarry_card TEXT,' +
                'quarrytype_id INTEGER,' +
                'wt_id INTEGER,' +
                'quarry_estate1 INTEGER,' +
                'quarry_divisi1 INTEGER,' +
                'quarry_blok1 INTEGER,' +
                'quarry_estate2 INTEGER,' +
                'quarry_divisi2 INTEGER,' +
                'quarry_blok2 INTEGER,' +
                'quarry_estate1name TEXT,' +
                'quarry_divisi1name TEXT,' +
                'quarry_blok1name TEXT,' +
                'quarry_estate2name TEXT,' +
                'quarry_divisi2name TEXT,' +
                'quarry_blok2name TEXT,' +
                'quarry_geo1 TEXT,' +
                'quarry_geo2 TEXT' +
            ')');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS timbangan (' +
                'timbangan_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'timbangan_name TEXT,' +
                'timbangan_value TEXT' +
            ')');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS timbangansave (' +
                'timbangansave_name TEXT' +
            ')');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS apk (' +
                'apk_version TEXT' +
            ')');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS positionandroid (' +
            'android_name TEXT,' +
            'positionandroid_read INTEGER' +
            ')');  
            // notif('Create Table user Sukses');
            
        },
        (error) => {
            notif('Create Table: '+error.message);
        },
        () => {                    
            //ambil data dari server                    
            let masterarray1 = [
                'user_id',
                'user_name',
                'user_password',
                'user_nik',
                'position_id',
                'position_name',
                'estate_id',
                'estate_name',
                'divisi_id',
                'divisi_name',
                'seksi_id',
                'seksi_name',
                'blok_id',
                'blok_name',
                'tph_id',
                'tph_name'
            ];
            dataserver('alluser', 'user', masterarray1);

            let masterarray2 = [
                'rkh_id',
                'rkh_rdate',
                'rkh_job',
                'estate_id',
                'estate_name',
                'divisi_id',
                'divisi_name',
                'seksi_id',
                'seksi_name',
                'blok_id',
                'blok_name',
                'blok_ha',
                'tph_id',
                'tph_name',
                'rkh_masuk',
                'rkh_tmasuk',
                'rkh_date',
                'username'
            ];
            dataserver('rkhnow', 'rkh', masterarray2);

            let masterarray3 = [
                'blok_id',
                'blok_name',
                'estate_id',
                'estate_name',
                'divisi_id',
                'divisi_name',
                'seksi_id',
                'seksi_name'
            ];
            dataserver('datablok', 'blok', masterarray3);

            let masterarray4 = [
                'tph_id',
                'tph_name',
                'blok_id',
                'tph_thntanam'
            ];
            dataserver('datatph', 'tph', masterarray4);

            let masterarray5 = [
                'panen_tp',
                'position_id',
                'panen_tpname',
                'panen_tpnik',
                'divisi_id',
                'panen_placement'
            ];
            dataserver('tp', 'tp', masterarray5);

            let masterarray6 = [
                'vendor_id',
                'vendor_name'
            ];
            dataserver('datavendor', 'vendor', masterarray6);

            let masterarray7 = [
                'material_id',
                'material_name'
            ];
            dataserver('datamaterial', 'material', masterarray7);

            let masterarray8 = [
                'driverdumptruck_id',
                'driverdumptruck_name',
                'driverdumptruck_position'
            ];
            dataserver('driverdumptruck', 'driverdumptruck', masterarray8);

            let masterarray9 = [
                'kecamatan_id',
                'kecamatan_name'
            ];
            dataserver('datakecamatan', 'kecamatan', masterarray9);

            let masterarray10 = [
                'no_polisi'
            ];
            dataserver('datatrukpenerimaan', 'truk', masterarray10);

            let masterarray11 = [
                'tphnumber_card'
            ];
            dataserver('tphnumber', 'tphnumber', masterarray11);

            let masterarray12 = [
                'sptbsnumber_card'
            ];
            dataserver('sptbsnumber', 'sptbsnumber', masterarray12);
            
            let masterarray13 = [
                'gradingtype_id',
                'gradingtype_name'
            ];
            dataserver('gradingtype', 'gradingtype', masterarray13);

            let masterarray14 = [
                'quarrytype_id',
                'quarrytype_sumber',
                'quarrytype_jenis'
            ];
            dataserver('quarrytype', 'quarrytype', masterarray14);

            let masterarray15 = [
                'wt_id',
                'wt_name',
                'wt_vendor',
                'wt_jenis',
                'wt_sewa'
            ];
            dataserver('wt', 'wt', masterarray15);

            let masterarray16 = [
                'quarrynumber_card'
            ];
            dataserver('quarrynumber', 'quarrynumber', masterarray16);

            let masterarray17 = [
                'timbangan_id',
                'timbangan_name',
                'timbangan_value'
            ];
            dataserver('timbangan', 'timbangan', masterarray17);

            let masterarray18 = [
                'apk_version'
            ];
            dataserver('apk', 'apk', masterarray18);

            let masterarray19 = [
                'android_name',
                'positionandroid_read'
            ];
            dataserver('positionandroid?position_id='+positionid, 'positionandroid', masterarray19);
        });                  
    }else{
        syncfinished();
    }
}

function syncstarted(){
    $("#singkron").addClass("progress-bar-animated");
    $("#btn-singkron").attr("status","syncronizing");
    $("#singkron").text("Synchronizing");
}
function syncfinished(){
    $("#singkron").removeClass("progress-bar-animated");
    if($("#btn-singkron").attr("status")!=""){         
        playAudio('singkronselesai.mp3');
    }
    $("#btn-singkron").attr("status","");
    $("#singkron").text("Sync?");  
    cekversion();
    cekhalaman();
}