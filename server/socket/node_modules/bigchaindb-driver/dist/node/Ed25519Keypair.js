"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = Ed25519Keypair;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _bs = _interopRequireDefault(require("bs58"));

var _tweetnacl = require("tweetnacl");

// Copyright BigchainDB GmbH and BigchainDB contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

/**
 * @public
 * Ed25519 keypair in base58 (as BigchainDB expects base58 keys)
 * @type {Object}
 * @param {Buffer} [seed] A seed that will be used as a key derivation function
 * @property {string} publicKey
 * @property {string} privateKey
 */
function Ed25519Keypair(seed) {
  var _context;

  var keyPair = seed ? _tweetnacl.sign.keyPair.fromSeed(seed) : _tweetnacl.sign.keyPair();
  this.publicKey = _bs.default.encode(Buffer.from(keyPair.publicKey)); // tweetnacl's generated secret key is the secret key + public key (resulting in a 64-byte buffer)

  this.privateKey = _bs.default.encode(Buffer.from((0, _slice.default)(_context = keyPair.secretKey).call(_context, 0, 32)));
}