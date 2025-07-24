// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);



import js from "@eslint/js";
import globals from "globals";

// Lab 8 – Section 4.1: General JavaScript security
import pluginSecurity from "eslint-plugin-security";

// Lab 8 – Section 4.2: Node.js-specific security
import pluginSecurityNode from "eslint-plugin-security-node";

// Lab 8 – Section 4.3: XSS / DOM-related security
import pluginNoUnsanitized from "eslint-plugin-no-unsanitized";

import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],

    // Enable browser globals for DOM (needed for no-unsanitized)
    languageOptions: {
      globals: globals.browser
    },

    // Register all relevant plugins
    plugins: {
      js,                                 // Base JavaScript linting
      security: pluginSecurity,           // eslint-plugin-security (4.1)
      "security-node": pluginSecurityNode, // eslint-plugin-security-node (4.2)
      "no-unsanitized": pluginNoUnsanitized // eslint-plugin-no-unsanitized (4.3)
    },

    rules: {
      // Recommended base rules
      ...js.configs.recommended.rules,

      // Lab 8 – 4.1: General JS security rules
      ...pluginSecurity.configs.recommended.rules,
      "security/detect-eval-with-expression": "error",

      // Lab 8 – 4.2: Node.js-specific security rules
      ...pluginSecurityNode.configs.recommended.rules,

      // Lab 8 – 4.3: DOM/XSS protection rules
      ...pluginNoUnsanitized.configs.recommended.rules,
      "no-unsanitized/method": "error",   // Flag dangerous DOM methods like document.write
      "no-unsanitized/property": "error"  // Flag innerHTML, outerHTML, etc.
    }
  }
]);
