package com.project.demo.Controller;

import com.project.demo.Model.Inventory;
import com.project.demo.Model.Order;
import com.project.demo.Repository.InventoryRepository;
import com.project.demo.Repository.OrderRepository;
import com.project.demo.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React app
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // Calculate total price based on quantity and milk type
        double pricePerLiter;
        switch (order.getMilkType()) {
            case "Dairy Milk":
                pricePerLiter = 54.99;
                break;
            case "Almond Milk":
                pricePerLiter = 64.99;
                break;
            case "Soy Milk":
                pricePerLiter = 45.50;
                break;
            case "Rice Milk":
                pricePerLiter = 40.00;
                break;
            case "Coconut Milk":
                pricePerLiter = 50.00;
                break;
            case "Hemp Milk":
                pricePerLiter = 65.50;break;
            default:
                pricePerLiter = 0.0;
                break;
        }
        order.setTotalPrice(pricePerLiter * order.getQuantity());
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }
    @GetMapping("/viewallorders")
    public ResponseEntity<List<Order>> viewAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    @GetMapping("/milk-types")
    public ResponseEntity<List<String>> getMilkTypes() {
        return ResponseEntity.ok(orderService.getMilkTypes());
    }

    @GetMapping("/payment-modes")
    public ResponseEntity<List<String>> getPaymentModes() {
        return ResponseEntity.ok(orderService.getPaymentModes());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable Long id){
        Optional<Order> item = orderRepository.findById(id);

        if (item.isPresent()) {
            orderRepository.deleteById(id); // Directly delete the item from the repository
            return ResponseEntity.ok("Item deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Item not found!");
        }
    }}
