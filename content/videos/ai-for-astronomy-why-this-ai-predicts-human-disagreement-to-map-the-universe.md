---
title: "AI For Astronomy: Why This AI Predicts Human Disagreement to Map the Universe"
seoTitle: "AI That Predicts Human Disagreement on Galaxies"
description: "Galaxy Zoo trained a neural network on vote fractions from hundreds of thousands of volunteers instead of single labels, reaching 99% accuracy across 8.67"
summary: "Instead of forcing one correct label per galaxy, Galaxy Zoo trained a network to predict how a crowd of volunteers would vote, keeping disagreement itself as the training signal."
keywords: ["galaxy zoo vote fraction method", "crowdsourced neural network astronomy", "predicting human disagreement ai", "galaxy shape classification ai", "rotational invariance neural network", "soft label training distribution", "active learning astronomy dataset", "galaxy zoo 8.67 million catalog"]
generated: "article"
---

Sorting galaxies by shape used to be a job done by eye, one image at a time. Turning that into something a machine can do at scale runs into an odd obstacle immediately: shape isn't a fact you can look up, it's a judgment call, and different observers looking at the same galaxy don't always agree. Rather than treating that disagreement as noise to eliminate, the method behind Galaxy Zoo does something more unusual. It doesn't try to learn what a galaxy is. It learns what people would say about it.

## The problem with forcing a single correct label

A galaxy's shape carries a clue to its history, which is why anyone bothers labeling it in the first place: smooth and featureless, a disc with spiral arms, a bar cutting through the middle, a disc seen edge-on with a dust lane, or two galaxies caught mid-collision. If you force every galaxy into exactly one category, you throw away the cases where reasonable observers looked at the same image and reached different conclusions, and those borderline cases are often the scientifically interesting ones. Galaxy Zoo's answer was to ask hundreds of thousands of people to make that judgment call, keep the disagreement instead of hiding it, and train a network to predict the disagreement itself.

## Galaxy Zoo: a crowd meets a decision tree

Galaxy Zoo launched in July 2007, putting roughly 900,000 telescope images online and asking the public to sort them. The response was immediate: within twelve hours, the project was processing about 20,000 classifications an hour. But the detail that actually made the method work wasn't the size of the crowd. It was the structure behind each classification. Every galaxy gets looked at by many different people, and instead of being asked to supply a single name for what they see, each volunteer is walked down a decision tree: Is it smooth, or does it have features? If it has features, is there a bar? How many arms does it have? Eleven questions total, where each answer determines which question comes next.

## Training on vote fractions instead of words

This is the method's central idea: one galaxy, one decision tree, many people. Their combined answers become a vote fraction, the share of respondents who chose each option at each branch of the tree. A convolutional neural network is then trained to predict that fraction directly, rather than to predict a single winning label. Take a concrete example: a galaxy has a bar, but a faint one, and 63 of 100 volunteers call it barred while 37 do not. The network's training target isn't the word "barred." It's the number 0.63, and the network learns to land on that number rather than to pick a side.

Active learning closes the loop on top of this: the system sends back to volunteers only the galaxies the network is genuinely unsure about, rather than asking people to re-label galaxies the model already handles confidently.

## Building physics into the architecture

One design decision reflects a basic fact about galaxies: they have no inherent "up." Rotate a galaxy image and the correct answer shouldn't change. The winning architecture from a 2014 competition handled this by feeding the same galaxy image in several different orientations through shared network weights, effectively telling the network what to ignore. That's a case of physical structure, rotational invariance, being built directly into the model rather than left for the network to discover on its own from raw pixels.

## The results, and their built-in ceiling

Against confident volunteer answers, the trained networks reach about 99% accuracy on every question in the decision tree, and they predict the underlying vote fractions to within 5 to 10%. The resulting catalog now covers 8.67 million galaxies. But the method comes with an honest limit worth naming directly: because the network is trained to predict what people would say, its ceiling is exactly what the crowd would say. Where the crowd is systematically wrong about something, the network will be confidently wrong right along with it. It also doesn't transfer well across instruments: a network trained on one survey's images can't simply be dropped onto another telescope's data, because the pixel-level details shift underneath it in ways the model was never trained to handle.

## Key takeaways

- Galaxy Zoo trains a network to predict vote fractions, the share of volunteers choosing each answer, rather than forcing a single correct label per galaxy.
- The crowdsourcing began in July 2007 with about 900,000 images and reached roughly 20,000 classifications an hour within the first twelve hours.
- Each galaxy is classified through an eleven-question decision tree, not a single free-text label.
- The winning 2014 architecture fed the same galaxy in multiple rotations through shared weights, building rotational invariance directly into the model.
- The trained networks reach about 99% accuracy on confident answers and predict vote fractions within 5 to 10%, across a catalog of 8.67 million galaxies.
- Because the model predicts what people would say, its accuracy ceiling is set by the crowd itself, and it does not transfer cleanly to images from a different telescope.

## Try it yourself

The video closes with a prompt for anyone facing a labeling task where expert annotators genuinely disagree: ask an AI assistant to show you how to keep that disagreement as a soft label instead of forcing a majority vote, to pick a loss function and a calibration check for predicting label distributions rather than just accuracy, and to design an active learning rule that sends only the most informative examples back to human reviewers. This kind of applied machine learning research is representative of the work featured in the Humanitarians AI Fellows program.
