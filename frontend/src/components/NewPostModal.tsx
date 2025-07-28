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

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Content is required"),
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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostData>({
    resolver: zodResolver(schema),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Post title</label>
            <Input placeholder="Give your post a title" {...register("title")} />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Post content</label>
            <Textarea
              placeholder="Write something mind-blowing"
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
              {mutation.isPending ? "Publishing..." : "Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
