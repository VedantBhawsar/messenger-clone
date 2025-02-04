"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import EmojiPicker from "emoji-picker-react";

import MessageInput from "./MessageInput";
import { useState } from "react";
import { Smile } from "lucide-react";
import Button from "@/components/Button";
import { IoAttach } from "react-icons/io5";

const Form = () => {
  const { conversationId } = useConversation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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

  function handleDocUpload() {}

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
      flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="iug38uvw"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <Button secondary={true} onClick={handleDocUpload}>
        <IoAttach className="text-xl" />
      </Button>
      <div className="relative">
        <Button
          secondary
          onClick={() => {
            setShowEmojiPicker((prev) => !prev);
          }}
        >
          <Smile />
        </Button>
        <div className="absolute bottom-12">
          <EmojiPicker
            open={showEmojiPicker}
            onEmojiClick={(e) => {
              setValue("message", message + e.emoji);
              setShowEmojiPicker(false);
            }}
            autoFocusSearch={false}
            lazyLoadEmojis={true}
          />
        </div>
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
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
