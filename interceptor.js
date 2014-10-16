var jsi = typeof(jsi) !== 'undefined' ? jsi : {};
jsi.InterceptorUtil = function() {

  var _doBefore = function(object, method, beforeFunc) {
    var originalMethod = object[method];
    object[method] = function () {
      beforeFunc(object, method, arguments);
      return originalMethod.apply(object, arguments);
    };
  };

  var _doAfter = function(object, method, afterFunc) {
    var originalMethod = object[method];
    object[method] = function () {
      var returnValue;
      var exception;
      try {
          returnValue = originalMethod.apply(object, arguments);
      } catch(ex) {
          exception = ex;
      }
      afterFunc(object, method, returnValue, exception, arguments);
      
      if (exception) {
        throw exception;
      } else {
        return returnValue;
      }

    };
  };
  
  var _doAround = function (object, method, beforeFunc, afterFunc) {
    _doBefore(object, method, beforeFunc);
    _doAfter(object, method, afterFunc);
  };
 
  return {
    'doBefore' : _doBefore,
    'doAfter'  : _doAfter,
    'doAround' : _doAround
  };
}();
