# Use official Playwright base image with all dependencies
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first (for caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy remaining project files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your app
CMD ["npm", "start"]
