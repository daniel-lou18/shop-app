import Wrapper from "@/components/layout/Wrapper";
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
          <Wrapper element="ul">
            <Wrapper element="li">Livraison standard gratuite</Wrapper>
            <Wrapper element="li">
              Vous pouvez retourner votre commande gratuitement, dans un délai
              de 30 jours.
            </Wrapper>
          </Wrapper>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="hover:no-underline">
          Taille et coupe
        </AccordionTrigger>
        <AccordionContent>
          <Wrapper element="ul">
            <Wrapper element="li">
              Taille grand : on te conseille de commander une demi-pointure
              au-dessous
            </Wrapper>
            <Wrapper element="li">
              Coupe standard : classique et facile à porter
            </Wrapper>
            <Wrapper element="li">
              Si tu portes généralement des modèles pour homme, choisis ta
              taille habituelle. Si tu portes généralement des modèles pour
              femme, choisis une taille inférieure à ta taille habituelle.
            </Wrapper>
            <Wrapper>Guide des tailles</Wrapper>
          </Wrapper>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="hover:no-underline">
          Développement durable
        </AccordionTrigger>
        <AccordionContent>
          Empreinte carbone : nous nous efforçons de réduire constamment
          l&apos;empreinte environnementale de nos produits. Les émissions
          carbone restantes liées à l&apos;ensemble du cycle de vie de ce
          produit ont été soigneusement calculées, et nous nous engageons à
          investir les fonds correspondants dans des projets de captation du
          carbone qui protègent la biodiversité, restaurent les écosystèmes
          naturels et luttent ainsi contre le changement climatique.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ProductAccordeon;
