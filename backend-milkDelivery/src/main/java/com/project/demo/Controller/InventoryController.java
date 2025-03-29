package com.project.demo.Controller;

import com.project.demo.Model.Inventory;
import com.project.demo.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
//        return inventoryRepository.findAll().stream()
//                .map(item -> {
//                    if (item.getPrice() == Double.parseDouble(null)) {
//                        item.setPrice(0.0); // Set default price if null
//                    }
//                    return item;
//                })
//                .collect(Collectors.toList());
    }

    @PostMapping
    public Inventory addInventory(@RequestBody Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable Long id, @RequestBody Inventory updatedInventory) {
        return inventoryRepository.findById(id)
                .map(inventory -> {
                    inventory.setName(updatedInventory.getName());
                    inventory.setQuantity(updatedInventory.getQuantity());
                    inventory.setPrice(updatedInventory.getPrice());
                    Inventory savedInventory = inventoryRepository.save(inventory);
                    return ResponseEntity.ok(savedInventory);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public InventoryController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventoryItem(@PathVariable Long id) {
        Optional<Inventory> item = inventoryRepository.findById(id);

        if (item.isPresent()) {
            inventoryRepository.deleteById(id); // Directly delete the item from the repository
            return ResponseEntity.ok("Item deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Item not found!");
        }
    }

    @GetMapping("/milk-types")
    public List<String> getMilkTypes() {
//        OR  Use Java Stream to get distinct names from the inventory list
          return inventoryRepository.findDistinctNames();
    }
}
