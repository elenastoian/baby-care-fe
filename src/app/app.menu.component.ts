import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'],
            },
            {
                label: 'Parent profile', icon: 'pi pi-user', routerLink: ['/profile'],
            },
            {
                label: 'Babies', icon: 'pi pi-users', routerLink: ['/babies'],
            },
            {
                label: 'Baby Tracker', icon: 'pi pi-calendar', routerLink: ['/tracker'],
            },
            {
                label: 'About', icon: 'pi pi-id-card', routerLink: ['/contact'],
            },
        ];
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
