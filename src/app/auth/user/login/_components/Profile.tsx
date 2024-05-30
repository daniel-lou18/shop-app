"use client";

import { useSession } from "next-auth/react";

function Profile() {
  const session = useSession();
  return <div>{session.data?.user ? "Logged In" : "Logged Out"}</div>;
}

export default Profile;
