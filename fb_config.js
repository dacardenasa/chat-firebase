// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9L0MSwZqA60fDm1XX3ZlBklaZrjtYCmE",
  authDomain: "chat-msg-1a885.firebaseapp.com",
  databaseURL: "https://chat-msg-1a885.firebaseio.com",
  projectId: "chat-msg-1a885",
  storageBucket: "chat-msg-1a885.appspot.com",
  messagingSenderId: "503844125591",
  appId: "1:503844125591:web:52b956fc24f31244ee22d2",
  measurementId: "G-1KCHYD1SBC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

var messages = firebase.database().ref('messages');
messages.on('child_added', function(data){
  $('#messages').append(`<li id="${ data.key }">${ data.val().body }</li>`);
})

messages.on('child_removed', function(data){
  $('#messages #' + data.key).remove();
});

$('form').on('submit', function(e){
  e.preventDefault();
  messages.push().set({ body: $('#m').val() })
    .catch(function(err){
      if (err.code.toLowerCase() === "permission_denied" ) {
        alert('No has iniciado sesion')
      } else {
        alert("Error inesperado: " + err)
      }
    }); 
    $('#m').val('');
});

$('#login').on('click', function(e){
  e.preventDefault();
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
});

$('#logout').on('click', function(e){
  e.preventDefault();
  firebase.auth().signOuth();
})

firebase.auth().getRedirectResult().then(function(result){
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      $('#login').hide();
      $('#logout').show();
    } else {
      $('#login').show();
      $('#logout').hide();
    }
  });
});