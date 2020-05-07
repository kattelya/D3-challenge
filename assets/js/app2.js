// https://www.d3-graph-gallery.com/graph/scatter_basic.html <- learn from this website to do this homework 
// use week 16 - day 2 exercise 6 for example and walk through for this homework.  

// Define SVG area dimensions 
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object 
var chartMargin = {
    top: 30,
    right: 50, 
    bottom: 50,
    left: 50
};

//Define dimensions of the chart area 
var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it and set the dimensions and shift ('translate') it to the right and to the bottom
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

// Load our csv from data folder 
d3.csv("/assets/data/data.csv").then(function(readdata, error){
    // Display error on console
    if (error) throw error;
    // check if we can read all the array 
    console.log(readdata);

    // select only data that we want to graph 
    readdata.forEach(function(data){
        readdata.age = +data.age;
        readdata.smokes = +data.smokes;
    })

    // gosh! my Graph is upside down from exercise 6
    // Create a linear scale for horizontal axis 
    var xLinearScale = d3.scaleLinear().domain([10, d3.max(readdata, d => d.age)]).range([0, width]);

    // Create as linear scale for vertical axis 
    var yLinearScale = d3.scaleLinear().domain([5, d3.max(readdata, d => d.smokes)]).range([height, 0]);

    // Create axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    // https://www.tutorialsteacher.com/d3js/axes-in-d3 <- use this website to review how to create x and y graph
    // Append two group elements to the chartGroup area and create the bottom and left axes inside of them 
    svg.append("g").attr("transform", 'translate(0, ${heigh}').call(bottomAxis);
    
    svg.append("g").call(leftAxis);



});

