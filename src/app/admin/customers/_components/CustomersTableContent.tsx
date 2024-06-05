import { TableBody } from "@/components/ui/table";
import CustomersTableItem from "./CustomersTableItem";
import { User } from "@prisma/client";

type CustomersTableContentProps = {
  data: User[];
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
