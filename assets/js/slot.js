$(document).ready(function(){

    var numberToImage = {
        1: 'cherries.png',
        2: 'club.png',
        3: 'diamond.png',
        4: 'heart.png',
        5: 'joker.png',
        6: 'seven.png',
        7: 'spade.png'

    };

    var t;
    var timer_is_on = 0;
    var timerControlNumber = 0;
    var timerInterval = 50;
    var credit = 0;

    var myAudio = document.getElementById('myAudio');


     $('#btnSpin').on("click", function(){
        if(credit > 0){
            reloadCredit(-1);
            $('#welcomeWindow').text("Spinning....");
            startCount();
        }
        else{
            $('#welcomeWindow').text("Add Credits to Play Game!!! ");
        }
        
    });

    $('#addBtn').on('click', function(){
        reloadCredit(1);
     });

    function reloadCredit(value){
        credit += value;
        // creditValue.textContent = credit;
        $('#creditValue').text(credit);
    }


     $('#volumeControl').on('click', function(){
        if($(this).attr("myStatus") == '1'){
            $(this).addClass('glyphicon-volume-off');
            $(this).removeClass('glyphicon-volume-up');
            myAudio.volume = 0;
            $(this).attr('myStatus', 0);
        }
        else{
            $(this).removeClass('glyphicon-volume-off');
            $(this).addClass('glyphicon-volume-up');
            myAudio.volume = 1;
            $(this).attr('myStatus', 1);
        }
    });

    function startCount(){
        playDifferentAudio('reset');
        timerControlNumber = 0;
        if(!timer_is_on){
            timer_is_on = 1;
            timedCount();
        }

    }

    function playDifferentAudio(myCase){
        if(myCase == 'spin'){
            $('#myAudioSrc').attr("src", "sounds/spin.mp3");
            myAudio.load();
            myAudio.playbackRate = 10;
            myAudio.play();
        }
        else if(myCase == 'win'){
            $('#myAudioSource').attr('src','sounds/win.mp3');
            myAudio.load();
            myAudio.playbackRate=1;
            myAudio.play();
        }
        else if(myCase == 'lose'){
            $('#myAudioSource').attr('src','sounds/lose.mp3');
            myAudio.load();
            myAudio.playbackRate=1;
            myAudio.play();            
        }
        else if(myCase == 'reset'){
            $('#myAudioSrc').attr("src", "sounds/spin.mp3");
            myAudio.load();
            myAudio.playbackRate = 1;
        }
    }

    function getRandomNumber(){
        return Math.floor(Math.random()*7 ) + 1;
    }

    function timedCount(){
        timerControlNumber++;
        myAudio.play();
        myAudio.playbackRate = 10;

        t = setTimeout(timedCount, timerInterval);
        // console.log(t);

        if(timerControlNumber<20){
            var tempImg1 = "images/" + numberToImage[getRandomNumber()];
            var tempImg2 = "images/" + numberToImage[getRandomNumber()];
            var tempImg3 = "images/" + numberToImage[getRandomNumber()];
        }
        else if(timerControlNumber<40){
            var tempImg2 = "images/" + numberToImage[getRandomNumber()];
            var tempImg3 = "images/" + numberToImage[getRandomNumber()];
        }
        else if(timerControlNumber<60){
            var tempImg3 = "images/" + numberToImage[getRandomNumber()];
        }
        else if(timerControlNumber == 60){
            stopCount();
        }
        // console.log(timerControlNumber);

        $("#img1").attr("src", tempImg1);
        $("#img2").attr("src", tempImg2);
        $("#img3").attr("src", tempImg3);


    }

    function stopCount(){
        clearTimeout(t);
        timer_is_on = 0;
        getResult();
    }

    function getResult(){
        let tempImgSrc1 = $("#img1").attr("src");
        let tempImgSrc2 = $("#img2").attr("src");
        let tempImgSrc3 = $("#img3").attr("src");

        if(tempImgSrc1 == tempImgSrc2 && tempImgSrc1 == tempImgSrc3){
            $('#welcomeWindow').text("You won !!!");
            playDifferentAudio('win');
        }
        else{
            $('#welcomeWindow').text("You lost !!!");
            playDifferentAudio('lose');
        }
    }

});