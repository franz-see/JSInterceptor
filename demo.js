var myObj = {
  property: 1,
  returnThis: function (valueToReturn) {
    return valueToReturn;
  },
  throwThis: function (valueToThrow) {
    throw valueToThrow;
  }
};

function beforeInterceptor (object, method, args) {
  console.log({
    'object' : object,
    'method' : method,
    'args' : args
    });
}

function afterInterceptor (object, method, returnValue, exception, args) {
  console.log({
    'object' : object,
    'method' : method,
    'returnValue' : returnValue,
    'exception' : exception,
    'args' : args
    });

}

jsi.InterceptorUtil.doAround(myObj, 'returnThis', beforeInterceptor, afterInterceptor);

var value = myObj.returnThis('return value');
console.log('returned value: ' + value);

try {
  myObj.throwThis('exception value');
} catch (ex) {
  console.log('thrown value: ' + ex);
}
