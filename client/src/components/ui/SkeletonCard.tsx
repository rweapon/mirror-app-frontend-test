export default function SkeletonCard() {
  return (
    <article className="flex flex-col items-start bg-card rounded-lg shadow-md overflow-hidden p-6 animate-pulse *:w-full">
      <div className="flex items-center mb-4">
        <div className="size-10 rounded-full bg-gray-200"></div>
        <div className="flex-grow ml-3">
          <p className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700  mb-2"></p>
          <p className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></p>
        </div>
      </div>

      <div className="flex flex-grow items-center flex-col">
        <p className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2"></p>
        <div className="w-full flex gap-2 *:flex-grow">
          <p className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2"></p>
          <p className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700"></p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <p className="w-10 h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></p>
        <p className="w-10 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></p>
      </div>
      <div>
        <p className="w-24 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></p>
      </div>
    </article>
  );
}
