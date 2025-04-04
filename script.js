document.addEventListener('DOMContentLoaded', () => {
    const countryDetails = document.getElementById('country-details');

    function fetchCountryInfo() {
        // Placeholder for fetching country information
        const countryInfo = {
            name: 'Country Name',
            population: 'Population',
            capital: 'Capital City',
            region: 'Region'
        };
        displayCountryInfo(countryInfo);
    }

    function displayCountryInfo(info) {
        countryDetails.innerHTML = `
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Population:</strong> ${info.population}</p>
            <p><strong>Capital:</strong> ${info.capital}</p>
            <p><strong>Region:</strong> ${info.region}</p>
        `;
    }

    fetchCountryInfo();
});
