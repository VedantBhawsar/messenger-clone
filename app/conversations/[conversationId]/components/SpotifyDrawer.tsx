"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ArrowBigRight, ArrowBigLeft, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import { BsSpotify } from "react-icons/bs";
import MusicPlaylist from "./MusicPlaylist";
import { Card, CardContent } from "@/components/ui/card";
import MusicPlayerCard from "./MusicPlayerCard";

interface SpotifyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpotifyDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <BsSpotify
          size={28}
          className="text-green-500 hover:text-green-600 cursor-pointer transition rounded-full"
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Listen Together</DrawerTitle>
          <DrawerDescription>
            Listen music on spotify together
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-5  grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <MusicPlayerCard />
          </div>
          <div className="col-span-3 ">
            <MusicPlaylist />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
