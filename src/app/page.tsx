"use client";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/clerk-react";
import { SignInButton, SignOutButton, SignedIn, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "convex/react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const { isLoading, isAuthenticated } = useConvexAuth();
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.getFileByOrg, 
    orgId ? {orgId}: "skip");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
       <SignInButton mode="modal">
       <Button>Sign in</Button>
       </SignInButton>
      </SignedOut>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
        }) 
      }
      <Button onClick={()=> {
        if (!orgId) return; createFile({
          name: 'hello world',
          orgId,
        });
      }} >
        Click me
      </Button>
      
    </main>
  );
}
