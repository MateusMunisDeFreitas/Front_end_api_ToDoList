# Front_end_api_ToDoList

This is a simple **ToDo List** front-end application built with React and Vite. The project is part of a college assignment and demonstrates a basic CRUD interface interacting with an API.

## 🧩 Project Structure

```
index.html
package.json
README.md
vite.config.js
src/
  App.css
  App.jsx
  main.jsx
  components/
    TaskForm.jsx
    TaskItem.jsx
    TaskList.jsx
  pages/
    Home.jsx
    Login.jsx
    SignUp.jsx
  services/
    api.js
  styles/
    Auth.css
    Home.css
    index.css
    TaskForm.css
    TaskItem.css
    TaskList.css
```

- **src/** contains the React source code.
  - **components/** reusable UI pieces for tasks.
  - **pages/** different views such as Home, Login, and SignUp.
  - **services/api.js** handles HTTP requests to the back-end.
  - **styles/** CSS modules for corresponding components and pages.

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:5173` (default Vite port).

> Make sure the back-end API is running and configured in `src/services/api.js`.

## 🛠 Scripts

- `npm run dev` - Launches Vite dev server.
- `npm run build` - Builds production files.
- `npm run preview` - Preview the production build locally.

## 📁 Notes for Developers

- Components rely on simple state and effects; feel free to refactor into hooks or TypeScript.
- Routes (if using a router) are currently handled in `App.jsx`.
- Authentication form styles are found under `styles/Auth.css`.

## 💡 Contributions

This project is intended as a learning exercise. If you'd like to contribute or improve the code, feel free to fork and submit a pull request.

---

_Developed for academic purposes._