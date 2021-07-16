export const Direction = {
    'UP': 1,
    'DOWN': 2,
    'RIGHT': 3,
    'LEFT': 4
}


class Game {
    constructor(canvas, connection) {
        this.canvas = canvas;
        this.connection = connection;
        this.canvas.clear();
        this.setConnectionEvents();
        this.position = {
            x: 0,
            y: 0
        }
    }

    setConnectionEvents() {
         this.connection.onmessage = (event) => {
          const data = JSON.parse(event.data);
          switch (data.type) {
            case 'game':
              this.position = data;
              console.log(data);
              this.redraw();
              break;
            default:
              console.error("unsupported event", data);
          }
        }
    }

    redraw() {
        this.canvas.clear();
        this.canvas.fillRect(this.position.x-25, this.position.y-25, 50, 50);
    }

    onMove(dir) {
        console.log(dir);
        this.connection.send(JSON.stringify(
            {
                user: localStorage.getItem('username'),
                dir
            }
        ));
    }

}


export default Game;