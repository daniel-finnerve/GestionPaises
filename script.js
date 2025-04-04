document.addEventListener('DOMContentLoaded', () => {
    const countryDetails = document.getElementById('country-details');
    const searchInput = document.getElementById('search-input');
    const countryTableBody = document.querySelector('#country-table tbody');
    const addCountryForm = document.getElementById('add-country-form');

    function fetchCountryInfo() {
        // Placeholder for fetching country information
        const countryInfo = [
            { name: 'Country Name 1', population: 'Population 1', capital: 'Capital City 1', region: 'Region 1' },
            { name: 'Country Name 2', population: 'Population 2', capital: 'Capital City 2', region: 'Region 2' },
            { name: 'Country Name 3', population: 'Population 3', capital: 'Capital City 3', region: 'Region 3' }
        ];
        displayCountryInfo(countryInfo);
    }

    function displayCountryInfo(info) {
        countryTableBody.innerHTML = '';
        info.forEach(country => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${country.name}</td>
                <td>${country.population}</td>
                <td>${country.capital}</td>
                <td>${country.region}</td>
            `;
            countryTableBody.appendChild(row);
        });
    }

    function filterCountryInfo() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCountries = countryInfo.filter(country => 
            country.name.toLowerCase().includes(searchTerm) ||
            country.population.toLowerCase().includes(searchTerm) ||
            country.capital.toLowerCase().includes(searchTerm) ||
            country.region.toLowerCase().includes(searchTerm)
        );
        displayCountryInfo(filteredCountries);
    }

    function addCountry(event) {
        event.preventDefault();
        const newCountry = {
            name: addCountryForm['country-name'].value,
            population: addCountryForm['country-population'].value,
            capital: addCountryForm['country-capital'].value,
            region: addCountryForm['country-region'].value
        };
        countryInfo.push(newCountry);
        displayCountryInfo(countryInfo);
        addCountryForm.reset();
    }

    searchInput.addEventListener('input', filterCountryInfo);
    addCountryForm.addEventListener('submit', addCountry);

    fetchCountryInfo();
});
