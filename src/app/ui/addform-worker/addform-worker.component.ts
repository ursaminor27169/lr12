import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.models';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css']
})
export class AddformWorkerComponent implements OnInit {

  name: string;
  surname: string;
  phone: string;
  type = 0;
  mask = [ '+', 7,'(', /9/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  MyWorkerType = MyWorkerType;
  
  addForm: FormGroup;

  @Output() addWorker = new EventEmitter<MyWorker>();

  constructor() { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required, Validators.pattern(/\S/)]),
      surname: new FormControl(this.surname, [Validators.required, Validators.pattern(/\S/)]),
      phone: new FormControl(this.phone, [Validators.required, Validators.pattern("[+]{1}[7]{1}[(]{1}[9]{1}[0-9]{2}[)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}")]),
      type: new FormControl(this.type)
    });
  }

  onAddWorker() {
    let worker: MyWorker = {
      name: this.addForm.value.name,
      surname: this.addForm.value.surname,
      phone: this.addForm.value.phone,
      type: this.addForm.value.type
    }
    this.addWorker.emit(worker);
    this.addForm.reset(); //очистка формы
  }
}
