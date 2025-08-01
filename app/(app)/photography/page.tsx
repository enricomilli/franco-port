"use client";

import FolderComponent from "@/components/landing/folder-comp";

export default function Home() {
	return (
		<div className='bg-background justify-center flex h-full min-h-dvh w-full flex-col items-center bg-[url("/tron-image-2.png")] bg-cover bg-fixed bg-center bg-no-repeat'>
			<div className="flex flex-row">
				<FolderComponent
					href="/photography/abstract"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Abstract"
				/>
				<FolderComponent
					href="/photography/subject"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Subject"
				/>
				<FolderComponent
					href="/photography/worldscapes"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Worldscapes"
				/>
				<FolderComponent
					href="/photography/black-n-white"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="B&W"
				/>
			</div>
		</div>
	);
}
