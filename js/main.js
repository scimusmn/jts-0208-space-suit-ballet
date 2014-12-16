$(document).ready( function(){

    var videoPlayer = {};
    var screensaver = {};

	function initialize() {

        setupFullscreenVideo();
        setupThumbGrid();
        setupScreenSaver();

        //remove click delays
        FastClick.attach(document.body);

	}

    function setupThumbGrid(){

        //Attach click listeners
        $( ".video-button" ).on( "click", function(){

            var src = $(this).attr('data-video');
            //TEMP
            src = 'videos/00.mp4';

            //Quick depth animation highlighting selected video
            TweenMax.to( $( ".video-button" ), 0.3, { css: { opacity:0.65, scale:1 }, ease:Power3.easeOut, onComplete:function(){
                showFullscreenVideo(src);
            }});
            TweenMax.to( $( this ), 0.2, { css: { opacity:1, scale:1.015 }, ease:Power3.easeOut});

        });

    }

	function setupFullscreenVideo(){
		//Create video tag
        var options = { "controls": false, "autoplay": true, "width": "100%", "height":"100%", "loop": false, "preload": "auto" };

        //Initialize player
        videoPlayer = videojs("fullscreen_video", options, function() {

            // Player (this) is initialized and ready.

            this.on("playing", function(){

                $("#player_screen").show();

            });

            this.on("waiting", function(){

                console.log("Video waiting.");

            });

            this.on("ended", function(){

                hideFullscreenVideo();

            });

        });

        //Home button
        $( ".home-btn" ).on( "click", function(){

            hideFullscreenVideo();

        });

	}

	function showFullscreenVideo(vidSrc) {

        console.log('showFullscreenVideo', vidSrc);
        videoPlayer.src([{ type: "video/mp4", src: vidSrc }]);

	}

    function hideFullscreenVideo() {

        //Hide the video
        $('#player_screen').fadeOut('fast', function() {
            videoPlayer.pause();
            $("#player_screen").hide();
            TweenMax.to( $( ".video-button" ), 0.2, { css: { opacity:1, scale:1 }, ease:Power3.easeIn });
        });

    }

    function setupScreenSaver(){

        //3.5 minute screensaver timeout (one minute more than longest video)
        screensaver = new Screensaver( 3.5*60, 'videos/00.mp4');

    }

	initialize();

});


