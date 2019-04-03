const width = 800, height = 800,
    margin = {left: 20, top: 20, right: 20, bottom: 20},
    contentWidth = width - margin.left - margin.right,
    contentHeight = height - margin.top - margin.bottom;

const svg = d3.select("#theGraph").append("svg").attr("width", width).attr("height", height);

const maing = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.right})`);

function draw(data){
    const xScale = d3.scaleLinear().domain(getExtent(data, 0)).range([0, contentWidth]);
    const yScale = d3.scaleLinear().domain(getExtent(data, 1)).range([0, contentHeight]);
    const selection = maing.selectAll(".compute").data(data);
    //Exit
    selection.exit().remove();
    //Enter
    const newElements = selection.enter().append('circle').attr("class", "compute").attr("cx", d=>xScale(d[0])).attr("cy", d=>yScale(d[1])).attr("r", 3);
    //Update
    selection.attr("cx", d=>xScale(d[0])).attr("cy", d=>yScale(d[1])).attr("r", 3);
}
function getExtent(data, columnIndex) {
    return d3.extent(data.map(d=>d[columnIndex]));
}