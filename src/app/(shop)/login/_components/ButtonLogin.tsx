import ButtonSubmit, { ButtonVariantType } from "@/components/ui/ButtonSubmit";
import React from "react";

function ButtonLogin({ variant }: ButtonVariantType) {
  return (
    <ButtonSubmit className="w-full" variant={variant}>
      Se connecter avec GitHub
    </ButtonSubmit>
  );
}

export default ButtonLogin;
