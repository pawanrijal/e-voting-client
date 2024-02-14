"use client";

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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { baseUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  // startDate: z.string(),
  // endDate: z.string(),
  time: z.string(),
});

type ElectionFormValues = z.infer<typeof formSchema>;

export const ElectionForm = ({
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
  const title = initialData ? "Edit election" : "Create election";
  const description = initialData ? "Edit a election." : "Add a new election";
  const toastMessage = initialData ? "Election updated." : "Election created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: ElectionFormValues) => {
    try {
      setLoading(true);
      console.log("election form data", data);
      if (initialData) {
        await axios.put(`${baseUrl}/election/${params.electionId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${baseUrl}/election`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/election`);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const form = useForm<ElectionFormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
      description: initialData?.description,
      // startDate: initialData?.startDate,
      // endDate: initialData?.endDate,
      time: initialData?.time,
    },
  });
  const handleDelete = async (id: string) => {
    const isconfirmed = window.confirm("Are you sure you want to delete?");
    const token = localStorage.getItem("auth_token");
    if (isconfirmed) {
      try {
        await axios.delete(`${baseUrl}/election/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Deleted Successfully");
        router.push("/election");
      } catch (err) {
        toast.error("Something went wrong");
      }
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
            {/* <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      {...field}
                      defaultValue={initialData?.startDate}
                      required={initialData ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      {...field}
                      defaultValue={initialData?.endDate}
                      required={initialData ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField control={form.control} name="time" render={({ field }) => (
              <FormItem>
                <FormLabel>Time Validity (In Minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    defaultValue={initialData?.time}
                    required={initialData ? false : true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}>

            </FormField>
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
