import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [previousKeyType, setPreviousKeyType] = useState('');
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);

  // Safe evaluation function with proper order of operations
  const evaluateExpression = (expression: string): string => {
    try {
      // Replace display operators with JavaScript operators
      let jsExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      
      // Handle consecutive operators (keep last one, except for negative)
      jsExpression = jsExpression.replace(/[+\-*/]{2,}/g, (match) => {
        if (match.includes('-') && match.length === 2) {
          // Allow negative numbers like "5*-3"
          return match;
        }
        return match.slice(-1);
      });
      
      // Evaluate the expression
      const result = Function('"use strict"; return (' + jsExpression + ')')();
      
      // Handle precision - round to prevent floating point errors
      if (typeof result === 'number' && isFinite(result)) {
        // Round to 10 decimal places to handle precision issues
        const rounded = Math.round(result * 10000000000) / 10000000000;
        return rounded.toString();
      }
      
      return 'Error';
    } catch {
      return 'Error';
    }
  };

  const handleNumber = (num: string): void => {
    if (display === 'Error') {
      handleClear();
    }

    if (previousKeyType === 'equals' || waitingForNewInput) {
      setDisplay(num);
      setFormula(num);
      setWaitingForNewInput(false);
    } else if (display === '0') {
      // Prevent multiple leading zeros
      if (num !== '0') {
        setDisplay(num);
        setFormula(formula === '' ? num : formula + num);
      }
    } else {
      setDisplay(display + num);
      setFormula(formula + num);
    }
    
    setPreviousKeyType('number');
  };

  const handleOperator = (operator: string): void => {
    if (display === 'Error') {
      return;
    }

    const operatorMap: { [key: string]: string } = {
      'add': '+',
      'subtract': '-', 
      'multiply': '×',
      'divide': '÷'
    };
    
    const opSymbol = operatorMap[operator];

    if (previousKeyType === 'equals') {
      // Start new calculation with previous result
      setFormula(display + opSymbol);
      setDisplay(opSymbol);
      setPreviousKeyType('operator');
      setWaitingForNewInput(false);
      return;
    }

    if (previousKeyType === 'operator') {
      // Handle consecutive operators
      if (operator === 'subtract') {
        // Allow negative numbers
        setFormula(formula + opSymbol);
        setDisplay(opSymbol);
      } else {
        // Replace the last operator
        const newFormula = formula.slice(0, -1) + opSymbol;
        setFormula(newFormula);
        setDisplay(opSymbol);
      }
    } else {
      setFormula(formula + opSymbol);
      setDisplay(opSymbol);
    }
    
    setPreviousKeyType('operator');
    setWaitingForNewInput(false);
  };

  const handleDecimal = (): void => {
    if (display === 'Error') {
      handleClear();
      return;
    }

    if (previousKeyType === 'equals' || waitingForNewInput) {
      setDisplay('0.');
      setFormula('0.');
      setWaitingForNewInput(false);
    } else if (previousKeyType === 'operator') {
      setDisplay('0.');
      setFormula(formula + '0.');
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
      setFormula(formula + '.');
    }
    
    setPreviousKeyType('decimal');
  };

  const handleEquals = (): void => {
    if (display === 'Error' || previousKeyType === 'equals') {
      return;
    }
    
    if (formula === '' || previousKeyType === 'operator') {
      return;
    }

    const result = evaluateExpression(formula);
    setDisplay(result);
    setFormula(formula + '=' + result);
    setPreviousKeyType('equals');
    setWaitingForNewInput(true);
  };

  const handleClear = (): void => {
    setDisplay('0');
    setFormula('');
    setPreviousKeyType('');
    setWaitingForNewInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-700/50">
        <div className="mb-6">
          <div className="text-gray-400 text-sm font-mono mb-2 h-6 overflow-hidden">
            {formula && formula.length > 25 ? '...' + formula.slice(-25) : formula}
          </div>
          <div 
            id="display" 
            className="bg-gray-800 rounded-xl p-4 text-right text-white text-3xl font-mono min-h-[60px] flex items-center justify-end border border-gray-700 overflow-hidden"
          >
            {display.length > 12 ? display.slice(0, 12) + '...' : display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 max-w-sm">
          {/* Row 1 */}
          <button 
            id="clear" 
            onClick={handleClear}
            className="col-span-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl p-4 text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
          >
            AC
          </button>
          <button 
            id="divide" 
            onClick={() => handleOperator('divide')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
          >
            ÷
          </button>
          <button 
            id="multiply" 
            onClick={() => handleOperator('multiply')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
          >
            ×
          </button>

          {/* Row 2 */}
          <button 
            id="seven" 
            onClick={() => handleNumber('7')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            7
          </button>
          <button 
            id="eight" 
            onClick={() => handleNumber('8')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            8
          </button>
          <button 
            id="nine" 
            onClick={() => handleNumber('9')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            9
          </button>
          <button 
            id="subtract" 
            onClick={() => handleOperator('subtract')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
          >
            -
          </button>

          {/* Row 3 */}
          <button 
            id="four" 
            onClick={() => handleNumber('4')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            4
          </button>
          <button 
            id="five" 
            onClick={() => handleNumber('5')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            5
          </button>
          <button 
            id="six" 
            onClick={() => handleNumber('6')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            6
          </button>
          <button 
            id="add" 
            onClick={() => handleOperator('add')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
          >
            +
          </button>

          {/* Row 4 */}
          <button 
            id="one" 
            onClick={() => handleNumber('1')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            1
          </button>
          <button 
            id="two" 
            onClick={() => handleNumber('2')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            2
          </button>
          <button 
            id="three" 
            onClick={() => handleNumber('3')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            3
          </button>
          <button 
            id="equals" 
            onClick={handleEquals}
            className="row-span-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center"
          >
            =
          </button>

          {/* Row 5 */}
          <button 
            id="zero" 
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            0
          </button>
          <button 
            id="decimal" 
            onClick={handleDecimal}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 text-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            .
          </button>
        </div>
      </div>
      
      {/* Designer Credit */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm font-medium">
          Designed and Coded by{' '}
          <span className="text-white font-semibold">Ayokanmi Adejola</span>
        </p>
      </div>
    </div>
  );
};

export default Calculator;