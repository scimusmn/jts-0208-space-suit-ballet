$(document).ready( function(){

    var videoPlayer = {};
    var screensaver = {};
    var buttonsLocked = false;

	function initialize() {

        setupPlayer('fullscreen_andy');
        setupPlayer('fullscreen_ballet');

        setupThumbGrid();
        setupScreenSaver();

        //Home button
        $( ".home-btn" ).on( "click", function(){
            hideFullscreenVideo();
        });
        hideFullscreenVideo();

        //remove click delays
        FastClick.attach(document.body);

	}

    function setupThumbGrid(){

        //Attach click listeners
        $( ".video-button" ).on( "click", function(){

            if (buttonsLocked == true) return;
            lockButtons(true);

            var playerId = $(this).attr('data-video');

            //Quick depth animation highlighting selected video
            TweenMax.to( $( this ).siblings( ".video-button" ), 0.35, { css: { opacity:0.6, scale:1 }, delay:0.01, ease:Power2.easeOut, onComplete:function(){
                showFullscreenVideo(playerId);
            }});
            TweenMax.to( $( this ), 0.8, { css: { opacity:1, scale:1.01 }, delay:0.075, ease:Elastic.easeOut});

        });

    }

    function lockButtons(doLock){

        buttonsLocked = doLock;

    }

	function setupPlayer(playerId){

		//Create video tag
        var options = { "controls": false, "autoplay": true, "width": "100%", "height":"100%", "loop": false, "preload": "auto" };

        //Initialize player
        videojs(playerId, options, function() {

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

	}

	function showFullscreenVideo(playerId) {

        console.log('showFullscreenVideo', playerId);
        $("#player_screen").show();
        $("#player_screen").css('z-index', 0);

        $("#player_screen .video-js").css('z-index', -1);
        $("#player_screen #"+playerId).each(function(){
            $(this).css('z-index', 0);
            this.player.currentTime(0);
            this.player.play();
        });

	}

    function hideFullscreenVideo() {

        //Hide the video
        $("#player_screen").css('z-index', -1);
        $("#player_screen .video-js").each(function(){
            this.player.pause();
            this.player.currentTime(0);
            $(this).css('z-index', -1);
        });

        TweenMax.to( $( ".video-button" ), 0.4, { css: { opacity:1, scale:1 }, delay:0.05, ease:Power3.easeIn });

        setTimeout(function() {
            lockButtons(false);
        }, 500);

    }

    function setupScreenSaver(){

        //3.5 minute screensaver timeout (one minute more than longest video)
        screensaver = new Screensaver( 3.5*60, 'videos/ss.mp4',
            function(){
                //on sleep
                lockButtons(true);
            },
            function(){
                //on awake
                setTimeout(function() {
                    lockButtons(false);
                }, 500);
            });

    }

	initialize();

});


