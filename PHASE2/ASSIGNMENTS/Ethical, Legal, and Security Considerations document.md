# Team BitByBit — GameStart Gaming Marketplace
## Ethical, Legal, and Security Considerations
### Phase 2: Advanced Features & AI Integration

**Team Members:** Fotios Bampouridis · Joshua Delshad · Moh Prajapati · Fazlul Faizal · Eitan Abrishami

---

## Ethical Issues

### Identify any ethical concerns related to your software

The BitByBit e-commerce website involves important ethical responsibilities, especially regarding user trust, data handling, and fair business practices. Since it collects users' details such as profiles, purchase history, and browsing activity, it is important to be transparent about how that information is used.

The platform should avoid misleading marketing, provide honest product information, and ensure user data is not misused or sold unfairly. By maintaining clear privacy policies, secure payment systems, and strong data protection, BitByBit aims to create a fair, honest, and trustworthy experience for all users.

#### AI Ethics — Transparency & Fairness

Phase 2 introduces three AI-driven systems that directly influence user experience. The following ethical principles govern their use:

- **Transparency:** Users are clearly informed when AI is generating recommendations or responses, so they understand the basis of suggestions made to them.
- No sensitive personal data is used for AI model training. All user analytics are anonymized and aggregated before any processing.
- Critical decisions — such as refund escalations — are escalated to human review rather than decided by AI alone.
- All AI systems comply with GDPR and CCPA data-handling requirements.

---

### Does your software meet users' privacy expectations?

BitByBit is built to protect users' privacy by collecting only the information that is truly needed and keeping it safe at all times. The website clearly explains how data is collected, used, and stored through its privacy policy.

All sensitive details, such as payment information, are encrypted to prevent unauthorized access. Users also have full control over their accounts and can delete their personal data whenever they choose. BitByBit never shares information with third parties without clear permission, ensuring users feel secure and respected while using the platform.

#### AI Data Privacy

The AI systems introduced in Phase 2 are designed with privacy as a core requirement:

- The Game Recommendation Engine and Email Personalization systems analyze behavioral signals (searches, views, purchases) in anonymized, aggregated form only.
- The Customer Support Chatbot retains conversation history only for the duration of a session and does not store identifiable transcripts.
- No user data is sold to or shared with third-party AI providers, as all models (Mistral-7B-Instruct, Flan-T5-Large, DistilBERT) are run on our own infrastructure.

---

### Could your software result in discrimination based on race, gender, religion, or other factors?

The website was created to sell video games, and our team members come from many different backgrounds. We will never intentionally use our platform to discriminate against any person.

However, we cannot control what content video game publishers include in their games. Sometimes, certain game content may disturb or offend groups of people. We will do our best to ensure that all games sold on our site follow the same rules and regulations set by the ESRB and other relevant agencies.

#### AI Recommendation Bias

AI recommendation systems can inadvertently reinforce demographic biases if not carefully designed. BitByBit addresses this by:

- Basing recommendations on individual behavior signals (genres, platforms, tags) rather than group demographics.
- Regularly auditing recommendation outputs for systematic disparities across user segments.
- Ensuring email marketing campaigns do not target or exclude users based on protected characteristics.

---

### Can your software be misused by some users to harm others or the public?

Though there is little possibility for misuse, we will ensure that any public user actions (comments, posts, listings) are monitored. All comments and game publications will be carefully vetted to ensure they meet community and industry guidelines. Hate speech in comments or reviews will not be tolerated and may lead to account suspension.

Additionally, all game and hardware listings will be reviewed and approved by our team to prevent fake listings or scams.

#### AI-Specific Misuse Risks

The Customer Support Chatbot introduces a surface for potential misuse. Safeguards include:

- Intent detection to identify abusive or manipulative queries before they are processed.
- Rate limiting on chatbot interactions to prevent automated abuse.
- Smart escalation to human agents when the bot detects queries outside its scope or potentially harmful intent.
- Email marketing workflows include opt-out mechanisms compliant with CAN-SPAM and GDPR.

---

## Legal Issues

### Identify any legal concerns related to your software

The main legal concerns include the use of third-party APIs, intellectual property from game publishers, user data privacy, and potential for user misuse. Because the app handles user accounts and payments, compliance with privacy, data protection, and e-commerce regulations (e.g., GDPR, CCPA, PCI DSS) is required. Displaying copyrighted materials such as game images and logos must follow their respective owners' rules.

#### AI-Related Legal Concerns (Phase 2)

The integration of LLM-powered systems in Phase 2 introduces additional legal considerations:

- **Open-Source Model Licenses:** All three AI models are free and open-source. Mistral-7B-Instruct, Flan-T5-Large, and DistilBERT are all used under Apache 2.0 licenses. Commercial use is permitted under all three, provided license notices are retained.
- **AI-Generated Content Liability:** Automated emails and chatbot responses generated by LLMs must not contain false advertising claims, unauthorized use of third-party trademarks, or misleading product information.
- **Automated Decision-Making Disclosure:** Under GDPR Article 22, users have the right not to be subject to solely automated decisions that significantly affect them. Our human-oversight escalation policy ensures compliance.

---

### Is your software complying with all licensing agreements?

Yes, our software must comply with all licensing agreements. Third-party software and services include:

- **LangChain (MIT License):** Commercial use permitted; license notice must be retained.
- **RAWG API (Public API):** Provides game metadata and images. Must include "Data provided by RAWG.io" and cannot resell data.
- **Stripe / PayPal SDKs:** Used for secure payment processing; must comply with their developer terms.
- **React Native Libraries:** Used for app development; all are open source (MIT or Apache 2.0 licenses).
- **Mistral-7B-Instruct (Apache 2.0):** Free for commercial use; license and attribution notice required.
- **Flan-T5-Large (Apache 2.0):** Free for commercial use; no restrictions on output content ownership.
- **Hugging Face DistilBERT (Apache 2.0):** Free for commercial use; model card attribution recommended.

All software will be used according to their respective licenses, and credit or attribution will be provided when required.

---

### Are there any intellectual property constraints from your client or dataset owners?

Yes, mainly related to the API. Game titles, images, and logos are owned by their respective publishers (e.g., Sony, Nintendo, Microsoft). The app will only display legally obtained content via the RAWG API or with explicit permission from rights owners.

#### AI-Generated Content & IP

LLM-generated email copy and chatbot responses are original outputs and do not reproduce copyrighted source material. However:

- The Email Personalization system references game titles and pricing, which must accurately reflect current listings to avoid misrepresentation.
- AI-generated content that inadvertently reproduces protected text will be caught through output filtering before delivery to users.

---

### Can your users use your app to break the law or post copyrighted works?

Without proper security, users could attempt to upload or share copyrighted materials without permission, steal or modify database information (e.g., prices or reviews), or perform unauthorized or fraudulent transactions. To prevent this, strict moderation, secure APIs, and encrypted databases are implemented.

---

## Security Issues

As GameStart is an e-commerce mobile application, it ensures that all user data is transferred securely using HTTPS connections and encrypted with JSON Web Tokens (JWT). Sensitive data will be protected using AES-256 or SHA-256 encryption on the server. The application may also integrate Android Keystore / iOS Keychain to secure storage, along with input sanitization to prevent bugs or data leaks.

### Authentication and Authorization

Risks include stolen credentials, weak passwords, and unauthorized admin access. Solutions:

- Hash passwords using **Argon2**.
- Enforce rate limiting to block excessive login attempts.
- Implement session expiration for tokens or cookies.
- Consider multi-factor authentication for stronger protection.

---

### API Vulnerabilities

Potential threats include SQL Injection, XSS (Cross-Site Scripting), and CSRF (Cross-Site Request Forgery). Mitigation strategies:

- Implement CORS (Cross-Origin Resource Sharing) to block unauthorized requests.
- Use parameterized SQL queries and verify them through database drivers.
- Sanitize all user input before processing.

#### AI API Security

The LLM systems introduce additional API attack surfaces that require dedicated mitigations:

- **Prompt Injection:** The Customer Support Chatbot validates and sanitizes all user-supplied input before it is passed to the Mistral-7B-Instruct model, preventing adversarial prompt injection attacks.
- **Model Output Sanitization:** All LLM outputs are filtered for malicious content, PII leakage, and off-topic responses before being returned to users.
- **Rate Limiting on AI Endpoints:** AI-powered endpoints (chatbot, recommendations, email generation) are rate-limited per user session to prevent abuse and control compute costs.
- **Internal Model Hosting:** By running all three models on internal Azure/AWS infrastructure, user data never leaves our controlled environment to third-party AI providers.

---

### Mobile-Specific Threats

Mobile apps can face APK reverse engineering risks. To prevent this, we will obfuscate the code and restrict debug access.

### Payment Security

To secure payments:

- Use industry-standard, PCI-compliant payment gateways (e.g., Stripe, PayPal).
- Tokenize card data to avoid storing sensitive information.
- Prevent replay attacks using timestamps to confirm payment timing.

---

## AI Integration: Success Metrics & Business Impact

Phase 2 deploys three LLM-powered systems across the full user journey.

### AI System Overview

| AI System | Purpose | LLM Technology |
|---|---|---|
| Game Recommendation Engine | Personalized game discovery | DistilBERT + Collaborative Filtering |
| Smart Customer Support Chatbot | 24/7 conversational assistance | Mistral-7B-Instruct (Free) |
| Email Marketing Personalization | Automated targeted campaigns | Flan-T5-Large (Free) |

### Performance Targets

| AI System | Key Metric | Target |
|---|---|---|
| Recommendation Engine | Click-through rate | 15%+ |
| Recommendation Engine | Conversion lift | 10%+ |
| Customer Support Chatbot | Response time | <2 seconds |
| Customer Support Chatbot | User satisfaction | 4.0+ / 5.0 |
| Customer Support Chatbot | Support ticket reduction | 30%+ |
| Email Marketing | Open rate | 25–35% |
| Email Marketing | Click rate | 3–8% |
| Email Marketing | ROI | 5:1 |

### AI Ethics Summary

- **Data Privacy:** No sensitive personal data is used for AI training.
- **Anonymization:** All user analytics are anonymized and aggregated.
- **Transparency:** Clear explanations of how AI recommendations work are provided to users.
- **Human Oversight:** Critical decisions are escalated to human review.
- **Compliance:** All systems are GDPR and CCPA compliant.

---

*In summary, BitByBit prioritizes ethical transparency, legal compliance, and robust cybersecurity to ensure a safe and fair e-commerce experience for all users — including the responsible and transparent deployment of AI technologies throughout Phase 2.*
