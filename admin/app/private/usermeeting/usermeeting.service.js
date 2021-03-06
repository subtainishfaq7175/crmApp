/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */

angular.module("yapp").factory('usermeetingService',['$http','SeatEatsConstants','$localStorage', function($http,SeatEatsConstants,$localStorage){

  var meeting = {};

  meeting.getMeetingList= function ()
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'meeting');
    return promise;
  };

  meeting.getMeetingByUser= function ()
  {
    var promise = $http.get(SeatEatsConstants.AppUrlApi+'unmeeting/');
    return promise;
  };

  meeting.deleteMeetingById= function (ID)
  {

    var promise = $http.delete(SeatEatsConstants.AppUrlApi+'meeting/'+ID);
    return promise;
  };


  meeting.postMeeting=function (obj)
  {
      return $http.post(SeatEatsConstants.AppUrlApi+'meeting/', obj);


  };
 meeting.putMeeting=function (obj)
  {
      return $http.put(SeatEatsConstants.AppUrlApi+'meeting/'+obj._id, obj);


  };


  return meeting;

}]);
