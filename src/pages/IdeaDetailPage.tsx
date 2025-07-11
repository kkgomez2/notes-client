import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ideasApi from "../lib/api";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import type { Idea } from "../types/Idea";

const IdeaDetailPage = () => {
  const [idea, setIdea] = useState<Idea>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchIdea = async () => {
    try {
      if (id) {
        const res = await ideasApi.getIdeaById(id);
        if (res.ok) {
          let data = await res.json();
          setIdea(data);
          console.log(data);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't find idea.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to forget this idea?")) {
      return;
    }

    try {
      let res = await ideasApi.deleteIdea(idea!._id);
      if (res.ok) {
        toast.success("Idea deleted");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete idea")
    }
  };
  const handleSave = async () => {
    if (!idea?.title.trim() || !idea.content.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      let res = await ideasApi.updateIdea(idea._id, idea.title, idea.content);
      if (res.ok) {

        toast.success("Idea updated!");
      }
    } catch (error) {
      
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {idea && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h5 w-5" />
                Back to Ideas
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline"
              >
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Idea Title"
                    className="input input-bordered"
                    value={idea.title}
                    onChange={(e) =>
                      setIdea({ ...idea, title: e.target.value })
                    }
                  ></input>
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="What's your idea?"
                    className="textarea textarea-bordered h-32"
                    value={idea.content}
                    onChange={(e) =>
                      setIdea({ ...idea, content: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaDetailPage;
