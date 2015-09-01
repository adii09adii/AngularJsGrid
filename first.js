


var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($http,$scope){ 
        
        var isJsonLoading = true,
            isXmlLoading = true,
            jsondData,
            xmlData,
            apiError = false;

        $scope.gridData = [];
        $scope.gridOptions = { 
                data: 'gridData',
                showGroupPanel: true,
                jqueryUIDraggable: true
        };
        
        var onJsonApiCallSuccess = function(response){
            isJsonLoading = false;
            jsondData = response.person;
            updateGridData();
            
         };
        
        var onXmlApiCallSuccess = function(response){
            isXmlLoading = false;
            console.log(response);
            var x2js = new X2JS();
            var xmlResponse ;
            try{
                xmlResponse  = x2js.xml_str2json(response);    
                xmlData = xmlResponse.persons.person;

            }catch(e){
                console.log(e);
                xmlData =[];
            }
            
            
            console.log(xmlData);
            updateGridData();
         };
        

        var onXmlError = function(response){
            isXmlLoading = false;
            apiError = true;
        };

        var onJsonError = function(response){
            isJsonLoading = false;
            apiError = true;
        };

        var updateGridData = function(){
           if( !isJsonLoading && !isXmlLoading && !apiError){
                if(jsondData){
                    $scope.gridData = jsondData.concat(xmlData).sort(function(objectA, objectB){
                        return objectA.id - objectB.id;
                    });
                }

           }
        }

        //call to get json values
        $http.get('data/persondata.json')
        .success(onJsonApiCallSuccess)
        .error(onJsonError);

        //call to get xml
        $http.get('data/persons.xml')
        .success(onXmlApiCallSuccess)
        .error(onXmlError);  

    });

