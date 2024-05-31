import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { CircleUser, MoreHorizontal, User as UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { Suspense } from "react";
import CustomersTableItemDelete from "./CustomersTableItemDelete";
import { paths } from "@/lib/paths";

type CustomersTableItemProps = User;

function CustomersTableItem({
  id,
  image,
  firstName,
  lastName,
  sex,
  isActive,
}: CustomersTableItemProps) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {image ? (
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={image}
            width="64"
          />
        ) : (
          <UserIcon className="h-5 w-5" />
        )}
      </TableCell>
      <TableCell className="font-medium">{lastName}</TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{sex}</TableCell>
      <TableCell>
        <Badge variant="outline">{isActive ? "Actif" : "Non-actif"}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">yop</TableCell>
      <TableCell className="hidden md:table-cell">yup</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={paths.adminCustomerAccount(id)}>Modifier</Link>
            </DropdownMenuItem>
            <Suspense>
              <CustomersTableItemDelete id={id} />
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default CustomersTableItem;
