document.addEventListener("DOMContentLoaded", function() {

// Ship class
class Ship {
    constructor(name, hull, firepower, accuracy) {
      this.name = name;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
  
    attack(target) {
      outputText(`${this.name} attacks ${target.name}!`);
  
      if (Math.random() < this.accuracy) {
        const damage = this.firepower;
        target.hull -= damage;
        outputText(`Direct hit! ${target.name} takes ${damage} damage.`);
      } else {
        outputText(`${this.name} missed the attack!`);
      }
    }
  }
  
  // HumanShip subclass
  class HumanShip extends Ship {
    constructor() {
      super("USS Assembly", 20, 5, 0.7);
    }
  }
  
  // AlienShip subclass
  class AlienShip extends Ship {
    constructor() {
      super("Alien Ship", getRandomValue(3, 6), getRandomValue(2, 4), getRandomValue(0.6, 0.8));
    }
  }
  
  // Function to generate random values within a range
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Game object
  const game = {
    playerShip: null,
    alienShips: [],
  
    start() {
      outputText("Welcome to the Battle!");
  
      this.playerShip = new HumanShip();
  
      for (let i = 0; i < 6; i++) {
        const alienShip = new AlienShip();
        this.alienShips.push(alienShip);
      }
  
      this.updateText();
    },
  
    updateText() {
      outputText("What would you like to do?");
      enableButtons();
    },
  
    attack() {
      disableButtons();
  
      const currentAlienShip = this.alienShips[0];


      
  
      // Player attacks the current alien ship
      this.playerShip.attack(currentAlienShip);
  
      // Check if the current alien ship is destroyed
      if (currentAlienShip.hull <= 0) {
        outputText(`You destroyed ${currentAlienShip.name}!`);
        // Remove the destroyed alien ship from the array
        this.alienShips.shift();
      } else {
        // Alien ship counterattacks if it's not destroyed
        currentAlienShip.attack(this.playerShip);
  
        // Check if the player ship is destroyed
        if (this.playerShip.hull <= 0) {
          outputText(`Game over! ${this.playerShip.name} was destroyed.`);
          disableButtons();
          return; // End the game
        }
      }
  
      this.checkWin();
    },
  
    retreat() {
      disableButtons();
      outputText("You chose to retreat. Game over!");
    },
  
    checkWin() {
      if (this.playerShip.hull > 0 && this.alienShips.length === 0) {
        outputText("Congratulations! You destroyed all the alien ships!");
        disableButtons();
      } else if (this.playerShip.hull <= 0) {
        outputText("Game over! The alien ships destroyed your ship.");
        disableButtons();
      } else {
        this.updateText();
      }
    }
  };
  
  // Helper function to output text to the screen
  function outputText(text) {
    window.alert(text);
  }
  
  // Enable buttons
  function enableButtons() {
    document.getElementById("attackButton").disabled = false;
    document.getElementById("retreatButton").disabled = false;
  }
  
  // Disable buttons
  function disableButtons() {
    document.getElementById("attackButton").disabled = true;
    document.getElementById("retreatButton").disabled = true;
  }
  
  // Button event listeners
  document.getElementById("attackButton").addEventListener("click", () => {
    game.attack();
  });
  
  document.getElementById("retreatButton").addEventListener("click", () => {
    game.retreat();
  });
  
  // Start the game
  game.start();
});  