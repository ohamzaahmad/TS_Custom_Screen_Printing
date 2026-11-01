import React from "react";
import { useSEO } from "../hooks/useSEO";

const sections = [
  {
    title: "Personal Identification Information",
    body: (
      <p>
        We may collect personal identification information from Users in a
        variety of ways, including, but not limited to, when Users visit our
        Site, place an order, respond to a survey, and in connection with other
        activities, services, features, or resources we make available on our
        Site. Users may be asked for, as appropriate, name, email address,
        mailing address, phone number, and payment information for the purpose
        of processing your order. We collect personal identification information
        from Users only if they voluntarily submit such information to us. Users
        can always refuse to supply personal identification information, except
        that it may prevent them from engaging in certain Site-related
        activities, such as placing an order.
      </p>
    ),
  },
  {
    title: "Non-Personal Identification Information",
    body: (
      <p>
        We may collect non-personal identification information about Users
        whenever they interact with our Site. Non-personal identification
        information may include the browser name, the type of computer, and
        technical information about Users' means of connection to our Site, such
        as the operating system, the Internet service providers utilized, and
        other similar information.
      </p>
    ),
  },
  {
    title: "Web Browser Cookies",
    body: (
      <p>
        Our Site may use "cookies" to enhance User experience. A User's web
        browser places cookies on their hard drive for record-keeping purposes
        and sometimes to track information about them. Users may choose to set
        their web browser to refuse cookies or to alert you when cookies are
        being sent. If they do so, note that some parts of the Site may not
        function properly.
      </p>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <>
        <p className="mb-4">
          ST Custom Screen Printing collects and uses Users' personal
          information for the following purposes:
        </p>
        <ul className="list-disc space-y-3 pl-5 marker:text-orange-500">
          <li>
            <strong className="text-slate-900">To improve customer service</strong>{" "}
            — Your information helps us more effectively respond to your
            customer service requests and support needs.
          </li>
          <li>
            <strong className="text-slate-900">To personalize User experience</strong>{" "}
            — We may use information in the aggregate to understand how our
            Users as a group use the services and resources provided on our
            Site.
          </li>
          <li>
            <strong className="text-slate-900">To improve our Site</strong> — We
            continually strive to improve our website offerings based on the
            information and feedback we receive from you.
          </li>
          <li>
            <strong className="text-slate-900">To process transactions</strong>{" "}
            — We may use the information Users provide about themselves when
            placing an order only to provide service to that order. We do not
            share this information with outside parties except to the extent
            necessary to provide the service.
          </li>
          <li>
            <strong className="text-slate-900">
              To administer content, promotions, surveys, or other Site features
            </strong>{" "}
            — To send Users information about topics we think will be of
            interest to them, such as monthly mailers, or additional follow-up
            for future business.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Periodic Emails",
    body: (
      <p>
        The email address Users provide for order processing will be used to
        send them information and updates pertaining to their order. It will
        also be used to respond to their inquiries and/or other requests or
        questions. Every User who decides to opt in to our mailing list will
        receive periodic emails that may include company news, updates, related
        product or service information, and more. If at any time the User would
        like to unsubscribe from receiving future emails, we include detailed
        unsubscribe instructions at the bottom of each email, or the User may
        contact us via our Site.
      </p>
    ),
  },
  {
    title: "Monthly Mailers, Follow-Ups & Reminder Emails",
    body: (
      <p>
        By providing your email address or opting in to our communications, you
        consent to receive periodic emails from ST Custom Screen Printing. These
        communications may include monthly mailers featuring company news, new
        products, promotions, and services we believe may be of interest to you,
        as well as additional follow-up for future business related to your
        inquiries or orders. We may also send reminder emails about open quotes,
        pending orders, artwork approvals, or incomplete requests so that your
        project stays on schedule. Every email includes an unsubscribe option,
        and you may opt out of these communications at any time.
      </p>
    ),
  },
  {
    title: "How We Protect Your Information",
    body: (
      <p>
        We adopt appropriate data collection, storage, and processing practices
        and security measures to protect against unauthorized access,
        alteration, disclosure, or destruction of your personal information,
        username, password, transaction information, and data stored on our
        Site. Sensitive and private data exchange between the Site and its Users
        happens over an SSL-secured communication channel and is encrypted and
        protected with digital signatures.
      </p>
    ),
  },
  {
    title: "Sharing Your Personal Information",
    body: (
      <p>
        We do not sell, trade, or rent Users' personal identification
        information to others. We may share generic aggregated demographic
        information not linked to any personal identification information
        regarding visitors and Users with our business partners, trusted
        affiliates, and advertisers for the purposes outlined above. We may use
        third-party service providers to help us operate our business and the
        Site or administer activities on our behalf, such as sending out
        newsletters or surveys. We may share your information with these third
        parties for those limited purposes provided that you have given us your
        permission when you sign up or order with us.
      </p>
    ),
  },
  {
    title: "Consent to Phone Messages",
    body: (
      <p>
        By providing your phone number, you consent to receive text messages
        from ST Custom Screen Printing regarding your inquiry, updates, and
        other relevant information. Message frequency may vary. Message and data
        rates may apply. For assistance, reply HELP or contact
        info@stcsprinting.com. To stop receiving messages, reply STOP. No
        further messages will be sent.
      </p>
    ),
  },
  {
    title: "Changes to This Privacy Policy",
    body: (
      <p>
        ST Custom Screen Printing has the discretion to update this privacy
        policy at any time. When we do, we will revise the updated date at the
        top of this page. We encourage Users to frequently check this page for
        any changes to stay informed about how we are helping to protect the
        personal information we collect. You acknowledge and agree that it is
        your responsibility to review this privacy policy periodically and
        become aware of modifications.
      </p>
    ),
  },
  {
    title: "Your Acceptance of These Terms",
    body: (
      <p>
        By using this Site, you signify your acceptance of this policy and terms
        of service. If you do not agree to this policy, please do not use our
        Site. If you have any questions about this Privacy Policy, the practices
        of this site, or your dealings with this site, please contact us at
        info@stcsprinting.com or (732) 347-0101.
      </p>
    ),
  },
];

const PrivacyPolicy: React.FC<{ onNavigate?: (page: string) => void }> = () => {
  useSEO({
    title: "Privacy Policy",
    description:
      "ST Custom Screen Printing privacy policy. Learn how we collect, use, and protect your personal information when you visit our website or place an order.",
    canonical: "/privacy",
    ogTitle: "Privacy Policy",
    ogDescription:
      "Learn how ST Custom Screen Printing collects, uses, and protects your personal information.",
  });

  return (
    <div className="min-h-screen bg-white animate-in pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <header className="mb-14 border-b border-slate-200 pb-10">
          <span className="mb-4 block text-[11px] font-black uppercase tracking-[0.4em] text-orange-500">
            Legal
          </span>
          <h1 className="mb-6 text-4xl font-black uppercase leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-lg font-medium leading-relaxed text-slate-600">
            Your privacy is important to us. Please review how we collect, use,
            and protect your personal information.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="space-y-12">
          <p className="text-lg leading-8 text-slate-700">
            This Privacy Policy governs the manner in which ST Custom Screen
            Printing collects, uses, maintains, and discloses information
            collected from users (each, a "User") of the ST Custom Screen
            Printing website ("Site"). This privacy policy applies to the Site
            and all products and services offered by ST Custom Screen Printing.
          </p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                {section.title}
              </h2>
              <div className="text-lg leading-8 text-slate-700">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
