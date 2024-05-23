const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "PLAYER";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const ramdomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Perfect",
      singer: "Ed Sheeran",
      path: "./assets/music/perfect.mp3",
      image: "./assets/img/perfect.jpg",
    },
    {
      name: "We Don't Talk Anymore",
      singer: "Charlie Puth x Selena Gomez",
      path: "./assets/music/weDontTalkAnyMore.mp3",
      image: "./assets/img/weDontTalkAnyMore.jpg",
    },
    {
      name: "Love Someone",
      singer: "Lukas Graham",
      path: "./assets/music/loveSomeone.mp3",
      image: "./assets/img/loveSomeone.jpg",
    },

    {
      name: "See You Again",
      singer: "Wiz Khalifa ft. Charlie Puth",
      path: "./assets/music/seeYouAgain.mp3",
      image: "./assets/img/seeYouAgain.jpg",
    },
    {
      name: "Marvin Gaye",
      singer: "Charlie Puth",
      path: "./assets/music/seeYouAgain.mp3",
      image: "./assets/img/marvinGaye.jpg",
    },
    {
      name: "TỪNG LÀ",
      singer: "TỪNG LÀ",
      path: "./assets/music/tungLa.mp3",
      image: "./assets/img/tungLa.jpg",
    },
    {
      name: "Thinking Out Loud",
      singer: "Ed Sheeran",
      path: "./assets/music/thinkingOutLoud.mp3",
      image: "./assets/img/thinkingOutLoud.jpg",
    },
    {
      name: "I'm Yours",
      singer: "Jason Mraz",
      path: "./assets/music/imyours.mp3",
      image: "./assets/img/imyours.png",
    },
    {
      name: "7 Years",
      singer: "Lukas Graham",
      path: "./assets/music/7years.mp3",
      image: "./assets/img/7years.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
          <div class="song ${
            index === this.currentIndex ? "active" : ""
          }" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `;
    });

    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;

    // Handle CD rotate
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Zoom in and zoom out CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Play click
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //Playing song
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //Pausing song
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // seek bar change
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progessPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progessPercent;
      }
      console.log((audio.currentTime / audio.duration) * 100);
    };

    // handle for seek
    progress.onchange = function (e) {
      console.log(e.target.value);
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Previous song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // random
    ramdomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      ramdomBtn.classList.toggle("active", _this.isRandom);
    };

    // handle repeat song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Handle next when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // list click into play list
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length - 1) {
      this.currentIndex = 0;
    }

    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    console.log(newIndex);
    this.loadCurrentSong();
  },
  start: function () {
    // Load config
    this.loadConfig();

    // define properties for object
    this.defineProperties();

    // listen and handle events - Dom events
    this.handleEvents();

    // load current song into UI
    this.loadCurrentSong();

    // render playlist
    this.render();

    // Show initial state of button repeat & random
    ramdomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
