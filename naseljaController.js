var naseljaController={}



	//generate svg element and append to map
	naseljaController.createMap=function(viewName){
		
		

		var svg=d3.select("#"+viewName+"Map")
					.attr("viewBox",mapData.svg.viewBox)
					.attr("preserveAspectRatio","xMaxYMax")

		var timer
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
			        .on("click",function(d){
			        	if(d.clicked){
			        		//doubleclick event
			        		d.clicked = false;
						    clearTimeout(timer);
						    //create new view from element
						    addView(d.name,e)
						    selectView(d.name)
			        	}else{
		        		//single clicl event
							timer = setTimeout(function() {
  								d3.select("#"+viewName+"Data").html("назив : "+d.name+"<br> тип : "+d.type+"<br> популација : "+d.population+"		извор : "+d.populationSource)
			    	   			d.clicked=false
					        }, 300);
					        d.clicked = true;
	        		   	}
			});

	        svg.selectAll("path").data(ddata)

		})
	}


	naseljaController.createBtns=function(viewName){

		buttonContainer=d3.select("#"+viewName+"Btns")		
		map=d3.select("#"+viewName+"Map")
		//animation
		animation=function(time){
			map.selectAll("path").style("stroke-width","500px")
			map.selectAll("path").transition().duration(time).style("stroke-width","10px")
		}
		animation(2000)

		//color scale for heatmap "#ffffd9"
		colors = ["#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
		colorScale = d3.scaleLinear()
		    .domain([0, +1000,+2000,+4000,+8000,+16000,+32000,+64000])
		    .range(colors);

		
		buttonContainer.append("button")
			.text("СВА НАСЕЉА")
			.attr("class","btn btn-primary")
			.on("click",function(){
				map.selectAll("path")
					.style("fill","blue")

				animation(750)
			})

		buttonContainer.append("button")
			.text("ГРАДСКА НАСЕЉА")
			.attr("class","btn btn-primary")
			.on("click",function(){
				//show city elements 
				//fill with blue

				map.selectAll("path")
					.style("fill","gray")

				map.selectAll("path")
					.filter(function(d){
						return d.type=="градско насеље"
					})
					.style("fill","blue")

				animation(750)
				})

		buttonContainer.append("button")
			.text("ПРИГРАСКА НАСЕЉА")
			.attr("class","btn btn-primary")
			.on("click",function(){
				//show suburb elements 
				//fill with blue


				map.selectAll("path")
					.style("fill","gray")

				
				map.selectAll("path")
						.filter(function(d){
							return d.type=="приградско насеље"
						})
						.style("fill","blue")
				animation(750)

			})

		buttonContainer.append("button")
			.text("СЕОСКА НАСЕЉА")
			.attr("class","btn btn-primary")
			.on("click",function(){
				//show village elements 
				//fill with blue
				map.selectAll("path")
					.style("fill","gray")
				map.selectAll("path")
					.filter(function(d){
						return d.type=="сеоско насеље"
					})
					.style("fill","blue")

				animation(750)

				})

			buttonContainer.append("button")
				.text("РАСПОДЕЛА СТАНОВНИШТВА")
				.attr("class","btn btn-primary")
				.on("click",function(){
					map.selectAll("path")
						.style("fill",function(d){return colorScale(d.population)})

				animation(750)

			})
	}

	naseljaController.createCard=function(viewName){
		card=d3.select("#"+viewName+"Card")		
	}


