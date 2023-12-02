import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNotes } from "@/hooks/note/useNotes";
import { useDeleteNote } from "@/hooks/note/useDeleteNote";
import { toast } from "@/components/ui/use-toast";

interface Note {
  id: number;
  title: string;
  note: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const noteQuery = useNotes();
  const deleteNoteMutation = useDeleteNote();

  const handleDelete = (id: number) => {
    deleteNoteMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Note deleted successfully",
          description: "Now you can add new note",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "something went wong.",
          description: "Please try again later.",
          variant: "destructive",
        });
      },
    });
  };

  if (noteQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (noteQuery.isError) {
    return <div>{noteQuery.error.message}</div>;
  }

  const notes: Note[] = noteQuery.data;

  return (
    <div className="flex flex-col mx-8">
      <div className="m-3">
        <Link to="/create">
          <Button className="my-3">Add-Note</Button>
        </Link>
        <h1 className="text-xl font-bold">Your Notes: ({notes.length})</h1>
      </div>
      <div className="flex flex-wrap">
        {notes.map((ele) => {
          return (
            <Card key={ele.id} className="w-[350px] m-4">
              <CardHeader>
                <CardTitle>{ele.title}</CardTitle>
                <CardDescription>{ele.note}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => {
                    navigate(`/edit/${ele.id}`);
                  }}
                >
                  Edit
                </Button>

                <Button
                  onClick={() => {
                    handleDelete(ele.id);
                  }}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
