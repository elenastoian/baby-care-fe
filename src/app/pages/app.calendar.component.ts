import {Component, OnInit} from '@angular/core';
import {EventService} from '../demo/service/eventservice';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
    templateUrl: './app.calendar.component.html',
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .fc-header-toolbar {
                display: flex;
                flex-wrap: wrap;

                .fc-dayGridMonth-button {
                    margin-top: 1rem;
                }
                .fc-timeGridWeek-button{
                    margin-top: 1rem;
                }
                .fc-timeGridDay-button{
                    margin-top: 1rem;
                }
            }
        }

        :host ::ng-deep {
            .fc.fc-theme-standard .fc-highlight {
                color: #ffffff;
                background: var(--fc-highlight-color, rgba(63, 81, 181, 0.12));
            }
        }
    `]
})
export class AppCalendarComponent implements OnInit {

    events: any[];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    clickedEvent = null;

    constructor(private eventService: EventService) {}

    ngOnInit() {
        this.eventService.getEvents().then(events => {
            this.events = events;
            this.options = {...this.options, ...{events: events}};
        });

        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate: '2021-02-01',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e) => {
                this.eventDialog = true;

                this.clickedEvent = e.event;

                this.changedEvent.title = this.clickedEvent.title;
                this.changedEvent.start = this.clickedEvent.start;
                this.changedEvent.end = this.clickedEvent.end;
            }
        };

        this.changedEvent = {title: '', start: null, end: '', allDay: null};
    }

    save() {
        this.eventDialog = false;

        this.clickedEvent.setProp('title', this.changedEvent.title);
        this.clickedEvent.setStart(this.changedEvent.start);
        this.clickedEvent.setEnd(this.changedEvent.end);
        this.clickedEvent.setAllDay(this.changedEvent.allDay);

        this.changedEvent = {title: '', start: null, end: '', allDay: null};
    }

    reset() {
        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
    }
}
