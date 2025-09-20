import React, { useState } from "react";

export default function Advertise() {
  // Your Formspree endpoint
  const FORMSPREE_URL = "https://formspree.io/f/xrbanaow";

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Honeypot (bots fill this)
    if (formData.get("_gotcha")) {
      setStatus("success");
      setMessage("Thanks! We got your submission.");
      formEl.reset();
      return;
    }

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        // Let the browser set Content-Type for FormData; keep Accept for JSON
        headers: { Accept: "application/json" },
        body: formData,
        // mode: "cors", // (optional) default is fine
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks! We got your submission and will reach out soon.");
        formEl.reset();
      } else {
        // Try to read any JSON errors from Formspree
        let data = {};
        try {
          data = await res.json();
        } catch {}
        setStatus("error");
        setMessage(
          data?.errors?.[0]?.message ||
            `Submit failed (${res.status}). Please try again or email ads@hbcushaderoom.com.`
        );
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

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
              of students on each campus have heard of or interacted with our
              brand
            </p>
          </li>
          <li className="adv-stat">
            <div className="adv-number">101</div>
            <p className="adv-caption">Schools that tune into our content</p>
          </li>
          <li className="adv-stat">
            <div className="adv-number">13M</div>
            <p className="adv-caption">
              People reached monthly across all socials
            </p>
          </li>
        </ul>

        {/* Interest form (Formspree) */}
        <form className="adv-form" onSubmit={handleSubmit}>
          {/* Hidden meta + honeypot */}
          <input
            type="hidden"
            name="_subject"
            value="HBCU ShadeRoom TV — Interest Form"
          />
          <input
            type="hidden"
            name="page"
            value={typeof window !== "undefined" ? window.location.href : ""}
          />
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="adv-form-grid">
            <div className="field">
              <label htmlFor="name">
                Name{" "}
                <span aria-hidden="true" className="req">
                  *
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">
                Email{" "}
                <span aria-hidden="true" className="req">
                  *
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className="field">
              <label htmlFor="interest">
                I’m interested in{" "}
                <span aria-hidden="true" className="req">
                  *
                </span>
              </label>
              <select id="interest" name="interest" required defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Content">Content — feature my content</option>
                <option value="Brand Advertisement">
                  Brand Advertisement — promote my brand
                </option>
              </select>
            </div>

            {/* Budget dropdown (optional) */}
            <div className="field">
              <label htmlFor="budget">Estimated budget (optional)</label>
              <select id="budget" name="budget" defaultValue="">
                <option value="" disabled>
                  Select a budget
                </option>
                <option value="$50">$50</option>
                <option value="$51-100">$51 - $100</option>
                <option value="$101-150">$101 - $150</option>
                <option value="$151-200">$151 - $200</option>
                <option value="$201+">$201+</option>
              </select>
            </div>

            <div className="field field--full">
              <label htmlFor="details">
                Details about your content or brand{" "}
                <span aria-hidden="true" className="req">
                  *
                </span>
              </label>
              <textarea
                id="details"
                name="details"
                required
                placeholder="Tell us about the content or brand, goals, timeline, placements you’re considering, etc."
                rows={6}
              />
            </div>
          </div>

          <div className="adv-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Submitting…" : "Send interest"}
            </button>

            {status !== "idle" && (
              <p
                className={`adv-msg ${
                  status === "success" ? "ok" : status === "error" ? "err" : ""
                }`}
                role="status"
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
