import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Card, CardContent } from "@/components/ui/card";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { Marquee } from "@/components/magicui/marquee";
import { BiLogoJavascript } from "react-icons/bi";
import { SiPhp, SiDatabricks, SiBitbucket, SiJira, SiQgis, SiPostman } from "react-icons/si";
import { FaReact, FaLaravel, FaPython, FaGitAlt, FaTerminal, FaGithub, FaDocker } from "react-icons/fa";
import { SiApachespark, SiGdal } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMysql } from "react-icons/si";

const HomePage = () => {
  return (
    <main>
      <section id="intro" className="mt-30 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Hey, I’m Kenny.
          </p>
          <TypingAnimation startOnView className="font-semibold text-[10px] sm:text-sm md:text-md lg:text-lg">
            I love video games, tennis, pickleball — and building whatever excites me.
          </TypingAnimation>
        </div>
      </section>

      <section id="find-me" className="flex items-center justify-center mt-10 overflow-x-hidden">
        <div className="flex items-center justify-center gap-4 px-4 py-2 w-full max-w-screen-lg">
          <Card onClick={() => window.open("https://github.com/0xkenn", "_blank")} className="cursor-pointer py-3 flex-shrink-0">
            <CardContent className="py-1 px-6">
              <div className="flex items-center gap-2">
                <DiGithubBadge className="text-xl" />
                <h1 className="text-sm">GitHub</h1>
              </div>
            </CardContent>
          </Card>

          <Card onClick={() => window.open("https://www.linkedin.com/in/kc-tabon/", "_blank")} className="cursor-pointer py-3 flex-shrink-0">
            <CardContent className="py-1 px-6">
              <div className="flex items-center gap-2">
                <FaLinkedin className="text-xl" />
                <h1 className="text-sm">LinkedIn</h1>
              </div>
            </CardContent>
          </Card>

          <Card onClick={() => window.open("https://www.instagram.com/0xkenn/", "_blank")} className="cursor-pointer py-3 flex-shrink-0">
            <CardContent className="py-1 px-6">
              <div className="flex items-center gap-2">
                <CiInstagram className="text-xl" />
                <h1 className="text-sm">Instagram</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="tech-stack" className="flex flex-col items-center mt-30 w-full md:w-3/4 lg:w-1/2 mx-auto overflow-x-hidden">
        <h1 className="mb-4 text-4xl font-bold">Technology Used</h1>

        <Marquee repeat={100}>
          {[
            { icon: <BiLogoJavascript className="text-xl bg-amber-300" />, label: "JavaScript", border: "border-yellow-300", text: "text-yellow-300" },
            { icon: <FaPython className="text-xl text-blue-800" />, label: "Python", border: "border-blue-500", text: "text-blue-300" },
            { icon: <SiPhp className="text-xl text-blue-300" />, label: "PHP", border: "border-blue-300", text: "text-blue-100" },
            { icon: <SiApachespark className="text-xl text-red-500" />, label: "PySpark", border: "border-red-400", text: "text-red-100" },
            { icon: <BiLogoPostgresql className="text-xl text-[#00bfef]" />, label: "PostgreSQL", border: "border-sky-300", text: "text-blue-100" },
            { icon: <SiMysql className="text-xl text-[#00baef]" />, label: "MySQL", border: "border-blue-300", text: "text-blue-100" },
          ].map((tech, i) => (
            <Card key={i} className={`bg-transparent ${tech.border} border text-white px-4 py-2 mr-2`}>
              <CardContent className="flex items-center gap-2 px-2 py-1">
                {tech.icon}
                <span className={`text-sm font-medium ${tech.text}`}>{tech.label}</span>
              </CardContent>
            </Card>
          ))}
        </Marquee>

        <Marquee reverse repeat={100}>
          {[
            { icon: <SiDatabricks className="text-xl text-red-600" />, label: "Databricks", border: "border-red-600", text: "text-red-100" },
            { icon: <FaReact className="text-xl text-blue-500" />, label: "React", border: "border-blue-500", text: "text-blue-200" },
            { icon: <FaLaravel className="text-xl text-red-500" />, label: "Laravel", border: "border-red-500", text: "text-red-100" },
            { icon: <SiGdal className="text-xl text-blue-500" />, label: "GDAL | OGR", border: "border-blue-500", text: "text-blue-100" },
          ].map((tech, i) => (
            <Card key={i} className={`bg-transparent ${tech.border} border text-white px-4 py-2 mr-2`}>
              <CardContent className="flex items-center gap-2 px-2 py-1">
                {tech.icon}
                <span className={`text-sm font-medium ${tech.text}`}>{tech.label}</span>
              </CardContent>
            </Card>
          ))}
        </Marquee>

        <Marquee repeat={100}>
          {[
            { icon: <FaGitAlt className="text-xl text-orange-500" />, label: "Git", border: "border-orange-500", text: "text-orange-100" },
            { icon: <FaTerminal className="text-xl text-green-500" />, label: "Bash", border: "border-green-500", text: "text-green-100" },
            { icon: <FaGithub className="text-xl text-gray-300" />, label: "GitHub", border: "border-gray-400", text: "text-gray-100" },
            { icon: <SiBitbucket className="text-xl text-blue-500" />, label: "Bitbucket", border: "border-blue-500", text: "text-blue-100" },
            { icon: <SiJira className="text-xl text-blue-600" />, label: "Jira", border: "border-blue-600", text: "text-blue-100" },
            { icon: <SiQgis className="text-xl text-green-600" />, label: "QGIS", border: "border-green-600", text: "text-green-100" },
            { icon: <SiPostman className="text-xl text-orange-400" />, label: "Postman", border: "border-orange-400", text: "text-orange-100" },
            { icon: <FaDocker className="text-xl text-sky-400" />, label: "Docker", border: "border-sky-400", text: "text-sky-100" },
          ].map((tool, i) => (
            <Card key={i} className={`bg-transparent ${tool.border} border text-white px-4 py-2 mr-2`}>
              <CardContent className="flex items-center gap-2 px-2 py-1">
                {tool.icon}
                <span className={`text-sm font-medium ${tool.text}`}>{tool.label}</span>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </section>
    </main>
  );
};

export default HomePage;
