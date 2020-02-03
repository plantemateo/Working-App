angular.module('frontend').controller('ModalBoardMembersCtrl', function ($scope, $rootScope, $uibModalInstance, miembros, creador, userService) {
    $scope.miembros = miembros;
    $scope.creador = creador;
    $scope.username = ""
    $scope.found = true;

    $scope.search = function () {
        if ($scope.username != "") {
            let contains = false;
            $scope.miembros.forEach(mem => {
                contains = contains || mem.username == $scope.username;
            });
            if (!contains) {
                userService.cargarPorUsernameOrEmail($scope.username).then(
                    function (resp) {
                        $scope.miembros.push(resp.data[0]);
                        $scope.found = true;
                    },
                    function (err) {
                        if (err.status == 404) {
                            $scope.found = false;
                        } else {
                            $rootScope.openErrorModal(err);
                        }
                    }
                );
            }
        }
    };
    $scope.eliminateMember = function (member) {
        $scope.miembros = $scope.miembros.filter(mem => mem.idUser != member.idUser);
    };

    $scope.done = function () {
        $uibModalInstance.close($scope.miembros);
    };
});