import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const EmptyIdeas = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">You have no ideas...yet</h3>
      <p className="text-base-content/70">
        Ready to brainstorm? Create your first idea to get started.
      </p>
      <Link to="/create" className="btn btn-primary">
        Create Your First Idea
      </Link>
    </div>
  );
};

export default EmptyIdeas;
