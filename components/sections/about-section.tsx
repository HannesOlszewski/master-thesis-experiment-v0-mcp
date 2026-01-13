import Image from "next/image"
import { CheckCircle } from "lucide-react"

const highlights = [
  "10+ years of combined experience",
  "100+ successful projects delivered",
  "Expertise in modern web technologies",
  "Agile development methodology",
  "Client-focused approach",
]

export function AboutSection() {
  return (
    <section id="about" className="bg-muted/30 py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
            <Image src="/images/about.jpg" alt="Our team at work" fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">About A Startup</h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                We're a passionate team of developers and designers dedicated to creating exceptional digital
                experiences
              </p>
            </div>
            <p className="text-muted-foreground">
              Founded with a vision to transform how businesses engage with technology, we combine technical expertise
              with creative innovation to deliver solutions that exceed expectations. Our team is committed to
              understanding your goals and bringing them to life through thoughtful design and robust development.
            </p>
            <ul className="space-y-3">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
