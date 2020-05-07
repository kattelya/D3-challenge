// use week 16 day 2 and exercise 6 as my base code and alter it according to the need. 
// https://www.youtube.com/watch?v=M2s2jowLkUo
//https://www.youtube.com/watch?v=NlBt-7PuaLk

// Define SVG area dimensions

var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("/assets/data/data.csv").then(function(stateData) {

  console.log(stateData);

  // Cast the hours value to a number for each piece of tvData
  stateData.forEach(function(d) {
    d.age = +d.age;
    d.smokes = +d.smokes;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(stateData.map(d => d.age))
    .range([0, chartWidth])
    //.padding(0.3);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.smokes)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  //chartGroup.selectAll(".circle")
    chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    //.attr("class", "bar")
    .attr("cx", d => xBandScale(d.age) + xBandScale.bandwidth()/2)
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", xBandScale.bandwidth()/2)
    .attr("height", d => chartHeight - yLinearScale(d.smokes));

}).catch(function(error) {
  console.log(error);
});
