function com_client(){
    // const socket = io("http://localhost:7000");
    // socket.on('send-msg', message =>{
    //     console.log(message)
    // });
    // socket.on('client-msg', message =>{
    //     console.log(message)
    // });
}
function sent_msg(){
    var msg = document.querySelector('.msg');
    const socket = io("http://localhost:7000");
    socket.emit('msg-recieve', msg.value );
    msg.value = "";
    socket.on('msg-send', msg=>{
        console.log(msg);
    } 
    );
}