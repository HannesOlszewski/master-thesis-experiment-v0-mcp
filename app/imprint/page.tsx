import { SubpageLayout } from "@/components/subpage-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Imprint - A Startup",
  description: "Legal information and imprint for A Startup",
}

export default function ImprintPage() {
  return (
    <SubpageLayout title="Imprint">
      <div className="space-y-6">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Company Information</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong>Company Name:</strong> A Startup LLC
            </p>
            <p>
              <strong>Address:</strong> 123 Innovation Street, Tech City, TC 12345
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:hello@astartup.com">hello@astartup.com</a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Registration Details</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong>Company Registration Number:</strong> 123456789
            </p>
            <p>
              <strong>VAT ID:</strong> US123456789
            </p>
            <p>
              <strong>Register Court:</strong> Tech City District Court
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Represented By</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong>Managing Director:</strong> John Doe
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Responsible for Content</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>According to § 55 Abs. 2 RStV:</p>
            <p>John Doe</p>
            <p>123 Innovation Street</p>
            <p>Tech City, TC 12345</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Dispute Resolution</h2>
          <p className="text-muted-foreground">
            The European Commission provides a platform for online dispute resolution (ODR):{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>
            . We are not willing or obliged to participate in dispute resolution proceedings before a consumer
            arbitration board.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Liability for Content</h2>
          <p className="text-muted-foreground">
            As a service provider, we are responsible for our own content on these pages in accordance with general
            laws. However, we are not obligated to monitor transmitted or stored third-party information or to
            investigate circumstances that indicate illegal activity.
          </p>
        </section>
      </div>
    </SubpageLayout>
  )
}
