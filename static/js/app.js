// 1. Use the D3 library to read in `samples.json`.

const url = "samples.json";

// Fetch the JSON data 
d3.json(url).then(function(data) {
  console.log(data);
});

  initPlotly()

//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//use samples.json to populate names
function initPlotly() {
    d3.json("samples.json").then((data) => {
        var names = data.names;
        var dropdownMenu = d3.select("#selDataset");
        names.forEach((sample) => {
            dropdownMenu.append("option")
                .text(sample)
                .property("value");
        });

        var firstDisplay = names[0];
        build_barchart(firstDisplay);
        build_table(firstDisplay);


    });
}

//refresh dropdown when menue is changed
function optionChanged(new_name) {
    build_barchart(new_name);
    build_table(new_name);

}

function build_barchart(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var Jsonsection = samples.filter(sampleID => sampleID.id == sample);
        var object = Jsonsection[0];

        var otu_ids = object.otu_ids;
        var otu_lables = object.otu_labels;
        var sample_values = object.sample_values

        var BAR_layout = {
            title: "Top 10 Cultures in Belly Button",
        };

        //use slicer to select data

        var BAR_trace1 = [
            {
                y:otu_ids.slice(0, 10).map(otuID => `OTU ID:${otuID}`).reverse(),
                x:sample_values.slice(0,10).reverse(),
                text: otu_lables.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        //Show bar char output
        Plotly.newPlot("bar", BAR_trace1, BAR_layout)

        var bubble_layout = {
            title: "OTU Occurance",
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

        Plotly.newPlot("bubble", bubble_trace1, bubble_layout)

    })
}

function build_table(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.metadata;
        var Jsonsection = samples.filter(sampleID => sampleID.id == sample);
        var object = Jsonsection[0];
        var location = d3.select("#sample-metadata")

        console.log(object)
        // remove any events from the tbody to
        location.html("");

        Object.entries(object).forEach(([key, value]) => {
            var cell = location.append("tr");
            cell.append("td").html(`${key}`);
            cell.append("td").html(`${value}`);
        });

    })
}







