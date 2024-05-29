import * as actions from "@/actions";

function ButtonSignOut() {
  return (
    <form action={actions.signOut} className="w-full">
      <button type="submit" className="w-full flex justify-start">
        Logout
      </button>
    </form>
  );
}

export default ButtonSignOut;
