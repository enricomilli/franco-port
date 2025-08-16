import { Skeleton } from "../skeleton";

export default function LandingSkeleton() {
	return (
		<div className="flex flex-row flex-wrap justify-center gap-4">
			{Array.from({ length: 4 }).map((_, idx) => (
				<FolderSkeleton key={idx} />
			))}
		</div>
	);
}

function FolderSkeleton() {
	return <Skeleton className="w-22 aspect-square" />;
}
