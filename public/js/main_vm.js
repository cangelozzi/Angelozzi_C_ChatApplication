import ChatMessage from "./modules/ChatMessage.js";

// run socket on CLIENT 
const socket = io();

function logConnect({ sID, message }) { 
  console.log(sID, message);
 vm.socketID = sID;
}

function appendMessage(message) {
  vm.messages.push(message);
}

//! create vue instance
const vm = new Vue({
  data: {
    socketID: '',
    nickname: '',
    message: '',
    messages: []
  },

  methods: {
    dispatchMessage() {

      // emit msg event from client
      socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous!"});

      // reset message field
      this.message = '';
      
    }
  },

  components: {
    newmessage: ChatMessage
  }


}).$mount('#app');

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);