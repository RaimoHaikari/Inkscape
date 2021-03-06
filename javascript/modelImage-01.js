/*
 * Kuva muokkaavan suodattimen käyttöä esittelevä ja ohjaava objekti.
 * 
 * Alustuksen aikana välitetään erikseen SVG-kuva ja suodattimen tiedot. 
 * Kun objekti liitetään sivulle, niin suodattimen tiedot lisätään kuvan
 * elementtipuuhun. 
 */
function ModelImage() {
	
	var elem;				// Elementti, johon luettava kuva liitetään
    var svgFilename;		// ladattavan kuvatiedoston nimi
    var svgNode;			// Esitettava SVG -elementti  
	
	var defs;				// Kuvan määrittelytiedoille varattu solu
	
	var filter;				// Esiteltävä suodatin 
	var filterId;			// suodattimen id-tunniste
	
	var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
	
	
    
    function chart(selection) {
    	selection.each(function(data) { 		
		
    		dom = d3.select(this); 		
    		embedImage(dom);	
    	});
    }
	
	var appendFilter = function(){

		
		var svgImage = d3.select(svgNode);
		
		var tmp = svgImage
			.selectAll('g.filterTarget')
			.attr("filter",function(){
				return "url(#" + filterId +")";
			});
			/*
			.attr("filter", function(d,i){
				var value = null;
				
				// Pitäisi olla aina....
				if (applyFilter.hasOwnProperty(this.id))
					value = applyFilter[this.id]?"url(#" + filterId +")":null;
					
				return value;
			});
			*/			
		
    }
    
    /*
     * Liitetaan esitettava SVG -kuva dokumenttiin
	 
	 * - napataan muistiin määrittelytiedoille varattu elementti
	 * - tarvittaessa elementti lisätään
	 *
     * Huom! Tässä pyörii nyt kaksi "maailmaa"
     * - tuotavan SVG -tiedoston käsittely suoritetaan perus JavaScriptillä	 
	 * - suodattimen tiedot on paketoitu JSON - objektiksi, jonka koodataan
     *   SVG-kuvan määritteleväksi XML - soluksi D3:n käyttämän "maailman" avulla	 
     */
    var embedImage = function(elem){
    	try {
			
        	svgNode = null;
			
			d3.xml(svgFilename).then(function(xml) {
                svgNode= document.importNode(xml.documentElement, true);
				
				var svgNS = svgNode.namespaceURI;

				//svgNode.setAttribute("width",width);
				//svgNode.setAttribute("height",height)
				
				var tmpDefs  = svgNode.querySelector('defs') ||
					svgNode.insertBefore(document.createElementNS(svgNS,'defs'), svgNode.firstChild);
					
				defs = d3.select(tmpDefs)
				
                elem.node().appendChild(svgNode);  
				
				setupFilter(defs,filter);
				appendFilter();
			});			
    	}
    	catch(err) {
    		throw err;
    	}
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
     * Luetaan tai tallennetaan esitettävän SVG -tiedoston nimi
     */
    chart.filename = function(value) {
    	
        if (!arguments.length) return svgFilename;
        svgFilename = value;
        
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

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        
        return chart;
    };
    
    chart.width = function(value) {
    	
        if (!arguments.length) return width;
        width = value;
        
        
        return chart;
    }; 	
    
    return chart;
}