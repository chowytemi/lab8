// === Plugin 1: eslint-plugin-security ===
// Rule: detect-eval-with-expression
const expression = '2 + 2';
eval(`console.log(${expression})`); //  Should be flagged by security plugin

// Rule: detect-new-buffer
const unsafeBuffer = Buffer('unsafe'); //  Unsafe usage without 'new'

// === Plugin 2: eslint-plugin-security-node ===
// Rule: detect-child-process
import { exec } from 'child_process';
exec('ls -la'); //  Unsafe use of child_process (could be user-controlled input)

// Rule: detect-insecure-cookies (example case: insecure Set-Cookie)
const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Set-Cookie', 'sessionId=12345'); //  Missing secure/HttpOnly flags
  res.end('Hello world');
});
server.listen(3000);

// === Plugin 3: eslint-plugin-no-unsanitized ===
// Rule: no-unsanitized/property
const userInput = "<img src=x onerror=alert('XSS')>";
document.getElementById("output").innerHTML = userInput; //  DOM XSS

// Rule: no-unsanitized/method
document.write("<script>alert('XSS')</script>"); //  Unsafe method injection
