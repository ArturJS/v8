// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --opt

(function() {
  var resolve, value;
  (new Promise(r => resolve = r)).then(v => value = v);
  function foo() { resolve(1); }
  foo();
  foo();
  %OptimizeFunctionOnNextCall(foo);
  foo();
  setTimeout(_ => assertEquals(1, value));
})();

(function() {
  var reject, value;
  (new Promise((_, r) => reject = r)).catch(v => value = v);
  function foo() { reject(1); }
  foo();
  foo();
  %OptimizeFunctionOnNextCall(foo);
  foo();
  setTimeout(_ => assertEquals(1, value));
})();
