"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadForm from "@/components/ui/upload-form";
import { FileCard } from "@/components/ui/file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(
    api.files.getFileByOrg,
    orgId ? { orgId } : "skip");

  const isLoading = files === undefined;
  
  return (
    <main className="container mx-auto p-12">
      {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}
      {files && files.length === 0 && (
      <div className="flex flex-col gap-8 w-full items-center mt-12">
        <Image
          alt="an image of a picture and directory icon"
          width="300"
          height="300"
          src="/empty.svg"
        />
        <div className="text-2xl">You have no files, upload one now</div>
        <UploadForm />
      </div>
    )}
  {files && files.length > 0 && (
      <>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your files</h1>
          <UploadForm />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {files?.map((file) => {
            return <FileCard key={file._id} file={file} />
          })}   
        </div>
       </>
      )}
      </main>
  );
  }
