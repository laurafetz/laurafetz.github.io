# Laura Maria Fetz — my personal website

My little corner of the web, bringing together my background, interests, and projects in psychology, education, and data science.

[Visit my website](https://laurafetz.github.io/)

## Why I built it

I wanted a place to share my work and give a sense of who I am beyond a GitHub profile. I'm interested in understanding human behaviour through research, statistical modelling, and machine learning, and this website brings those interests together.

## My research experience

I've worked in research at the University of Amsterdam, Prowise NL, ARQ, and Ludwig-Maximilians University of Munich. This section follows the questions behind that work, with years, short highlights, and conceptual illustrations. You can switch between factor and network diagrams and explore links to related research.

It also features my [joint-first-author meta-analysis in JAACAP Open](https://doi.org/10.1016/j.jaacop.2025.12.002). The diagrams explain research ideas; the linked wider research is separate from the contributions described in my roles.

## My programming projects

- [Language models & truthfulness](https://laurafetz.github.io/projects/language-model-truthfulness/) — evaluating the factual accuracy of language models.
- [Recognising human activity](https://laurafetz.github.io/projects/human-activity-recognition/) — using sensor data to classify everyday activities.
- [Growth, identity & well-being](https://laurafetz.github.io/projects/growth-identity-wellbeing/) — exploring relationships with a structural equation path model.
- [Measuring future thinking](https://laurafetz.github.io/projects/future-thinking/) — examining a questionnaire using a structural equation factor model.
- [Language & personality impressions](https://laurafetz.github.io/projects/personality-impressions/) — predicting Big Five personality impressions from vlogger language.
- [Understanding parental stress](https://laurafetz.github.io/projects/parental-stress/) — analysing a stress intervention with ANOVA.

Each project has its own page with an overview, findings, and either a readable notebook or the original report. The notebooks and PDF reports are also available to download. Where a project includes both coursework and a later analysis, these are labelled separately.

The “View all projects” button switches between the carousel and a grid, so it's easy to browse everything together.

## My writing examples

I also share writing on child development, culture, and society, alongside creative pieces:

- [Parenting the Pooh Way: Encouraging the Shy Child](https://laurafetz.github.io/writing/parenting-the-pooh-way/)
- [Blackface and Racism in Greek Film and Television](https://laurafetz.github.io/writing/blackface-and-racism-in-greek-film-and-television/)
- [The Price of Admission](https://laurafetz.github.io/writing/the-price-of-admission/) — a satirical play about beauty and the cost of belonging.

All pieces can be read directly on the website. The blog posts include their original images and references, and PDF versions of all my writing are available to download.

## The design

I wanted the website to feel personal, so I used my portrait collage as the inspiration for the colours and visual style: warm cream, sea blue, sage, and soft orange, with botanical details and a few hints of travel.

## Beyond data

This is where I share a little more about my interests outside research. The Travel pop-up has an interactive map of the places I've visited, with a country selector, zoom controls, and a list of visited places. In Culture, I've added a small bookshelf with some of my favourite reads. My languages and proficiency levels are shown visually, and there's also a little about my love of food.

The places and books are kept in `data/interests.json`. The map loads when Travel is opened and uses a local copy of map geometry, so it doesn't need an API key or a paid map service. The map data comes from [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) via [World Atlas](https://github.com/topojson/world-atlas), using its 1:50m dataset and a Natural Earth projection. The World Atlas license is included in `data/world-atlas-LICENSE.txt`.

## Built with

The site uses HTML, CSS, and JavaScript and is hosted on GitHub Pages. It's a static website, so there's no build step.

To preview it locally, run this from the repository folder:

```sh
python3 -m http.server 8000
```

Then open [localhost:8000](http://localhost:8000).

## Comments

Each programming project and writing example has its own comment section, using the free community version of [HTML Comment Box](https://www.htmlcommentbox.com/). Visitors can leave a name and message without creating an account.

I sign in with Google on the provider’s install page to get the embed code that makes me the moderator. The public `jread` script URL is configured in `comments.js`, keeping my moderator access attached to all nine pages. No paid plan is needed. The provider’s attribution stays visible.

Comments load near the end of the page. Directory URLs and their `index.html` equivalents share a thread. If the service cannot load, the page offers a retry button.

## Credits

I started with [Ivory Flow by Tooplate](https://www.tooplate.com/view/2166-ivory-flow) and adapted the layout, styling, and content for my portfolio. Thank you to Tooplate for the original template.

Project collaborators, data sources, and references are credited on the individual project pages.


