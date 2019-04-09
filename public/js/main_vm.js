import ChatMessage from "./modules/ChatMessage.js";
// run socket on CLIENT 
const socket = io();

function logConnect({ sID, message, connections }) { 
  console.log(sID, message, connections);
 vm.socketID = sID;
 vm.connections = connections;
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
    messages: [],
    connections: '',
    typing: false,
    users: [],
    info: []
  },

  watch: {
    message(value) {
      value ? socket.emit('typing', this.nickname) : socket.emit('stoptyping');
    }
  },

  created() {
    socket.on('typing', (data) => {
      console.log(data);
      this.typing = data || 'Anonymous';
    });
    socket.on('stoptyping', () => {
      this.typing = false;
    });
  },

  methods: {
    dispatchMessage() {

      // emit msg event from client
      socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous!"});

      // reset message field
      this.message = '';
      
    },
    isTyping() {
      socket.emit('typing', this.nickname);
    },

  },

  components: {
    newmessage: ChatMessage
  }


}).$mount('#app');

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);


// ------------- DARK THEME LOGIC ---------------

window.addEventListener('load', function () {
  var button = document.querySelector('#toggle');

  button.addEventListener('click', function () {
    var palette = '0';

    if (document.body.getAttribute('data-palette') === '0') {
      palette = '1';
    }

    document.body.setAttribute('data-palette', palette);


  });

});
// ----------------------------------------------