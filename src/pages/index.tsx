import PageWrapper from "@/components/PageWrapper";
import type { NextPage } from "next";
import { Button, Card } from "react-bootstrap";
import { trpc } from "@/utils/trpc";
import CustomerForm from "@/components/CustomerForm";
import { useState } from "react";
import Customer from "@/domains/customer";
import Link from "next/link";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home: NextPage = () => {
  const { data: customers, refetch } = trpc.useQuery(["customer.get-all"], {
    refetchOnWindowFocus: false,
  });

  const postCustomer = trpc.useMutation(["customer.post"], {
    onSuccess: () => {
      changeShowForm(false);
      refetch();
    },
  });

  const [showForm, changeShowForm] = useState(false);

  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const onFormSubmit = async (customer: Customer) => {
    await new Promise<void>((resolve, reject) => {
      postCustomer.mutate(customer, {
        onSuccess: () => {
          resolve();
        },
        onError: reject,
      });
    });
  };

  return (
    <PageWrapper>
      <h1>Customers</h1>

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
                <CustomerForm onSubmit={onFormSubmit} />
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="pb-3"></div>

      {customers && (
        <div ref={animationParent} className="m-n2">
          {customers.map((customer, i) => (
            <Link
              key={i}
              href={{
                pathname: "/projects",
                query: "customerId=" + customer.id,
              }}
              passHref
            >
              <a>
                <Card
                  key={i}
                  className="float-start m-2 px-3 py-2"
                  style={{ width: "18rem" }}
                >
                  {customer.name}
                </Card>
              </a>
            </Link>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};;

export default Home;
