function Filters() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
	
    var dom;
	
	var buttonsDiv;				// Sarake, josta esiteltävä suodatin valitaan
	
    var originalImageDivId = "#alkuperaiset";	
	var originalImageDiv; 		// Sarake, jossa mallikuvat esitellään
	
	var modelImages;			// Mallikuvat joilla suodattimia demotaan
	
    var filteredImagesDiv;		// Sarake, jossa aktiivisen suodatinryhmän suodattimilla 
								// käsitellyt mallikuvat esitellään.

    var activeModelImage;		// Valittuna oleva esittelygrafiikka
	var activeFilter;			// Valittuna olevan suodatinryhmän järjestysnumero suodatinryhmät kokoavassa JSON objektissa
					  
    var data;				// Visualisoitava data

    function chart(selection) {

    	selection.each(function() {
			
			activeModelImage = 0;
			activeFilter = 0;
			
            dom = d3.select(this); 
       		
			setupOriginalImage();
			
			setupVerticalTabs();

			setupFilteredImagesDiv()
    	});
    }

    /*
     * Päivitettään esittelykuvien muotoiluasetukset	
	 */
    var repaintOriginalImage = function(){
		
		originalImageDiv		
			.selectAll("div.card")
    		.data(modelImages)
			.attr("class",function(d,i){
				return i == activeModelImage?"card active":"card";
			});
    } 
	
	/*
	 * Aktiivisena olevan suodatinryhmän suodattimilla käsiteltyjen esittelykuvien 
	 * tulostaminen.
	 */
    var setupFilteredImagesDiv = function(){
		
		// Tyhjennetään tarvittaessa piirtoalue
		filteredImagesDiv
			.selectAll("div.card")
			.data([])
			.exit()
			.remove();

		// Lisätään aktiivisen suodatinryhmän suodattimille käsitellyt esittelykuvat
		filteredImagesDiv
			.selectAll("div.card")
			.data(data[activeFilter].children)
			.enter()
			.append("div")
				.classed("card", true)
			.each(function(d, i) {

				d3.select(this)
					.append("div")
					.classed("card-header", true)
					.text(function(){
						return d.attributes.label

					})
					
				var sImage = ModelImage()
					.width(150)
					.height(150)
					.filter(d)
					.filename(modelImages[activeModelImage]);
					
				d3.select(this)
					.append("div")
					.classed("card-body", true)	
					.call(sImage);	
			});
			
    }
	
    /*
     * Alustetaan esittelykuvat listaava dataliitos
     */
    var setupOriginalImage = function(){
		
		originalImageDiv = d3
			.select(originalImageDivId);
		
		originalImageDiv		
			.selectAll("div.card")
    		.data(modelImages)
    		.enter()
    		.append("div")
    			.attr("class",function(d,i){
    				//return i == activeModelImage?"card bg-success mb-3 original":"card bg-light mb-3 original";
					return i == activeModelImage?"card active":"card";
    			})
				.append("div")
				.classed("card-body", true)	
    		.each(function(d, i) {

				var originalImage = SVGImage()
					.width(width)
					.height(height)
					.no(i)
					.filename(d);
					
				originalImage.getDispatch().on("originalImageEvent", function() {

					activeModelImage = this.no;
					setupFilteredImagesDiv();
					repaintOriginalImage();
    	        });
					
				d3.select(this).call(originalImage);
    		});
    } 	

	var bar = function(){
		
		buttonsDiv	
			.selectAll("button")
    		.data(data)
			.attr("class",function(d,i){
				return i==activeFilter?"tablinks active":"tablinks";
			});		
	}
	
    /*
	 * div.tab
	 * -------
     * - div -elementti, jossa jokaiselle ryhmälle on oma painikkeensa
	 *
	 * div.tabcontent card-columns
	 * ---------------------------
	 * - div -elementti, jossa aktiivisen ryhmän suodattimien vaikutus esitellään
     */
	var setupVerticalTabs = function(){

        // Ryhmien nimet luetteleva lista
        buttonsDiv = dom
			.append("div")
        	.attr("class","tab");
			
		buttonsDiv	
			.selectAll("button")
        	.data(data)
        	.enter()
			.append("button")
				.attr("class",function(d,i){return i==activeFilter?"tablinks active":"tablinks";})
				.attr("name", "toggle")
				.text(function(d){return d.name})
				.on('click', function(d, i) {
					activeFilter = i
					setupFilteredImagesDiv();
					bar();
				});
		
		filteredImagesDiv = dom
        	.append("div")
				.classed("tabcontent card-columns", true)
    }

	chart.data = function(value) {
    	
        if (!arguments.length) return data;
        
        data = value;
        
        return chart;
    }
    
    chart.height = function(value) {
		
        if (!arguments.length) return height;
		
        height = value;
              
        return chart;
    };
	
	chart.modelImages = function(value){
		
        if (!arguments.length) return modelImages;
		
        modelImages = value;
        
        return chart;		
	}
    
    chart.width = function(value) {
    	
        if (!arguments.length) return width;
		
        width = value;
        
        return chart;
    }; 
    
    return chart;
}