$(document).ready( function(){

    var videoPlayer = {};
    var screensaver = {};

	function initialize() {

        setupFullscreenVideo();
        setupThumbGrid();
        setupScreenSaver();

	}

    function setupThumbGrid(){

        //Attach click listeners
        $( ".video-button" ).on( "click", function(){

            //Launch fullscreen video player
            var src = $(this).attr('data-video');
            showFullscreenVideo(src);

        });

    }

	function setupFullscreenVideo(){

		//Create video tag
        var options = { "controls": false, "autoplay": true, "loop": false, "preload": "auto" };

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

        videoPlayer.src([{ type: "video/mp4", src: vidSrc }]);

	}

    function hideFullscreenVideo() {

        //Hide the video
        $('#player_screen').fadeOut('fast', function() {
            videoPlayer.pause();
            $("#player_screen").hide();
        });

    }

    function setupScreenSaver(){

        //3.5 minute screensaver timeout (one minute more than longest video)
        screensaver = new Screensaver( 3.5*60, 'videos/Screensaver.mp4');

    }

	initialize();

});


