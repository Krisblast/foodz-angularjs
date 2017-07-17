angular.module('foodzApp')
  .component('moodSelector', {
    templateUrl: 'scripts/Mood/MoodSelectorComponent/mood-selector.html',
    controller: function (typesService, localStorageService, $scope, $location) {
      var $ctrl = this;

      $ctrl.$onInit = function () {
        if(localStorageService.get('filters')){
          $ctrl.selectedMoods = localStorageService.get('filters');
        }
        else {
          $ctrl.selectedMoods = [];
        }
        getTypes();
      };

      function getTypes() {
        var moodMap = getMoodIds();
        typesService.getAllTypes().then(function (resp) {
          $ctrl.moods = _.map(resp.data, function (type) {
            return {
              type: type,
              selected: _.contains(moodMap, type.id)
            };
          })
        }, function (error) {});
      }

      function setSearchFilters(moods) {
        $ctrl.selectedMoods = _.filter(moods, function(mood){
          if(mood.selected === true){
            return mood;
          }
        });
        localStorageService.set('filters', $ctrl.selectedMoods);
        $location.search('filters', getMoodIds());
      }

      function getMoodIds() {
        return _.map($ctrl.selectedMoods, function (mood) {
          return mood.type.id;
        });
      }

      $scope.$watch('$ctrl.moods', function (newMoods, oldMoods) {
        if(newMoods !== oldMoods){
          setSearchFilters(newMoods);
        }
      }, true);
    },
    bindings: {
    }
  });
