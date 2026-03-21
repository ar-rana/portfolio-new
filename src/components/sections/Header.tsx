import assetVideo from '@/assets/asset.webm'

export function Header() {
    return (
        <header className="relative w-[calc(100%-32px)] max-w-xl mx-auto overflow-hidden flex items-center mt-16 rounded-md px-6 p-2">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 z-[1] h-[220px] w-[170%] -translate-x-1/2"
                style={{
                    background:
                        "radial-gradient(ellipse at top, rgba(242,242,238,0.24) 0%, rgba(89,129,133,0.3) 36%, rgba(89,129,133,0.14) 52%, rgba(23,23,23,0) 80%)",
                }}
            />
            {/* Full Width Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-50"
            >
                <source src={assetVideo} type="video/mp4" />
            </video>

            {/* height fit Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain object-right z-0 pointer-events-none opacity-80"
            >
                <source src={assetVideo} type="video/webm" />
            </video>

            {/* Content Divider */}
            <div className="relative z-10 flex justify-between items-center gap-3 w-full">
                <img
                    src="logos/no-bg/main_logo-360.svg"
                    // src="/main_logo.svg"
                    alt="Logo"
                    className="object-contain w-24"
                />
                {/* <div className="flex flex-col items-end">
                    <h1 className="font-serif text-[20px] font-medium text-(--text-primary) tracking-tight leading-tight">
                        Aryan Rana
                    </h1>
                    <p className="text-[12px] text-(--secondary) font-normal tracking-wide mt-0.5 flex items-center gap-1.5">
                        Full Stack Developer
                    </p>
                </div> */}
            </div>
        </header>
    )
}
