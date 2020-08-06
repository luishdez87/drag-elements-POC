import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import sampleJson from '../assets/pantallas.json';
import { slide } from './slide';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slide]
})
export class AppComponent implements OnInit {
  title = 'drag-btns';
  elements = [];
  selectedElements = [];
  elementToEdit: any;
  isOver: boolean;
  isEditting: boolean;

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
      this.isEditting = true;
      element.editting = !element.editting;
      this.elementToEdit = element;
    }
  }

  save() {
    this.elementToEdit.editting = false;
    this.elementToEdit = null;
    setTimeout(() => {
      this.isEditting = false;
    }, 500);
  }
}
