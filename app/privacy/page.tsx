import { SubpageLayout } from "@/components/subpage-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - A Startup",
  description: "Privacy policy for A Startup",
}

export default function PrivacyPage() {
  return (
    <SubpageLayout title="Privacy Policy">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
          <p className="text-muted-foreground">
            A Startup ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
          <p className="text-muted-foreground">
            We may collect information about you in a variety of ways. The information we may collect on the website
            includes:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Personal Data: Contact information you provide when reaching out to us</li>
            <li>Derivative Data: Information automatically collected when you access our website</li>
            <li>Financial Data: Payment information if you purchase services from us</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Use of Your Information</h2>
          <p className="text-muted-foreground">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. We may use information collected about you to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Respond to your inquiries and provide customer support</li>
            <li>Process transactions and send related information</li>
            <li>Improve our website and services</li>
            <li>Send you marketing and promotional communications</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Disclosure of Your Information</h2>
          <p className="text-muted-foreground">
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>By Law or to Protect Rights: If required by law or to protect our rights</li>
            <li>Business Transfers: In connection with a merger or acquisition</li>
            <li>Third-Party Service Providers: With vendors who perform services on our behalf</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Security of Your Information</h2>
          <p className="text-muted-foreground">
            We use administrative, technical, and physical security measures to protect your personal information.
            However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 text-muted-foreground">
            Email: <a href="mailto:privacy@astartup.com">privacy@astartup.com</a>
          </p>
        </section>
      </div>
    </SubpageLayout>
  )
}
