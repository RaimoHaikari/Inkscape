/*
 * Kuva muokkaavan suodattimen käyttöä esittelevä ja ohjaava objekti.
 * 
 * Alustuksen aikana välitetään erikseen SVG-kuva ja suodattimen tiedot. 
 * Kun objekti liitetään sivulle, niin suodattimen tiedot lisätään kuvan
 * elementtipuuhun. 
 */
function ModelImage() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
   
    var svgImage;			// Objektin tulostama SVG -kuva. Alustetaan käyttöönoton yhteydessä.
      
    var targetElem;			// g-elementti, jonka sisältöön suodatin kohdistetaan
    var layerVisibility;	// g-elementtien tulostusasetukset
    var setVisibleLayer;	// funktio, jolla aktivoidaan tulostettava g-elementti
    						// ja piilotettaan muut kerrokset
    
    var applyFilter;		// tieto, kohdistetaanko g-elementtiin suodatin
    
    var defs;

    var filterId;			// suodattimen id-tunniste
    

    /*
      targetElem.attr("filter", null);
     */
    function chart(selection) {
    	selection.each(function(data) {
    		
    		
    		appendFilter = function(){
            	var tmp = svgImage
    			.selectAll('g.filterTarget')
    				.attr("filter", function(d,i){
    					var value = null;
    					
    					// Pitäisi olla aina....
						if (applyFilter.hasOwnProperty(this.id))
							value = applyFilter[this.id]?"url(#" + filterId +")":null;
						
						return value;
    				});    			
    		}
    		
    		

            setVisibleLayer = function() {

            	var tmp = svgImage
        			.selectAll('g.filterTarget')
        				.attr("visibility", function(d,i){
        					var value = "hidden";
        					
        					// Pitäisi olla aina....
							if (layerVisibility.hasOwnProperty(this.id))
								value = layerVisibility[this.id]?"visible":"hidden";
							
							return value;
        				});           	
            }  
		
            var dom = d3.select(this);         
            dom.node().appendChild(svgImage.node());	// Liitetään esitettävä SVG -kuva
			    
            defs = svgImage.select('defs')

            setupFilter(defs,filter);
            
            // TODO: FILTTERIN LISÄÄMINEN VALITUIHIN KERROKSIIN
            // elikäs pitäisi toimittaa lista kerroksista
            // ja jokaisella TRUE/FALSE, lisätäänkö suodatadtin
            // Ja tämän listan perusteella g-kerrosten filter attribuuttiksi
            // tarvittaessa suodattimen id, eli filterId
            
            appendFilter();
			
            setVisibleLayer();
    	});
    }
    
    
    /*
     * Suodattimen lisääminen svg-objektin määrittelytietoihin
     * 
     * Yksittäisen suodattimen tiedot on tallennettu JavaScript-objektiin. 
     * Käydään objekti rekursiivisesti läpi ja lisätään kukin vuorossa oleva
     * suodattimen osa kuvan defs-elementtiin.
     * 
     * @param defs SVG-kuvan defs-elementti, johon suodattimen tiedot kirjoitetaan
     * @param f suodattimen tiedot kokoava JavaScript-objekti
     * 
     */
    var setupFilter = function(n,f){
    	
    	var tmp = n.append(f.node);
    	
    	for (var key in f.attributes) {
    		  if (f.attributes.hasOwnProperty(key)) {
    			  tmp.attr(key,f.attributes[key]);
    		  }
    	}
    	
    	for(var j = 0; j < f.children.length; j++){
    		setupFilter(tmp, f.children[j]);
    	}

    }
    
    /*
     * Luetaan tai asetetaan esitettävän SVG -tiedoston g-elementit kokoava objekti,
     * jonka avulla määritetään mihin g-elementteihin suodatin kohdistetaan
     */
    chart.applyFilterTo = function(value) {
		
        if (!arguments.length) return applyFilter;
        
        applyFilter = value;
   
        return chart;
    };    
      
    /*
     * Luetaan tai asetetaan esitettävään kuvaan kohdistettava suodatin.
     */
    chart.filter = function(value) {
		
        if (!arguments.length) return filter;
        
        filter = value;
        filterId = filter.attributes.id;
   
        return chart;
    };
    
    /*
     * Luetaan tai asetetaan kuvan sisältämien g-elementtien näkyvyysasetus,
     * siis: visible/hidden
     */
    chart.layerVisibility = function(o) {
    	
        if (!arguments.length) return layerVisibility;
		
        layerVisibility = o;
        
        if (typeof setVisibleLayer === 'function') setVisibleLayer();
        
        return chart;
    }    
    
    
    chart.height = function(value) {
		
        if (!arguments.length) return height;
		
        height = value;
        
        if (typeof updateHeight === 'function') updateHeight();
        
        return chart;
    };
    
    chart.svgImage = function(value) {
		
        if (!arguments.length) return svgImage;
		
        svgImage = value;
		     
        return chart;
		
    };
    
    chart.width = function(value) {
    	
        if (!arguments.length) return width;
		
        width = value;
        
        if (typeof updateWidth === 'function')
        	updateWidth();
        
        return chart;
    }; 
    
    return chart;
}