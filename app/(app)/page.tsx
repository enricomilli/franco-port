"use client";

import FolderComponent from "@/components/landing/folder-comp";

export default function Home() {
	return (
		<div className='bg-background justify-center flex h-full min-h-dvh w-full flex-col items-center bg-[url("/tron-image-2.png")] bg-cover bg-fixed bg-center bg-no-repeat'>
			<div className="flex flex-row">
				<FolderComponent
					href="/photography"
					hoverImgSrc="/photography/abstract/miami-2.jpg"
					folderName="Photography"
				/>
				<FolderComponent
					href="/paintings"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Paintings"
				/>
				<FolderComponent
					href="/modeling"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Modeling"
				/>
				<FolderComponent
					href="/exhibitions"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Exhibitions"
				/>
			</div>
		</div>
	);
}
