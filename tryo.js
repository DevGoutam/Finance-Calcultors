// const annualRatePercent= 12;
// const years = 5;
// const paymentsPerYear = 12;
// const P = 100000;
// const schedule = [];

// function calculateLoan(P, annualRatePercent, years, paymentsPerYear) {
//   const r = (annualRatePercent / 100) / paymentsPerYear; // periodic rate
//   const n = Math.round(years * paymentsPerYear);
//   if (r === 0) {
//   payment = P / n;
//   } else {
//   const factor = Math.pow(1 + r, n);
//   payment = P * r * factor / (factor - 1);
//   }

//   let remaining = P;
// let totalInterest = 0;
// let totalPayment =0;

// for (let i = 1; i <= n; i++) {
//   const interest = remaining * r;
//   const principal = payment - interest;
//   remaining -= principal;
//    totalInterest += interest; // 👈 add each month’s interest
//    totalPayment += payment
//   schedule.push({ paymentNumber: i, payment, principal, interest, remaining });
// }
// console.log("Total Interest Paid:", Math.round(totalInterest.toFixed(2)));
// console.log("Monthly EMI ",Math.round(payment));
// console.log("total payment: ", Math.round(totalPayment))
// }

// calculateLoan(P, annualRatePercent, years, paymentsPerYear);
// // console.log(schedule);



const annualInterestRate= 10  ;
const monthlyInvestment = 1000 ;
const years =5;
function sipCalculator(annualInterestRate, monthlyInvestment, years){
const monthlyInterestRate = annualInterestRate/12/100;
 const totalMonths = years*12;
 let total =0;
 for(let i=0; i<totalMonths; i++){
  total = (total + monthlyInvestment)* (1 + monthlyInterestRate);
 }
 
  const totalInvested = monthlyInvestment * totalMonths;
  const totalInterest = total - totalInvested;
  
  return {
    totalAmount: total,
    investedAmount: totalInvested,
    interestEarned: totalInterest
  };
}
sipCalculator();
console.log(sipCalculator(annualInterestRate, monthlyInvestment, years));
// Example usage:
// const result = sipCalculator(annualInterestRate, monthlyInvestment, years);

// document.querySelector(".inputInvestedAmount").textContent = result.totalAmount.toFixed(2);
// document.querySelector(".inputEstReturn").textContent = result.investedAmount.toFixed(2);
// document.querySelector(".inputTotalValue").textContent = result.interestEarned.toFixed(2);