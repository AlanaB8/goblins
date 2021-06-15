

'use strict';

const e = React.createElement;

class CurrentPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <div className="player-stats white"> </div>
            {/* <div class="message">
                <label for="name">Send message to operative:</label>
                <input type="text"> </input>
                <button class="send">Send</button>
            </div> */}
       </div>

    );
  }
}

const domContainer = document.querySelector('#react-goes-here');
ReactDOM.render(e(CurrentPlayer), domContainer);



/* prev JS
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



 /* Should look like this:
 <!-- <div class="game-info">

 <div class="player-stats white"></div>
</div>
<div class="message">
 <label for="name">Send message to operative:</label>
 <input type="text"> </input>
 <button class="send">Send</button>
</div> -->*/