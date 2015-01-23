$(document).ready( function(){

    var videoPlayer = {};
    var screensaver = {};
    var buttonsLocked = false;

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

            if (buttonsLocked == true) return;
            lockButtons(true);

            var src = $(this).attr('data-video');

            //Quick depth animation highlighting selected video
            TweenMax.to( $( this ).siblings( ".video-button" ), 0.35, { css: { opacity:0.6, scale:1 }, delay:0.01, ease:Power2.easeOut, onComplete:function(){
                showFullscreenVideo(src);
            }});
            TweenMax.to( $( this ), 0.8, { css: { opacity:1, scale:1.01 }, delay:0.075, ease:Elastic.easeOut});

        });

    }

    function lockButtons(doLock){

        buttonsLocked = doLock;

    }

	function setupFullscreenVideo(){
		//Create video tag
        var options = { "controls": false, "autoplay": true, "width": "100%", "height":"100%", "loop": false, "preload": "auto" };

        //Initialize player
        videoPlayer = videojs("fullscreen_video", options, function() {

            // Player (this) is initialized and ready.

            this.on("playing", function(){

                console.log("Video waiting.");
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
        $("#player_screen").show();
        videoPlayer.src([{ type: "video/mp4", src: vidSrc }]);

	}

    function hideFullscreenVideo() {

        //Hide the video
        $('#player_screen').fadeOut('fast', function() {
            videoPlayer.pause();
            $("#player_screen").hide();
            TweenMax.to( $( ".video-button" ), 0.4, { css: { opacity:1, scale:1 }, delay:0.05, ease:Power3.easeIn });
            lockButtons(false);
        });

    }

    function setupScreenSaver(){

        //3.5 minute screensaver timeout (one minute more than longest video)
        screensaver = new Screensaver( 3.5*60, 'videos/ss.mp4');

    }

	initialize();

});


