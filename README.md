
<div align="center">
  <a href="https://quova.cc">
    <img src="https://r2.resynced.design/cdn/01JTTZSBNB68AC7XZTTYTA34QX.gif" alt="Quova" />
  </a>
</div>

# Quova.cc 🚀

*A clean, fast, and fully customizable biolink platform*

[![Visit My Portfolio](https://img.shields.io/badge/Portfolio-kars.bio-9c6fff?style=flat-square\&logo=vercel\&logoColor=white)](https://kars.bio)
[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/your-repo-link)

---

## 📌 Overview

**Quova.cc** is a biolink tool designed and developed by me for **ante**, with the goal of providing elegant user profiles, dashboarding, and bot-integrated features. It's currently in its early growth stage and already gaining recognition from larger online communities.

> This repository includes curated snippets of the codebase for portfolio/demo purposes. Full implementation is intentionally truncated.

---

## 🧠 Stack

> Built entirely in **TypeScript**

* **Database**: PostgreSQL (via Prisma)
* **Framework**: Next.js
* **Styling**: TailwindCSS
* **Auth**: Custom-built
* **Email**: MailGun
* **Deployment**: Vercel
* **Bot**: Discord.js
* **Bot DB**: SQLite w/ custom handler

---

## ⚙️ Features

* 🚪 Clean user onboarding flow
* 🎨 Fully customizable profiles & themes
* 📊 Dashboard with analytics
* 🧑‍💼 Admin panel for moderation & insights
* 🤖 Discord bot integration
* 🖼️ OG image generation
* 🗃️ Custom database manager
* 📁 File uploading
* 📈 Basic traffic and click tracking

---

## 🤖 Bot Structure (Truncated)

The Discord bot is modular and cleanly separated into:

* `commands/` → Organized by admin, dev, misc, and store commands
* `events/` → Guild & message-based triggers
* `handlers/` → Core logic: command, event, DB, API handling
* `utils/` → Helpers for embeds, bios, stats, leaderboard, etc.
* `data/` → SQLite DB, migrations, and schema

> The bot is designed to be lightweight but powerful — running role systems, user moderation, premium features, and leaderboard tracking.

---

## 📎 Notes

* Only partial code samples are included here. Full proprietary logic is not exposed.
* Docs via JSDoc are added where needed to clarify functionality.

---

## 🔗 More

Check it out live: [quova.cc](https://quova.cc)
Or browse more of my work at [kars.bio](https://kars.bio)
