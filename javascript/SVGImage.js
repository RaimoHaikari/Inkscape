/*
 * MALLIKUVA
 * - esittelykuvat, joista voidaan valita suodattimen 
 */
function SVGImage() {
    
    var elem;				// Elementti, johon luettava kuva liitetään
    var svgFilename;		// ladattavan kuvatiedoston nimi
    var svgNode;			// Esitettava SVG -elementti  
	
	var defs;				// Kuvan määrittelytiedoille varattu solu
	var no;			// Esittelykuvan järjestysnumero
	
	var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
	
	/*
	 * 1. Alustetaan dispatcher -objekti ja rekisteröidään seurattavat tapahtumatyypit
	 * 
	 * http://stackoverflow.com/questions/38333580/rebinding-exports-in-d3-js-v4
	 */
    var dispatch =  d3.dispatch("originalImageEvent");	
    
    function chart(selection) {
		
    	selection.each(function(data) { 		
		
    		dom = d3.select(this); 		
    		embedImage(dom);	
			
			dom.on("click", function() {
				dispatch.call("originalImageEvent", {type: "click", no: no});		
            });
    	});
    }
    
    /*
     * Liitetaan esitettava SVG -kuva dokumenttiin
	 * - napataan muistiin määrittelytiedoille varattu elementti
	 * - tarvittaessa elementti lisätään	
     */
    var embedImage = function(elem){
    	try {
			
        	svgNode = null;
			
			d3.xml(svgFilename).then(function(xml) {
                svgNode= document.importNode(xml.documentElement, true);
				
				var svgNS = svgNode.namespaceURI;

				//svgNode.setAttribute("width",width);
				//svgNode.setAttribute("height",height)
				
				defs = svgNode.querySelector('defs') ||
					svgNode.insertBefore(document.createElementNS(svgNS,'defs'), svgNode.firstChild);
				
                elem.node().appendChild(svgNode);  
				
			});			
    	}
    	catch(err) {
    		throw err;
    	}
    }  

 	chart.getDispatch = function(){
    	return dispatch;
    } 
    
    /*
     * Luetaan tai tallennetaan esitettävän SVG -tiedoston nimi
     */
    chart.filename = function(value) {
    	
        if (!arguments.length) return svgFilename;
        svgFilename = value;
        
        return chart;
    }; 

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        
        return chart;
    };
	
    /*
     * Luetaan tai asetetaan esitettävän SVG -tiedoston järjestysnumero.
     */
    chart.no = function(value) {
		
        if (!arguments.length) return no;
			
        no = value;
        
        return chart;
    };
    
    chart.width = function(value) {
    	
        if (!arguments.length) return width;
        width = value;
        
        
        return chart;
    }; 	
    
    return chart;
}