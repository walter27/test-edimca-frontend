import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'client', component: ClientComponent },
      { path: 'order', component: OrderComponent },
      { path: '**', redirectTo: 'product' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
