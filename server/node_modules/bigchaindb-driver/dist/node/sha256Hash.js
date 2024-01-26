"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = sha256Hash;

var _jsSha = require("js-sha3");

// Copyright BigchainDB GmbH and BigchainDB contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

/* eslint-disable camelcase */
function sha256Hash(data) {
  return _jsSha.sha3_256.create().update(data).hex();
}
/* eslint-enable camelcase */