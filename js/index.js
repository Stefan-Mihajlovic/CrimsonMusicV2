setHomeScreen();

/* ----- GET THE TIME ----- */

window.onload = getTime();
function getTime(){
    var d = new Date();
    var time = d.getHours();

    todEl = document.getElementById('timeOfDay');
    todEl2 = document.getElementById('timeOfDayNav');

    if (time < 12) {
        todEl.innerHTML = 'Good Morning';
        todEl2.innerHTML = 'Good Morning';
    }
    if (time >= 12 && time < 18) {
        todEl.innerHTML = 'Good Afternoon';
        todEl2.innerHTML = 'Good Afternoon';
    }
    if (time >= 18) {
        todEl.innerHTML = 'Good Evening';
        todEl2.innerHTML = 'Good Evening';
    }
}

/* ----- HIDE / SHOW HEADER ----- */

let header = document.getElementsByTagName("header")[0];

let main = document.getElementsByClassName("homeScreen")[0];
main.addEventListener('scroll', () => {
    if(main.scrollTop <= 50){
        header.classList.remove("headerHidden");
    }else{
        header.classList.add("headerHidden");
    }
})

let main2 = document.getElementsByClassName("searchScreen")[0];
main2.addEventListener('scroll', () => {
    if(main2.scrollTop <= 50){
        header.classList.remove("headerHidden");
    }else{
        header.classList.add("headerHidden");
    }
})

let main3 = document.getElementsByClassName("yoursScreen")[0];
main3.addEventListener('scroll', () => {
    if(main3.scrollTop <= 50){
        header.classList.remove("headerHidden");
    }else{
        header.classList.add("headerHidden");
    }
})

function showHeader(){
    header.classList.remove("headerHidden");
}

/* ----- SET SCREEN ----- */

let currentScreen = "homeScreen";

function setScreen(screenToSet, clickedBtn, activeScreen){

    closePlaylistPage();
    closeArtistPage();
    closeCategoryPage();
    showHeader();
    closeLoginScreen();

    if (activeScreen !== currentScreen) {
        let buttons = document.querySelectorAll("nav > button");
        buttons.forEach((button) => {
            button.classList.remove("activeScreen");
        });
        clickedBtn.classList.add("activeScreen");

        let mains = document.querySelectorAll("main");
        mains.forEach((main) => {
            main.classList.remove("activeMain");
        });

        let bubble = document.getElementsByClassName("bubble")[0];
        bubble.classList.remove("yoursScreenBubble");
        bubble.classList.remove("searchScreenBubble");
        bubble.classList.remove("homeScreenBubble");
        bubble.classList.add(activeScreen+"Bubble");

        currentScreen = activeScreen;
    }

    let activeMain = document.getElementsByClassName(activeScreen)[0];
    activeMain.classList.add("activeMain");

    if(activeScreen === "searchScreen"){
        let searchList = document.getElementsByClassName("searchList")[0];
        let searchInput = document.getElementById("searchInput");

        searchList.classList.remove("searchListOpen");
        searchList.innerHTML = "";
        searchInput.value = "";
    }
}

function setHomeScreen(){
    document.getElementsByClassName("homeScreen")[0].classList.add("activeMain");
}

/* ----- Button clicks ----- */

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener('click', () => {
        buttonClickAnim(button);
    });
});

function buttonClickAnim(button){
    button.classList.add("buttonClicked");
    setTimeout(() => {
        button.classList.remove("buttonClicked");
    }, 150);
}

function clickEffect(button){
    if(button !== undefined){
        button.classList.add("buttonClicked");
        setTimeout(() => {
            button.classList.remove("buttonClicked");
        }, 150);
    }
}

/* ----- LOGIN SCREEN ----- */

function openLoginScreen(){
    let loginScreen = document.getElementsByClassName("loginScreen")[0];
    document.getElementsByClassName(currentScreen)[0].classList.add("mainToSide");

    loginScreen.classList.add("loginScreenOpen");
}

function closeLoginScreen(){
    let loginScreen = document.getElementsByClassName("loginScreen")[0];
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");

    loginScreen.classList.remove("loginScreenOpen");
    setTimeout(() => {
        loginScreen.style.left = 'auto';
    }, 350);
}

// Switch from register to login screen
function RegToLog(){
    let titles = document.getElementsByName("regLogTitle");
    let emailInput = document.getElementById("email");
    let alreadyAcc = document.getElementById("alreadtAcc");
    let registerBtn = document.getElementById("registerBtn");
    let loginBtn = document.getElementById("loginBtn");

    titles.forEach((title) => {
        title.innerHTML = "Login";
    });
    email.style.display = "none";
    alreadyAcc.innerHTML = `Don't have an account? <span class="highlightSpan" onclick="LogToReg()">Register here!</span>`;
    registerBtn.style.display = "none";
    loginBtn.style.display = "block";
}

function LogToReg(){
    let titles = document.getElementsByName("regLogTitle");
    let emailInput = document.getElementById("email");
    let alreadyAcc = document.getElementById("alreadtAcc");
    let registerGoogleBtn = document.getElementById("regGoogleBtn");

    titles.forEach((title) => {
        title.innerHTML = "Register";
    });
    email.style.display = "block";
    alreadyAcc.innerHTML = `Already have an account? <span class="highlightSpan" onclick="RegToLog()">Log in!</span>`;
    registerBtn.style.display = "block";
    loginBtn.style.display = "none";
}

/* ----- Set logged in screen ----- */

function setLoggedInScreen(){
    document.getElementsByClassName("loginForm")[0].style.display = "none";
    document.getElementsByClassName("loggedInScreen")[0].style.display = "flex";
    document.getElementsByName("regLogTitle")[0].innerHTML = "Account";

}

function setLoggedOutScreen(){
    document.getElementsByClassName("loginForm")[0].style.display = "flex";
    document.getElementsByClassName("loggedInScreen")[0].style.display = "none";
    document.getElementsByName("regLogTitle")[0].innerHTML = "Register";
}

/* ----- PLAYER ----- */

let isPlayerOpen = false;
let isSongPaused = true;

function closeBigPlayer(){
    let player = document.getElementsByClassName("player")[0];
    player.classList.remove("playerOpenTop");
    player.classList.remove("playerOpen");
    player.style.top = 'auto';
    document.getElementsByTagName("nav")[0].classList.remove("navClosed");
    isPlayerOpen = false;
}

const currentSongAudio = document.getElementById("currentSong");
let playingFrom = document.getElementById("playingFromSpan");

// PLAY THE SELECTED SONG

let isTheVaultOn = false;

function playerSelectedSong(songURL,songTitle,songCreator,imageURL,playedFrom,vft){
    openMiniPlayer();

    currentSongAudio.autoplay = true;
    currentSongAudio.play();
    currentSongAudio.src = songURL;

    let songBanners = document.getElementsByName("songBanner");
    let songTitles = document.getElementsByName("songTitle");
    let songArtists = document.getElementsByName("songArtist");

    let songPlayBtns = document.getElementsByName("songPlayButton");
    songPlayBtns.forEach((button) => {
        button.children[0].classList.remove("fa-circle-play");
        button.children[0].classList.add("fa-circle-pause");
    });
    isSongPaused = false;

    songBanners.forEach((banner) => {
        banner.src = imageURL;
    });
    songTitles.forEach((title) => {
        title.innerHTML = songTitle;
    });
    songArtists.forEach((artist) => {
        artist.innerHTML = songCreator;
    });

    playingFrom.innerHTML = playedFrom;

    currentSongAudio.currentTime = 0;
    currentSongAudio.play();
    if(currentSongAudio.paused){
        currentSongAudio.play();
    }
    // if(vft){
    //     setTimeout(() => {
    //         document.getElementById("openTheVaultBtn").click();
    //         setTimeout(() => {
    //             document.getElementById("openTheVaultBtn").click();
    //         }, 50);
    //     }, 50);
    // }

}

// PLAY PLAYLIST FROM PLAY BUTTON

function playPlaylist(){
    
    pausePlayCurrentSong("Playlist");


}

// Open MINI PLAYER
function openMiniPlayer(){
    if(!isPlayerOpen){
        let player = document.getElementsByClassName("player")[0];
        player.style.opacity = "1";
        player.style.pointerEvents = "all";
        player.style.transform = "translateY(0%)";
    }
}

// PAUSE / PLAY THE CURRENT SONG

function pausePlayCurrentSong(from){

    let songPlayBtns = document.getElementsByName("songPlayButton");
    let playPlaylistBtn = document.getElementById("playPlaylistBtn");
    let playlistQueue = document.getElementsByClassName("playlistSongsList")[0].children;

    if(from === "Playlist"){
        playlistQueue[0].classList.add("songPlayingLi");
    }

    if(isSongPaused){
        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-play");
            button.children[0].classList.add("fa-circle-pause");
        });

        if(from === "Playlist"){
            playPlaylistBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause`;
            if(currentSongAudio.currentTime === 0){
                playlistQueue[0].children[1].click();
            }else{
                currentSongAudio.play();
            }
        }else{
            currentSongAudio.play();
        }

        isSongPaused = false;
    }else{
        currentSongAudio.pause();

        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-pause");
            button.children[0].classList.add("fa-circle-play");
        });

        if(from === "Playlist"){
            playPlaylistBtn.innerHTML = `<i class="fa-solid fa-play"></i> Play`;
        }

        isSongPaused = true;
    }
}

let songTime = document.getElementById("currentSongInput");

let isRepeatOn = false;

function setTheVault(){
    isTheVaultOn = true;
}

currentSongAudio.addEventListener('ended', () => {
    if(isRepeatOn){
        currentSongAudio.currentTime = 0;
        currentSongAudio.play();
    }else{
        if(playingFrom.innerHTML === "Playlist"){

        }
        if(isTheVaultOn){
            playRandomSongForTheVault();
        }
        else{
            let songPlayBtns = document.getElementsByName("songPlayButton");
    
            songPlayBtns.forEach((button) => {
                button.children[0].classList.remove("fa-circle-pause");
                button.children[0].classList.add("fa-circle-play");
            });
    
            isSongPaused = true;
        }
    }
});

let repeatBtn = document.getElementById("repeatBtn");
repeatBtn.addEventListener('click', () => {
    isRepeatOn = !isRepeatOn;
    repeatBtn.classList.toggle("buttonTurnedOn");
});

// Set the seekbar and times relative to the songs current time
currentSongAudio.addEventListener('timeupdate', () =>{
    let musicCurr = currentSongAudio.currentTime;
    let musicDur = currentSongAudio.duration;

    // End Time
    let min = Math.floor(musicDur / 60);
    let sec = Math.floor(musicDur % 60);

    if(sec<10){
        sec = `0${sec}`;
    }
    
    document.getElementById("currentSongTimeLeft").innerHTML = `${min}:${sec}`;

    //Curr Time
    let min2 = Math.floor(musicCurr / 60);
    let sec2 = Math.floor(musicCurr % 60);

    if(sec2<10){
        sec2 = `0${sec2}`;
    }

    document.getElementById("currentSongTime").innerHTML = `${min2}:${sec2}`;

    let progressBar = parseInt((currentSongAudio.currentTime/currentSongAudio.duration)*100);
    songTime.value = progressBar;

    let miniSeekBar = document.getElementById("miniSeekBar");
    miniSeekBar.style.width = progressBar + "%";


});

songTime.addEventListener('change', ()=>{
    var seekto = currentSongAudio.duration * (songTime.value / 100);
    currentSongAudio.currentTime = seekto;
})

// CHECK THE CHIPS ON SEARCH

let allChips = document.getElementsByName("allChip");

function checkTheChip(){
    allChips.forEach((chip) => {
        if(chip.checked){
            chip.classList.add("allchipCh");
        }else{
            chip.classList.remove("allchipCh");
        }
    })
}


// SCROLL ON PAGEBARS

let screenScrollables = document.getElementsByName("screenScrollable");
let sideBanner1 = document.getElementsByName("artistBanner")[0];
let sideBanner2 = document.getElementsByName("playlistBanner")[0];
let sideBanner3 = document.getElementsByName("catBanner")[0];

screenScrollables.forEach((screen) => {
    screen.addEventListener("scroll", ()=>{

        if(screen.id !== "screenScrollableCat"){
            if(screen.scrollTop > 170){
                screen.children[2].children[1].children[0].style.opacity = 1 - (screen.scrollTop/124.5 - 1);
            }else{
                screen.children[2].children[1].children[0].style.opacity = 1;
            }
        }

        if(screen.scrollTop > 250){
            screen.children[0].classList.add("pageBarOn");
            screen.children[1].classList.add("pageBarOn2");
        }else{
            screen.children[0].classList.remove("pageBarOn");
            screen.children[1].classList.remove("pageBarOn2");
        }

        sideBanner1.style.transform = "translateY(-"+ screen.scrollTop / 3 +"px)";
        sideBanner2.style.transform = "translateY(-"+ screen.scrollTop / 3 +"px)";
        sideBanner3.style.transform = "translateY(-"+ screen.scrollTop / 3 +"px)";
    })
})

// THE VAULT

function pausePlayCurrentSongVault(){

    let songPlayBtns = document.getElementsByName("songPlayButton");

    if(isSongPaused){
        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-play");
            button.children[0].classList.add("fa-circle-pause");
        });
        
        currentSongAudio.play();
        isSongPaused = false;
    }else{
        currentSongAudio.pause();

        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-pause");
            button.children[0].classList.add("fa-circle-play");
        });

        isSongPaused = true;
    }
}

// Make a Playlist

let makePlScreen = document.getElementsByClassName("makePlaylistScreen")[0];
let isMakePlOpen = false;

function OpenMakePlaylistScreen(){
    makePlScreen.classList.add("makePlaylistScreenOpen");
    document.getElementsByClassName(currentScreen)[0].classList.add("mainToSide");
}

function CloseMakePlaylistScreen(){
    makePlScreen.classList.remove("makePlaylistScreenOpen");
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");
}

function changeMakePlaylistName(text){
    if(text != ""){
        document.getElementsByClassName("currentMakePlaylistName")[0].innerHTML = text;
    }else{
        document.getElementsByClassName("currentMakePlaylistName")[0].innerHTML = "My Playlist";
    }
}

// ----- Close Popup

function openPopup(type,src,art,nam,id,isLikedPage){
    let popupWrapper = document.getElementById("popupWrapper");
    popupWrapper.classList.add("popupOpen");

    let songPopupBody = document.getElementsByClassName("songPopupBody")[0];
    let playlistPopupBody = document.getElementsByClassName("playlistPopupBody")[0];

    let popupImages = document.getElementsByName("popupImage");
    let popupSongTitle = document.getElementsByName("popupSongTitle");
    let popupArtist = document.getElementsByName("popupArtist");

    document.getElementsByClassName("popupScreen")[0].classList.remove("playerMovable");
    document.getElementsByClassName("popupScreen")[0].focus();
    document.getElementsByClassName("popupScreen")[0].style.top = 'auto';

    popupImages.forEach((image) => {
        image.src = src;
    })

    popupSongTitle.forEach((title) => {
        title.innerHTML = nam;
    })

    popupArtist.forEach((artist) => {
        artist.innerHTML = art;
    })

    if(type === 'song'){
        songPopupBody.style.display = "block";
        playlistPopupBody.style.display = "none";
    }else{
        songPopupBody.style.display = "none";
        playlistPopupBody.style.display = "block";
    }

    seeIfSongIsLiked(id);

    let likeSongBtn = document.getElementById("likeSongBtn");
    if(isLikedPage){
        likeSongBtn.addEventListener('click', () => {
            addSongToLiked(id,true);
            likeSongBtn.classList.add("likeBtnAnim");
            setTimeout(() => {
                likeSongBtn.classList.remove("likeBtnAnim");
            }, 500);
        })
    }else{
        likeSongBtn.addEventListener('click', () => {
            addSongToLiked(id);
            likeSongBtn.classList.add("likeBtnAnim");
            setTimeout(() => {
                likeSongBtn.classList.remove("likeBtnAnim");
            }, 500);
        })
    }
}

function closePopup(){
    let popupWrapper = document.getElementById("popupWrapper");
    popupWrapper.classList.remove("popupOpen");
}

// ----- SET APP THEME

function setAppTheme(userTheme){

    if(userTheme === "Dark"){
        setDarkTheme();
    }else if(userTheme === "Light"){
        setLightTheme();
    }

    if(darkThemeInput.checked){
        setDarkTheme();
    }else{
        setLightTheme();
    }
}

function setDarkTheme(){

    let lightThemeInput = document.getElementById("lightThemeInput");
    let lightThemeInput2 = document.getElementById("lightThemeInput2");
    let darkThemeInput = document.getElementById("darkThemeInput");
    let darkThemeInput2 = document.getElementById("darkThemeInput2");
    
    lightThemeInput2.checked = false;
    darkThemeInput2.checked = true;

    document.documentElement.style.setProperty('--bodyBg', 'black');
    document.documentElement.style.setProperty('--playerColor', '#242027');
    document.documentElement.style.setProperty('--offWhite', '#DCD6F7');
    document.documentElement.style.setProperty('--darken', 'black');
    document.documentElement.style.setProperty('--allChColor', 'rgba(255, 255, 255, 0.2)');
    document.documentElement.style.setProperty('--yoursBubbleColor', 'rgb(90, 0, 27)');
    document.documentElement.style.setProperty('--pageBarColor', 'rgba(0, 0, 0, 0.8)');
    document.documentElement.style.setProperty('--offWhiteDark', '#8a85a1');
    document.documentElement.style.setProperty('--sidePageback', 'black');
    document.documentElement.style.setProperty('--mainColor', 'rgba(36, 34, 39, 0.6)');
    document.documentElement.style.setProperty('--mainColorLighter', 'rgba(21, 19, 23, 0.6)');
    document.documentElement.style.setProperty('--secondaryColor', 'rgba(19, 19, 19, 0.45)');
    document.documentElement.style.setProperty('--latestReleaseBox', '#100e1c');
    document.documentElement.style.setProperty('--footerBg', 'linear-gradient(45deg, #100e1c, rgb(22, 20, 29))');

    document.getElementsByName("accountPhoto").forEach((photo) => {
        photo.style.filter = "invert(0) brightness(1)";
    })

    accountTheme = "Dark";
}

function setLightTheme(){

    let lightThemeInput = document.getElementById("lightThemeInput");
    let lightThemeInput2 = document.getElementById("lightThemeInput2");
    let darkThemeInput = document.getElementById("darkThemeInput");
    let darkThemeInput2 = document.getElementById("darkThemeInput2");

    lightThemeInput2.checked = true;
    darkThemeInput2.checked = false;

    document.documentElement.style.setProperty('--bodyBg', '#ece8ff');
    document.documentElement.style.setProperty('--playerColor', '#c1bbc6');
    document.documentElement.style.setProperty('--offWhite', '#100e1c');
    document.documentElement.style.setProperty('--offWhiteDark', '#100e1c');
    document.documentElement.style.setProperty('--darken', '#ede7ff');
    document.documentElement.style.setProperty('--allChColor', 'rgba(0, 0, 0, 0.2)');
    document.documentElement.style.setProperty('--yoursBubbleColor', 'rgba(134, 69, 255, 0.25)');
    document.documentElement.style.setProperty('--pageBarColor', 'rgba(222, 213, 255, 0.6)');
    document.documentElement.style.setProperty('--sidePageback', 'linear-gradient(0deg, #ece8ff, rgba(134, 69, 255, 0.25))');
    document.documentElement.style.setProperty('--mainColor', 'rgba(220,220,220, 0.9)');
    document.documentElement.style.setProperty('--mainColorLighter', 'rgba(255, 255, 255, 0.5)');
    document.documentElement.style.setProperty('--latestReleaseBox', 'rgb(0,0,0,0.2)');
    document.documentElement.style.setProperty('--secondaryColor', 'rgba(230, 230, 230, 0.45)');
    document.documentElement.style.setProperty('--footerBg', 'linear-gradient(45deg, #ece8ff, rgba(134, 69, 255, 0.15))');

    document.getElementsByName("accountPhoto").forEach((photo) => {
        photo.style.filter = "invert(1) brightness(0)";
    })

    accountTheme = "Light";
}

// ----- PLAYER OPEN / CLOSE

const movablePlayer = document.getElementsByClassName("player")[0];
const playerOpenDiv = document.getElementsByClassName("playerClickDiv")[0];
const playerOpenDiv2 = document.getElementsByClassName("playerClickDiv2")[0];
let offsetY,currentTouchPos = 0;
let playerTouchStarted = false, playerTouchStarted2 = false;
let moveStarted = true;
let playerNormalPos = movablePlayer.offsetTop;
let sidePageNormalPos = document.getElementsByClassName("loginScreen")[0].offsetLeft;

const move = (e) => {
    currentTouchPos = (e.touches[0].clientY - offsetY);
    if(currentTouchPos <= (-50)){
        return;
    }
    moveStarted = true;
    // Update div pos based on new cursor pos
    movablePlayer.style.top = `${e.touches[0].clientY - offsetY}px`;
    // console.log("moved " + (e.touches[0].clientY - offsetY));
}

playerOpenDiv.addEventListener("touchstart", (e) => {
    // console.log("touched");
    movablePlayer.classList.add("playerOpen");
    document.getElementsByTagName("nav")[0].classList.add("navClosed");
    // Calc the initial offset Values
    offsetY = e.touches[0].clientY - movablePlayer.offsetTop;
    movablePlayer.style.top = `${e.touches[0].clientY - offsetY}px`;
    movablePlayer.classList.add("playerMovable");
    document.addEventListener("touchmove", move);
    playerTouchStarted = true;
    moveStarted = false;
})

// ----- playerDiv 2

const move2 = (e) => {
    currentTouchPos = (e.touches[0].clientY - offsetY);
    moveStarted = true;
    // Update div pos based on new cursor pos
    movablePlayer.classList.add("playerMovable");
    movablePlayer.style.top = `${e.touches[0].clientY - offsetY}px`;
    // console.log("moved " + (e.touches[0].clientY - offsetY));
}

playerOpenDiv2.addEventListener("touchstart", (e) => {
    // console.log("touched");
    movablePlayer.classList.add("playerOpen");
    // Calc the initial offset Values
    offsetY = e.touches[0].clientY - movablePlayer.offsetTop;
    movablePlayer.style.top = `${e.touches[0].clientY - offsetY}px`;
    movablePlayer.classList.add("playerMovable");
    document.addEventListener("touchmove", move2);
    playerTouchStarted2 = true;
    moveStarted = false;
})

// ----- SIDE PAGES CLOSE

let offsetX;
const loginScreen = document.getElementsByClassName("loginScreen")[0];
const closeLoginScreenBtn = document.getElementById("closeLoginScreen");
let touchSideStarted = false;

const moveSide = (e) => {
    currentTouchPos = (e.touches[0].clientX - offsetX);
    moveStarted = true;
    // Update div pos based on new cursor pos
    loginScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");
    // console.log("moved " + (e.touches[0].clientX - offsetX));
}

closeLoginScreenBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    // console.log("touched");
    // Calc the initial offset Values
    offsetX = e.touches[0].clientX - loginScreen.offsetLeft;
    loginScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    loginScreen.classList.add("playerMovable");
    document.addEventListener("touchmove", moveSide);
    touchSideStarted = true;
    moveStarted = false;
})

const closePlaylistScreenBtn = document.getElementById("closePlaylistScreen");
const closeArtistScreenBtn = document.getElementById("closeArtistScreen");
const closeCategoryScreenBtn = document.getElementById("closeCategoryScreen");
const playlistScreen = document.getElementsByClassName("playlistScreen")[0];
const artistScreen = document.getElementsByClassName("artistScreen")[0];
const categoryScreen = document.getElementsByClassName("categoryScreen")[0];

// Playlist Close

closePlaylistScreenBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    // console.log("touched");
    // Calc the initial offset Values
    offsetX = e.touches[0].clientX - playlistScreen.offsetLeft;
    playlistScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    playlistScreen.classList.add("playerMovable");
    document.addEventListener("touchmove", moveSide2);
    touchSideStarted = true;
    moveStarted = false;
})

const moveSide2 = (e) =>{
    currentTouchPos = e.touches[0].clientX - offsetX;
    moveStarted = true;
    // Update div pos based on new cursor pos
    playlistScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");
    // console.log("moved " + e.touches[0].clientX - offsetX);
}

// Artist Close

closeArtistScreenBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    // console.log("touched");
    // Calc the initial offset Values
    offsetX = e.touches[0].clientX - artistScreen.offsetLeft;
    artistScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    artistScreen.classList.add("playerMovable");
    document.addEventListener("touchmove", moveSide3);
    touchSideStarted = true;
    moveStarted = false;
})

const moveSide3 = (e) =>{
    currentTouchPos = e.touches[0].clientX - offsetX;
    moveStarted = true;
    // Update div pos based on new cursor pos
    artistScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");
    // console.log("moved " + e.touches[0].clientX - offsetX);
}

// Category Close

closeCategoryScreenBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    // console.log("touched");
    // Calc the initial offset Values
    offsetX = e.touches[0].clientX - categoryScreen.offsetLeft;
    categoryScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    categoryScreen.classList.add("playerMovable");
    document.addEventListener("touchmove", moveSide4);
    touchSideStarted = true;
    moveStarted = false;
})

const moveSide4 = (e) =>{
    currentTouchPos = e.touches[0].clientX - offsetX;
    moveStarted = true;
    // Update div pos based on new cursor pos
    categoryScreen.style.left = `${e.touches[0].clientX - offsetX}px`;
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");
    // console.log("moved " + e.touches[0].clientX - offsetX);
}

// Popup Screen

const popupScreen = document.getElementsByClassName("popupScreen")[0];
let playerTouchStarted3 = false;
let startPopupOffsetTop = popupScreen.offsetTop;

const move3 = (e) => {
    currentTouchPos = (e.touches[0].clientY - offsetY);
    moveStarted = true;
    // Update div pos based on new cursor pos
    if(currentTouchPos > startPopupOffsetTop){
        popupScreen.classList.add("playerMovable");
        popupScreen.style.top = `${e.touches[0].clientY - offsetY}px`;
    }
    // console.log("moved " + (e.touches[0].clientY - offsetY));
}

popupScreen.addEventListener("touchstart", (e) => {
    // console.log("touched");
    // Calc the initial offset Values
    offsetY = e.touches[0].clientY - popupScreen.offsetTop;
    popupScreen.style.top = `${e.touches[0].clientY - offsetY}px`;
    popupScreen.classList.add("playerMovable");
    document.addEventListener("touchmove", move3);
    playerTouchStarted3 = true;
    moveStarted = false;
})

// ----- TOUCH END

document.addEventListener("touchend", () => {
    if(playerTouchStarted){
        document.removeEventListener("touchmove", move);
        movablePlayer.classList.remove("playerMovable");
        if(currentTouchPos < playerNormalPos - 125){
            movablePlayer.style.top = `calc(env(safe-area-inset-top) - 50px)`;
            isPlayerOpen = true;
            // console.log("less than 350!");
        }else{
            movablePlayer.style.top = `calc(${playerNormalPos}px + env(safe-area-inset-top) - env(safe-area-inset-bottom) * 0.6)`;
            movablePlayer.classList.remove("playerOpen");
            document.getElementsByTagName("nav")[0].classList.remove("navClosed");
            isPlayerOpen = false;
        }
        // console.log("touch ended");
        playerTouchStarted = false;
        if(!moveStarted){
            movablePlayer.classList.add("playerOpen");
            movablePlayer.style.top = `calc(env(safe-area-inset-top) - 50px)`;
            document.getElementsByTagName("nav")[0].classList.add("navClosed");
            isPlayerOpen = true;
        }
    }
    if(touchSideStarted && moveStarted){
        if(currentTouchPos < sidePageNormalPos + 75){
            document.removeEventListener("touchmove", moveSide);
            document.removeEventListener("touchmove", moveSide2);
            document.removeEventListener("touchmove", moveSide3);
            document.removeEventListener("touchmove", moveSide4);
            loginScreen.classList.remove("playerMovable");
            playlistScreen.classList.remove("playerMovable");
            artistScreen.classList.remove("playerMovable");
            categoryScreen.classList.remove("playerMovable");
            playlistScreen.style.left = '0';
            artistScreen.style.left = '0';
            categoryScreen.style.left = '0';
            loginScreen.style.left = '0';
        }else{
            document.removeEventListener("touchmove", moveSide);
            document.removeEventListener("touchmove", moveSide2);
            document.removeEventListener("touchmove", moveSide3);
            document.removeEventListener("touchmove", moveSide4);
            loginScreen.classList.remove("playerMovable");playerTouchStarted2 = false;
            playlistScreen.classList.remove("playerMovable");
            artistScreen.classList.remove("playerMovable");
            categoryScreen.classList.remove("playerMovable");
            playlistScreen.style.left = '0';
            artistScreen.style.left = '0';
            categoryScreen.style.left = '0';
            loginScreen.style.left = '0';
            closePlaylistPage();
            closeArtistPage();
            closeCategoryPage();
            closeLoginScreen();
            touchSideStarted = false;
            moveStarted = false;
        }
    }
    if(playerTouchStarted2 && moveStarted){
        movablePlayer.classList.remove("playerMovable");
        movablePlayer.classList.remove("playerOpen");
        movablePlayer.style.top = `calc(${playerNormalPos}px + env(safe-area-inset-top) - env(safe-area-inset-bottom) * 0.6)`;
        document.removeEventListener("touchmove", move2);
        document.getElementsByTagName("nav")[0].classList.remove("navClosed");
        isPlayerOpen = false;
    }
    if(playerTouchStarted3){
        popupScreen.classList.remove("playerMovable");
        document.removeEventListener("touchmove", move3);
        if(currentTouchPos <= startPopupOffsetTop + 100){
            popupScreen.style.top = "calc(" + startPopupOffsetTop + "px + env(safe-area-inset-top)";
        }else{
            popupWrapper.classList.remove("popupOpen");
        }
    }
    playerTouchStarted3 = false;
    playerTouchStarted2 = false;
    playerTouchStarted = false;
})