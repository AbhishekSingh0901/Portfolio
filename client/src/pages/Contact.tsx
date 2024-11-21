import AnimatedContact from "@/components/ui/AnimatedContact";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { easeInOut, motion } from "framer-motion";
import { sanityClient } from "@/utils/sanity.config";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@hooks/use-toast";
function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { toast } = useToast();
  const submitHandeler = (e: FormEvent) => {
    e.preventDefault();

    const contact = {
      _type: "contact",
      username: formData.username,
      email: formData.email,
      message: formData.message,
    };

    sanityClient.create(contact).then(() => {
      toast({
        title: "Message sent",
        description: "I'll get back to you as soon as possible",
        type: "success",
      });
      setFormData({
        username: "",
        email: "",
        message: "",
      });
    });
  };
  return (
    <div className="absolute z-30 h-screen w-screen p-6 mt-8 text-white flex flex-col">
      <SectionHeading heading="Let's connect" />
      <div className="w-full mx-auto max-w-5xl min-h-[400px]">
        <motion.div
          initial={{ width: 0, height: 0, y: 170 }}
          whileInView={{ width: "100%", height: "100%", y: 170 }}
          transition={{ ease: easeInOut }}
          viewport={{ once: true }}
          className=" mx-auto overflow-hidden glass-effect rounded-2xl flex justify-between items-center"
        >
          <form
            onSubmit={submitHandeler}
            className="relative text-black bg-neutral-100 w-full lg:w-1/2 flex flex-col justify-start items-start gap-6 h-full p-6"
          >
            <Input
              value={formData.username}
              placeholder="full Name"
              onChange={(e) =>
                setFormData((formdata) => {
                  return { ...formdata, username: e.target.value };
                })
              }
            />
            <Input
              value={formData.email}
              placeholder="please provide your email"
              type="email"
              onChange={(e) =>
                setFormData((formdata) => {
                  return { ...formdata, email: e.target.value };
                })
              }
            />

            <Textarea
              value={formData.message}
              placeholder="write your message"
              rows={6}
              onChange={(e) =>
                setFormData((formdata) => {
                  return { ...formdata, message: e.target.value };
                })
              }
            />

            <Button
              type="submit"
              className="absolute bottom-5 lg:bottom-10 right-5"
            >
              Send Message
            </Button>
          </form>
          <div className=" hidden lg:block p-6 h-5/6 relative w-1/2">
            <AnimatedContact />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
