import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const SupaContext = createContext();

export const SupaProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState("");

  // Generate a user ID on component mount
  useEffect(() => {
    let storedUserID = localStorage.getItem("userID");
    if (!storedUserID) {
      storedUserID = uuidv4();
      localStorage.setItem("userID", storedUserID);
    }
    setUserID(storedUserID);
  }, []);

  // Add a post context
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

  // Fetch posts using Tanstack Query
  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  };

  const {
    data: newPosts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["data"],
    queryFn: fetchPost,
  });

  // Post upvote and downvote logic
  const updateVotes = async (id, action) => {
    const { data: idea, error } = await supabase
      .from("ideas")
      .select("upvotes, downvotes, votes_count")
      .eq("id", id)
      .single();

    if (error) throw error;

    let upvotes = idea.upvotes || [];
    let downvotes = idea.downvotes || [];
    let votes_count = idea.votes_count || 0;

    if (action === "upvote") {
      if (!upvotes.includes(userID)) {
        upvotes.push(userID);
        votes_count += 1;
        if (downvotes.includes(userID)) {
          downvotes = downvotes.filter((uid) => uid !== userID);
          votes_count += 1; // Removing a downvote also increases the count
        }
      } else {
        upvotes = upvotes.filter((uid) => uid !== userID);
        votes_count -= 1;
      }
    } else if (action === "downvote") {
      if (!downvotes.includes(userID)) {
        downvotes.push(userID);
        votes_count -= 1;
        if (upvotes.includes(userID)) {
          upvotes = upvotes.filter((uid) => uid !== userID);
          votes_count -= 1; // Removing an upvote also decreases the count
        }
      } else {
        downvotes = downvotes.filter((uid) => uid !== userID);
        votes_count += 1;
      }
    }
    const { error: updateError } = await supabase
      .from("ideas")
      .update({ upvotes, downvotes, votes_count })
      .eq("id", id);

    if (updateError) throw updateError;
    return { upvotes, downvotes, votes_count };
  };

  const upvoteIdea = async (id) => {
    return updateVotes(id, 'upvote');
  }

  const downvoteIdea = async (id) => {
    return updateVotes(id, 'downvote');
  }
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
