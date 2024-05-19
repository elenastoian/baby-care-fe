import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './miscdemo.component.html',
})
export class MiscDemoComponent implements OnInit {

    value = 0;

    ngOnInit() {
        const interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if (this.value >= 100) {
                this.value = 100;
                clearInterval(interval);
            }
        }, 2000);
    }
}
