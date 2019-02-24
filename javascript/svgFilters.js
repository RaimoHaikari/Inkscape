function Filters() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
	
    var dom;
    var originalImageDivId = "#alkuperaiset";	// Objekti, johon muokkaamattomat kuvat piirretaan
    var originalImageDiv;
	
	var modelImages;		  // Suodattimien toimintaa esittelevät objektit sisältävä kokoelma
	
	var targetElements;		  // erilaisia kuvia sisältävä g-elementit, joihin suodattimet kytketään
	
    var tabPaneIdPrefix = "filter_no";	// Ryhmät ja niiden sisältämät suodattimet esittellään. 
    									// Bootstrap Vertical tabs -komponentin avulla.
    									// Välilehdet ja niitä vastaavat sisällöt yhdistään
    									// hyperlinkin ja vastaavan id-tunnuksen omaavan listaelementin 
    									// avulla. 
    									//
    									// prefixin avulla ryhmiä vastaavat id & href nimet pysytään 
    									// muodostamaan yhtenevällä tavalla, joka mahdollistaa halutun  
    									// välilehden paikantamisen jälkikäteen.
    									//
    									// Tämän ansiosta Vertical tabs -dataliitoksia ei todennäköisesti
    									// kannata erikseen tallentaa.  

    var activeLayer;		  // Valittuna olevan esittelygrafiikan toteuttavan g-elementin id-tunnus

    var layerVisibility = {}; // Demottavam kuvan g-elementit kokoava objekti, jonka avulla määritetään
    						  // esikatselukuvissa tulostettavat kerrokset	
							  
	var applyFilter = {};	  // Demottavan kuvan g-elementit kokoava objekti, jonka avulla määrietään
    						  // kerrokset, joihin suodatin kohdistetaan

	
    var data;				// Visualisoitava data
    var liitos;				// dataliitos

	var repaint = function(){
    	console.log("Pitäs päivittää näyttö");
    }
	
    function chart(selection) {

    	selection.each(function() {
			
			modelImages = d3.map();
			
			targetElements = d3.map();
    		targetElements.set("Path", addPath);	
			targetElements.set("Chicken", addChicken);
			
			activeLayer = "Path";
			
    		layerVisibility["Path"] = ("Path"===activeLayer)?true:false;
			layerVisibility["Chicken"] =  ("Chicken"===activeLayer)?true:false;
			
			applyFilter["Path"] = true;
    		applyFilter["Chicken"] = true;

            dom = d3.select(this); 
            originalImageDiv = d3.select(originalImageDivId);
            		
			setupOriginalImage();
			
			setupVerticalTabs();
			
			setupFilters();
			
			bar();
    	});
    }
	
	var bar = function(){
		var svgFile_BIRD = "img/basic.svg";
		
		var sImage = SVGImage()
			.width(200)
			.height(200)
			.filename(svgFile_BIRD);
		
		var tmp = originalImageDiv
			.append("div")
			.attr("id","testimesta");
			
		var domdom = d3.select("#testimesta");
		
		// domdom.call(sImage);
		tmp.call(sImage);
	}
	
    /*
     * Lisätään parametrin välittämään SVG -runkoon grafiikkaa esittävä kerros
     * 
     * @param s SVG -runko, johon grafiikkakerros lisätään
     * @param id grafiikkakerrokselle annettava id-tunnus
	 *
	 * copied: 11.2.2019
     */
    var addChicken = function(s,id){	
    	
    	var targetElem = s.append("g")
			.attr("class","filterTarget")    	
			.attr("id",id)
    		.attr("stroke-linejoin","miter")
    		.attr("fill-rule","nonzero")
    		.attr("stroke-dashoffset","0")
    		.attr("stroke","#000")
    		.attr("stroke-linecap","butt")
    		.attr("stroke-dasharray","none")
    		.attr("stroke-miterlimit","4");
    		
    	
    	targetElem
			.append("rect")
				.attr("id","rect7192")
				.attr("style","enable-background:accumulate;color:#000000;")
				.attr("height","81.83")
				.attr("width","107.03")
				.attr("y","19.085")
				.attr("x","46.485")
				.attr("stroke-width","0.075259")
				.attr("fill","#808000");

    	targetElem
			.append("path")
				.attr("id","path7962")
				.attr("style","enable-background:accumulate;color:#000000;")
				.attr("transform","matrix(0.75259264,0,0,0.75259264,49.551074,-40.078254)")
				.attr("stroke-width","0.1")
				.attr("fill","#000")
				.attr("d","m46.653,108.32a18.059,18.059,0,1,1,-36.118,0,18.059,18.059,0,1,1,36.118,0z");

    	targetElem
			.append("id","rect7966")
				.attr("style","enable-background:accumulate;color:#000000;")
				.attr("fill","#000")
				.attr("stroke-width","0.10000001")
				.attr("transform","matrix(0.75259264,0,0,0.75259264,0,-6.6666724)")
				.attr("d","M126.84,57.531v39.125h-13.53v9.404h13.53v5.25h12.07v-5.25h13.53v-9.404h-13.53v-39.125h-12.07z");

    	targetElem
			.append("path")
				.attr("id","path7964")
				.attr("style","enable-background:accumulate;color:#000000;")
				.attr("fill","#000")
				.attr("stroke-width","0.1")
				.attr("transform","matrix(0.75259264,0,0,0.75259264,107.87977,-40.078254)")
				.attr("d","m46.653,108.32a18.059,18.059,0,1,1,-36.118,0,18.059,18.059,0,1,1,36.118,0z");  
    	
    	targetElem
			.append("path")
				.attr("id","path7971")
				.attr("style","enable-background:accumulate;color:#000000;")
				.attr("stroke-width","0.75259262")
				.attr("fill","#F00")
				.attr("d","M61.209,79.973c42.951,33.457,57.581,11.152,77.581-0.567z");
    }  
  	
	
   /*
     * Lisätään parametrin välittämään SVG -runkoon grafiikkaa esittävä kerros
     * 
     * @param s SVG -runko, johon grafiikkakerros lisätään
     * @param id grafiikkakerrokselle annettava id-tunnus
	 M50,90c-50,0-50-60,0-60h100c50,0,50,60,0,60z
     */
    var addPath = function(s,id){	
	
    	var targetElem = s.append("g")
			.attr("class","filterTarget")
			.attr("id",id)
    	
    	targetElem
			.append("path")
				.attr("fill","none")
				.attr("stroke","#D90000")
				.attr("stroke-width",10)
    			.attr("d","M50,90 C0,90 0,30 50,30 L150,30 C200,30 200,90 150,90 z");
    	
    	targetElem 
			.append("path")
				.attr("fill","#D90000")
				.attr("d","M60,80 C30,80 30,40 60,40 L140,40 C170,40 170,80 140,80 z");
    	
    	var tmp = targetElem
    		.append("g")
    			.attr("fill","#FFFFFF")
    			.attr("stroke","black")
    			.attr("font-size","45px")
    			.attr("font-family","Verdana")
    			
    	tmp
    		.append("text")
    			.attr("x",52)
    			.attr("y",76)
    			.text(function () { return "SVG"; })
    }
	
    
	/*
	 * copied: 11.2.2019
	 */
    var changeImages = function(param1){

    	// Päivitetään kerrosten näkyvyydet kokoava objekti
		for (var property in layerVisibility) {
			
		    if (layerVisibility.hasOwnProperty(property)) {
		    	layerVisibility[property] = (property==param1.id)?true:false;
		    }
		}
    	
    	var tmp = modelImages.values();
	
    	tmp.forEach( function (arrayItem){
    		arrayItem.layerVisibility(layerVisibility);		// Välitetään mallikuville viesti aktiivisesta kerroksesta
    	});
    }   
	
    /*
     * Päivitettän demokerrokset listaavan objektin muotoiluasetukset
	 
	 			.selectAll("div.original")
    		.data(targetElements.keys())
    		.enter()
    		.append("div")
    			.attr("class",function(d){
    				return d===activeLayer?"card bg-success mb-3 original":"card bg-light mb-3 original";
    			})
				
				
	 *
	 * copied: 11.2.2019
     */
    var repaintOriginalImage = function(){
    	
    	 var datajoin = originalImageDiv
			.selectAll("div.original")
			.data(targetElements.keys());
    	 
    	 datajoin
			.attr("class",function(d){
				return d===activeLayer?"card bg-success mb-3 original":"card bg-light mb-3 original";
				//return d===activeLayer?"original active":"original";
			})
    } 
	
    /*
     * Käydään läpi käytettävissä olevat suodattimet listaava objekti.
     * 
     * Suodattimet on koottu ryhmiin. 
     * - alustetaan jokaista suodatinta vastaava objekti
     */
    var setupFilters = function(){
    	
    	for(var i = 0; i < data.length; i++){

    		var selector = "#" + tabPaneIdPrefix + i;	
    		var tmp = d3.select(selector);  // Linkki ryhmää vastaavaan välilehteen 
   		
    		setupGroup(data[i],tmp);
    	}
    }
	
   /*
     * Ryhmän kuuluvien suodattimien kuvakkeiden lisäys ryhmäsivulle.
	 *
	 * Eli:
	 * - jokaiselle suodatinryhmälle on omistettu oma välilehti
	 * - ryhmä jokaiselle suodattimelle avataan oma kortti
	 *   jossa esitetään käsitelty kuva
	 *
     * Jokaiselle suodattimelle alustetaan oma ModelImage -objekti, jonka
     * avulla suodattimen käyttöä on tarvittaessa mahdollista kontrolloida.
     *  
     * @param g Ryhmän, esim. Distort, suodattimet kokoava objekti
     * @param selection ryhmän kuvakkeille omistettu välilehti
	 *
     */
    var setupGroup = function(g, selection){
    	
    	for(var i = 0; i < g.children.length; i++){
			
  			var widget = selection
  				.append("div")
					.classed("card", true);
					
			widget
  				.append("div")
				.classed("card-header", true)
  				.text(function(){
  					return g.children[i].attributes.label}
  				)
  			
  			var s = setupImage();

  			// Lisätään grafiikkakerrokset
			var layers = targetElements.keys();
			
			layers.forEach(function (val){	

				var callback = targetElements.get(val);
				callback(s,val);
			}); 	

			// Aluetetaan esittelykuvan toteuttava objekti
  			var tmp = ModelImage()
//.height(height)
//.width(width)
  				.svgImage(s)
  				.layerVisibility(layerVisibility)
  				.applyFilterTo(applyFilter)
  				.filter(g.children[i]);

			widget
  				.append("div")
				.classed("card-body", true)	
				.call(tmp); 

  			modelImages.set(g.children[i].attributes.id, tmp);
  			
    	}    		
    }
	
    /*
     * Alustetaan SVG-kuva. 
     * 
     * Kuvasta alustaan useita kopioita:
     * - yksi jokaista esiteltävää suodatinta kohde
     * - muokkaamaton mallikuva
     * 
     * JATKO
     * -alustamisen yhteydessä luodaan tyhjä kuva
     * -kuva hakee itse aktiivisen demokerroksen...
     */
    var setupImage = function(){
    	
    	var svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    	svgDom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    	
    	var svg = d3.select(svgDom)
	    	.attr('class', 'bar-chart')
	    	//.attr('height', height)
	    	//.attr('width', width)
	    	.attr('viewBox', "0 10 200 100");
    	
    	svg.append('defs');
        
        return svg;
    }
	
    /*
     * Alustetaan demokerrokset listaava dataliitos
     */
    var setupOriginalImage = function(){
    	
    	originalImageDiv
			.selectAll("div.original")
    		.data(targetElements.keys())
    		.enter()
    		.append("div")
    			.attr("class",function(d){
    				return d===activeLayer?"card bg-success mb-3 original":"card bg-light mb-3 original";
    			})
    		.each(function(d, i) {
				
    			var callback = targetElements.get(d);
				
				var svg = setupImage();
				
    			callback(svg,d); 
    			
    			var originalImage = OriginalImage()
    				.height(height)
    				.width(width)
    				.svgImage(svg)
    				.layerId(d);
					
    	    	originalImage.getDispatch().on("originalImageEvent", function(a) {
    	    		activeLayer = a.id;
    	        	changeImages(a);
    	        	repaintOriginalImage();
    	        });
    			
    	    	 d3.select(this).call(originalImage);

    		});
    } 
	
    /*
     * Alustetaan layoutin pohjana toimiva bootstrap Vertical tabs -komponentti.
     * 
     * Jokaiselle ryhmälle lisätään oma välilehti & sivu, jossa välilehden
     * sisältö esitetään.
     */
	var setupVerticalTabs = function(){
		
        var layout = dom.append("div");
        
        // Ryhmien nimet luetteleva lista
        var l = layout
        	.append("div")
        		.attr("class","tab");
        
        // - välilehden avaava linkki jokaiselle ryhmälle
        navTabsJoin = l.selectAll("button")
        	.data(data)
        	.enter()
			.append("button")
				//.attr("class","tablinks")
				.attr("class",function(d,i){return i==0?"tablinks active":"tablinks";})
				.attr("name", "toggle")
				.text(function(d){return d.name})
				.on('click', function(d, i) {
					// Somehow console.log the ID of the circle clicked on (if any).
					openFilter(d3.event, tabPaneIdPrefix + i);
				});
		
		// - välilehti per ryhmä
		var c =  layout.selectAll("div.tabcontent")
			.data(data)
        	.enter()
        	.append("div")
				.classed("tabcontent card-columns", true)
//.attr("class","tabcontent")
				.style("display",function(d,i){return i==0?"block":"none";})
    		    .attr("id",function(d,i){return tabPaneIdPrefix + i})
    		//.append("h3")
    		//.text(function(d){return d.name});
    }

	chart.data = function(value) {
    	
        if (!arguments.length) return data;
        
        data = value;
        
        return chart;
    }
    
    chart.height = function(value) {
		
        if (!arguments.length) return height;
        height = value;
        
        if (typeof updateHeight === 'function') updateHeight();
        
        return chart;
    };
    
    chart.width = function(value) {
    	
        if (!arguments.length) return width;
        width = value;
        
        if (typeof updateWidth === 'function') updateWidth();
        
        return chart;
    }; 
    
    chart.update = function(value){
    	
    	// Tarviiko tässä yhteydessä????
    	if (!arguments.length) 
    		return data;
    
        if (typeof repaint === 'function') repaint();
        
        return chart;
    };    
    
    return chart;
}