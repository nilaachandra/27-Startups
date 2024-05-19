import React, {createContext, useContext, useState} from 'react'
import { supabase } from '../supabase/supabaseClient';

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
    return (
        <SupaContext.Provider value = {{loading, error, postIdea}}>
            {children}
        </SupaContext.Provider>
    )
}

export const useSupaContext = () => {
    return useContext(SupaContext)
}