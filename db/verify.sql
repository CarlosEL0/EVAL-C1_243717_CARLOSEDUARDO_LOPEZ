services:
  db:
    image: postgres:15
    container_name: biblioteca_db
    env_file: .env
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5433:5432" # Puerto 5433 para acceso externo (tu PC)
    volumes:
      - ./db/schema.sql:/docker-entrypoint-initdb.d/1-schema.sql
      - ./db/seed.sql:/docker-entrypoint-initdb.d/2-seed.sql
      - ./db/reports_vw.sql:/docker-entrypoint-initdb.d/3-reports_vw.sql
      - ./db/indexes.sql:/docker-entrypoint-initdb.d/4-indexes.sql
      - ./db/roles.sql:/docker-entrypoint-initdb.d/5-roles.sql

  app:
    build: .
    container_name: biblioteca_app
    env_file: .env
    ports:
      - "3001:3000" # Dashboard accesible en http://localhost:3000
    depends_on:
      - db
    environment:
      # IMPORTANTE: Dentro de la red de Docker, el host de la DB es el nombre del servicio 'db'
      DB_HOST: db
      DB_PORT: 5432