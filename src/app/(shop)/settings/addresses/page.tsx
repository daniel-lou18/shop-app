import { auth } from "@/auth";
import FormSettings from "@/components/ui/FormSettings";
import { fetchUserById } from "@/db/queries/user";
import * as actions from "@/actions";

async function CustomerSettingsAddresses() {
  const session = await auth();
  const result = await fetchUserById(session?.user.id);

  if (!result.success) throw new Error(result.error);

  const { address, city, zip, state, country } = result.data;

  return (
    <FormSettings
      title="Mon adresse"
      subtitle="Gérer et modifier votre adresse"
      fields={{ address, city, zip, state, country }}
      formAction={actions.updateUserAccount.bind(null, session?.user.id)}
    />
  );
}

export default CustomerSettingsAddresses;
