/**
 * Created by douglas.nunes on 06/09/2016.
 */
app.controller('PdfFormCrtl', function ($scope, $localstorage, Expense){

  $scope.today = new Date();

  $scope.pdf = $localstorage.getObject('report');
  if($scope.pdf === undefined){
    $scope.pdf = {};
  }

  $scope.saveClicked = function () {
    $localstorage.setObject('report', $scope.pdf);
    Expense.createPDF($scope.pdf);
  }
});
