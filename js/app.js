//Enemy Class
class Enemy {
    //Enemy Constructor
    //x, y, and speed properties are randomized using this randomizer method
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.randomizer();
    }

    //update method
    update(dt){
        //increments the x-movement by the enemy's speed times dt
        this.x += this.speed * dt;
        
        //if enemy moves fully across the screen, reset it's attributes randomly
        if(this.x > 606){
            this.randomizer();
        }

        //if the enemy collides with the player, set the player's coordinates to the initial coordinates
        if(collide(player, this)){
            winLoseMessage(false);
            player.x = 200;
            player.y = 380;
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //randomizes the enemy's attributes
    randomizer(){
        //only 3 sets of Y coordinates the enemy is allowed on
        const setYs = [214, 131, 48];

        //have the enemy start off screen
        this.x = -101

        //randomize which y coordinate it starts from
        this.y = setYs[Math.floor(Math.random() * setYs.length)];

        //randomize the speed of the enemy from 50 - 300;
        this.speed = Math.random() * (300 - 50) + 50;
    }

}

//Player class
class Player {
    //have player's set coordinates to (200, 380) 
    constructor(){
        this.x = 200;
        this.y = 380;
        this.sprite = 'images/char-boy.png';
    }

    //update function (i really dont know what to do with this, the game runs fine without it)
    update(){
        this.x = this.x;
        this.y = this.y;
    }


    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handle input function takes an input string provided by the event listener
    handleInput(input){
        //use a switch to handle the player's coordinates according to the input.
        //if the coordinate is out of bounds, then keep adding the amount back to the coordinate
        //so the player doesn't move.
        switch(input){
            case 'left':
                this.x -= 101;
                if(this.x === -103)
                    this.x += 101;
                break;
            case 'right':
                this.x += 101;
                if(this.x === 503)
                    this.x -= 101;
                break;
            case 'up':
                this.y -= 83;
                //if the y coordinate is at -35, the player reaches the water and wins the game.
                //set the coordinates back to the original coordinates
                if(this.y === -35){
                    winLoseMessage(true);
                    this.x = 200;
                    this.y = 380;
                }
                break;
            case 'down':
                this.y += 83;
                if(this.y === 463)
                    this.y -= 83;
                break;
        }
    }
}

//instantiate objects with the recommended names
const allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
const player = new Player();

//collide function
//logic borrowed from http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/#d-collision-detection
function collide(player, enemy){
    if(player.x < enemy.x + 65 && player.x + 65 > enemy.x &&
        player.y < enemy.y + 50 && player.y + 50 > enemy.y){
        return true;
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Send a quick message to the player when he/she wins or gets hit
function winLoseMessage(win){
    //create an h1
    const h1 = document.createElement('h1');
    //if you win, send a message in green
    //if you lose, send a message in red
    if(win){
        h1.textContent = 'Congrats you win!';
        h1.style.color = '#00FF7F';
    } else {

        h1.textContent = 'Ouch! Try Again.';
        h1.style.color = '#ee1111';
    }

    //append the h1 to the body
    document.body.appendChild(h1);

    //remove the h1 so the player can continue the game
    setTimeout(() =>document.querySelector('h1').remove(), 1000);   
}