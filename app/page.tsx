"use client";

import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";
import confetti from "canvas-confetti";

import {
  ActionButton,
  ErrorBanner,
  ImageDisplay,
  ImageUpload,
  LoadingIndicator,
  Logo,
} from "./components";

import { ImageTransformState } from "./types";
import Link from "next/link";

// Loading animation messages
const loadingMessages = [
  "I'm drawing your image with a magical pencil... ✏️",
  "Summoning the Studio Ghibli magic... ✨",
  "Adding some Totoro magic dust... 🍃",
  "Painting with the colors of the wind... 🎨",
  "Creating a world of wonder... 🌟",
  "Brewing a potion of imagination... 🧪",
  "Whispering to the forest spirits... 🌳",
  "Dancing with the stars... ⭐",
  "Filling your image with dreams... 💭",
  "Weaving a tale of magic... 📖",
];

export default function Home() {
  const [state, setState] = useState<ImageTransformState>({
    originalImage: null,
    processedImage: null,
    isProcessing: false,
    error: null,
    loadingMessage: loadingMessages[0],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { originalImage, processedImage, isProcessing, error, loadingMessage } =
    state;

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        const randomMessage =
          loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        setState((prev) => ({ ...prev, loadingMessage: randomMessage }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  // Trigger confetti when image processing is done
  useEffect(() => {
    if (processedImage) {
      launchConfetti();
    }
  }, [processedImage]);

  // Launch confetti animation
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleImageUpload = (image: string) => {
    setState((prev) => ({
      ...prev,
      originalImage: image,
      processedImage: null,
      error: null,
    }));
  };

  const processImage = async () => {
    if (!originalImage) return;

    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      const formData = new FormData();
      const blob = await fetch(originalImage).then((r) => r.blob());
      formData.append("image", blob);

      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process image");
      }

      const data = await response.json();
      setState((prev) => ({
        ...prev,
        processedImage: `data:image/png;base64,${data.image}`,
        isProcessing: false,
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to process image. Please try again.";

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isProcessing: false,
      }));
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "ghibli-style-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetState = () => {
    setState({
      originalImage: null,
      processedImage: null,
      isProcessing: false,
      error: null,
      loadingMessage: loadingMessages[0],
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-3 py-6 relative">
      {/* Error Banner */}
      <ErrorBanner error={error ?? ""} contactEmail="support@mail.com" />

      {/* Logo in Top Left */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6">
        <Logo size="medium" />
      </div>

      <div className="w-full max-w-lg md:max-w-4xl px-0 md:px-4 py-4 md:py-12 space-y-6 md:space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <h1 className="text-3xl md:text-5xl font-bold ghibli-title">
              Photo To Ghibli
            </h1>
          </Link>
          <p className="text-muted-foreground text-sm md:text-base ghibli-subtitle">
            Transform your images with Studio Ghibli art style
          </p>
        </div>

        <div className="ghibli-card bg-card p-4 md:p-8 space-y-6">
          {!originalImage ? (
            <ImageUpload
              onImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
            />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <h2 className="text-lg md:text-xl font-medium ghibli-subtitle">
                    Original Image
                  </h2>
                  <ImageDisplay
                    imageUrl={originalImage}
                    altText="Original Image"
                  />
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg md:text-xl font-medium ghibli-subtitle">
                    Ghibli Magic
                  </h2>
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-border shadow-md bg-muted/50 backdrop-blur-sm">
                    {processedImage ? (
                      <ImageDisplay
                        imageUrl={processedImage}
                        altText="Processed Image"
                        className="bg-transparent"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isProcessing ? (
                          <LoadingIndicator message={loadingMessage} />
                        ) : (
                          <p className="text-muted-foreground text-center px-4 ghibli-subtitle">
                            Your Ghibli-inspired creation will appear here
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                {!processedImage && !isProcessing && (
                  <ActionButton
                    onClick={processImage}
                    disabled={isProcessing}
                    variant="primary"
                  >
                    Transform to Studio Ghibli Style
                  </ActionButton>
                )}

                {processedImage && (
                  <ActionButton onClick={downloadImage} variant="secondary">
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Your Creation
                    </span>
                  </ActionButton>
                )}

                {(processedImage || error) && (
                  <ActionButton onClick={resetState} variant="tertiary">
                    Start Over
                  </ActionButton>
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-sm text-foreground/80 backdrop-blur-sm py-2 ghibli-subtitle">
          <p>
            {new Date().getFullYear()} Photo To Ghibli. Made by{" "}
            <Link
              href="https://linkedin.com/in/giorgikiknadze"
              target="_blank"
              rel="noopener noreferrer"
            >
              George Kiknadze
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
