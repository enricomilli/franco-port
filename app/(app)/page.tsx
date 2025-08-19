"use client";

import FolderComponent from "@/components/landing/folder-comp";
import { Button } from "@/components/ui/button";
import LandingSkeleton from "@/components/ui/loading/landing-loading";
import { getAllFolders } from "@/lib/api";
import { Folder, Media } from "@/payload-types";
import { useEffect, useState } from "react";

export default function Home() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllFolders();

        if (!response || !response.docs) {
          throw new Error("Invalid response format from API");
        }

        // Filter to only show top-level folders (those without a parent)
        const topLevelFolders = response.docs.filter(
          (folder: Folder) => !folder.parentFolder,
        );

        // Sort by order
        topLevelFolders.sort((a: Folder, b: Folder) => {
          const orderA = typeof a.order === "number" ? a.order : 0;
          const orderB = typeof b.order === "number" ? b.order : 0;
          return orderA - orderB;
        });

        setFolders(topLevelFolders);
      } catch (err) {
        console.error("Error fetching folders:", err);
        setError("Failed to load portfolio folders");
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  return (
    <>
      {loading && <LandingSkeleton />}

      {error && (
        <div className="mx-auto max-w-md rounded-lg bg-red-500/20 p-4 text-center text-white">
          <p className="font-semibold">Error</p>
          <p className="mt-2">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100"
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && folders.length === 0 && (
        <p className="text-white">
          No portfolio folders found. Try adding some in the CMS.
        </p>
      )}

      {!loading && !error && folders.length > 0 && (
        <div className="flex flex-row flex-wrap justify-center gap-2">
          {folders.map((folder) => (
            <FolderComponent
              key={folder.id}
              href={`/${folder.path}`}
              hoverImgSrc={folder.previewImage as Media}
              folderName={folder.name}
            />
          ))}
        </div>
      )}
    </>
  );
}
