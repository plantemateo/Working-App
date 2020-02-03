angular.module('frontend').controller('ConfigureController',
		function($scope, userService, $rootScope, $uibModalInstance) {

			$scope.modUser = {
				firstName : '',
				lastName : '',
				email : '',
				username : '',
				password : ''

			};

			$scope.modPerfil = function() {
				userService.agregar($scope.modUser).then(function() {
					$uibModalInstance.dismiss(true);
					alert("SE HAN MODIFICADO LOS DATOS, POR FAVOR INGRESE NUEVAMENTE");
					$rootScope.logout();
				}, function(err) {
					$rootScope.openErrorModal(err);
				});
			};

			$scope.cancelar = function() {
				$uibModalInstance.dismiss('cancel');
			};
		});
