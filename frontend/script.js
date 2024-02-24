const table = document.getElementsByClassName('crypto-table-body'); 

var Data =[];

document.addEventListener("DOMContentLoaded", () => {

    fetch('http://localhost:5000/crypto_data')
        .then(response => response.json())
        .then(data => {
            Data = data.data;
            console.log(Data);
            renderData(Data); 
        });    
});


function renderData(data) {
    data.forEach((item,index) => {
        const row = document.createElement('div');
        row.className = 'crypto-table-row';

        const indexCell = document.createElement('p');
        indexCell.className = 'crypto-table-data-index';
        indexCell.textContent =  index + 1;

        const platformCell = document.createElement('p');
        platformCell.className = 'crypto-table-data-name';
        platformCell.textContent = item.name;

        const lastTradedPriceCell = document.createElement('p');
        lastTradedPriceCell.className = 'crypto-table-data last';
        lastTradedPriceCell.textContent = item.last ;

        const buySellPriceCell = document.createElement('p');
        buySellPriceCell.className = 'crypto-table-data-bs ';
        buySellPriceCell.textContent = ' ₹'+item.buy + ' / ' + ' ₹'+ item.sell;

        const differenceCell = document.createElement('p');
        differenceCell.className = 'crypto-table-data-volume ';
        differenceCell.textContent = item.volume; 

        const savingsCell = document.createElement('p');
        savingsCell.className = 'crypto-table-data ';
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
