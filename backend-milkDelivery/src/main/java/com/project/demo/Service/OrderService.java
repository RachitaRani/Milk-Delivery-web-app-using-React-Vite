package com.project.demo.Service;

import com.project.demo.Model.Order;
import com.project.demo.Repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<String> getMilkTypes() {
        return List.of("Dairy Milk", "Almond Milk", "Soy Milk", "Rice Milk", "Coconut Milk");
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<String> getPaymentModes() {
        return List.of("Pay On Delivery");
        //add more payment methods
    }
    public void updateStatus(Long id, String newStatus) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        order.setOrderStatus(newStatus);
//        order.setCreatedAt(LocalDateTime.now());
        orderRepository.save(order);  // This will update the existing user
    }
    public void deleteOrder(Long id) {
        // Check if the order exists before attempting to delete
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id); // Delete the order by ID
    }
}
