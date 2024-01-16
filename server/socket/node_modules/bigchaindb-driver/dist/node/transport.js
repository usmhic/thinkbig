"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _request = _interopRequireDefault(require("./request"));

// Copyright BigchainDB GmbH and BigchainDB contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

/**
 *
 * @private
 * If initialized with ``>1`` nodes, the driver will send successive
 * requests to different nodes in a round-robin fashion (this will be
 * customizable in the future).
 */
var Transport = /*#__PURE__*/function () {
  function Transport(nodes, timeout) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Transport);
    this.connectionPool = [];
    this.timeout = timeout; // the maximum backoff time is 10 seconds

    this.maxBackoffTime = timeout ? timeout / 2 : 10000;
    (0, _forEach.default)(nodes).call(nodes, function (node) {
      _this.connectionPool.push(new _request.default(node));
    });
  } // Select the connection with the earliest backoff time, in case of a tie,
  // prefer the one with the smaller list index


  (0, _createClass2.default)(Transport, [{
    key: "pickConnection",
    value: function pickConnection() {
      var _context;

      var connection = this.connectionPool[0];
      (0, _forEach.default)(_context = this.connectionPool).call(_context, function (conn) {
        // 0 the lowest value is the time for Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
        conn.backoffTime = conn.backoffTime ? conn.backoffTime : 0;
        connection = conn.backoffTime < connection.backoffTime ? conn : connection;
      });
      return connection;
    }
  }, {
    key: "forwardRequest",
    value: function () {
      var _forwardRequest = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(path, headers) {
        var response, connection, startTime, elapsed;
        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.timeout >= 0)) {
                  _context2.next = 14;
                  break;
                }

                connection = this.pickConnection(); // Date in milliseconds

                startTime = (0, _now.default)(); // eslint-disable-next-line no-await-in-loop

                _context2.next = 5;
                return connection.request(path, headers, this.timeout, this.maxBackoffTime);

              case 5:
                response = _context2.sent;
                elapsed = (0, _now.default)() - startTime;

                if (!(connection.backoffTime > 0 && this.timeout > 0)) {
                  _context2.next = 11;
                  break;
                }

                this.timeout -= elapsed;
                _context2.next = 12;
                break;

              case 11:
                return _context2.abrupt("return", response);

              case 12:
                _context2.next = 0;
                break;

              case 14:
                throw new Error('TimeoutError');

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function forwardRequest(_x, _x2) {
        return _forwardRequest.apply(this, arguments);
      }

      return forwardRequest;
    }()
  }]);
  return Transport;
}();

exports.default = Transport;