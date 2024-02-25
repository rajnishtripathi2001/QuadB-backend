const table = document.getElementsByClassName('crypto-table-body'); 
const avg = document.getElementById('avg-price');

var Data =[];

document.addEventListener("DOMContentLoaded", () => {

    fetch('https://ambitious-haircut-production.up.railway.app/crypto_data') // replace with "http://localhost:5000/crypto_data" for local server
        .then(response => response.json())
        .then(data => {
            Data = data.data;
            renderData(Data); 
            calculateAverage(Data);
        });    
});


function renderData(data) {
    data.forEach((item,index) => {
        const row = document.createElement('div');
        row.className = 'crypto-table-row';

        const indexCell = document.createElement('p');
        indexCell.textContent =  index + 1;

        const platformCell = document.createElement('p');
        platformCell.textContent = item.name;

        const lastTradedPriceCell = document.createElement('p');
        lastTradedPriceCell.textContent = ' ₹'+item.last ;

        const buySellPriceCell = document.createElement('p');
        buySellPriceCell.textContent = ' ₹'+item.buy + ' / ' + ' ₹'+ item.sell;

        const differenceCell = document.createElement('p');
        differenceCell.textContent = item.volume; 

        const savingsCell = document.createElement('p');
        savingsCell.textContent = item.base_unit; 

        row.appendChild(indexCell);
        row.appendChild(platformCell);
        row.appendChild(lastTradedPriceCell);
        row.appendChild(buySellPriceCell);
        row.appendChild(differenceCell);
        row.appendChild(savingsCell);

        table[0].appendChild(row);
    });
}

// calculate average Last Traded Price

function calculateAverage(data) {
    let sum = 0;
    data.forEach((item) => {
        sum += Number(item.last);
    });
    avg.textContent = '₹' + (sum / Data.length).toFixed(0);
}

