package com.project.demo.Repository;

import com.project.demo.Model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    @Query("SELECT DISTINCT i.name FROM Inventory i")
    List<String> findDistinctNames();
}
