export interface Client {
  id?: number;
  dni?: string;
  name?: string;
  lastName?: string
}

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number
}

export interface Order {
  id?: number;
  date?: Date;
  total?: number;
  client?: Client;
  listDetails?: OrderDetail[]
}

export interface OrderDetail {
  id?: number;
  cuantity?: number;
  subTotal?: number;
  product?: Product;
  date?: Date;

}


export interface Authority {
  authority: string;
}

export interface User {
  password?: any;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Login {
  mensaje: string;
  user: User;
  token: string;
}

export interface UserEdimca {
  username: string;
  password: string
}





