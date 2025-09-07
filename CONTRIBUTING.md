# 🤝 Contributing to Voting System

Thank you for your interest in contributing to the **Voting System Web Application**! 🎉  
We welcome contributions from everyone, whether it's bug fixes, new features, or improving documentation.

---

## 🛠️ Getting Started

1. **Fork the repository**
   - Click on the `Fork` button in the top-right corner of this repo.

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/<your-username>/Voting-System.git
   cd Voting-System
   ```

3. **Set up remotes**
   ```bash
   git remote add upstream https://github.com/Harsh-Koundal/Voting-System.git
   ```

4. **Install dependencies**
   - Backend:
     ```bash
     cd voting-backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../voting-frontend
     npm install
     ```

---

## 🔄 Branching Strategy

- Always create a **new branch** for your work:
  ```bash
  git checkout -b feat/your-feature-name
  ```
- Use meaningful branch names:
  - `feat/*` → new features
  - `fix/*` → bug fixes
  - `docs/*` → documentation updates
  - `refactor/*` → code refactoring

---

## ✅ Commit Guidelines

- Use **clear commit messages**:
  ```
  feat: add candidate management API
  fix: resolve login authentication issue
  docs: update README with setup instructions
  style: improve UI spacing on results page
  ```

- Follow the convention:
  - `feat:` → New feature
  - `fix:` → Bug fix
  - `docs:` → Documentation only changes
  - `style:` → Code style/formatting (no logic change)
  - `refactor:` → Code refactoring
  - `test:` → Adding or fixing tests
  - `chore:` → Build tools, CI/CD changes

---

## 🧪 Testing

Before submitting a pull request:

1. Run the backend:
   ```bash
   cd voting-backend
   npm start
   ```

2. Run the frontend:
   ```bash
   cd ../voting-frontend
   npm run dev
   ```

3. Make sure everything works as expected:
   - Register/Login
   - Add/View candidates (Admin)
   - Vote once (Voter)
   - View live results

---

## 🚀 Pull Requests

1. Push your branch:
   ```bash
   git push origin feat/your-feature-name
   ```

2. Open a **Pull Request (PR)**:
   - Go to the original repo on GitHub
   - Click **Compare & Pull Request**
   - Add a meaningful title & description

3. Ensure your PR:
   - Is linked to an issue (if applicable)
   - Passes all linting and build checks
   - Has been tested locally

---

## 🌟 Code of Conduct

By contributing, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md) (to be created).  
We value respectful, inclusive, and collaborative contributions.

---

## 🙌 Thank You

Every contribution matters – big or small!  
Thank you for helping improve the **Voting System Web Application** 🗳️
