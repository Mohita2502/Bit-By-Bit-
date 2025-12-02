# Ethical, Legal, and Security Considerations

**Team Members:**  
- Fotios Bampouridis  
- Joshua Delshad  
- Moh Prajapati  
- Fazlul Faizal  
- Eitan Abrishami  

---

## Ethical Issues

### Identify any ethical concerns related to your software
The **BitByBit e-commerce website** involves important ethical responsibilities, especially regarding user trust, data handling, and fair business practices. Since it collects users’ details such as profiles, purchase history, and browsing activity, it’s important to be transparent about how that information is used.  

The platform should avoid misleading marketing, provide honest product information, and ensure user data isn’t misused or sold unfairly. By maintaining clear privacy policies, secure payment systems, and strong data protection, **BitByBit** aims to create a fair, honest, and trustworthy experience for all users.

---

### Does your software meet users' privacy expectations?
**BitByBit** is built to protect users' privacy by collecting only the information that’s truly needed and keeping it safe at all times. The website clearly explains how data is collected, used, and stored through its privacy policy.  

All sensitive details, such as payment information, are encrypted to prevent unauthorized access. Users also have full control over their accounts and can delete their personal data whenever they choose. **BitByBit** never shares information with third parties without clear permission, ensuring users feel secure and respected while using the platform.

---

### Could your software result in discrimination based on race, gender, religion, or other factors? How does your software address these concerns?
The website was created to sell video games, and our team members come from many different backgrounds. We will **never intentionally use our platform to discriminate** against any person.  

However, we cannot control what content video game publishers include in their games. Sometimes, certain game content may disturb or offend groups of people. We will do our best to ensure that all games sold on our site **follow the same rules and regulations set by the ESRB** and other relevant agencies.

---

### Can your software be misused by some users to harm others or the public? How do you prevent this?
Though there is little possibility for misuse, we will ensure that **any public user actions (comments, posts, listings)** are monitored.  

All comments and game publications will be **carefully vetted** to ensure they meet community and industry guidelines. Hate speech in comments or reviews will **not be tolerated** and may lead to account suspension.  

Additionally, **all game and hardware listings** will be reviewed and approved by our team to prevent **fake listings or scams**.

---

## Legal Issues

### Identify any legal concerns related to your software
The main legal concerns include:  
- The use of third-party APIs  
- Intellectual property from game publishers  
- User data privacy  
- Potential for user misuse  

Because the app handles user accounts and payments, compliance with **privacy, data protection, and e-commerce regulations** (e.g., GDPR, CCPA, PCI DSS) is required. Displaying copyrighted materials such as game images and logos must follow their respective owners’ rules.

---

### Is your software complying with all licensing agreements?
Yes, our software must comply with all licensing agreements.  

**Third-party software and services include:**
- **LangChain (MIT License):** Commercial use permitted; license notice must be retained.  
- **RAWG API (Public API):** Provides game metadata and images. Must include “Data provided by RAWG.io” and cannot resell data.  
- **Stripe / PayPal SDKs:** Used for secure payment processing; must comply with their developer terms.  
- **React Native Libraries:** Used for app development; all are open source (MIT or Apache 2.0 licenses).  

All software will be used according to their respective licenses, and credit or attribution will be provided when required.

---

### Are there any intellectual property constraints from your client or the owner of some dataset you need to use?
Yes, mainly related to the API.  

Game titles, images, and logos are owned by their respective publishers (e.g., **Sony, Nintendo, Microsoft**). The app will **only display legally obtained content** via the RAWG API or with explicit permission from rights owners.

---

### Can your users use your app to break the law or post copyrighted works?
Without proper security, users could attempt to:  
- Upload or share copyrighted materials without permission  
- Steal or modify database information (e.g., prices or reviews)  
- Perform unauthorized or fraudulent transactions  

To prevent this, **strict moderation, secure APIs, and encrypted databases** are implemented.

---

## Security Issues

As **GameStart** is an e-commerce mobile application, it ensures that all user data is transferred securely using **HTTPS connections** and encrypted with **JSON Web Tokens (JWT)**. Sensitive data will be protected using **AES-256 or SHA-256** encryption on the server.  

The application may also integrate **Android Keystore / iOS Keychain** to secure storage, along with **input sanitization** to prevent bugs or data leaks.

---

### Authentication and Authorization
Risks include:  
- Stolen credentials  
- Weak passwords  
- Unauthorized admin access  

**Solutions:**  
- Hash passwords using **Argon2**  
- Enforce **rate limiting** to block excessive login attempts  
- Implement **session expiration** for tokens or cookies  
- Consider **multi-factor authentication** for stronger protection  

---

### API Vulnerabilities
Potential threats:  
- **SQL Injection**  
- **XSS (Cross-Site Scripting)**  
- **CSRF (Cross-Site Request Forgery)**  

**Mitigation Strategies:**  
- Implement **CORS (Cross-Origin Resource Sharing)** to block unauthorized requests  
- Use **parameterized SQL queries** and verify them through database drivers  
- Sanitize all user input before processing  

---

### Mobile-Specific Threats
Mobile apps can face **APK reverse engineering** risks. To prevent this, we will **obfuscate the code** and restrict debug access.

---

### Payment Security
To secure payments:  
- Use **industry-standard, PCI-compliant payment gateways** (e.g., Stripe, PayPal)  
- **Tokenize card data** to avoid storing sensitive information  
- Prevent **replay attacks** using timestamps to confirm payment timing  

---

**In summary, BitByBit prioritizes ethical transparency, legal compliance, and robust cybersecurity to ensure a safe and fair e-commerce experience for all users.**
