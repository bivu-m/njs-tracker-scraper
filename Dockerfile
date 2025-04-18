# Use Playwright base image with all required dependencies
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy only the package files first for caching
COPY package.json package-lock.json* ./

# Install node dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the Express server
CMD ["npm", "start"]
