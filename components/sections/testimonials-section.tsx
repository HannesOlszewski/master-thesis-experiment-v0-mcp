import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechVentures",
    content:
      "A Startup transformed our outdated website into a modern, high-performing platform. Their attention to detail and commitment to our vision was outstanding.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, InnovateLab",
    content:
      "Working with this team was a game-changer for our business. They delivered a custom software solution that streamlined our operations and boosted productivity by 40%.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    content:
      "From concept to launch, the experience was seamless. They understood our needs, offered valuable insights, and delivered beyond our expectations.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CTO, DataFlow Systems",
    content:
      "The technical expertise and problem-solving skills of this team are exceptional. They built a scalable solution that continues to perform flawlessly as we grow.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex gap-1" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{testimonial.content}</p>
                <div className="mt-6">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
