import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
} from "@nestjs/common";
import { AddToCartDto } from "../dtos/add-to-cart.dto";
import { SaveShippingDetailsDto } from "../dtos/save-shipping-details.dto";
import { CartService } from "../services/cart.service";


@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) { }

  @Post()
  addToCart(@Body() body: AddToCartDto, @Session() session: any) {
    this.cartService.cart = session.cart
      ? session.cart
      : {
        cartItems: [],
        shippingDetails: {},

      };

    const cartItem = this.cartService.addCartItem({ ...body });

    session.cart = this.cartService.cart;

    return cartItem;
  }

  @Post("shipping")
  saveShipping(@Body() body: SaveShippingDetailsDto, @Session() session: any) {
    this.cartService.cart = session.cart
      ? session.cart
      : {
        cartItems: [],
        shippingDetails: {},
      };

    const shippingDetails = this.cartService.saveShippingDetails(body);

    session.cart = this.cartService.cart;

    return shippingDetails;
  }

  @Get()
  getCart(@Session() session: any) {
    return session.cart
      ? session.cart
      : {
        cartItems: [],
        shippingDetails: {},
      };
  }


  @Delete(":id")
  removeCartItem(@Param("id") id: string, @Session() session: any) {
    this.cartService.cart = session.cart
      ? session.cart
      : {
        cartItems: [],
        shippingDetails: {},
      };

    const cartItems = this.cartService.removeCartItem(id);

    session.cart.cartItems = cartItems;

    return cartItems;
  }
  @Delete()
  setEmptyCart(@Session() session: any) {
    this.cartService.cart = session.cart
      ? session.cart
      : {
        cartItems: [],
        shippingDetails: {},
      };
    session.cart.cartItems = [];
  }
}
