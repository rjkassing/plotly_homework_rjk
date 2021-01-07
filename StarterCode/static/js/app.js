// 1. Use the D3 library to read in `samples.json`.

const url = "samples.jason";

// Fetch the JSON data 
d3.json(url).then(function(data) {
  console.log(data);
});


//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//use samples.json to populate names
    d3.json("samples.json").then(data) => {
        var names = data.names;

        names.forEach((sample) => {
            dropdownMenu.append("option")
                .text(sample)
                .property("value", simple);
        });

        var firstDisplay - names[0];
        build_barchart(firstDisplay);
        build_bubble(firstDisplay);


    });
}

//refresh dropdown when menue is changed
function optionChanged(new_name) {
    build_barchart(new_name);
    build_bubble(new_name);

}

function build_barchart(sample) {
    d3.json("samples.json").then((data) => {
        var samples - data.samples;
        var Jsonsection = samples.filter(sampleID => sample.ID.id == smaple);
        var object = Jsonsection[0];

        var otu_ids = object.otu_ids;
        var otu_lables = object.otu_lables;
        var sample_values - object.sample_values

        var BAR_layout = {
            title: "Top 10 Cultures in Belly Button"
            margin {t:50, l: 150}
        };

        //use slicer to select data

        var BAR_trace1 = [
            {
                y:otu_ids.slice(0, 10).map(otuID => 'OTU ID: ${outID}').reverse(),
                x:sample_values.slice(0,10).reverse(),
                text: otu_lables.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        //Show bar char output
        Plotly.newPlot("bar", BAR_trace1, BAR_layout)
//same process for the bubble chart? Ask Niharika if I can use the same variables

var bubble_layout - {
    title: "OTU Occurance"
    showlegend: false,
    height: 600,
    width: 1200
};

// apply slicer
var bubble_trace1 = [
    {
        y:sample_values,
        x:otu_ids,
        text: otu_lables,
        mode: 'markers',
        marker: {
            color:otu_ids,
            size: sample_values
        }
    }
]



    }
    )
}




/// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

//drop down
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function initPlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  array.forEach(element => {dropdownMenu.append("option").text(element).property("value",element)
    
  });



