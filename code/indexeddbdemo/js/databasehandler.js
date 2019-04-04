function getDb(onsuccess){
    const dbrequest = indexedDB.open("studentdb");
    dbrequest.onupgradeneeded = function(){
        let db = dbrequest.result;
        if (!db.objectStoreNames.contains('tblStudents')){
            db.createObjectStore('tblStudents', {autoIncrement: true});
        }
    };
    dbrequest.onsuccess = function () {
        let db = dbrequest.result;
        onsuccess(db);
    }
}