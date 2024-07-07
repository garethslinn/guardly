<img src="https://github.com/garethslinn/guardly-img/blob/main/guardly.png" alt="Guardly Logo" width="300px" />

# Guardly
Guardly is a JavaScript/TypeScript library that provides a suite of security helper methods designed to enhance the security of web applications. It includes methods for preventing common web vulnerabilities such as XSS, CSRF, SQL Injection, LDAP Injection, HTTP Parameter Pollution, and more.

## Features

- **XSS Prevention**: Escape and sanitise HTML input.
- **CSRF Prevention**: Generate and set CSRF tokens.
- **HTTPS Enforcement**: Ensure HTTPS protocol usage.
- **SSL/TLS Validation**: Validate SSL/TLS configurations.
- **CSP Setting**: Set Content-Security-Policy meta tags.
- **Command Injection Prevention**: Validate allowed commands.
- **SQL Injection Prevention**: Escape SQL special characters.
- **LDAP Injection Prevention**: Escape LDAP special characters.
- **HTTP Verb Tampering Prevention**: Validate HTTP methods.
- **Header Injection Prevention**: sanitise headers.
- **XML Injection Prevention**: sanitise XML input.
- **SRI for CDN**: Add Subresource Integrity (SRI) to CDN scripts.
- **HTTP Parameter Pollution Prevention**: sanitise URL parameters.
- **Input Validation**: Validate and sanitise user inputs.

## Installation
Install Guardly via npm:

```bash
npm install guardly
```

## Run
See the RUNBOOK file for details.

## Usage
***
Import the library into your project:

```javascript
const {
    escapeHTML,
    sanitiseHTML,
    generateCSRFToken,
    setCSRFToken,
    enforceHTTPS,
    validateSSLCertificate,
    addSRItoCDNScript,
    setCSP,
    isValidInput,
    sanitiseInput,
    escapeLDAP,
    escapeSQL,
    sanitiseParameters,
    validateCommand,
    validateHTTPMethod,
    sanitiseHeader,
    sanitiseXML
} = require('guardly');
```

## Examples
***

### XSS Prevention

```javascript
const input = '<div>Test & "escape"</div>';
const escapedOutput = escapeHTML(input); // '&lt;div&gt;Test &amp; &quot;escape&quot;&lt;/div&gt;'

const htmlInput = '<script>alert("XSS")</script><div>Safe</div>';
const sanitisedOutput = sanitiseHTML(htmlInput); // '<div>Safe</div>'
```

### CSRF Prevention

```javascript
const token = generateCSRFToken();
console.log(token); // Outputs a 24 character token

document.body.innerHTML = '<form id="form"><input type="hidden" name="_csrf" value=""></form>';
const form = document.getElementById('form');
setCSRFToken(form); // Sets the CSRF token in the form and in the cookie
```

### HTTPS Enforcement
```javascript
enforceHTTPS(); // Redirects to HTTPS if the current protocol is HTTP
```

### SSL/TLS Validation
```javascript
const url = 'https://example.com';
validateSSLCertificate(url); // Validates SSL/TLS configuration for the provided URL
```

### CSP Setting
```javascript
setCSP({
    'default-src': "'self'",
    'script-src': "'self' https://trusted.cdn.com",
    'style-src': "'self' https://trusted.styles.com",
    'img-src': "'self' https://trusted.images.com"
});
// Sets a Content-Security-Policy meta tag
```

### Command Injection Prevention
```javascript
const allowedCommands = ["ls", "ping", "whoami"];
const command = "ls -la";
const isValid = validateCommand(command, allowedCommands); // true
```

### SQL Injection Prevention
```javascript
const userInput = "' OR '1'='1";
const escapedInput = escapeSQL(userInput); // "\\' OR \\'1\\'=\\'1"
```

### LDAP Injection Prevention
```javascript
const ldapInput = 'admin*()\\|';
const escapedLDAPInput = escapeLDAP(ldapInput); // 'admin\\2a\\28\\29\\5c\\7c'
```

### HTTP Verb Tampering Prevention
```javascript
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
const method = "POST";
const isMethodValid = validateHTTPMethod(method, allowedMethods); // true
```

### Header Injection Prevention
```javascript
const header = "Content-Type: text/html\r\nContent-Length: 0";
const sanitisedHeader = sanitiseHeader(header); // 'Content-Type: text/htmlContent-Length: 0'
```

### XML Injection Prevention
```javascript
const xmlInput = '<user><name>John & Doe</name></user>';
const sanitisedXML = sanitiseXML(xmlInput); // '&lt;user&gt;&lt;name&gt;John &amp; Doe&lt;/name&gt;&lt;/user&gt;'
```

### SRI for CDN
```javascript
addSRItoCDNScript('https://cdn.example.com/library.js', 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux5J3t3PEaNYCpAnG5P1FZCOm/S6Sni');
// Adds a script tag with SRI attributes to the document head
```

### HTTP Parameter Pollution Prevention
```javascript
const params = new URLSearchParams("id=123&id=456");
const sanitisedParams = sanitiseParameters(params);
console.log(sanitisedParams.toString()); // 'id=123'
```

### Input Validation
```javascript
const userInput = '<script>alert("XSS")</script>Hello';
const sanitised = sanitiseInput(userInput);
console.log(sanitised); // '&lt;script&gt;alert("XSS")&lt;/script&gt;Hello'

const safeInput = 'Hello, World!';
const unsafeInput = '<script>alert("XSS")</script>';
console.log(isValidInput(safeInput)); // true
console.log(isValidInput(unsafeInput)); // false
```

## Running Tests
To run the tests for Guardly, use the following command:

```bash
npm test
```

##License
This project is licensed under the MIT License - see the LICENSE file for details.

