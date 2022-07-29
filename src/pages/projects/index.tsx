import PageWrapper from "@/components/PageWrapper";
import type { NextPage } from "next";
import { Button, Card } from "react-bootstrap";
import { trpc } from "@/utils/trpc";
import ProjectForm from "@/components/ProjectForm";
import { useState } from "react";
import Project from "@/domains/project";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Projects: NextPage = () => {
  const customerId = useRouter().query.customerId as string;
  const { data: projects, refetch } = trpc.useQuery(
    [
      "project.get-all",
      {
        customerId,
      },
    ],
    {
      refetchOnWindowFocus: false,
    }
  );

  const postProject = trpc.useMutation(["project.post"], {
    onSuccess: () => {
      changeShowForm(false);
      refetch();
    },
  });

  const [showForm, changeShowForm] = useState(false);

  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const onFormSubmit = async (project: Project) => {
    await new Promise<void>((resolve, reject) => {
      postProject.mutate(project, {
        onSuccess: () => {
          resolve();
        },
        onError: reject,
      });
    });
  };

  return (
    <PageWrapper>
      <h1>Projects</h1>

      <Button
        variant={showForm ? "outline-danger" : "outline-primary"}
        onClick={() => changeShowForm(!showForm)}
        className="mb-1"
      >
        {showForm ? "Close Form" : "Add New"}
      </Button>
      <div ref={animationParent}>
        {showForm && (
          <div className="row">
            <div className="col-6">
              <Card className="p-3">
                <ProjectForm onSubmit={onFormSubmit} customerId={customerId} />
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="pb-3"></div>

      {projects && (
        <div ref={animationParent} className="m-n2">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="float-start m-2 px-3 py-2"
              style={{ width: "18rem" }}
            >
              {project.name}
            </Card>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default Projects;
