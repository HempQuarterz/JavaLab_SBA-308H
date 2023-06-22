
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
    selectedAlienShip: null,

    start() {
      outputText("Let the Battle Begin!");

      this.playerShip = new HumanShip();

      for (let i = 0; i < 6; i++) {
        const alienShip = new AlienShip();
        this.alienShips.push(alienShip);
      }

      updateShipStatus();
      this.updateText();
    },

    updateText() {
      if (this.selectedAlienShip === null) {
      outputText(`Select a ship to attack`);
      } else {
        outputText(`You have selected ${this.selectedAlienShip.name}.`);
      }

      enableButtons();
    },

    attack() {
      disableButtons();

      if (this.selectedAlienShip === null) {
        outputText("Please select a ship to attack");
        return;
      }
  
  
      // Player ship attacks the current alien ship
      this.playerShip.attack(this.selectedAlienShip);
  
      // Check if the current alien ship is destroyed
      if (this.selectedAlienShip.hull <= 0) {
        outputText(`You destroyed ${this.selectedAlienShip.name}!`);
        // Remove the destroyed alien ship from the array
        const index = this.alienShips.indexOf(this.selectedAlienShip)
        this.alienShips.splice(index, 1);
        this.selectedAlienShip = null;
      } 
      
        // Alien ships attack if any are remaining
        if (this.alienShips.length > 0) {
          this.alienShipsAttack();
        }
      
  
      // Update ship status
      
      updateShipStatus();
  
      // Check if the player ship is destroyed
      if (this.playerShip.hull <= 0) {
        outputText(`Game over! ${this.playerShip.name} was destroyed.`);
        disableButtons();
        return; // End the game
      }
  
      this.checkWin();
    },

    selectAlienShip(alienShip)  {
      this.selectedAlienShip = alienShip;
      updateShipStatus();
      this.updateText();
    },

    alienShipsAttack() {
      outputText("Enemy ships are attacking!");
    
      const aliveAlienShips = this.alienShips.filter(ship => ship.hull > 0);
      
      if (aliveAlienShips.length > 0) {
        const attackingAlienShip = aliveAlienShips[0];
        attackingAlienShip.attack(this.playerShip);
    
        // Check if the player ship is destroyed
        if (this.playerShip.hull <= 0) {
          outputText(`Game over! ${this.playerShip.name} was destroyed.`);
          disableButtons();
          return; // End the game
        }
      }
    },
    
    
  
    retreat() {
      disableButtons();
      outputText("You chose to retreat. Game over!");
    },
  
    checkWin() {
      if (this.alienShips.length <= 0) {
        outputText("Congratulations! You destroyed all the alien ships!");
        disableButtons();
      } else {
        this.updateText();
      }
    }
  };


  // Helper function to output text to the screen
  function outputText(text) {
    window.alert(text);

    const shipStatusElement = document.getElementById("shipStatus");
    shipStatusElement.innerHTML += "<p>" + text + "</p>";
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

  // Update ship status
  function updateShipStatus() {
    const shipStatusElement = document.getElementById("shipStatus");
    shipStatusElement.innerHTML = `
    <div>
      <p>${game.playerShip.name}</p>
      <img src="./Images/e2002de1-e791-4215-b354-cf1a9d92e9f2.jpg" alt="Player Ship" style="width: 100px; height: 100px;">
      <p>HP: ${game.playerShip.hull}</p>
      </div>
      <hr>
      <div>
      <p>Alien Ships:</p>
      ${game.alienShips.map((ship, index) => `
      <div class="alien-ships">
      <p>${index + 1}. ${ship.name}: HP - ${ship.hull}</p>
      <img src="./Images/ec2d7855-8987-4c16-a2b3-31823253abca.jpg" alt="Alien Ship"
      style="width: 100px; height: 100px;">
      <button class="select-button" onClick="selectAlienShip(${index})">Select</button>
      </div>
      `).join('')}
      </div>
    `;
  }



  // Button event listeners
  document.getElementById("attackButton").addEventListener("click", () => {
    game.attack();
  });

  document.getElementById("retreatButton").addEventListener("click", () => {
    game.retreat();
  });

  function selectAlienShip(index) {
    game.selectedAlienShip = game.alienShips[index];
    updateShipStatus();
    game.updateText();
  }

  // Start the game
  document.addEventListener("DOMContentLoaded", function() {
  game.start();
});
