// listen for submission

document.querySelector("#loan-form").addEventListener("submit", function (e) {
  //hide reulsts
  document.querySelector(".results").style.display = "none"
  //show loader
  document.querySelector("#loading").style.display = "block"

  setTimeout(calculateResults, 2000)

  e.preventDefault()
})

// Calculate Results
function calculateResults() {
  // UI Variables
  const amount = document.querySelector("#amount")
  const interest = document.querySelector("#interest")
  const years = document.querySelector("#years")
  const monthlyPayment = document.querySelector("#monthly-payment")
  const totalPayment = document.querySelector("#total-payment")
  const totalinterest = document.querySelector("#total-interest")

  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalinterest.value = (monthly * calculatedPayments - principal).toFixed(2)
    //show results
    document.querySelector(".results").style.display = "block"

    //Hide spinner
    document.querySelector("#loading").style.display = "none"
  } else {
    showError("Please check your numbers")
  }
}

//show Error
function showError(error) {
  //hide results
  document.querySelector(".results").style.display = "none"

  //Hide spinner
  document.querySelector("#loading").style.display = "none"

  //create div
  const errorDiv = document.createElement("div")

  // Get elements
  const card = document.querySelector(".card")
  const heading = document.querySelector(".heading")

  //add class
  errorDiv.className = "alert alert-danger"

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error))

  //insert error above heading
  card.insertBefore(errorDiv, heading)

  //clear error after 3sec
  setTimeout(clearError, 3000)
}

const clearError = () => document.querySelector(".alert").remove()
