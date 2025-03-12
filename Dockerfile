# Use the official Node.js image as the base
FROM node:iron-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3030

# Start the application
CMD ["node", "./server.js"]
