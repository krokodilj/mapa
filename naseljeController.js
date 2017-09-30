var naseljeController={}


	naseljeController.createMap=function(viewName,element){

		d3.select("#"+viewName+"Map")
			.attr("preserveAspectRatio","xMaxYMax")
			.attr("viewBox",element.svg.viewBox)
			.append("g")	
				.append("path")
					.attr("d",element.svg.path)
					.style("fill","blue")

	}

	naseljeController.createCard=function(viewName){
		card=d3.select("#"+viewName+"Card")
	}