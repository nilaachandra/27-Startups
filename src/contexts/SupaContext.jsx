import React, {createContext, useContext, useState} from 'react'
import { supabase } from '../supabase/supabaseClient';
import { QueryClient, useQuery } from '@tanstack/react-query';

const SupaContext = createContext();
export const SupaProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const postIdea = async (ideaData) => {
        setLoading(true)
        try {
            const {data, error} = await supabase.from('ideas').insert(ideaData)
            if(error){
                throw new Error(error.message)
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }
// fetch post using tanstack
    const fetchPost = async () => {
        const {data, error} = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return data;
    } 

    const {data, isLoading, onSuccess, refetch} = useQuery({
        queryKey : ["data"],
        queryFn : fetchPost,
    })
 
    return (
        <SupaContext.Provider value = {{loading, error, postIdea, data, isLoading, onSuccess,refetch}}>
            {children}
        </SupaContext.Provider>
    )
}

export const useSupaContext = () => {
    return useContext(SupaContext)
}