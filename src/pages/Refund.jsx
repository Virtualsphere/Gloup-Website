import React from "react";
import { faqIcon } from "../assets/images";

export default function Refund() {
  return (
    <main>
      <header className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 order-md-1 order-2">
              <div className="page-header-box">
                <h1 className="text-anime">Cancellation and Refund</h1>
              </div>
            </div>
            <div className="col-md-4 order-md-2 order-1">
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="page-header-icon">
                  <img src={faqIcon} alt="Cancellation and Refund Icon" />
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
            <strong>JRSTYLEO BOOKING AND FASHION PRIVATE LIMITED</strong>{" "}
            believes in helping its customers as far as possible and has
            therefore adopted a liberal cancellation policy.
          </p>

          <ul>
            <li>
              Cancellations will be considered only if the request is made
              within 7 days of placing the order. However, the cancellation
              request may not be entertained if the orders have been
              communicated to the vendors/merchants and they have initiated the
              shipping process.
            </li>

            <li>
              Cancellations are not accepted for perishable items like flowers,
              eatables, etc. However, a refund or replacement may be issued if
              the customer proves that the quality of the delivered product is
              unsatisfactory.
            </li>

            <li>
              If you receive damaged or defective items, please report it to our
              Customer Service team within 7 days of receiving the product. The
              request will only be considered once the merchant has verified the
              issue at their end.
            </li>

            <li>
              If you feel the received product does not match what was shown on
              the site or does not meet your expectations, notify our Customer
              Service team within 7 days of receipt. After evaluating your
              complaint, we will make an appropriate decision.
            </li>

            <li>
              For products that come with a manufacturer warranty, please
              contact the manufacturer directly for support or replacement.
            </li>

            <li>
              In case of any refunds approved by{" "}
              <strong>JRSTYLEO BOOKING AND FASHION PRIVATE LIMITED</strong>, the
              refund process will be completed within 7 days.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
