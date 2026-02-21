export default function App() {
return (
<div style={{ padding: '50px', textAlign: 'center' }}>
<h1 style={{ color: 'blue' }}>✅ Frontend is Working!</h1>
<p>If you see this, React loaded successfully.</p>
</div>
);
}# Contributing to Smart WMS

## 🎯 Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests locally
5. Submit a pull request

## 📋 Code Style Guidelines

### Frontend (JavaScript/React)

```javascript
// ✅ DO
const handleUserClick = (id) => {
  setActiveUser(id);
  fetchUserData(id);
};

// ❌ DON'T
function handleclick(e) {
  active = e.target.value;
}
```

### Backend (Node.js)

```javascript
// ✅ DO
const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");
  return user;
};

// ❌ DON'T
app.get("/user/:id", (req, res) => {
  User.find(req.params.id, (err, user) => {
    if (err) res.send("error");
    else res.send(user);
  });
});
```

### AI Engine (Python)

```python
# ✅ DO
def predict_demand(product_id: str, lookback_days: int = 90) -> Dict:
    """Predict demand for a product."""
    features = extract_features(product_id, lookback_days)
    predictions = model.predict(features)
    return {
        'product_id': product_id,
        'forecast': predictions.tolist()
    }

# ❌ DON'T
def predict(id, days=None):
    f=extract(id,days)
    p=m.predict(f)
    return p
```

## 🧪 Testing Requirements

- Frontend: `npm test` - Minimum 80% coverage
- Backend: `npm test` - All endpoints tested
- AI Engine: `pytest` - Model validation required

```bash
# Before committing
npm run lint      # Fix style issues
npm test          # Run tests
npm run build     # Verify build
```

## 📝 Commit Message Format

```
type(scope): description

Body (optional)

Fixes #issue_number
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Code restructuring
- `test`: Test additions/modifications
- `chore`: Build, dependencies

### Examples

```
feat(inventory): Add low-stock filtering
fix(predictions): Handle missing data correctly
docs(api): Update prediction endpoint docs
test(alerts): Cover all alert types
```

## 🚀 Pull Request Process

1. **Title**: Clear, concise, follows commit format
2. **Description**: What changed and why
3. **Testing**: Include test results
4. **Related Issues**: Link to relevant issues
5. **Review**: Minimum 1 approval required

### PR Template

```markdown
## Description

Brief description of changes

## Related Issue

Fixes #123

## Changes Made

- Change 1
- Change 2

## Testing Done

- [ ] Unit tests pass
- [ ] Manual testing complete
- [ ] No breaking changes

## Screenshots (if applicable)

[Add screenshots for UI changes]
```

## 🔒 Security Guidelines

- **Never commit secrets** (.env files, API keys, tokens)
- **Validate all inputs** server-side
- **Use HTTPS** for API calls
- **Sanitize database queries** (use ORM/parameterized queries)
- **Implement rate limiting** on API endpoints
- **Use JWT tokens** with expiration
- **Run security scans** before release

## 📊 Code Review Checklist

### For Reviewers

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security issues
- [ ] Performance impact is acceptable
- [ ] Error handling is appropriate

### For Authors

- [ ] Tested locally
- [ ] Linting passes
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.logs/debug code
- [ ] Commits are logical

## 🐛 Reporting Bugs

Include in bug report:

1. **Description**: What is broken?
2. **Reproduction**: Steps to reproduce
3. **Expected**: What should happen
4. **Actual**: What actually happens
5. **Environment**: OS, browser, versions
6. **Logs**: Error messages, stack traces
7. **Screenshots**: Visual issues

## 🚀 Feature Requests

Include:

1. **Title**: Clear, one-liner
2. **Description**: Why is this needed?
3. **Acceptance Criteria**: How to verify?
4. **Mockups/Examples**: Visual if applicable

## 📚 Documentation

### Code Comments

```python
# ✅ Good: Explains WHY
# Use exponential backoff to avoid overwhelming the API
for retry_count in range(max_retries):
    try:
        return api_call()
    except RateLimitError:
        time.sleep(2 ** retry_count)

# ❌ Bad: Explains WHAT (obvious from code)
# Increment i
i += 1
```

### README Updates

- Update [Frontend/README.md](Smart_wms/Frontend/README.md) for UI changes
- Update [Smart_wms/Ai_engine/README.md](Smart_wms/Ai_engine/README.md) for ML changes
- Update [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for architecture changes

## 🤝 Team Communication

- **Slack**: Daily updates, quick questions
- **GitHub Issues**: Feature requests, bugs
- **PRs**: Code discussions
- **Weekly Sync**: Team alignment

## ✨ Best Practices

1. **Small PRs**: Easier to review, faster to merge
2. **Frequent commits**: Logical history
3. **Clear naming**: Self-documenting code
4. **DRY principle**: Don't repeat yourself
5. **KISS principle**: Keep it simple, stupid
6. **SOLID principles**: Single Responsibility, Open/Closed, etc.

## 🎓 Learning Resources

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- [React Documentation](https://react.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)

## 🏆 Recognition

Contributors will be recognized in:

- `CONTRIBUTORS.md` file
- Release notes
- Project documentation

Thank you for contributing to Smart WMS! 🎉
