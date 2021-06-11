<template>
  <ul id="example-1">
    <li v-for="item in messages" :key="item" v-bind:class="[item.user == username ? 'my-msg' : 'not-my-msg']">
      <p class="msg-text">{{ item.msg }}</p>
      <b class="msg-user">{{ item.user}}</b>
      <p class="msg-time">{{ item.time}}</p>
    </li>
  </ul>
  <div class="buttons">
    <input v-model="msg" v-on:keyup.enter="sendMessage">
    <button @click="sendMessage">Send</button>
  </div>
  <div class="state">
    <p class="users">{{ users }} online</p>
  </div>
  <teleport to="body">
  <div v-if="modalOpen" class="modal">
    <div>
      <input type="text" v-model="username">
      <button @click="setUsername">
        Set username
      </button>
    </div>
  </div>
</teleport>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      connection: null,
      msg: 'Hello',
      users: '123',
      messages: [],
      modalOpen: true,
      username: '',
    }
  },
  methods: {
    sendMessage() {
      if (this.msg.trim()) {
        this.connection.send(JSON.stringify(
            {msg: this.msg, user: localStorage.getItem('username')}
        ));
      }
      this.msg = '';
    },
    setUsername() {
      if (this.msg.trim().length > 3) {
        localStorage.setItem('username', this.username)
        this.modalOpen = false;
      }
    },
  },
  created() {
    console.log("Starting connection to WebSocket Server")

    this.connection = new WebSocket("ws://10.20.62.12:8765")
    this.connection.onmessage = (event) => {
      let data = JSON.parse(event.data);
      switch (data.type) {
        case 'msg':
          this.messages.push(data);
          break;
        case 'users':
          this.users = (
              data.count.toString() + " user" +
              (data.count == 1 ? "" : "s"));
          break;
        default:
          console.error(
              "unsupported event", data);

        }

        // skroluj na dol czatu po odebraniu wiadomosci
        const chatBox = document.getElementById("example-1");
        setTimeout(() => {chatBox.scrollTop = chatBox.scrollHeight}, 200);
    }
    this.connection.onopen = (event) => {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    this.modalOpen = localStorage.getItem('username') ? false : true;
    this.username = localStorage.getItem('username');
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
    font-family: "Courier New", sans-serif;
    text-align: center;
    background-color: #EFEFEF;
}
.buttons {
    font-size: 4em;
    display: flex;
    justify-content: center;
}
.button, .value {
    line-height: 1;
    padding: 2rem;
    margin: 2rem;
    border: medium solid;
    min-height: 1em;
    min-width: 1em;
}
.button {
    cursor: pointer;
    user-select: none;
}
.minus {
    color: red;
}
.plus {
    color: green;
}
.value {
    min-width: 2em;
}
.state {
    font-size: 2em;
}

#example-1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 500px;
  overflow: auto;
  border: 1px solid #EFEFEF;
  border-radius: 12px;
  width: 600px;
  margin: 0 auto;
  background-color: #FFFFFF;
}

li {
  list-style: none;
  margin: 10px 0px;
  width: 200px;
  padding: 20px 40px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  word-break: break-all;

}
input {
  padding: 10px 20px;
}

button {
  padding: 10px 20px;
}

.modal {
  --modal-width: 500px;
  position: fixed;
  left: auto;
  top: 200px;
  background: white;
  width: 500px;
  padding: 50px;

  right: calc(50vw - 250px);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 1;
 }

li.not-my-msg {
  margin-left: 20px;
  margin-right: auto;
  background-color: #EFEFEF;
  border-radius: 12px 12px 12px 0;
}

li.my-msg {
  margin-left: auto;
  margin-right: 20px;
  background-color: #3b5998;
  color: #FFFFFF;
  border-radius: 12px 12px 0 12px;
}

p.msg-time {
  font-size: 10px;
}
</style>
