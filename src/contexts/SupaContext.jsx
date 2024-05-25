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
      .select(`
        *,
        votes(idea_id, userID),
        downvotes(idea_id, userID)
      `)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data.map(idea => ({
      ...idea,
      upvotes_count: idea.votes.length,
      downvotes_count: idea.downvotes.length,
      hasUpvoted: idea.votes.some(vote => vote.userID === userID),
      hasDownvoted: idea.downvotes.some(vote => vote.userID === userID)
    }));
  };

  const { data: newPosts, isLoading, refetch } = useQuery({
    queryKey: ["data", userID], // Adding userID as a dependency to refetch when userID changes
    queryFn: fetchPost,
    enabled: !!userID // Ensuring the query runs only when userID is set
  });

  const upvoteIdea = async (id) => {
    setLoading(true);
    try {
      // Check if the user has already downvoted the post
      const { data: existingDownvotes, error: fetchDownvoteError } = await supabase
        .from('downvotes')
        .select('*')
        .eq('idea_id', id)
        .eq('userID', userID);
      
      if (fetchDownvoteError) {
        throw new Error(fetchDownvoteError.message);
      }

      if (existingDownvotes.length > 0) {
        // Remove the downvote
        const { error: deleteDownvoteError } = await supabase
          .from('downvotes')
          .delete()
          .eq('idea_id', id)
          .eq('userID', userID);
        
        if (deleteDownvoteError) {
          throw new Error(deleteDownvoteError.message);
        }
      }

      // Check if the user has already upvoted the post
      const { data: existingUpvotes, error: fetchUpvoteError } = await supabase
        .from('votes')
        .select('*')
        .eq('idea_id', id)
        .eq('userID', userID);
      
      if (fetchUpvoteError) {
        throw new Error(fetchUpvoteError.message);
      }

      if (existingUpvotes.length > 0) {
        // User has already upvoted the post, so remove the upvote
        const { error: deleteUpvoteError } = await supabase
          .from('votes')
          .delete()
          .eq('idea_id', id)
          .eq('userID', userID);
        
        if (deleteUpvoteError) {
          throw new Error(deleteUpvoteError.message);
        }
      } else {
        // User has not upvoted the post, so add the upvote
        const { error: insertUpvoteError } = await supabase.from('votes').insert({
          idea_id: id,
          userID: userID,
        });
        
        if (insertUpvoteError) {
          throw new Error(insertUpvoteError.message);
        }
      }
      refetch();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const downvoteIdea = async (id) => {
    setLoading(true);
    try {
      // Check if the user has already upvoted the post
      const { data: existingUpvotes, error: fetchUpvoteError } = await supabase
        .from('votes')
        .select('*')
        .eq('idea_id', id)
        .eq('userID', userID);
      
      if (fetchUpvoteError) {
        throw new Error(fetchUpvoteError.message);
      }

      if (existingUpvotes.length > 0) {
        // Remove the upvote
        const { error: deleteUpvoteError } = await supabase
          .from('votes')
          .delete()
          .eq('idea_id', id)
          .eq('userID', userID);
        
        if (deleteUpvoteError) {
          throw new Error(deleteUpvoteError.message);
        }
      }

      // Check if the user has already downvoted the post
      const { data: existingDownvotes, error: fetchDownvoteError } = await supabase
        .from('downvotes')
        .select('*')
        .eq('idea_id', id)
        .eq('userID', userID);
      
      if (fetchDownvoteError) {
        throw new Error(fetchDownvoteError.message);
      }

      if (existingDownvotes.length > 0) {
        // User has already downvoted the post, so remove the downvote
        const { error: deleteDownvoteError } = await supabase
          .from('downvotes')
          .delete()
          .eq('idea_id', id)
          .eq('userID', userID);
        
        if (deleteDownvoteError) {
          throw new Error(deleteDownvoteError.message);
        }
      } else {
        // User has not downvoted the post, so add the downvote
        const { error: insertDownvoteError } = await supabase.from('downvotes').insert({
          idea_id: id,
          userID: userID,
        });
        
        if (insertDownvoteError) {
          throw new Error(insertDownvoteError.message);
        }
      }
      refetch();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

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
