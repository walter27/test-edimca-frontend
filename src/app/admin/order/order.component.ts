import { Component, OnInit } from '@angular/core';
import { Client, Order, OrderDetail, Product } from '../../iterface/iterfaces';
import { ProductService } from '../../services/product.service';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  colsProduct!: any[];
  colsClient!: any[];
  colsOrderDetail!: any[];
  listOrderDetail: OrderDetail[] = [];
  listProduct: Product[] = [];
  listClient: Client[] = [];
  displayDialogClient: boolean = false;
  displayDialogProduct: boolean = false;
  showMessageSuccess: boolean = false;
  showMessageError: boolean = false;
  messageComponente: Message[] = [];
  product: Product = {
    name: '',
    description: '',
    price: 0
  };
  client: Client = {
    name: '',
    lastName: '',
    dni: ''
  };
  order: Order = {
    listDetails: this.listOrderDetail,
    client: this.client
  }
  orderDetail: OrderDetail = {
    cuantity: 0,
    product: this.product
  }

  constructor(
    private productService: ProductService,
    private clientService: ClientService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.colsProduct = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: '', header: 'Actions' }
    ];
    this.colsClient = [
      { field: 'dni', header: 'Dni' },
      { field: 'name', header: 'Name' },
      { field: 'lastName', header: 'Last name' },
      { field: '', header: 'Actions' }
    ];
    this.colsOrderDetail = [
      { field: '', header: 'N°' },
      { field: 'product', header: 'Product' },
      { field: 'cuantity', header: 'cuantity' },
      { field: 'subTotal', header: 'Subtotal' },
      { field: '', header: 'Delete' }

    ];
    this.getProducts();
    this.getClients();
  }

  getProducts() {
    this.productService.listProduct().subscribe(
      {
        next: (resp) => {
          this.listProduct = resp;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  getClients() {
    this.clientService.listClient().subscribe(
      {
        next: (resp) => {
          this.listClient = resp;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  showProduct() {
    this.displayDialogProduct = true;
    this.product = {
      name: '',
      description: '',
      price: 0
    };
  }

  showClient() {
    this.displayDialogClient = true;
    this.client = {
      name: '',
      lastName: '',
      dni: ''
    };
  }

  selectClient(clientTable: Client) {
    this.client = {
      id: clientTable.id,
      name: clientTable.name,
      lastName: clientTable.lastName,
      dni: clientTable.dni
    }
    this.displayDialogClient = false;
  }

  selectProduct(productTable: Product) {
    if (this.listOrderDetail.filter(o => o.product?.id === productTable.id).length > 0) {
      let index = this.listOrderDetail.findIndex(o => o.product?.id === productTable.id);
      this.listOrderDetail[index].cuantity = this.listOrderDetail[index].cuantity! + 1;
      this.listOrderDetail[index].subTotal = this.listOrderDetail[index].product?.price! * this.listOrderDetail[index].cuantity!;
    } else {
      let subTotal = productTable.price! * 1;
      this.orderDetail = {
        cuantity: 1,
        product: productTable,
        subTotal: subTotal
      }
      this.listOrderDetail.push(this.orderDetail)
    }
    this.calcularTotal();
    this.displayDialogProduct = false;
  }

  deleteOrderDetail(orderDetailTable: OrderDetail) {
    let index = this.listOrderDetail.findIndex(o => o.id === orderDetailTable.id);
    this.listOrderDetail.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal() {
    let total = 0;
    if (this.listOrderDetail.length > 0) {
      for (const orderDetail of this.listOrderDetail) {
        total += orderDetail.subTotal!;
      }
    }
    this.order.total = total;
  }

  enableButton(): boolean {
    if (this.client.name?.length! > 0 && this.listOrderDetail.length! > 0) {
      return false;
    } else {
      return true;
    }
  }

  saveOrder() {
    this.order.client = this.client;
    this.order.listDetails = this.listOrderDetail;
    this.orderService.addOrder(this.order).subscribe(
      {
        next: (resp) => {
          this.showMessageSuccess = true;
          this.displayMessage();
          this.product = {
            name: '',
            description: '',
            price: 0
          };

          this.client = {
            name: '',
            lastName: '',
            dni: ''
          };
          this.order = {
            listDetails: this.listOrderDetail,
            client: this.client
          }
          this.orderDetail = {
            cuantity: 0,
            product: this.product
          }

          this.listOrderDetail = [];
        },
        error: (error) => {
          console.log(error);

          this.showMessageError = true
          this.displayMessage();
        }
      }
    );

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
