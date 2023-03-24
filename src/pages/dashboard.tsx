import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
        onClick={() => void signIn()}
      >
        {"Sign in"}
      </button>
    );
  }
  return (
    <div>
      <h1 className="text-4xl">dashboard</h1>
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
        onClick={() => void signOut({ callbackUrl: "/" })}
      >
        {"Sign Out"}
      </button>
      <div>
        <ul>
          <li>
            <Link href={`/dashboard/service`}>Service</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
