import { OrderDTO, OrderItemDTO } from "../models/order";
import { CART_KEY } from '../utils/system';

export function save(cart: OrderDTO) {

    const saveCart: string  = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, saveCart)

}

export function get() : OrderDTO {

    const cartEmpty: string = '{"items":[]}';
    const cartFull: string = localStorage.getItem(CART_KEY) ?? cartEmpty;
    const obj = JSON.parse(cartFull) as OrderDTO;
    const cart  = new OrderDTO();
    obj.items.forEach(x => {
        cart.items.push(new OrderItemDTO(x.productId, x.quantity, x.name, x.price, x.imgUrl));
    })
    return cart;

}


export function clear() {

    const cartEmpty: string = '{"items":[]}';
    localStorage.setItem(CART_KEY, cartEmpty );

}