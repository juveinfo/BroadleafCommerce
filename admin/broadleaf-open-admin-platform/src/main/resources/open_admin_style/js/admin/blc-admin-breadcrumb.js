/**
 * Make the breadcrumb bar lock at the top of the window when it's scrolled off the page
 */
$(window).on('scroll', function() {
    var $bcc = $('.breadcrumb-container');
    var $fbcc = $('.fake-breadcrumb-container');
    
    if ($(window).scrollTop() - 4 < $bcc.outerHeight()) {
        $bcc.removeClass('breadcrumb-fixed');
        $bcc.width('');
        $fbcc.hide();
    } else {
        $fbcc.show();
        $bcc.addClass('breadcrumb-fixed');
        $bcc.outerWidth($('section.main').outerWidth());
        $('.fake-breadcrumb-container').outerHeight($bcc.outerHeight());
    }
});

/**
 * Attempt to force the middle part of the breadcrumb on entity detail pages to go back to the filtered
 * main entity list
 */
$(document).ready(function() {
   var $midBcLink = $('ul.breadcrumbs li:nth-child(2) a');
   var url = $midBcLink.attr('href');

   var full = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
   var ref = document.referrer;
   
   // If the referrer is blank, we don't need to do anything special
   if (ref == undefined || ref == '') {
       return false;
   }
   
   // If the referring URL starts with our current location...
   if (ref.indexOf(full + url) == 0) {
       ref = ref.substring(full.length + url.length);
   
       // and the remainder of the referring URL only consists of query parameters...
       if (ref.charAt(0) == '?') {
            // we will send the user back to where they were with the filters
           $midBcLink.attr('href', document.referrer);
       }
   }
});