import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ShineButton from "@/components/ui/ShineButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

export default function ContactForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const tokenRef = useRef<string>("");
  const recaptchaRef = useRef<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTone, setModalTone] = useState<"success" | "error">("success");

  const [subject, setSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const openModal = (message: string, tone: "success" | "error") => {
    setModalMessage(message);
    setModalTone(tone);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/v0/send-email`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": `${import.meta.env.VITE_FUNCTION_KEY}`,
          },
          method: "POST",
          body: JSON.stringify({
            email: email,
            subject: subject,
            content: content,
            token: tokenRef.current,
          }),
        },
      );

      const resp = await res.json();
      console.log(resp);
      if (res.ok) {
        openModal(resp.body, "success");
      } else {
        openModal(resp.body, "error");
      }
    } catch (e) {
      console.log("Some error occured: ", e);
      openModal("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
      setEmail("");
      recaptchaRef.current?.reset();
      tokenRef.current = "";
    }
  };

  const captchaAction = (token: string | null) => {
    if (token) tokenRef.current = token;
  };

  const validateForm = () => {
    if (loading) return false;
    if (!subject.trim() || !email.trim() || !content.trim()) {
      openModal("Please fill all fields.", "error");
      return false;
    }
    if (!tokenRef.current) {
      openModal("Please complete CAPTCHA.", "error");
      return false;
    }
    if (!validateEmail(email)) {
      openModal("Please enter a valid email.", "error");
      return false;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <>
      <form className="w-full rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
        <div className="flex flex-col gap-2">
          <div className="flex md:flex-row flex-col justify-evenly gap-2">
            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="subject"
                className="text-sm text-(--text-primary)"
              >
                Subject
              </label>
              <input
                placeholder="any subject"
                id="subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-10 rounded-lg border border-white/15 bg-transparent px-3 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-(--light-text) focus:border-white/40"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="email" className="text-sm text-(--text-primary)">
                Your email
              </label>
              <input
                placeholder="youremail@xyz.com"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg border border-white/15 bg-transparent px-3 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-(--light-text) focus:border-white/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <textarea
              id="content"
              name="content"
              rows={6}
              placeholder="What do you want to talk about..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-28 resize-y rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-(--light-text) focus:border-white/40"
            />
          </div>

          <div className="flex md:flex-row flex-col gap-2">
            <ShineButton
              type="button"
              onClick={(e) => handleFormSubmit(e)}
              disabled={loading}
            >
              <i className="bi bi-send"></i>
              <span>&nbsp;</span>
              {loading ? "Sending... " : "Submit "}
            </ShineButton>
            <div className="inline-block origin-top-left scale-[0.75]">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITEKEY}
                ref={recaptchaRef}
                onChange={(value) => captchaAction(value)}
              />
            </div>
          </div>
        </div>
      </form>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          overlayClassName="bg-black/30"
          className="w-[92vw] max-w-md rounded-lg border border-(-secondary) bg-black/20 backdrop-blur-md"
        >
          <DialogHeader className="gap-3">
            <div
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                modalTone === "success"
                  ? "border-emerald-300/30 bg-emerald-300/15 text-emerald-200"
                  : "border-rose-300/30 bg-rose-300/15 text-rose-200"
              }`}
            >
              <i
                className={`bi ${modalTone === "success" ? "bi-check-circle" : "bi-exclamation-triangle"}`}
              />
              {modalTone === "success" ? "Success" : "Error"}
            </div>
            <DialogDescription className="text-sm text-zinc-200/90 px-1">
              {modalMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
