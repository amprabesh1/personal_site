/*
   Copyright (C), 2023-2024, Sara Echeverria (bl33h)
   Author: Sara Echeverria
   FileName: ProjectCards.jsx
   Version: I
   Creation: 02/06/2023
   Last modification: 19/04/2024
*/

import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { projects } from "../Constants/constants";
import { githubIcon } from "../assets";
import { fadeIn } from "./animationVariants";

const ProjectCard = ({
  index,
  name,
  description,
  image,
  source_code_link,
  demo_link,
}) => {
  return (
      <Tilt
          options={{
              max: 40,
              scale: 1,
              speed: 450,
          }}
          className="shadow-2xl p-5 rounded-lg sm:w-[300px] w-[100%] flex flex-col text-black dark:bg-dark-bg dark:text-grayscale-100 dark:border dark:border-primary-200/20"
      >
          <motion.div
              variants={fadeIn("up", "spring", index * 0.5, 0.75)}
              className="flex flex-col flex-1"
          >
              <div className="relative">
                  <img
                      src={image}
                      alt={name}
                      className="w-full h-[180px] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                      <div
                          onClick={() => window.open(source_code_link, "_blank")}
                          className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
                      >
                          <img
                              src={githubIcon}
                              alt="github"
                              className="w-full h-full object-contain"
                          />
                      </div>
                  </div>
              </div>

              <div className="mt-3 flex-1">
                  <h3 className="font-bold text-2xl text-[#1E3A8A] dark:text-primary-200">{name}</h3>
                  <p className="mt-2 text-[14px] leading-snug dark:text-grayscale-100" style={{ color: 'inherit' }}>
                      {description}
                  </p>
              </div>
              <div className="mt-4 flex justify-center items-center">
                  <a
                      className="shadow-md p-2 rounded-lg flex justify-center border border-[#1E3A8A] dark:border-primary-200 text-[#1E3A8A] dark:text-primary-200 hover:bg-[#1E3A8A] dark:hover:bg-primary-200 hover:text-white dark:hover:text-dark-bg transition-all duration-300"
                      href={demo_link}
                      target="_blank"
                  >
                      See the Demo
                  </a>
              </div>
          </motion.div>
      </Tilt>
  );
};

const Works = () => {
    return (
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-grayscale-50 w-full">
            {projects.map((project, index) => (
                <ProjectCard key={`project-${index}`} index={index} {...project} />
            ))}
        </div>
    );
};

export default Works;
