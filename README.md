# 💻 VS Code Setup Guide

This guide helps you set up and run the **Frontend Onboarding Task** project using **Visual Studio Code**.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Tool        | Description                        | Download Link                                           | Command to Verify |
| ----------- | ---------------------------------- | ------------------------------------------------------- | ----------------- |
| **Node.js** | JavaScript runtime (v18 or higher) | [nodejs.org](https://nodejs.org/)                       | `node --version`  |
| **Git**     | Version control system             | [git-scm.com](https://git-scm.com/)                     | `git --version`   |
| **VS Code** | Code editor                        | [code.visualstudio.com](https://code.visualstudio.com/) | —                 |

## 🚀 Step-by-Step Setup in VS Code

### 1️⃣ Clone and Open the Project

```bash
# Clone the repository
git clone https://github.com/yourusername/frontend-onboarding-task.git

# Navigate to the directory
cd frontend-onboarding-task

# Open the project in VS Code
code .
```

---

### 2️⃣ Install Recommended VS Code Extensions

| Extension Name                    | ID                                 |
| --------------------------------- | ---------------------------------- |
| ES7+ React/Redux Snippets         | `dsznajder.es7-react-js-snippets`  |
| Tailwind CSS IntelliSense         | `bradlc.vscode-tailwindcss`        |
| TypeScript Importer               | `pmneo.tsimporter`                 |
| Prettier - Code Formatter         | `esbenp.prettier-vscode`           |
| ESLint                            | `dbaeumer.vscode-eslint`           |
| Auto Rename Tag                   | `formulahendry.auto-rename-tag`    |
| Bracket Pair Colorizer (optional) | `coenraads.bracket-pair-colorizer` |

Install these from the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode).

### 3️⃣ Configure VS Code Settings

Create a `.vscode/settings.json` file in the project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\$\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\$\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### 4️⃣ Install Project Dependencies

In the VS Code terminal:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 5️⃣ Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

## 🧠 Developer Tips

### ⚡ Useful Shortcuts

| Shortcut                       | Function              |
| ------------------------------ | --------------------- |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | Command Palette       |
| `Ctrl+\`` / `Cmd+\`\`          | Toggle Terminal       |
| `Ctrl+P` / `Cmd+P`             | Quick File Navigation |
| `F2`                           | Rename Symbol         |
| `Ctrl+D` / `Cmd+D`             | Select Next Match     |

### 💡 Productivity Tips

* **TypeScript IntelliSense** helps with auto-completion.
* **Red squiggly lines** show syntax or type errors.
* **Prettier + ESLint** keeps your code clean and consistent.
* **Live reload** enables real-time preview.

## 🐞 Troubleshooting

### 🔁 Port Already in Use

```bash
npx kill-port 3000
# OR use a different port
npm run dev -- -p 3001
```

### 📦 Corrupted Dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### ⚠️ TypeScript Issues

* Restart TS server: `Ctrl+Shift+P` → *TypeScript: Restart TS Server*
* Check `tsconfig.json` for custom rules

### 🎨 Tailwind Not Working?

* Make sure the Tailwind extension is installed.
* Check if Tailwind is properly configured and imported in `globals.css`.

