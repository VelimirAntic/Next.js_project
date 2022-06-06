import React, { useRef, useEffect } from "react";
import { showToast } from "../helpers/utils";
import Button from "./Button";
import Heading from "./Heading";

interface PaypalProps {
  setShowPaypal: any;
  description: string;
  amount: number;
  generate: any;
}

export default function Paypal({
  setShowPaypal,
  description,
  amount,
  generate,
}: PaypalProps) {
  const paypal: any = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any, err: any) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description,
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          await generate();
        },
        onError: (err: any) => {
          showToast("Payment was not completed successfully", "error");
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div className="settings-panel">
      <div className="container-fluid">
        <div className="text-center">
          <Heading
            title="Purchase"
            subTitle="Pay safely"
            paragraph={`Pay ${amount}USD`}
            className="mt-4"
          />

          <div ref={paypal}></div>

          <div className="mt-4">
            <Button onClick={() => setShowPaypal(false)} theme="white">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
