const connection = new WebSocket("ws://10.20.62.12:8765");

connection.onopen = (event) => {
  console.log(event)
  console.log("Successfully connected to the echo websocket server...")
}

export default connection;