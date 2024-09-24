import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchOrder } from "@/db/queries/order";
import { CreditCard } from "lucide-react";
import OrderSummaryItemAdmin from "./_components/OrderSummaryItemAdmin";
import { calculateOrderPrice } from "@/lib/helpers";
import { fetchUserWithOrdersById } from "@/db/queries/user";
import OrderProductsTableAdmin from "./_components/OrderProductsTableAdmin";
import OrderCustomerTableAdmin from "./_components/OrderCustomerTableAdmin";

async function OrderSummaryAdmin({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const res = await fetchOrder(params.id);
  if (!res.success) throw new Error(res.error);
  const { orderItems, userId } = res.data;
  const totalPrice = calculateOrderPrice(res.data);

  const user = await fetchUserWithOrdersById(userId);
  if (!user.success) throw new Error(user.error);
  const { firstName, lastName, address, city, zip } = user.data;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <Card className="grid auto-rows-max items-start gap-4 lg:gap-8 overflow-hidden h-fit">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Commande n° {res.data.id}
            </CardTitle>
            <CardDescription>
              Commandé le {res.data.createdAt.toLocaleDateString("fr-FR")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Produits commandés</div>
            <ul className="grid gap-3">
              {orderItems.map((item) => (
                <OrderSummaryItemAdmin key={item.id} item={item} />
              ))}
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{totalPrice}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Frais de livraison
                </span>
                <span>Offerts</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>{totalPrice}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Adresse de livraison</div>
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>
                  {firstName} {lastName}
                </span>
                <span>{address}</span>
                <span>
                  {city} {zip}
                </span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Adresse de facturation</div>
              <div className="text-muted-foreground">
                Identique à l&apos;adresse de livraison
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Méthode de paiement</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Visa
                </dt>
                <dd>**** **** **** 4532</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
      <div className="lg:col-span-2">
        <OrderProductsTableAdmin
          productIds={orderItems.map((item) => item.variant.product.id)}
        />
        <OrderCustomerTableAdmin user={user.data} />
      </div>
    </div>
  );
}

export default OrderSummaryAdmin;
