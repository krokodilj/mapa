


//tooltip div
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

//display data div
var displayData = d3.select("#data_container")


//create map
var cnt = d3.select("#map_container")
var svg=cnt.append("svg")
				.attr("height",svgData.height)
				.attr("width",svgData.width)
				.attr("viewBox",svgData.viewBox)
svgData.g.forEach(function(element,i){
	svg.append("g")
		.attr("style",element.style)
		.attr("transform",element.transform)
			.append("path")

			.attr("style",element.path.style)
			.attr("d",element.path.d)

			.style("fill","blue")
					.style("stroke-width","500px")
					.style("stroke","#FFFFFF")
					.on("mouseover", function(d) {	
			            div.transition()		
			                .duration(200)		
			                .style("opacity", .9);		
			            div	.html(d.name)	
			                .style("left", (d3.event.pageX) + "px")		
			                .style("top", (d3.event.pageY - 28) + "px");	
			            })					
			        .on("mouseout", function() {		
			            div.transition()		
			                .duration(500)		
			                .style("opacity", 0);	
			        })
			        .on("click",function(d){
			        	displayData.html("назив : "+d.name+"<br> тип : "+d.type+"<br> популација : "+d.population+"		извор : "+d.populationSource)
			        });
})


//bind data to polygons

svg.selectAll("path").data(data);


svg.selectAll("path").transition().duration(2000).style("stroke-width","10px")
	


