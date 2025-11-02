$(document).ready(function() {
    
    $('.menu a').hover(
        function() {
            $(this).fadeTo(200, 0.8);
        },
        function() {
            $(this).fadeTo(200, 1);
        }
    );
    
    if ($('#services-container').children().length > 0) {
        $('#services-container').hide().fadeIn(1000);
    }
    
    $('.gallery-item').hover(
        function() {
            $(this).animate({
                opacity: 0.8,
                marginTop: '-5px'
            }, 200);
        },
        function() {
            $(this).animate({
                opacity: 1,
                marginTop: '0px'
            }, 200);
        }
    );
    
    $('#submit-btn').hover(
        function() {
            $(this).animate({
                fontSize: '18px',
                padding: '14px 32px'
            }, 200);
        },
        function() {
            $(this).animate({
                fontSize: '16px',
                padding: '12px 30px'
            }, 200);
        }
    );
    
    $('h1').hide();
    $('h1').slideDown(800);
    
    $('article').hide();
    $('article').fadeIn(1500);
    
    $('.video-controls button').click(function() {
        $(this).fadeOut(100).fadeIn(100);
    });
    
    $('.form-group input').focus(function() {
        $(this).animate({
            borderWidth: '3px'
        }, 200);
    }).blur(function() {
        $(this).animate({
            borderWidth: '2px'
        }, 200);
    });
    
    $('.menu li').hover(
        function() {
            $(this).slideDown();
        }
    );
    
    
    
    $('table tr').hover(
        function() {
            $(this).fadeTo(200, 0.7);
        },
        function() {
            $(this).fadeTo(200, 1);
        }
    );
    
    $('aside').hide();
    $('aside').slideDown(600);
    
    const selectedByTag = $('div');
    selectedByTag.css('transition', 'all 0.3s');
    
    const selectedByClass = $('.form-group');
    selectedByClass.css('margin-bottom', '25px');
    
    const selectedById = $('#header');
    selectedById.css('box-shadow', '0 2px 5px rgba(0,0,0,0.1)');
    
    $('img').hide();
    $('img').fadeIn(1000);
    
    $('#services-table tbody tr').each(function(index) {
        $(this).delay(index * 100).fadeIn(300);
    });
    
    $('footer').hide();
    setTimeout(function() {
        $('footer').slideUp().slideDown(500);
    }, 500);
    
    $('.gallery-item').click(function() {
        $(this).animate({
            transform: 'scale(1.1)'
        }, 300).animate({
            transform: 'scale(1)'
        }, 300);
    });
    
    $('#welcome-section').hide();
    $('#welcome-section').slideDown(700);
    
    $('nav').hide();
    $('nav').fadeIn(800);
});

