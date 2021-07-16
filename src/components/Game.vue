<template>
  <h2>ASD</h2>
  <div class="">
    <canvas
      ref="game"
      id="canvas"
      style="'border: 2px solid red;"
      @keyup.up="move('UP')"
    />
    <button @click="move('RIGHT')">Prawo</button>
    <button @click="move('LEFT')">Lewo</button>
    <button @click="move('UP')">Góra</button>
    <button @click="move('DOWN')">Dół</button>
  </div>
</template>

<script>
import connection from "@/connection";
import Canvas from "../canvas";
import Game from "../game";

export default {
  name: "Game",
  data() {
    return {
      context: {},
    }
  },
  created() {
    this.connection = connection;
    this.modalOpen = localStorage.getItem('username') ? false : true;
    this.username = localStorage.getItem('username');
  },
  mounted(){
    this.canvas = new Canvas(document.getElementById('canvas'), 500, 500);
    this.game = new Game(this.canvas, connection);
  },
  methods: {
    move(direction) {
      this.game.onMove(direction);
    }
  }
}


</script>

<style scoped>

</style>