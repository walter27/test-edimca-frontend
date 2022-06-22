import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';
import { MainComponent } from './main/main.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ProductComponent,
    ClientComponent,
    OrderComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TabMenuModule,
    ButtonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    TooltipModule
  ]
})
export class AdminModule { }
