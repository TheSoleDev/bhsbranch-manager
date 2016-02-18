var timer ='';


$(document).ready(function() {
    // The maximum number of options
    var MAX_OPTIONS = 2;

    $('.dynamicField')

        // Add button click handler
        .on('click', '.addButton', function() {

            var $template = $(this).closest('.dynamicField').find('.dynamicTemplate'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeClass('dynamicTemplate')
                                .removeAttr('id')
                                .insertBefore($template),
                $option   = $clone.find('.dynamicTxt');

                if ($(this).closest('.dynamicField').find(':visible.dynamicTxt').length >= MAX_OPTIONS) {
                    $(this).closest('.dynamicField').find('.addButton').attr('disabled', 'disabled');
                }
         
        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row    = $(this).parents('.form-group'),
                $option = $row.find('.dynamicTxt');

            // Remove element containing the option
            if ($(this).closest('.dynamicField').find(':visible.dynamicTxt').length <= MAX_OPTIONS) {
                $(this).closest('.dynamicField').find('.addButton').removeAttr('disabled');
            }     

            $row.remove();

        });



});

$(document).ready(function() {

    $('#map_canvas').gmap({'center': '14.677060098695824,121.03180043399334'});
    $('#map_canvas').gmap('option', 'zoom', 14);
    $('#map_canvas').gmap().bind('init', function(event, map) { 

        $(map).click( function(event) {
            
            localStorage.removeItem("targetLat");
            localStorage.removeItem("targetLong");                
            $('#map_canvas').gmap('clear', 'markers');

            // localStorage.setItem("targetLat", event.latLng.lat());
            // localStorage.setItem("targetLong", event.latLng.lng());
            $('#txt_longitute').val(event.latLng.lng());
            $('#txt_latitude').val(event.latLng.lat());
            $('#map_canvas').gmap('addMarker', {
                'position': event.latLng, 
                'draggable': false, 
                'bounds': false
            }, function(map, marker) {
                //do whatever you need with the maker utilizing this variable
                marker.__gm_id
            });

        });

    });      

});


$(document).on('click','#btn_submit',function(e) { 
    e.preventDefault();

    var data = JSON.stringify($('#frm_add_branch').serializeArray());
    console.log(data);
});



$(document).on('click','#btn-search-loc',function(e) { 


     $('#map_canvas').gmap('search', { 'address': $('#txt-search-loc').val() }, function(results, status){
        
        if (status === 'OK'){
            $('#map_canvas').gmap('get', 'map').panTo(results[0].geometry.location);
            //$('#map_canvas').gmap('addMarker', { 'center' : results[0].geometry.location , 'position' : results[0].geometry.location , 'bounds': true } );
            $('#map_canvas').gmap('option', 'zoom', 16);
            $('#map_canvas').gmap('option', 'center', results[0].geometry.location);  
            $('#map_canvas').gmap('option', 'mapTypeId', google.maps.MapTypeId.TERRAIN);                      
            $('#map_canvas').gmap('refresh');
        }

    });
  

});
