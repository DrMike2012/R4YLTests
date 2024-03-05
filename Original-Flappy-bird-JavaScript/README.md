# Run For Your Life Exercise Video Game
A scrolling background game using exercise tracking technology to make stationary exercise equipment more fun and effective.

TO DO
SPRITES
- get new sprite 
- animate sprite to simulate running motion
- change sprite appearance upon game successes and failures - perhaps grow or shrink or get stickers patches or holes

-- QUESTION - the sprite images are all contained on a png file.  how does the game select any particular image (i.e. pipes, bird, FG, BG) 

- SOUNDS
- get new sound for gameplay
- find sounds for game successes and failures

GAMEPLAY
- eliminate game ending upon collisions

SCORE
- increase score for good collisions, decrease for unwanted collisions --- possibly related to game states
--scoring is incremented on line 288


- slow down scrolling speed
- set altitude/y-position to number of clicks per second or divided by some amount to basically increase or decrease height based on how fast the user clicks or hits a button
- - CLICKING CURRENTLY AFFECTS SPEED - we need to change to AFFECTING POSITION

--change game states 
-- no game over or end based on a chosen setting (time, frame_length, or user_choice)
--

--CLICKING TO CHANGE POSITION
-- line 162, 163 - in update method - determine SPEED
            this.speed += this.gravity;      gravity is 4.6 
            this.y += this.speed;

            --NOTE - pipes have a "position" input p - then p.x changes the x position -- line221
-- lines 178 179 -   speedReset : function(){  //sets speed to 0 at beginning of game
        this.speed = 0;


        WHAT MAKES THE RABBIT CHANGE DIRECTION (up/down???)  - line 58 - 

        --can't get increased clicks to increase speed -- look at lines 170 - 175