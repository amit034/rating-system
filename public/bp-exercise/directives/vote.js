/**
 * Created by amitr on 4/22/2017.
 */
function VoteDirective() {
    return {
        restrict: 'A',
        scope: {
            max: '=',
            rate: '=',
            count: '=',
            onChange: '&'
        },
        template: '<span><ul class="rating">' +
        '<li class="star" ng-repeat="star in stars" ng-class="{active: star.active }" ng-click="toggle($index); onClick($event, $index + 1)"   ng-mouseenter="onMouseEnter($event, $index + 1)" ng-mouseleave="onMouseLeave($event)">' +
        '☆' +
        '</li>' +
        '</ul>' +
        '<span>Rate: {{rate}}</span>' +
        '<span>Votes: {{count}}</span>' +
        '</span>',
        link: (scope, elem, attrs) => {
            scope.stars = [];
            const updateStars =  (rate) =>{
                for (var i = 0; i < scope.max; i++) {
                    const active = i < Math.round(rate);
                    if (scope.stars[i] === undefined) {
                        scope.stars.push({
                            active: active
                        });
                    } else {
                        scope.stars[i].active = active;
                    }
                }

            };

            updateStars(scope.rate);

            scope.$watch('rate', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    updateStars(scope.rate);
                }
            });

            scope.onMouseEnter = function (event, rate) {
                updateStars(rate);
            };

            scope.onMouseLeave = function (event) {
                updateStars(scope.rate);
            };

            scope.onClick = function (event, rate) {
                scope.rate = rate;
                if (scope.onChange instanceof Function) {
                    scope.onChange({rate: scope.rate});
                }
            };
        }
    }
};
bpExerciseApp.directive('vote',VoteDirective);