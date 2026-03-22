import type { ReactNode } from "react";

interface Certificates {
  title: string;
  link: string;
  icon: string | ReactNode;
}

export const certs: Certificates[] = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/ar-rana/D88B13AF59C47E26?sharingId=809AB72947F9520D",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-label="Microsoft logo"
      >
        <rect x="0" y="0" width="7.2" height="7.2" fill="#F25022" />
        <rect x="8.8" y="0" width="7.2" height="7.2" fill="#7FBA00" />
        <rect x="0" y="8.8" width="7.2" height="7.2" fill="#00A4EF" />
        <rect x="8.8" y="8.8" width="7.2" height="7.2" fill="#FFB900" />
      </svg>
    ),
  },
  {
    title: "IBM: Cloud Computing Fundamentals",
    link: "https://www.credly.com/badges/ea6f677f-7e62-4717-bd58-1b90322c0652/public_url",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="16"
        viewBox="0 0 28 16"
        aria-label="IBM logo"
      >
        <rect x="0" y="0" width="28" height="16" rx="2" fill="#FFFFFF" />
        <text
          x="14"
          y="11.5"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          fill="#0F62FE"
        >
          IBM
        </text>
      </svg>
    ),
  },
  {
    title: "Postman API Fundamentals",
    link: "https://badgr.com/public/assertions/mCm_THmYQW-suouNNkcYCg",
    icon: "https://skills.syvixor.com/api/icons?perline=1&i=postman"
  },
  {
    title: "Java Spring Framework & Spring Boot",
    link: "https://www.udemy.com/certificate/UC-905c6608-0692-4f2e-9db8-b198497aae4a",
    icon: "https://skills.syvixor.com/api/icons?perline=1&i=udemy"
  },
  {
    title: "NodeJS & Expresss with Socket.io",
    link: "https://www.udemy.com/certificate/UC-d3e9c9ba-109a-4fcf-aad3-28fc0a2b6e60",
    icon: "https://skills.syvixor.com/api/icons?perline=1&i=udemy"
  },
];
