// 3. calculator 인스턴스가 만들어지면 클래스 Calculator가 실행
class Calculator {
  // 4. 생성자함수 실행
  // 객체를 생성하는 생성자함수
  // 클래스 Calculator를 사용해 만든 모든 인스턴스는 해당하는 속성을 모두 상속받는다
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // 5. clear 함수 실행
  // 기존값 모두 비워주기
  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  // 10. 사용자가 DEL 버튼을 클릭했을때 실행되는 메소드
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // 6. 사용자가 숫자를 입력: 숫자를 더해주는 메소드
  // 눌러진 숫자를 모두 문자열 형태로 변환해준 뒤 updateDisplay() 메소드에서 더해진 문자열 숫자를 화면에 표시해준다
  appendNumber(number) {
    // 한 숫자에 소수점은 한번만 사용할 수 있다
    if (number === '.' && this.currentOperand.includes('.')) return;
    // 숫자 한번 입력할때마다 전에 있던 숫자와 합쳐주기
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // 7. 사용자가 연산자를 입력할때 실행되는 메소드
  // 파라미터로 클릭된 연산자를 받는다: + - x ÷
  chooseOperation(operation) {
    // 현재값이 없을 경우에는 메소드를 종료한다
    // = 연산자를 입력하기 위해서는 반드시 현재값이 존재해야 된다
    if (this.currentOperand === '') return;
    // 이전값이 존재할 경우에는 이전값과 현재값을 계산하는 메소드 compute()를 실행한다
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // 7. 사용자가 연산자를 입력했을때 이전값이
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // 정수형태로 만든 이전값, 현재값 둘중에 하나라도 숫자가 아니라면 compute() 메소드를 종료
    // 현재값만 있는 경우도 메소드를 종료한다
    if (isNaN(prev) || isNaN(current)) return;
    // swith문이 실행되는 조건 (즉 연산되기 위한 조건)
    // => 이전값과 현재값이 모두 숫자형태로 있어야한다
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // 숫자를 화면에 표시해주는 메소드
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    // operation이 클릭되어서 값이 있는 경우에만 실행
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
      // 숫자가 처음으로 클릭되었을 때 실행
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }

  // 숫자를 화면에 표시해주는 메소드
  getDisplayNumber(number) {
    const stringNumber = number.toString();

    // 정수를 가져오는 코드
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    // 가져온숫자를 '.'을 기준으로 나눠서 배열로 만든다
    // 예) "12.5" ["12", "5"]
    // "." 앞에 있는 숫자 즉 정수를 가져와야하므로 인덱스 [0]으로 접근한다
    // 예) "12"
    // pareFloat()함수는 문자열안에 있는 숫자를 숫자형 데이터로 바꿔 리턴한다
    // 예) 12

    // 소수점을 가져오는 코드
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;
    // 계산기에 입력한 숫자에 숫자 세자리마다 , 를 추가해주는 코드
    if (isNaN(integerDigits)) {
      // 가져온 데이터가 숫자가 아닐경우
      integerDisplay = '';
    } else {
      // 가져온 데이터가 숫자일 경우
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    // 가져온 정수, 소수점 숫자데이터 사이에 . 를 추가해주는 코드
    if (decimalDigits != null) {
      // 소수 데이터가 비어있지 않은경우 (소수 값이 있는 경우) => 정수 + . + 소수로 리턴
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      // 소수 데이터가 비어있는 경우 (소수 값이 없는 경우) => 정수만 리턴
      return integerDisplay;
    }
  }
}

// 1. 변수 선언
// : 숫자버튼, 사칙연산버튼, =버튼, 삭제버튼, AC버튼, 이전결과창, 현재결과창의 태그를 가져와 변수에 할당
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

// 2. 인스턴스 선언
// 클래스 Calculator를 상속받은 인스턴스 calculator
// 인스턴스를 생성할때 이전결과창과 현재결과창을 할당한 변수를 클래스에 넘겨준다
// 클래스라는 틀에서 넘겨준 변수를 재료로 사용할 예정
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// 6. 사용자가 숫자 버튼을 클릭했을때
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// 7. 사용자가 연산자 버튼을 클릭했을때
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// 8. 사용자가 = 버튼을 클릭했을때
equalsButtons.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

// 9. 사용자가 AC 버튼을 클릭했을때
allClearButtons.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

// 10. 사용자가 DEL 버튼을 클릭했을때
deleteButtons.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});
