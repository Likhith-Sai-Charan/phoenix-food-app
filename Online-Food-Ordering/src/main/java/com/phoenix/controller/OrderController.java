package com.phoenix.controller;

import com.phoenix.model.CartItem;
import com.phoenix.model.Order;
import com.phoenix.model.User;
import com.phoenix.request.AddCartItemRequest;
import com.phoenix.request.OrderRequest;
import com.phoenix.response.PaymentResponse;
import com.phoenix.service.OrderService;
import com.phoenix.service.PaymentService;
import com.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Order order = orderService.createOrder(req, user);

        PaymentResponse res = paymentService.createPaymentLink(order);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Order> orders = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
