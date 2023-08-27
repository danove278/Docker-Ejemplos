# Primera etapa
# Dependencias de Desarrollo (Aqui deescarga tanto las dependencias de desarrollo como de tests) 
FROM node:19.2-alpine3.16 as dependencias
# Usualmente se usa /app para el directorio de trabajo
# Es como hacer un cd /app osea que nos movemos a ese directorio 
WORKDIR /app 
# Vamos a copiar el archivo app.js y el archivo package.json al directorio /app dentro del contenedor 
COPY app.js package.json ./
# Usamos este comando para reconstruir los modulos de NODE (esto es propio de NODE)
# RUN es para ejecutar comandos  
RUN npm install

# Segunda etapa. Las etapas son marcadas por los FROM
# Build y Tests (Aqui testeamos la app)
FROM node:19.2-alpine3.16 as test
WORKDIR /app
# Cada etapa es independiente de la otra. En el siguiente paso estamos diciendo que vamos a copiar
# el node_modules de la etapa de arriba y la vamos a pegar en esta etapa
COPY --from=dependencias /app/node_modules ./node_modules
                                            # /app/node_modules (lo mismo)
# Aqui esta copiando todo del directorio actual de nuestro pc (exceptuando los 
# los que tenga el .dockerignore) a el directorio /app de la imagen. No es la mejor manera.
COPY . .     
# Este es para ejecutar los test de nuestro proyecto.
# Si al ejecutar los test da problema la imagen no se construye.
RUN npm test


# Tercera etapa
# Dependencias de produccion
FROM node:19.2-alpine3.16 as prod_depen
WORKDIR /app
COPY package.json ./
#Instalamos solo las dependencias de produccion
RUN npm install --prod 

# Cuarta etapa
# Ejecutar la app
FROM node:19.2-alpine3.16 as runner
WORKDIR /app 
COPY --from=prod_depen /app/node_modules ./node_modules
COPY app.js ./
# Yo no tengo el directorio tasks porque no estaba para ponerlo pero ahi es donde se guarda los tests
COPY tasks/ ./tasks
CMD [ "node", "app.js" ]

