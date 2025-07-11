const apiBaseUrl = "http://localhost:3001/api";

const getIdeas = async () => {
  let res = await fetch(`${apiBaseUrl}/notes`, {
    method: "GET",
    mode: "cors",
  });

  return res;
};

const getIdeaById = async (id: string) => {
  let res = await fetch(`${apiBaseUrl}/notes/${id}`, {
    method: "GET",
    mode: "cors",
  });

  return res;
};

const createIdea = async (title: string, content: string) => {
  let res = await fetch(`${apiBaseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  return res;
};

const updateIdea = async (id: string, title: string, content: string) => {
  let res = await fetch(`${apiBaseUrl}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  return res;
};

const deleteIdea = async (id: string) => {
  let res = await fetch(`${apiBaseUrl}/notes/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  return res;
};

const ideasApi = { getIdeas, getIdeaById, createIdea, updateIdea, deleteIdea };

export default ideasApi;
