// Utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-src');
            entry.target.setAttribute('src', url)
        }
    });
});

const pattern = new RegExp('^[A-Z]+$', 'i');
const codeKeys = [9,13,16,17,18,19,20,27,32,33,34,35,36,37,38,39,40,44,45,91,144,145,173,174,175,181,182,183];

const getCountries = async () => {
    const res = await fetch('../data.json');
    const data = await res.json();

    return await data;
};

const countriesFilter = ({ search = null, countryName = null } = {}) => {
    getCountries()
    .then(countriesList => {
        if(countryName){
            countries = countriesList.filter(country => country.name.includes(countryName));
            country = countries[0];
            detailContainer.textContent = '';
            createDetailCountry(country.flags.svg, country.name, country.nativeName, country.population, country.region, country.subregion, country.capital, country.topLevelDomain, country.currencies[0].name, country.languages[0].name, country.borders);
            return;
        }
        else if(search){
            countries = countriesList.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
        }else{
            if (listRegion.value != 'undefined') {
                countries = countriesList.filter(country => country.region === listRegion.value);  
            } else {
                countries = countriesList;
            }
        }

        cardsContainer.textContent = '';
        detailContainer.textContent = '';

        countries.forEach(country => {
            createCardCountry(country.flags.svg, country.name, country.population, country.region, country.capital);
        });
    });
};

const createCardCountry = (flagCountry, nameCountry, numberPopulation, region, capital) => {
    const article = document.createElement('article');
    article.classList.add('col');;

    const divCard = document.createElement('div');
    divCard.classList.add('card');

    divCard.addEventListener('click', () => {
        countriesFilter({ countryName: nameCountry });
        location.hash = `#country=${nameCountry}`;
    });

    const img = document.createElement('img');
    // img.src = flagCountry;
    img.setAttribute('data-src', flagCountry);
    img.alt = `flag ${nameCountry}`;
    img.classList.add('card-img-top');

    const divBody = document.createElement('div');
    divBody.classList.add('card-body', 'mb-4');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title', 'fw-bold');
    h5.textContent = nameCountry;

    const pPopulation = document.createElement('p');
    pPopulation.classList.add('card-text', 'mb-0');
    const spanPopulation = document.createElement('span');
    spanPopulation.classList.add('fw-bold');
    spanPopulation.textContent = 'Population: ';
    pPopulation.append(spanPopulation, new Intl.NumberFormat('de-DE', {currency: 'USD' }).format(numberPopulation));
    

    const pRegion = document.createElement('p');
    pRegion.classList.add('card-text', 'mb-0');
    const spanRegion = document.createElement('span');
    spanRegion.classList.add('fw-bold');
    spanRegion.textContent = 'Region: ';
    pRegion.append(spanRegion, region);

    const pCapital = document.createElement('p');
    pCapital.classList.add('card-text', 'mb-0');
    const spanCapital = document.createElement('span');
    spanCapital.classList.add('fw-bold');
    spanCapital.textContent = 'Capital: ';
    pCapital.append(spanCapital, capital);

    lazyLoader.observe(img);

    divBody.append(h5, pPopulation, pRegion, pCapital);
    divCard.append(img, divBody);
    article.appendChild(divCard);

    cardsContainer.appendChild(article);
};

const createDetailCountry = (flagCountry, nameCountry, nativeName, numberPopulation, region, subregion, capital, topLevelDomain, currencies, languages, borders) => {
    const sectionImg = document.createElement('section');
    sectionImg.classList.add('col-10', 'col-md-5');

    const img = document.createElement('img');
    img.setAttribute('src', flagCountry);
    img.setAttribute('alt', `Flag ${nameCountry}`);
    img.classList.add('img-fluid');

    sectionImg.appendChild(img);

    const sectionInfo = document.createElement('section');
    sectionInfo.classList.add('col-10', 'col-md-8', 'col-lg-6', 'ps-lg-5');

    h2Name = document.createElement('h2');
    h2Name.classList.add('fw-bold', 'mb-4', 'mt-3', 'mt-lg-0');
    h2Name.textContent = nameCountry;

    const containerInfo = document.createElement('section');
    containerInfo.classList.add('d-flex', 'flex-column', 'flex-md-row', 'justify-content-between', 'w-100', 'mb-5', 'mb-md-4');

    const articleOne = document.createElement('article');
    articleOne.classList.add('mb-4', 'mb-lg-0');

    const pNativeName = document.createElement('p');
    pNativeName.classList.add('mb-1');
    pNativeName.textContent = 'Native Name: ';
    const spanNativeName = document.createElement('span');
    spanNativeName.classList.add('fw-bold');
    spanNativeName.textContent = nativeName;
    pNativeName.appendChild(spanNativeName);

    const pPopulation = document.createElement('p');
    pPopulation.classList.add('mb-1');
    pPopulation.textContent = 'Population: ';
    const spanPopulation = document.createElement('span');
    spanPopulation.classList.add('fw-bold');
    spanPopulation.textContent = new Intl.NumberFormat('de-DE', {currency: 'USD' }).format(numberPopulation);
    pPopulation.appendChild(spanPopulation);


    const pRegion = document.createElement('p');
    pRegion.classList.add('mb-1');
    pRegion.textContent = 'Region: ';
    const spanRegion = document.createElement('span');
    spanRegion.classList.add('fw-bold');
    spanRegion.textContent = region;
    pRegion.appendChild(spanRegion);

    const pSubRegion = document.createElement('p');
    pSubRegion.classList.add('mb-1');
    pSubRegion.textContent = 'Sub Region: ';
    const spanSubRegion = document.createElement('span');
    spanSubRegion.classList.add('fw-bold');
    spanSubRegion.textContent = subregion;
    pSubRegion.appendChild(spanSubRegion);

    const pCapital = document.createElement('p');
    pCapital.classList.add('mb-1');
    pCapital.textContent = 'Capital: ';
    const spanCapital = document.createElement('span');
    spanCapital.classList.add('fw-bold');
    spanCapital.textContent = capital;
    pCapital.appendChild(spanCapital);

    articleOne.append(pNativeName, pPopulation, pRegion, pSubRegion, pCapital);

    const articleTwo = document.createElement('article');

    const pLevelDomain = document.createElement('p');
    pLevelDomain.classList.add('mb-1');
    pLevelDomain.textContent = 'Top Level Domain: ';
    const spanLevelDomain = document.createElement('span');
    spanLevelDomain.classList.add('fw-bold');
    spanLevelDomain.textContent = topLevelDomain;
    pLevelDomain.appendChild(spanLevelDomain);

    const pCurrencies = document.createElement('p');
    pCurrencies.classList.add('mb-1');
    pCurrencies.textContent = 'Currencies: ';
    const spanCurrencies = document.createElement('span');
    spanCurrencies.classList.add('fw-bold');
    spanCurrencies.textContent = currencies;
    pCurrencies.appendChild(spanCurrencies);

    const pLanguages = document.createElement('p');
    pLanguages.classList.add('mb-1');
    pLanguages.textContent = 'Languajes: ';
    const spanLanguages = document.createElement('span');
    spanLanguages.classList.add('fw-bold');
    spanLanguages.textContent = languages;
    pLanguages.appendChild(spanLanguages);

    articleTwo.append(pLevelDomain, pCurrencies, pLanguages);

    containerInfo.append(articleOne, articleTwo);

    const sectionBorderCou = document.createElement('section');
    sectionBorderCou.classList.add('d-flex', 'flex-column', 'flex-lg-row', 'align-items-start', 'align-items-lg-center');

    const divSPan = document.createElement('div');
    divSPan.classList.add('text-Start');
    const spanBorderCou = document.createElement('span');
    spanBorderCou.classList.add('fw-bold', 'me-3');
    spanBorderCou.textContent = 'Border Countires';
    divSPan.appendChild(spanBorderCou);

    const divCountriesBorder = document.createElement('div');
    if(borders){
        borders.forEach(item => {
            const buttonCountry = document.createElement('button');
            buttonCountry.classList.add('btn', 'btn-outline-secondary', 'me-1', 'mb-1');
            buttonCountry.textContent = item;
            divCountriesBorder.appendChild(buttonCountry);
        });
    }

    sectionBorderCou.append(divSPan, divCountriesBorder);

    sectionInfo.append(h2Name, containerInfo,sectionBorderCou);

    detailContainer.append(sectionImg, sectionInfo);
};

formSelect.addEventListener('change', () => {
    countriesFilter();
});

input.addEventListener('keyup', e => {
    e.preventDefault();
    if(codeKeys.includes(e.keyCode)) return;
    if(!pattern.test(e.key)) return;
    countriesFilter({ search: input.value.trim() });
});

window.addEventListener('load', () => {
    // countriesFilter();
});

