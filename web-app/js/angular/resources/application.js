function toggle_loading($elem, success){
    $elem.closest('.widget').toggleClass('widget-loading');
    if(success == true){
        $icon = $elem.closest('.widget').find('.widget-control-refresh i');
        $icon.attr('class', 'fa fa-check-circle');
        setTimeout(function() {
            $icon.attr('class', 'fa fa-refresh');
        }, 1000);
    }
}

$(function() {
    // Toggle menu on click
    $('.menu-toggler').on('click', function(){
        $('.all-wrapper').toggleClass('hide-side-menu');
        return false;
    });

    $("[data-toggle='tooltip']").tooltip();
    
  $('.widget-control-remove').on("click", function() {
        $(this).closest('.widget').slideUp("fast");
        return false;
    });
    
    $('.widget-control-minimize').on("click", function() {
        $elem = $(this)
        if($elem.closest('.widget').hasClass('widget-title-minimized')){
            $elem.closest('.widget').removeClass('widget-minimized').removeClass('widget-title-minimized').find('.widget-content').slideDown('fast');
        }else{
            $elem.closest('.widget').addClass('widget-minimized').find('.widget-content').slideUp('fast', function(){
                $elem.closest('.widget').addClass('widget-title-minimized')
            });
        }
        return false;
    });

    $('.widget-control-full-screen').on("click", function() {
        $elem = $(this)
        $elem.closest('.widget').toggleClass('widget-full-screen');
        return false;
    });
    $('.widget-control-refresh').on("click", function() {
        var $elem;
        $elem = $(this);
        toggle_loading($elem);
        setTimeout(function() {
            toggle_loading($elem, true);
        }, 1000);
        return false;
    });

});
