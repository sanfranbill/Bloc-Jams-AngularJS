(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();  
          
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
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;      
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
        *@function stopSong
        *@dec Stops playing a song
        *@param {Object} song
        */
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /** 
        * @function getSongIndex
        * @desc Returns the index of the album/song's array of the currently playing song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc current song playing
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
                
        /**
        * @desc current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /** 
        * @function SongPlayer.play(song)
        * @desc Plays a song from the beginning if the song's state was not previously paused or continues playing if the song was in a paused state
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (song === null) {
                setSong(currentAlbum.songs[0]);
                playSong(currentAlbum.songs[0]);
            } else if (SongPlayer.currentSong !== song) {       // you clicked another song
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {     // you clicked the currently playing song
                if (currentBuzzObject.isPaused()) {       // checks if current song is paused
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /** 
        * @function SongPlayer.previous
        * @desc Plays the song in the previous index of the song's array
        * @param {Object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {  
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /** 
        * @function SongPlayer.next
        * @desc Plays the song in the next index of the song's array
        * @param {Object} song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
            }
        };
        
        /** 
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();