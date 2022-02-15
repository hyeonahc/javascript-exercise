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

  // 6. 사용자가 숫자를 입력: 숫자를 더해주는 메소드
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // 6. 사용자가 숫자를 입력: 숫자를 화면에 표시해주는 메소드
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
  }

  // 6. 사용자가 숫자를 입력: ???
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

    // 가져온 정수를 테스트하는 코드 ???
    if (isNaN(integerDigits)) {
      // 가져온 데이터가 숫자가 아닐경우
      integerDisplay = '';
    } else {
      // 가져온 데이터가 숫자일 경우
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    // 가져온 소수점을 테스트하는 코드 ???
    if (decimalDigits != null) {
      // 가져온 데이터가 비어있지 않은경우 (=== 소수점 값이 있는 경우)
      return `${integerDisplay}.${decimalDigits}`;
    } else {
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

// 6. 사용자가 숫자를 입력
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// 7. 사용자가 연산자를 입력
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
