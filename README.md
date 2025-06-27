# 🌦️ NestJS Weather Logger Service

A simple NestJS service that fetches real-time weather data for multiple cities every 10 seconds using the [wttr.in](https://wttr.in) API and logs the data into:

- `weather-log.txt`: Human-readable text log
- `weather-log.json`: Structured JSON log

---

## 🚀 Features

- ⏲️ Scheduled weather fetch every 10 seconds using `@nestjs/schedule`
- 🌍 Supports  cities (e.g., London, New York, Tokyo)
- 📝 Logs data in both `.txt` and `.json` format
- 🔒 Handles API errors gracefully

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/UserName/Weahter-Logs-Project.git.git
cd Weather-Logs-Project

# Install dependencies
npm install
