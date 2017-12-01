(function ($) {
    "use strict";


    jQuery(document).ready(function () {
        /**
         * =====================================
         * Drop Down Language Select
         * =====================================
         */
        var default_size = {
            w: 20,
            h: 15
        };
        function calcPos(letter, size) {
            return -(letter.toLowerCase().charCodeAt(0) - 97) * size;
        }
        $.fn.setFlagPosition = function (iso, size) {
            size || (size = default_size);
            var x = calcPos(iso[1], size.w),
                y = calcPos(iso[0], size.h);
            return $(this).css('background-position', [x, 'px ', y, 'px'].join(''));
        };
        var $target = $('.drop-down-country .country');
        $target.find('i').setFlagPosition('es');

        $('.drop-down-country select').change(function () {
            $target.find('i').setFlagPosition(this.value);
        });
        /**
         * =====================================
         * Mega Menu Active
         * =====================================
         */
        $("#menuzord").menuzord({
            align: "left",
            effect: "slide",
            animation: "zoom-in"
        });
        /**
         * =====================================
         * Search Box
         * =====================================
         */
        $('.search-box-icon a').on('click', function(e) {
            e.preventDefault();
            $('.top-search-input-wrap').addClass('show');

        });
        $(".top-search-input-wrap .top-search-overlay, .top-search-input-wrap .close-icon").on('click', function(){
            $('.top-search-input-wrap').removeClass('show');
        })

        /** =====================================
         * Call TO Action Paralex
         * =====================================*/
        $('.call-to-action-area').parallax("80%", 0.4);


        /** =====================================
         * Blog Carousel Carousel
         * =====================================*/
        $('.blog-carousel.carousel-active').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            vertical:true,
            dots: true,
            arrows:false
        });
        /** =====================================
         * Related Blog Post Carousel
         * =====================================*/
        $('.related-blog-post-carosel').owlCarousel({
            autoPlay: true,
            pagination: false,
            loop:true,
            navigation:true,
            items: 3,
            itemsDesktop: [1024, 3],
            itemsDesktopSmall: [768,3],
            itemsTablet: [650, 2],
            itemsMobile: [480, 1],
            navigationText: [
                "<i class='ion-ios-arrow-left'></i>",
                "<i class='ion-ios-arrow-right'></i>"
            ]
        });




        /**
         * =====================================
         *Tab slider
         * =====================================
         */
        var $serviceCarousel = $('#testimonial-carousel');
        $serviceCarousel.carousel({
            interval: 3000
        });
        var clickEvent = false;
        $serviceCarousel.on('click', '.testimonial-carousel-control-nav a', function() {
            clickEvent = true;
            $('.testimonial-carousel-control-nav li').removeClass('active');
            $(this).parent().addClass('active');
        }).on('slid.bs.carousel', function(e) {
            if(!clickEvent) {
                var count = $('.testimonial-carousel-control-nav').children().length -1;
                var current = $('.testimonial-carousel-control-nav li.active');
                current.removeClass('active').next().addClass('active');
                var id = parseInt(current.data('slide-to'));
                if(count == id) {
                    $('.testimonial-carousel-control-nav li').first().addClass('active');
                }
            }
            clickEvent = false;
        });
        //  Service Navigation
        $(".service-controller-thumb .next-step").on('click',function (e) {
            var $active = $('.testimonial-carousel-control-nav li.active');
            nextTab($active);
        });
        $(".service-controller-thumb .prev-step").on('click',function (e) {
            var $active = $('.testimonial-carousel-control-nav li.active');
            prevTab($active);
        });
        function nextTab(elem) {
            $(elem).next().find('a[data-toggle="tab"]').click();
        }
        function prevTab(elem) {
            $(elem).prev().find('a[data-toggle="tab"]').click();
        }

        /**
         * =====================================
         * Play Video
         * =====================================
         */
        jQuery(".video-box img").on("click", function(e) {
            var i = jQuery(".video-box-background").YTPlayer();
            i.prepend('<iframe src="http://player.vimeo.com/video/7449107" width="500" height="281" ></iframe>'), i.fadeIn(300), e.preventDefault()
        })
        jQuery(".close-video").on("click", function(e) {
            jQuery(".video-box-background").fadeOut(400, function() {
                jQuery("iframe", this).remove().fadeOut(300)
            })
        })

        /** =====================================
         *  Popup Video
         * ===================================== **/
        $('.related-blog-post-carosel .carosle-item .play-icon').magnificPopup({
            items: {
                src: 'https://www.youtube.com/watch?v=UAJyJt_lnKA'
            },
            type: 'iframe' // this is default type
        });
    });
    jQuery(window).on('load',function(){
        $(window).on("scroll", function(){
            var windowHeight = $(window).height();
            var roundSliderClass = $('div').hasClass('round-slider');
            if(roundSliderClass) {
                var roundSlideroffset = $(".round-slider").offset().top - windowHeight;
                if($(window).scrollTop() > roundSlideroffset){
                    /**
                     * =====================================
                     * Rond Slider
                     * =====================================
                     */
                    $("#collection-percent").roundSlider({
                        radius: 85,
                        width: 14,
                        handleSize: 0,
                        handleShape: "square",
                        sliderType: "min-range",
                        value: 30,
                        startAngle:'90',
                        disabled:true
                    });
                }
            }
            var barfiller50Class = $('div').hasClass('barfiller50');
            if(barfiller50Class) {
                var roundSlideroffset = $(".barfiller50").offset().top - windowHeight;
                if($(window).scrollTop() > roundSlideroffset){
                    /**
                     * =====================================
                     * Barfiller
                     * =====================================
                     */
                    $('.barfiller50').barfiller({
                        tooltip: true
                    });
                }
            }
            //Video box
            var videoSectionHeight = $('.video-section').height();
            $('.video-section .video-box').css({"height": videoSectionHeight});
            var imageSourch = $('.video-section .video-box img').attr("src");
            var imagePath = "url(" + imageSourch + ")";
            $('.video-section .video-box').css({
                "background-image": imagePath
            });
        });

        //Preloader
        $('#loading').fadeOut(500);
    });

})(jQuery);



