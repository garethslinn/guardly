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
} = require('../dist/index');

describe('Guardly Helper Methods', () => {
    it('escapeHTML should escape special characters', () => {
        const input = '<div>Test & "escape"</div>';
        const expectedOutput = '&lt;div&gt;Test &amp; &quot;escape&quot;&lt;/div&gt;';
        expect(escapeHTML(input)).toBe(expectedOutput);
    });

    it('sanitiseHTML should remove potentially dangerous HTML', () => {
        const input = '<script>alert("XSS")</script><div>Safe</div>';
        const output = sanitiseHTML(input);
        expect(output).not.toContain('<script>');
        expect(output).toContain('<div>Safe</div>');
    });

    it('generateCSRFToken should generate a valid CSRF token', () => {
        const token = generateCSRFToken();
        expect(token).toHaveLength(24);
    });

    it('setCSRFToken should set a CSRF token in the form and cookie', () => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: ''
        });

        document.body.innerHTML = '<form id="form"><input type="hidden" name="_csrf" value=""></form>';
        const form = document.getElementById('form');
        setCSRFToken(form);
        const csrfInput = form.querySelector('input[name="_csrf"]').value;
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('_csrf')).split('=')[1];
        expect(csrfInput.replace(/=+$/, '')).toBe(csrfCookie.replace(/=+$/, ''));
    });

    it('enforceHTTPS should redirect to HTTPS', () => {
        const originalLocation = window.location;
        delete window.location;
        window.location = { protocol: 'http:', href: 'http://example.com' };

        enforceHTTPS();
        expect(window.location.href).toBe('https://example.com');

        window.location = originalLocation;
    });

    it('validateSSLCertificate should log an error for invalid SSL/TLS', () => {
        const mockOpen = jest.fn();
        const mockSend = jest.fn();
        const mockSetRequestHeader = jest.fn();

        const mockXhr = {
            open: mockOpen,
            send: mockSend,
            setRequestHeader: mockSetRequestHeader,
            readyState: 4,
            status: 404,
            onreadystatechange: null
        };

        global.XMLHttpRequest = jest.fn(() => mockXhr);

        console.error = jest.fn();

        const url = 'https://example.com';
        validateSSLCertificate(url);

        mockXhr.onreadystatechange();

        expect(console.error).toHaveBeenCalledWith('Invalid SSL/TLS configuration');
    });

    it('addSRItoCDNScript should add script with SRI attributes', () => {
        document.head.innerHTML = '';
        addSRItoCDNScript('https://cdn.example.com/library.js', 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux5J3t3PEaNYCpAnG5P1FZCOm/S6Sni');
        const script = document.head.querySelector('script');
        expect(script).not.toBeNull();
        expect(script.src).toBe('https://cdn.example.com/library.js');
        expect(script.integrity).toBe('sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux5J3t3PEaNYCpAnG5P1FZCOm/S6Sni');
        expect(script.crossOrigin).toBe('anonymous');
    });

    it('setCSP should set a Content-Security-Policy meta tag', () => {
        document.head.innerHTML = '';
        setCSP({
            'default-src': "'self'",
            'script-src': "'self' https://trusted.cdn.com",
            'style-src': "'self' https://trusted.styles.com",
            'img-src': "'self' https://trusted.images.com"
        });

        const meta = document.head.querySelector('meta[http-equiv="Content-Security-Policy"]');
        expect(meta).not.toBeNull();
        expect(meta.content).toBe("default-src 'self'; script-src 'self' https://trusted.cdn.com; style-src 'self' https://trusted.styles.com; img-src 'self' https://trusted.images.com");
    });

    it('isValidInput should validate input correctly', () => {
        const safeInput = 'Hello, World!';
        const unsafeInput = '<script>alert("XSS")</script>';
        expect(isValidInput(safeInput)).toBe(true);
        expect(isValidInput(unsafeInput)).toBe(false);
    });

    it('sanitiseInput should sanitise user input', () => {
        const mockCreateElement = jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
            const element = document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
            if (tagName === 'div') {
                Object.defineProperty(element, 'innerText', {
                    set(value) {
                        this.textContent = value;
                    },
                    get() {
                        return this.textContent;
                    },
                });
            }
            return element;
        });

        const input = '<script>alert("XSS")</script>Hello';
        const sanitised = sanitiseInput(input);
        console.log(`sanitised output: ${sanitised}`);
        expect(sanitised).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;Hello');

        mockCreateElement.mockRestore();
    });

    it('escapeLDAP should escape LDAP special characters', () => {
        const input = 'admin*()\\|';
        const expectedOutput = 'admin\\2a\\28\\29\\5c\\7c';
        const result = escapeLDAP(input);
        console.log(`LDAP input: ${input}, LDAP output: ${result}`);
        expect(result).toBe(expectedOutput);
    });

    it('escapeSQL should escape SQL special characters', () => {
        const input = "' OR '1'='1";
        const expectedOutput = "\\' OR \\'1\\'=\\'1";
        expect(escapeSQL(input)).toBe(expectedOutput);
    });

    it('sanitiseParameters should remove duplicate query parameters', () => {
        const params = new URLSearchParams("id=123&id=456");
        const sanitisedParams = sanitiseParameters(params);
        console.log(`sanitised parameters: ${sanitisedParams.toString()}`);
        expect(sanitisedParams.toString()).toBe('id=123');
    });

    it('validateCommand should validate command against allowed commands', () => {
        const validCommand = 'ls -la';
        const invalidCommand = 'rm -rf /';
        const allowedCommands = ["ls", "ping", "whoami"];
        expect(validateCommand(validCommand, allowedCommands)).toBe(true);
        expect(validateCommand(invalidCommand, allowedCommands)).toBe(false);
    });

    it('validateHTTPMethod should validate HTTP methods', () => {
        const validMethod = 'POST';
        const invalidMethod = 'TRACE';
        const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
        expect(validateHTTPMethod(validMethod, allowedMethods)).toBe(true);
        expect(validateHTTPMethod(invalidMethod, allowedMethods)).toBe(false);
    });

    it('sanitiseHeader should remove newline characters from headers', () => {
        const header = "Content-Type: text/html\r\nContent-Length: 0";
        const sanitisedHeader = sanitiseHeader(header);
        expect(sanitisedHeader).toBe('Content-Type: text/htmlContent-Length: 0');
    });

    it('sanitiseXML should escape XML special characters', () => {
        const input = '<user><name>John & Doe</name></user>';
        const expectedOutput = '&lt;user&gt;&lt;name&gt;John &amp; Doe&lt;/name&gt;&lt;/user&gt;';
        expect(sanitiseXML(input)).toBe(expectedOutput);
    });
});
