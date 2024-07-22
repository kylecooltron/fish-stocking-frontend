

function fetchData() {
    const species = document.getElementById('speciesInput').value;
    fetch(`https://8uzjkhcl1e.execute-api.us-east-2.amazonaws.com/Testing/search?species=${species}`, {
        method: 'GET',
        headers: {
            'x-api-key': 'L3JDzSVe6q8SAy0j14p5Z7ZWt41NMdlvazllZUFo'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayResults(JSON.parse(data.body));
        })
        .catch(error => console.error('Error:', error));
}


function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
        resultsDiv.textContent = 'No results found';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    const headers = Object.keys(data[0]); // Use keys from the first item as headers
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach(row => {
        const dataRow = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = row[header];
            dataRow.appendChild(cell);
        });
        table.appendChild(dataRow);
    });

    resultsDiv.appendChild(table);
}