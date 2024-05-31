import FormSettings from "@/components/ui/FormSettings";
import { fetchUserById } from "@/db/queries/user";
import * as actions from "@/actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { capitalizeString } from "@/lib/parsers";

async function CustomerSettingsAddresses({
  params,
}: {
  params: { id: string };
}) {
  const result = await fetchUserById(params.id);

  if (!result.success) throw new Error(result.error);

  const { address, city, zip, state, country, firstName, lastName } =
    result.data;

  return (
    <FormSettings
      title={`Adresse de ${capitalizeString(
        firstName ?? ""
      )} ${capitalizeString(lastName ?? "")}`}
      subtitle="Données à caractère confidentiel"
      fields={{ address, city, zip, state, country }}
      formAction={actions.updateUserAccount.bind(null, params.id)}
    />
  );
}

export default CustomerSettingsAddresses;
