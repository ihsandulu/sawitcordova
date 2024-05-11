var db = null;
function addItem(table, columns, values, fungsilain) {
    let insertID;
    db.transaction(function (tx) {
        // Periksa apakah values merupakan array
        if (!Array.isArray(values)) {
            notif('Array values tidak valid');
            return;
        }

        // Bangun string kolom dan nilai
        var columnString = columns.join(', ');

        // Membangun string nilai untuk setiap baris data
        // var valueStrings = values.map(row => '(' + row.map(value => typeof value === 'string' ? "'" + value + "'" : value).join(', ') + ')');

        var valueStrings = values.map(row => '(' + row.map(value => {
            if (value === null) {
                return 'NULL';
            } else {
                return typeof value === 'string' ? "'" + value + "'" : value;
            }
        }).join(', ') + ')');
        


        var query = "INSERT INTO " + table + " (" + columnString + ") VALUES " + valueStrings.join(', ');
        if(table=="gradingtype"){
            // alert(values);
        }
        // $("#test").text(query+'\n');
        tx.executeSql(query, [], function (tx, res) {
            // notif("insertId: " + res.insertId + " -- mungkin 1");
            // notif("rowsAffected: " + res.rowsAffected + " -- seharusnya 1");
            // notif(query);
            insertID = res.insertId;
            fungsilain();
        },
        function (tx, error) {
            notif('Kesalahan INSERT: ' + error.message);
            // $("#test").text(error.message);
        });
    }, function (error) {
        notif('Kesalahan transaksi: ' + error.message);
    }, function () {
        // Transaksi selesai
    });
}
function updateItem(table, arraynya, id) {
    db.transaction(function (tx) {
        var query = "UPDATE " + table + " SET ";
        var updates = [];
        for (var key in arraynya) {
            if (arraynya.hasOwnProperty(key)) {
                // Memastikan nilai yang dikutip untuk string
                var value = typeof arraynya[key] === 'string' ? "'" + arraynya[key] + "'" : arraynya[key];
                updates.push(key + " = " + value);
            }
        }
        query += updates.join(", ") + " WHERE id = ?";
        notif("query: " + query);
        tx.executeSql(query, [id], function (tx, res) {
            notif("insertId: " + res.insertId);
            notif("rowsAffected: " + res.rowsAffected);
        },
            function (tx, error) {
                notif('UPDATE Transaksi error: ' + error.message);
            });
    }, function (error) {
        notif('Update error: ' + error.message);
    }, function () {
        // notif('transaction ok');
        // getDataUmum(table);
    });
}
function getDataWhere(table, namacari, isicari, kolom) {
    db.transaction(function (tx) {
        var query = "SELECT * FROM " + table + " WHERE " + namacari + " LIKE ?";
        tx.executeSql(query, ['%' + isicari + '%'], function (tx, resultSet) {
            $("#"+table).html('');
            var cell ='';
            let no=0;
            for (var x = 0; x < resultSet.rows.length; x++) {
                var row = tabel1.insertRow(x);
                for (let i = 0; i < data.length; i++) {
                    cell += '<td>'+ no+1 +'</td>';
                    for (let i = 0; i < kolom.length; i++) {
                        cell += '<td>'+resultSet.rows.item(x)[kolom[i]]+'</td>';
                    }
                }
                $("#"+table).html(cell);
                if (x < 1) {
                    notif("Tidak ada data!");
                }                
            }
        },
        function (tx, error) {
            notif('SELECT error: ' + error.message);
        });
    }, function (error) {
        notif('transaction error: ' + error.message);
    }, function () {
        notif('transaction ok');
    });
}
function successnfc() {
    notif('Menulis ke NFC Sukses!');
}
function failurenfc(error) {
    notif('SELECT error: ' + error.message);
}
function getDataUmum(table, kolom) {
    db.transaction(function (tx) {
        var query = "SELECT * FROM " + table;
        tx.executeSql(query, [], function (tx, resultSet) {
            $("#"+table).html('');
            var cell ='';
            let no=0;
            for (var x = 0; x < resultSet.rows.length; x++) {
                cell += '<td>'+ no+1 +'</td>';
                for (let i = 0; i < kolom.length; i++) {
                    cell += '<td>'+resultSet.rows.item(x)[kolom[i]]+'</td>';
                }
            }
            $("#"+table).html(cell);
            if (x < 1) {
                notif("Tidak ada data!");
            }
        },
        function (tx, error) {
            notif('SELECT error: ' + error.message);
        });
    }, function (error) {
        notif('transaction error: ' + error.message);
    }, function () {
        // notif('transaction ok');
    });
}



function deleteWhere(table, id) {

    db.transaction(function (tx) {

        var query = "DELETE FROM " + table + " WHERE " + table + "_id = ?";

        tx.executeSql(query, [id], function (tx, res) {
            notif("removeId: " + res.insertId);
            notif("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            notif('DELETE error: ' + error.message);
        });
    }, function (error) {
        notif('transaction error: ' + error.message);
    }, function () {
        notif('transaction ok');
    });
}
function deleteAll(table) {

    db.transaction(function (tx) {

        var query = "DELETE FROM " + table + " WHERE 1";

        tx.executeSql(query, [], function (tx, res) {
            notif("removeId: " + res.insertId);
            notif("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            notif('DELETE error: ' + error.message);
        });
    }, function (error) {
        notif('transaction error: ' + error.message);
    }, function () {
        notif('transaction ok');
    });
}
function deleteTable(table){
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS '+table+';');
        // notif('Delete Table SUkses');
    },
    (error) => {
        notif('Delete Table '+table+': '+error.message);
    },
    () => {
        // getDataUmum('pegawai');
    });
}
function getAll(table, dataarray) {
    db.transaction((tx) => {
        var query = "SELECT * FROM " + table;
        tx.executeSql(query, [], function (tx, resultSet) {
            if (resultSet.rows.length > 0) {
                for (var x = 0; x < resultSet.rows.length; x++) {
                    let data = {};

                    for (var y = 0; y < dataarray.length; y++) {
                        var columnName = dataarray[y];
                        var columnValue = resultSet.rows.item(x)[columnName];
                        data[columnName] = columnValue;
                    }
                    notif(data);
                }
            } else {
                notif("Tidak ada data!");
            }
        },
        function (tx, error) {
            notif('SELECT error: ' + error.message);
        });
    },
    (error) => {
        notif('Select Table ' + table + ': ' + error.message);
    },
    () => {
        // getDataUmum('pegawai');
    });
}
document.addEventListener('deviceready', function () {
    /* 
    var wwwDir = cordova.file.applicationDirectory + "www/";
    var dbPath = wwwDir + "my.db";

    window.resolveLocalFileSystemURL(dbPath, function (fileEntry) {
        notif('FileEntry ditemukan:'+fileEntry);
    
        if (fileEntry.isFile) {
            notif('File ditemukan:'+fileEntry.toURL());
        } else {
            notif('Path bukan merujuk ke file.');
        }
    }, function (error) {
        notif('File tidak ditemukan atau terjadi kesalahan:'+error);
    }); */

    db = window.sqlitePlugin.openDatabase({
        name: "my.db",
        location: 'default',
    });
    /* db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS pegawai (id INTEGER PRIMARY KEY, nama TEXT, umur INTEGER, alamat TEXT )');
    }, */
    /* db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS user;');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user (user_id	INTEGER PRIMARY KEY, user_name TEXT,position_id	INTEGER)');
    },
    (error) => {
        notif('Create Table: '+error.message);
    },
    () => {
        // getDataUmum('pegawai');
    }); */

    /*  window.sqlitePlugin.echoTest(function () {
         // notif('ECHO test OK');
         console.log('ECHO test OK');
     });
     window.sqlitePlugin.selfTest(function() {
         // notif('SELF test OK');
         console.log('SELF test OK');
     });
     var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
     db.transaction(function(tr) {
         tr.executeSql('SELECT upper(?) AS upperString', ['Test string'], function(tr, rs) {
             // notif('Got upperString result: ' + rs.rows.item(0).upperString);
             console.log('Got upperString result: ' + rs.rows.item(0).upperString);
         });
     }); */

});

