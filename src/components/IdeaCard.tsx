import { Link } from "react-router";
import type { Idea } from "../types/Idea";
import { PenSquareIcon, Trash2Icon } from "lucide-react";

type Props = {
  idea: Idea;
};

const IdeaCard = ({ idea }: Props) => {
  return (
    <Link
      to={`/idea/${idea._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid border-[oklch(var(--p))]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{idea.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{idea.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(idea.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IdeaCard;
