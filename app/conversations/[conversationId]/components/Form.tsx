"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageInput from "./MessageInput";
import { useState, useRef, useEffect } from "react";
import { FileImage, Paperclip, Send, Smile } from "lucide-react";
import Button from "@/components/Button";

const Form = () => {
  const { conversationId } = useConversation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");

  // Handle clicking outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiContainerRef.current && 
        !emojiContainerRef.current.contains(event.target as Node) &&
        showEmojiPicker
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.message.trim()) return;
    
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  function handleDocUpload() {
    // Implementation for document upload
  }

  const handleEmojiSelect = (emoji: any) => {
    setValue("message", message + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        py-4
        px-4
        bg-white
        dark:bg-gray-900
        border-t
        border-gray-200
        dark:border-gray-800
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
        shadow-sm
        relative
      "
    >
      <div className="flex space-x-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
        >
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="iug38uvw"
          >
            <FileImage size={20} className="text-indigo-500 dark:text-indigo-400" />
          </CldUploadButton>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
          onClick={handleDocUpload}
        >
          <Paperclip size={20} className="text-indigo-500 dark:text-indigo-400" />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
          onClick={() => setShowEmojiPicker(prev => !prev)}
        >
          <Smile size={20} className="text-indigo-500 dark:text-indigo-400" />
        </motion.div>
      </div>

      {/* Emoji Picker */}
      <div 
        ref={emojiContainerRef} 
        className="absolute bottom-20 left-4 z-10"
      >
        <AnimatePresence mode="wait">
          {showEmojiPicker && (
            <motion.div 
              key="emoji-picker"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  autoFocusSearch={false}
                  lazyLoadEmojis={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message..."
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!message.trim()}
          className="
            rounded-full
            p-3
            bg-gradient-to-r 
            from-indigo-500 
            to-purple-600
            cursor-pointer
            disabled:opacity-50
            disabled:cursor-default
            disabled:bg-gray-400
            shadow-md
            hover:shadow-indigo-500/20
            transition
          "
        >
          <Send size={18} className="text-white" />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Form;
