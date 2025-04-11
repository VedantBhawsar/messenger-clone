"use client";

import Modal from "@/components/Modal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  
  // Handle src updates properly to avoid DOM issues
  useEffect(() => {
    if (isOpen && src) {
      setImageSrc(src);
    }
  }, [isOpen, src]);

  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4 w-full flex justify-end">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/30 transition"
          >
            <X className="h-5 w-5 text-white" />
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {imageSrc && (
            <motion.div 
              key="image-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl h-auto max-h-[70vh] relative rounded-xl overflow-hidden shadow-2xl"
            >
              <Image 
                alt="Image" 
                className="object-contain" 
                src={imageSrc}
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default ImageModal;
