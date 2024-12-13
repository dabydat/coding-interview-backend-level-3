FROM node:20

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# # Set `DEVCONTAINER` environment variable to help with orientation
# ENV DEVCONTAINER=true

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración
COPY ../package*.json ./
COPY ../tsconfig.json ./
COPY ../.env ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY ../ .

# Compilar el proyecto
RUN npm run build

# Eliminar dependencias de desarrollo
RUN npm prune --production

# Establecer la variable de entorno DEVCONTAINER
ENV DEVCONTAINER=true

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]