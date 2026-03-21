export function PeacockDivider() {
  return (
    <div className="relative w-full flex justify-center mt-4">
        <div className="h-px w-[calc(100%-72px)] max-w-3xl bg-gradient-to-r from-transparent via-(--accent) to-transparent opacity-60" />
        <div className="absolute -top-10 overflow-hidden flex justify-center">
          <dotlottie-wc
            src="https://lottie.host/ef6598e7-10f6-4519-a916-c06ce1c71e43/SYSiKFVerg.lottie"
            // src="https://lottie.host/b201bdc5-a7fa-4efe-ad70-49921298a303/SJ1RASfRoC.lottie"
            autoplay
            style={{
              width: 135
              // transform: "translateY(20px)",
            }}
          />
        </div>
      </div>
  );
}
