import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function ProductArchive() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Archive Product</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
        <Button type="button" size="sm" variant="secondary">
          Archive Product
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductArchive;
