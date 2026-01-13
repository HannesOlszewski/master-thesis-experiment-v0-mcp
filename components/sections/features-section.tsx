import { Code, Palette, Zap, Shield, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored web and software solutions built with cutting-edge technologies to meet your unique needs.",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Beautiful, intuitive interfaces that engage users and reflect your brand identity perfectly.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized applications that load instantly and provide seamless user experiences across all devices.",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Enterprise-grade security measures to protect your data and ensure compliance with industry standards.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Ongoing maintenance and support to keep your digital products running smoothly and up-to-date.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Future-proof architecture designed to grow with your business and adapt to changing demands.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Our Features</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Discover what makes us the perfect partner for your digital transformation journey
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
