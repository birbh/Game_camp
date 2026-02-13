# Endless Dodger

I built a endless game playable in browser where users dodge the objects and earn scores as my first project as beginner..

## About the Game

Endless Dodger is a browser based game built with vanilla HTML5, CSS3, and JS. Control your rocket, dodge incoming blocks, and reach the highest score possible. The game gets progressively harder as you play.

## Features

 **Smooth Controls** —: Use arrow keys or A/D to move left and right
 **Progressive Difficulty** —: Obstacles spawn faster and move quicker as your score increases
 **Score Tracking** —: Keep track of your current score and best one
 **Rocket Player** —: Custom SVG rocket with circular collision 
 **Animated Background** —: Falling stars environment

## How to Play

1. Click "Start Game" on the home screen
2. Use **Arrow Keys** or **A/D** to move your rocket left and right
3. Avoid the orange falling blocks
4. Each block you dodge adds 1 to your score
5. The game ends when you hit the block
6. Click "Restart Game" to play again 


## File Structure

```
Game_camp/
├── index.html          
├── about.html         
├── style.css          
├── main.js            
├── rocket_icon.svg     
└── README.md           
```


## For playing ::

1. 

## Game Workflow

### Collision Detection
The game uses circular collision detection based on the rocket's radius and obstacle size. 

### Difficulty Scaling
- **Obstacle Speed** and  **Spawn Rate**  increases gradually with your score
- Game has a max speed limit so it doesn't become impossible

### Scoring
- 1 Point for each obstacle that safely passes below your rocket
- Best Score is tracked during play

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge)




The code is simple and easy to modify. Feel free to tweak colors, speeds, and difficulty settings and enjoy the game.



**Built with 💙 and JavaScript**