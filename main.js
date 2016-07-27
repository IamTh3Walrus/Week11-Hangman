var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

game = {
    wordBank: ["Love Me Do", "From Me to You, She Loves You", "I Want to Hold Your Hand",
        "Can't Buy Me Love", "A Hard Day's Night", "I Feel Fine", "Eight Days a Week", "Ticket to Ride",
        "Help", "Yesterday", "Day Tripper", "We Can Work It Out", "Paperback Writer", "Yellow Submarine",
        "Eleanor Rigby", "Penny Lane", "All You Need Is Love",
        "Hello Goodbye", "Lady Madonna", "Hey Jude", "Get Back", "The Ballad of John and Yoko",
        "Something", "Come Together", "Let It Be", "The Long and Winding Road"
    ],
    wordsWon: 0,
    guessesRemaining: 10,
    currentWrd: null,
    startGame: function(wrd) {
        this.resetGuessesRemaining();

        this.currentWrd = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);

        this.currentWrd.getLets();

        this.keepPromptingUser();

    },
    resetGuessesRemaining: function() {
        this.guessRemaining = 10;
    },
    keepPromptingUser: function() {
        var self = this;

        prompt.get(['guessLetter'], function(err, result) {

            console.log('  The letter or space you guessed is: ' + result.guessLetter);


            var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);


            if (findHowManyOfUserGuess == 0) {
                console.log('Wrong Buddy!');
                self.guessesRemaining--;
            } else {
                console.log("That's correct!");


                if (self.currentWrd.didWeFindTheWord()) {
                    console.log('You Won!!!');
                    return;
                }
            }

            console.log('Guesses remaining: ', self.guessesRemaining);
            console.log(self.currentWrd.wordRender());
            console.log('here are the letters you guessed already: ');

            if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)) {
                self.keepPromptingUser();
            } else if (self.guessesRemaining == 0) {
                console.log('Game over bro it was ', self.currentWrd.word);
                console.log('Get with the program man');
            } else {
                console.log(self.currentWrd.wordRender());
            }
        });
    }


};

game.startGame();
