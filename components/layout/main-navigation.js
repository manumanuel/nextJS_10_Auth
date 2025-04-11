import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  //const [session, loading] = useSession();  //v3
  const { data: session, status } = useSession(); //v4
  // console.log(session);
  //  console.log(status); // loading, authenticated, unauthenticated

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
