// window.location.hash = '#!/';
let hash = '#!';

const app = document.querySelector('#app'),
    news = document.querySelector('.news'),
    headerLink = [...document.querySelectorAll('.header__link')];
headerLink.forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault();
    let address = this.getAttribute('href').toLowerCase();
    // toggleClass(this);
    let activePage = pages.find(item => item.url == address);
    window.location.hash = hash + address;
    mount(new activePage.component({}).print(), address);
}));
let toggleClass = (elem) => {
    headerLink.forEach(item => {
        item.classList.remove('active');
    })
    if(elem) elem.classList.add('active');
}


class Home {
    constructor({ title = 'Home', descr = 'Home page' }) {
        this.title = title;
        this.descr = descr;
        this.print();
    }
    print() {
        let div = `
            <h3>${this.title}</h3>
            <p class="home__info">${this.descr}</p>
        `;
        return div;
    }
}
class Portfolio {
    constructor({ title = 'Portfolio', descr = 'Portfolio page' }) {
        this.title = title;
        this.descr = descr;
        this.print();
    }
    print() {
        let div = `
            <h3>${this.title}</h3>
            <p class="home__info">${this.descr}</p>
        `;
        return div;
    }
}
class Contacts {
    constructor({ title = 'Contacts', descr = 'Contacts page' }) {
        this.title = title;
        this.descr = descr;
        this.print();
    }
    print() {
        let div = `
            <h3>${this.title}</h3>
            <p class="contacts__info">${this.descr}</p>
        `;
        return div;
    }
}
class AboutMe {
    constructor({ title = 'About Me', descr = 'About Me page' }) {
        this.title = title;
        this.descr = descr;
        this.print();
    }
    print() {
        let div = `
            <h3>${this.title}</h3>
            <p class="about__info">${this.descr}</p>
        `;
        return div;
    }
}
class Info {
    constructor({ title = 'Info', descr = 'Info page' }) {
        this.title = title;
        this.descr = descr;
        this.print();
    }
    print() {
        let div = `
            <h3>${this.title}</h3>
            <p class="info__info">${this.descr}</p>
        `;
        return div;
    }
}
class Article {
    constructor({ title = 'Article page', descr = 'Article about ', number = 1 }) {
        this.title = title;
        this.descr = descr;
        this.number = number;
        this.print()

    }
    async print() {
        let curRoute = window.location.hash.toLowerCase();
        curRoute = curRoute.replace(hash, '');
        let dynamic = '';
        if(curRoute.search(/\/\w*$/gm)) dynamic = curRoute.replace(/\w*\//gm, '');
        else dynamic = 1;
        this.number = dynamic;
        let res = await fetch(`https://jsonplaceholder.typicode.com/comments/${this.number}`);
        let body = res.ok ? await res.json() : {};
        let div = `
            <h3>${body.name ? body.name : this.title}</h3>
            <h3>Article №${this.number}</h3>
            <p class="info__info">${body.body ? body.body : this.descr}</p>
        `;
        return div;
    }
}
class ErrorPage {
    constructor({ title = 'Ошибка 404' }) {
        this.title = title;
        this.print();
    }
    print() {
        let err = `<div class="error">
                    <p class="error__info">${this.title}</p>
                </div>`;
        return err;
    }
}
let pages = [
    {
        name: 'home',
        url: "",
        component: Home
    },
    {
        name: 'portfolio',
        url: "/portfolio",
        component: Portfolio
    },
    {
        name: 'contacts',
        url: "/contacts",
        component: Contacts
    },
    {
        name: 'about_me',
        url: "/about_me",
        component: AboutMe
    },
    {
        name: 'info',
        url: "/info",
        component: Info
    },
    {
        name: 'articles',
        url: '/articles',
        component: Article
    }
];
async function mount(component = new pages[0].component({}).print(), route) {
    let curRoute = window.location.hash.toLowerCase();
    curRoute = curRoute.replace(hash, '');
    if(curRoute.search(/\/\w*$/gm)){
        curRoute = curRoute.replace(/\/\w*$/gm, '');
    }
    let activeLink = headerLink.find(item => item.getAttribute('href') == curRoute);
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].url == curRoute) {
            toggleClass(activeLink);
            if (new pages[i].component({}).print() instanceof Promise) {
                new pages[i].component({}).print().then(res => {
                    app.innerHTML = res;
                })
                break;
            }
            else app.innerHTML = new pages[i].component({}).print();
            console.log('cur Route');
            break;
        }
        else if (route && pages[i].url == route) {
            toggleClass(activeLink);
            app.innerHTML = component;
            break;
        }
        else {
            console.log('fuck');
            app.innerHTML = new ErrorPage({}).print();
        }
    }
};
mount();
window.addEventListener('hashchange', function(e){
    mount();
});

