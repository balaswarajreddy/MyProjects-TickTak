var prePlayer = "x";
var clickCount = 0;
var p1s = 0;
var p2s = 0;
var savedp1name = localStorage.getItem("p1name");
var savedp2name = localStorage.getItem("p2name");
var savedp1score = localStorage.getItem("p1score");
var savedp2score = localStorage.getItem("p2score");

if(savedp1name != null){
    $("#p1span").text(savedp1name);
    $("#p2span").text(savedp2name);
    $("#p-1-score").val(savedp1score);
    $("#p-2-score").val(savedp2score);
    p1s = savedp1score;
    p2s = savedp2score;
} //sets initial values form storage

$("#start-game").click(function(e){
    e.preventDefault();
    var p1name = $("#getp-1").val();
    var p2name = $("#getp-2").val();
    if(p1name !="" && p2name !=""){
        $("#p1span").text(p1name);
        $("#p2span").text(p2name);
        localStorage.setItem("p1name",p1name);
        localStorage.setItem("p2name",p2name);
        
    }
    else{
        localStorage.setItem("p1name","p-1");
        localStorage.setItem("p2name","p-2");
    }
    $("#game-board").css("visibility","visible");
    $("#player-board").css("visibility","hidden");
}); // when player wants to start a game

$("#new-round").click(function(e){
    e.preventDefault();
    $("#player-board").css("visibility","hidden");
    $("#game-board").css("visibility","visible");
    $("#cheer-board").css("visibility","hidden");
}); // when user wants to play new round with the same player

$("#new-game").click(function(e){
    e.preventDefault();
    $("#getp-1").val("");
    $("#getp-2").val(""); 
    $("#game-board").css("visibility","hidden");
    $("#player-board").css("visibility","visible");
    $("#cheer-board").css("visibility","hidden");
    p1s = "0";
    p2s = "0";
    $("#p-1-score").val(p1s);
    $("#p-2-score").val(p2s);
    $("#p1span").text("p-1");
    $("#p2span").text("p-2");
    localStorage.setItem("p1name","p-1");
    localStorage.setItem("p2name","p-2");
    localStorage.setItem("p1score","0");
    localStorage.setItem("p2score","0");

}); // when user wants to play a new game 

$(".pbtn").click(function(e){
    e.preventDefault();
    var currentPlayer = placePlayer(prePlayer);
    prePlayer = currentPlayer
    $(this).text(currentPlayer);
    $("#"+this.id).prop("disabled","true");
    var win = checkWin(this.id);
    clickCount++;
    if(win){
        $("#cheer-board").css("visibility","visible");
        $("#cheer-text").text("Won Wanna play a new Game");
        resetGameBoard();
        clickCount = 0;
        $("#game-board").css("visibility","hidden");
        if(currentPlayer == "o"){
            p1s++;
            $("#p-1-score").val(p1s);
            localStorage.setItem("p1score",p1s);
        }
        else{
            p2s++;
            $("#p-2-score").val(p2s);
            localStorage.setItem("p2score",p2s);
        }
    }
    else{
        if(clickCount == 9){
            
            $("#cheer-text").text("Good Luck Next Game");
            $("#cheer-board").css("visibility","visible");
            resetGameBoard();
            $("#game-board").css("visibility","hidden");
            clickCount = 0;
        }
    }
}); // when user places x or y 

function checkWin(currentPlayer){
    var adjv = []; 
    adjv = getChecklist(currentPlayer);
    var len = adjv.length;
    for(i = 0; i<len; i++){
        var val1,val2,val3,v1,v2,v3;
        val1=adjv[i][0];
        val2=adjv[i][1];
        val3=adjv[i][2];
        v1 = $("#"+val1).text();
        v2 = $("#"+val2).text();
        v3 = $("#"+val3).text();

        if(v1 == v2 && v1 == v3){
            return true;
        }
        

    }
} // return whether the player won 

function resetGameBoard(){
    var bid;
    for(var i = 0; i<9; i++){
        bid = "#"+(i+1);
        $(bid).text("");
        $(bid).removeAttr("disabled");
    }
} // empties game board

function getChecklist(currentValue){
    switch (currentValue) {
        case "1":
            var adj1 = [1,2,3];
            var adj2 = [1,4,7];
            var adj3 = [1,5,9];
            return [adj1,adj2,adj3];
        
        case "2":
            var adj1 = [1,2,3];
            var adj2 = [2,5,8];
            return [adj1,adj2];
        case "3":
            var adj1 = [1,2,3];
            var adj2 = [3,6,9];
            var adj3 = [3,5,7];
            return [adj1,adj2,adj3];
        case "4":
            var adj1 = [1,4,7];
            var adj2 = [4,5,6];
            return [adj1,adj2];
        case "5":
            var adj1 = [1,5,9];
            var adj2 = [2,5,8];
            var adj3 = [3,5,7];
            var adj4 = [4,5,6];
            return [adj1,adj2,adj3,adj4];
        case "6":
            var adj1 = [4,5,6];
            var adj2 = [3,6,9];
            return [adj1,adj2];
        case "7":
            var adj1 = [1,4,7];
            var adj2 = [7,5,3];
            var adj3 = [7,8,9];
            return [adj1,adj2,adj3];
        
        case "8":
            var adj1 = [2,5,8];
            var adj2 = [7,8,9];
            return [adj1,adj2];
        case "9":
            var adj1 = [3,6,9];
            var adj2 = [1,5,9];
            var adj3 = [7,8,9];
            return [adj1,adj2,adj3];

        default:
            alert("wrong value passed");
            break;
    }
} // return the win chances when a value is entered

function placePlayer(prePlayer){
    var currentPlayer
    if(prePlayer == "o"){
        currentPlayer = "x";
    }
    else{
        currentPlayer = "o";
    }
    return currentPlayer;
} // returns what to place