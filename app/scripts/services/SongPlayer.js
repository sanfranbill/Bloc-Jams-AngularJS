(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc current song playing
        * @type {Object}
        */
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;      
        };
        
        /** 
        * @function playSong
        * @desc Play the current Buzz object and sets song.playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        /** 
        * @function SongPlayer.play(song)
        * @desc Plays a song from the beginning if the song's state was not previously paused or continues playing if the song was in a paused state
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {       // you clicked another song
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {      // you clicked the currently playing song
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /** 
        * @function SongPlayer.pause(song)
        * @desc Pauses a song that is currently playing
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();