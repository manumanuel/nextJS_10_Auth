/* client-side authentication
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
*/

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  /* client-side authentication
  const [isLoading, setIsLoading] = useState(true);
  //const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      //setLoadedSession(session);
      if (!session) {
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, []);

  // Redirect away if NOT auth
  //const { data: session, status } = useSession();
  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }
  */
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    alert("Password changed!");
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
