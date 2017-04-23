bpExerciseApp.service('CommentsService', function($http) {
  this.List = () => {
    return $http({
      url: '/comments',
      method: 'GET'
    }).then((results) => results.data);
  }
  this.rate = (id, rate) => {
      return $http({
        url: `/comments/${id}/rate/${rate}`,
        method: 'POST'
      }).then((results) => results.data);
    }
});
