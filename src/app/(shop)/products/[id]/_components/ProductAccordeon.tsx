import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ProductAccordeon() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          Livraison et retours gratuits
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            <li>Livraison standard gratuite</li>
            <li>
              Vous pouvez retourner votre commande gratuitement, dans un délai
              de 30 jours.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="hover:no-underline">
          Taille et coupe
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            <li>
              Taille grand : on te conseille de commander une demi-pointure
              au-dessous
            </li>
            <li>Coupe standard : classique et facile à porter</li>
            <li>
              Si tu portes généralement des modèles pour homme, choisis ta
              taille habituelle. Si tu portes généralement des modèles pour
              femme, choisis une taille inférieure à ta taille habituelle.
            </li>
            <li>Guide des tailles</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="hover:no-underline">
          Is it animated?
        </AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ProductAccordeon;
