/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('CompaniesEditCtrl', function($scope, $state,itemCompanies,$sce,companiesService,$rootScope,SeatEatsConstants,toastr,$localStorage) {
    console.log(itemCompanies);
    $scope.validatorServer=$localStorage.currentUser.validation.companyValidator;
    $scope.nodes=$localStorage.currentUser.forms.nodes;
    if(angular.isDefined($scope.nodes))
      $scope.formFields=$scope.nodes[2];
    $scope.settings=$localStorage.currentUser.validation.settings;
    $scope.validator;
    $scope.$state = $state;

    $scope.autoCompleteOptions={
      dataTextField: "companyName",
      filter: "contains",
      minLength: 3,
      dataSource: {
        type: "json",
        serverFiltering: true,
        transport: {
          read: SeatEatsConstants.AppUrlApi+'companyssearch'
        },
        schema: {
          data: "docs"
        }
      }
    }


      if(angular.isDefined(itemCompanies))
    $scope.model = itemCompanies.data;
    else
      $scope.model={};

    $scope.selectOptionsCompanyType = {
      filter: "contains",
      placeholder: "Select CompanyType...",
      dataTextField: "content",
      dataValueField: "content",
      valuePrimitive: true,
      autoBind: false,
      animation: {
        close: {
          effects: "zoom:out",
          duration: 500
        }
      },
      dataSource: {
        type: "json",
        serverFiltering: true,
        transport: {
          read: {
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=companyType"
          }
        }
      }
    };




    $scope.publishCompany=publishCompany;

    function publishCompany()
    {

      if($scope.validator.validate())
      {
        $rootScope.scopeWorkingVariable = true;

      companiesService.putLetsplay($scope.model).then(function (response)
      {

        debugger;
        console.log(response);
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');

        $state.go("companies");

      })

    }

      else
        toastr.error('Error','Operation Was not complete');

    }


  });
