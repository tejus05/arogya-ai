"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Rocket } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { useRouter } from "next/navigation";

const Contact = () => {

  const formSchema = z.object({
    height: z.number(),
    weight: z.number(),
    age: z.number(),
    name: z.string().min(1)
  });

  type TFormSchema = z.infer<typeof formSchema>;

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: 120,
      weight: 20,
      age: 15,
      name:""
    },
  });

  const router = useRouter();

  const onSubmit = async (values: TFormSchema) => {
    try {
      const validatedValues = formSchema.safeParse(values);
      if (!validatedValues.success) {
        return toast.error("Please enter valid data. ");
      }
      const response = await axios.post("/api/goals", validatedValues.data);
      router.refresh();
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again. ");
    }
  };

  return (
    <section className="bg-blue-500 border-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col place-items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="text-lg  text-black/80">
                  Enter the name of your goal
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Enter here"
                    className="text-lg rounded-xl bg-[#E2FFD8]"
                  />
                </FormControl>
                {form.formState.errors.name ? (
                  <span className="text-sm text-rose-500">
                    {form.formState.errors.name.message}
                  </span>
                ) : null}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="text-lg text-black/80">
                  Enter your height (in cms)
                </Label>
                <FormControl>
                  <Input
                    min={120}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="number"
                    disabled={form.formState.isSubmitting}
                    placeholder="Enter your height"
                    className="h-12 text-lg rounded-xl bg-[#E2FFD8]"
                  />
                </FormControl>
                {form.formState.errors.height ? (
                  <span className="text-sm text-rose-500">
                    {form.formState.errors.height.message}
                  </span>
                ) : null}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="text-lg text-black/80">
                  Enter your weight (in kgs){" "}
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={form.formState.isSubmitting}
                    placeholder="Enter your weight"
                    type="number"
                    className="h-12 text-lg rounded-xl bg-[#E2FFD8]"
                    min={20}
                  />
                </FormControl>
                {form.formState.errors.weight ? (
                  <span className="text-sm text-rose-500">
                    {form.formState.errors.weight.message}
                  </span>
                ) : null}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="text-lg  text-black/80">
                  Enter your age (in years){" "}
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="number"
                    min={15}
                    disabled={form.formState.isSubmitting}
                    placeholder="Enter your age"
                    className="text-lg rounded-xl bg-[#E2FFD8]"
                  />
                </FormControl>
                {form.formState.errors.age ? (
                  <span className="text-sm text-rose-500">
                    {form.formState.errors.age.message}
                  </span>
                ) : null}
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center md:flex-row flex-col-reverse gap-7 md:gap-0">
            <Button
              className="bg-indigo-700 text-white rounded-lg text-[17px] px-5 py-6 hover:bg-indigo-600"
              type="submit"
              variant="default"
              disabled={form.formState.isSubmitting}
            >
              Create
              <Rocket className="ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Contact;
