---
title: "Quantum Sphere: The Extinction Paradox That Defies Everyday Physics"
seoTitle: "Quantum Sphere: The Extinction Paradox Explained"
description: "Tanmay Kulkarni builds a Python simulation showing a quantum ball blocks four times its shadow at low energy and twice at high energy, never matching classical physics."
summary: "A solid ball should block its own shadow, but a quantum simulation shows it blocks four times that at low energy and twice at high energy, never once matching the classical answer."
keywords: ["quantum scattering cross section simulation", "extinction paradox optical theorem", "partial wave analysis python", "quantum sphere simulation python", "why quantum physics differs from classical", "optical theorem explained simply", "quantum mechanics scattering python code", "hard ball vs soft target scattering", "tanmay kulkarni quantum physics", "classical shadow vs quantum shadow"]
generated: "article"
---

Here is a question that sounds like it should have a boring answer. Fire a beam of particles at a solid ball. Nothing gets through it. How much of the beam does the ball actually block? In classical physics, the everyday kind, the answer is a one-liner: it blocks exactly its own shadow, at every energy, forever. In quantum mechanics, that answer turns out to be wrong, not slightly off in some edge case, but wrong at every energy level there is, and wrong in two different ways that do not even agree with each other.

## Breaking the incoming wave into pieces

The tool for measuring this is a scattering cross-section, a physicist's way of describing how big a target looks to an incoming beam versus how big it actually is. The incoming particle behaves as a wave, and the useful move is to break that wave into pieces, called partial waves, one for each way it can approach the ball: dead center, slightly off center, further off still. The ball knocks each partial wave out of step, and adding up that disruption gives the answer. Nothing here is approximated: because nothing can get through the solid ball, the wave must drop to exactly zero at its surface, and that single requirement pins down every piece of the calculation exactly. The entire setup reduces to one dial, the ball's size divided by the wavelength of the incoming particle, and the number of partial waves that actually matter turns out to be roughly whatever that dial reads.

## Calibrating against an independent build

Before trusting any of the readings, the instrument had to be checked against something built independently. That calibration came from asking Claude to build an interactive browser simulation of the same physics, using nothing but a single prompt. With the dial set to 13.6, the Claude-built simulation read 2.328, and a separately written version of the same code, sharing no logic with the browser version, read 2.3283, agreement on every digit printed. The one place they briefly disagreed was cosmetic, a missing pi symbol on an axis label, not the underlying physics.

## Reading one: four times the shadow

With the dial turned hard left, toward long wavelengths and a tiny ball, the reading comes out to exactly four times the everyday classical answer, accurate to eight decimal places. At this end of the scale, a single partial wave, the dead-center one, produces all of that effect on its own. The ball blocks four times its own shadow, not four-ish, four.

## Reading two: the extinction paradox

Turning the dial hard right, toward short wavelengths and a large ball with hundreds of partial waves contributing, is supposed to be the regime where ordinary physics finally takes over, since a tiny wavelength against a big object is exactly the case where quantum and classical predictions are expected to converge. Instead, the reading settles at exactly twice the classical answer, never once at one. The extra amount turns out to come from the shadow itself: a sharp-edged shadow is not something waves produce for free, since waves naturally spread out. Producing a clean shadow requires bending waves in behind the ball to cancel out what would otherwise fill in that space, and that bending counts as scattering in its own right. Adding up how much bending it takes to build a clean shadow comes to exactly one more shadow's worth, on top of the ball itself. That is the extinction paradox, and the rule that makes the numbers work out is called the optical theorem.

## How close does it actually get to two?

Across every energy scanned, the quantum answer never touches the classical answer of one; it moves from four down toward two but never reaches either integer exactly. The closest observed value across the whole scan was 2.199. Getting within 1% of two requires the dial to reach roughly a thousand, meaning a ball a thousand wavelengths across, already enormous by this measure, and even then the reading sits at 2.09, still about four and a half percent high. When a textbook states that the high-energy answer is simply two, that statement describes a limit, not something anyone has actually measured directly, since no real experiment reaches that regime.

## The settling gauge and the soft target

A third reading tracked how quickly the ratio approaches two as the dial increases, settling at a rate consistent with two-thirds, starting at 0.63 and reaching 0.6659 by the time the dial hits 10,000, moving the same way at every step in between, though this rate is described as measured rather than formally proven, since no source deriving it directly could be found. A separate check asked whether the reading wobbles on its way from four down to two, and it does not, not a single bump across the entire range, even though a sum built one partial wave at a time might be expected to ring. The explanation is that nothing gets through a solid ball, so there is no interior for anything to get trapped inside, and no trapping means no ringing. Swapping the solid ball for a soft target, something particles can actually enter, breaks that smoothness immediately: the same code under the same settings produces ten distinct spikes where the solid ball produced zero, confirming the smoothness belonged to the physics of the solid ball, not to the code itself.

## Key takeaways

- A quantum mechanical ball blocks exactly four times its classical shadow at low energy (long wavelength), accurate to eight decimal places.
- At high energy (short wavelength), the quantum answer settles at exactly twice the classical shadow, never converging to the classical prediction of one.
- The extinction paradox explains the extra factor of two: producing a clean shadow requires bending waves behind the ball, which itself counts as scattering.
- The optical theorem is the rule that accounts for this extra scattering contribution.
- Reaching within 1% of the theoretical high-energy limit of two requires a ball roughly a thousand wavelengths across, a regime no real experiment has actually measured.
- Switching from a solid ball to a soft, enterable target introduces ten distinct spikes in the reading, where the solid ball produced a perfectly smooth curve.

## Try it yourself

Before touching any code, try placing two everyday cases on the same dial: slow neutrons scattering off an atomic nucleus, and red light scattering off a droplet of fog. Then, with the full simulation, plot both a solid ball and a soft target of depth 900 on the same axis and see whether your results match the described pattern, a smooth curve from four to two for the solid ball and roughly ten spikes for the soft target, first appearing near a dial value of 2.88. The full simulation runs in about 200 lines of plain Python with nothing to install. This project is part of the Humanitarians AI Fellows program.
