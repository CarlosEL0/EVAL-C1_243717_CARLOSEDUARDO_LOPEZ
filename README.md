# **Evaluación Práctica Unidad 1 - AWOS y BDA**

Este proyecto consiste en una aplicación de reportes para una biblioteca desarrollada en **Next.js (TypeScript)** y **PostgreSQL**. La solución está completamente dockerizada y aplica seguridad mediante roles restringidos y vistas analíticas.

---

## **Escenario: Gestión de Reportes de Biblioteca**
Como responsable de reportes, se implementó un dashboard para analizar préstamos, morosidad, multas, actividad de socios e inventario, permitiendo búsquedas, filtros y paginación .

---

## **Requisitos Obligatorios**

### **A) Base de Datos (db/)**
Se implementó un modelo de 5 tablas con integridad referencial completa en la carpeta `db/` :
* **Archivos**: `schema.sql`, `seed.sql` y `reports_vw.sql`.
* **Tablas**: `members`, `books`, `copies`, `loans` y `fines`.
* **Datos**: El archivo `seed.sql` inserta registros suficientes para demostrar el funcionamiento de filtros y la paginación de los reportes.

### **B) VIEWS (db/reports_vw.sql)**
Se crearon las 5 vistas analíticas requeridas con la lógica solicitada:
1.  **`vw_most_borrowed_books`**: Ranking mediante **Window Function** (`DENSE_RANK`). Incluye búsqueda y paginación.
2.  **`vw_overdue_loans`**: Análisis de morosidad con **CTE** y cálculo de multas mediante **CASE**.
3.  **`vw_fines_summary`**: Resumen mensual con filtros de fecha y uso de **HAVING**.
4.  **`vw_member_activity`**: Análisis de puntualidad con **HAVING** y manejo de nulos con **COALESCE**.
5.  **`vw_inventory_health`**: Salud operativa mediante agregados y lógica **CASE/COALESCE**.

### **C) Índices (db/indexes.sql)**
Se optimizó el rendimiento con 3 índices clave [cite: 310-313]:
* **Evidencia**: Se verificó el uso de `Index Scan` mediante `EXPLAIN ANALYZE` en la consulta de búsqueda de libros .

### **D) Seguridad (db/roles.sql)**
La aplicación no utiliza el usuario `postgres`. Se configuró un rol específico:
* [cite_start]**Rol**: `bibliotecario_app` .
* **Restricción**: Solo tiene permiso de `SELECT` sobre las **VIEWS**. El acceso a las tablas base está bloqueado para garantizar la seguridad de los datos .

### **E) Next.js (App Router)**
La interfaz fue desarrollada siguiendo el estándar de Next.js :
* **Dashboard**: Pantalla principal con acceso a los 5 reportes.
* **Reportes**: Cada pantalla incluye descripción del insight, tabla de datos y al menos un **KPI destacado**.
***Seguridad**: El fetch de datos se realiza **Server-Side** (Server Components), protegiendo las credenciales del lado del cliente.

### **F) Filtros y Paginación**
* **Búsqueda/Filtros**: Implementados en los reportes de libros y morosidad con validación mediante la librería **Zod**.
* **Paginación**: Implementación server-side con `LIMIT` y `OFFSET` para optimizar la carga de datos .

### **G) Docker Compose**
El sistema se despliega con un solo comando :
y responde en la ruta http://localhost:3001/dashboard

```bash
docker compose up --build