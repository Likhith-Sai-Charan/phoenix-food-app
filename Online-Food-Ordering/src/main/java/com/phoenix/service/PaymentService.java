package com.phoenix.service;

import com.phoenix.model.Order;
import com.phoenix.response.PaymentResponse;
import com.stripe.exception.StripeException;


public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
