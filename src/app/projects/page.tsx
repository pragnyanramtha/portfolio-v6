"use client";

import { DATA, IProjectData } from "@/app/data";
import { Contact, Footer, Navbar } from "@/components/sections";
import GridPattern from "@/components/ui/grid-pattern";
import TargetCursor from "@/components/ui/target-cursor";
import useMobileDetection from "@/hooks/use-mobile";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function ProjectCard({ name, project, index }: { name: string; project: IProjectData; index: number }) {
  const isEven = index % 2 === 0;

  const content = (
    <>
      <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative rounded-lg overflow-hidden">
          {project.IMAGE && (
            <Image
              src={project.IMAGE}
              alt={name}
              width={600}
              height={400}
              className="w-full h-80 object-cover"
            />
          )}
        </div>
      </div>
      <div
        className={`space-y-6 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300 pl-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <div>
          <h2 className="mb-1 font-medium text-2xl">{name}</h2>

          <p className="flex items-center gap-1 text-sm">
            {project.LIVE_PREVIEW && (
              <a
                className="flex items-center gap-1"
                href={project.LIVE_PREVIEW}
                target="_blank"
                rel="noopener noreferrer"
              >
                live preview <ArrowUpRight size={18} />
              </a>
            )}
            {project.GITHUB && (
              <a
                className="flex items-center gap-1"
                href={project.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                github <ArrowUpRight size={18} />
              </a>
            )}
          </p>
        </div>
        <ul className="space-y-1 mt-1 pl-3 text-muted-foreground text-sm text-justify list-disc">
          {project.DESCRIPTION.map((desc, i) => (
            <li key={i}>
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center gap-2 mt-2 pl-3">
          {project.TECH_STACK.map((tech, i) => (
            <li key={i} className="bg-muted px-2 py-1 rounded text-xs">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const className = "items-start gap-12 grid lg:grid-cols-2 cursor-target block";

  if (project.LINK) {
    return (
      <a href={project.LINK} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <div className="items-start gap-12 grid lg:grid-cols-2 cursor-target">
      {content}
    </div>
  );
}

export default function Page() {
  const projectsData: Record<string, IProjectData> = DATA.PROJECTS;
  const otherProjectsData: Record<string, IProjectData> = DATA.OTHER_PROJECTS || {};
  const checkMobile = useMobileDetection();

  return (
    <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 text-foreground">
      <Navbar />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <section className="py-16">
        <h1 className="font-medium text-primary/90 text-base">my projects.</h1>
        <div className="max-w-4xl text-muted-foreground text-sm text-justify leading-relaxed">
          <p className="mt-2 mb-4">
            Passionate about building high-performance and scalable
            AI models. I thrive on solving complex problems, optimizing
            performance, and creating intuitive user experiences. My expertise
            lies in AI, Machine Learning, and Deep Learning, with a strong
            focus on delivering quality solutions.
          </p>
        </div>
      </section>

      <div className="space-y-12 mb-12">
        {Object.entries(projectsData).map(([key, value], index) => (
          <React.Fragment key={key}>
            <ProjectCard name={key} project={value} index={index} />
            {index < Object.entries(projectsData).length - 1 && (
              <div className="border-muted-foreground/20 border-t" />
            )}
          </React.Fragment>
        ))}
      </div>

      {Object.keys(otherProjectsData).length > 0 && (
        <section className="mb-12">
          <h2 className="font-medium text-primary/90 text-base mb-8">other projects.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(otherProjectsData).map(([key, value]) => (
              <div
                key={key}
                className="cursor-target border-muted-foreground hover:border-primary border rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{key}</h3>
                    <p className="flex items-center gap-1 text-xs">
                      {value.LIVE_PREVIEW && (
                        <a
                          className="flex items-center gap-1"
                          href={value.LIVE_PREVIEW}
                        >
                          live preview <ArrowUpRight size={14} />
                        </a>
                      )}
                      {value.GITHUB && (
                        <a
                          className="flex items-center gap-1"
                          href={value.GITHUB}
                        >
                          github <ArrowUpRight size={14} />
                        </a>
                      )}
                    </p>
                  </div>
                  <ul className="space-y-1 text-muted-foreground text-xs text-justify list-disc pl-4">
                    {value.DESCRIPTION.slice(0, 2).map((desc, index) => (
                      <li key={index}>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-wrap items-center gap-2 pt-2">
                    {value.TECH_STACK.slice(0, 4).map((tech, index) => (
                      <li
                        key={index}
                        className="bg-muted px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Contact data={DATA.HEADER} />

      <Footer />

      {!checkMobile && <TargetCursor spinDuration={2} hideDefaultCursor />}
    </div>
  );
}
