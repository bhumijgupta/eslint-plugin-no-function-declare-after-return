"use strict";

/**
 * @fileoverview Rule to prevent function declaration after return
 * @author Bhumij Gupta
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
  },
  create: function (context) {
    return {
      ReturnStatement(node) {
        function complain(node, returnNode) {
          context.report({
            node,
            message:
              "Function declaration should be moved before return statement (on Line: {{returnNodeStartLine}})",
            data: {
              returnNodeStartLine: returnNode.loc.start.line,
            },
          });
        }
        const siblings = node.parent.body;
        // Skip cases such as return inside switch-case
        if (siblings === undefined) return;
        const currNodeIndex = siblings.indexOf(node);
        const numSiblings = siblings.length;
        for (let i = currNodeIndex + 1; i < numSiblings; i++) {
          if (siblings[i].type === "FunctionDeclaration") {
            complain(siblings[i], node);
          }
        }
      },
    };
  },
};
