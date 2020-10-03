// @TODO: YOUR CODE HERE!
function xScale(stateData, chosenXAxis) {
  
  const xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.5,
        d3.max(stateData, d => d[chosenXAxis]) * 0.5
    ])
    .range([0, width]);

  return xLinearScale;



}

























d3.csv("./assets/data/data.csv").then (function(stateData, err) {
    if (err) throw err;

    console.log(stateData);





}).catch(function(error) {
  console.log(error);
});


var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
