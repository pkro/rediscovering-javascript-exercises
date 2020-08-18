'use strict';

const { log, assert } = console;

// 1
// 1 - false / 2 - false / 3 - false / 4 - true / 5 - false

// 2
// when using other names for exporting in names exports than the ones used in the code

// 3
// "default" / no individual name

// 4
// export * from 'some-module'
// -> export all named exports from 'some module' in current module so it can be imported from the current module instead of 'some-module'

// 5
// import defaultExport, * as fasttrack from 'fasttrack'
