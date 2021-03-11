var allLabels = [
  "Rhinopoma muscatellum",
  "Myotis emarginatus",
  "Pipistrellus kuhli",
  "Asellia tridens",
  "Rousettus aegyptius",
  "Eptesicus bottae",
  "Rhyneptesicus nasutus",
  "Taphozous perforatus"
];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var barColors = ["#a8e6cf", "#a3bded", "#e4dcf1", "#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#cbdadb"]
// ----------------bar chart--------------

var trace1 = {
  x: [1, 2, 3, 4],
  y: [1, 4, 9, 16],
  name: "A.Tridens",
  type: "bar",
  marker: { color: "#a8e6cf" },
};
var trace2 = {
  x: [1, 2, 3, 4],
  y: [6, 8, 4.5, 8],
  name: "E. Bottae",
  type: "bar",
  marker: { color: "#a3bded" },
};
var trace3 = {
  x: [1, 2, 3, 4],
  y: [15, 3, 4.5, 8],
  name: "P. kuhli",
  type: "bar",
  marker: { color: "#e4dcf1" },
};

var trace4 = {
  x: [1, 2, 3, 4],
  y: [1, 3, 3, 4],
  name: "R. muscatellum",
  type: "bar",
  marker: { color: "#ff8b94" },
};
var trace5 = {
  x: [1, 2, 3, 4],
  y: [1, 4, 9, 16],
  name: "R. aegyptius",
  type: "bar",
  marker: { color: "#ffaaa5" },
};
var trace6 = {
  x: [1, 2, 3, 4],
  y: [6, 8, 4.5, 8],
  name: "T. perforatus",
  type: "bar",
  marker: { color: "#ffd3b6" },
};
var trace7 = {
  x: [1, 2, 3, 4],
  y: [15, 3, 4.5, 8],
  name: "R. nasutus",
  type: "bar",
  marker: { color: "#dcedc1" },
};

var trace8 = {
  x: [1, 2, 3, 4],
  y: [1, 3, 3, 4],
  name: "M. Emarginatus",
  type: "bar",
  marker: { color: "#cbdadb" },
};

var barData = []
for (let i = 0; i < 8; ++i) {
  barData.push({
    x: months,
    y: parsed_bar_counts[allLabels[i]].counts,
    name: allLabels[i][0] + '. ' + allLabels[i].split(' ')[1],
    type: 'bar',
    marker: { color: barColors[i] },
  });

}
console.log(barData)

var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
var layout = {
  xaxis: { title: "X axis" },
  yaxis: { title: "Y axis" },
  barmode: "relative",
  margin: { t: 0, r: 0 }, // no left and bottom margin so that scale is visible
  fontsize: 18,
  marker: { color: "#2f4b7c" },
};
var config = { responsive: true };

Plotly.newPlot("barChart", barData, layout, config);


// --------------Pie chart-------------------

var ultimateColors = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];

var data = [
  {
    values: parsed_pie_counts.map(x => x.count),
    labels: parsed_pie_counts.map(x => x._id[0] + '. ' + x._id.split(' ')[1]),
    type: "pie",
    marker: {
      colors: ultimateColors,
    },
    domain: {
      row: 0,
      column: 0,
    },
    hoverinfo: "label+percent",
    textinfo: "percent+label",
    // textposition: "outside",
    automargin: true,
  },
];

var layout = {
  margin: { t: 0, b: 0, l: 0, r: 0 },
  showlegend: false,
  fontsize: 18,
};

Plotly.newPlot("pieChart", data, layout, config);

// ------- HISTOGRAM PLOT

var histData = []
for (let i = 0; i < 8; ++i) {
  histData.push({
    x: parsed_all_dates[allLabels[i]],
    name: allLabels[i][0] + '. ' + allLabels[i].split(' ')[1],
    type: 'histogram',
    marker: { color: barColors[i] }
  });
}

Plotly.newPlot('histogram', histData, { barmode: "stack", autosize: true, bargap: 0 });

// ----- TIMESERIES PLOT


var data = [
  {
    x: parsed_count_by_day.map(x => x._id.yearMonthDay),
    y: parsed_count_by_day.map(x => x.count),
    type: 'scatter'
  }
];

var timeseriesData = []
for (let i = 0; i < 8; ++i) {
  timeseriesData.push({
    type: "scatter",
    mode: "lines",
    name: allLabels[i][0] + '. ' + allLabels[i].split(' ')[1],
    x: parsed_count_by_day_by_species[allLabels[i]].dates,
    y: parsed_count_by_day_by_species[allLabels[i]].counts,
    line: { color: barColors[i] },
  });
}

//Add the total counts data
timeseriesData.push({
  type: "scatter",
  mode: "lines",
  name: 'Total',
  x: parsed_count_by_day.map(x => x._id.yearMonthDay),
  y: parsed_count_by_day.map(x => x.count),
});


var layout = {
  xaxis: {
    autorange: true,
    range: ["2020-01-01", "2021-03-15"],
    rangeselector: {
      buttons: [
        {
          count: 1,
          label: "1m",
          step: "month",
          stepmode: "backward",
        },
        {
          count: 6,
          label: "6m",
          step: "month",
          stepmode: "backward",
        },
        { step: "all" },
      ],
    },
    rangeslider: { range: ["2020-01-01", "2021-03-15"] },
    type: "date",
  },
  yaxis: {
    autorange: true,
    range: [0, 5],
    type: "linear",
  },
};


Plotly.newPlot("timeSeriesChart", timeseriesData, layout, config);
