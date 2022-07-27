import PageWrapper from "@/components/PageWrapper";
import type { NextPage } from "next";
import { Button, Card } from "react-bootstrap";
import { trpc } from "@/utils/trpc";
import CustomerForm from "@/components/CustomerForm";
import { useState } from "react";
import { Customer } from "@/server/router/customer";

const Home: NextPage = () => {
  const { data: customers, refetch } = trpc.useQuery(["customer.get-all"], {
    refetchOnWindowFocus: false,
  });

  const postCustomer = trpc.useMutation(["customer.post"], {
    onSuccess: () => {
      refetch();
      changeShowForm(false);
    },
  });

  const [showForm, changeShowForm] = useState(false);

  const onFormSubmit = async (customer: Customer) => {
    await new Promise<void>((resolve) => {
      postCustomer.mutate(customer, {
        onSettled: () => {
          resolve();
        },
      });
    });
  };

  return (
    <PageWrapper>
      <h1>Customers</h1>

      <Button
        variant={showForm ? "outline-danger" : "outline-primary"}
        onClick={() => changeShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add New"}
      </Button>
      {showForm && (
        <div className="row">
          <div className="col-6">
            <Card className="p-3">
              <CustomerForm onSubmit={onFormSubmit} />
            </Card>
          </div>
        </div>
      )}

      <div className="pb-3"></div>

      {customers && (
        <div className="m-n2">
          {customers.map((customer, i) => (
            <Card
              key={i}
              className="float-start m-2 px-3 py-2"
              style={{ width: "18rem" }}
            >
              {customer.name}
            </Card>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default Home;
