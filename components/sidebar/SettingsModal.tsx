"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../inputs/Input";
import { motion } from "framer-motion";
import { Settings, Upload } from "lucide-react";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
        toast.success("Profile updated successfully!");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={modalVariants}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <motion.div 
              className="border-b border-indigo-100 dark:border-indigo-900/30 pb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                <h2 className="text-xl font-bold music-text-gradient">
                  Profile Settings
                </h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Edit your public profile information.
              </p>

              <motion.div
                className="mt-8 flex flex-col gap-y-6"
                variants={itemVariants}
              >
                <Input
                  disabled={isLoading}
                  label="Name"
                  id="name"
                  errors={errors}
                  required
                  register={register}
                />
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                    Photo
                  </label>
                  <div className="flex items-center gap-x-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md"
                    >
                      <Image
                        fill
                        className="rounded-full object-cover"
                        src={image || currentUser?.image || "/images/placeholder.jpg"}
                        alt="Avatar"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onUpload={handleUpload}
                        uploadPreset="iug38uvw"
                      >
                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-md px-3 py-2 flex items-center gap-2 text-sm font-semibold">
                          <Upload className="h-4 w-4" />
                          <Button disabled={isLoading} type="button">
                            Upload
                          </Button>
                        </div>
                      </CldUploadButton>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-end gap-x-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button disabled={isLoading} secondary onClick={onClose}>
                  Cancel
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                className="overflow-hidden rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 p-[1px]"
              >
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="mr-2"
                    >
                      <Settings className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default SettingsModal;
