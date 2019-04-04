const studentHandler = new StudentHandler();

function addStudent(st) {
    studentHandler.put(st, () => {
        console.log("Insert sucessfully");
    });
}

function loadStudents() {
    studentHandler.loadAll((cursor, onComplete) => {
        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        } else {
            //Completed looping call the onComplete to close conn.
            console.log("Done");
            onComplete();
        }
    });
}