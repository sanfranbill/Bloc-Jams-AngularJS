(function() {
    function SongPlayer(Fixtures) {
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
        * @function SongPlayer.play(song)
        * @desc Plays a song from the beginning if the song's state was not previously paused or continues playing if the song was in a paused state
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {       // you clicked another song
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {     // you clicked the currently playing song
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
            
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();