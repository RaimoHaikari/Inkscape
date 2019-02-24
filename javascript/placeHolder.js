function PlaceHolder() {
	
    var width = 100;		// SVG -elementille varattu leveys
    var height = 100;		// SVG -elementille varattu korkeus
    
    var dom;				// HTML -elementti, johon kokonaisuus piirretaan
    
    var svgImage;			// SVG -kuvan lataava objekti
    var svgFilename;		// ladattavan kuvatiedoston nimi

    function chart(selection) {
		
    	selection.each(function(data) {
   
            var dom = d3.select(this);
			
    		svgImage = SVGImage()
				.width(width)
				.height(height)
    			.filename(svgFilename);
		
    		dom.call(svgImage);
			
    	});
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
    
    chart.width = function(value) {
    	
        if (!arguments.length) return width;
        width = value;
        
        
        return chart;
    }; 
    
    return chart;
}