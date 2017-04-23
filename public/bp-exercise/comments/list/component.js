function ListController(CommentsService, MessagePool) {
  const vm = this;
  vm.comments = [];
  vm.rateComment = (id, rate) => {
    CommentsService.rate(id, rate)
  }
  CommentsService.List().then((comments) => {
    vm.comments = comments;
  });
  MessagePool.socket.onmessage = function(message) {
      const data  = JSON.parse(message.data);
      for (var i = 0; i < vm.comments.length; i++) {
        const comment = vm.comments[i];
        if(comment._id === data.commentId){
          comment.rating = data.rating;
        }
      }
  };
}

ListController.$inject = ['CommentsService', 'MessagePool'];
bpExerciseApp.component('commentsList', {
  controller: ['CommentsService', 'MessagePool', ListController],
  templateUrl: 'bp-exercise/comments/list/list.html'
});
