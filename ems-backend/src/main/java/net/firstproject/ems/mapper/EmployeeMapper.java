package net.firstproject.ems.mapper;

import net.firstproject.ems.dto.EmployeeDto;
import net.firstproject.ems.entitty.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstNAme(),
                employee.getLastName(),
                employee.getEnail()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
