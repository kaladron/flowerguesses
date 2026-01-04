# 🌸 Flower Guesses

A beautiful, modern word-guessing game (inspired by Hangman) where you guess flower names while a flower progressively reveals itself. Built as a Progressive Web App (PWA) with pure JavaScript/TypeScript, no unnecessary frameworks.

## 🎮 Play Now

[Play Flower Guesses](https://kaladron.github.io/flowerguesses/)

## ✨ Features

- 🌺 **Beautiful SVG Flower Animation** - Watch the flower bloom as you play
- 📱 **Progressive Web App** - Install on your mobile device for offline play
- 🎯 **Three Difficulty Levels** - Easy, Medium, and Hard modes
- ⌨️ **Keyboard Support** - Play with physical or on-screen keyboard
- 📊 **Statistics Tracking** - Track your wins, streaks, and win rate
- 🎨 **Responsive Design** - Works on desktop, tablet, and mobile
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🚀 **Fast & Lightweight** - No heavy frameworks, pure TypeScript

## 🛠️ Technology Stack

- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing
- **ESLint & Prettier** - Code quality and formatting
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/kaladron/flowerguesses.git
cd flowerguesses

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

## 🎯 How to Play

1. **Choose Difficulty** - Select Easy, Medium, or Hard mode
2. **Guess Letters** - Click on-screen keys or use your keyboard
3. **Watch the Flower** - Each wrong guess reveals a petal
4. **Win or Lose** - Guess the word before the flower fully blooms!

### Difficulty Levels

- **Easy** - Shorter words (4-9 letters), 8 attempts
- **Medium** - Medium words (8-12 letters), 6 attempts
- **Hard** - Long words (11+ letters), 5 attempts

## 📦 Project Structure

```
flowerguesses/
├── .github/
│   └── workflows/       # CI/CD workflows
├── public/             # Static assets
│   └── manifest.json   # PWA manifest
├── src/
│   ├── game/          # Game logic
│   │   ├── GameState.ts
│   │   ├── WordManager.ts
│   │   ├── StatsManager.ts
│   │   └── GameController.ts
│   ├── ui/            # UI components
│   │   ├── FlowerDisplay.ts
│   │   └── Keyboard.ts
│   ├── types/         # TypeScript type definitions
│   │   └── game.ts
│   ├── main.ts        # Application entry point
│   └── style.css      # Styles
├── tests/             # Unit tests
├── index.html         # Main HTML file
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 🧪 Testing

The project uses Vitest for testing with Happy DOM for browser environment simulation.

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode (during development)
npm run test:watch
```

## 🚀 Deployment

The project automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ directory contains the built files ready for deployment
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Copyright 2020 Google

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## 🙏 Acknowledgments

- Inspired by the classic Hangman game
- Built with modern web technologies
- Flower names for educational purposes

## 📞 Contact

Project Link: [https://github.com/kaladron/flowerguesses](https://github.com/kaladron/flowerguesses)

---

Made with 💚 and 🌸
