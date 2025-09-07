# Use official Node (latest LTS) as base image
FROM node:20

# Set working directory
WORKDIR /app

# Install Python, Java (JDK), C++ compiler, and other dev tools
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    default-jdk \
    g++ make \
    git curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install dependencies (can include dev deps)
RUN npm install

# Copy your app code
COPY . .

# Expose a default port
EXPOSE 8000

# Default command (can be overridden)
CMD ["node", "index.js"]
















