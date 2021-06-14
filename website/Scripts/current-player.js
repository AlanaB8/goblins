//turn this into excellent reactyness

 //todo: array of player objects, with these properties
 const currentPlayer = 1;
 const gameTime = " ?";
 const numFriends = "?";
 // for navigating between player objects
 const stats = document.querySelector(".player-stats");
 const sendButton = document.querySelector(".send");
 const input = document.querySelector("input");

 function sendMessage() {
     console.log(input.value);
 }

 sendButton.addEventListener('click', () => (console.log(input.value)));
 stats.innerHTML = `Goblin Operative ${currentPlayer}: ${numFriends} friends acquired, ${gameTime} seconds elapsed`;



 /*
 <!-- <div class="game-info">

 <div class="player-stats white"></div>
</div>
<div class="message">
 <label for="name">Send message to operative:</label>
 <input type="text"> </input>
 <button class="send">Send</button>
</div> -->*/