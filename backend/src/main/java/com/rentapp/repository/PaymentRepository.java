package com.rentapp.repository;
import java.util.List;
import com.rentapp.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.paymentStatus='Paid'")
Double getCollectedAmount();

@Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus='Pending'")
Long getPendingCount();

@Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus='Overdue'")
Long getOverdueCount();

@Query("SELECT p FROM Payment p WHERE p.paymentStatus='Pending'")
List<Payment> getPendingPayments();

}