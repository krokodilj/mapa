var mzajedniceController={}



	mzajedniceController.createMap=function(viewName){

		var map=d3.select("#"+viewName+"Map")
					.attr("viewBox",mapData.svg.viewBox)
					.attr("preserveAspectRatio","xMaxYMax")

		//animation
		var animation=function(time){
			map.selectAll("path").style("stroke-width","500px")
			map.selectAll("path").transition().duration(time).style("stroke-width","10px")
		}

		ddata=[]
		mzajedniceData.forEach(function(e,i){
			ddata.push(e.data)

			map.append("g")
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
			            tooltip
			            	.transition()		
			                .duration(200)		
			                .style("opacity", .9);		
					    tooltip	.html(d.name)	
					        .style("left", (d3.event.pageX) + "px")		
					        .style("top", (d3.event.pageY - 28) + "px");	
					})					
					.on("mouseout", function() {		
					    tooltip
					    	.transition()		
					        .duration(500)		
					        .style("opacity", 0);	
					})
		})

		map.selectAll("path").data(ddata)

		
		animation(2000)
	}

	mzajedniceController.createBtns=function(viewName){

		buttonContainer=d3.select("#"+viewName+"Btns")		
		var map=d3.select("#"+viewName+"Map")
		//animation
		var animation=function(time){
			map.selectAll("path").style("stroke-width","500px")
			map.selectAll("path").transition().duration(time).style("stroke-width","10px")
		}
		animation(2000)


		buttonContainer.append("button")
			.text("СВА НАСЕЉА")
			.attr("class","btn btn-primary")
			.on("click",function(){
				map.selectAll("path")
					.style("fill","blue")

				animation(750)
			})

		buttonContainer.append("button")
			.text("ГРАДСКЕ МЗ")
			.attr("class","btn btn-primary")
			.on("click",function(){
				//show city elements 
				//fill with blue

				map.selectAll("path")
					.style("fill","gray")

				map.selectAll("path")
					.filter(function(d){
						return d.type=="градска МЗ"
					})
					.style("fill","blue")

				animation(750)
				})

		buttonContainer.append("button")
			.text("ПРИГРАДСКЕ МЗ")
			.attr("class","btn btn-primary")
			.on("click",function(){
				//show suburb elements 
				//fill with blue


				map.selectAll("path")
					.style("fill","gray")

				
				map.selectAll("path")
						.filter(function(d){
							return d.type=="приградска МЗ"
						})
						.style("fill","blue")
				animation(750)

			})

		buttonContainer.append("button")
			.text("СЕОСКЕ МЗ")
			.attr("class","btn btn-primary")
			.on("click",function(){
				//show village elements 
				//fill with blue
				map.selectAll("path")
					.style("fill","gray")
				map.selectAll("path")
					.filter(function(d){
						return d.type=="сеоска МЗ"
					})
					.style("fill","blue")

				animation(750)

				})


	}