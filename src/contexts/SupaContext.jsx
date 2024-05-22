import React, {createContext, useContext, useEffect, useState} from 'react'
import { supabase } from '../supabase/supabaseClient';
import { QueryClient, useQuery } from '@tanstack/react-query';
import {v4 as uuidv4} from 'uuid'

const SupaContext = createContext();
export const SupaProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState('')
    //generate an userid on component mount
    useEffect(()=> {
        let storedUserID = localStorage.getItem(userID);
        if (!storedUserID) {
            storedUserID = uuidv4();
            localStorage.setItem('userID', storedUserID)
        }
        setUserID(storedUserID)
    },[])

//add a post context
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

    //tanstack query to fetch post
    const {data, isLoading, onSuccess, refetch} = useQuery({
        queryKey : ["data"],
        queryFn : fetchPost,
    })
 
    return (
        <SupaContext.Provider value = {{loading, error, postIdea, data, isLoading, onSuccess,refetch, userID}}>
            {children}
        </SupaContext.Provider>
    )
}

export const useSupaContext = () => {
    return useContext(SupaContext)
}