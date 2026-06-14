import { CustomerRepository } from "../repositories/customer.repository";

const customerRepository = new CustomerRepository();

export class CustomerService {
  async getAllCustomers() {
    const customers = await customerRepository.findAll();

    return customers.map((customer) => {
      const plainCustomer = customer.get({ plain: true }) as any;

      return {
        customer_id: plainCustomer.customer_id,
        is_active: plainCustomer.is_active,
        first_name: plainCustomer.Person?.first_name,
        last_name: plainCustomer.Person?.last_name,
        birth_date: plainCustomer.Person?.birth_date,
        email: plainCustomer.Person?.Account?.email,
      };
    });
  }

  async deleteCustomer(customerId: string) {
    const affectedRows = await customerRepository.deactivate(customerId);

    if (affectedRows === 0) {
      throw new Error("Customer not found");
    }

    return { message: "Customer deleted successfully" };
  }
}