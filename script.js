// const loanCalculator = document.querySelector(".loan-calculator");
// const sipCalculator = document.querySelector(".sip-calculator");
// const loanTab = document.querySelector(".loan-tab");
// const sipTab = document.querySelector(".sip-tab");

// let currentTab = loanTab;
// currentTab.classList.add("current-tab");


const calculatorLoan = document.querySelector(".loan-calculator");
const calculatorsip = document.querySelector(".sip-calculator");
const loanTab = document.querySelector(".loan-tab");
const sipTab = document.querySelector(".sip-tab");

let currentTab = loanTab;
currentTab.classList.add("currentTab");
    calculatorLoan.classList.add("active");


function switchTab(clickedTab) {
  // Remove highlight from previous tab
  if (clickedTab !== currentTab) {
    currentTab.classList.remove("currentTab");
    currentTab = clickedTab;
    currentTab.classList.add("currentTab");
  }

  // Show / hide calculators based on which tab is clicked
  if (clickedTab === loanTab) {
    calculatorLoan.classList.add("active");
    calculatorsip.classList.remove("active");
  } else if (clickedTab === sipTab) {
    calculatorsip.classList.add("active");
    calculatorLoan.classList.remove("active");
  }
}


loanTab.addEventListener("click", ()=>{
  switchTab(loanTab)
});
sipTab.addEventListener("click", ()=>{
  switchTab(sipTab)
});




function linkInputs() {
  const groups = document.querySelectorAll(".input-group");

  groups.forEach(group => {
    const textInput = group.querySelector(".text");
    const rangeInput = group.querySelector(".range");

    //  Reset to default values on page load
    const def = textInput.dataset.default;
    textInput.value = def;
    rangeInput.value = def;

    //  Slider → Text
    rangeInput.addEventListener("input", () => {
      textInput.value = rangeInput.value;
      textInput.style.color = "black";
      triggerLoanUpdate();
      triggerSipUpdate();
    });

    // Text → Slider
    textInput.addEventListener("input", () => {
      const val = Number(textInput.value);
      const min = Number(textInput.min);
      const max = Number(textInput.max);

      if (val < min) {
        textInput.style.color = "red";
      } else if (val > max) {
        textInput.style.color = "orange";
      } else {
        textInput.style.color = "black";
        rangeInput.value = val;

        triggerLoanUpdate();
        triggerSipUpdate();
      }
    });
  });
}

// loan calculator 
const annualRatePercent= document.querySelector(".loanRate").value;
const years = document.querySelector(".loanTime").value;
const paymentsPerYear = 12;
const P = document.querySelector(".loanAmount").value;
const schedule = [];

function calculateLoan(P, annualRatePercent, years, paymentsPerYear) {
  const r = (annualRatePercent / 100) / paymentsPerYear; 
  const n = Math.round(years * paymentsPerYear);
  if (r === 0) {
  payment = P / n;
  } else {
  const factor = Math.pow(1 + r, n);
  payment = P * r * factor / (factor - 1);
  }

  let remaining = P;
let totalInterest = 0;
let totalPayment =0;

for (let i = 1; i <= n; i++) {
  const interest = remaining * r;
  const principal = payment - interest;
  remaining -= principal;
   totalInterest += interest; 
   totalPayment += payment
  schedule.push({ paymentNumber: i, payment, principal, interest, remaining });
}
console.log("Total Interest Paid:", Math.round(totalInterest.toFixed(2)));
console.log("Monthly EMI ",Math.round(payment));
console.log("total payment: ", Math.round(totalPayment))
document.querySelector(".inputEmi").innerText=Math.round(payment);
document.querySelector(".inputPrincipleAmount").innerText=Math.round(P);
document.querySelector(".inputInterest").innerText=Math.round(totalInterest.toFixed(2));
document.querySelector(".inputTotalAmount").innerText=Math.round(totalPayment);

}

calculateLoan(P, annualRatePercent, years, paymentsPerYear);
// console.log(schedule);

function triggerLoanUpdate() {
  const P = Number(document.querySelector(".loanAmount").value);
  const rate = Number(document.querySelector(".loanRate").value);
  const years = Number(document.querySelector(".loanTime").value);
  calculateLoan(P, rate, years, 12);
}

function sipCalculator(annualInterestRate, monthlyInvestment, SipYears) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = SipYears * 12;
  let total = 0;

  for (let i = 0; i < totalMonths; i++) {
    total = (total + monthlyInvestment) * (1 + monthlyInterestRate);
  }

  const totalInvested = monthlyInvestment * totalMonths;
  const totalInterest = total - totalInvested;

  return { totalAmount: total, investedAmount: totalInvested, interestEarned: totalInterest };
}

//  Trigger SIP Update
function triggerSipUpdate() {
  const rate = parseFloat(document.querySelector(".sipRate").value);
  const invest = parseFloat(document.querySelector(".sipAmount").value);
  const years = parseFloat(document.querySelector(".sipTime").value);
  if (!rate || !invest || !years) return;

  const result = sipCalculator(rate, invest, years);
  document.querySelector(".inputInvestedAmount").innerText = Math.round(result.investedAmount.toFixed(2));
  document.querySelector(".inputEstReturn").innerText =Math.round(result.interestEarned.toFixed(2)); 
  document.querySelector(".inputTotalValue").innerText =Math.round(result.totalAmount.toFixed(2)); 
}

linkInputs();
sipCalculator(); // rename if needed
triggerLoanUpdate();
triggerSipUpdate();

