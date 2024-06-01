import * as actions from "@/actions";

function ButtonSignOut() {
  return (
    <form action={actions.signOut} className="w-full">
      <button type="submit" className="w-full flex justify-start">
        Se déconnecter
      </button>
    </form>
  );
}

export default ButtonSignOut;
