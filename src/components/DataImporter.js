// src/components/DataImporter.js
import React from 'react';
import './DataImporter.css';

const DataImporter = ({ isForExpenses = false }) => {

    const handleSpotifySync = () => {
        // UPDATED, MORE ACCURATE TEXT
        alert("Feature in development:\nThis would initiate a secure connection to your Spotify for Artists account. Once connected, it would fetch your latest streaming statistics and audience data. This includes metrics like total stream counts, listener numbers, and top countries for your music, giving you a clear picture of your performance on the platform.");
    };

    const handleUpload = () => {
        alert("Feature in development:\nThis would open a file dialog to select a CSV or Excel file. The application would then parse the spreadsheet to import your expenses in bulk, saving you from manual entry.");
    };

    return (
        <div className="importer-container">
            {isForExpenses ? (
                 <button className="importer-button" onClick={handleUpload}>
                    Import from Spreadsheet
                </button>
            ) : (
                <button className="importer-button spotify" onClick={handleSpotifySync}>
                    Sync with Spotify API
                </button>
            )}
        </div>
    );
};

export default DataImporter;