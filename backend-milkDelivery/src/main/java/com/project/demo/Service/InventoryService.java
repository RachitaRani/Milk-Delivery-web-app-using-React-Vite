package com.project.demo.Service;

import com.project.demo.Repository.InventoryRepository;
import com.project.demo.Repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
}
