import { SubpageLayout } from "@/components/subpage-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy - A Startup",
  description: "Cookie policy for A Startup",
}

export default function CookiePolicyPage() {
  return (
    <SubpageLayout title="Cookie Policy">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">What Are Cookies</h2>
          <p className="text-muted-foreground">
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in
            your web browser and allows the website or a third-party to recognize you and make your next visit easier
            and the service more useful to you.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">How We Use Cookies</h2>
          <p className="text-muted-foreground">
            Currently, our website uses localStorage to store your cookie consent preferences only. We do not use
            tracking cookies or any third-party cookies at this time.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Types of Data Stored</h2>
          <p className="text-muted-foreground">We currently store the following information locally:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Cookie Consent Preference:</strong> Remembers whether you've accepted or declined our cookie
              notice
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Cookies</h2>
          <p className="text-muted-foreground">
            We do not currently use any third-party cookies on our website. If this changes in the future, we will
            update this policy accordingly and notify users.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Managing Cookies</h2>
          <p className="text-muted-foreground">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed. However, if you do this, you may
            have to manually adjust some preferences every time you visit our site.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about our Cookie Policy, please contact us at:
          </p>
          <p className="mt-2 text-muted-foreground">
            Email: <a href="mailto:privacy@astartup.com">privacy@astartup.com</a>
          </p>
        </section>
      </div>
    </SubpageLayout>
  )
}
