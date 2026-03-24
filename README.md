# Advanced Discord.js v14 Bot Template

A production-ready, highly modular, and scalable Discord.js v14 bot template written in JavaScript. Designed with professional best practices, featuring auto-loading handlers, MongoDB integration, and premium-style utilities.

## 🚀 Features

- **Discord.js v14**: Leveraging the latest features and Slash Commands.
- **MongoDB & Mongoose**: Built-in database support with a clean schema structure.
- **Modular Architecture**: 
  - **Command Handler**: Automatically loads and deploys slash commands from categories.
  - **Event Handler**: Seamlessly manages multiple event listeners.
  - **Component Handler**: [NEW] Dedicated loader for Buttons, Select Menus, and Modals.
- **Advanced Systems**:
  - **Cooldown Manager**: Prevent command spam with per-user cooldowns.
  - **Permission System**: Easy-to-use permission checks within command files.
  - **Presence Manager**: [NEW] Automatic rotation of bot activity/status.
  - **Autocomplete Support**: [NEW] Built-in handling for dynamic slash command suggestions.
  - **i18n (Locales)**: [NEW] Basic internationalization system for multi-language bots.
- **Premium Utilities**:
  - **Winston Logger**: Professional logging with console and file transports.
  - **Custom Embeds**: Success, Error, Info, and Warning styles for a consistent UI.
- **Error Resilience**: Catches `unhandledRejection` and `uncaughtException` to keep the bot alive.

## 📁 Project Structure

```text
├── Commands/       # Organized slash commands
├── Components/     # Buttons, Menus, & Modals
├── Events/         # Bot event listeners
├── Handlers/       # Core loaders (CMDs, Events, Components, DB)
├── Locales/        # i18n translation files (JSON)
├── Models/         # Mongoose schemas
├── Utils/          # Reusable helper classes
├── Logs/           # Bot error & activity logs
├── .env            # Private configuration
├── index.js        # Entry point
└── README.md       # Project documentation
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js v16.11.0 or higher
- A Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))
- A MongoDB Connection String

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arpandevv/Discord.js-v14-Template.git
   cd Discord.js-v14-Template
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Rename `.env.example` to `.env`.
   - Fill in your `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID` (optional), and `MONGODB_URI` (optional).

## 🚀 Running the Bot

- **Start the bot:**
  ```bash
  node index.js
  ```
- **Commands deployment:** The bot automatically deploys commands to the specified Guild ID (for instant testing) or globally on startup.

## 🛡️ License

This project is licensed under the MIT License.

---
*Created with ❤️ for the Discord developer community by arpandevv.*

Test pull request change
