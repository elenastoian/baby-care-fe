import { Component } from '@angular/core';
interface EventItem {
  status?: string;
  date?: string;
  description?: string;
}

@Component({
  selector: 'app-app.contact',
  templateUrl: './app.contact.component.html'
})
export class AppContactComponent {

  cvName: string = "Elena_Stoian_CV.pdf";

  events: EventItem[];

  constructor() {
    this.events = [
      {
        status: 'Cognizant Mobility',
        date: 'March 2024 - present',
        description: 'DESCIPRITON COGNIZANT',
      },
      {
        status: 'Endava',
        date: 'February 2022 - March 2024',
        description: 'DESCIPRITON ENDAVA',
      },
    ];
  }
  
  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/Elena_Stoian_CV.pdf';
    link.download = 'Elena_Stoian_CV.pdf'; 
    link.click();
  }
}
