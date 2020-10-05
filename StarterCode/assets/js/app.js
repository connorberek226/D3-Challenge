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


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(stateData, err) {
    if (err) throw err;

    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
      });
    console.log(stateData);
    const xLinearScale = d3.scaleLinear()
      .domain([30000, d3.max(stateData, d => d.income) + 10000])
      .range([0, width]);

    const yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.healthcare) + 8])
      .range([height, 0]);

    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    const circlesGroup = chartGroup.append("g")
      .selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.income))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "teal")
      .attr("opacity", "1")
    
    const textGroup = chartGroup.append("g")
      .selectAll("text")
      .data(stateData)
      .enter()
      .append("text")
      .classed("text-group", true)
      .text(d => d.abbr)
      .attr("x", d => xLinearScale(d.income))
      .attr("y", d => yLinearScale(d.healthcare))
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("font_family", "sans-serif")  
      .attr("font-size", "12px")
      .attr("fill", "white")
      .style("font-weight", "bold");

    const toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
          return `${d.name}<br>Household Income: ${d.income}<br>Lack Health Care: ${d.healthcare}%`
    });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    textGroup.on("click", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data, index) {
              toolTip.hide(data);
        });

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("value", "healthcareLow")
        .classed("active", true)
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("value", "income")
    .classed("active", true)
    .text("Household Income (Median)");

    
}).catch(function(error) {
    console.log(error);
})
