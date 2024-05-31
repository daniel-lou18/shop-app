import FormSettings from "@/components/ui/FormSettings";
import { fetchUserById } from "@/db/queries/user";
import * as actions from "@/actions";
import { capitalizeString } from "@/lib/parsers";

async function CustomerSettingsAccount({ params }: { params: { id: string } }) {
  const result = await fetchUserById(params.id);

  if (!result.success) throw new Error(result.error);

  const { firstName, lastName, email, image } = result.data;

  return (
    <FormSettings
      title={`Informations de compte de ${capitalizeString(
        firstName ?? ""
      )} ${capitalizeString(lastName ?? "")}`}
      subtitle="Données à caractère confidentiel"
      fields={{ firstName, lastName, email, image }}
      formAction={actions.updateUserAccount.bind(null, params.id)}
    />
  );
}

export default CustomerSettingsAccount;
