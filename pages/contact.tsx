import React, { useState } from "react";
import * as Yup from "yup";
import Heading from "../components/Heading";
import Section from "../components/Section";
import Page from "../components/Page";
import Button from "../components/Button";
import FormControl from "../components/FormControl";
import AppForm from "../components/AppForm";
import { sendContact } from "../services/contact";
import { showToast } from "../helpers/utils";

const ContactSchema = Yup.object().shape({
  contactName: Yup.string().required("This field is required"),
  contactEmail: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required"),
  contactMessage: Yup.string().required("This field is required"),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;

  const sendMessage = async ({
    contactName,
    contactEmail,
    contactMessage,
  }: any) => {
    try {
      setLoading(true);

      const data = await sendContact(contactName, contactEmail, contactMessage);
      showToast(data, "success");
    } catch (error: any) {
      console.log(error);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Contact Us">
      <Section>
        <div style={{ maxWidth: 700, margin: "auto" }}>
          <div className="text-center">
            <Heading
              title="How can we help you?"
              subTitle="Contact us"
              paragraph={`Feel like getting in touch? Contact ${businessName} customer support below.`}
            />
          </div>

          <AppForm
            schema={ContactSchema}
            onSubmit={sendMessage}
            loading={loading}
            id="contact-form"
          >
            <div className="row">
              <div className="col-6">
                <FormControl
                  type="text"
                  name="contactName"
                  placeholder="Your name"
                />
              </div>
              <div className="col-6">
                <FormControl
                  type="email"
                  name="contactEmail"
                  placeholder="Your email"
                />
              </div>
              <div className="col-12">
                <FormControl
                  type="textarea"
                  name="contactMessage"
                  placeholder="Your message"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <Button type="submit">Send a Message</Button>
            </div>
          </AppForm>
        </div>
      </Section>
    </Page>
  );
};

export default ContactPage;
