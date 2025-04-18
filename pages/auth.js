import { useRouter } from "next/router";
import AuthForm from "../components/auth/auth-form";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }
  return <AuthForm />;
}

export default AuthPage;
