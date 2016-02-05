/*!
 * Copyright 2010 - 2015 Pentaho Corporation.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "../shim/es6-promise"
], function() {
  "use strict";

  return {
    call: function(fun, ctx) {
      // Wrapping the call of `fun` this way
      // ensures that any sync Error flows to the outer promise.
      return new Promise(function(resolve) {
        resolve(fun.call(ctx));
      });
    },

    require: function(deps, localRequire) {
      var requireFun = localRequire || require;
      return new Promise(function(resolve, reject) {
        requireFun(deps, resolve, reject);
      });
    },

    "finally": function(promise, fun, ctx) {
      return promise.then(function(value) {
        fun.call(ctx);
        return value;
      }, function(reason) {
        fun.call(ctx);
        return Promise.reject(reason);
      });
    }
  };
});