// base code i take from this link: https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084
// use week 16-D3 activity 9 - to alter my codes 

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 70, left: 80},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// define the line - no need 
//var valueline = d3.line()
//    .x(function(d) { return x(d.age); })
//    .y(function(d) { return y(d.smokes); });

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/data.csv").then(function(stateData, error) {
  if (error) throw error;
  console.log(stateData);

  // Step 1: Parse our StateData - i have 19 columns and 51 rows object array
  stateData.forEach(function(d) {
    d.age = +d.age;
    d.smokes = +d.smokes;
  });

  // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(stateData, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.smokes)])
      .range([height, 0]);

     // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

  // Add the scatterplot 
  svg.selectAll(".dot")
      .data(stateData)
      .enter()
      .append("circle")
      .attr("r", 11)
      .attr("fill", "green")
      .attr("opacity", ".5")
      .attr("cx", d => xLinearScale(d.age))
      .attr("cy", d => yLinearScale(d.smokes))
    

    //https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e <- use this code to add x and y label  
    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(bottomAxis);

    // Add text label for the x axis
    svg.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + 
                     (height +35) + ")")
      .style("text-anchor", "middle")
      .text("Age");

    // Add the Y Axis
    svg.append("g")
      .call(leftAxis);
    
    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",35 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Smokes");  
    
    // text label for the Y Axis 
    // https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
    //svg.append("text")
    //.attr("transform", "rotate(-90)")
    //.attr("y", 0 - margin.left)
    //.attr("x", 0 - (height / 2))
    //.attr("smokes", "age")
    //.stype("text-anchor", "middle")
    //.text("Value");
    
    // append state abbreviations in circles
    svg.selectAll("stateArr")
      .data(stateData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.age))
      .attr("y", d => yLinearScale(d.smokes))
      .text(d => d.abbr)
      .attr('color', 'black')
      .attr('font-size', 10)
      .attr('text-anchor', 'middle');

    



}).catch(function(error) {
    console.log(error);
});
