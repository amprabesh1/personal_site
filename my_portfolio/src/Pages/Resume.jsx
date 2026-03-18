import { m, LazyMotion, domAnimation } from "framer-motion";
import SectionTitle from "../Components/SectionTitle";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Prabesh_Aryal_Resume.pdf";
    link.click();
  };

  const handleViewFullPage = () => {
    window.open("/resume.pdf", "_blank");
  };

  const btnBase =
    "px-6 py-2 rounded-xl text-[18px] font-semibold transition-all duration-300 border-2 border-[#1E3A8A] dark:border-primary-200 text-[#1E3A8A] dark:text-primary-200 hover:bg-[#1E3A8A] dark:hover:bg-primary-200 hover:text-white dark:hover:text-dark-bg";

  return (
    <div id="resume" className="w-full overflow-hidden-web flex justify-center">
      <div className="w-full min-h-[800px] flex flex-col xl:w-[70%]">
        <div className="w-full">
          <SectionTitle title="RESUME" subtitle="My Background" />
        </div>

        <LazyMotion features={domAnimation} strict>
          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full flex flex-col items-center gap-8 px-4 pb-16"
          >
            {/* PDF Viewer */}
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden border-2 border-[#1E3A8A] dark:border-primary-200 shadow-lg">
              <iframe
                src="/resume.pdf"
                title="Prabesh Aryal Resume"
                className="w-full"
                style={{ height: "720px" }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleViewFullPage} className={btnBase}>
                View Full Page
              </button>
              <button onClick={handleDownload} className={btnBase}>
                Download
              </button>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </div>
  );
};

export default Resume;
