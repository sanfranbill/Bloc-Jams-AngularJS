(function() {
    function PlayerBarCtrl (Fixtures, SongPlayer) {     // inject services here inside the ()
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();