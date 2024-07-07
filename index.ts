// Typescript version

const validateCommand = (command: string, allowedCommands: string[]): boolean => {
    return allowedCommands.includes(command.split(" ")[0]);
};

// SRI for CDN
const addSRItoCDNScript = (url: string, integrity: string): void => {
    const script = document.createElement('script');
    script.src = url;
    script.integrity = integrity;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
};

// CSRF Prevention
const generateCSRFToken = (): string => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const stringArray = Array.from(array, byte => String.fromCharCode(byte));
    return btoa(stringArray.join(''));
};


const setCSRFToken = (form: HTMLFormElement): void => {
    const token = generateCSRFToken();
    const csrfInput = form.querySelector('input[name="_csrf"]') as HTMLInputElement;
    csrfInput.value = token;
    document.cookie = `_csrf=${token}; Secure; SameSite=Strict`;
};

// HTTPS Enforcement
const enforceHTTPS = (): void => {
    if (window.location.protocol === 'http:') {
        window.location.href = window.location.href.replace('http:', 'https:');
    }
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = 'upgrade-insecure-requests';
    document.head.appendChild(meta);
};

// XSS Prevention
const escapeHTML = (str: string): string => {
    const escape: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, (match) => escape[match]);
};

const sanitiseHTML = (str: string): string => {
    const temp = document.createElement('div');
    temp.innerHTML = str;
    const scripts = temp.getElementsByTagName('script');
    while (scripts.length) {
        const script = scripts[0];
        if (script && script.parentNode) {
            script.parentNode.removeChild(script);
        }
    }
    return temp.innerHTML;
};

const sanitiseInput = (input: string): string => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
};

const isValidInput = (input: string): boolean => {
    const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    return !xssPattern.test(input);
};

// LDAP Injection Prevention
const escapeLDAP = (input: string): string => {
    const escapeMap: { [char: string]: string } = {
        '*': '\\2a',
        '(': '\\28',
        ')': '\\29',
        '\\': '\\5c',
        '\0': '\\00',
        '|': '\\7c'
    };

    return input.replace(/[*()\\\0|]/g, char => escapeMap[char]);
};

// SQL Injection Prevention
const escapeSQL = (input: string): string => {
    return input.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
        switch (char) {
            case "\0": return "\\0";
            case "\x08": return "\\b";
            case "\x09": return "\\t";
            case "\x1a": return "\\z";
            case "\n": return "\\n";
            case "\r": return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%": return "\\" + char;
            default: return char;
        }
    });
};

// HTTP Parameter Pollution Prevention
const sanitiseParameters = (params: URLSearchParams): URLSearchParams => {
    const uniqueParams = new URLSearchParams();
    for (const [key, value] of params.entries()) {
        if (!uniqueParams.has(key)) {
            uniqueParams.append(key, value);
        }
    }
    return uniqueParams;
};

const validateHTTPMethod = (method: string, allowedMethods: string[]): boolean => {
    return allowedMethods.includes(method.toUpperCase());
};


// Header Injection Prevention
const sanitiseHeader = (header: string): string => {
    return header.replace(/[\r\n]/g, '');
};

// XML Injection Prevention
const sanitiseXML = (input: string): string => {
    return input.replace(/[<>&'"]/g, (char) => {
        switch (char) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return char;
        }
    });
};

// SSL/TLS Validation
const validateSSLCertificate = (url: string): void => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error('Invalid SSL/TLS configuration');
        }
    };
    xhr.send();
};


// CSP Setting
const setCSP = (directives: { [key: string]: string }): void => {
    const csp = Object.entries(directives)
        .map(([key, value]) => `${key} ${value}`)
        .join('; ');

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = csp;
    document.head.appendChild(meta);
};

export {
    addSRItoCDNScript,
    escapeHTML,
    escapeLDAP,
    escapeSQL,
    enforceHTTPS,
    generateCSRFToken,
    isValidInput,
    sanitiseHeader,
    sanitiseHTML,
    sanitiseInput,
    sanitiseParameters,
    sanitiseXML,
    setCSRFToken,
    setCSP,
    validateCommand,
    validateHTTPMethod,
    validateSSLCertificate
};
