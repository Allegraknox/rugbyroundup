# Rugby Roundup

#play the game here!
https://www.cs.colgate.edu/~efourquet/cosc435/gallery/2019/RugbyRoundUp/index.html

# Game Overview

We developed Rugby Roundup for our final project in the Introduction to Computer Graphics (COSC 435) course taught by Elodie Fourquet at Colgate University.

The game is centered around a rugby player whose goal is to catch all the falling balls while ensuring that no child is hit by a ball. The game is 3D.The player is controlled by the user using key arrows to move forward, back, left, and right. The player can choose a character by clicking an image, and can pause the game by pressing the spacebar.

# Modeling

The models in the game (human, ball, uprights, trees) were created in their own local environments. The human model is used both for the rugby player and for the children, looking different thanks to their scaling and texture palettes used. The uprights were modeled using symmetry, each “side” is simply copied and translated a few units, then connected by the central horizontal bar. The ball is simply a transformed sphere. The tree was created with a cylinder and a randomly generated cluster of cubes (each has a randomly mapped texture of red, orange or yellow leaves) to represent leaves.

# Animation

The character animation was the toughest aspect of the game’s animation. The keypress function starts the animateHero() function, however there was no way to stop the animation once it started. Because of this, if the player pressed the right arrow key twice, the character’s animation would execute twice as quickly as it should have. To fix this issue, we implemented a simplified version of a multithreaded program. We would count the number of key-presses, and only execute the animation for the first “thread” and ignore the other calls to continually speed up the character. The number of threads would be reset to 0 if the player decided to choose a different character mid-game.

Animating the children was also a bit complex; our original plan was to execute the same code the hero used to move, however the multi-threading style of code got in the way of that. Thus, the code for the children does not use threads, as they move on their own independently of any user input. The children have an extra animation that the Hero does not; when a child is hit with a ball, they fall over. This seemed like a simple task to create, however it posed a lot of issues with frame numbering. Since all the children use the same framenumber to calculate their arm and leg movements, if a child fell mid-stride, when they got back up their legs would start as if they were positioned at zero, while all the other children would run normally. We solved this issue by resetting the fallen child’s leg and arm positions to be what it was before they fell.

# Scene

The scene features a textured plane to represent the field, modeled uprights, and randomly generated trees. The scene is built within a sphere, similar to a Skybox, with a texture that is a photo of Oak Dr. made to replicate the view from the pitch, Academy Field. 

# Children’s Paths

Because the children are non-interactive with the user, they had to be treated a bit differently than the hero, or rugby player. We instantiated the children as moving objects upon creating the scene. Then, we gave them certain parameters of boolean arrays to turn on different functionalities: direction, animation, and orientation. Each child was treated separately and controlled using these parameters. We used an element of randomness to ensure that each child’s path was unique. The child then had some autonomy while moving throughout the scene. Collisions and pause features further controlled the child’s movement. 

# Collisions

Collisions between the players and the children, the players and the balls, and the balls and the children were computed using bounding boxes. 

# Built With

WebGL

Three.js

# Authors

Anna Hart

Allegra Knox

# Sources and References

http://www.bryanjones.us/article/basic-threejs-game-tutorial-part-5-collision-detection collision box
https://codepen.io/Yakudoo/pen/oXJYxy modeling reference 

Old student projects for css reference (scoreboard and menu screens)
https://www.cs.colgate.edu/~efourquet/cosc435/gallery/emrys-ski-hill/
https://www.cs.colgate.edu/~efourquet/cosc435/gallery/climb-the-hill/
JS Object references, level ideas, palette reference

https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
Ball pooling, object recycling

https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/


