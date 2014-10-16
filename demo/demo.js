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

function afterInterceptor (object, method, args, returnValue, exception) {
  console.log({
    'object' : object,
    'method' : method,
    'args' : args,
    'returnValue' : returnValue,
    'exception' : exception
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
