import org.w3c.dom.Text;

import java.awt.*;

public class Ball {
   // public Rect ballRect;
    public Rect rect;
    public Rect leftPaddle, rightPaddle;
    public Ball ballRect;
    public Text leftScoreText, rightScoreText;
    //Velocity variables
    private double vy = 10.0;
    private double vx = -150.0;

    public Ball(Rect rect, Rect leftPaddle, Rect rightPaddle) {
        this.rect = rect;
        this.leftPaddle = leftPaddle;
        this.rightPaddle = rightPaddle;
    }

        public void update ( double dt){
            //MOVING LEFT
            if (vx < 0) {
                if (this.rect.x <= this.leftPaddle.x + this.leftPaddle.width && this.rect.x + this.rect.width >= this.leftPaddle.x &&
                        this.rect.y >= this.leftPaddle.y && this.rect.y <= this.leftPaddle.y + this.leftPaddle.height) {
                    //BOUNCE
                    this.vx *= -1;
                    this.vy *= -1;
                }else if(this.rect.x + this.rect.width < this.leftPaddle.x){
                    System.out.println("PLAYER ONE lose one point");
                }

                // IN MIDDLE OF SCREEN
                // UPDATE POSITION BASED ON VELOCITY

                this.rect.x += vx*Constants.BALL_SPEED;
                this.rect.y += vy*Constants.BALL_SPEED;
            } else if (vx > 0) {
                if (this.rect.x + this.rect.width >= this.rightPaddle.x && this.rect.x <= this.rightPaddle.x + this.rightPaddle.width &&
                        this.rect.y >= this.rightPaddle.y && this.rect.y <= this.rightPaddle.y + this.rightPaddle.height) {
                    //BOUNCE
                    this.vx *= -1;
                    this.vy *= -1;
                } else if(this.rect.x +this.rect.width > this.rightPaddle.x + this.rightPaddle.width){
                    System.out.println("AI Lose one point");
                }
                // IN MIDDLE OF SCREEN
                // UPDATE POSITION BASED ON VELOCITY
                this.rect.x += vx * Constants.BALL_SPEED;
                this.rect.y -= vy * Constants.BALL_SPEED;

            }
        }


    public void draw(Graphics2D g2) {
        g2.setColor(rect.color);
        g2.fillRect((int)rect.x, (int)rect.y, (int)rect.width, (int)rect.height);
    }
}
