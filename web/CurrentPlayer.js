
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrentPlayer = function (_React$Component) {
    _inherits(CurrentPlayer, _React$Component);

    function CurrentPlayer(props) {
        _classCallCheck(this, CurrentPlayer);

        return _possibleConstructorReturn(this, (CurrentPlayer.__proto__ || Object.getPrototypeOf(CurrentPlayer)).call(this, props));
    }

    _createClass(CurrentPlayer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'player-stats white' },
                    ' '
                )
            );
        }
    }]);

    return CurrentPlayer;
}(React.Component);

var domContainer = document.querySelector('#react-goes-here');
ReactDOM.render(React.createElement(CurrentPlayer, null), domContainer);

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