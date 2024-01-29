FROM node:20.11.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install vite@latest
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 80 for the application
EXPOSE 80

# Command to run the application
CMD ["npm", "start"]