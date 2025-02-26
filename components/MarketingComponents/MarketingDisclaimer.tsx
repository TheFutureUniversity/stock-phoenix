import Link from "next/link";

export function Disclaimer({
  classNameOuter,
  source="direct",
}: {
  source?: string;
  classNameOuter?: string;
}) {
  const isTaboolaTwitter = (source == "Taboola") ||( source == "twitter");
  return (
    <>
      {isTaboolaTwitter ? (
        <div
          className={`w-full bg-slate-500 bg-opacity-70 text-white py-4 text-center pb-4  px-4 ${classNameOuter} `}
        >
          <p className={`text-sm`}>
            Disclaimer: Trading in financial markets involves substantial risk
            and is not suitable for all investors. The information provided on
            this website is for educational purposes only and is not investment
            advice. This Site is used for Information purposes and not intended
            for trading purposes.
          </p>
          <div className="sm:flex justify-center">
            <p className="text-xs text-center">
              © tradewise | Connect at: support@thefuture.university |{" "}
            </p>
            <Link href="/privacy-policy">
              <p className="text-xs text-center underline">Privacy Policy</p>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
