import SkeletonCard from "@/components/ui/SkeletonCard";

type Props = {
  count?: number;
};
export default function Skeleton({ count = 15 }: Props) {
  return (
    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </section>
  );
}
