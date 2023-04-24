
// validate email
export function ValidateEmail(email) {
    // Regular expression to check for valid email addresses
    const emailRegex = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z]{2,}/;
    
    // Test the email against the regex and return a boolean value
    return emailRegex.test(email);
  }
