import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'students',
    template: '<h2>{{ getTitle() }}</h2>'
})

export class StudentsComponent { 

    title = "My List Students";

    getTitle() {

        return this.title;
    }

    getDate() {

        return new Date().getDate();
    }
}