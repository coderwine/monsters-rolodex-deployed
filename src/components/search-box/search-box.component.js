import React from 'react';

import './search-box.styles.css';

export const SearchBox = ({ placeholder, handleChange }) => (
<input 
        className="search"
        type="search" 
        placeholder={ placeholder }
        onChange={ handleChange } />
)



// functional components, unlike class components, don't have access to state, which is a constructor or lifecycle methods.  They don't have access to these because they don't always need those states.  It's just a component that gets some props and returns HTML.