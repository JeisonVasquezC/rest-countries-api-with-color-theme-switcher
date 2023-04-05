const storedTheme = localStorage.getItem('theme');

const getPreferredTheme = () => {

    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = function (theme) {
    localStorage.setItem('theme', theme);
    html.setAttribute('data-bs-theme', theme);

    theme == 'dark' ? themeDark() : themeLight();
}

toggleColor.addEventListener('click', (e) => {
    e.preventDefault();
    html.getAttribute('data-bs-theme') === 'dark' ? setTheme('light') : setTheme('dark');
});

const themeLight = () => {
    header.classList.remove('bg-body-tertiary');
    main.classList.add('bg-ligth-secondary');
    p.classList.remove('text-white');
    a.classList.remove('link-light');
    a.classList.add('link-dark');
    buttonBack.classList.add('bg-ligth-secondary');
    buttonBack.classList.remove('text-white');
    // dropdown.classList.add('bg-white');
    iconSearch.classList.add('bg-white');
    iconSearch.classList.remove('text-white');
    input.classList.remove('text-white');
    input.classList.add('bg-white');
    // button.classList.remove('btn-tertiary');
    // dropdownMenu.classList.remove('dropdown-menu-dark');
};

const themeDark = () => {
    header.classList.add('bg-body-tertiary');
    main.classList.remove('bg-ligth-secondary');
    p.classList.add('text-white');
    a.classList.add('link-light');
    a.classList.remove('link-dark');
    buttonBack.classList.remove('bg-ligth-secondary');
    buttonBack.classList.add('text-white');
    // dropdown.classList.remove('bg-white');
    iconSearch.classList.add('text-white');
    iconSearch.classList.remove('bg-white');
    input.classList.add('text-white');
    input.classList.remove('bg-white');
    // button.classList.add('btn-tertiary');
    // dropdownMenu.classList.add('dropdown-menu-dark');

};

setTheme(getPreferredTheme())