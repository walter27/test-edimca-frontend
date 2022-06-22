import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items!: MenuItem[];


  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Product', icon: 'pi pi-fw pi-inbox', routerLink: 'product' },
      { label: 'Client', icon: 'pi pi-fw pi-users', routerLink: 'client' },
      { label: 'Order', icon: 'pi pi-fw pi-list', routerLink: 'order' }
    ];
  }

}
