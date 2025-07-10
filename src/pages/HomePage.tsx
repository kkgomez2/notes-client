import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";
import toast from "react-hot-toast";

type Props = {};

const HomePage = (props: Props) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/notes", {
        method: "GET",
        mode: "cors",
      });

      if (res.ok) {
        const data = await res.json();
        setNotes(data);
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
    <>
      <NavBar />

      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div>
            {notes.map((note: {id: string, title: string}) => {
              return (<div key={note.id}>Hello {note.title}</div>)
            })}
            </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
