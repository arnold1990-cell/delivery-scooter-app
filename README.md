# Scooter Management & Ride-Sharing Application

A full-stack, production-ready starter for a modern scooter fleet platform inspired by Bolt, Lime, and Uber Scooters.

## Tech Stack

**Backend**: Java 21, Spring Boot 3, Spring Security, JWT, JPA (Hibernate), WebSockets (STOMP), OpenAPI/Swagger

**Database**: PostgreSQL

**Frontend**: React + Vite, TypeScript, Tailwind CSS

**DevOps**: Docker, Docker Compose

**Testing**: JUnit 5, Mockito

## Architecture Highlights

- Clean layered architecture: Controller → Service → Repository → DTOs
- UUID primary keys
- Auditing (`createdAt`, `updatedAt`)
- JWT authentication + RBAC (ADMIN, RIDER, DRIVER)
- WebSocket support for live ride updates
- RESTful API design + OpenAPI docs

## Project Structure

```
backend/   # Spring Boot API
frontend/  # React client
```

## Running locally

### 1) Start PostgreSQL + services with Docker Compose

```bash
docker compose up --build
```

- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- Frontend: http://localhost:5173

### 2) Run Backend (without Docker)

```bash
cd backend
./mvnw spring-boot:run
```

### 3) Run Frontend (without Docker)

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Backend:

- `DB_URL` (default `jdbc:postgresql://localhost:5432/scooter`)
- `DB_USER` (default `scooter`)
- `DB_PASSWORD` (default `scooter`)
- `JWT_SECRET` (default `change-me-in-prod`)

Frontend:

- `VITE_API_URL` (default `http://localhost:8080`)

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Users
- `GET /api/users/me`

### Scooters
- `GET /api/scooters`
- `GET /api/scooters/available`
- `POST /api/scooters` (ADMIN)
- `PUT /api/scooters/{scooterId}` (ADMIN)

### Rides
- `POST /api/rides/start`
- `POST /api/rides/{rideId}/end`
- `GET /api/rides`

### Payments
- `POST /api/payments/rides/{rideId}`
- `GET /api/payments`

### Admin
- `GET /api/admin/metrics` (ADMIN)

### Notifications
- `GET /api/notifications`

### WebSockets
- `/ws` STOMP endpoint
- `/topic/rides` broadcast topic

## Sample Data

Use these values to create sample scooters:

```json
{
  "model": "Ninebot Max",
  "batteryLevel": 78,
  "status": "AVAILABLE",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "enabled": true
}
```

## Notes

- Payment and KYC flows are mock-ready and designed for Stripe/PayPal integration.
- Add a real map provider (Google Maps or Mapbox) inside the frontend `MapPlaceholder` component.

## Testing

```bash
cd backend
./mvnw test
```
