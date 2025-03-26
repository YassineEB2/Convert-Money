document.getElementById('convertButton').addEventListener('click', function() {
    let amount = parseFloat(document.getElementById('amount').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    let url = 'https://v6.exchangerate-api.com/v6/248c82918d4b4d6c8f70349d/latest/USD';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let fromRate = data.conversion_rates[fromCurrency]; 
            let toRate = data.conversion_rates[toCurrency];
            
            if (!fromRate || !toRate) {
                alert("Invalid currency selected!");
                return;
            }

            let usdAmount = amount / fromRate; 
            let convertedAmount = usdAmount * toRate; 

            document.getElementById('result').textContent = `Result: ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error("An error occurred:", error);
            document.getElementById('result').textContent = "An error occurred while connecting to the API";
        });
});
