export class Router {
    routes = {};


    add(routeName, page, bgimg) {
        this.routes[routeName] = page;
        this.bg = bgimg
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();

        window.history.pushState({}, "", event.target.href);

        const changeNav = document.querySelector('.checked')
        if (changeNav !== null) {
            changeNav.classList.remove('checked');
        }
        event.path[0].classList.add('checked');

        


        this.handle()
        
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
        this.bgChange()

        fetch(route)
            .then(data => data.text())

            .then(html => {
                document.querySelector('#app').innerHTML = html
            })
    }

    bgChange() {
        const { pathname } = window.location;

        const { body } = document;

        switch (pathname) {
            case '/exploracao':
                body.className = 'explore';
                break;

            case '/universo':
                body.className = 'universe';
                break;

            case '/':
                body.className = 'home';
                break;

            default:
                body.className = '';
                break;
        }
    }
}