import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ShineButton from "@/components/ui/ShineButton";

export default function ContactForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const tokenRef = useRef<string>("");
  const recaptchaRef = useRef<any>(null);

  const [subject, setSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleFormSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASEURL}/send-email`, {
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
      });

      if (res.ok) {
        const response = await res.text();
        setMessage(response);
      } else {
        const response = await res.text();
        setMessage(response);
      }
    } catch (e) {
      console.log("Some error occured: ", e);
    } finally {
      setLoading(false);
      recaptchaRef.current.reset();
      tokenRef.current = "";
    }
  };

  const captchaAction = (token: string | null) => {
    if (token) tokenRef.current = token;
  };

  const validateForm = () => {
    if (loading) return false;
    if (
      !subject.trim() ||
      !email.trim() ||
      !content.trim()
    ) {
      setMessage("Please fill all fields");
      return false;
    }
    if (!tokenRef.current) {
      setMessage("Please complete CAPTCHA");
      return false;
    }
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email");
      return false;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <form className="w-full rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
      <div className="flex flex-col gap-2">
        <div className="flex md:flex-row flex-col justify-evenly gap-2">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="subject" className="text-sm text-(--text-primary)">
              Subject
            </label>
            <input
              placeholder="your good name"
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
              placeholder="youemail@xyz.com"
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
        
        {message ? (
          <p className="text-xs text-red-500 opacity-90">{message}</p>
        ) : null}

        <div className="flex md:flex-row flex-col gap-2">
          <ShineButton
            type="button"
            onClick={(e) => handleFormSubmit(e)}
            disabled={loading}
          >
            <i className="bi bi-send"></i><span>&nbsp;</span>
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
  );
}
