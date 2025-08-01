"use client";

import FolderComponent from "@/components/landing/folder-comp";

export default function SubjectPage() {
	return (
		<div className='bg-background justify-center flex h-full min-h-dvh w-full flex-col items-center bg-[url("/tron-image-2.png")] bg-cover bg-fixed bg-center bg-no-repeat'>
			<div className="flex flex-row">
				<FolderComponent
					href="/photography/architecture"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Architecture"
				/>
				<FolderComponent
					href="/photography/fashion"
					hoverImgSrc="https://picsum.photos/400/300"
					folderName="Fashion"
				/>
			</div>
		</div>
	);
}
