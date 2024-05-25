import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const SupaContext = createContext();

export const SupaProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    let storedUserID = localStorage.getItem("userID");
    if (!storedUserID) {
      storedUserID = uuidv4();
      localStorage.setItem("userID", storedUserID);
    }
    setUserID(storedUserID);
  }, []);

  const postIdea = async (ideaData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("ideas").insert(ideaData);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  };

  const { data: newPosts, isLoading, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: fetchPost,
  });

  const updateVotes = async (id, action) => {
    const { data: idea, error } = await supabase
      .from("ideas")
      .select("upvotes, downvotes")
      .eq("id", id)
      .single();

    if (error) throw error;

    let upvotes = idea.upvotes || [];
    let downvotes = idea.downvotes || [];

    if (action === "upvote") {
      if (upvotes.includes(userID)) {
        upvotes = upvotes.filter((uid) => uid !== userID);
      } else {
        upvotes.push(userID);
        downvotes = downvotes.filter((uid) => uid !== userID);
      }
    } else if (action === "downvote") {
      if (downvotes.includes(userID)) {
        downvotes = downvotes.filter((uid) => uid !== userID);
      } else {
        downvotes.push(userID);
        upvotes = upvotes.filter((uid) => uid !== userID);
      }
    }

    const { error: updateError } = await supabase
      .from("ideas")
      .update({ upvotes, downvotes })
      .eq("id", id);

    if (updateError) throw updateError;
    return { upvotes, downvotes };
  };

  const upvoteIdea = (id) => updateVotes(id, "upvote");
  const downvoteIdea = (id) => updateVotes(id, "downvote");

  return (
    <SupaContext.Provider
      value={{
        loading,
        error,
        postIdea,
        newPosts,
        isLoading,
        refetch,
        userID,
        upvoteIdea,
        downvoteIdea,
      }}
    >
      {children}
    </SupaContext.Provider>
  );
};

export const useSupaContext = () => {
  return useContext(SupaContext);
};
