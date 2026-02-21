# Smart WMS - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites

- Node.js 16+
- Python 3.10+
- PostgreSQL 13+
- Docker & Docker Compose (optional)

---

## 🚀 Option 1: Local Development (Recommended for team members)

### Step 1: Frontend Setup (2 min)

```bash
cd Smart_wms/Frontend
npm install
cp .env.example .env
npm run dev
# Opens: http://localhost:3000
```

### Step 2: Backend Setup (2 min)

```bash
cd Smart_wms/Backend
npm install
cp .env.example .env
npm run dev
# Server: http://localhost:5000
```

### Step 3: AI Engine Setup (1 min)

```bash
cd Smart_wms/Ai_engine
python -m venv venv
source venv/bin/activate  # or: venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn main:app --reload --port 8001
# API: http://localhost:8001
```

**Done!** All services running. Frontend → Backend → AI Engine connected.

---

## 🐳 Option 2: Docker Compose (Recommended for deployment)

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services:**

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- AI Engine: http://localhost:8001
- Database: postgres://localhost:5432
- Redis: redis://localhost:6379

---

## 📁 Project Structure

```
Smart_wms/
├── Frontend/          ← React Dashboard (Port 3000)
│   ├── src/
│   │   ├── pages/     ← Dashboard, Inventory, Predictions, Alerts
│   │   ├── services/  ← API client
│   │   └── components/
│   └── package.json
├── Backend/           ← REST API (Port 5000)
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── controllers/
│   └── package.json
├── Ai_engine/         ← ML Engine (Port 8001)
│   ├── main.py
│   ├── models/        ← Trained ML models
│   └── requirements.txt
└── Database/          ← PostgreSQL schemas
    └── init.sql
```

---

## 🎯 First Things to Try

### 1. View Dashboard

```
http://localhost:3000
- Check KPIs
- View demand forecast
- See alerts
```

### 2. Test API

```bash
# Get dashboard summary
curl http://localhost:5000/api/v1/dashboard/summary

# Predict demand
curl -X POST http://localhost:5000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{"product_id":"PROD-001","current_stock":500}'
```

### 3. Check AI Engine

```bash
curl http://localhost:8001/health
```

---

## 🔧 Environment Variables

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_ENV=development
```

### Backend (.env)

```env
DATABASE_URL=postgresql://wms_user:password@localhost:5432/smart_wms
REDIS_URL=redis://localhost:6379
AI_ENGINE_URL=http://localhost:8001
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
```

### AI Engine (.env)

```env
DATABASE_URL=postgresql://wms_user:password@localhost:5432/smart_wms
REDIS_URL=redis://localhost:6379
MODEL_PATH=./models
LOG_LEVEL=INFO
PORT=8001
```

---

## 📊 Database Setup

### Automatic (Docker Compose)

```bash
docker-compose up postgres
# Database initialized automatically
```

### Manual Setup

```bash
# Create database
createdb smart_wms

# Run migrations
psql -U postgres -d smart_wms -f Smart_wms/Database/init.sql

# Verify connection
psql postgresql://wms_user:password@localhost:5432/smart_wms
```

---

## 🧪 Testing

### Frontend Tests

```bash
cd Frontend
npm test
```

### Backend Tests

```bash
cd Backend
npm test
```

### AI Engine Tests

```bash
cd Ai_engine
pytest
```

---

## 📚 Key Files to Understand

| File                               | Purpose                 |
| ---------------------------------- | ----------------------- |
| `Frontend/src/pages/Dashboard.jsx` | Main dashboard          |
| `Frontend/src/services/api.js`     | API integration         |
| `Ai_engine/main.py`                | AI endpoints            |
| `Smart_wms/Database/init.sql`      | Database schema         |
| `PROJECT_GUIDE.md`                 | Full architecture guide |
| `AI_MODULE_ARCHITECTURE.md`        | ML system details       |

---

## 🐛 Troubleshooting

### "Cannot connect to API"

```
✓ Check backend is running on port 5000
✓ Verify REACT_APP_API_URL in .env
✓ Check firewall settings
```

### "Database connection failed"

```
✓ Verify PostgreSQL is running
✓ Check DATABASE_URL in .env
✓ Run: psql postgresql://localhost:5432 -U postgres
```

### "Port already in use"

```
# Change port in .env or:
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### "Module not found errors"

```
# Reinstall dependencies
npm install          # Frontend/Backend
pip install -r requirements.txt  # AI Engine
```

---

## 🚀 Next Steps

1. **Team 1 (Backend)**: Implement all API endpoints
2. **Team 2 (Frontend)**: Add remaining pages (Suppliers, Reports, Settings)
3. **Team 3 (AI)**: Train ML models and implement predictions

See `PROJECT_GUIDE.md` for detailed implementation roadmap.

---

## 💡 Tips for Team Collaboration

- **Daily standup**: 5 min sync on progress
- **Code reviews**: PR before merging
- **Testing**: Run tests locally before push
- **Documentation**: Update README as you go
- **Git workflow**:
  ```bash
  git checkout -b feature/your-feature
  git commit -am "description"
  git push origin feature/your-feature
  # Create PR on GitHub
  ```

---

## 📞 Support

- Check [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for detailed docs
- Review [AI_MODULE_ARCHITECTURE.md](AI_MODULE_ARCHITECTURE.md) for AI details
- See [Frontend/README.md](./Smart_wms/Frontend/README.md) for frontend details

---

**Happy coding!** 🎉

Questions? Start with the docs, then ask in the team chat.
