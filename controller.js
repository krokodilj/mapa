//add tooltip
var tooltip = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0);

//view naselja
d3.select("#viewNaselja").on("click",function(){

	//add card to viewList
	addView("naselja")
})

var removeView=function(viewName){
	//remove from viewList
	d3.select("#"+viewName+"Card").remove()
	//remove from map_container
	d3.select("#"+viewName+"Map").remove()
	//remove from button_container	
	d3.select("#"+viewName+"Btns").remove()
	//remove from data_container
	d3.select("#"+viewName+"Data").remove()
}

var selectView=function(viewName){

	d3.select("#map_container")
		.selectAll("svg")
			.style("display","none")

	d3.select("#"+viewName+"Map")
		.style("display","inline")

	d3.select("#button_container")
		.selectAll("div")
			.style("display","none")

	d3.select("#"+viewName+"Btns")
		.style("display","inline")

	d3.select("#data_container")
		.selectAll("div")
			.style("display","none")

	d3.select("#"+viewName+"Data")
		.style("display","inline")
}

var addView=function(viewName,element){

	//add view list card
	{
		cardList=d3.select("#viewList")
		
		div=cardList.append("div")				
					.attr("id",viewName+"Card")
		div.append("button")
			.text(viewName)
			.on("click",function(){selectView(viewName)})
		div.append("button")
			.text("X")
			.on("click",function(){removeView(viewName)})
	}

	//add view data
	{
		dataContainer=d3.select("#data_container")

		dataContainer
			.append("div")
				.attr("id",viewName+"Data")
	}


	//add view map

    mapContainer=d3.select("#map_container")
	//
	if(viewName!="naselja") {

		
		mapContainer
		   	.append("svg")
		   		.attr("id",viewName+"Map")
		   		.attr("height",mapData.svg.height)
				.attr("width",mapData.svg.width)
				.attr("viewBox",element.svg.viewBox)
				.append("g")	
					.append("path")
						.attr("d",element.svg.path)
						.style("fill","blue")


		return 
	}
	var timer

	var svg=mapContainer.append("svg")
						.attr("id",viewName+"Map")
						.attr("height",mapData.svg.height)
						.attr("width",mapData.svg.width)
						.attr("viewBox",mapData.svg.viewBox)
						.attr("preserveAspectRatio","xMaxYMax")

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
					            tooltip.transition()		
					                .duration(200)		
					                .style("opacity", .9);		
					            tooltip	.html(d.name)	
					                .style("left", (d3.event.pageX) + "px")		
					                .style("top", (d3.event.pageY - 28) + "px");	
					            })					
					        .on("mouseout", function() {		
					            tooltip.transition()		
					                .duration(500)		
					                .style("opacity", 0);	
					        })
					        .on("click",function(d){

					        	if(d.clicked){
					        		//doubleclick event
					        		d.clicked = false;
								    clearTimeout(timer);

								    //create new view from element
								    addView(d.name,e)
								    selectView(d.name)
					        	}
					        	else{
					        		//single clicl event
					        		timer = setTimeout(function() {

							            d3.select("#naseljaData").html("назив : "+d.name+"<br> тип : "+d.type+"<br> популација : "+d.population+"		извор : "+d.populationSource)
					        			d.clicked=false
							        }, 300);
							        d.clicked = true;
					        		
					        	}
					        });

					        svg.selectAll("path").data(ddata)

	})

	//add view buttons
	{

		buttonContainer=d3.select("#button_container")

		div=buttonContainer
				.append("div")
					.attr("id",viewName+"Btns")
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

		
		div.append("button")
			.text("СВА НАСЕЉА")
			.on("click",function(){
				d3.selectAll("path")
					.style("fill","blue")

				animation(750)
			})

		div.append("button")
			.text("ГРАДСКА НАСЕЉА")
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

		div.append("button")
			.text("ПРИГРАСКА НАСЕЉА")
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

			div.append("button")
				.text("СЕОСКА НАСЕЉА")
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

			div.append("button")
				.text("РАСПОДЕЛА СТАНОВНИШТВА")
				.on("click",function(){
					d3.selectAll("path")
						.style("fill",function(d){return colorScale(d.population)})

				animation(750)

			})
	}


	
}




