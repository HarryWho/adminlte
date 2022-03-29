const socket = io('http://localhost:5000')

socket.on('connect', (message) => {

})
socket.on('userList', (data) => {
  $("#user-list ul").html('')

  $("#user-list ul").append(data)

})

function GetUserList() {

  socket.emit('userList', 'socket')
}