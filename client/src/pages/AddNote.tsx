import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import { useNavigate } from "react-router-dom";
import { useAddNote } from "@/hooks/note/useAddNote";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2),
  note: z.string().min(2),
});

export const AddNote = () => {
  const navigate = useNavigate();
  const addNoteMutation = useAddNote();

  const addNoteForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, note } = values;
    addNoteMutation.mutate(
      { title, note },
      {
        onSuccess: () => {
          toast({
            title: "Note added successfully done",
            description: "You can now add a new note",
            variant: "success",
          });
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
          <CardTitle className="text-2xl">Add-Note Here</CardTitle>
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
                      <FormLabel>Title</FormLabel>
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
              <Button type="submit">Add Note</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
