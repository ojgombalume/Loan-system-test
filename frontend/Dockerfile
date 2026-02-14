FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port (Railway will override with $PORT)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
