"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/services/user";
import { toast } from "react-toastify";
import { Ellipsis } from "lucide-react";

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters"),
  body: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(600, "Content must be at most 600 characters"),
});

type NewPostData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export default function NewPostModal({ open, onClose, userId }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: NewPostData) => {
      return createPost({ ...data,  
        id: crypto.randomUUID(),
        user_id: userId,
        created_at: new Date().toISOString(),
    });
    },
    onSuccess: () => {
      toast.success("New Post added successfully");
      queryClient.invalidateQueries({ queryKey: ['posts', userId] });
      onClose();
    },
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostData>({
    resolver: zodResolver(schema),
     mode: "onChange"
  });

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="h-[483px] w-[679px] p-6">
        <DialogHeader >
          <DialogTitle className="text-3xl font-medium">New Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <div>
            <label className="block text-[18px] text-gray-600font-medium mb-[10px]">Post title</label>
            <Input placeholder="Give your post a title" {...register("title")} className="rounded-sm text-sm"/>
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-[18px] text-gray-600font-medium mb-[10px]">Post content</label>
            <Textarea
            className="border-[1px] border-gray-200 h-[179px] py-[10px] px-[15px] rounded-sm text-sm"
              placeholder="Write something mind-blowing "
              rows={5}
              {...register("body")}
            />
            {errors.body && <p className="text-red-500 text-xs">{errors.body.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <><span>Publishing</span> <Ellipsis/> </>: "Publish" }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
