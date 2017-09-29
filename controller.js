

//tooltip div
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

d3.select("#zoom_container").style("display","none")

		d3.select("#back_btn").on("click",function(){

			d3.select("#map_container").style("display","inline")
			d3.select("#zoom_container").style("display","none")
			d3.select("#zoom_container").select("svg").remove()

			animation(750)

		})

var timer


var svg=d3.select("#map_container").append("svg")
						.attr("height",mapData.svg.height)
						.attr("width",mapData.svg.width)
						.attr("viewBox",mapData.svg.viewBox)


var displayData = d3.select("#data_container")

ddata=[]
newData.forEach(function(e,i){

	ddata.push(e.data)

	svg.append("g")
				.attr("transform",function(){
					
					for(p in e.svg.transformByParent){
						return e.svg.transformByParent[p].transform
					}
				})
					.append("path")
						.attr("d",e.svg.path)

						.style("fill","blue")
							.style("stroke-width","5px")
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
								    d3.select("#map_container").style("display","none")
									d3.select("#zoom_container").style("display","inline")
								    //append
								    d3.select("#zoom_container")
								    	.append("svg")
								    		.attr("height",mapData.svg.height)
											.attr("width",mapData.svg.width)
											.attr("viewBox",e.svg.viewBox)
											.append("g")	

												//.attr("transform",element.transform)
													.append("path")

													.attr("style",e.svg.style)
													.attr("d",e.svg.path)

													.style("fill","blue")
													.data(d)
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

					        svg.selectAll("path").data(ddata)

})

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





