/*
 * Kuva muokkaavan suodattimen k�ytt�� esittelev� ja ohjaava objekti.
 * 
 * Alustuksen aikana v�litet��n erikseen SVG-kuva ja suodattimen tiedot. 
 * Kun objekti liitet��n sivulle, niin suodattimen tiedot lis�t��n kuvan
 * elementtipuuhun. 
 */
function ModelImage() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
   
    var svgImage;			// Objektin tulostama SVG -kuva. Alustetaan k�ytt��noton yhteydess�.
      
    var targetElem;			// g-elementti, jonka sis�lt��n suodatin kohdistetaan
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
    					
    					// Pit�isi olla aina....
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
        					
        					// Pit�isi olla aina....
							if (layerVisibility.hasOwnProperty(this.id))
								value = layerVisibility[this.id]?"visible":"hidden";
							
							return value;
        				});           	
            }  
		
            var dom = d3.select(this);         
            dom.node().appendChild(svgImage.node());	// Liitet��n esitett�v� SVG -kuva
			    
            defs = svgImage.select('defs')

            setupFilter(defs,filter);
            
            // TODO: FILTTERIN LIS��MINEN VALITUIHIN KERROKSIIN
            // elik�s pit�isi toimittaa lista kerroksista
            // ja jokaisella TRUE/FALSE, lis�t��nk� suodatadtin
            // Ja t�m�n listan perusteella g-kerrosten filter attribuuttiksi
            // tarvittaessa suodattimen id, eli filterId
            
            appendFilter();
			
            setVisibleLayer();
    	});
    }
    
    
    /*
     * Suodattimen lis��minen svg-objektin m��rittelytietoihin
     * 
     * Yksitt�isen suodattimen tiedot on tallennettu JavaScript-objektiin. 
     * K�yd��n objekti rekursiivisesti l�pi ja lis�t��n kukin vuorossa oleva
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
     * Luetaan tai asetetaan esitett�v�n SVG -tiedoston g-elementit kokoava objekti,
     * jonka avulla m��ritet��n mihin g-elementteihin suodatin kohdistetaan
     */
    chart.applyFilterTo = function(value) {
		
        if (!arguments.length) return applyFilter;
        
        applyFilter = value;
   
        return chart;
    };    
      
    /*
     * Luetaan tai asetetaan esitett�v��n kuvaan kohdistettava suodatin.
     */
    chart.filter = function(value) {
		
        if (!arguments.length) return filter;
        
        filter = value;
        filterId = filter.attributes.id;
   
        return chart;
    };
    
    /*
     * Luetaan tai asetetaan kuvan sis�lt�mien g-elementtien n�kyvyysasetus,
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