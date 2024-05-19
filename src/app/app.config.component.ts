import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    template: ''
    //'./app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    themeColor = 'blue';

    topbarColors: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent) {}

    ngOnInit() {
        this.topbarColors = [
            {label: 'layout-topbar-light', logo: 'logo-roma', color: '#ffffff'},
            {label: 'layout-topbar-dark', logo: 'logo-roma-white', color: '#252529'},
            {label: 'layout-topbar-blue', logo: 'logo-roma-white', color: '#0772B3'},
            {label: 'layout-topbar-green', logo: 'logo-roma-white', color: '#0F8C50'},
            {label: 'layout-topbar-orange', logo: 'logo-roma-white', color: '#C76D09'},
            {label: 'layout-topbar-magenta', logo: 'logo-roma-white', color: '#972BB1'},
            {label: 'layout-topbar-bluegrey', logo: 'logo-roma-white', color: '#406E7E'},
            {label: 'layout-topbar-deeppurple', logo: 'logo-roma-white', color: '#543CD9'},
            {label: 'layout-topbar-brown', logo: 'logo-roma-white', color: '#794F36'},
            {label: 'layout-topbar-lime', logo: 'logo-roma-white', color: '#849201'},
            {label: 'layout-topbar-rose', logo: 'logo-roma-white', color: '#8F3939'},
            {label: 'layout-topbar-cyan', logo: 'logo-roma-white', color: '#0C8990'},
            {label: 'layout-topbar-teal', logo: 'logo-roma-white', color: '#337E59'},
            {label: 'layout-topbar-deeporange', logo: 'logo-roma-white', color: '#D74A1D'},
            {label: 'layout-topbar-indigo', logo: 'logo-roma-white', color: '#3D53C9'},
            {label: 'layout-topbar-pink', logo: 'logo-roma-white', color: '#BF275B'},
            {label: 'layout-topbar-purple', logo: 'logo-roma-white', color: '#7F32DA'}
        ];

        this.themes = [
            {label: 'blue', color: '#0f97c7'},
            {label: 'green', color: '#10B163'},
            {label: 'orange', color: '#E2841A'},
            {label: 'magenta', color: '#B944D6'},
            {label: 'bluegrey', color: '#578697'},
            {label: 'deeppurple', color: '#6952EC'},
            {label: 'brown', color: '#97664A'},
            {label: 'lime', color: '#A5B600'},
            {label: 'rose', color: '#AB5353'},
            {label: 'cyan', color: '#1BA7AF'},
            {label: 'teal', color: '#4EA279'},
            {label: 'deeporange', color: '#F96F43'},
            {label: 'indigo', color: '#435AD8'},
            {label: 'pink', color: '#E93A76'},
            {label: 'purple', color: '#9643F9'}
        ];
    }

    changeTheme(theme: string) {
        this.changeStyleSheetsColor('layout-css', 'layout-' + theme + '.css');
        this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css');
        this.themeColor = theme;
    }

    changeTopbarColor(topbarColor, logo) {
        this.app.topbarColor = topbarColor;
        const topbarLogoLink: HTMLImageElement = document.getElementById('topbar-logo') as HTMLImageElement;
        topbarLogoLink.src = 'assets/layout/images/' + logo + '.svg';
    }

    changeStyleSheetsColor(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.appMain.configActive = false;
        event.preventDefault();
    }
}
