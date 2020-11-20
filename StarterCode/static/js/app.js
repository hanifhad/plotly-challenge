function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
    
        // Setup your top 10 OTU: 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    
        // Setup your ITU ID:
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
    
         // Obtain the top 10 labels:
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
    
            // Data Variable:
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);
    
    
    
            // create the bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
    
    
    
            // set up layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
    
    
    
            //  Data Variable:
            var data1 = [trace1];
          Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    
    
    
    
    
    // create the function to get the necessary data
    function getDemoInfo(id) {
    
        d3.json("samples.json").then((data)=> {
    
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter the meta data:
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // emptying the demographic info panel 
           demographicInfo.html("");
    
         // emptying the demographic info panel 
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // change event function
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // initial data fucntion
    function init() {
    
        var dropdown = d3.select("#selDataset");
    
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data:
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();