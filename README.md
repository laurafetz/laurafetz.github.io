# Laura Maria Fetz — personal website

A static personal portfolio adapted from [Tooplate Ivory Flow](https://www.tooplate.com/view/2166-ivory-flow), ready for GitHub Pages. It uses HTML, CSS, and JavaScript; no installation or build step is needed.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. Opening `index.html` directly also works.

## Publish on GitHub Pages

1. Create a **public** repository named `laurafetz.github.io` under the `laurafetz` account. If it exists, preserve its contents and review the changes before replacing files.
2. Upload the **contents** of this folder to the repository root, including the `images` folder. `index.html` must be at the root, not inside another folder. No workflow or build service is required.
3. Under **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, and save.
4. The website will be available at **https://laurafetz.github.io/** after GitHub finishes publishing.

[Official GitHub Pages setup documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Edit the content

- `index.html`: introduction, degrees, project descriptions, methods, interests, and contact links.
- `personal.css`: personal design changes and responsive adjustments.
- `personal.js`: mobile navigation, current-section navigation, and project carousel controls.
- `tooplate-ivory-style.css`: original template styles, kept as the base.
- `images/laura-portrait.jpg`: the portrait collage supplied by Laura, copied without altering the original image.
- `images/botanical.svg` and `images/world-notes.svg`: original decorative vector illustrations matching the collage’s nature and travel themes.
- `images/project-*.svg`: decorative project concept illustrations, not result figures.

The LinkedIn URL was supplied by Laura. No email address is published.

## Content sources and credits

The biography, qualifications, skills, and interests are grounded in [Laura’s public GitHub profile README](https://github.com/laurafetz/laurafetz). Project descriptions are based on the six linked public project READMEs, which contain results, limitations, and collaborator credits. Degrees have no dates because none were supplied; no work history or publication claims have been invented.

Original template styles: Tooplate 2166 Ivory Flow. The portrait-led design uses cream paper, sea blue, sage, warm orange, and Manrope headings. The portrait was supplied by Laura; there are no stock photographs. Supporting illustrations are SVG graphics. Tooplate permits personal use and modification; see [Tooplate’s usage information](https://www.tooplate.com/contact). Original template terms continue to apply to retained assets.

## Project pages

Each project card opens a local page under `projects/<slug>/`. These pages share the portrait-inspired design and contain the public project documentation, original credits, results, and limitations. Human Activity Recognition, Personality Impressions, and Language Models and Truthfulness also have static readers for their original notebooks, with all saved code cells and available outputs. The LLM notebook was supplied by Laura. Its 14 cells include four Python code cells and no saved cell outputs; its two original results tables are linked from Imgur. These linked images remain hosted at their original URLs, with full-size links and a fallback if they cannot load. The draft poster note is collapsed in the web reader, and malformed image markup is cleaned for display; the downloadable notebook is unchanged. No notebook code is executed by the website. Visitors can show or hide code and download the original notebook. The Vlogger notebook has no saved outputs; its current results are shown separately in the overview.

The ANOVA, SEM Path Model, and SEM Factor Model reports supplied by Laura are now full readers on Parental Stress, Growth and Well-being, and Future Thinking. Their original wording, references, six tables, ten embedded images, and six math expressions are preserved. Tables scroll within the page, figures link to their full-size images, and each report has an unchanged Word download. Original coursework reports are labelled separately from the current project overviews. The path-model overview uses a later rerun with a different model specification; the parental-stress overview includes slightly different confidence limits from the rerun.

`project.css` styles the readers, and `project.js` controls code visibility and table hints. `projects/content-sources.json` records source URLs, report provenance, checksums, and content counts. Original documents and notebooks are copied into each page’s `downloads/` folder. The LLM notebook is labelled as original coursework because the project overview presents a later evaluation with different scores and conclusions. To update a report, edit the static HTML in its project page and replace the original download and figures as appropriate. No server-side rendering or build step is required.
