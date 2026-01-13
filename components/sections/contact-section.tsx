import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@astartup.com",
    href: "mailto:hello@astartup.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Innovation Street, Tech City, TC 12345",
    href: "https://maps.google.com",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-muted/30 py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Ready to start your project? We'd love to hear from you
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {contactMethods.map((method) => (
            <Card key={method.label} className="border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <method.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold">{method.label}</h3>
                <a
                  href={method.href}
                  className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  target={method.label === "Address" ? "_blank" : undefined}
                  rel={method.label === "Address" ? "noopener noreferrer" : undefined}
                >
                  {method.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
