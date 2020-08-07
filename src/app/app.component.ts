import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import sampleJson from '../assets/pantallas.json';
import { slide } from './slide';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

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

  constructor(private storage: AngularFireStorage) {}


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

  showSelectedList() {
    const json = {
      inicial: 'FFFFFFF01P01',
      FFFFFFF01P01: this.selectedElements
    };

    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const filePath = `/jsons/${Date.now()}.json`;
    const task = this.storage.upload(filePath, blob);

    // observe percentage changes
    task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => alert('JSON enviado correctamente!') )
      )
    .subscribe();
  }
}
