package com.phoenix.request;

import com.phoenix.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;
}
