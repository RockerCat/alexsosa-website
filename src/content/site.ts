// Verified public contact channels and assets. Do not add channels that don't exist.
export const site = {
  url: "https://www.alexsosa.me",
  name: "Alex Sosa",
  email: "alexsosa.me@gmail.com",
  linkedin: "https://www.linkedin.com/in/alexsosa",
  github: "https://github.com/RockerCat",
  logo: {
    src: "/brand/alex-sosa-logo.png",
    width: 703,
    height: 703,
  },
  cv: {
    en: "/cv/alex-sosa-cv-en.pdf",
    es: "/cv/alex-sosa-cv-es.pdf",
  },
} as const

export const routes = ["/", "/services", "/work", "/about", "/contact"] as const
export type Route = (typeof routes)[number]
