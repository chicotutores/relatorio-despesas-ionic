/**
 * Created by douglas.nunes on 26/08/2016.
 */
app.controller('AddExpenseCrtl', function ($scope, $cordovaCamera, $ionicPopup, $ionicLoading, Expense) {
  $scope.expense = {};

  var showLoading = function () {
    $ionicLoading.show({
      template: '<h4>Salvando despesa</h4><ion-spinner></ion-spinner>',
      noBackdrop: true
    });
  };

  var hideLoading = function () {
    $ionicLoading.hide();
  };

  $scope.saveExpense = function () {
    if ($scope.obs == undefined) {
      $scope.obs = '';
    }
    showLoading();
    Expense.saveExpense($scope.expense).then(function (data) {
      hideLoading();
      debugger;
      $scope.expense = {};
      var alertPopup = $ionicPopup.alert({
        title: '',
        template: 'Despesa salva com sucesso!'
      });
    }, function (data) {
      hideLoading();
      debugger;
      var alertPopup = $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possível salvar sua despesa, por favor tente novamente!'
      });
    });
  };

  $scope.takePicture = function () {
    var options = {
      quality: 30,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 700,
      encodingType: Camera.EncodingType.PNG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.expense.image = imageData;
    }, function (err) {
      // An error occured. Show a message to the user
    });
  };

});