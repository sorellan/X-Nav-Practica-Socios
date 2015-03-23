jQuery(document).ready(function() {
	$("#tabs").tabs();

	$.getJSON("json/timeline.json").done(function(data) {
		showMsg(data,"#tabs-1");	
	});

    $.getJSON("json/update.json").done(function(data) {
        $("<p>").text("Tienes "+data.length+" noticias nuevas").prependTo("#tabs-1").click(function() {
            showMsg(data, "#tabs-1");
            $(this).hide();
        });
    });

    $("#enviados").click(function() {
        $("#tabs-2").empty();
        $.getJSON("json/myline.json").done(function(data) {
            showMsg(data,"#tabs-2");    
        }).fail(function(){ 
            $("<p>").text("No hay noticias tuyas").prependTo("#tabs-2");
        });
    });

    var i = 0;
	function showMsg(data, etiq) {
    	$.each(data, function(x, item) {
    		$("<div>").attr({class: "noticia", id: "Msg"+i}).prependTo(etiq);
    		$("<img>").attr("src", item["avatar"]).appendTo("#Msg"+i);
    		$("<p>").text("De: "+item["autor"]).appendTo("#Msg"+i);
    		$("<p>").text("Titulo: "+item["titulo"]).appendTo("#Msg"+i);
    		$("<button>").attr("class","ui-state-default ui-corner-all").text("Leer más").appendTo("#Msg"+i)
    		.click(function() {
    			if($(this).text() == "Leer más") {
    				$("<p>").attr("id","contenido").text(item["contenido"]).insertBefore(this);
    				$("<p>").attr("id","fecha").text(item["fecha"]).insertBefore(this);
    				$(this).text("Leer menos");
    			} else {
    				$("#contenido").remove();
    				$("#fecha").remove();
    				$(this).text("Leer más");
    			}
    		});
            i+=1;
		});
	}

});


