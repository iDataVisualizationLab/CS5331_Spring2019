function getResource(url, processResult) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4){
            return;
        }
        if (this.status == 200) {
            const result = this.responseText;
            processResult(result);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}