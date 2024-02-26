package net.firstproject.ems.repository;

import net.firstproject.ems.entitty.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
