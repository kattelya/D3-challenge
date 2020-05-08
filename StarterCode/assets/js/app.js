// use week 16 day 2 and exercise 6 as my base code and alter it according to the need. 
// use this youtube for some modification and labeling
// https://www.youtube.com/watch?v=M2s2jowLkUo
// https://www.youtube.com/watch?v=NlBt-7PuaLk

// Define SVG area dimensions
var width = 960;
var height = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = width - chartMargin.left - chartMargin.right;
var chartHeight = height - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// setup x 
var xValue = function(d) {return d.age;},
    xScale = d3.scaleLinear().range([0, width]),
    xMap = function(d) {return xScale(xValue(d));},
    xAxis = d3.axisBottom().scale(xScale);

// setup y
var yValue = function(d) {return d.smokes;},
    yScale = d3.scaleLinear().range([height, 0]),
    yMap = function(d) {return yScale(yValue(d));},
    yAxis = d3.axisLeft().scale(yScale);

// setup fill color


// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("/assets/data/data.csv").then(function(stateData) {

  console.log(stateData);

  // Step 1: Parse our StateData - i have 51 object array
  stateData.forEach(function(d) {
    d.age = +d.age;
    d.smokes = +d.smokes;
  });

  // Step 2: Create scale functions for our x and Y 
  //var xLinearScale = d3.scaleLinear()
  //  .domain([])








}).catch(function(error) {
    console.log(error);
});