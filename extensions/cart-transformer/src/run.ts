// @ts-check

/*
The function reads the cart. Any item with a custom image attribute will be used
to generate an update operation with a custom title and the specified image URL.
*/

/**
 * @typedef {import("../generated/api").Input} Input
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {Input} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const operations = input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */
    (acc, cartLine) => {
      const updateOperation = optionallyBuildUpdateOperation(cartLine);

      if (updateOperation) {
        return [...acc, { update: updateOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
}

/**
 * @param {Input['cart']['lines'][number]} cartLine
 */
function optionallyBuildUpdateOperation(cartLine) {
  if (cartLine.custom_image_attribute?.value) {
    return {
      cartLineId: cartLine.id,
      image: {
        url: cartLine.custom_image_attribute.value
      },
      title: "Bundle title updated"
    };
  }

  return null;
}