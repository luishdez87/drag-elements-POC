import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import sampleJson from '../assets/pantallas.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drag-btns';
  elements = [];
  selectedElements = [];
  isOver: boolean;

  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.elements = sampleJson.FFFFFFF01P02;
    console.log(sampleJson.FFFFFFF01P02);
  }

  dropDiv(event) {
    const data = JSON.parse(event.dataTransfer.getData('element'));
    this.selectedElements.push(data);
    this.isOver = false;
    this.selectedElements = this.selectedElements.map(element => {
      element.editting = false;
      return element;
    });
  }

  onDrag(event, element) {
    event.dataTransfer.setData('element', JSON.stringify(element));
  }

  allowDrop(event) {
    event.preventDefault();
    this.isOver = true;
  }

  toggleEdit(element) {
    if (!element.editting) {
      element.editting = !element.editting;
    }
  }
}
