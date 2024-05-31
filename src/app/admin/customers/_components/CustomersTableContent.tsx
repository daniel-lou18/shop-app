import { TableBody } from "@/components/ui/table";
import CustomersTableItem from "./CustomersTableItem";
import { User } from "@prisma/client";

type CustomersTableContentProps = {
  customers: User[];
};

function CustomersTableContent({ customers }: CustomersTableContentProps) {
  return (
    <TableBody>
      {customers.length > 0 &&
        customers.map((customer) => (
          <CustomersTableItem {...customer} key={customer.id} />
        ))}
    </TableBody>
  );
}

export default CustomersTableContent;
