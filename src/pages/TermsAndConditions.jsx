import React from "react";
import { faqIcon } from "../assets/images";

export default function TermsAndCondition() {
  return (
    <main>
      <header className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 order-md-1 order-2">
              <div className="page-header-box">
                <h1 className="text-anime">Terms and Conditions</h1>
              </div>
            </div>
            <div className="col-md-4 order-md-2 order-1">
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="page-header-icon">
                  <img src={faqIcon} alt="Terms and Conditions Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="container py-5">
        <header>
          <h2 className="mb-4">Last updated on Jun 2, 2025</h2>
        </header>

        <section>
          <p>
            For the purpose of these Terms and Conditions, the terms{" "}
            <strong>"we", "us", "our"</strong> refer to{" "}
            <strong>JRSTYLEO BOOKING AND FASHION PRIVATE LIMITED</strong>, whose
            registered/operational office is No.54 Chola avenue, SNM Green city,
            Thanjavur, TAMIL NADU 613007.{" "}
            <strong>"You", "your", "user", "visitor"</strong> shall mean any
            natural or legal person visiting our website and/or agreeing to
            purchase from us.
          </p>

          <p>
            Your use of the website and/or purchase from us is governed by the
            following Terms and Conditions:
          </p>

          <ul>
            <li>
              The content of the pages of this website is subject to change
              without notice.
            </li>
            <li>
              Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors, and
              we expressly exclude liability for any such inaccuracies or errors
              to the fullest extent permitted by law.
            </li>
            <li>
              Your use of any information or materials on our website and/or
              product pages is entirely at your own risk, for which we shall not
              be liable. It shall be your own responsibility to ensure that any
              products, services or information available through our website
              meet your specific requirements.
            </li>
            <li>
              Our website contains material which is owned by or licensed to us.
              This material includes, but is not limited to, the design, layout,
              look, appearance and graphics. Reproduction is prohibited other
              than in accordance with the copyright notice, which forms part of
              these terms and conditions.
            </li>
            <li>
              All trademarks reproduced on our website which are not the
              property of, or licensed to, the operator are acknowledged on the
              website.
            </li>
            <li>
              Unauthorized use of information provided by us shall give rise to
              a claim for damages and/or be a criminal offense.
            </li>
            <li>
              From time to time, our website may also include links to other
              websites. These links are provided for your convenience to provide
              further information.
            </li>
            <li>
              You may not create a link to our website from another website or
              document without JRSTYLEO BOOKING AND FASHION PRIVATE LIMITED’s
              prior written consent.
            </li>
            <li>
              Any dispute arising out of use of our website and/or purchases is
              subject to the laws of India.
            </li>
            <li>
              We shall be under no liability whatsoever in respect of any loss
              or damage arising directly or indirectly out of the decline of
              authorization for any transaction, on account of the cardholder
              having exceeded the preset limit mutually agreed by us with our
              acquiring bank from time to time.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
