import { auth } from "@/auth";
import FormSettings from "@/components/ui/FormSettings";
import { fetchUserById } from "@/db/queries/user";
import * as actions from "@/actions";

async function CustomerSettingsAccount() {
  const session = await auth();
  const result = await fetchUserById(session?.user.id);

  if (!result.success) throw new Error(result.error);

  const { firstName, lastName, email, image } = result.data;

  return (
    <FormSettings
      title="Mon compte"
      subtitle="Vos informations personnelles"
      fields={{ firstName, lastName, email, image }}
      formAction={actions.updateUserAccount.bind(null, session?.user.id)}
    />
  );
}

export default CustomerSettingsAccount;
