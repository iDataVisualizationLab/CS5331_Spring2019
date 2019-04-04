const studenthandler = require('./modules/studenthandler');
studenthandler.selectAll((cursor, onComplete) => {
    cursor.forEach(doc => {
        console.log(doc);
    }, () => {
        onComplete();//At the end of the loop, close the connection
    });
});