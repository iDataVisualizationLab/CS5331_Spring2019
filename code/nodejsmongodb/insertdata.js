const studenthandler = require('./modules/studenthandler');
const st1 = {'Name': 'Mr. A', 'Class': 'VVA'};
const st2 = {'Name': 'Ms. B', 'Class': 'VVB'};
studenthandler.insertStudent(st1, (result)=>{
   console.log(`Inserted ${result.ops.length} row(s)`);
});
studenthandler.insertStudent(st2, (result)=>{
    console.log(`Inserted ${result.ops.length} row(s)`);
});