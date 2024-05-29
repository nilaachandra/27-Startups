import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { data } from "autoprefixer";

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

  // Add a post
  const postIdea = async (ideaData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("ideas").insert(ideaData);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts
  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("ideas")
      .select(`
        *,
        votes(idea_id, userID),
        comments(*)
      `)
      .order("created_at", { ascending: false });
    
    if (error) throw new Error(error.message);
    
    return data.map(idea => ({
      ...idea,
      engagements: idea.comments.length + idea.votes.length,
      upvotes_count: idea.votes.length,
      hasUpvoted: idea.votes.some(vote => vote.userID === userID),
    }));
  };

  const { data: newPosts, isLoading, refetch } = useQuery({
    queryKey: ["data", userID],
    queryFn: fetchPost,
    enabled: !!userID,
  });

  const queryClient = useQueryClient();

  // Upvoting an idea
  const handleUpvote = async (id) => {
    try {
      const { data: existingUpvotes } = await supabase
        .from('votes')
        .select('*')
        .eq('idea_id', id)
        .eq('userID', userID);
      
      if (existingUpvotes.length > 0) {
        await supabase
          .from('votes')
          .delete()
          .eq('idea_id', id)
          .eq('userID', userID);
      } else {
        await supabase
          .from('votes')
          .insert({ idea_id: id, userID });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: handleUpvote,
    onMutate: async (id) => {
      await queryClient.cancelQueries(['data', userID]);

      const previousPosts = queryClient.getQueryData(['data', userID]);

      queryClient.setQueryData(['data', userID], old => {
        return old.map(idea => {
          if (idea.id === id) {
            const hasUpvoted = !idea.hasUpvoted;
            const upvotes_count = hasUpvoted ? idea.upvotes_count + 1 : idea.upvotes_count - 1;
            return { ...idea, hasUpvoted, upvotes_count };
          }
          return idea;
        });
      });

      return { previousPosts };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['data', userID], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['data', userID]);
    },
  });

  const upvoteIdea = (id) => mutation.mutate(id);

  // Add a reply to each post
  const postReply = async (ideaReply) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("comments").insert(ideaReply);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const voteLength = async () => {
    try {
      const { data, error } = await supabase.from('votes').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching votes:", error.message); // Log the error
      return []; // Return an empty array or handle the error appropriately
    }
  };
  
  const commentLength = async () => {
    try {
      const { data, error } = await supabase.from('comments').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching votes:", error.message); // Log the error
      return []; // Return an empty array or handle the error appropriately
    }
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
        postReply,
        voteLength,
        commentLength
      }}
    >
      {children}
    </SupaContext.Provider>
  );
};

export const useSupaContext = () => {
  return useContext(SupaContext);
};
