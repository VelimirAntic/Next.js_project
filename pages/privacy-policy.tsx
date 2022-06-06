import React from "react";
import Section from "../components/Section";
import Page from "../components/Page";

const PrivaryPage = () => {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;

  return (
    <Page title="Privary Policy">
      <Section className="terms-privacy">
        <h1>Privacy Policy</h1>

        <h2 className="subtitle">Introduction</h2>
        <div className="block">
          <p>
            Protecting your private information is our priority.This Statement
            of Privacy applies to the Site and {businessName} and governs data
            collection and usage.For the purposes of this Privacy Policy, unless
            otherwise noted, all references to {businessName} include the Site
            and {businessName}.The {businessName} website is a generate NFT
            Collections.By using the {businessName} website, you consent to the
            data practices described in this statement.
          </p>
        </div>
        <h2 className="subtitle">Collection of your Personal Information</h2>
        <div className="block">
          <p>
            If you purchase {businessName}&apos;s products and services, we
            collect billing and credit card information. This information is
            used to complete the purchase transaction. {businessName} encourages
            you to review the privacy statements of websites you choose to link
            to from {businessName} so that you can understand how those websites
            collect, use and share your information. {businessName} is not
            responsible for the privacy statements or other content on websites
            outside of the {businessName} website.
          </p>
        </div>
        <h2 className="subtitle">Use of your Personal Information</h2>
        <div className="block">
          <p>
            {businessName} collects and uses your personal information to
            operate its website(s) and deliver the services you have requested.
            {businessName} may also use your personally identifiable information
            to inform you of other products or services available from{" "}
            {businessName}.{businessName} may also contact you via surveys to
            conduct research about your opinion of current services or of
            potential new services that may be offered.
            {businessName} does not sell, rent or lease its customer lists to
            third parties.{businessName} may share data with trusted parties to
            help perform statistical analysis, send you email or postal mail,
            provide customer support, or arrange for deliveries.All such third
            parties are prohibited from using your personal information except
            to provide these services to {businessName}, and they are required
            to maintain the confidentiality of your information.{businessName}{" "}
            will disclose your personal information, without notice, only if
            required to do so by law or in the good faith belief that such
            action is necessary to: (a) conform to the edicts of the law or
            comply with legal process served on {businessName}; (b) protect and
            defend the rights or property of {businessName}; and, (c) act under
            exigent circumstances to protect the personal safety of users of{" "}
            {businessName}, or the public.
          </p>
        </div>
        <h2 className="subtitle">Automatically Collected Information</h2>
        <div className="block">
          <p>
            Information about your computer hardware and software may be
            automatically collected by {businessName}.This information can
            include: your IP address, browser type , domain names, access times
            and referring website addresses.This information is used for the
            operation of the service, to maintain quality of the service, and to
            provide general statistics regarding use of the {businessName}
            website.
          </p>
        </div>
        <h2 className="subtitle">What are Cookies?</h2>
        <div className="block">
          <p>
            A cookie is a small text file that is placed on your hard disk by a
            web page server to uniquely identify your browser or to store
            information in your browser.Cookies cannot be used to run programs
            or deliver viruses to your computer.A “web beacon” links web pages
            to servers and may be used to transmit information collected through
            cookies back to a web server.Most cookies expire after a certain
            period of time depending on what they are used for.
          </p>
        </div>
        <h2 className="subtitle">Types of Cookies we use</h2>
        <h3>Essential Cookies</h3>
        <div className="block">
          <p>
            Certain cookies are necessary in order for {businessName}&apos;s
            website to operate properly. For example, we use cookies to
            authenticate you. When you log on to our platform, authentication
            cookies are set which let us know who you are during a browsing
            session. These cookies also facilitate the social media login
            functionality (e.g., via Facebook, Google, or GitHub) on our
            website. Essential cookies do not include advertising cookies, which
            are discussed further below.
          </p>
        </div>
        <h3>Analytics Cookies</h3>
        <div className="block">
          <p>
            Through our service providers, we may use analytics to collect
            information about your use of the {businessName}
            website to create reports and statistics on the performance of the
            website.Analytics collect information such as your IP address, type
            of device, operating system, geolocation, referring URLs, time and
            date of page visits, and which pages you visit.The information
            allows us to quantify our audience size, see the overall patterns of
            usage on the platform, help us record any difficulties you have with
            the website, and show us whether our advertising is effective or
            not.
          </p>
        </div>
        <h2 className="subtitle">Managing your Cookies</h2>
        <div className="block">
          <p>
            You have the ability to accept or decline cookies.Most desktop web
            browsers automatically accept cookies, but you can usually modify
            your browser settings to decline cookies if you prefer.You&apos;ll
            want to refer to your browser&apos;s help section to do this since
            the instructions are usually browser-specific.Mobile devices
            typically allow you to control cookies through their system
            settings.Refer to your device manufacturer’s instructions for more
            information on how to do this.If you choose to decline cookies, you
            may not be able to fully experience the interactive features of the{" "}
            {businessName} services.
          </p>
        </div>
        <h2 className="subtitle">Security of your Personal Information</h2>
        <div className="block">
          <p>
            {businessName} secures your personal information from unauthorized
            access, use, or disclosure.
            {businessName} uses the SSL Protocol for this purpose: When personal
            information (such as a credit card number) is transmitted to other
            websites, it is protected through the use of encryption - the Secure
            Sockets Layer (SSL) protocol.
          </p>
        </div>
        <h2 className="subtitle">Children under Thirteen</h2>
        <div className="block">
          <p>
            {businessName} does not knowingly collect personally identifiable
            information from children under the age of thirteen.
          </p>
        </div>
        <h2 className="subtitle">Changes to this Statement</h2>
        <div className="block">
          <p>
            {businessName} will occasionally update this Statement of Privacy to
            reflect company and customer feedback.
            {businessName}
            encourages you to periodically review this Statement to be informed
            of how {businessName} is protecting your information.
          </p>
        </div>
        <h2 className="subtitle">Contact Information</h2>
        <div className="block">
          <p>
            {businessName} welcomes your questions or comments regarding this
            Statement of Privacy.If you believe that {businessName} has not
            adhered to this Statement, please contact {businessName}’s team by
            sending a message through the website.
          </p>
        </div>
      </Section>
    </Page>
  );
};

export default PrivaryPage;
