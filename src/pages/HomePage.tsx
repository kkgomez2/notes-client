import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";
import ideasApi from "../lib/api";
import toast from "react-hot-toast";
import type { Idea } from "../types/Idea";
import IdeaCard from "../components/IdeaCard";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await ideasApi.getIdeas();

      if (res.ok) {
        const data = await res.json();
        setIdeas(data);
        setIsRateLimited(false);
      }

      if (res.status === 429) {
        setIsRateLimited(true);
        throw Response.error();
      }
    } catch (err) {
      console.error("Error fetching notes: ", err);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {ideas.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea: Idea) => {
              return (<IdeaCard idea={idea} setIdeas={setIdeas}/>)
            })}
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
