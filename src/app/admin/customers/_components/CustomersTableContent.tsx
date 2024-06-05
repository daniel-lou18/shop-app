import { TableBody } from "@/components/ui/table";
import CustomersTableItem from "./CustomersTableItem";
import { User } from "@prisma/client";
import { UsersWithOrders } from "@/db/queries/users";

type CustomersTableContentProps = {
  data: UsersWithOrders;
};

function CustomersTableContent({ data }: CustomersTableContentProps) {
  return (
    <TableBody>
      {data.length > 0 &&
        data.map((customer) => (
          <CustomersTableItem {...customer} key={customer.id} />
        ))}
    </TableBody>
  );
}

export default CustomersTableContent;
