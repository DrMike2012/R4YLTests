import org.w3c.dom.Text;

import javax.swing.JFrame;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.Graphics2D;
import java.awt.Color;

//import static com.sun.tools.doclint.Entity.image;

public class Window extends JFrame implements Runnable {

    public Graphics2D g2;
    public KL keyListener = new KL();
    public Rect playerOne, ai, ballRect;
    public PlayerController playerController;
    public AIController aiController;
    public Ball ball;

    public Window() {
        this.setSize(Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
        this.setTitle(Constants.SCREEN_TITLE);
        this.setResizable(false);
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.addKeyListener(keyListener);


        g2 = (Graphics2D) this.getGraphics();
        playerOne = new Rect(30, 50, Constants.PADDLE_WIDTH, Constants.PADDLE_HEIGHT, Constants.PADDLE_COLOR_PLAYER1);
        playerController = new PlayerController(playerOne, keyListener);

        ai = new Rect(Constants.SCREEN_WIDTH - 30, 50, Constants.PADDLE_WIDTH, Constants.PADDLE_HEIGHT, Constants.PADDLE_COLOR_AI);
        ballRect = new Rect(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, Constants.BALL_WIDTH, Constants.BALL_HEIGHT, Constants.BALL_COLOR);
        aiController = new AIController(new PlayerController(ai), ballRect);
        ball = new Ball(ballRect, playerOne, ai);

    }

    public void update(double dt) {
        Image dbImage = createImage(getWidth(), getHeight());
        Graphics dbg = dbImage.getGraphics();
        this.draw(dbg);
        g2.drawImage(dbImage, 0, 0, this);


        playerController.update(dt);
        aiController.update(dt);
        ball.update(dt);


    }

    public void draw(Graphics g) {
        Graphics2D g2 = (Graphics2D) g;
        g2.setColor(Color.BLACK);
        g2.fillRect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
        //Font font = new Font("")
        //Text text = new Text("sample", font, 100,100);
//text.draw(g2);

        playerOne.draw(g2);
        ai.draw(g2);
        ball.draw(g2);
    }

    public void run() {
        double lastFrameTime = 0.0;
        while (true) {
            double time = Time.getTime();
            double deltaTime = time;
            lastFrameTime = time;

            update(deltaTime);

            try {
                Thread.sleep(30);
            } catch (Exception e) {

            }
        }
    }
}
