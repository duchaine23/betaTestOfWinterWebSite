window.onload = init;

    function init () {
        //take the happynewyear identifier
        var images = document.querySelectorAll("#happynewyear");
        for (var i = 0; i < images.length; i++) {
            images[i].onclick = showAnswer;
        }

        showRemaning();
        loadSong(currentSong);
        snowFall();

        timer = setInterval(showRemaning, 1000);
}


    function showAnswer (eventObj) {
        var image = eventObj.target;

        var name = image.id;
        name = name + ".jpg";
        image.src = name;
    
        // the photos will show in 5 sec after click
        setTimeout(reblur, 5000, image);
    }

    function reblur (image) {
        var name = image.id;
        name = name + "blur.jpg";
        image.src = name;
    };

    var end = new Date("01/01/2026 12:00 AM");

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaning () {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "HAPPY NEW YEAR!!!";

            return;
        }

    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById("countdown").innerHTML = 
        days + "days " +
        hours + "hrs " +
        minutes + "mins " +
        seconds + "secs ";
    }
   

    var songs = [
        { name: "Let it snow", src: "songs/let-it-snow.mp3"},
        { name: "Jingle bells", src: "songs/jingle-bells.mp3"},
        { name: "It's the most wonderful time", src: "songs/themost-wonderfultime.mp3"}
    ];


    var audio = new Audio(); //add audio
    audio.volume = 0.3;
    var currentSong = 0;
    var isPlaying = false;

    var songName = document.getElementById("songName");
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var playPauseBtn = document.getElementById("playPause");

    function loadSong (index) {
        audio.src = songs[index].src;
        songName.textContent = songs[index].name;
    }

    //play and pause the songs
    playPauseBtn.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = "▶️";
        } else {
            audio.play()
            playPauseBtn.textContent = "⏸️"
        }
            isPlaying = !isPlaying;
});

    //next song
    nextBtn.addEventListener("click", () => {
    currentSong++;
        if (currentSong >= songs.length) currentSong = 0 
            loadSong(currentSong);
        if (isPlaying) audio.play();
});

    //last song
    prevBtn.addEventListener("click", () => {
        currentSong--;
        if (currentSong < 0) currentSong = songs.length - 1;
            loadSong(currentSong);
        if(isPlaying) audio.play();
});

    var snow = document.getElementById("snowfall");
    var flakes = [];
    // how mane flakes
    var flakesCount = 60;

    // create snowflake
    for (var i = 0; i < flakesCount; i++) {
        var flake = document.createElement("div");
        flake.className = "snowflake";
        flake.textContent = "❄";

        flake.style.left = Math.random() * window.innerWidth + "px";
        flake.style.top = Math.random() * window.innerHeight + "px";

        flake.speed = Math.random() * 1 + 0.5;

        snow.appendChild(flake);
        flakes.push(flake);
}

    // snowflake move
    function snowFall () {
        for (var i = 0; i < flakes.length; i++) {
            var flake = flakes[i];
            flake.style.top = flake.offsetTop + flake.speed + "px";

        if (flake.offsetTop > window.innerHeight) {
            flake.style.top = "-10px";
            flake.style.left = Math.random() * window.innerWidth + "px";
        }
    }
    requestAnimationFrame(snowFall);
}


