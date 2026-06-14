import { Customer } from "../models/customer.model";
import { Person } from "../models/person.model";
import { Account } from "../models/account.model";

export class CustomerRepository {
  async findAll() {
    return Customer.findAll({
      where: {
        is_active: true,
      },
      include: [
        {
          model: Person,
          attributes: ["person_id", "first_name", "last_name", "birth_date"],
          include: [
            {
              model: Account,
              attributes: ["email"],
            },
          ],
        },
      ],
    });
  }

  async deactivate(customerId: string) {
    const [affectedRows] = await Customer.update(
      { is_active: false },
      {
        where: {
          customer_id: customerId,
          is_active: true,
        },
      }
    );

    return affectedRows;
  }
}