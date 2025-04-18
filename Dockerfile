# ✅ Use official Playwright image with Chromium pre-installed
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# ✅ Set working directory
WORKDIR /app

# ✅ Copy all files
COPY . .

# ✅ Install Node.js dependencies
RUN npm install

# ✅ Expose the port your app runs on
EXPOSE 3000

# ✅ Start your Node.js app
CMD ["node", "api.js"]
