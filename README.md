# 🤖 FARVO Prompt

**FARVO Prompt** is an AI-powered prompt generation platform by **FARVO Digital Company**. It helps users create clear, detailed and ready-to-use prompts for AI tools such as **ChatGPT, Gemini and Claude**.

Users can simply describe what they need in **English, Tamil, Sinhala, Hindi or Tanglish**, and FARVO Prompt generates an optimized prompt based on their requirements.

🔗 **Live site:** https://farvo-prompt.vercel.app

---

## ✨ Features

* 📝 AI-style prompt generator with **5 detail levels**
* 🌍 Supports **English, Tamil, Sinhala, Hindi and Tanglish**
* 🖼️ **Image to Prompt** — analyzes an uploaded image directly in the browser and generates a prompt
* ✨ **Prompt Enhancer** for improving existing prompts
* 💪 **Prompt Strength Check** to evaluate prompt quality
* 📚 Ready-to-use **Prompt Templates**
* 💾 **Saved Prompt Library** with search and edit functionality
* 🕘 **Prompt History** for previously generated prompts
* 🔐 User **Accounts and Authentication**
* 🌙 **Light and Dark Themes**
* ⭐ **Public Reviews**
* 📩 **Contact Form** for contacting FARVO
* 📱 Fully responsive interface for desktop, tablet and mobile
* ⚡ Fast deployment using **Vercel Serverless Functions**

---

## 🛠️ Tech Stack

| Layer                | Technology                                         |
| -------------------- | -------------------------------------------------- |
| Frontend             | HTML, CSS, JavaScript                              |
| Backend              | Vercel Serverless Functions (`/api`)               |
| AI Prompt Processing | JavaScript-based prompt generation and enhancement |
| Image Analysis       | Browser-based image analysis                       |
| Email                | Resend                                             |
| Reviews Storage      | Upstash Redis                                      |
| Hosting              | Vercel                                             |

---

## 📁 Project Structure

```text
FARVO-Prompt/
├── api/                    # Vercel serverless API routes
├── assets/                 # Images, icons and other assets
├── css/                    # Stylesheets
├── js/                     # Frontend JavaScript files
├── index.html              # Main application page
├── .env.example            # Environment variable template
├── vercel.json             # Vercel configuration
└── README.txt              # Project documentation
```

---

## 🧩 Main Modules

### 📝 Prompt Generator

Users can describe their requirement in natural language and FARVO Prompt converts it into a structured, ready-to-paste prompt.

The generator supports different detail levels so users can choose how simple or detailed the generated prompt should be.

### 🖼️ Image to Prompt

Users can upload an image and FARVO Prompt analyzes the image in the browser to help create a descriptive prompt.

This can be useful for:

* AI image generation
* Image recreation
* Design inspiration
* Photography prompts
* UI/UX references
* Creative editing instructions

### ✨ Prompt Enhancer

Users can paste an existing prompt and improve its clarity, structure and level of detail.

### 💪 Prompt Strength Check

The strength checker helps users understand whether their prompt contains enough useful information and provides guidance for improving it.

### 📚 Prompt Templates

Users can explore ready-made prompt templates for different use cases and quickly customize them for their own needs.

### 💾 Prompt Library

Users can save generated prompts into their personal library.

The library supports:

* Saving prompts
* Searching prompts
* Editing prompts
* Managing saved prompts

### 🕘 History

Previously generated prompts can be accessed through the prompt history, making it easier to reuse or review earlier work.

---

## 🌍 Supported Languages

FARVO Prompt is designed to understand requests written in:

* 🇬🇧 English
* 🇱🇰 Tamil
* 🇱🇰 Sinhala
* 🇮🇳 Hindi
* 💬 Tanglish

Users can describe what they need naturally instead of having to write a technically structured prompt themselves.

---

## 📩 Contact & Reviews

FARVO Prompt includes a contact system that allows users to send messages directly to the project owner.

The application also provides a public review system where users can submit reviews and feedback.

**Resend** is used for sending contact emails, while **Upstash Redis** is used to store reviews.

---

## ⚙️ Environment Variables

Copy `.env.example` and configure the required environment variables.

| Variable         | Required | Description                                    |
| ---------------- | -------- | ---------------------------------------------- |
| `RESEND_API_KEY` | ✅        | Resend API key used for sending contact emails |
| `CONTACT_TO`     | ✅        | Email address that receives contact messages   |

Reviews require an **Upstash Redis** connection configured through Vercel.

> ⚠️ Never commit real API keys or secret environment variables to GitHub.

---

## 💻 Run Locally

For the basic frontend, open `index.html` directly in a browser.

```text
1. Clone the repository.
2. Open the project folder.
3. Open index.html in a browser.
```

For features that use the backend API, such as **Contact** and **Reviews**, the deployed Vercel API configuration is required.

---

## 🚀 Deploy on Vercel

1. Push the repository to GitHub.
2. Go to Vercel and import the repository.
3. Select **Other** as the framework preset if required.
4. Deploy the project.
5. Open **Settings → Environment Variables**.
6. Add:

```text
RESEND_API_KEY
CONTACT_TO
```

7. For the Reviews system, add **Upstash Redis** through Vercel Storage and connect it to the project.
8. Redeploy the project after configuring the environment variables.
9. Open the deployed URL and test the application.

🔗 **Live application:** https://farvo-prompt.vercel.app

---

## 🔐 Security

* API keys are stored using environment variables.
* Secret credentials should not be committed to the repository.
* Contact functionality uses a serverless API instead of exposing the email configuration in frontend code.
* Image analysis is performed in the user's browser.

---

## 🎯 Purpose of the Project

FARVO Prompt was created to make **prompt engineering easier for everyone**.

Instead of spending time learning complicated prompt structures, users can simply explain what they want and receive a more structured prompt that can be copied and used with modern AI platforms.

The project is especially useful for:

* 👨‍💻 Developers
* 🎨 Designers
* 📚 Students
* 👨‍🏫 Teachers
* 📱 Content creators
* 💼 Freelancers
* 🏢 Businesses
* 🤖 AI users

---

## 👨‍💻 Author

**Mohamed Farhan**
Full Stack Web Developer & UI/UX Designer
**Founder — FARVO Digital Company**

* 🔗 LinkedIn: https://linkedin.com/in/mohamedfarhan-it
* 🐙 GitHub: https://github.com/ItzzFarhanGit
* 🌐 FARVO Digital: https://farvodigital.netlify.app
* 📧 Email: [farhanfarvo@gmail.com](mailto:farhanfarvo@gmail.com)

---

## 📄 License

This project is created for **learning, development and portfolio purposes**.

If you plan to make the project open-source, add an appropriate license file to the repository.

---

Built with ❤️ by **FARVO Digital Company**

🌐 https://farvodigital.netlify.app
