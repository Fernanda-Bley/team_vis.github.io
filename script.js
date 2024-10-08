// Main function to initiate the entire process

// El minimo es 

function main() {
  loadCSVData('./InvestigacionMaximos/data/Population-Smokers-1997.csv')
    .then((csvData) => {
      processData(csvData);
      const plotData = preparePlotData();
      const mapLayout = prepareMapLayout();
      renderMap(plotData, mapLayout);
    })
    .catch((error) => {
      console.error('Error loading CSV:', error);
    });
  // loadCSVData('./InvestigacionMaximos/data/Population-Smokers-2010.csv')
  //   .then((csvData) => {
  //     processData(csvData);
  //     const plotData = preparePlotData();
  //     const mapLayout = prepareMapLayout();
  //     renderMap(plotData, mapLayout);
  //   })
  //   .catch((error) => {
  //     console.error('Error loading CSV:', error);
  //   });
}

// Helper function to extract a specific key's value from the dataset
function extractData(dataArray, key) {
  return dataArray.map(function (dataItem) {
    return dataItem[key];
  });
}

// Load the CSV file using d3
function loadCSVData(csvFilePath) {
  return d3.csv(csvFilePath, d3.autoType);
}

// Function to process the data and prepare it for plotting
function processData(smokerData) {
  smokerData.forEach((row) => {
    countryData.push({
      // population: row['Population']*row['Prevalence of current tobacco use (% of adults)'],
      population: row['Daily smoking prevalence - both (IHME, GHDx (2012))'],
      country: row['Entity'],
    });
  });
}

// Function to prepare plot data for Plotly
function preparePlotData() {
  return [
    {
      type: 'choropleth',
      locationmode: 'country names',
      locations: extractData(countryData, 'country'),
      z: extractData(countryData, 'population'),
      text: extractData(countryData, 'country'),
      hoverinfo: 'none',
      colorscale: [
        [0, '#72FFFF'],
        [0.5, '#0096FF'],
        [1, '#0002A1'],
      ],
      zmin: 3.2,
      zmax: 50.0,
      colorbar: {
        title: {
          text: 'Fumadores',
        },
      },
      autocolorscale: false,
    },
  ];
}

// Function to prepare the layout for the map
function prepareMapLayout() {
  return {
    title: {
      text: 'Fumadores diarios en 1997 (per capita)',
      // text: 'Total Smokers in the year 2010',
      x: 0.47,
      xanchor: 'center',
      y: 0.85,
      font: {
        size: 19, // increase the font size to your desired value
        family: 'Arial, sans-serif', // optional: specify a font family
        color: 'black', // optional: specify a font color
      },
    },
    geo: {
      projection: {
        type: 'robinson',
        bordercolor: 'red', // add this line
        borderwidth: 3, // add this line to specify the border width
      },
      showframe: false, 
      
    },
    annotations: [],
    width: 800, // adjust the width to your desired value
    height: 600, // adjust the height to your desired value
    margin: {
      l: 50, // adjust the left margin to your desired value
      r: 50, // adjust the right margin to your desired value
      t: 50, // adjust the top margin to your desired value
      b: 50, // adjust the bottom margin to your desired value
    },
  };
}

// Function to render the map using Plotly
function renderMap(plotData, layout) {
  const myDiv = document.getElementById('myDiv');
  myDiv.style.position = 'absolute';
  
  myDiv.style.left = '62px';
  Plotly.newPlot('myDiv', plotData, layout, { showLink: false });
  
  // Add the SVG element to the page
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('width', '800');
  svgElement.setAttribute('height', '600');
  svgElement.setAttribute('style', 'position: absolute; z-index: 1; top: 0; left: 0;');
  
  const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svgElement.appendChild(gElement);

  const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rectElement.setAttribute('x', '595.76667'); // adjust the x-coordinate to position the rectangle correctly
  rectElement.setAttribute('y', '270.68667'); // adjust the y-coordinate to position the rectangle correctly
  rectElement.setAttribute('width', '100'); // adjust the width of the rectangle
  rectElement.setAttribute('height', '30'); // adjust the height of the rectangle
  rectElement.setAttribute('fill', '#0002A1');
  gElement.appendChild(rectElement);
  
  const arrowElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
arrowElement.setAttribute('x1', '650'); 
arrowElement.setAttribute('y1', '300'); 
arrowElement.setAttribute('x2', '650'); 
arrowElement.setAttribute('y2', '320'); 
arrowElement.setAttribute('stroke', '#000'); 
arrowElement.setAttribute('stroke-width', '2'); 
gElement.appendChild(arrowElement);
  
const arrowPoint = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
arrowPoint.setAttribute('points', '650,320 660,310 640,310'); // define the points of the polygon
arrowPoint.setAttribute('fill', '#000'); // color of the polygon
gElement.appendChild(arrowPoint);

  

  const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textElement.setAttribute('xml:space', 'preserve');
  textElement.setAttribute('text-anchor', 'start');
  textElement.setAttribute('font-family', 'Noto Sans JP');
  textElement.setAttribute('font-size', '12');
  textElement.setAttribute('stroke-width', '0');
  textElement.setAttribute('id', 'svg_3');
  textElement.setAttribute('y', '280');
  textElement.setAttribute('x', '597.99998');
  textElement.setAttribute('stroke', '#000');
  textElement.setAttribute('fill', '#FFFFFF');
  textElement.textContent = 'Mayor prevaliencia:';
  gElement.appendChild(textElement);

  const name = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  name.setAttribute('xml:space', 'preserve');
  name.setAttribute('text-anchor', 'start');
  name.setAttribute('stroke-width', '0');
  name.setAttribute('id', 'svg_3');
  name.setAttribute('y', '295');
  name.setAttribute('x', '620');
  name.setAttribute('stroke', '#FFF');
  name.setAttribute('fill', '#FFFFFF');
  name.textContent = 'Kiribari';
  gElement.appendChild(name);


const rectElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rectElement2.setAttribute('x', '290.66667'); // adjust the x-coordinate to position the rectangle correctly
rectElement2.setAttribute('y', '390'); // adjust the y-coordinate to position the rectangle correctly
rectElement2.setAttribute('width', '325'); // adjust the width of the rectangle
rectElement2.setAttribute('height', '30'); // adjust the height of the rectangle
rectElement2.setAttribute('fill', '#00CCDD');
gElement.appendChild(rectElement2);

const textElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
textElement2.setAttribute('xml:space', 'preserve');
textElement2.setAttribute('text-anchor', 'start');
textElement2.setAttribute('font-family', 'Noto Sans JP');
textElement2.setAttribute('font-size', '12');
textElement2.setAttribute('stroke-width', '0');
textElement2.setAttribute('id', 'svg_3');
textElement2.setAttribute('y', '400.66667');
textElement2.setAttribute('x', '292.66667');
textElement2.setAttribute('stroke', '#000');
textElement2.setAttribute('fill', '#000000');
textElement2.textContent = 'Menor prevalencia:';
gElement.appendChild(textElement2);

const name2 = document.createElementNS('http://www.w3.org/2000/svg', 'text')
name2.setAttribute('xml:space', 'preserve');
name2.setAttribute('text-anchor', 'start');
name2.setAttribute('stroke-width', '1');
name2.setAttribute('id', 'svg_3');
name2.setAttribute('y', '415');
name2.setAttribute('x', '300.66667');
name2.setAttribute('stroke', '#000');
name2.setAttribute('fill', '#000000');
name2.textContent = 'República Democrática de São Tomé e Príncipe';
gElement.appendChild(name2);

  // Add the SVG element to the page
  const arrowElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
arrowElement2.setAttribute('x1', '370'); 
arrowElement2.setAttribute('y1', '295'); 
arrowElement2.setAttribute('x2', '300.99998'); 
arrowElement2.setAttribute('y2', '390.16667'); 
arrowElement2.setAttribute('stroke', '#000'); 
arrowElement2.setAttribute('stroke-width', '2'); 
gElement.appendChild(arrowElement2);

const arrowPoint2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
arrowPoint2.setAttribute('points', '371,290 355,300 370,310'); 
arrowPoint2.setAttribute('fill', '#000'); 
gElement.appendChild(arrowPoint2);
  document.getElementById('myDiv').appendChild(svgElement);
}

// Global variable to hold the data for countries
let countryData = [];

// Call the main function to run the code
main();
