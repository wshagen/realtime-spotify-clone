import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn();   

    if (!isLoaded) {
        return null;
    }

    const SignInWithGoogle = async () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        })
    }

  return <Button onClick = {SignInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
        <img src="/google.png" alt="google logo" className="size-5 mr-2" />
        Continue with Google
    </Button>
  
}

export default SignInOAuthButtons