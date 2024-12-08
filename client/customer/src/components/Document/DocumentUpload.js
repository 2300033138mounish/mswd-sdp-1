import React, { useState } from 'react';

const DocumentUpload = () => {
    const [document, setDocument] = useState(null);

    const handleUpload = (e) => {
        e.preventDefault();
        // Handle document upload logic
    };

    return (
        <form onSubmit={handleUpload}>
            <h2>Upload Document</h2>
            <input
                type="file"
                onChange={(e) => setDocument(e.target.files[0])}
            />
            <button type="submit">Upload</button>
        </form>
    );
};

export default DocumentUpload;
