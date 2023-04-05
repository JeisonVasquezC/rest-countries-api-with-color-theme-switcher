const navigator = () => {
    location.hash.startsWith('#country=') ? designDetail()   :
    homePage()
}

const designDetail = () => {
    cardsContainer.classList.add('d-none');
    filterUtilities.classList.add('d-none');
    buttonBack.classList.remove('d-none');
    buttonBack.classList.remove('d-none');

    const [_, movieName] = location.hash.split('=');

    countriesFilter({ countryName: movieName });
};

const homePage = () => {
    cardsContainer.classList.remove('d-none');
    filterUtilities.classList.remove('d-none');
    buttonBack.classList.add('d-none');
    buttonBack.classList.add('d-none');

    countriesFilter();
};

window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator);
buttonBack.addEventListener('click', () => {
    location.hash = '';
});