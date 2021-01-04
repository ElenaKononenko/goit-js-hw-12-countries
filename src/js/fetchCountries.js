export default function fetchCountries(searchQuery, place, displayResult) {
  if (searchQuery.replace(/\s+/g, '') === '') {
    return;
  }
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(res => {
      return res.json();
    })
    .then(data => displayResult(data, place))
    .catch(e => {
      console.log(e);
    });
}
