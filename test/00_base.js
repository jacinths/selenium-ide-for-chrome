// Generated by CoffeeScript 1.6.2
(function() {
  var _this = this;

  (function() {
    var asynch_test, synch_test;

    _this.expect = chai.expect;
    synch_test = function(callback) {
      return function() {
        var e, result, sandbox;

        sandbox = this.sandbox = sinon.sandbox.create();
        try {
          result = callback.call(this);
          sandbox.verifyAndRestore();
          return result;
        } catch (_error) {
          e = _error;
          sandbox.restore();
          throw e;
          return void 0;
        }
      };
    };
    asynch_test = function(callback) {
      return function(done) {
        var e, origOnError, sandbox;

        origOnError = window.onerror;
        sandbox = this.sandbox = sinon.sandbox.create();
        window.onerror = function() {
          sandbox.restore();
          origOnError.apply(this, arguments);
          return window.onerror = origOnError;
        };
        try {
          return callback.call(this, function(error) {
            sandbox.verifyAndRestore();
            window.onerror = origOnError;
            return done(error);
          });
        } catch (_error) {
          e = _error;
          sandbox.restore();
          window.onerror = origOnError;
          throw e;
          return void 0;
        }
      };
    };
    _this.mocha.sinon = {};
    _this.mocha.sinon.test = function(callback) {
      if (!callback.length) {
        return synch_test(callback);
      } else {
        return asynch_test(callback);
      }
    };
    if ('undefined' !== typeof console) {
      sinon.log = function() {
        return console.log.apply(console, arguments);
      };
    }
    return Deferred.onerror = function(e) {
      throw e;
    };
  })();

}).call(this);