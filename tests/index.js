"use strict";

let rule = require("../lib/no-function-declare-after-return");
let RuleTester = require("eslint").RuleTester;

let ruleTester = new RuleTester();
ruleTester.run("no-function-declare-after-return", rule, {
  valid: [
    {
      // Should not throw error for switch case returns
      code: `
      function test(len) {
        switch (len) {
          case 1:
          case 2:
            return "hi";
          case 3:
            return "hello";
          default:
            return "hey";
        }
      }`,
    },
    {
      // Should not show error for function declaration before return
      code: `function test() {
        function sayHello() {
          return "Hello";
        }
        return {
          helloFunc: sayHello,
        };
      }`,
    },
  ],
  invalid: [
    // Generic case
    {
      code: `function test() {
        return {
          helloFunc: sayHello,
        };
        function sayHello() {
          return "Hello";
        }
      }`,
      output: `function test() {
        function sayHello() {
          return "Hello";
        };
return {
          helloFunc: sayHello,
        };
        
      }`,
      errors: [
        {
          message:
            "Function declaration should be moved before return statement (on Line: 2)",
        },
      ],
    },
    // Test for multiple nested errors
    {
      code: `function demo(){
        return nested;
        function nested(){
          return nested2;
          function nested2(){
            console.log("hello")
          }
        }
      }`,
      // Seems like ESlint doesn't want to do closures in a single round of fixing
      output: `function demo(){
        function nested(){
          return nested2;
          function nested2(){
            console.log("hello")
          }
        };
return nested;
        
      }`,
      errors: [
        {
          message:
            "Function declaration should be moved before return statement (on Line: 2)",
        },
        {
          message:
            "Function declaration should be moved before return statement (on Line: 4)",
        },
      ],
    },
  ],
});
