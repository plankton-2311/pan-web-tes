/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from "react";
import { X, RotateCw, Maximize2, ZoomIn, ZoomOut } from "lucide-react";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
  title?: string;
}

declare global {
  interface Window {
    Cropper: any;
  }
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  aspectRatio = 1,
  title = "Crop Gambar",
}: ImageCropperProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (imageRef.current && !cropper && window.Cropper) {
      const newCropper = new window.Cropper(imageRef.current, {
        aspectRatio: aspectRatio,
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        restore: true,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: true,
        canvas: { maxWidth: 4096, maxHeight: 4096, fillColor: "#fff" },
      });
      setCropper(newCropper);
    }

    return () => {
      if (cropper) {
        try {
          cropper.destroy();
        } catch (err) {
          console.error("Error destroying cropper:", err);
        }
      }
    };
  }, []);

  const handleRotate = (degree: number) => {
    cropper?.rotate(degree);
  };

  const handleZoom = (ratio: number) => {
    const newZoom = zoom + ratio;
    setZoom(newZoom);
    cropper?.zoom(ratio);
  };

  const handleReset = () => {
    cropper?.reset();
    setZoom(1);
  };

  const handleAspectRatio = (ratio: number) => {
    cropper?.setAspectRatio(ratio);
  };

  const handleCrop = () => {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      onCropComplete(canvas.toDataURL());
    }
  };

  const handleFlipHorizontal = () => {
    const imageData = cropper?.getImageData();
    if (imageData) {
      cropper?.scaleX(-(imageData.scaleX || 1));
    }
  };

  const handleFlipVertical = () => {
    const imageData = cropper?.getImageData();
    if (imageData) {
      cropper?.scaleY(-(imageData.scaleY || 1));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-xs text-blue-100 mt-1">
              Edit & crop foto seperti aplikasi Photo Windows
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Editor */}
            <div className="lg:col-span-2">
              <div
                className="bg-stone-900 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ height: "400px" }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Crop"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    display: "block",
                  }}
                />
              </div>

              {/* Aspect Ratio Presets */}
              <div className="mt-4">
                <label className="text-xs font-bold text-stone-500 block mb-2">
                  RASIO ASPEK
                </label>
                <div className="grid grid-cols-5 gap-2">
                  <button
                    onClick={() => handleAspectRatio(NaN)}
                    className="py-2 px-2 text-xs font-bold bg-stone-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Bebas
                  </button>
                  <button
                    onClick={() => handleAspectRatio(1)}
                    className="py-2 px-2 text-xs font-bold bg-stone-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    1:1
                  </button>
                  <button
                    onClick={() => handleAspectRatio(16 / 9)}
                    className="py-2 px-2 text-xs font-bold bg-stone-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    16:9
                  </button>
                  <button
                    onClick={() => handleAspectRatio(4 / 3)}
                    className="py-2 px-2 text-xs font-bold bg-stone-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    4:3
                  </button>
                  <button
                    onClick={() => handleAspectRatio(9 / 16)}
                    className="py-2 px-2 text-xs font-bold bg-stone-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    9:16
                  </button>
                </div>
              </div>

              {/* Zoom Control */}
              <div className="mt-4">
                <label className="text-xs font-bold text-stone-500 block mb-2">
                  ZOOM
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => {
                      const newZoom = parseFloat(e.target.value);
                      handleZoom(newZoom - zoom);
                      setZoom(newZoom);
                    }}
                    className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: "#0057b8" }}
                  />
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-4">
              {/* Preview */}
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-2">
                  PREVIEW
                </label>
                <div className="w-full aspect-square bg-stone-50 rounded-2xl overflow-hidden border-2 border-blue-600">
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Rotation */}
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-2">
                  ROTASI
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleRotate(90)}
                    className="w-full py-2 px-3 bg-stone-100 text-stone-700 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-all"
                  >
                    ⟳ Putar 90°
                  </button>
                  <button
                    onClick={() => handleRotate(-90)}
                    className="w-full py-2 px-3 bg-stone-100 text-stone-700 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-all"
                  >
                    ⟲ Putar -90°
                  </button>
                </div>
              </div>

              {/* Flip */}
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-2">
                  FLIP
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleFlipHorizontal}
                    className="py-2 px-2 bg-stone-100 text-stone-700 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                  >
                    ↔ Horizontal
                  </button>
                  <button
                    onClick={handleFlipVertical}
                    className="py-2 px-2 bg-stone-100 text-stone-700 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                  >
                    ↕ Vertikal
                  </button>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="w-full py-2 px-3 bg-stone-200 text-stone-700 rounded-lg font-bold text-sm hover:bg-stone-300 transition-all"
              >
                ↺ Reset
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4 flex gap-2 border-t">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-stone-200 text-stone-600 rounded-xl font-bold hover:bg-stone-300 transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleCrop}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <span>✓</span> Simpan Crop
          </button>
        </div>
      </div>
    </div>
  );
}
