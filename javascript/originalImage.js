function OriginalImage() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
   
    var svgImage;			// Objektin tulostama SVG -kuva. Alustetaan k�ytt��noton yhteydess�.
    
    
    var targetElem;			// g-elementti, jonka sis�lt��n suodatin kohdistetaan
    var layerId;			// Esitett�v�n g-elementin id-tunnus
    
    var defs;
    
    var filter;				// Demottava suodatin
    var filterId;			// suodattimen id-tunniste
    
    var _data;				// Visualisoitava data
    var _liitos;			// dataliitos

	/*
	 * 1. Alustetaan dispatcher -objekti ja rekister�id��n seurattavat tapahtumatyypit
	 * 
	 * http://stackoverflow.com/questions/38333580/rebinding-exports-in-d3-js-v4
	 */
    var dispatch =  d3.dispatch("originalImageEvent");
    
    function chart(selection) {
    	selection.each(function(data) {
            var dom = d3.select(this);
                        
            
            dom.node().appendChild(svgImage.node());	// Liitet��n esitett�v� SVG -kuva
            
            dom.on("click", function() {

            	//dispatch.originalImageEvent({type: "click"});
            	dispatch.call("originalImageEvent", this, {type: "click", id: layerId});
            });
    	});
    }
    
    var releaseFilter = function(){
    	targetElem.attr("filter", null);
    }
    
    var repaint = function(){
    	
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
    var _setupFilter = function(n,f){
    	
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
     * Suodattimen k�ytt��otto, eli asetetaan muokattavan grafiikan sis�lt�v�n
     * g-elemntin filter-parametrin arvoksi esitett�v�n suodattimen id-tunnus
     */
    var _setFilter = function(id){
    	targetElem.attr("filter", "url(" + id+ ")");
    }
      
    /*
     * Luetaan tai asetetaan esitett�v��n kuvaan kohdistettava suodatin.
     */
    chart.layerId = function(value) {
        if (!arguments.length) return layerId;
        layerId = value;
        
        return chart;
    };
    
    chart.getDispatch = function(){
    	return dispatch;
    } 
    
    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        
        if (typeof updateHeight === 'function') updateHeight();
        
        return chart;
    };
    
    
    /*
     * Luetaan tai asetetaan esitett�v� SVG-kuva. 
     * 
     * Alustusvaiheessa on kyseess� pelkk� "runko", johon grafiikka
     * ja suodattimen toteuttavat m��rittelyt lis�t��n.
     */
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
    
    chart.update = function(){
    	
    	svgImage
    		.selectAll('g')
    		.remove();
    	
    	console.log("Jepulis");

    	
    	// Tarviiko tässä yhteydessä????
    	//if (!arguments.length) 
    		//return data;
    
        //if (typeof repaint === 'function') repaint();
        
        return svgImage;
    };    
    
    return chart;
}