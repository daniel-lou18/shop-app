"use client";

function error({ error }: { error: Error }) {
  return <div>Products Error : {error.message}</div>;
}

export default error;
