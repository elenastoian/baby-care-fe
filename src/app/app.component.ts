import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    layoutMode = 'slim';

    lightMenu = true;

    topbarColor = 'layout-topbar-blue';

    inlineUser = false;

    isRTL = false;

    inputStyle = 'outlined';

    ripple = true;

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }


}
