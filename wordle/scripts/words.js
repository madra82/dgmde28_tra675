//Build the Grid - cell, row, grid

function Cell(r,c)
{
    this.guessCount = r;
    this.position = c;
    this.element = cellElement;
    this.id = this.element().id;
    this.correctPlace = correctPlace;
    this.inWord = inWord;
    this.notIncluded = notIncluded;
}


    function cellElement()
    {
        var cell = document.createElement("div");

        cell.setAttribute("class","cells");
        cell.setAttribute("id",this.guessCount+""+this.position);

        return cell;
    }

    //Deal with Color Coding Cells based on answer

    function correctPlace()
    {
        var target = document.getElementById(this.id)
        target.classList.add("correct")
    }


    function inWord()
    {
        var target = document.getElementById(this.id)
        target.classList.add("partial")
    }


    function notIncluded()
    {
        var target = document.getElementById(this.id)
        target.classList.add("wrong")
    }


    
function Row(n)
{
    this.number = n;
    this.cells = [];
    this.addCells = addCells;
    this.element = rowElement;
    this.getGuess = getGuess;
    this.addLetter = addLetter;
    this.deleteLetter = deleteLetter;
    this.checkLetters = checkLetters;
    this.checkGuess = checkGuess; 
    this.checkWinOrLoss = checkWinOrLoss;
    this.clearRow = clearRow;
}

    function addCells()
    {
        for (let i=0;i<=4;i++)
        this.cells.push(new Cell(this.number,i))
    }

    function rowElement()
    {
        var row = document.createElement("li");

        row.setAttribute("class","rows")
        row.setAttribute("id","row"+this.number)

        return row;
    }

    // Deal with letters and guesses as methods of Row

    var rowNumber = 0;
    var letter = 0;
    var elimLetters = new Set();


    function addLetter(key)
    {
        var expBox = document.getElementById("explainText")
        
        expBox.innerHTML = ""

        if (letter > 4)
        {
            checkWord()
        }
        else 
        {
            var currentLetter = this.cells[letter];
            var box = document.getElementById(currentLetter.id);
            box.textContent = key;
            letter += 1;
        }
    }

    
    function deleteLetter()
    {
        if (letter <= 5 && letter > 0)
        {
            var lastLetter = this.cells[letter-1];
            var lastBox = document.getElementById(lastLetter.id);

            lastBox.textContent = "";
            letter -= 1;
        }
    }


    function checkLetters()
    {
        var msgBox = document.getElementById("msgBox")
        var msg = document.getElementById("msgText")

        if (letter <= 4)
        {
            msg.innerHTML = "You have not entered a five letter word.  Please try again.";
            msgBox.classList.remove("hide");
        }
        else
        {
            checkWord();
        }
    }


    function getGuess()
    {
        var guessStr = "";

        for (i in this.cells)
        {var box = document.getElementById(this.cells[i].id);
        guessStr += box.textContent};

        return guessStr
    }


    function clearRow()
    {
        var msgBox = document.getElementById("msgBox");
        var msg = document.getElementById("msgText");
        
        msg.innerHTML = "The dictionary cannot find your word. Please try again."; 
        msgBox.classList.remove("hide");
        
        for (i in this.cells)
        {var box = document.getElementById(this.cells[i].id)
        box.textContent = ""};
        letter = 0;
    }


    function checkGuess()
    {
        var guessStr = this.getGuess().toUpperCase();
        var guess = guessStr.split("")

        var ans = document.getElementById("answer").textContent.toUpperCase();
        var char = ans.split("");

        var elimLetterHolder = document.getElementById("elimLetterHolder");
        var eliminated = document.getElementById("eliminated");
        var explain = document.getElementById("explainText");
        var expBox = document.getElementById("explainGuess")

        eliminated.classList.remove("hide");
        expBox.classList.remove("hide");
        
	console.log(char);
	console.log(guess);

        for (i in guess)
        {
            ansCount = char.reduce((count,n) => n == guess[i] ? count + 1 : count, 0)
            guessCount = guess.reduce((count,x) => x == guess[i] ? count + 1 : count, 0)

            if (guess[i] == char[i]) 
            {
                this.cells[i].correctPlace();

                explain.innerHTML += "the <span class='letters'> "+(guess[i])+"</span> is in the right place<br>"
		
		goodKey = document.getElementById(guess[i]);
                goodKey.classList.add("good");
		goodKey.classList.remove("maybe");

                char[i] = "0";
                guess[i] = "0";
            }
            else if (!char.includes(guess[i]) && guess[i] != 0)
            {
                this.cells[i].notIncluded();
                elimLetters.add(guess[i]);
		    
		badKey1 = document.getElementById(guess[i]);
                badKey1.classList.add("blackout");

                explain.innerHTML += "the <span class='letters'> "+(guess[i])+"</span> is not in the word<br>"
            }
            else if (guess[i] != 0 && guessCount > ansCount) 
            {
                this.cells[i].notIncluded();
		elimLetters.add(guess[i]);

                badKey2 = document.getElementById(guess[i]);
                badKey2.classList.add("blackout");

                explain.innerHTML += "the <span class='letters'> "+(guess[i])+"</span> is not in the word<br>"

                guess[i]="0";
            }
            else if (guess[i] != 0)
            {
                this.cells[i].inWord();
		    
		maybeKey = document.getElementById(guess[i]);
                maybeKey.classList.add("maybe");

                explain.innerHTML += "the <span class='letters'> "+(guess[i])+"</span> is in the wrong place<br>"
            }
            }
        
        this.checkWinOrLoss();

        elimLetterHolder.textContent = "";
        
        elimArray = Array.from(elimLetters).sort();
        
        for (i in elimArray)
        {elimLetterHolder.textContent += elimArray[i]+"   "};
    }


    var wins = localStorage.getItem('wins');
    winArr = wins ? wins.split(',') : [];
    var losses = localStorage.getItem('losses');
    lossArr = losses ? losses.split(',') : [];
    var rows = localStorage.getItem('rows');
    rowArr = rows ? rows.split(',') : [];

    function checkWinOrLoss()
    {
        var win = true;
        kbKeys = document.querySelectorAll(".keys")

        for (i in this.cells)
        {
            cell = document.getElementById(this.cells[i].id)
            if (!cell.classList.contains("correct"))
            {
                win = false;
                break;
            }
        }

        if (win == true)
        {
            document.removeEventListener("keyup",trackKeys);
            kbKeys.forEach(function(kbKey){
                kbKey.removeEventListener("click", trackBtns)
            })
            winArr.push('win');
            rowArr.push(this.number);
            localStorage.setItem('wins',winArr.toString());
            localStorage.setItem('rows',rowArr.toString());
            setTimeout(gameOverMessage,1000);
        }

        else if (rowNumber == 5)
        {
            document.removeEventListener("keyup",trackKeys);
            kbKeys.forEach(function(kbKey){
                kbKey.removeEventListener("click", trackBtns)
            })
            lossArr.push('loss');
            localStorage.setItem('losses',lossArr.toString());
            setTimeout(gameOverMessage,1000);
        }

        rowNumber += 1;
        letter = 0;  

        function gameOverMessage()
        {

            var msgBox = document.getElementById("msgBox");
            var msg = document.getElementById("msgText");
            var closeBtn = document.getElementById("close");
            var playAgain = document.getElementById("playAgain")

            var percentWin = ((winArr.length/(winArr.length+lossArr.length))*100.0).toFixed(2);
	    var wins = winArr.length;
            var losses = lossArr.length;
            var games = winArr.length+lossArr.length;
    
            var statMsg = "<br>You have played "+games+" times.  You have had "+wins+" wins and "+losses+" for a win rate of "+percentWin+"%.<ul>Number of Guesses:</ul>"

            msgBox.classList.remove("hide");
            msg.innerHTML = "";
            closeBtn.focus();
            playAgain.classList.remove("hide");

            //Animate

            let text = "You"+"\xa0"+"Win!";
            text = text.split("");
            const textCode=text.map((x,idx) => {
                let delay=(idx + 1) * 20;
                return `<span style="animation-delay:${delay}ms">${x}</span>`;
            })

            if (win == true)
            {
                msg.innerHTML = "<h2 id = 'winMsg'>"+textCode.join("")+"</h2>"+statMsg;
            }
            else    
            {
                msg.innerHTML += "<h3>You Lose!</h3>"+statMsg;
            }

            var total = {};
            rowArr.forEach((i) => {
                total[i] = (total[i] || 0) + 1;
            });

            for (i in gameBox.rows) 
            {
                if (total[i]>0)
                {count = total[i]}
                else
                {count = 0}
                guesses = parseInt(i)+1
                msg.innerHTML += "<li>"+guesses+" - "+count+" game(s)</li>"
            }
        }
    }



function GameBox()
{
    this.rows = [];
    this.addRow = addRow;
    this.element = gridElement;
    this.currentRow = currentRow; 
}

    function addRow()
    {
        for (let i=0; i<=5; i++)
        this.rows.push(new Row(i))

        for (i in this.rows)
        this.rows[i].addCells();
    }

    function gridElement()
    {
        var grid = document.createElement("ul");
    
        for (i in this.rows)
        {
            var line = this.rows[i].element()
       
            for (y in this.rows[i].cells)
            {
            line.appendChild(this.rows[i].cells[y].element())
            }

            grid.appendChild(line);
        }
   
        return grid;
    }

    function currentRow()
    {
        var currentRow = this.rows[rowNumber];
        return currentRow
    }



//Build Keyboard

function Key(value)
{
    this.value = value;
    this.element = keyElement;
    this.id = this.element().id;
}

    function keyElement()
    {
        var t = document.createTextNode(this.value);
        var k = document.createElement("button");
        
        k.setAttribute("class","keys");
        k.setAttribute("id",this.value);

        k.appendChild(t);

        return k;
    }

function Keyboard(keys)
{
    this.keys = keys;
    this.element = boardElement;
}


    function boardElement(){
        
        var board = document.createElement("div")

        var line = 10;
        var keyGroups = [];

        for (var i=0; i < this.keys.length; i+=line) 
        {
            keyGroups.push(this.keys.slice(i,i+line));
        }


        for (i in keyGroups)
        {
            var holder = document.createElement("div");

            for (y in keyGroups[i])
            {
                key = keyGroups[i][y].element();
                holder.appendChild(key);
            }

            board.appendChild(holder);
        }
        
        return board;

    }

//Create Game

var gameBox = new GameBox();
gameBox.addRow();
var game = gameBox.element();
getWord();

var kbObj = new Keyboard
([
    new Key("Q"),
    new Key("W"),
    new Key("E"),
    new Key("R"),
    new Key("T"),
    new Key("Y"),
    new Key("U"),
    new Key("I"),
    new Key("O"),
    new Key("P"),
    new Key("A"),
    new Key("S"),
    new Key("D"),
    new Key("F"),
    new Key("G"),
    new Key("H"),
    new Key("J"),
    new Key("K"),
    new Key("L"),
    new Key ("Backspace"),
    new Key("Z"),
    new Key("X"),
    new Key("C"),
    new Key("V"),
    new Key("B"),
    new Key("N"),
    new Key("M"),
    new Key("Enter")
])
var keyBoard = kbObj.element();


//Add GameGrid to page + Add Event Listeners

document.addEventListener("DOMContentLoaded",function(){

    createGame();
    addListeners();
})


function createGame()
{
    var gameContainer = document.getElementById("gameContainer")
    var kbHolder = document.getElementById("onScreenKB")

    gameContainer.appendChild(game);
    kbHolder.appendChild(keyBoard);
}


function addListeners()
{
    //Debug
    debugBtn = document.getElementById("debug");
    debugMsg = document.getElementById("debugMsg");
    debugYes = document.getElementById("debugYes");
    debugNo = document.getElementById("debugNo");
    answer = document.getElementById("answerBox");

    debugBtn.addEventListener("click",function()
    {
        debugMsg.classList.toggle("hide");
    })

    debugYes.addEventListener("click",function()
    {  
        debugMsg.classList.add("hide");
        answer.classList.remove("hide");
    })

    debugNo.addEventListener("click",function()
    {  
        debugMsg.classList.add("hide");
    })

    answer.addEventListener("click",function()
    {
        answer.classList.add("hide");
    })


    //Rules
    rules = document.getElementById("rules")
    title = document.getElementById("rulesTitle")

    title.addEventListener("click",function()
    {
        rules.classList.remove("hide");
        title.classList.add("hide");
    })

    rules.addEventListener("click",function()
    {
        rules.classList.add("hide");
        title.classList.remove("hide");
    })


    //Play Again
    play = document.getElementById("playAgain");

    play.addEventListener("click",function()
    {
        rowNumber = 0;
        letter = 0;
        clearBoard();
        getWord();
        play.classList.add("hide");
    })

    function clearBoard(){

        var boxes = document.querySelectorAll(".cells")
        var elimLetterHolder = document.getElementById("elimLetterHolder");
        var eliminated = document.getElementById("eliminated");
        var expBox = document.getElementById("explainGuess")
        var explain = document.getElementById("explainText");
        var ans = document.getElementById("answer");
        var msgBox = document.getElementById("msgBox");
        var kbKeys = document.querySelectorAll(".keys")

	boxes.forEach(function(box){
            box.textContent="";
            box.classList.remove("correct");
            box.classList.remove("partial");
            box.classList.remove("wrong");
        })
	
	kbKeys.forEach(function(kbKey){
	    kbKey.classList.remove("blackout");
	    kbKey.classList.remove("good");
	    kbKey.classList.remove("maybe");
	})

        elimLetters.clear()
        elimLetterHolder.textContent = "";
        eliminated.classList.add("hide");

        explain.innerHTML = "";
        expBox.classList.add("hide");

        ans.innerHTML = "";
        msgBox.classList.add("hide");

        document.addEventListener("keyup", trackKeys)
        kbKeys.forEach(function(kbKey){
            kbKey.addEventListener("click", trackBtns)
        })
    }


    //MsgBox

    var msgBox = document.getElementById("msgBox");
    var closeBtn = document.getElementById("close");

    closeBtn.addEventListener("click",function()
    {
        msgBox.classList.add("hide");
    })

    
    //Track Keys
    var kbKeys = document.querySelectorAll(".keys")

    kbKeys.forEach(function(kbKey){
        kbKey.addEventListener("click", trackBtns)
    })

    document.addEventListener("keyup", trackKeys)
}
    
function trackKeys(k)
{
    var regex = /[a-zA-Z]/g;
    var msgBox = document.getElementById("msgBox");

    var key
    key = k.key || k.id;

    var ok = key.match(regex);

    if (key == "Enter" && !msgBox.classList.contains("hide"))
    {
        msgBox.classList.add("hide");
    }

    else if (key == "Enter" && msgBox.classList.contains("hide"))
    {
        gameBox.currentRow().checkLetters();
    }
    
    else if (key == "Backspace")
    {
        gameBox.currentRow().deleteLetter()
    }
        
    else if (!ok || ok.length > 1) 
    {
        return
    } 

    else 
    {
        gameBox.currentRow().addLetter(key)
    }
}


function trackBtns()
{
    var msgBox = document.getElementById("msgBox");

    var key = this.id

    if (key == "Enter" && !msgBox.classList.contains("hide"))
    {
        msgBox.classList.add("hide");
    }

    else if (key == "Enter" && msgBox.classList.contains("hide"))
    {
        gameBox.currentRow().checkLetters();
    }
    
    else if (key == "Backspace")
    {
        gameBox.currentRow().deleteLetter()
    }

    else 
    {
        gameBox.currentRow().addLetter(key)
    }
}



//Generate Random Word as Answer
function getWord() 
{
    const options = 
    {
        method: 'GET',
        headers:
        {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': 'e36194ec00mshd7ed9f328f75d4ep1bca20jsnaccf85e9e284'
        }
    };

    fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&hasDetails=definitions&frequencyMin=4&?letterPattern=^[a-z]*$/', options)
    .then(response => response.json())
    .then(response => {document.getElementById("answer").innerHTML = response.word})
    .catch(err => console.error(err));
}


//Check Whether Guess is Real Word

function checkWord()
{
    const options = 
    {
        method: 'GET',
        headers:
        {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': 'e36194ec00mshd7ed9f328f75d4ep1bca20jsnaccf85e9e284'
        }
    };

    var toCheck = gameBox.currentRow().getGuess()

    fetch('https://wordsapiv1.p.rapidapi.com/words/'+toCheck,options)
	.then(response => response.json())
	.then(response => 
        {console.log(response); 
            if ('word' in response) 
            {
                gameBox.currentRow().checkGuess()
            } 
            else if ('success' in response) 
            {
                gameBox.currentRow().clearRow()
            }
        }
        )
	.catch(err => console.error(err));
}
