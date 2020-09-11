import { useState, useEffect, useRef } from 'react';



export const useFetch = (url) => {


const isMounted = useRef(true);
const [state, setstate] = useState({data: null, loading: true, error: null});


    useEffect(() => {
        
        return () => {
            isMounted.current = false;
        };

    }, []);


    useEffect(() => {

        setstate({data: null, loading: true, error: null});

        fetch(url)
            .then (resp => resp.json())
            .then (data => {

                // El useRef para este caso nos permite condicionar que el setState se cargue solo si el componente está montado 
                if (isMounted.current) {                   
                    setstate({
                        loading: false,
                        error: null,
                        data
                    });
                };
            })
            .catch( () => {
                setstate({
                    loading: false,
                    error: 'No se pudo cargar la info',
                    data: null
                })
            })

    }, [url])

    return state;

};
