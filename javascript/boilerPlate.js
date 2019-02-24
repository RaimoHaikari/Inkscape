function Alphabets() {
	
    var width = 100;		// Koko SVG -elementin leveys
    var height = 100;		// Koko SVG -elementin korkeus
    
    var svg;				// SVG -elementti, johon kokonaisuus piirretään
    var data;				// Visualisoitava data
    var liitos;				// dataliitos

    function chart(selection) {
    	selection.each(function(data) {
    		console.log("Ny voisi kai jotain kirjoittaa");
    		
            var dom = d3.select(this);
            
            svg = dom.append('svg')
            		.attr('class', 'bar-chart')
            		.attr('height', height)
            		.attr('width', width);    
            
            
            liitos = svg
				.selectAll("path")
				.data([]);
    	});
    }
    
    var repaint = function(){
    	console.log("Pitäs päivittää näyttö");
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
        
        if (typeof updateWidth === 'function')
        	updateWidth();
        
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