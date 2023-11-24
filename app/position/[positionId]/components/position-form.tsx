"use client";

import { getAllElections } from "@/apis/election/getAll";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { baseUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  electionId: z.string(),
});

type PositionFormValues = z.infer<typeof formSchema>;

export const PositionForm = ({
  initialData,
  token,
}: {
  initialData: any;
  token: string;
}) => {
  console.log("Initial data", initialData);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);
  const form = useForm<PositionFormValues>();

  useEffect(() => {
    fetchElections();
  }, []);

  useEffect(() => {
    // Set default values once initialData is available
    if (initialData) {
      form.setValue("electionId", initialData.electionId.toString());
    }
  }, [initialData, form]); // Trigger the effect whenever initialData changes

  const title = initialData ? "Edit position" : "Create position";
  const description = initialData ? "Edit a position." : "Add a new position";
  const toastMessage = initialData ? "Position updated." : "Position created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: PositionFormValues) => {
    try {
      setLoading(true);
      console.log("position form data", data);
      if (initialData) {
        await axios.put(`${baseUrl}/position/${params.positionId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${baseUrl}/position`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/position`);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isconfirmed = window.confirm("Are you sure you want to delete?");
    const token = localStorage.getItem("auth_token");
    if (isconfirmed) {
      try {
        await axios.delete(`${baseUrl}/position/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Deleted Successfully");
        router.push("/position");
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  };

  const fetchElections = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await getAllElections(token!);
      if (response.status == 200) {
        setElections(response.data.data);
      }
    } catch (err) {
      console.log("Fetching Election", err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(initialData.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Name"
                      defaultValue={initialData?.name}
                      required={initialData ? false : true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electionId"
              render={({ field }) => {
                console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Election</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={initialData?.electionId.toString()}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Election" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {elections.map((election: any) => (
                          <SelectItem
                            key={election.id}
                            value={election.id.toString()}
                          >
                            {election.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      {...field}
                      defaultValue={initialData?.description}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
