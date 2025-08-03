"use client";

import FolderComponent from "@/components/landing/folder-comp";

export default function Page() {
	return (
		<div className='bg-background justify-center flex h-full min-h-dvh w-full flex-col items-center bg-[url("/tron-image-2.png")] bg-cover bg-fixed bg-center bg-no-repeat'>
			<div className="flex flex-row">
				<FolderComponent
					href="/exhibitions/barcelona"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Barcelona Exhibit"
				/>
				<FolderComponent
					href="/exhibitions/starseed"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Starseed Exhibit"
				/>
			</div>
		</div>
	);
}
