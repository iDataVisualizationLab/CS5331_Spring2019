class StudentHandler {
    put(st, onSuccess) {
        getDb(db => {
            const tx = db.transaction('tblStudents', 'readwrite');
            const tbl = tx.objectStore('tblStudents');
            tbl.put(st).onsuccess = () => {
                onSuccess();
                db.close();//close the connection
            };
        });
    }

    loadAll(onSuccess) {
        getDb(db => {
            const tx = db.transaction('tblStudents', 'readonly');
            const tbl = tx.objectStore("tblStudents");
            tbl.openCursor().onsuccess = (evt) => {
                const cursor = evt.target.result;
                onSuccess(cursor, () => {
                    db.close();//close the connection
                });
            }
        });
    }
}