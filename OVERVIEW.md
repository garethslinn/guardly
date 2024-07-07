### Security Methods, Threats, Safeguards, and Relevant Methods

This list provides brief explanations of various security methods used in front-end development, the main threats they address, how these threats are generally safeguarded against, and the relevant methods available in the guardly library.

1. **XSS (Cross-Site Scripting)**
   - **Explanation**: Escape or sanitize HTML input to prevent cross-site scripting attacks.
   - **Threat**: Malicious scripts injected into web pages.
   - **Safeguard**: Escape special characters in user inputs.
   - **Methods**: `escapeHTML`, `sanitiseHTML`

2. **CSRF (Cross-Site Request Forgery)**
   - **Explanation**: Generate and set CSRF tokens to protect against cross-site request forgery attacks.
   - **Threat**: Unauthorized actions submitted on behalf of authenticated users.
   - **Safeguard**: Use CSRF tokens to ensure requests are from authenticated users.
   - **Methods**: `generateCSRFToken`, `setCSRFToken`

3. **HTTPS (HyperText Transfer Protocol Secure) Enforcement**
   - **Explanation**: Redirect HTTP requests to HTTPS to ensure secure communication.
   - **Threat**: Eavesdropping and man-in-the-middle attacks.
   - **Safeguard**: Redirect all traffic to HTTPS.
   - **Methods**: `enforceHTTPS`

4. **SSL/TLS (Secure Sockets Layer / Transport Layer Security) Validation**
   - **Explanation**: Validate the SSL/TLS configuration for a specified URL to ensure secure connections.
   - **Threat**: Insecure connections allowing interception and tampering.
   - **Safeguard**: Check and validate SSL/TLS certificates.
   - **Methods**: `validateSSLCertificate`

5. **CSP (Content Security Policy) Setting**
   - **Explanation**: Set Content-Security-Policy headers to prevent various types of attacks by controlling resources the user agent is allowed to load.
   - **Threat**: Resource loading of malicious scripts and data.
   - **Safeguard**: Define policies for allowed resources via CSP headers.
   - **Methods**: `setCSP`

6. **Command Injection Prevention**
   - **Explanation**: Validate allowed commands to prevent command injection vulnerabilities.
   - **Threat**: Execution of arbitrary commands on the server.
   - **Safeguard**: Restrict commands to a predefined safe list.
   - **Methods**: `validateCommand`

7. **SQL Injection Prevention**
   - **Explanation**: Escape SQL input to prevent SQL injection attacks.
   - **Threat**: Unauthorized access and manipulation of the database.
   - **Safeguard**: Escape and validate SQL inputs.
   - **Methods**: `escapeSQL`

8. **LDAP (Lightweight Directory Access Protocol) Injection Prevention**
   - **Explanation**: Escape LDAP input to prevent LDAP injection attacks.
   - **Threat**: Unauthorized access and manipulation of LDAP queries.
   - **Safeguard**: Escape special characters in LDAP queries.
   - **Methods**: `escapeLDAP`

9. **HTTP Verb Tampering Prevention**
   - **Explanation**: Validate allowed HTTP methods to prevent HTTP verb tampering.
   - **Threat**: Use of disallowed HTTP methods to bypass security controls.
   - **Safeguard**: Restrict HTTP methods to a predefined safe list.
   - **Methods**: `validateHTTPMethod`

10. **Header Injection Prevention**
    - **Explanation**: Sanitize headers to remove newline characters and prevent header injection attacks.
    - **Threat**: Injection of malicious headers causing security issues.
    - **Safeguard**: Remove newline characters from header values.
    - **Methods**: `sanitiseHeader`

11. **XML (Extensible Markup Language) Injection Prevention**
    - **Explanation**: Escape XML input to prevent XML injection attacks.
    - **Threat**: Injection of malicious XML content.
    - **Safeguard**: Escape special characters in XML inputs.
    - **Methods**: `sanitiseXML`

12. **SRI (Subresource Integrity) for CDN (Content Delivery Network)**
    - **Explanation**: Add Subresource Integrity (SRI) attributes to CDN scripts to ensure resource integrity.
    - **Threat**: Loading of tampered or malicious CDN resources.
    - **Safeguard**: Use SRI to verify resource integrity.
    - **Methods**: `addSRItoCDNScript`

13. **HTTP Parameter Pollution Prevention**
    - **Explanation**: Sanitize URL parameters to prevent HTTP parameter pollution attacks.
    - **Threat**: Manipulation of HTTP parameters to exploit the application.
    - **Safeguard**: Ensure unique and sanitized parameters.
    - **Methods**: `sanitiseParameters`

14. **Input Validation**
    - **Explanation**: Validate and sanitize user input to prevent various types of injection attacks and ensure input safety.
    - **Threat**: Injection of malicious content via user input.
    - **Safeguard**: Validate and sanitize all user inputs to remove harmful content.
    - **Methods**: `sanitiseInput`, `isValidInput`
