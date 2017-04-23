bpExerciseApp.service('MessagePool', messagePool);

function messagePool() {
    var dataStream = new WebSocket('ws://localhost:8001/');

    var service = {
      socket: dataStream,
      pushMessage: pushMessage
    };

    return service;

    function pushMessage(message) {
      var data = [ 'newmessage', { 'data': message } ];
      dataStream.send(JSON.stringify(data));
    }
}



