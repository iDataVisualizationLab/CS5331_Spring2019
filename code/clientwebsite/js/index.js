const baseUrl = 'http://localhost:8888';
const insertCmd = '/insert';
const selectCmd = '/select';
function insertStudent(st){
    let objKeys = Object.keys(st);
    let query = `${objKeys[0]}=${st[objKeys[0]]}`;//First parameter
    for (let i = 1; i < objKeys.length; i++) {//Other parameters
        let theKey = objKeys[i];
        query += `&${theKey}=${st[theKey]}`
    };
    const url = baseUrl + insertCmd + '?' + query;
    getResource(url, result=>{
        console.log(result);
    });
}
function selectStudents(){
    const url = baseUrl + selectCmd;
    getResource(url, result=>{
        console.log(result);
    });
}