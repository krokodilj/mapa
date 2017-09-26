


//tooltip div
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var svg=d3.select("svg")

var data=[1,2,3,4,5,6,7,8,9]

svg.selectAll("path")
	.data(data)
					.style("fill","blue")
					.style("stroke-weight","5px")
					.style("stroke","#FFFFFF")
					.on("mouseover", function(d) {	
			            div.transition()		
			                .duration(200)		
			                .style("opacity", .9);		
			            div	.html(d)	
			                .style("left", (d3.event.pageX) + "px")		
			                .style("top", (d3.event.pageY - 28) + "px");	
			            })					
			        .on("mouseout", function() {		
			            div.transition()		
			                .duration(500)		
			                .style("opacity", 0);	
			        });
svg.append("g")
	.attr("transform", "translate(-3509,1506)")
	.append("path")
	.attr("d","m 2433.9992,-29.91345 17.5397,-14.1376 c 0,0 17.6776,-107.48024 23.3345,-115.25841 l 15.5563,-23.33452 9.8995,-57.27564 -10.6066,-47.37615 21.2132,-24.74873 m -76.9366,282.13105 -16.5,-16.5 -68,-26.5 -2,-8.99999 -26,-19.5 10,-34.5 -6.5,-5.5 2.5,-21.99999 -80.5,-21.5 -25.5,-61.49999 -58.4604,22.05014 -4.9492,-37.47665 7.0711,-19.79899 9.8994,0 9.1924,-43.1335 39.598,-0.70711 3.5355,-28.99137 8.4853,-16.26346 19.0919,-14.14213 27.5772,-7.77818 9.1923,-11.3137 9.1924,11.3137 17.6777,0 1.4142,-41.01218 7.0711,1.41421 9.8995,24.04163 32.5269,15.55634 45.9619,0 21.2132,5.65686 18.3848,-7.77818 11.3137,-22.62741 20.5061,3.53553 0,5.65686 12.7279,0 6.364,23.33452 9.1924,25.45584 -10.6066,7.77817 6.3639,39.59798")
	.style("fill","blue")
					.style("stroke-weight","5px")
					.style("stroke","#FFFFFF")


/////////////////drugi deo


var body = d3.select("body")


var svg=body.append("svg")
				.attr("height",mapData.height)
				.attr("width",mapData.width)
				.attr("viewBox",mapData.viewBox)
				.attr("transform",mapData.transform)

mapData.g.forEach(function(element,i){
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
			            div	.html(element.name)	
			                .style("left", (d3.event.pageX) + "px")		
			                .style("top", (d3.event.pageY - 28) + "px");	
			            })					
			        .on("mouseout", function() {		
			            div.transition()		
			                .duration(500)		
			                .style("opacity", 0);	
			        });
})

svg.selectAll("path").transition().duration(2000).style("stroke-width","10px")
	


