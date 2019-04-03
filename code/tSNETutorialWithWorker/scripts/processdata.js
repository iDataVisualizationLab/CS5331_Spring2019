const data = readData();
const columnsToRemove = [4, 5, 7, 8, 14, 15];
// const step0Data = getNormalizedDataAtTimeStep(data, 0);
const step0Data = getDataAtTimeStep(data, 4);

startWorker("scripts/ThetSNEWorker.js", step0Data, draw);

function getDataAtTimeStep(data, step) {
    let result = []
    const computeList = d3.keys(sampleS);
    computeList.forEach(compute => {
        const theComputeData = data[compute];
        let point = [];
        const theAttributes = d3.keys(theComputeData).splice(1);
        theAttributes.forEach(attribute => {
            const attData = theComputeData[attribute];
            point = point.concat(attData[step]);
        });
        result.push(point);
    });
    result = result.map(item => {
        const point = [];
        item.forEach((v, i)=>{
            if(columnsToRemove.indexOf(i)<0){
                point.push(v);
            }
        });
        return point;
    });
    const averages = calculateAverage(result);
    result = result.map(row=>{
        row = row.map((d, i)=>{
            if(d!==undefined){
                return d;
            }else{
                return averages[i];
            }
        });
        return row;
    })
    return result;
    function calculateAverage(data){
        const numRows = data.length;
        const numCols = data[0].length;
        //Create and initialize the array.
        let result = [];
        let rowCounts = [];
        for (let i = 0; i < numCols; i++) {
            result.push(0);
            rowCounts.push(0);
        }
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if(data[i][j]!==undefined){
                    result[j] += data[i][j];//Add the value to the total value.
                    rowCounts[j] += 1;//Increase one for the row count
                }

            }
        }
        result = result.map((total, i) =>{
            return total/rowCounts[i];
        });
        return result;
    }
}
function getNormalizedDataAtTimeStep(data, step){
    const dataAtStep = getDataAtTimeStep(data, step);
    return standardScaler(dataAtStep);
}
function standardScaler(data){
    const columns = _.unzip(data);
    const averages = columns.map(column=>{
       return ss.mean(column);
    });
    const stdDevs = columns.map(column=>{
        return ss.standardDeviation(column);
    });

    const result = columns.map((column, i)=>{
        const normalizedColumns = column.map(d=>{
           return (d-averages[i])/stdDevs[i];
        });
        return normalizedColumns;
    });
    return _.unzip(result);
}
