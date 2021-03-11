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
    line: { 
      color: barColors[i],
      width: 2
    },
  });
}

//Add the total counts data
timeseriesData.push({
  type: "scatter",
  mode: "lines",
  name: 'Total',
  x: parsed_count_by_day.map(x => x._id.yearMonthDay),
  y: parsed_count_by_day.map(x => x.count),
  line: {
    width: 1,
  }
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