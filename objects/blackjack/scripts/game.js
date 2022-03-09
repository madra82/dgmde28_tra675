//Create PlayingCard Object + SingleDeck Array

function PlayingCard(suit,value){
        
    this.suit = suit;
    this.position = position;
    
}

function buildDeck() {

    var singleDeck = []

    for (suit = 0; suit <= 3; suit++) {
        for (position = 0; position <= 12; position++) {
          singleDeck.push(new PlayingCard(suit, position));
        }
    }
    return singleDeck;
}


document.addEventListener("DOMContentLoaded",

    function gameOn() {


// Definitions

var deck1 = buildDeck();
var deck2 = buildDeck();
var deck3 = buildDeck();
var deck4 = buildDeck();
var deck5 = buildDeck();
var deck6 = buildDeck();

var bigDeck = deck1.concat(deck2, deck3, deck4, deck5, deck6);

wallet = document.getElementById("walletHolder");
bet = document.getElementById("betHolder");
walletTotal = 500;
betTotal = 0;

gameStuffs = document.querySelectorAll(".gameOn");

var playedCards = [];
var pTotal = 0;
var dTotal = 0;
var dealerCards = [];
var playerCards = [];

var alertBox = document.getElementById("alertBox");
var cardHolders = document.querySelectorAll(".cardHolders");

var stickBtn = document.getElementById("stop");
var twistBtn = document.getElementById("go");



//Initiating Functions

        updateWallet();
        playGame();



//Used multiple times to update winnings

    function updateWallet(){

        wallet.innerHTML="$"+walletTotal;
        bet.innerHTML = "$"+betTotal;
    };



//Used only once to active playBtn

    function playGame() {

        button = document.getElementById("playBtn");
        button.addEventListener("click",placeBet,{once:true})
    }



//Ask for Bet Amount, Update Wallet + Deal 1st 4 cards

    function placeBet() {

        betAmount = Math.min(parseInt(prompt("Please place your bet:","")),walletTotal);

        walletTotal -= betAmount;
        betTotal += betAmount;

        updateWallet();
        dealCards();
    }


    function dealCards(){

        gameStuffs.forEach(function(gameStuff){
        gameStuff.classList.remove("collapsed")
        });

        dealPlayerCard();
        dealDealerCard();
        setTimeout(dealSecond,1000);

    };


    function dealSecond(){

        dealPlayerCard();
        dealHiddenDealerCard();
        setTimeout(checkCards,1000);

    };



//Deal PlayerCard - used twice initially + on twist

    function dealPlayerCard() {

        let pCard = dealCard();
        let container = document.getElementById("playerCardsHolder");

        container.appendChild(pCard);

        pTotal += parseInt(pCard.children[0].textContent);
        playerCards.push(parseInt(pCard.children[0].textContent));
    };



//Deal DealerCard - used once initially + on stick

    function dealDealerCard() {

        let dCard = dealCard();
        let container = document.getElementById("dealerCardsHolder");
    
        container.appendChild(dCard);

        dTotal += parseInt(dCard.children[0].textContent);
        dealerCards.push(parseInt(dCard.children[0].textContent));
    };



//Deal hiddenDealerCard

    function dealHiddenDealerCard() {

        let dCardHidden = dealCard();
        let container = document.getElementById("dealerCardsHolder");

        dCardHidden.classList.add("hidden");
        dCardHidden.classList.add("hiddenDCard");
        
        container.appendChild(dCardHidden);
    
        dTotal += parseInt(dCardHidden.children[0].textContent);   
        dealerCards.push(parseInt(dCardHidden.children[0].textContent));
    };



//Create Card to be dealt by either player or dealer           
            
    function dealCard() {

        var dealtCardPosition = Math.floor(Math.random() * bigDeck.length);
        var dealtCard = bigDeck[dealtCardPosition];

        bigDeck.splice(dealtCard,1);
        playedCards.push(dealtCard);

        icons = ["images/jean_victor_balin_card_carreau.svg","images/jean_victor_balin_card_coeur.svg","images/jean_victor_balin_card_pique.svg","images/jean_victor_balin_card_trefle.svg"]

        card = ["Ace",2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack","Queen","King"]

        cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10]
                
        let deal = document.createTextNode(card[dealtCard.position]);
        let value = document.createTextNode(cardValue[dealtCard.position]);

        let div = document.createElement("div");
        let p = document.createElement("p");
        let img = document.createElement("img");
    
        p.setAttribute("class","collapsed")
        div.setAttribute("class","cardHolder")
        img.setAttribute("src",icons[dealtCard.suit])

        p.appendChild(value);
        div.appendChild(p);
        div.appendChild(deal);
        div.appendChild(img);

                return div;
    };


    function checkCards(){

        checkInitialDeal();
  
    };



//Assumes Ace = 11 and checks for Natural BJ

    function checkInitialDeal() {

        if (pTotal == 21 && dealerCards[0] <10)

        playerWin()

        else 

        if (pTotal == 21 && (dealerCards[0] >=10))

        {setTimeout (checkDealerMsg, 1000);}

        else

        if (dealWithPlayerAce() > 21)

        playerLoses()

        else
        
        playOn()

    };
    


//Activative Stick or Twist Buttons

    function playOn(){

        twistBtn.addEventListener("click",playerTwist);
        stickBtn.addEventListener("click",playerStick);

    };


    function playerTwist(){

            dealPlayerCard();
            dealWithPlayerAce();
            setTimeout(checkResult),1000;

    };


    function playerStick(){

        stopButtons();

        alertBox.classList.remove("collapsed")
        alertBox.innerHTML = "Ok, you want to stand.  Ready to see the dealer's card?<br/><div class='btnWrapper'><button class='alertBoxBtn showDealer'>Show Dealer's Card</button>"

        showDealerCard();

    };



//Deal with Ace

    function dealWithPlayerAce(){

        for (var i = 0; i < playerCards.length; i++) {
            if (playerCards[i]==11) 
            while (pTotal > 21) {
            pTotal -= 10
            }
        }

        return pTotal;
    }


    function dealWithDealerAce(){

        for (var i = 0; i < dealerCards.length; i++) {
            if (dealerCards[i]==11) 
            while (dTotal > 21) {
                dTotal -= 10
                }
        }

        return dTotal;
    }



//Check PlayerBust or 21

    function checkResult(){

        if (pTotal > 21)

            setTimeout(playerLoses,1000);
        
        else if (pTotal == 21)

            setTimeout(checkDealerMsg,1000);
    };



//Show & Check Dealer's Card on Natural BJ or Stick

    function checkDealerMsg() {

        alertBox.classList.remove("collapsed")
        alertBox.innerHTML = "Blackjack!  Let's see if the dealer can match you.<br/><div class='btnWrapper'><button class='alertBoxBtn showDealer'>Show Dealer's Card</button>"

        showDealerCard();

    };


    function showDealerCard() {

        var hiddenDCard = document.querySelectorAll(".hiddenDCard");
        var showDealerBtn = document.querySelectorAll(".showDealer");
    
        showDealerBtn.forEach(function(dealerBtn){
            dealerBtn.addEventListener("click", function(){

            alertBox.classList.add("collapsed");
                
            hiddenDCard.forEach(function(DC){
                DC.classList.remove("hidden")
                });
        
                setTimeout(checkDealerCard, 1000);
        
            },{once:true});

        })
    };


    function checkDealerCard() {

    //If Natural BJ, immediate Win or Draw and Avoid Further Deals

        if (
            (playerCards.length == 2 && pTotal == 21 && (dTotal > 21 || dTotal < 21))
        )
                playerWin()

        else if (
            (playerCards.length == 2 && pTotal == 21 && dTotal == 21)
        )
                draw()

    //If not Natural BJ, keep dealing until > 17.

       else if (
            dTotal <= 16
        )
                setTimeout(dealAgain);

    //Once Dealer > 17, check for possible Wins.

       else if (
            (dTotal > 21) || 

            (pTotal <=21 && dTotal >= 17 & dTotal <= 21 && pTotal > dTotal)
        )
                    playerWin()
                  
        else if (
            dTotal >= 17 && dTotal > pTotal
        )
                    playerLoses();

        else
                    draw();
    };

        
    function dealAgain() {

        dealDealerCard();
        dealWithDealerAce();
        setTimeout(checkDealerCard,1000);

    }



//Draw Msg

    function draw() {

        stopButtons();

        alertBox.classList.remove("collapsed")

        alertBox.innerHTML = "Sorry, we have a draw!<br/><div class='btnWrapper'><button class='alertBoxBtn restartBtn'>Restart?</button><button class='alertBoxBtn rollBtn'>Roll Over Wallet?</button></div>"

        walletTotal += betTotal
        betTotal -= betTotal

        updateWallet();
        rollOrStart();

    };



//PlayerLoses Msg

    function playerLoses() {

        stopButtons();

        alertBox.classList.remove("collapsed")

        alertBox.innerHTML = "Sorry, you Lose!<br/><div class='btnWrapper'><button class='alertBoxBtn restartBtn'>Restart?</button><button class='alertBoxBtn rollBtn'>Roll Over Wallet?</button></div>"

        betTotal -= betTotal
    
        updateWallet();
        rollOrStart();7
    };

    

//Player Wins Msg

    function playerWin() {

        stopButtons();

        alertBox.classList.remove("collapsed")

        alertBox.innerHTML = "You win!<br/><div class='btnWrapper'><button class='alertBoxBtn restartBtn'>Restart?</button><button class='alertBoxBtn rollBtn'>Roll Over Wallet?</button></div>"

        if (playerCards.length == 2 && pTotal == 21)
        
        walletTotal += 3*betTotal

        else

        walletTotal += 2*betTotal

        betTotal -= betTotal
    
        updateWallet();
        rollOrStart();

    };


//Kill Stick / Twist Buttons

    function stopButtons() {
        twistBtn.removeEventListener("click",playerTwist);
        stickBtn.removeEventListener("click",playerStick);
    };



//Active Restart / Roll Buttons

    function rollOrStart() {

        let restartBtn = document.querySelectorAll(".restartBtn");
        let rollBtn = document.querySelectorAll(".rollBtn");

        restartBtn.forEach(function(btn1){
            btn1.addEventListener("click",function(){
                location.reload();
                alertBox.classList.add("collapsed");
            });
        });

        rollBtn.forEach(function(btn2){
            btn2.addEventListener("click",function(){

            rollOver();
            setTimeout(placeBet,500);
            });
        });

        function rollOver() {
        
            cardHolders.forEach(function(holder){
            holder.innerHTML="";
                });
    
            bigDeck.push(...playedCards);
            playedCards = [];
            dealerCards = [];
            playerCards = [];
            pTotal = 0;
            dTotal = 0;
    
            gameStuffs.forEach(function(gameStuff){
                gameStuff.classList.add("collapsed")
                });
    
            alertBox.classList.add("collapsed");
        };
    }
       
});