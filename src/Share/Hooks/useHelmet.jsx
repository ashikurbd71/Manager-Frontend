import React from 'react';
import { Helmet } from 'react-helmet';


const useHelmet = ({name}) => {
    return (
        
            <Helmet>
                <title>{name}</title>
            </Helmet>
        
    );
};

export default useHelmet;