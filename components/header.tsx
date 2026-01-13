"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { UserButton } from "@/components/auth/user-button"

const sections = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
]

export function Header() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="A Startup Logo" width={120} height={40} className="h-10 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === id ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <UserButton user={session.user} />
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button onClick={() => scrollToSection("contact")} className="hidden md:flex">
                Get Started
              </Button>
            </>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-left text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === id ? "text-primary" : "text-muted-foreground"
                }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </button>
            ))}
            {session?.user ? (
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button onClick={() => scrollToSection("contact")} className="w-full">
                  Get Started
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
