import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useEditNote } from "@/hooks/note/useEditNote";
import { useNote } from "@/hooks/note/useNote";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2),
  note: z.string().min(2),
});
interface Note {
  id: number;
  title: string;
  note: string;
}

export const EditNote = () => {
  const params = useParams();
  const navigate = useNavigate();

  const noteId = params.noteId ? parseInt(params.noteId) : 0;
  const noteQuery = useNote(noteId);

  if (noteId < 1) {
    toast({
      title: "noteId is not valid",
    });
    navigate("/dashboard");
  }

  const editNoteMutation = useEditNote();

  const note: Note = noteQuery.data;

  const addNoteForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: note.title,
      note: note.note,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, note } = values;

    editNoteMutation.mutate(
      { noteId, note: { title, note } },
      {
        onSuccess: () => {
          toast({
            title: "Note edited successfully",
            description: "Now you can save new note",
            variant: "success",
          }),
            navigate("/dashboard");
        },
        onError: () => {
          toast({
            title: "something went wong.",
            description: "Please try again later.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl">Edit-Note Here</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...addNoteForm}>
            <form
              onSubmit={addNoteForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={addNoteForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full items-center gap-4">
                <FormField
                  control={addNoteForm.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="notes" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display notes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={editNoteMutation.isPending}>
                {editNoteMutation.isPending ? "Saving..." : "Save Note"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
