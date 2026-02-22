import type { ReactNode } from "react";

import { BiLogoJavascript, BiLogoPostgresql } from "react-icons/bi";
import { CiInstagram } from "react-icons/ci";
import { DiGithubBadge } from "react-icons/di";
import {
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaLaravel,
  FaLinkedin,
  FaPython,
  FaReact,
  FaTerminal,
} from "react-icons/fa";
import {
  SiApachespark,
  SiBitbucket,
  SiDatabricks,
  SiGdal,
  SiJira,
  SiMysql,
  SiPhp,
  SiPostman,
  SiQgis,
} from "react-icons/si";

import type { SocialPlatform } from "@/types/portfolio";

export function getSocialIcon(platform: SocialPlatform, className = "text-xl"): ReactNode {
  switch (platform) {
    case "github":
      return <DiGithubBadge className={className} />;
    case "linkedin":
      return <FaLinkedin className={className} />;
    case "instagram":
      return <CiInstagram className={className} />;
    default:
      return <FaGithub className={className} />;
  }
}

export function getTechIcon(iconKey?: string, className?: string): ReactNode | null {
  switch (iconKey) {
    case "javascript":
      return <BiLogoJavascript className={className ?? "text-xl"} />;
    case "python":
      return <FaPython className={className ?? "text-xl"} />;
    case "php":
      return <SiPhp className={className ?? "text-xl"} />;
    case "spark":
      return <SiApachespark className={className ?? "text-xl"} />;
    case "postgresql":
      return <BiLogoPostgresql className={className ?? "text-xl"} />;
    case "mysql":
      return <SiMysql className={className ?? "text-xl"} />;
    case "databricks":
      return <SiDatabricks className={className ?? "text-xl"} />;
    case "react":
      return <FaReact className={className ?? "text-xl"} />;
    case "laravel":
      return <FaLaravel className={className ?? "text-xl"} />;
    case "gdal":
      return <SiGdal className={className ?? "text-xl"} />;
    case "git":
      return <FaGitAlt className={className ?? "text-xl"} />;
    case "bash":
      return <FaTerminal className={className ?? "text-xl"} />;
    case "github":
      return <FaGithub className={className ?? "text-xl"} />;
    case "bitbucket":
      return <SiBitbucket className={className ?? "text-xl"} />;
    case "jira":
      return <SiJira className={className ?? "text-xl"} />;
    case "qgis":
      return <SiQgis className={className ?? "text-xl"} />;
    case "postman":
      return <SiPostman className={className ?? "text-xl"} />;
    case "docker":
      return <FaDocker className={className ?? "text-xl"} />;
    default:
      return null;
  }
}
