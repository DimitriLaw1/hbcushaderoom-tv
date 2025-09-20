import React from "react";

export default function Advertise() {
  return (
    // full-width white section
    <section className="adv-section">
      {/* centered content container */}
      <div className="container adv-inner">
        <h1 className="adv-title">
          Reach your audience on <span>HBCU ShadeRoom TV</span>, America’s #1
          college culture network.
        </h1>

        <ul className="adv-stats" aria-label="Audience reach stats">
          <li className="adv-stat">
            <div className="adv-number">95%</div>
            <p className="adv-caption">
              of Students on each campus has heard or interacted with of our
              brand
            </p>
          </li>
          <li className="adv-stat">
            <div className="adv-number">101</div>
            <p className="adv-caption">
              Number of Schools who tune into our content
            </p>
          </li>
          <li className="adv-stat">
            <div className="adv-number">13M</div>
            <p className="adv-caption">
              Total people reached monthly across all our social channels
            </p>
          </li>
        </ul>

        <div className="adv-cta">
          <a className="btn btn-outline" href="mailto:ads@hbcushaderoom.com">
            Advertise now
          </a>
        </div>
      </div>
    </section>
  );
}
