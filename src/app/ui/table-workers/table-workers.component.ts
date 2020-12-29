import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.models';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  changingWorkerId = -1;
  changingWorker: MyWorker;
  MyWorkerType = MyWorkerType;
  name: string;
  surname: string;
  phone: string;
  type = 0;
  mask = [ '+', 7,'(', /9/, /[1-9]/, /[1-9]/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
  
  changeForm: FormGroup;

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = new EventEmitter<number>();
  @Output() saveWorker = new EventEmitter<MyWorker>();

  constructor() { }

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required, Validators.pattern(/\S/)]),
      surname: new FormControl(this.surname, [Validators.required, Validators.pattern(/\S/)]),
      phone: new FormControl(this.phone, [Validators.required, Validators.pattern("[+]{1}[7]{1}[(]{1}[9]{1}[0-9]{2}[)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}")]),
      type: new FormControl(this.type)
    });
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onChangeWorker(id: number) {
    this.changingWorker = this.workers.find(item => item.id == id);
    this.changingWorkerId = id;
    this.changeForm.patchValue({ //вводим данные в инпуты изначально
      name: this.changingWorker.name,
      surname: this.changingWorker.surname,
      phone: this.changingWorker.phone,
      type: this.changingWorker.type
    });
  }

  onSaveWorker() {
    let worker: MyWorker = {
      id: this.changingWorkerId,
      name: this.changeForm.value.name,
      surname: this.changeForm.value.surname,
      phone: this.changeForm.value.phone,
      type: this.changeForm.value.type
    }
    this.changingWorkerId = -1; //закрываем блок
    this.changeForm.reset(); //очистка формы
    this.saveWorker.emit(worker);
  }

  onClose() {
    this.changingWorkerId = -1; //закрываем блок
  }
}
