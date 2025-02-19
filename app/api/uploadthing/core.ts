import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};

export const ourFileRouter = {
  groupImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  // messageFile: f(["image", "pdf"])
  //   .middleware(() => handleAuth())
  //   .onUploadComplete(() => {}),

  messageFile: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "2MB", maxFileCount: 1 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  productImages: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
