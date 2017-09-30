//add tooltip
var tooltip = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0);

//view naselja
d3.select("#viewNaselja").on("click",function(){

	//add card to viewList
	addView(mapData.data.name,mapData)
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
		
		card=cardList.append("div")				
					.attr("id",viewName+"Card")	
		card.append("button")
			.text(viewName)
			.attr("class","btn btn-primary")
			.on("click",function(){selectView(viewName)})
		card.append("button")
			.text("X")
			.attr("class","btn btn-primary")
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
	{
		mapContainer=d3.select("#map_container")
		mapContainer
					.append("svg")
						.attr("id",viewName+"Map")
	}

	//add view buttons
	{
		buttonContainer=d3.select("#button_container")
		buttonContainer
			.append("div")
				.attr("id",viewName+"Btns")
	}

	if(viewName=="naselja"){
		naseljaController.createCard(viewName)
		naseljaController.createMap(viewName)
		naseljaController.createBtns(viewName)
	}else if(viewName=="mesne zajednice"){
			//TODO
	}else{
		//kreiraj view iz elementa naselje
		naseljeController.createCard(viewName)
		naseljeController.createMap(viewName,element)
	}

}


///util
var a=true

d3.select("#toggleBorders")
	.on("click",function(){
		style="solid"
		if(a)
			style="none"
		d3.selectAll(".cnt")
			.style("border-style",style)

		a=!a
	})


