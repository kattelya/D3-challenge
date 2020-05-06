// https://www.d3-graph-gallery.com/graph/scatter_basic.html <- learn from this website to do this homework 
// use week 16 - day 2 exercise 6 to read csv files using d3 
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

//Define dimensions of the chart area 
var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, and append SVG area to it and set the dimensions 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load our csv from data folder
d3.csv("./assets/data/data.csv", function(error, readdata){
    // Display error on console
    if(error) return console.warn(error)

    // read in our data
    readdata.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    })

    // Create a linear scale for horizontal axis 
    var xLinearScale = d3.scaleLinear().domain([10, d3.max(statedata, d => d.age)]).range([0, width]);

    // Create a linear scale for vertical axis 
    var yLinearScale = d3.scaleLinear().domain([5, d3.max(statedata, d => d.smokes)]).range([height, 0]);


    // Create axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append two group elements to the chartGroup area and create the bottom and left axes inside of them 
    chartGroup.append("g").attr("transform", 'translate(0, ${heigh}'). call(bottomAxis);
    chartGroup.append("g").call(leftAxis);

    // Create one svg circle per piece of our data 
    // Use the xLinarScale and yLinearScale
    // https://www.d3-graph-gallery.com/graph/scatter_basic.html <-- use this link to add code
    //  
    var circles = chartGroup.selectAll("circle")
        .data(readdata)
        .enter()
        .append("circle")
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("r", 1.5)
        .style("fill", "green")
        .attr("opacity", ".5");
    
    
 
    


}).catch(function(error){
    console.log(error);
});