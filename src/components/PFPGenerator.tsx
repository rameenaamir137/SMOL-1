'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function PFPGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('/api/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.imageUrl) {
        setGeneratedImage(response.data.imageUrl);
      } else {
        setError(response.data.error || 'Failed to generate image');
      }
    } catch (err: unknown) {
      setError(err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data ? String(err.response.data.error) : 'An error occurred while generating the image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (generatedImage) {
      setIsDownloading(true);
      setError(null);
      
      try {
        // Use our download API endpoint
        const response = await axios.post('/api/download', {
          imageUrl: generatedImage
        }, {
          responseType: 'blob'
        });

        // Create a blob URL from the response
        const blob = new Blob([response.data], { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'smol-pfp.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Download failed:', error);
        setError('Failed to download image. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    }
  };


  return (
    <section id="generator" className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="pixel-text text-3xl sm:text-4xl text-white mb-4" style={{
            textShadow: `
              0 0 5px var(--primary),
              0 0 10px var(--primary),
              0 0 15px var(--primary),
              0 0 20px var(--primary)
            `,
            animation: 'neon-glow 3s ease-in-out infinite alternate'
          }}>
            SMOL PFP GENERATOR
          </h2>
          <p className="pixel-text-alt text-white/80 max-w-2xl mx-auto text-lg">
            Upload your profile picture and watch it transform into a retro pixel art masterpiece!
          </p>
          <p className="pixel-text text-sm text-primary mt-2" style={{
            textShadow: '0 0 10px var(--primary)'
          }}>
            Generate your smol PFP in retro arcade style – tiny pixels, big vibes!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6 flex flex-col">
            <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center flex-1 flex flex-col justify-center min-h-[500px] bg-black/50">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={400}
                      height={400}
                      className="max-w-full max-h-full object-contain mx-auto rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="pixel-text text-sm text-primary hover:text-primary-dark"
                  >
                    CHANGE IMAGE
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl text-primary">📸</div>
                  <p className="pixel-text text-lg text-gray-700">UPLOAD YOUR PFP</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="pixel-button"
                  >
                    CHOOSE FILE
                  </button>
                </div>
              )}
            </div>

            {selectedFile && (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'GENERATING...' : 'GENERATE SMOL PFP'}
              </button>
            )}
          </div>

          {/* Result Section */}
          <div className="space-y-6 flex flex-col">
            {generatedImage ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="border-2 border-primary rounded-lg p-6 flex-1 flex flex-col justify-center min-h-[500px] bg-black/50">
                  <Image
                    src={generatedImage}
                    alt="Generated Smol PFP"
                    width={400}
                    height={320}
                    className="w-full h-80 object-contain rounded-lg"
                  />
                </div>
                
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full pixel-button bg-green-500 hover:bg-green-600 border-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD YOUR SMOL PFP'}
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-primary rounded-lg p-12 text-center flex-1 flex flex-col justify-center min-h-[500px] bg-black/50">
                <p className="pixel-text text-primary text-lg">YOUR SMOL PFP WILL APPEAR HERE</p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border-2 border-red-500 text-red-300 rounded-lg text-center" style={{
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
          }}>
            <p className="pixel-text text-sm">{error}</p>
          </div>
        )}

        {/* Progress indicator */}
        {isGenerating && (
          <div className="mt-6 p-6 bg-primary/10 border-2 border-primary rounded-lg text-center" style={{
            boxShadow: '0 0 20px rgba(255, 117, 24, 0.3)'
          }}>
            <div className="pixel-text text-primary mb-2">GENERATING YOUR SMOL PFP...</div>
            <div className="pixel-text-alt text-white/80 text-sm">This may take 10-30 seconds</div>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
