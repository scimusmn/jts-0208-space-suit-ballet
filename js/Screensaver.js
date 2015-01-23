
/**
* Screensaver
*/

function Screensaver( timeoutSeconds, videoSrc, onSleepCallback, onAwakeCallback ){

    // How long is timeout.
    this.timeoutSeconds = timeoutSeconds || 60;

    //Callback functions to reset external
    this.onSleepCallback = onSleepCallback || function() {};
    this.onAwakeCallback = onAwakeCallback || function() {};

    // Start the clock
    this.idleTime = 0;
    this.active = false;

    var thisRef = this;

    // Increment the idle time counter every minute.
    this.idleInterval = setInterval( function(){ thisRef.timerIncrement() }, 1000);// 1 second

    // Zero the idle timer on any movement.
    $('body').on('touchstart keypress mousemove mousedown', function(){ thisRef.anyAction() });

    //Setup video screensaver
    this.createVideo( videoSrc );

    //Default to hidden screensaver
    this.awake();

}

/**
* Setup fullscreen looping video to be shown during sleep.
*/
Screensaver.prototype.createVideo = function( videoSrc ) {

    //Create video tag
    var videoTag = '<video id="screensaver_video" style="position:fixed; width:100%; height:100%; top:0px; left:0px; z-index:999;" class="video-js vjs-default-skin vjs-big-play-centered"><source src="'+videoSrc+'" type="video/mp4" /></video>';
    var videoOptions = { "controls": false, "autoplay": true, "loop": "true", "preload": "auto" };

    //Append to html
    $('body').append( videoTag );

    //Initialize player
    var thisRef = this;
    this.videoPlayer = videojs("screensaver_video", videoOptions, function() {
        // Player (this) is initialized and ready.
        thisRef.awake();
    });

}

/**
* Start the screensaver after X seconds of inactivity.
*/
Screensaver.prototype.timerIncrement = function() {

    //Increment counter
    this.idleTime = this.idleTime + 1;

    // If it's been X seconds of inactivity, save the screen
    if ( this.idleTime > this.timeoutSeconds && this.active == false) {

        this.sleep();

    }

}

/**
* Zero the idle timer on any movement.
*/
Screensaver.prototype.anyAction = function() {

    this.idleTime = 0;

    if (this.active == true) {

        this.awake();

    }

}

/**
* Display the screensaver
*/
Screensaver.prototype.sleep = function() {

    this.active = true;
    this.onSleepCallback();

    //Show the video
    $('#screensaver_video').css('visibility', 'visible');
    $('#screensaver_video').stop().fadeTo('slow', 1);
    this.videoPlayer.play();

}

/**
* Remove the screensaver
*/
Screensaver.prototype.awake = function() {

    this.active = false;
    this.onAwakeCallback();

    //Hide the video
    var thisRef = this;
    $('#screensaver_video').stop().fadeTo('slow', 0.0001, function() { // Fading to a non-zero value avoids an iPad specific bug. (https://github.com/videojs/video.js/issues/224)
        thisRef.videoPlayer.pause();
        $('#screensaver_video').css('visibility', 'hidden');
    });

}

