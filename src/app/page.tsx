"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadForm from "@/components/ui/upload-form";
import { FileCard } from "@/components/ui/file-card";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(
    api.files.getFileByOrg, 
    orgId ? {orgId}: "skip");

  return (
    <main className="container mx-auto p-12">
     <div className="flex justify-between items-center mb-8">
       <h1 className="text-4xl font-bold">Your files</h1>

       <UploadForm />
      </div>

        <div className="grid grid-cols-4 gap-4">
      {files?.map((file) => {
        return <FileCard key={file._id} file={file}  />
        }) 
      }</div>
      
    </main>
  );
}
