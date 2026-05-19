# ✅ Base image
FROM node:20

# ✅ Working directory
WORKDIR /app

# ✅ Install dependencies
COPY package*.json ./
RUN npm install

# ✅ Copy project files
COPY . .

# ✅ Build Next.js app
RUN npm run build

# ✅ Expose port
EXPOSE 3000

# ✅ Start Next.js
CMD ["npm", "run", "start"]
