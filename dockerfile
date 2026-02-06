# Usa una imagen de Node.js ligera
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Expone el puerto que usa Next.js
EXPOSE 3000

# Comando para iniciar en modo desarrollo (ideal para la evaluación)
CMD ["npm", "run", "dev"]