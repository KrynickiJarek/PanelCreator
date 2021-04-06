import React from 'react';

import { Box } from '../../Box';



const FrameEditor = () => {
    return (
        <>
            <h1>FrameEditor </h1> 
            {/* grid na z-index */}

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				<Box name="Glass"/>
				<Box name="Banana"/>
				<Box name="Paper"/>
			</div>

        </>
    );
};

export default FrameEditor;