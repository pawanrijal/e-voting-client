"use client";

import { getAllPositions } from "@/apis/position/getAll";
import CustomEditor from "@/components/CKEditor";
import Tiptap from "@/components/TipTap";
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
import axios from "axios";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const formSchema = z.object({
  positionId: z.string(),
  manifesto: z.string().min(50),
});

type RequestFormValues = z.infer<typeof formSchema>;

export const RequestForm = ({
  // initialData,
  token,
}: {
  // initialData: any;
  token: string;
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [positionsData, setPositionsData] = useState([]);
  const [manifestoData, setManifestoData] = useState("");
  useEffect(() => {
    fetchPositions();
  }, []);
  const onSubmit = async (data: RequestFormValues) => {
    data.manifesto = manifestoData;
    console.log(data);
    try {
      setLoading(true);
      console.log("Request form data", data);

      await axios.post(`${baseUrl}/candidate`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Request Submitted");
      router.refresh();
      router.push(`/user/candidate`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const form = useForm<RequestFormValues>({});

  const fetchPositions = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await getAllPositions(token!);
      setPositionsData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={"Request for Candidancy"}
          description={"Please fill the form"}
        />
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
              name="positionId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positionsData.map((position: any) => (
                          <SelectItem
                            key={position.id}
                            value={position.id.toString()}
                          >
                            {position.name}
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
              name="manifesto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manifesto</FormLabel>
                  <FormControl>
                    <CustomEditor
                      loading={loading}
                      field={field}
                      setManifestoData={setManifestoData}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
