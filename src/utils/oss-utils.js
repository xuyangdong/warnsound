'use strict';

var debug = require('debug')('ali-oss:object');
var utility = require('utility');
var crypto = require('crypto');
var fs = require('fs');
var is = require('is-type-of');
var destroy = require('destroy');
var eoe = require('end-or-error');
var urlutil = require('url');
var copy = require('copy-to');
var querystring = require('querystring');
var path = require('path');
var mime = require('mime');
var assert = require('assert');


var proto = module.exports;

proto.signatureUrl = function (name, options) {
  name = this._objectName(name);
  var params = {
    bucket: this.options.bucket,
    object: name
  };
  options = options || {};
  var expires = utility.timestamp() + (options.expires || 1800);
  var resource = this._getResource(params);
  var query = {};
  var signList = [];

  for (var k in options.response) {
    var key = 'response-' + k.toLowerCase();
    query[key] = options.response[k];
    signList.push(key + '=' + options.response[k]);
  }
  if (this.options.stsToken) {
    query['security-token'] = this.options.stsToken;
    signList.push('security-token=' + this.options.stsToken);
  }
  if (options.process){
    var processKeyword = 'x-oss-process';
    query[processKeyword] = options.process;
    var item = processKeyword + '=' + options.process;
    signList.push(item);
  }

  if (signList.length > 0) {
    signList.sort();
    resource += '?' + signList.join('&');
  }

  var stringToSign = [
    options.method || 'GET',
    options['content-md5'] || '', // Content-MD5
    options['content-type'] || '', // Content-Type
    expires,
    resource
  ].join('\n');
  var signature = this.signature(stringToSign);

  var url = urlutil.parse(this._getReqUrl(params));
  url.query = {
    OSSAccessKeyId: this.options.accessKeyId,
    Expires: expires,
    Signature: signature
  };
  copy(query).to(url.query);

  return url.format();
};
