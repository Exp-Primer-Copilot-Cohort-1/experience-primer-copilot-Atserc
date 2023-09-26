function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'views/skills-member.html',
    controller: 'SkillsMemberCtrl',
    controllerAs: 'skillsMember',
    bindToController: true,
    scope: {
      member: '='
    }
  };
}