import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (urls?: string[]) => void;
  value: string[];
  endpoint: "productImages";
}

const maxFileCounts = {
  productImages: 5,
};

export const MultiFileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const handleRemove = (url: string) => {
    onChange(value.filter((v) => v !== url));
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
 
 {Array.isArray(value) && value.map((url, index) => {
        const fileType = url.split(".").pop();

        if (fileType !== "pdf") {
          return (
            <div key={index} className="relative h-28 w-28">
              <Image height={100} width={100} src={url} alt="Upload" className="rounded-md" />
             <button
                onClick={() => handleRemove(url)}
                className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        }

        if (fileType === "pdf") {
          return (
            <div key={index} className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                {url}
              </a>
              <button
                onClick={() => handleRemove(url)}
                className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        }
        return null;
      })}

     {value.length < maxFileCounts[endpoint] && (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange([...value, ...(res?.map((file) => file.url) || [])]);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
      )}
    </div>
  );
};