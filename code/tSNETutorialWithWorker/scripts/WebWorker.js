let w;
function startWorker(fileName, data, onResult){
    if(typeof(Worker)!== "undefined"){
        if(w===undefined){
            w = new Worker(fileName);
            w.postMessage(data);
        }
        w.onmessage = function (event){
            onResult(event.data);
        };
    }
    else{
        throw "Browser doesn't support web worker";
    }
}
