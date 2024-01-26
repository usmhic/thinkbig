"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = ccJsonify;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _bs = _interopRequireDefault(require("bs58"));

// Copyright BigchainDB GmbH and BigchainDB contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

/**
 * Serializes a crypto-condition class (Condition or Fulfillment) into a BigchainDB-compatible JSON
 * @param {cc.Fulfillment} fulfillment base58 encoded Ed25519 public key for recipient of the Transaction
 * @returns {Object} Ed25519 Condition (that will need to wrapped in an Output)
 */
function ccJsonify(fulfillment) {
  var conditionUri;

  if ('getConditionUri' in fulfillment) {
    conditionUri = fulfillment.getConditionUri();
  } else if ('serializeUri' in fulfillment) {
    conditionUri = fulfillment.serializeUri();
  }

  var jsonBody = {
    details: {},
    uri: conditionUri
  };

  if (fulfillment.getTypeId() === 0) {
    jsonBody.details.type_id = 0;
    jsonBody.details.bitmask = 3;

    if ('preimage' in fulfillment) {
      jsonBody.details.preimage = fulfillment.preimage.toString();
      jsonBody.details.type = 'fulfillment';
    }
  }

  if (fulfillment.getTypeId() === 2) {
    var _context;

    return {
      details: {
        type: 'threshold-sha-256',
        threshold: fulfillment.threshold,
        subconditions: (0, _map.default)(_context = fulfillment.subconditions).call(_context, function (subcondition) {
          var subconditionJson = ccJsonify(subcondition.body);
          return subconditionJson.details;
        })
      },
      uri: conditionUri
    };
  }

  if (fulfillment.getTypeId() === 4) {
    jsonBody.details.type = 'ed25519-sha-256';

    if ('publicKey' in fulfillment) {
      jsonBody.details.public_key = _bs.default.encode(fulfillment.publicKey);
    }
  }

  if ('hash' in fulfillment) {
    jsonBody.details.hash = _bs.default.encode(fulfillment.hash);
    jsonBody.details.max_fulfillment_length = fulfillment.maxFulfillmentLength;
    jsonBody.details.type = 'condition';
  }

  return jsonBody;
}