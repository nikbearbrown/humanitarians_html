"use client"

import Image from "next/image"
import { Linkedin } from "lucide-react"
import type { LeadershipMember } from "@/data/people"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function Portrait({ person, large = false }: { person: LeadershipMember; large?: boolean }) {
  const size = large ? "w-32 h-32" : "w-24 h-24"

  return person.imageUrl ? (
    <Image
      src={person.imageUrl}
      alt={`${person.name} headshot`}
      width={large ? 128 : 96}
      height={large ? 128 : 96}
      className={`${size} rounded-full object-cover`}
    />
  ) : (
    <div className={`${size} rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold`}>
      {initials(person.name)}
    </div>
  )
}

export default function LeadershipGrid({ people }: { people: LeadershipMember[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {people.map((person) => (
        <article key={person.name} className="rounded-lg border bg-background p-6">
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="w-full text-left group">
                <div className="mb-5"><Portrait person={person} /></div>
                <h3 className="text-xl font-bold mb-2 group-hover:underline group-hover:underline-offset-4">
                  {person.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{person.role}</p>
                <span className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors group-hover:bg-primary/90">
                  View profile
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <div className="flex flex-col sm:flex-row gap-6 pt-2">
                <div className="shrink-0 mx-auto sm:mx-0"><Portrait person={person} large /></div>
                <DialogHeader className="flex-1">
                  <DialogTitle className="text-2xl">{person.name}</DialogTitle>
                  <p className="font-medium text-foreground">{person.role}</p>
                  <DialogDescription className="text-base leading-relaxed pt-3">
                    {person.bio}
                  </DialogDescription>
                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 pt-3 text-sm font-medium underline underline-offset-4"
                    >
                      <Linkedin className="w-4 h-4" />
                      View LinkedIn profile
                    </a>
                  )}
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
        </article>
      ))}
    </div>
  )
}
