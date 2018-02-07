/**
 * Created by douglas.nunes on 26/08/2016.
 */
app.controller('ExpenseListCtrl', function ($scope, $state, $cordovaEmailComposer, $ionicPopup, $ionicLoading, $cordovaFileTransfer, SERVER, Expense) {

  $scope.expenses = [];

  var showLoading = function () {
    $ionicLoading.show({
      template: '<h4>Carregando despesas</h4><ion-spinner></ion-spinner>',
      noBackdrop: true
    });
  };

  var hideLoading = function () {
    $ionicLoading.hide();
  };

  $scope.$on("$ionicView.enter", function () {
    $scope.getExpenses();
  });

  $scope.getExpenses = function () {
    showLoading();
    Expense.getAll().then(function (data) {
      hideLoading();
      console.log(data.data);
      $scope.expenses = data.data.message;
      console.log($scope.expenses);
    }, function (data) {
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possível carregar suas despesas, por favor tente novamente!'
      });
    });
  };


  $scope.addExpense = function () {
    $state.go('addExpense');
  };

  $scope.removeExpense = function (index) {
    Expense.removeExpense(index);
  };

  $scope.createPdf = function () {
    // $state.go('pdfForm');
    showLoading();
    var url = SERVER.url + "exportExcel?username=douglasnunes&initialDate=2017-04-01&finalDate=2017-04-10";
    var targetPath = "file:///storage/emulated/0/Download/relatorio.xlsx"; // cordova.file.externalDataDirectory + "relatorio.xlsx";
    $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Planilha baixada com sucesso no caminho ' + targetPath
      });
    }, function (error) {
      console.log(error);
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possível fazer o download da planilha, por favor tente novamente!'
      });
    })
  };
});