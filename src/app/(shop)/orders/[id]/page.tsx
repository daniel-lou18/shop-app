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
import OrderSummaryItem from "./_components/OrderSummaryItem";
import { calculateOrderPrice, centsToEuros } from "@/lib/helpers";
import { fetchUserById } from "@/db/queries/user";

async function OrderSummary({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const res = await fetchOrder(params.id);
  if (!res.success) {
    return <p>Nous n&apos;avons pas retrouvé la commande</p>;
  }
  const { orderItems, userId, id, createdAt } = res.data;
  const totalPrice = calculateOrderPrice(res.data);

  const user = await fetchUserById(userId);
  if (!user.success) {
    return <p>Nous n&apos;avons pas retrouvé les données de livraison</p>;
  }
  const { firstName, lastName, address, city, zip } = user.data;

  return (
    <Card className="grid auto-rows-max items-start gap-4 lg:gap-8 overflow-hidden h-fit">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Commande n° {id}
          </CardTitle>
          <CardDescription>
            Commandé le {createdAt.toLocaleDateString("fr-FR")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Produits commandés</div>
          <ul className="grid gap-3">
            {orderItems.map((item) => (
              <OrderSummaryItem key={item.id} item={item} />
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{centsToEuros(totalPrice)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Frais de livraison</span>
              <span>Offerts</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{centsToEuros(totalPrice)}</span>
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
  );
}

export default OrderSummary;
