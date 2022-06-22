import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../../iterface/iterfaces';
import { ClientService } from '../../services/client.service';

import { Message } from 'primeng/api';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  cols!: any[];
  listClients: Client[] = [];
  client: Client = {
    name: '',
    lastName: '',
    dni: ''
  };
  showMessageSuccess: boolean = false;
  showMessageError: boolean = false;
  displayDialog: boolean = false;
  messageComponente: Message[] = [];


  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'dni', header: 'Dni' },
      { field: 'name', header: 'Name' },
      { field: 'lastName', header: 'Last name' },
      { field: '', header: 'Actions' }
    ];
    this.getClients();
  }

  getClients() {
    this.clientService.listClient().subscribe(
      {
        next: (resp) => {
          this.listClients = resp;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }


  addClient(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.clientService.addClient(this.client).subscribe(
      {
        next: (resp) => {
          this.showMessageSuccess = true;
          this.displayMessage();
          this.displayDialog = false;
          form!.reset();
          this.getClients();
          this.client = {
            name: '',
            lastName: '',
            dni: ''
          };
        },
        error: (error) => {
          this.showMessageError = true
          this.displayDialog = false;
          form!.reset();
        }
      }
    )
  }

  updateClient(clientTable: Client) {
    this.displayDialog = true;
    this.client = {
      id: clientTable.id,
      dni: clientTable.dni,
      name: clientTable.name,
      lastName: clientTable.lastName
    };

  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client.id!).subscribe(
      {
        next: (resp) => {
          this.getClients();
          this.displayMessage();
          this.showMessageSuccess = true;
        },
        error: (error) => {
          this.showMessageError = true

        }
      }
    )
  }

  closeDialog() {
    this.client = {
      name: '',
      lastName: '',
      dni: ''
    };
  }

  showDialog() {
    this.client = {
      name: '',
      lastName: '',
      dni: ''
    };
    this.displayDialog = true;
  }

  enableButton(): boolean {
    if (this.client.dni!.length > 0 && this.client.name!.length > 0 && this.client.lastName!.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  displayMessage() {
    if (this.showMessageSuccess) {
      this.messageComponente = [
        { severity: 'success', summary: '', detail: 'Successfully process.' },
      ];
    }
    if (this.showMessageError) {
      this.messageComponente = [
        { severity: 'error', summary: '', detail: 'Error in the process.' },
      ];
    }

    setTimeout(() => {
      this.messageComponente = [];
    }, 2000);
  }

}
