import { MessageSquare, Heart, Calendar } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { memo } from "react";
import { Button } from "@/components/ui/Button";
import { Post } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

type PostCardProps = {
  post: Post;
  template: string;
};

const PostCard = memo(function PostCard({ post, template }: PostCardProps) {
  const isHover = template === "hover";

  return (
    <article className="w-full h-full flex flex-col items-start bg-card text-card-foreground rounded-lg shadow-md overflow-hidden p-6">
      <div className="flex items-center mb-4">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {post.userId.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-medium">User {post.userId}</p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Calendar className="size-4 mr-1" />
            {formatDate(post.date)}
          </p>
        </div>
      </div>

      {!isHover && <p className="text-foreground mb-4 flex-grow">{post.caption}</p>}

      <div className={cn("flex items-center justify-between flex-col text-muted-foreground", isHover && "flex-grow")}>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Heart className="size-5 mr-1" />
            {post.likes}
          </span>
          <span className="flex items-center">
            <MessageSquare className="size-5 mr-1" />
            {post.comments}
          </span>
        </div>
        {isHover && (
          <Button asChild variant="ghost">
            <a href={post.permalink} target="_blank">
              View Details
            </a>
          </Button>
        )}
      </div>
    </article>
  );
});

export default PostCard;
