# Use the official Playwright image with Chromium installed
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Install necessary dependencies for running Chromium
RUN apt-get update && apt-get install -y \
  libnss3 libatk-bridge2.0-0 libatk1.0-0 libx11-xcb1 libxcomposite1 libxrandr2 \
  libgbm1 libasound2 libnspr4

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory's contents into the container's working directory
COPY . .

# Install application dependencies
RUN npm install

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
