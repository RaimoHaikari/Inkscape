function OriginalImage() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
   
    var svgImage;			// Objektin tulostama SVG -kuva. Alustetaan käyttöönoton yhteydessä.
    
    
    var targetElem;			// g-elementti, jonka sisältöön suodatin kohdistetaan
    var layerId;			// Esitettävän g-elementin id-tunnus
    
    var defs;
    
    var filter;				// Demottava suodatin
    var filterId;			// suodattimen id-tunniste
    
    var _data;				// Visualisoitava data
    var _liitos;			// dataliitos

	/*
	 * 1. Alustetaan dispatcher -objekti ja rekisteröidään seurattavat tapahtumatyypit
	 * 
	 * http://stackoverflow.com/questions/38333580/rebinding-exports-in-d3-js-v4
	 */
    var dispatch =  d3.dispatch("originalImageEvent");
    
    function chart(selection) {
    	selection.each(function(data) {
            var dom = d3.select(this);
                        
            
            dom.node().appendChild(svgImage.node());	// Liitetään esitettävä SVG -kuva
            
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
     * Suodattimen käyttööotto, eli asetetaan muokattavan grafiikan sisältävän
     * g-elemntin filter-parametrin arvoksi esitettävän suodattimen id-tunnus
     */
    var _setFilter = function(id){
    	targetElem.attr("filter", "url(" + id+ ")");
    }
      
    /*
     * Luetaan tai asetetaan esitettävään kuvaan kohdistettava suodatin.
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
     * Luetaan tai asetetaan esitettävä SVG-kuva. 
     * 
     * Alustusvaiheessa on kyseessä pelkkä "runko", johon grafiikka
     * ja suodattimen toteuttavat määrittelyt lisätään.
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

    	
    	// Tarviiko tÃ¤ssÃ¤ yhteydessÃ¤????
    	//if (!arguments.length) 
    		//return data;
    
        //if (typeof repaint === 'function') repaint();
        
        return svgImage;
    };    
    
    return chart;
}