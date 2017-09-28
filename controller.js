


//tooltip div
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


//display data div
var displayData = d3.select("#data_container")

var timer

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
					.style("cursor","pointer")
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
			        	if(d.clicked){
			        		//doubleclick event
			        		d.clicked = false;
						    clearTimeout(timer);
						    alert("doubleclick");
			        	}
			        	else{
			        		//single clicl event
			        		timer = setTimeout(function() {
					           displayData.html("назив : "+d.name+"<br> тип : "+d.type+"<br> популација : "+d.population+"		извор : "+d.populationSource)
			        			d.clicked=false
					        }, 300);
					        d.clicked = true;
			        		
			        	}
			        });
})


//bind data to polygons
svg.selectAll("path").data(data);


//animation
var animation=function(time){
svg.selectAll("path").style("stroke-width","500px")
svg.selectAll("path").transition().duration(time).style("stroke-width","10px")
}
animation(2000)

//color scale for heatmap "#ffffd9"
colors = ["#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
var colorScale = d3.scaleLinear()
    .domain([0, +1000,+2000,+4000,+8000,+16000,+32000,+64000])
    .range(colors);

//actions on buttons
d3.select("#all_btn")
	.on("click",function(){
		//show all elements 
		//fill with blue

		d3.selectAll("path")
			.style("fill","blue")

		animation(750)
	})

d3.select("#city_btn")
	.on("click",function(){
		//show city elements 
		//fill with blue

		d3.selectAll("path")
			.style("fill","gray")

		d3.selectAll("path")
			.filter(function(d){
				return d.type=="градско насеље"
			})
			.style("fill","blue")

		animation(750)
	})

d3.select("#suburb_btn")
	.on("click",function(){
		//show suburb elements 
		//fill with blue

		d3.selectAll("path")
			.style("fill","gray")

		d3.selectAll("path")
			.filter(function(d){
				return d.type=="приградско насеље"
			})
			.style("fill","blue")

		animation(750)

	})

d3.select("#village_btn")
	.on("click",function(){
		//show village elements 
		//fill with blue

		d3.selectAll("path")
			.style("fill","gray")

		d3.selectAll("path")
			.filter(function(d){
				return d.type=="сеоско насеље"
			})
			.style("fill","blue")

		animation(750)

	})

d3.select("#population_btn")
	.on("click",function(){

		d3.selectAll("path")
			.style("fill",function(d){return colorScale(d.population)})

	animation(750)

	})
