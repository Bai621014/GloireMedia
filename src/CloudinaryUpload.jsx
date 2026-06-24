import React, { useEffect } from 'react';

const CloudinaryUpload = ({ onUploadSuccess }) => {
  useEffect(() => {
    // Vérification de la présence du widget
    if (window.cloudinary) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          sources: ['local', 'camera'],
          multiple: false,
          clientAllowedFormats: ['image', 'video'],
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            onUploadSuccess(result.info.secure_url);
          }
        }
      );

      // Attacher l'événement au bouton
      document.getElementById("upload_widget").addEventListener("click", () => {
        myWidget.open();
      });
    }
  }, [onUploadSuccess]);

  return (
    <button 
      id="upload_widget" 
      className="bg-white text-black rounded-lg px-4 py-2 font-bold hover:bg-yellow-500 transition-colors"
    >
      +
    </button>
  );
};

export default CloudinaryUpload;
