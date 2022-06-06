export const sendContact = async (
  contactName: string,
  contactEmail: string,
  contactMessage: string
) => {
  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactName,
        contactEmail,
        contactMessage,
      }),
    });

    return "Your email was sent successfully";
  } catch (error) {
    throw error;
  }
};
