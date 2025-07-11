import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ideasApi from "../lib/api";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import type { Idea } from "../types/Idea";

const IdeaDetailPage = () => {
  const [idea, setIdea] = useState<Idea>();
  const [loading, setLoading] = useState(true);
  const [setsaving, setSaving] = useState(false);

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


  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (

    <div>
      {idea && (
        <div>
          {idea._id}
          {idea.title}
          {idea.content}
          </div>
      )}
    </div>
  );
};

export default IdeaDetailPage;
