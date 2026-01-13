import { SubpageLayout } from "@/components/subpage-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - A Startup",
  description: "Terms of service for A Startup",
}

export default function TermsPage() {
  return (
    <SubpageLayout title="Terms of Service">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Agreement to Terms</h2>
          <p className="text-muted-foreground">
            These Terms of Service constitute a legally binding agreement made between you and A Startup concerning your
            access to and use of the website. You agree that by accessing the website, you have read, understood, and
            agreed to be bound by all of these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Intellectual Property Rights</h2>
          <p className="text-muted-foreground">
            Unless otherwise indicated, the website is our proprietary property and all source code, databases,
            functionality, software, website designs, audio, video, text, photographs, and graphics on the website
            (collectively, the "Content") are owned or controlled by us or licensed to us.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">User Representations</h2>
          <p className="text-muted-foreground">By using the website, you represent and warrant that:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>All information you submit is true, accurate, current, and complete</li>
            <li>You have the legal capacity and agree to comply with these Terms of Service</li>
            <li>You will not access the website through automated or non-human means</li>
            <li>You will not use the website for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Prohibited Activities</h2>
          <p className="text-muted-foreground">
            You may not access or use the website for any purpose other than that for which we make the website
            available. Prohibited activities include, but are not limited to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Systematically retrieve data or content to create a collection or database</li>
            <li>Circumvent, disable, or interfere with security-related features</li>
            <li>Engage in unauthorized framing of or linking to the website</li>
            <li>Harass, annoy, intimidate, or threaten any of our employees or agents</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            In no event will we or our directors, employees, or agents be liable to you or any third party for any
            indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the
            website.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            In order to resolve a complaint regarding the website or to receive further information, please contact us
            at:
          </p>
          <p className="mt-2 text-muted-foreground">
            Email: <a href="mailto:legal@astartup.com">legal@astartup.com</a>
          </p>
        </section>
      </div>
    </SubpageLayout>
  )
}
