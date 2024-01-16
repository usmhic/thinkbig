"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = ccJsonLoad;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _bs = _interopRequireDefault(require("bs58"));

var _cryptoConditions = require("crypto-conditions");

// Copyright BigchainDB GmbH and BigchainDB contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

/**
 * Loads a crypto-condition class (Fulfillment or Condition) from a BigchainDB JSON object
 * @param {Object} conditionJson
 * @returns {cc.Condition} Ed25519 Condition (that will need to wrapped in an Output)
 */
function ccJsonLoad(conditionJson) {
  if ('hash' in conditionJson) {
    var condition = new _cryptoConditions.Condition();
    condition.setTypeId(conditionJson.type_id);
    condition.setSubtypes(conditionJson.bitmask);
    condition.setHash(_bs.default.decode(conditionJson.hash)); // TODO: fix this, maxFulfillmentLength cannot be set in CryptoCondition lib

    condition.maxFulfillmentLength = (0, _parseInt2.default)(conditionJson.max_fulfillment_length, 10);
    return condition;
  } else {
    var fulfillment;

    if (conditionJson.type === 'threshold-sha-256') {
      var _context;

      fulfillment = new _cryptoConditions.ThresholdSha256();
      fulfillment.threshold = conditionJson.threshold;
      (0, _forEach.default)(_context = conditionJson.subconditions).call(_context, function (subconditionJson) {
        var subcondition = ccJsonLoad(subconditionJson);

        if ('getConditionUri' in subcondition) {
          fulfillment.addSubfulfillment(subcondition);
        } else if ('serializeUri' in subcondition) {
          fulfillment.addSubcondition(subcondition);
        }
      });
    }

    if (conditionJson.type === 'ed25519-sha-256') {
      fulfillment = new _cryptoConditions.Ed25519Sha256();
      fulfillment.setPublicKey(_bs.default.decode(conditionJson.public_key));
    }

    return fulfillment;
  }
}