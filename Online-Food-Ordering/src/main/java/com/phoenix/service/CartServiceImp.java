package com.phoenix.service;

import com.phoenix.model.Cart;
import com.phoenix.model.CartItem;
import com.phoenix.model.Food;
import com.phoenix.model.User;
import com.phoenix.repository.CartItemRepository;
import com.phoenix.repository.CartRepository;
import com.phoenix.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest addCartItemRequest, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Food food = foodService.findFoodById(addCartItemRequest.getFoodId());

        Cart cart = cartRepository.findByCustomerId(user.getId());

        for(CartItem cartItem : cart.getItems()){
            if(cartItem.getFood().equals(food)){
                int newQuantity = cartItem.getQuantity() + addCartItemRequest.getQuantity();

                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }

        CartItem newCartItem = new CartItem();

        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(addCartItemRequest.getQuantity());
        newCartItem.setIngredients(addCartItemRequest.getIngredients());
        newCartItem.setTotalPrice(addCartItemRequest.getQuantity()*food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);

        cart.getItems().add(savedCartItem);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);

        if(optionalCartItem.isEmpty()){
            throw new Exception("Cart Item Not Found");
        }

        CartItem item = optionalCartItem.get();

        item.setQuantity(quantity);

        // 5 quantity * 100 price = totalPrice 500

        item.setTotalPrice(item.getFood().getPrice()*quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);

        if(optionalCartItem.isEmpty()){
            throw new Exception("Cart Item Not Found");
        }

        CartItem item = optionalCartItem.get();

        cart.getItems().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        Long total = 0l;

        for(CartItem cartItem : cart.getItems()){
            total += cartItem.getFood().getPrice()*cartItem.getQuantity();
        }

        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart = cartRepository.findById(id);

        if(optionalCart.isEmpty()){
            throw new Exception("Cart Not Found With Id "+id);
        }

        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));

        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = findCartByUserId(userId);

        cart.getItems().clear();

        return cartRepository.save(cart);
    }
}
