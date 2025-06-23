# JavaScript Calculator - FreeCodeCamp Project

A beautiful, fully-featured JavaScript calculator built with React and TypeScript that meets all FreeCodeCamp requirements. This production-ready calculator implements proper formula logic with order of operations and handles all edge cases.


## 🚀 Features

### Core Functionality
- ✅ Complete calculator with all basic operations (+, -, ×, ÷)
- ✅ Formula logic with proper order of operations (not immediate execution)
- ✅ Chain calculations with operator precedence
- ✅ Decimal point support with precision handling
- ✅ Clear functionality that resets to initial state
- ✅ Error handling for invalid operations

### Advanced Features
- ✅ Consecutive operator handling (keeps last operator, allows negative numbers)
- ✅ Prevents multiple leading zeros
- ✅ Operator continuation after equals for new calculations
- ✅ Precise decimal calculations with proper rounding (10 decimal places)
- ✅ Formula display showing calculation history
- ✅ Responsive design for all screen sizes

### Design Elements
- 🎨 Modern gradient design with elegant color scheme
- 🎯 Clean, readable typography with proper button hierarchy
- ✨ Smooth hover animations and visual feedback
- 📱 Responsive grid layout
- 🎪 Professional spacing using 8px system
- 🌟 Subtle shadows and rounded corners for depth

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## 📋 FreeCodeCamp Requirements

This calculator fulfills all 15 user stories from the FreeCodeCamp JavaScript Calculator project:

1. ✅ Contains clickable element with `id="equals"`
2. ✅ Contains 10 clickable number elements (0-9) with proper IDs
3. ✅ Contains 4 operator elements with IDs: `add`, `subtract`, `multiply`, `divide`
4. ✅ Contains decimal element with `id="decimal"`
5. ✅ Contains clear element with `id="clear"`
6. ✅ Contains display element with `id="display"`
7. ✅ Clear button resets calculator to initial state (shows 0)
8. ✅ Numbers display as they're input
9. ✅ Chain calculations work correctly with proper order of operations
10. ✅ Prevents numbers from beginning with multiple zeros
11. ✅ Decimal handling (only one decimal per number)
12. ✅ Operations work on decimal numbers
13. ✅ Consecutive operators handled properly (last operator wins, except negative)
14. ✅ Operators after equals start new calculation with previous result
15. ✅ Decimal precision maintained (handles calculations like 2/7 properly)

## 🎯 Calculator Logic

This calculator implements **Formula Logic** with proper order of operations, not immediate execution logic. This means:

- `3 + 5 × 6 - 2 ÷ 4 = 32.5` (Formula Logic)
- Operations follow mathematical precedence (multiplication/division before addition/subtraction)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd javascript-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Testing

This project includes the FreeCodeCamp test suite. The tests will automatically run when you open the calculator in your browser.

## 📁 Project Structure

```
src/
├── App.tsx              # Main app component
├── Calculator.tsx       # Calculator component with all logic
├── main.tsx            # React app entry point
├── index.css           # Tailwind CSS imports
└── vite-env.d.ts       # Vite type definitions
```

## 🎨 Design Philosophy

The calculator follows modern design principles:

- **Hierarchy**: Clear visual hierarchy using typography and spacing
- **Contrast**: High contrast for readability and accessibility
- **Balance**: Symmetrical layout with proper proportions
- **Movement**: Subtle animations that enhance user experience
- **Consistency**: Consistent spacing, colors, and interactions throughout

## 🔧 Key Implementation Details

### State Management
- Uses React hooks for state management
- Tracks display value, formula, previous key type, and input state
- Handles complex state transitions for proper calculator behavior

### Expression Evaluation
- Safe evaluation using Function constructor with strict mode
- Proper operator precedence handling
- Floating-point precision management
- Error handling for invalid expressions

### Edge Case Handling
- Consecutive operators (5 + * 7 = 35)
- Negative numbers (5 * -5 = -25)
- Leading zeros prevention
- Decimal point validation
- Division by zero and other error states


## 👨‍💻 Author

**Ayokanmi Adejola**
# Javascript-Calculator
