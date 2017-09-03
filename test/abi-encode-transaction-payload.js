/* eslint-env mocha */

"use strict";

var assert = require("chai").assert;
var fix = require("../src/fix");
var unfork = require("../src/unfork");
var abiEncodeTransactionPayload = require("../src/abi-encode-transaction-payload");

describe("abiEncodeTransactionPayload", function () {
  var test = function (t) {
    it(t.name + "(" + JSON.stringify(t.params) + ":" + t.signature + ") -> " + t.expected, function () {
      assert.strictEqual(abiEncodeTransactionPayload(t), t.expected);
    });
  };
  describe("No parameters", function () {
    test({
      name: "ten",
      signature: [],
      expected: "0x643ceff9"
    });
    test({
      name: "faucet",
      signature: [],
      expected: "0xde5f72fd"
    });
    test({
      name: "getBranches",
      signature: [],
      expected: "0xc3387858"
    });
  });
  describe("Single int256 parameter", function () {
    test({
      name: "getDescription",
      signature: ["int256"],
      params: ["0xe64fcc433c2cd3292766aa5c9af64f6f9c6d73ada01fce0bfba4a9952af16bf7"],
      expected: "0x37e7ee00"+
                "e64fcc433c2cd3292766aa5c9af64f6f9c6d73ada01fce0bfba4a9952af16bf7"
    });
    test({
      name: "double",
      signature: ["int256"],
      params: [3],
      expected: "0x6ffa1caa"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "getMarkets",
      signature: ["int256"],
      params: [1010101],
      expected: "0xb3903c8a"+
                "00000000000000000000000000000000000000000000000000000000000f69b5"
    });
    test({
      name: "getVotePeriod",
      signature: ["int256"],
      params: [1010101],
      expected: "0x7a66d7ca"+
                "00000000000000000000000000000000000000000000000000000000000f69b5"
    });
    test({
      name: "getDescription",
      signature: ["int256"],
      params: ["0xb2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c"],
      expected: "0x37e7ee00"+
                "b2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c"
    });
    test({
      name: "getEventInfo",
      signature: ["int256"],
      params: ["0xb2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c"],
      expected: "0x1aecdb5b"+
                "b2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c"
    });
  });
  describe("Multiple int256 parameters", function () {
    test({
      name: "multiply",
      signature: ["int256", "int256"],
      params: [2, 3],
      expected: "0x3c4308a8"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "sendReputation",
      signature: ["int256", "int256", "int256"],
      params: [
        1010101,
        "0x6fc0a64e2dce367e35417bfd1568fa35af9f3e4b",
        fix("5").toFixed()
      ],
      expected: "0xa677135c"+
                "00000000000000000000000000000000000000000000000000000000000f69b5"+
                "0000000000000000000000006fc0a64e2dce367e35417bfd1568fa35af9f3e4b"+
                "0000000000000000000000000000000000000000000000004563918244f40000"
    });
  });
  describe("Single int256[] parameter", function () {
    test({
      name: "double",
      signature: ["int256[]"],
      params: [[3]],
      expected: "0x08de53e9"+
                "0000000000000000000000000000000000000000000000000000000000000020"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "double",
      signature: ["int256[]"],
      params: [[2, 3]],
      expected: "0x08de53e9"+
                "0000000000000000000000000000000000000000000000000000000000000020"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "double",
      signature: ["int256[]"],
      params: [[4, 7]],
      expected: "0x08de53e9"+
                "0000000000000000000000000000000000000000000000000000000000000020"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000004"+
                "0000000000000000000000000000000000000000000000000000000000000007"
    });
    test({
      name: "double",
      signature: ["int256[]"],
      params: [[1, 2, 3]],
      expected: "0x08de53e9"+
                "0000000000000000000000000000000000000000000000000000000000000020"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
  });
  describe("Multiple int256[] parameters", function () {
    test({
      name: "testMethod",
      signature: ["int256[]", "int256[]"],
      params: [[1, 2], [3, 4]],
      expected: "0x24c55417"+
                "0000000000000000000000000000000000000000000000000000000000000040"+
                "00000000000000000000000000000000000000000000000000000000000000a0"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000004"
    });
  });
  describe("Mixed parameters", function () {
    test({
      name: "testMethod",
      signature: ["bytes", "int256", "int256[]"],
      params: ["gavofyork", 1, [1, 2, 3]],
      expected: "0x542b5456"+
                "0000000000000000000000000000000000000000000000000000000000000060"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "00000000000000000000000000000000000000000000000000000000000000a0"+
                "0000000000000000000000000000000000000000000000000000000000000009"+
                "6761766f66796f726b0000000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "testMethod",
      signature: ["bytes", "int256", "int256[]"],
      params: ["\u2603", 1, [1, 2, 3]], // ☃
      expected: "0x542b5456"+
                "0000000000000000000000000000000000000000000000000000000000000060"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "00000000000000000000000000000000000000000000000000000000000000a0"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "e298830000000000000000000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "testMethod",
      signature: ["bytes", "int256", "int256[]"],
      params: ["\u20ac", 1, [1, 2, 3]], // €
      expected: "0x542b5456"+
                "0000000000000000000000000000000000000000000000000000000000000060"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "00000000000000000000000000000000000000000000000000000000000000a0"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "e282ac0000000000000000000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "testMethod",
      signature: ["bytes", "int256", "int256[]"],
      params: ["\u6f22\u5b57", 1, [1, 2, 3]], // 漢字
      expected: "0x542b5456"+
                "0000000000000000000000000000000000000000000000000000000000000060"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "00000000000000000000000000000000000000000000000000000000000000a0"+
                "0000000000000000000000000000000000000000000000000000000000000006"+
                "e6bca2e5ad970000000000000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"
    });
    test({
      name: "createMarket",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256[]"],
      params: [1, "gavofyork", 2, 3, 4, [5, 6, 7]],
      expected: "0x08d19b3f"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "00000000000000000000000000000000000000000000000000000000000000c0"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000004"+
                "0000000000000000000000000000000000000000000000000000000000000100"+
                "0000000000000000000000000000000000000000000000000000000000000009"+
                "6761766f66796f726b0000000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "0000000000000000000000000000000000000000000000000000000000000005"+
                "0000000000000000000000000000000000000000000000000000000000000006"+
                "0000000000000000000000000000000000000000000000000000000000000007"
    });
    test({
      name: "slashRep",
      signature: ["int256", "int256", "int256", "int256[]", "int256"],
      params: [
        "0x38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991",
        "1170",
        "1337",
        [1, 2, 1, 1],
        "0x63524e3fe4791aefce1e932bbfb3fdf375bfad89"
      ],
      expected: "0x660a246c"+
                "38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991"+
                "0000000000000000000000000000000000000000000000000000000000000492"+
                "0000000000000000000000000000000000000000000000000000000000000539"+
                "00000000000000000000000000000000000000000000000000000000000000a0"+
                "00000000000000000000000063524e3fe4791aefce1e932bbfb3fdf375bfad89"+
                "0000000000000000000000000000000000000000000000000000000000000004"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000001"
    });
    test({
      name: "createEvent",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256"],
      params: [
        "0x38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991",
        "my event", 250000, 1, 2, 2
      ],
      expected: "0x130dd1b3"+
                "38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991"+
                "00000000000000000000000000000000000000000000000000000000000000c0"+
                "000000000000000000000000000000000000000000000000000000000003d090"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000008"+
                "6d79206576656e74000000000000000000000000000000000000000000000000"
    });
    test({
      name: "createEvent",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256", "int256"],
      params: [
        "0x38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991",
        "augur ragefest 2015", 250000, 1, 2, 2, 165
      ],
      expected: "0xf0061fd5"+
                "38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991"+
                "00000000000000000000000000000000000000000000000000000000000000e0"+
                "000000000000000000000000000000000000000000000000000000000003d090"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "00000000000000000000000000000000000000000000000000000000000000a5"+
                "0000000000000000000000000000000000000000000000000000000000000013"+
                "6175677572207261676566657374203230313500000000000000000000000000"
    });
    test({
      name: "createEvent",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256", "int256"],
      params: [
        "0x3d595622e5444dd258670ab405b82a467117bd9377dc8fa8c4530528242fe0c5",
        "Will Jack win the June 2015 augur Breakdancing Competition?",
        800029, 0, 1, 2, "165"
      ],
      expected: "0xf0061fd5"+
                "3d595622e5444dd258670ab405b82a467117bd9377dc8fa8c4530528242fe0c5"+
                "00000000000000000000000000000000000000000000000000000000000000e0"+
                "00000000000000000000000000000000000000000000000000000000000c351d"+
                "0000000000000000000000000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "0000000000000000000000000000000000000000000000000000000000000002"+
                "00000000000000000000000000000000000000000000000000000000000000a5"+
                "000000000000000000000000000000000000000000000000000000000000003b"+
                "57696c6c204a61636b2077696e20746865204a756e6520323031352061756775"+
                "7220427265616b64616e63696e6720436f6d7065746974696f6e3f0000000000"
    });
    test({
      name: "createMarket",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256[]"],
      params: [
        "0x38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991",
        "market for ragefests",
        "0x1000000000000000",
        "0x2800000000000000000",
        "0x400000000000000",
        ["0xb2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c",
          "0x4f37814757b7d0e2dde46de18bb4bf4a85e6716a06849d5cfcebf8f1d7270b12",
          "0x412b3c588f9be08d54e99bf5095ef910c5e84080f048e3af8a2718b7b693cb83"]
      ],
      expected: "0x08d19b3f"+
                "38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991"+
                "00000000000000000000000000000000000000000000000000000000000000c0"+
                "0000000000000000000000000000000000000000000000001000000000000000"+
                "0000000000000000000000000000000000000000000002800000000000000000"+
                "0000000000000000000000000000000000000000000000000400000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000100"+
                "0000000000000000000000000000000000000000000000000000000000000014"+
                "6d61726b657420666f7220726167656665737473000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "b2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c"+
                "4f37814757b7d0e2dde46de18bb4bf4a85e6716a06849d5cfcebf8f1d7270b12"+
                "412b3c588f9be08d54e99bf5095ef910c5e84080f048e3af8a2718b7b693cb83"
    });
    test({
      name: "createMarket",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256[]", "int256"],
      params: [
        "0x38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991",
        "market for ragefests",
        "0x1000000000000000",
        "0x2800000000000000000",
        "0x400000000000000",
        ["0xb2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c",
          "0x4f37814757b7d0e2dde46de18bb4bf4a85e6716a06849d5cfcebf8f1d7270b12",
          "0x412b3c588f9be08d54e99bf5095ef910c5e84080f048e3af8a2718b7b693cb83"],
        "165"
      ],
      expected: "0x8df6a0cc"+
                "38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991"+
                "00000000000000000000000000000000000000000000000000000000000000e0"+
                "0000000000000000000000000000000000000000000000001000000000000000"+
                "0000000000000000000000000000000000000000000002800000000000000000"+
                "0000000000000000000000000000000000000000000000000400000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000120"+
                "00000000000000000000000000000000000000000000000000000000000000a5"+
                "0000000000000000000000000000000000000000000000000000000000000014"+
                "6d61726b657420666f7220726167656665737473000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000003"+
                "b2a6de45f349b5ac384b01a785e640f519f0a8597ab2031c964c7f572d96b13c"+
                "4f37814757b7d0e2dde46de18bb4bf4a85e6716a06849d5cfcebf8f1d7270b12"+
                "412b3c588f9be08d54e99bf5095ef910c5e84080f048e3af8a2718b7b693cb83"
    });

    // negative event hash
    test({
      name: "createMarket",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256[]", "int256"],
      params: [
        "0x38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991",
        "unicorns are real",
        "0x10000000000000000",
        "0xa0000000000000000",
        "0xa0000000000000000",
        [unfork("-0x2ae31f0184fa3e11a1517a11e3fc6319cb7c310cee36b20f8e0263049b1f3a6f", true)],
        "165"
      ],
      expected: "0x8df6a0cc"+
                "38a820692912b5f7a3bfefc2a1d4826e1da6beaed5fac6de3d22b18132133991"+
                "00000000000000000000000000000000000000000000000000000000000000e0"+
                "0000000000000000000000000000000000000000000000010000000000000000"+
                "00000000000000000000000000000000000000000000000a0000000000000000"+
                "00000000000000000000000000000000000000000000000a0000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000120"+
                "00000000000000000000000000000000000000000000000000000000000000a5"+
                "0000000000000000000000000000000000000000000000000000000000000011"+
                "756e69636f726e7320617265207265616c000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "d51ce0fe7b05c1ee5eae85ee1c039ce63483cef311c94df071fd9cfb64e0c591"
    });
    test({
      print: true,
      name: "createMarket",
      signature: ["int256", "bytes", "int256", "int256", "int256", "int256[]", "int256"],
      params: [
        1010101,
        "Will the Sun turn into a red giant and engulf the Earth by the end of 2015?",
        fix("0.0079", "hex"),
        1000,
        fix("0.02", "hex"),
        [unfork("-0x29ccc80fb51d4a6cf0855251cbca882f6afea3a93e12b3722d2401fccddc41f2", true)],
        "10000"
      ],
      expected: "0x8df6a0cc"+
                "00000000000000000000000000000000000000000000000000000000000f69b5"+
                "00000000000000000000000000000000000000000000000000000000000000e0"+
                "000000000000000000000000000000000000000000000000001c110215b9c000"+
                "00000000000000000000000000000000000000000000000000000000000003e8"+
                "00000000000000000000000000000000000000000000000000470de4df820000"+
                "0000000000000000000000000000000000000000000000000000000000000160"+
                "0000000000000000000000000000000000000000000000000000000000002710"+
                "000000000000000000000000000000000000000000000000000000000000004b"+
                "57696c6c207468652053756e207475726e20696e746f20612072656420676961"+
                "6e7420616e6420656e67756c6620746865204561727468206279207468652065"+
                "6e64206f6620323031353f000000000000000000000000000000000000000000"+
                "0000000000000000000000000000000000000000000000000000000000000001"+
                "d63337f04ae2b5930f7aadae343577d095015c56c1ed4c8dd2dbfe033223be0e"
    });
  });
});
